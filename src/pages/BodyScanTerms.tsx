import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ArrowRight, ArrowLeft, Shield, Lock, Eye } from 'lucide-react';
import AppNav from '@/components/AppNav';

export default function BodyScanTerms() {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);

  const handleStart = () => {
    if (agreed) {
      navigate('/body-scan/scan');
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
              onClick={() => navigate('/body-scan/prepare')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <div className="text-sm text-muted-foreground">Passo 3 de 3</div>
          </div>

          <div className="text-center space-y-2">
            <Shield className="h-16 w-16 text-mint mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-petroleum">Privacidade e Termos</h1>
            <p className="text-muted-foreground">Seus dados estão seguros conosco</p>
          </div>

          {/* Informações de Privacidade */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-mint/20 rounded-full flex items-center justify-center">
                    <Lock className="h-6 w-6 text-mint" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-petroleum mb-2">
                      Armazenamento Seguro
                    </h3>
                    <p className="text-muted-foreground">
                      Todas as suas imagens e dados são criptografados e armazenados com segurança. 
                      Apenas você tem acesso às suas informações.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-lavender/20 rounded-full flex items-center justify-center">
                    <Eye className="h-6 w-6 text-lavender" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-petroleum mb-2">
                      Sem Compartilhamento
                    </h3>
                    <p className="text-muted-foreground">
                      Nunca compartilhamos suas informações pessoais ou imagens com terceiros. 
                      Seus dados são exclusivamente seus.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-rose/20 rounded-full flex items-center justify-center">
                    <Shield className="h-6 w-6 text-rose" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-petroleum mb-2">
                      Controle Total
                    </h3>
                    <p className="text-muted-foreground">
                      Você pode visualizar, editar ou excluir seus escaneamentos a qualquer momento. 
                      Seus dados, suas regras.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Termos de Uso */}
          <Card className="border-2 border-petroleum/20">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold text-lg text-petroleum">O que coletamos</h3>
              
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-mint mt-1">•</span>
                  <span>Vídeo de 360° do seu corpo para análise de composição corporal</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-mint mt-1">•</span>
                  <span>Peso e altura informados por você</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-mint mt-1">•</span>
                  <span>Métricas calculadas automaticamente (% gordura, massa magra, medidas)</span>
                </li>
              </ul>

              <div className="pt-4 border-t">
                <h3 className="font-semibold text-lg text-petroleum mb-3">Como usamos</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-lavender mt-1">•</span>
                    <span>Gerar análise precisa da sua composição corporal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lavender mt-1">•</span>
                    <span>Acompanhar sua evolução ao longo do tempo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-lavender mt-1">•</span>
                    <span>Personalizar recomendações de treino e nutrição</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Checkbox de Consentimento */}
          <Card className="bg-gradient-to-br from-mint/10 to-lavender/10 border-mint/30">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Checkbox 
                  id="terms" 
                  checked={agreed}
                  onCheckedChange={(checked) => setAgreed(checked as boolean)}
                  className="mt-1"
                />
                <Label 
                  htmlFor="terms" 
                  className="text-petroleum leading-relaxed cursor-pointer"
                >
                  Concordo com a coleta, uso, divulgação e armazenamento das minhas imagens e dados 
                  conforme descrito na Política do VaiFit. Entendo que posso revogar esse consentimento 
                  e excluir meus dados a qualquer momento.
                </Label>
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
                    "Sua privacidade é prioridade! Pode confiar, seus dados estão seguros comigo. 
                    Vamos nessa jornada de transformação!"
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Botão de Ação */}
          <div className="flex justify-center pt-4">
            <Button 
              size="lg" 
              onClick={handleStart}
              disabled={!agreed}
              className="bg-mint hover:bg-mint-dark text-white gap-2 px-8 py-6 text-lg disabled:opacity-50"
            >
              Começar escaneamento
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
