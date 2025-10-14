import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Camera, RotateCcw, Check, Loader2, ArrowRight } from 'lucide-react';
import AppNav from '@/components/AppNav';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export default function BodyScan() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'ready' | 'scanning' | 'processing' | 'complete'>('ready');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' },
        audio: false 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Erro ao acessar câmera:', error);
      toast.error('Não foi possível acessar a câmera');
    }
  };

  const startScan = async () => {
    setIsScanning(true);
    setPhase('scanning');
    setProgress(0);

    // Simula escaneamento com progresso
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          processResults();
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  const processResults = async () => {
    setPhase('processing');
    
    // Recupera dados da sessão
    const weight = parseFloat(sessionStorage.getItem('bodyScanWeight') || '0');
    const height = parseFloat(sessionStorage.getItem('bodyScanHeight') || '0');

    // Simula análise e calcula métricas (em produção, isso seria feito por IA)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Calcula IMC e estimativas
    const imc = weight / Math.pow(height / 100, 2);
    const bodyFatPercentage = user?.email?.includes('f') || user?.email?.includes('a') 
      ? (imc * 1.2 + 8.7) // Estimativa feminina
      : (imc * 1.2 + 0.23); // Estimativa masculina
    
    const leanMass = weight * (1 - bodyFatPercentage / 100);

    try {
      const { error } = await supabase.from('body_scans').insert({
        user_id: user?.id,
        weight,
        height,
        body_fat_percentage: Math.round(bodyFatPercentage * 10) / 10,
        lean_mass: Math.round(leanMass * 10) / 10,
        waist_measurement: Math.round((height * 0.48) * 10) / 10,
        hip_measurement: Math.round((height * 0.53) * 10) / 10,
        calf_measurement: Math.round((height * 0.20) * 10) / 10,
        chest_measurement: Math.round((height * 0.52) * 10) / 10,
        arm_measurement: Math.round((height * 0.18) * 10) / 10
      });

      if (error) throw error;

      setPhase('complete');
      
      // Limpa dados da sessão
      sessionStorage.removeItem('bodyScanWeight');
      sessionStorage.removeItem('bodyScanHeight');

      toast.success('Escaneamento concluído com sucesso!');
      
      // Redireciona após 2 segundos
      setTimeout(() => {
        navigate('/body-scan/results');
      }, 2000);
    } catch (error) {
      console.error('Erro ao salvar escaneamento:', error);
      toast.error('Erro ao salvar escaneamento');
      setPhase('ready');
    }
  };

  useEffect(() => {
    startCamera();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      
      <main className="container mx-auto px-4 pt-24 pb-20">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/body-scan/terms')}
              disabled={isScanning}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
          </div>

          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold text-petroleum">
              {phase === 'ready' && 'Pronto para começar?'}
              {phase === 'scanning' && 'Escaneando...'}
              {phase === 'processing' && 'Processando análise...'}
              {phase === 'complete' && 'Escaneamento concluído!'}
            </h1>
            <p className="text-muted-foreground">
              {phase === 'ready' && 'Posicione-se na frente da câmera e clique em iniciar'}
              {phase === 'scanning' && 'Gire lentamente 360° seguindo as instruções'}
              {phase === 'processing' && 'Estamos calculando suas métricas corporais'}
              {phase === 'complete' && 'Redirecionando para os resultados...'}
            </p>
          </div>

          {/* Área de Vídeo/Camera */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-video bg-muted">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay com guias */}
                {phase === 'scanning' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 h-96 border-4 border-mint rounded-full opacity-50 animate-pulse" />
                  </div>
                )}

                {phase === 'complete' && (
                  <div className="absolute inset-0 bg-mint/20 flex items-center justify-center">
                    <div className="bg-white rounded-full p-6 shadow-xl">
                      <Check className="h-16 w-16 text-mint" />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Barra de Progresso */}
          {(phase === 'scanning' || phase === 'processing') && (
            <Card>
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {phase === 'scanning' ? 'Capturando...' : 'Analisando...'}
                  </span>
                  <span className="font-medium text-petroleum">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </CardContent>
            </Card>
          )}

          {/* Instruções durante o scan */}
          {phase === 'scanning' && (
            <Card className="bg-gradient-hero text-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <RotateCcw className="h-8 w-8 animate-spin" />
                  <div>
                    <p className="font-medium mb-1">Gire lentamente</p>
                    <p className="text-white/90 text-sm">
                      Faça uma rotação completa de 360° no sentido horário
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Botões de Ação */}
          {phase === 'ready' && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="outline"
                onClick={startCamera}
                className="gap-2 px-8"
              >
                <Camera className="h-5 w-5" />
                Testar câmera
              </Button>
              <Button 
                size="lg" 
                onClick={startScan}
                disabled={!stream}
                className="bg-mint hover:bg-mint-dark text-white gap-2 px-8"
              >
                Iniciar escaneamento
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          )}

          {phase === 'processing' && (
            <div className="flex justify-center">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Processando suas métricas...</span>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
