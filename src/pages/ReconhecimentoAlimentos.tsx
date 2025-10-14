import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Camera, Save, RefreshCw, Utensils, Zap, Upload } from 'lucide-react';
import AppNav from '@/components/AppNav';
import { LiviaChat } from '@/components/LiviaChat';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const ReconhecimentoAlimentos = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [useCamera, setUseCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const alternativesFoods = [
    {
      original: "Arroz Integral",
      alternatives: [
        { name: "Quinoa", calories: -20, benefit: "Mais proteína" },
        { name: "Batata Doce", calories: -30, benefit: "Mais fibras" },
        { name: "Couve-flor", calories: -100, benefit: "Menos carboidratos" }
      ]
    }
  ];

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }
      setStream(mediaStream);
      setUseCamera(true);
    } catch (error) {
      toast({
        title: "Erro ao acessar câmera",
        description: "Verifique as permissões do navegador.",
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setUseCamera(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0);
      canvas.toBlob(blob => {
        if (blob) analyzeImage(blob);
      }, 'image/jpeg');
    }
    stopCamera();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) analyzeImage(file);
  };

  const analyzeImage = async (imageBlob: Blob) => {
    if (!user) {
      toast({
        title: "Faça login",
        description: "Você precisa estar logado para analisar alimentos.",
        variant: "destructive",
      });
      return;
    }

    setIsScanning(true);
    try {
      // Upload image to storage
      const fileName = `${user.id}/${Date.now()}.jpg`;
      const { error: uploadError } = await supabase.storage
        .from('food-images')
        .upload(fileName, imageBlob);

      if (uploadError) throw uploadError;

      // Get signed URL
      const { data: urlData, error: urlError } = await supabase.storage
        .from('food-images')
        .createSignedUrl(fileName, 3600);

      if (urlError || !urlData) throw new Error('Failed to get image URL');

      // Convert image to base64 for AI analysis
      const reader = new FileReader();
      reader.readAsDataURL(imageBlob);
      reader.onloadend = async () => {
        const base64 = reader.result as string;

        // Call food-analyze edge function
        const { data, error } = await supabase.functions.invoke('food-analyze', {
          body: { image: base64 }
        });

        if (error) throw error;

        setScanResult(data);
        setIsScanning(false);
      };
    } catch (error: any) {
      console.error('Analyze error:', error);
      toast({
        title: "Erro ao analisar",
        description: error.message,
        variant: "destructive",
      });
      setIsScanning(false);
    }
  };

  const handleSaveToAlimentos = () => {
    toast({
      title: "Salvo!",
      description: "Alimento salvo no seu diário.",
    });
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-mint';
    if (score >= 60) return 'text-coral';
    return 'text-destructive';
  };

  const getMacroPercentage = (macro: number) => {
    if (!scanResult) return 0;
    return Math.round((macro * 4 / scanResult.totalCalories) * 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-petroleum">Scan de Alimentos</h1>
          <p className="text-petroleum-light">Descubra as calorias da sua refeição</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card className="bg-gradient-card border-mint/20">
              <CardHeader>
                <CardTitle className="text-petroleum text-center">
                  {isScanning ? 'Analisando...' : useCamera ? 'Câmera Ativa' : 'Fotografe sua Refeição'}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                {!isScanning && !scanResult && !useCamera && (
                  <>
                    <div className="w-48 h-48 mx-auto bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-mint/30">
                      <Camera className="h-16 w-16 text-mint/50" />
                    </div>
                    <p className="text-petroleum-light text-sm">
                      Posicione sua refeição no centro da câmera para melhor precisão
                    </p>
                    <div className="flex flex-col gap-2">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        capture="environment"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                      <Button
                        onClick={startCamera}
                        className="bg-mint hover:bg-mint-dark text-white px-8"
                      >
                        <Camera className="h-4 w-4 mr-2" />
                        Tirar Foto
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          if (fileInputRef.current) {
                            fileInputRef.current.removeAttribute('capture');
                            fileInputRef.current.click();
                            setTimeout(() => {
                              fileInputRef.current?.setAttribute('capture', 'environment');
                            }, 100);
                          }
                        }}
                        className="border-mint text-mint hover:bg-mint hover:text-white px-8"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Carregar da Galeria
                      </Button>
                    </div>
                  </>
                )}

                {useCamera && (
                  <>
                    <div className="relative w-full max-w-md mx-auto">
                      <video
                        ref={videoRef}
                        className="w-full rounded-lg"
                        playsInline
                      />
                      <canvas ref={canvasRef} className="hidden" />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={capturePhoto}
                        className="flex-1 bg-mint hover:bg-mint-dark text-white"
                      >
                        <Camera className="h-4 w-4 mr-2" />
                        Capturar
                      </Button>
                      <Button
                        variant="outline"
                        onClick={stopCamera}
                        className="flex-1 border-coral text-coral hover:bg-coral hover:text-white"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </>
                )}

                {isScanning && (
                  <>
                    <div className="w-48 h-48 mx-auto bg-mint/10 rounded-lg flex items-center justify-center">
                      <div className="animate-spin">
                        <Zap className="h-16 w-16 text-mint" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-petroleum font-medium">Analisando imagem...</p>
                      <Progress value={65} className="w-full" />
                      <p className="text-petroleum-light text-sm">
                        Identificando alimentos e calculando nutrientes
                      </p>
                    </div>
                  </>
                )}

                {scanResult && (
                  <>
                    <div className="w-48 h-48 mx-auto bg-gradient-hero rounded-lg flex items-center justify-center text-white">
                      <div className="text-center">
                        <Utensils className="h-12 w-12 mx-auto mb-2" />
                        <div className="text-2xl font-bold">{scanResult.totalCalories}</div>
                        <div className="text-sm">kcal total</div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => setScanResult(null)}
                        className="flex-1 border-lavender text-lavender hover:bg-lavender hover:text-white"
                      >
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Nova Foto
                      </Button>
                      <Button
                        onClick={handleSaveToAlimentos}
                        className="flex-1 bg-mint hover:bg-mint-dark text-white"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Salvar no Diário
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {scanResult && (
              <>
                <Card className="bg-gradient-card border-mint/20">
                  <CardHeader>
                    <CardTitle className="text-petroleum flex items-center justify-between">
                      Resumo Nutricional
                      <Badge className={`${getHealthScoreColor(scanResult.healthScore)} bg-transparent border`}>
                        Score: {scanResult.healthScore}/100
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 rounded-lg bg-white/50">
                        <div className="text-xl font-bold text-coral">{scanResult.totalMacros.protein}g</div>
                        <div className="text-xs text-petroleum-light">Proteínas</div>
                        <div className="text-xs text-coral">{getMacroPercentage(scanResult.totalMacros.protein)}%</div>
                      </div>
                      <div className="p-3 rounded-lg bg-white/50">
                        <div className="text-xl font-bold text-mint">{scanResult.totalMacros.carbs}g</div>
                        <div className="text-xs text-petroleum-light">Carboidratos</div>
                        <div className="text-xs text-mint">{getMacroPercentage(scanResult.totalMacros.carbs)}%</div>
                      </div>
                      <div className="p-3 rounded-lg bg-white/50">
                        <div className="text-xl font-bold text-lavender">{scanResult.totalMacros.fat}g</div>
                        <div className="text-xs text-petroleum-light">Gorduras</div>
                        <div className="text-xs text-lavender">{getMacroPercentage(scanResult.totalMacros.fat)}%</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-petroleum-light">Proteínas:</span>
                        <Progress value={getMacroPercentage(scanResult.totalMacros.protein)} className="w-2/3" />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-petroleum-light">Carboidratos:</span>
                        <Progress value={getMacroPercentage(scanResult.totalMacros.carbs)} className="w-2/3" />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-petroleum-light">Gorduras:</span>
                        <Progress value={getMacroPercentage(scanResult.totalMacros.fat)} className="w-2/3" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-card border-mint/20">
                  <CardHeader>
                    <CardTitle className="text-petroleum">Alimentos Identificados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {scanResult.foods.map((food: any, index: number) => (
                        <div key={index} className="p-3 rounded-lg bg-white/50 border border-mint/20">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-medium text-petroleum">{food.name}</h4>
                              <p className="text-sm text-petroleum-light">{food.quantity}</p>
                            </div>
                            <Badge className="bg-coral text-white">
                              {food.calories} kcal
                            </Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-xs">
                            <div className="text-center">
                              <span className="text-petroleum-light">P: </span>
                              <span className="font-medium">{food.macros.protein}g</span>
                            </div>
                            <div className="text-center">
                              <span className="text-petroleum-light">C: </span>
                              <span className="font-medium">{food.macros.carbs}g</span>
                            </div>
                            <div className="text-center">
                              <span className="text-petroleum-light">G: </span>
                              <span className="font-medium">{food.macros.fat}g</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-card border-mint/20">
                  <CardHeader>
                    <CardTitle className="text-petroleum">Sugestões de Melhoria</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {scanResult.suggestions.map((suggestion: string, index: number) => (
                        <div key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 rounded-full bg-mint mt-2"></div>
                          <p className="text-sm text-petroleum-light">{suggestion}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-hero text-white">
                  <CardHeader>
                    <CardTitle>💡 Alternativas Saudáveis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {alternativesFoods.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <h4 className="font-medium">Substitua: {item.original}</h4>
                        <div className="space-y-1">
                          {item.alternatives.map((alt, altIndex) => (
                            <div key={altIndex} className="flex justify-between items-center text-sm bg-white/10 rounded p-2">
                              <span>{alt.name}</span>
                              <div className="text-right">
                                <div className="text-green-300">{alt.calories} kcal</div>
                                <div className="text-xs text-white/80">{alt.benefit}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </>
            )}

            {!scanResult && (
              <Card className="bg-gradient-card border-mint/20">
                <CardHeader>
                  <CardTitle className="text-petroleum">Como usar</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-mint text-white text-xs flex items-center justify-center font-bold">1</div>
                      <p className="text-sm text-petroleum-light">Posicione o prato em boa iluminação</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-mint text-white text-xs flex items-center justify-center font-bold">2</div>
                      <p className="text-sm text-petroleum-light">Fotografe de cima para melhor reconhecimento</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-mint text-white text-xs flex items-center justify-center font-bold">3</div>
                      <p className="text-sm text-petroleum-light">Aguarde a análise automática</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-mint text-white text-xs flex items-center justify-center font-bold">4</div>
                      <p className="text-sm text-petroleum-light">Salve no seu diário alimentar</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        
        <LiviaChat 
          context={`Reconhecimento de Alimentos - ${scanResult ? 'Analisando prato escaneado' : 'Aguardando scan'}`}
          initialMessage="Oi! Tire uma foto do seu prato e eu te ajudo a entender os nutrientes e calorias. 🍽️"
        />
      </div>
    </div>
  );
};

export default ReconhecimentoAlimentos;
