import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, ArrowLeft, Volume2, UserCircle2, Shirt, Home, Smartphone, Check } from 'lucide-react';
import AppNav from '@/components/AppNav';
import bodyScanProcess from '@/assets/body-scan-process-final.png';

export default function BodyScanPrepare() {
  const navigate = useNavigate();
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [checklist, setChecklist] = useState({
    volume: false,
    face: false,
    hair: false,
    clothes: false,
    space: false,
    surface: false
  });

  const allChecked = Object.values(checklist).every(v => v) && weight && height;

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleContinue = () => {
    if (allChecked) {
      // Armazenar dados temporariamente
      sessionStorage.setItem('bodyScanWeight', weight);
      sessionStorage.setItem('bodyScanHeight', height);
      navigate('/body-scan/terms');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      
      <main className="container mx-auto px-4 pt-24 pb-20">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/body-scan/how-it-works')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <div className="text-sm text-muted-foreground">Passo 2 de 3</div>
          </div>

          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-petroleum">Pronto para começar?</h1>
            <p className="text-muted-foreground">Vamos preparar tudo para seu escaneamento</p>
          </div>

          {/* Imagem de exemplo */}
          <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-xl">
            <img 
              src={bodyScanProcess} 
              alt="Exemplo de preparação" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Informações Básicas */}
          <Card>
            <CardContent className="p-6 space-y-6">
              <h3 className="font-semibold text-lg text-petroleum">Informações básicas</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Peso atual (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="Ex: 70"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    step="0.1"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="height">Altura (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="Ex: 170"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Checklist de Preparação */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-lg text-petroleum mb-4">Checklist de preparação</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                     onClick={() => toggleCheck('volume')}>
                  <Checkbox 
                    checked={checklist.volume} 
                    onCheckedChange={() => toggleCheck('volume')}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Volume2 className="h-4 w-4 text-mint" />
                      <Label className="cursor-pointer font-medium">Aumente o volume</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Você vai receber instruções de voz durante o escaneamento
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                     onClick={() => toggleCheck('face')}>
                  <Checkbox 
                    checked={checklist.face} 
                    onCheckedChange={() => toggleCheck('face')}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <UserCircle2 className="h-4 w-4 text-mint" />
                      <Label className="cursor-pointer font-medium">Não cubra o rosto</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Mantenha o rosto visível para melhor precisão
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                     onClick={() => toggleCheck('hair')}>
                  <Checkbox 
                    checked={checklist.hair} 
                    onCheckedChange={() => toggleCheck('hair')}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Check className="h-4 w-4 text-mint" />
                      <Label className="cursor-pointer font-medium">Prenda o cabelo acima dos ombros</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Isso ajuda nas medidas de ombros e pescoço
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                     onClick={() => toggleCheck('clothes')}>
                  <Checkbox 
                    checked={checklist.clothes} 
                    onCheckedChange={() => toggleCheck('clothes')}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Shirt className="h-4 w-4 text-mint" />
                      <Label className="cursor-pointer font-medium">Use roupas justas</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Roupas largas podem afetar a precisão das medidas
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                     onClick={() => toggleCheck('space')}>
                  <Checkbox 
                    checked={checklist.space} 
                    onCheckedChange={() => toggleCheck('space')}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Home className="h-4 w-4 text-mint" />
                      <Label className="cursor-pointer font-medium">Encontre uma sala com espaço</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Você precisará de cerca de 2 metros livres para girar
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                     onClick={() => toggleCheck('surface')}>
                  <Checkbox 
                    checked={checklist.surface} 
                    onCheckedChange={() => toggleCheck('surface')}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Smartphone className="h-4 w-4 text-mint" />
                      <Label className="cursor-pointer font-medium">Apoie o celular em superfície estável</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Use uma mesa, cadeira ou suporte de celular
                    </p>
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
                  <p className="font-medium mb-2">Dica da Lívia</p>
                  <p className="text-white/90 italic">
                    "Quanto mais você seguir essas dicas, mais precisa será sua análise. Mas relaxa, não precisa ser perfeito!"
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Botão de Ação */}
          <div className="flex justify-center pt-4">
            <Button 
              size="lg" 
              onClick={handleContinue}
              disabled={!allChecked}
              className="bg-mint hover:bg-mint-dark text-white gap-2 px-8 py-6 text-lg disabled:opacity-50"
            >
              Tudo pronto, continuar
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
