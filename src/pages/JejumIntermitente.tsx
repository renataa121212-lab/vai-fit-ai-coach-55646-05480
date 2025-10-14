import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Play, Pause, RotateCcw, TrendingUp, Bell, Settings } from 'lucide-react';
import AppNav from '@/components/AppNav';
import { useToast } from '@/hooks/use-toast';

const JejumIntermitente = () => {
  const { toast } = useToast();
  const [selectedProtocol, setSelectedProtocol] = useState('16:8');
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(16 * 60 * 60);
  const [currentPhase, setCurrentPhase] = useState<'jejum' | 'alimentacao'>('jejum');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [customJejum, setCustomJejum] = useState({ jejum: 16, alimentacao: 8 });
  const [showCustomDialog, setShowCustomDialog] = useState(false);

  const protocols = {
    '16:8': { jejum: 16, alimentacao: 8 },
    '18:6': { jejum: 18, alimentacao: 6 },
    '20:4': { jejum: 20, alimentacao: 4 },
    '24:0': { jejum: 24, alimentacao: 0 },
    'custom': customJejum
  };

  // Request notification permission
  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setNotificationsEnabled(true);
        toast({
          title: "Notificações ativadas!",
          description: "Você receberá alertas sobre seu jejum.",
        });
      } else {
        toast({
          title: "Notificações bloqueadas",
          description: "Ative nas configurações do navegador.",
          variant: "destructive",
        });
      }
    }
  };

  // Send notification
  const sendNotification = (title: string, body: string) => {
    if (notificationsEnabled && 'Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        body,
        icon: '/icon-192.png',
        badge: '/icon-192.png',
      });
    }
  };

  // Persist timer in localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('jejum-state');
    if (savedState) {
      const state = JSON.parse(savedState);
      setSelectedProtocol(state.protocol);
      setCurrentPhase(state.phase);
      setIsActive(state.isActive);
      setStartTime(state.startTime);
      
      if (state.isActive && state.startTime) {
        const elapsed = Math.floor((Date.now() - state.startTime) / 1000);
        const remaining = state.totalTime - elapsed;
        setTimeRemaining(remaining > 0 ? remaining : 0);
      }
    }
  }, []);

  // Save state to localStorage
  useEffect(() => {
    if (isActive && startTime) {
      const state = {
        protocol: selectedProtocol,
        phase: currentPhase,
        isActive,
        startTime,
        totalTime: protocols[selectedProtocol as keyof typeof protocols][currentPhase] * 60 * 60,
      };
      localStorage.setItem('jejum-state', JSON.stringify(state));
    }
  }, [isActive, startTime, selectedProtocol, currentPhase]);

  // Background timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => {
          const newTime = time - 1;
          
          // Send notification at milestones
          if (newTime === 60 * 60) {
            sendNotification('Jejum Intermitente', '1 hora restante!');
          } else if (newTime === 30 * 60) {
            sendNotification('Jejum Intermitente', '30 minutos restantes!');
          } else if (newTime === 0) {
            sendNotification('Jejum Intermitente', currentPhase === 'jejum' ? 'Jejum completo! Pode se alimentar.' : 'Janela de alimentação encerrada!');
            setIsActive(false);
          }
          
          return newTime;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeRemaining, currentPhase]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    const totalTime = protocols[selectedProtocol as keyof typeof protocols][currentPhase] * 60 * 60;
    return ((totalTime - timeRemaining) / totalTime) * 100;
  };

  const handleStart = () => {
    setIsActive(true);
    setStartTime(Date.now());
    sendNotification('Jejum Iniciado', `Seu jejum de ${selectedProtocol} começou!`);
  };

  const handlePause = () => {
    setIsActive(false);
    setStartTime(null);
    localStorage.removeItem('jejum-state');
  };

  const handleReset = () => {
    setIsActive(false);
    setStartTime(null);
    setTimeRemaining(protocols[selectedProtocol as keyof typeof protocols][currentPhase] * 60 * 60);
    localStorage.removeItem('jejum-state');
  };

  const handleProtocolChange = (protocol: string) => {
    if (protocol === 'custom') {
      setShowCustomDialog(true);
      return;
    }
    setSelectedProtocol(protocol);
    setIsActive(false);
    setStartTime(null);
    setTimeRemaining(protocols[protocol as keyof typeof protocols][currentPhase] * 60 * 60);
    localStorage.removeItem('jejum-state');
  };

  const handleCustomJejum = () => {
    if (customJejum.jejum > 0 && customJejum.alimentacao >= 0) {
      protocols.custom = customJejum;
      setSelectedProtocol('custom');
      setIsActive(false);
      setStartTime(null);
      setTimeRemaining(customJejum[currentPhase] * 60 * 60);
      setShowCustomDialog(false);
      toast({
        title: "Jejum personalizado criado!",
        description: `${customJejum.jejum}h jejum / ${customJejum.alimentacao}h alimentação`,
      });
    }
  };

  const benefits = [
    {
      title: "Queima de Gordura",
      description: "Acelera o metabolismo e promove a lipólise",
      icon: "🔥"
    },
    {
      title: "Autophagia",
      description: "Limpeza celular e renovação das células",
      icon: "🔄"
    },
    {
      title: "Clareza Mental",
      description: "Melhora o foco e a concentração",
      icon: "🧠"
    },
    {
      title: "Controle Glicêmico",
      description: "Estabiliza os níveis de açúcar no sangue",
      icon: "📊"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-petroleum">Jejum Intermitente</h1>
            <p className="text-petroleum-light">Transforme sua saúde através do jejum</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={requestNotificationPermission}
              className={notificationsEnabled ? 'bg-mint/10 border-mint text-mint' : ''}
            >
              <Bell className="h-4 w-4" />
            </Button>
            <Dialog open={showCustomDialog} onOpenChange={setShowCustomDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Jejum Personalizado</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-sm text-petroleum-light">
                    Defina quantas horas você deseja jejuar. A janela de alimentação será calculada automaticamente.
                  </p>
                  <div>
                    <Label htmlFor="jejum-hours">Quantas horas de jejum?</Label>
                    <Input
                      id="jejum-hours"
                      type="number"
                      min="4"
                      max="48"
                      value={customJejum.jejum}
                      onChange={(e) => {
                        const jejumHours = Number(e.target.value);
                        const alimentacaoHours = Math.max(0, 24 - jejumHours);
                        setCustomJejum({ jejum: jejumHours, alimentacao: alimentacaoHours });
                      }}
                    />
                    <p className="text-xs text-petroleum-light mt-1">
                      Janela de alimentação: {customJejum.alimentacao}h
                    </p>
                  </div>
                  <Button onClick={handleCustomJejum} className="w-full bg-mint hover:bg-mint-dark text-white">
                    Salvar Protocolo
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Card className="bg-gradient-card border-mint/20">
              <CardHeader>
                <CardTitle className="text-petroleum text-center">
                  Protocolo {selectedProtocol === 'custom' ? `${customJejum.jejum}:${customJejum.alimentacao}` : selectedProtocol} - {currentPhase === 'jejum' ? 'Jejum' : 'Alimentação'}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="w-full max-w-xs mx-auto">
                  <Select value={selectedProtocol} onValueChange={handleProtocolChange}>
                    <SelectTrigger className="border-mint/30">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="16:8">16:8 (Iniciante)</SelectItem>
                      <SelectItem value="18:6">18:6 (Intermediário)</SelectItem>
                      <SelectItem value="20:4">20:4 (Avançado)</SelectItem>
                      <SelectItem value="24:0">24:0 (Expert)</SelectItem>
                      <SelectItem value="custom">Personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="relative">
                  <div className="w-48 h-48 mx-auto rounded-full border-8 border-mint/20 flex items-center justify-center bg-white shadow-lg">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-petroleum mb-1">
                        {formatTime(timeRemaining)}
                      </div>
                      <div className="text-sm text-petroleum-light">
                        {currentPhase === 'jejum' ? 'Jejuando' : 'Janela de alimentação'}
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 w-48 h-48 mx-auto">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="hsl(var(--mint))"
                        strokeWidth="4"
                        strokeDasharray={`${getProgress() * 2.83} 283`}
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                  </div>
                </div>

                <div className="space-y-2">
                  <Progress value={getProgress()} className="w-full" />
                  <p className="text-xs text-petroleum-light">
                    {Math.round(getProgress())}% completo
                  </p>
                </div>

                <div className="flex justify-center space-x-4">
                  {!isActive ? (
                    <Button
                      onClick={handleStart}
                      className="bg-mint hover:bg-mint-dark text-white px-8"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      {currentPhase === 'jejum' ? 'Começar Jejum' : 'Iniciar Alimentação'}
                    </Button>
                  ) : (
                    <Button
                      onClick={handlePause}
                      variant="outline"
                      className="border-coral text-coral hover:bg-coral hover:text-white px-8"
                    >
                      <Pause className="h-4 w-4 mr-2" />
                      Pausar
                    </Button>
                  )}
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="border-lavender text-lavender hover:bg-lavender hover:text-white"
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  onClick={() => {
                    const newPhase = currentPhase === 'jejum' ? 'alimentacao' : 'jejum';
                    setCurrentPhase(newPhase);
                    setTimeRemaining(protocols[selectedProtocol as keyof typeof protocols][newPhase] * 60 * 60);
                    setIsActive(false);
                    setStartTime(null);
                    localStorage.removeItem('jejum-state');
                  }}
                  variant="outline"
                  className="w-full border-petroleum text-petroleum hover:bg-petroleum hover:text-white"
                >
                  Alternar para {currentPhase === 'jejum' ? 'Janela de Alimentação' : 'Jejum'}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-gradient-hero text-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Benefícios do Jejum
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="p-4 rounded-lg bg-white/10 backdrop-blur">
                      <div className="text-3xl mb-2">{benefit.icon}</div>
                      <h3 className="font-semibold mb-1">{benefit.title}</h3>
                      <p className="text-sm text-white/80">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-mint/20">
              <CardHeader>
                <CardTitle className="text-petroleum">💡 Dicas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-petroleum-light">
                  <p>• Beba bastante água durante o jejum</p>
                  <p>• Café e chá sem açúcar são permitidos</p>
                  <p>• Comece devagar e aumente gradualmente</p>
                  <p>• Ouça seu corpo e ajuste conforme necessário</p>
                  <p>• Consulte um médico antes de iniciar</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JejumIntermitente;
