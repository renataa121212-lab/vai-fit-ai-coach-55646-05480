import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Scan, ArrowRight } from 'lucide-react';
import AppNav from '@/components/AppNav';
import bodyScanIntro from '@/assets/body-scan-intro-improved.jpg';

export default function BodyScanIntro() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      
      <main className="container mx-auto px-4 pt-24 pb-20">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={bodyScanIntro} 
              alt="Silhueta feminina 3D com métricas corporais" 
              className="w-full h-full object-cover"
            />

            {/* Overlay principal com gradiente e título */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-t from-petroleum/50 via-petroleum/10 to-transparent" />

              <div className="absolute bottom-0 left-0 p-4 md:p-8 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <Scan className="h-8 w-8" />
                  <h1 className="text-3xl md:text-4xl font-bold">Escaneamento Corporal</h1>
                </div>
              </div>

              {/* Etiquetas – desktop (posicionadas) */}
              <div className="hidden md:block">
                <div className="absolute top-10 right-8 bg-card/95 text-foreground backdrop-blur-sm border border-border/40 rounded-2xl px-4 py-3 shadow-xl pointer-events-none">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-mint/15 text-mint grid place-items-center">💪</div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">MASSA MAGRA</div>
                      <div className="text-2xl font-semibold">53,5 kg</div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-28 left-8 bg-card/95 text-foreground backdrop-blur-sm border border-border/40 rounded-2xl px-4 py-3 shadow-xl pointer-events-none">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-mint/15 text-mint grid place-items-center">🔥</div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">GORDURA CORPORAL</div>
                      <div className="text-2xl font-semibold">16,1%</div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-1/2 right-8 -translate-y-1/2 bg-card/95 text-foreground backdrop-blur-sm border border-border/40 rounded-2xl px-4 py-3 shadow-xl pointer-events-none">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-mint/15 text-mint grid place-items-center">🧍‍♀️</div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">CINTURA</div>
                      <div className="text-2xl font-semibold">92,2 cm</div>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-10 left-8 bg-card/95 text-foreground backdrop-blur-sm border border-border/40 rounded-2xl px-4 py-3 shadow-xl pointer-events-none">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-mint/15 text-mint grid place-items-center">🦶</div>
                    <div>
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">PANTURRILHA DIREITA</div>
                      <div className="text-2xl font-semibold">37,97 cm</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Etiquetas – mobile */}
              <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] grid grid-cols-2 gap-2">
                <div className="bg-card/95 text-foreground backdrop-blur-sm border border-border/40 rounded-xl px-3 py-2 shadow-md pointer-events-none">
                  <div className="text-[10px] tracking-wider uppercase text-muted-foreground">MASSA MAGRA</div>
                  <div className="text-sm font-semibold">53,5 kg</div>
                </div>
                <div className="bg-card/95 text-foreground backdrop-blur-sm border border-border/40 rounded-xl px-3 py-2 shadow-md pointer-events-none">
                  <div className="text-[10px] tracking-wider uppercase text-muted-foreground">GORDURA CORPORAL</div>
                  <div className="text-sm font-semibold">16,1%</div>
                </div>
                <div className="bg-card/95 text-foreground backdrop-blur-sm border border-border/40 rounded-xl px-3 py-2 shadow-md pointer-events-none">
                  <div className="text-[10px] tracking-wider uppercase text-muted-foreground">CINTURA</div>
                  <div className="text-sm font-semibold">92,2 cm</div>
                </div>
                <div className="bg-card/95 text-foreground backdrop-blur-sm border border-border/40 rounded-xl px-3 py-2 shadow-md pointer-events-none">
                  <div className="text-[10px] tracking-wider uppercase text-muted-foreground">PANTURRILHA DIREITA</div>
                  <div className="text-sm font-semibold">37,97 cm</div>
                </div>
              </div>
            </div>
          </div>

          {/* Descrição */}
          <Card className="bg-gradient-to-br from-lavender/10 to-mint/10 border-lavender/20">
            <CardContent className="p-8 space-y-4">
              <h2 className="text-2xl font-bold text-petroleum">
                Transforme seu dispositivo em um scanner corporal inteligente
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Acompanhe sua evolução com métricas precisas como gordura corporal, massa muscular e medidas visuais. 
                Tudo isso usando apenas a câmera do seu celular!
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="bg-white/50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-mint">📊</div>
                  <p className="text-sm font-medium text-petroleum mt-2">Análise Completa</p>
                  <p className="text-xs text-muted-foreground">% de gordura e massa magra</p>
                </div>
                
                <div className="bg-white/50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-lavender">📏</div>
                  <p className="text-sm font-medium text-petroleum mt-2">Medidas Precisas</p>
                  <p className="text-xs text-muted-foreground">Cintura, quadril e mais</p>
                </div>
                
                <div className="bg-white/50 rounded-lg p-4 text-center">
                  <div className="text-3xl font-bold text-rose">📈</div>
                  <p className="text-sm font-medium text-petroleum mt-2">Acompanhe Evolução</p>
                  <p className="text-xs text-muted-foreground">Compare resultados</p>
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
                    "Seu corpo é único e está em constante evolução. Vamos acompanhar isso com carinho e sem julgamentos. 
                    Cada métrica conta uma história!"
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Botão de Ação */}
          <div className="flex justify-center pt-4">
            <Button 
              size="lg" 
              onClick={() => navigate('/body-scan/how-it-works')}
              className="bg-mint hover:bg-mint-dark text-white gap-2 px-8 py-6 text-lg"
            >
              Começar agora
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
