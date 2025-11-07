import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, ArrowLeft, Smartphone, RotateCcw, Sparkles } from 'lucide-react';
import AppNav from '@/components/AppNav';
import bodyScanHowItWorks from '@/assets/body-scan-how-it-works-final.png';

export default function BodyScanHowItWorks() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      
      <main className="container mx-auto px-4 pt-24 pb-20">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/body-scan/intro')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <div className="text-sm text-muted-foreground">Passo 1 de 3</div>
          </div>

          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-petroleum">Como funciona?</h1>
            <p className="text-muted-foreground">É simples, rápido e 100% no seu celular</p>
          </div>

          {/* Imagem Ilustrativa */}
          <div className="relative w-full h-96 rounded-2xl overflow-hidden flex items-center justify-center">
            <img 
              src={bodyScanHowItWorks} 
              alt="Como funciona o escaneamento" 
              className="w-full h-full object-contain"
            />
          </div>

          {/* Instruções Passo a Passo */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-mint/20 rounded-full flex items-center justify-center">
                    <Smartphone className="h-6 w-6 text-mint" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-petroleum mb-2">
                      1. Posicione o dispositivo
                    </h3>
                    <p className="text-muted-foreground">
                      Coloque seu celular em uma superfície estável, a cerca de 2 metros de distância. 
                      A câmera deve estar na altura do seu peito.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-lavender/20 rounded-full flex items-center justify-center">
                    <RotateCcw className="h-6 w-6 text-lavender" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-petroleum mb-2">
                      2. Faça uma rotação de 360°
                    </h3>
                    <p className="text-muted-foreground">
                      Siga as instruções na tela para girar lentamente. O app vai te guiar durante todo o processo 
                      com comandos de voz e visuais.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-rose/20 rounded-full flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-rose" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-petroleum mb-2">
                      3. Receba sua análise completa
                    </h3>
                    <p className="text-muted-foreground">
                      Em poucos segundos, você terá acesso a métricas como gordura corporal, massa magra e medidas corporais 
                      visualizadas em uma silhueta 3D.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mensagem da Lívia */}
          <Card className="bg-gradient-hero text-white">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl">💜</div>
                <div>
                  <p className="font-medium mb-2">Dica da Lívia</p>
                  <p className="text-white/90 italic">
                    "Pronto para ver o que seu corpo tem a dizer? Vamos nessa! Lembre-se: não é sobre perfeição, é sobre evolução!"
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Botão de Ação */}
          <div className="flex justify-center pt-4">
            <Button 
              size="lg" 
              onClick={() => navigate('/body-scan/prepare')}
              className="bg-mint hover:bg-mint-dark text-white gap-2 px-8 py-6 text-lg"
            >
              Entendi, continuar
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
