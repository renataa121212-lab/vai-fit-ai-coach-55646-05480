import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Calendar, TrendingUp, Camera, Smile, Frown, Meh, X, Upload, Image as ImageIcon } from 'lucide-react';
import AppNav from '@/components/AppNav';
import { LiviaChat } from '@/components/LiviaChat';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const DiarioEvolucao = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  
  const [newEntry, setNewEntry] = useState({
    weight: '',
    waist: '',
    chest: '',
    hips: '',
    mood: '',
    energy: '',
    notes: '',
  });

  const [entries, setEntries] = useState<any[]>([]);
  const [photosMap, setPhotosMap] = useState<Record<string, string[]>>({});

  useEffect(() => {
    if (user) {
      loadEntries();
    }
  }, [user]);

  const loadEntries = async () => {
    if (!user) return;
    
    const { data, error } = await (supabase as any)
      .from('evolution_photos')
      .select('*')
      .eq('user_id', user.id)
      .order('taken_at', { ascending: false });

    if (error) {
      console.error('Error loading photos:', error);
      return;
    }

    // Group photos by date
    const grouped: Record<string, any[]> = {};
    (data || []).forEach((photo: any) => {
      const dateKey = new Date(photo.taken_at).toISOString().split('T')[0];
      if (!grouped[dateKey]) grouped[dateKey] = [];
      grouped[dateKey].push(photo);
    });

    // Create mock entries with photos
    const mockEntries = [
      {
        id: 1,
        date: "2024-09-28",
        weight: 75.2,
        measurements: { waist: 82, chest: 95, hips: 98 },
        mood: "great",
        energy: 8,
        notes: "Me senti muito bem hoje! Treino foi excelente.",
        changes: { weight: -0.5, waist: -1, energy: +1 }
      },
    ];

    setEntries(mockEntries);
    
    // Load photo URLs
    const photosMapTemp: Record<string, string[]> = {};
    for (const [dateKey, photos] of Object.entries(grouped)) {
      const urls = await Promise.all(
        photos.map(async (p: any) => {
          const { data: urlData } = await supabase.storage
            .from('evolution-photos')
            .createSignedUrl(p.image_path, 3600);
          return urlData?.signedUrl || '';
        })
      );
      photosMapTemp[dateKey] = urls.filter(Boolean);
    }
    setPhotosMap(photosMapTemp);
  };

  const moodIcons = {
    great: { icon: Smile, label: "Ótimo", color: "text-mint" },
    good: { icon: Smile, label: "Bom", color: "text-coral" },
    average: { icon: Meh, label: "Médio", color: "text-lavender" },
    bad: { icon: Frown, label: "Ruim", color: "text-destructive" }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
    
    // Create preview URLs
    const urls = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(prev => [...prev, ...urls]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    URL.revokeObjectURL(previewUrls[index]);
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleCreateEntry = async () => {
    if (!newEntry.weight || !user) return;

    setUploading(true);
    try {
      // Upload photos first
      const uploadedPaths: string[] = [];
      for (const file of selectedFiles) {
        const fileName = `${user.id}/${Date.now()}_${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from('evolution-photos')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        // Save photo record
        const { error: insertError } = await (supabase as any)
          .from('evolution_photos')
          .insert({
            user_id: user.id,
            image_path: fileName,
            caption: newEntry.notes,
          });

        if (insertError) throw insertError;
        uploadedPaths.push(fileName);
      }

      toast({
        title: "Entrada salva!",
        description: `${uploadedPaths.length} foto(s) salva(s) com sucesso.`,
      });

      // Reset form
      setNewEntry({
        weight: '',
        waist: '',
        chest: '',
        hips: '',
        mood: '',
        energy: '',
        notes: '',
      });
      setSelectedFiles([]);
      setPreviewUrls([]);
      setShowNewEntry(false);
      
      loadEntries();
    } catch (error: any) {
      console.error('Error saving entry:', error);
      toast({
        title: "Erro ao salvar",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return "↗️";
    if (change < 0) return "↘️";
    return "➡️";
  };

  const getChangeColor = (change: number, isWeight = false) => {
    if (isWeight) {
      if (change < 0) return "text-mint";
      if (change > 0) return "text-coral";
    } else {
      if (change > 0) return "text-mint";
      if (change < 0) return "text-coral";
    }
    return "text-petroleum-light";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const getProgressStats = () => {
    if (entries.length < 2) return null;
    const latest = entries[0];
    const oldest = entries[entries.length - 1];
    return {
      weightLoss: oldest.weight - latest.weight,
      waistReduction: oldest.measurements.waist - latest.measurements.waist,
      timeSpan: Math.ceil((new Date(latest.date).getTime() - new Date(oldest.date).getTime()) / (1000 * 60 * 60 * 24))
    };
  };

  const progressStats = getProgressStats();

  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-petroleum">Diário de Evolução</h1>
            <p className="text-petroleum-light">Acompanhe sua transformação</p>
          </div>
          <Button
            onClick={() => setShowNewEntry(true)}
            className="bg-mint hover:bg-mint-dark text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nova Entrada
          </Button>
        </div>

        {progressStats && (
          <Card className="bg-gradient-hero text-white mb-6">
            <CardContent className="pt-6">
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold mb-2">Sua Evolução 📈</h2>
                <p className="text-white/90">Últimos {progressStats.timeSpan} dias</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {progressStats.weightLoss > 0 ? '-' : '+'}
                    {Math.abs(progressStats.weightLoss).toFixed(1)}kg
                  </div>
                  <div className="text-sm text-white/80">Peso</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {progressStats.waistReduction > 0 ? '-' : '+'}
                    {Math.abs(progressStats.waistReduction).toFixed(1)}cm
                  </div>
                  <div className="text-sm text-white/80">Cintura</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{entries.length}</div>
                  <div className="text-sm text-white/80">Registros</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold text-petroleum mb-4">Linha do Tempo</h2>
            
            {entries.map((entry, index) => {
              const MoodIcon = moodIcons[entry.mood as keyof typeof moodIcons]?.icon || Meh;
              const moodInfo = moodIcons[entry.mood as keyof typeof moodIcons];
              const entryPhotos = photosMap[entry.date] || [];
              
              return (
                <Card key={entry.id} className="bg-gradient-card border-mint/20">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-mint/20 flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-mint" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-petroleum">{formatDate(entry.date)}</h3>
                          <div className="flex items-center space-x-2">
                            <MoodIcon className={`h-4 w-4 ${moodInfo?.color || 'text-petroleum-light'}`} />
                            <span className="text-sm text-petroleum-light">
                              {moodInfo?.label || 'Não informado'}
                            </span>
                          </div>
                        </div>
                      </div>
                      {entryPhotos.length > 0 && (
                        <Badge className="bg-coral text-white">
                          <Camera className="h-3 w-3 mr-1" />
                          {entryPhotos.length} Foto(s)
                        </Badge>
                      )}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center p-3 rounded-lg bg-white/50">
                        <div className="text-lg font-bold text-petroleum flex items-center justify-center">
                          {entry.weight}kg
                          {index < entries.length - 1 && (
                            <span className={`ml-1 text-xs ${getChangeColor(entry.changes.weight, true)}`}>
                              {getChangeIcon(entry.changes.weight)}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-petroleum-light">Peso</div>
                      </div>
                      
                      <div className="text-center p-3 rounded-lg bg-white/50">
                        <div className="text-lg font-bold text-petroleum flex items-center justify-center">
                          {entry.measurements.waist}cm
                          {index < entries.length - 1 && (
                            <span className={`ml-1 text-xs ${getChangeColor(-entry.changes.waist)}`}>
                              {getChangeIcon(-entry.changes.waist)}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-petroleum-light">Cintura</div>
                      </div>
                      
                      <div className="text-center p-3 rounded-lg bg-white/50">
                        <div className="text-lg font-bold text-petroleum">{entry.measurements.chest}cm</div>
                        <div className="text-xs text-petroleum-light">Peitoral</div>
                      </div>
                      
                      <div className="text-center p-3 rounded-lg bg-white/50">
                        <div className="text-lg font-bold text-petroleum flex items-center justify-center">
                          {entry.energy}/10
                          {index < entries.length - 1 && (
                            <span className={`ml-1 text-xs ${getChangeColor(entry.changes.energy)}`}>
                              {getChangeIcon(entry.changes.energy)}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-petroleum-light">Energia</div>
                      </div>
                    </div>

                    {entryPhotos.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {entryPhotos.map((url, idx) => (
                          <img
                            key={idx}
                            src={url}
                            alt={`Foto ${idx + 1}`}
                            className="w-full h-32 object-cover rounded-lg border border-mint/20"
                          />
                        ))}
                      </div>
                    )}

                    {entry.notes && (
                      <div className="p-3 rounded-lg bg-white/30 border border-mint/20">
                        <p className="text-sm text-petroleum-light italic">"{entry.notes}"</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="space-y-6">
            <Card className="bg-gradient-card border-mint/20">
              <CardHeader>
                <CardTitle className="text-petroleum flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-coral" />
                  Resumo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-petroleum">
                      {entries.length > 0 ? entries[0].weight : 0}kg
                    </div>
                    <div className="text-xs text-petroleum-light">Peso atual</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-mint">
                      {entries.length > 0 ? entries[0].measurements.waist : 0}cm
                    </div>
                    <div className="text-xs text-petroleum-light">Cintura atual</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-coral">
                      {entries.length > 0 ? entries[0].energy : 0}/10
                    </div>
                    <div className="text-xs text-petroleum-light">Energia atual</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-mint/20">
              <CardHeader>
                <CardTitle className="text-petroleum">💡 Dicas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-petroleum-light">
                  <p>• Registre-se sempre no mesmo horário</p>
                  <p>• Use a mesma balança</p>
                  <p>• Tire fotos na mesma posição</p>
                  <p>• Seja honesto sobre seu humor</p>
                  <p>• Anote observações importantes</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {showNewEntry && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-petroleum mb-6">Nova Entrada</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <Label htmlFor="weight">Peso (kg) *</Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.1"
                      value={newEntry.weight}
                      onChange={(e) => setNewEntry({...newEntry, weight: e.target.value})}
                      placeholder="75.5"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="energy">Nível de Energia (1-10)</Label>
                    <Select value={newEntry.energy} onValueChange={(value) => setNewEntry({...newEntry, energy: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {[...Array(10)].map((_, i) => (
                          <SelectItem key={i + 1} value={(i + 1).toString()}>
                            {i + 1} - {i + 1 <= 3 ? 'Baixo' : i + 1 <= 6 ? 'Médio' : 'Alto'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div>
                    <Label htmlFor="waist">Cintura (cm)</Label>
                    <Input
                      id="waist"
                      type="number"
                      value={newEntry.waist}
                      onChange={(e) => setNewEntry({...newEntry, waist: e.target.value})}
                      placeholder="82"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="chest">Peitoral (cm)</Label>
                    <Input
                      id="chest"
                      type="number"
                      value={newEntry.chest}
                      onChange={(e) => setNewEntry({...newEntry, chest: e.target.value})}
                      placeholder="95"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="hips">Quadril (cm)</Label>
                    <Input
                      id="hips"
                      type="number"
                      value={newEntry.hips}
                      onChange={(e) => setNewEntry({...newEntry, hips: e.target.value})}
                      placeholder="98"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <Label htmlFor="mood">Como você se sente?</Label>
                  <Select value={newEntry.mood} onValueChange={(value) => setNewEntry({...newEntry, mood: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione seu humor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="great">😊 Ótimo</SelectItem>
                      <SelectItem value="good">🙂 Bom</SelectItem>
                      <SelectItem value="average">😐 Médio</SelectItem>
                      <SelectItem value="bad">😞 Ruim</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="mb-6">
                  <Label htmlFor="notes">Observações</Label>
                  <Textarea
                    id="notes"
                    value={newEntry.notes}
                    onChange={(e) => setNewEntry({...newEntry, notes: e.target.value})}
                    placeholder="Como foi seu dia? Alguma observação importante..."
                    rows={3}
                  />
                </div>

                <div className="mb-6">
                  <Label>Fotos (opcional)</Label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full border-mint text-mint hover:bg-mint hover:text-white"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Adicionar Fotos
                  </Button>
                  
                  {previewUrls.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      {previewUrls.map((url, idx) => (
                        <div key={idx} className="relative">
                          <img
                            src={url}
                            alt={`Preview ${idx + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            onClick={() => removeFile(idx)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowNewEntry(false)}
                    className="flex-1 border-lavender text-lavender hover:bg-lavender hover:text-white"
                    disabled={uploading}
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleCreateEntry}
                    className="flex-1 bg-mint hover:bg-mint-dark text-white"
                    disabled={!newEntry.weight || uploading}
                  >
                    {uploading ? 'Salvando...' : 'Salvar Entrada'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <LiviaChat 
          context="Diário de Evolução - Acompanhamento de progresso físico"
          initialMessage="Oi! Que legal ver sua evolução! Como você está se sentindo hoje? 📊"
        />
      </div>
    </div>
  );
};

export default DiarioEvolucao;
