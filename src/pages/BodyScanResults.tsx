import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Download, Share2, TrendingUp } from 'lucide-react';
import AppNav from '@/components/AppNav';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface BodyScanData {
  id: string;
  created_at: string;
  weight: number;
  height: number;
  body_fat_percentage: number;
  lean_mass: number;
  waist_measurement: number;
  hip_measurement: number;
  calf_measurement: number;
  chest_measurement: number;
  arm_measurement: number;
}

export default function BodyScanResults() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [scanData, setScanData] = useState<BodyScanData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLatestScan();
  }, []);

  const loadLatestScan = async () => {
    try {
      const { data, error } = await supabase
        .from('body_scans')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;
      setScanData(data);
    } catch (error) {
      console.error('Erro ao carregar escaneamento:', error);
      toast.error('Erro ao carregar resultados');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mint mx-auto" />
          <p className="text-muted-foreground">Carregando resultados...</p>
        </div>
      </div>
    );
  }

  if (!scanData) {
    return (
      <div className="min-h-screen bg-background">
        <AppNav />
        <main className="container mx-auto px-4 pt-24 pb-20 text-center">
          <h1 className="text-2xl font-bold text-petroleum mb-4">Nenhum escaneamento encontrado</h1>
          <Button onClick={() => navigate('/body-scan/intro')}>
            Fazer primeiro escaneamento
          </Button>
        </main>
      </div>
    );
  }

  const isFemale = user?.email?.includes('f') || user?.email?.includes('a');

  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      
      <main className="container mx-auto px-4 pt-24 pb-20">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/dashboard')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" />
                Compartilhar
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Exportar
              </Button>
            </div>
          </div>

          <div className="text-center space-y-2">
            <Badge className="bg-mint text-white mb-2">Escaneamento mais recente</Badge>
            <h1 className="text-4xl font-bold text-petroleum">Seus Resultados</h1>
            <p className="text-muted-foreground">
              {new Date(scanData.created_at).toLocaleDateString('pt-BR', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}
            </p>
          </div>

          {/* Resultados Principais */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-mint/10 to-mint/5">
              <CardContent className="p-6 text-center">
                <div className="text-5xl mb-2">🔥</div>
                <p className="text-sm text-muted-foreground mb-1">Gordura Corporal</p>
                <p className="text-4xl font-bold text-petroleum">{scanData.body_fat_percentage}%</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-lavender/10 to-lavender/5">
              <CardContent className="p-6 text-center">
                <div className="text-5xl mb-2">💪</div>
                <p className="text-sm text-muted-foreground mb-1">Massa Magra</p>
                <p className="text-4xl font-bold text-petroleum">{scanData.lean_mass} kg</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-rose/10 to-rose/5">
              <CardContent className="p-6 text-center">
                <div className="text-5xl mb-2">⚖️</div>
                <p className="text-sm text-muted-foreground mb-1">Peso Total</p>
                <p className="text-4xl font-bold text-petroleum">{scanData.weight} kg</p>
              </CardContent>
            </Card>
          </div>

          {/* Visualização do Corpo */}
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-petroleum mb-6 text-center">
                Medidas Corporais
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Silhueta */}
                <div className="relative">
                  <div className="aspect-[9/16] bg-gradient-to-b from-muted/30 to-muted/10 rounded-2xl flex items-center justify-center overflow-hidden">
                    <div className="text-8xl opacity-20">
                      {isFemale ? '👤' : '🧍'}
                    </div>
                  </div>
                  
                  {/* Indicadores de Medidas */}
                  <div className="absolute top-[20%] -left-4">
                    <div className="bg-mint text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                      Peito: {scanData.chest_measurement} cm
                    </div>
                  </div>
                  
                  <div className="absolute top-[40%] -right-4">
                    <div className="bg-lavender text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                      Cintura: {scanData.waist_measurement} cm
                    </div>
                  </div>
                  
                  <div className="absolute top-[60%] -left-4">
                    <div className="bg-rose text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                      Quadril: {scanData.hip_measurement} cm
                    </div>
                  </div>
                  
                  <div className="absolute bottom-[20%] -right-4">
                    <div className="bg-petroleum text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                      Panturrilha: {scanData.calf_measurement} cm
                    </div>
                  </div>
                </div>

                {/* Tabela de Medidas */}
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                      <span className="text-muted-foreground">Peito</span>
                      <span className="font-semibold text-petroleum">{scanData.chest_measurement} cm</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                      <span className="text-muted-foreground">Braço</span>
                      <span className="font-semibold text-petroleum">{scanData.arm_measurement} cm</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                      <span className="text-muted-foreground">Cintura</span>
                      <span className="font-semibold text-petroleum">{scanData.waist_measurement} cm</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                      <span className="text-muted-foreground">Quadril</span>
                      <span className="font-semibold text-petroleum">{scanData.hip_measurement} cm</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                      <span className="text-muted-foreground">Panturrilha</span>
                      <span className="font-semibold text-petroleum">{scanData.calf_measurement} cm</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                      <span className="text-muted-foreground">Altura</span>
                      <span className="font-semibold text-petroleum">{scanData.height} cm</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mensagem da Lívia */}
          <Card className="bg-gradient-hero text-white">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl">💜</div>
                <div>
                  <p className="font-medium mb-2">Análise da Lívia</p>
                  <p className="text-white/90">
                    Parabéns! Você completou seu escaneamento corporal. Esses dados vão me ajudar a personalizar 
                    ainda mais suas recomendações de treino e alimentação. Continue acompanhando sua evolução!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ações */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/body-scan/intro')}
              variant="outline"
              className="gap-2 px-8"
            >
              Fazer novo escaneamento
            </Button>
            <Button 
              size="lg" 
              onClick={() => navigate('/evolucao')}
              className="bg-mint hover:bg-mint-dark text-white gap-2 px-8"
            >
              <TrendingUp className="h-5 w-5" />
              Ver evolução completa
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
