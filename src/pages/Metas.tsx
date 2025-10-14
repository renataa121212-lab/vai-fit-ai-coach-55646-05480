import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Target, Trophy, Calendar, CheckCircle, Star } from 'lucide-react';
import AppNav from '@/components/AppNav';

const Metas = () => {
  const [showNewGoal, setShowNewGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    targetValue: '',
    currentValue: '',
    deadline: '',
    type: 'weight'
  });

  const [metas, setMetas] = useState([
    {
      id: 1,
      title: "Perder 5kg",
      description: "Meta de emagrecimento saudável",
      targetValue: 70,
      currentValue: 75,
      deadline: "2024-12-31",
      type: "weight",
      completed: false,
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      title: "30 treinos no mês",
      description: "Consistência nos exercícios",
      targetValue: 30,
      currentValue: 22,
      deadline: "2024-10-31",
      type: "workout",
      completed: false,
      createdAt: "2024-10-01"
    },
    {
      id: 3,
      title: "Jejum 16:8 por 21 dias",
      description: "Implementar jejum intermitente",
      targetValue: 21,
      currentValue: 21,
      deadline: "2024-09-30",
      type: "fasting",
      completed: true,
      createdAt: "2024-09-01"
    }
  ]);

  const achievements = [
    { id: 1, title: "Primeira Semana", icon: "🎯", description: "Completou 7 dias consecutivos" },
    { id: 2, title: "Dedicação", icon: "💪", description: "20 treinos completados" },
    { id: 3, title: "Consistência", icon: "⚡", description: "14 dias de jejum seguidos" },
    { id: 4, title: "Transformação", icon: "🏆", description: "Primeira meta de peso atingida" }
  ];

  const motivationalPhrases = [
    "Cada dia é uma nova oportunidade! 💪",
    "Você está mais forte do que pensa! 🌟",
    "Progresso, não perfeição! 🚀",
    "Seu futuro eu agradece! ✨",
    "Pequenos passos, grandes resultados! 🎯"
  ];

  const handleCreateGoal = () => {
    if (newGoal.title && newGoal.targetValue) {
      const goal = {
        id: Date.now(),
        ...newGoal,
        targetValue: Number(newGoal.targetValue),
        currentValue: Number(newGoal.currentValue) || 0,
        completed: false,
        createdAt: new Date().toISOString().split('T')[0]
      };
      // Add new goal at the beginning (most recent first)
      setMetas([goal, ...metas]);
      setNewGoal({
        title: '',
        description: '',
        targetValue: '',
        currentValue: '',
        deadline: '',
        type: 'weight'
      });
      setShowNewGoal(false);
    }
  };

  const getProgressPercentage = (current: number, target: number, type: string) => {
    if (type === 'weight') {
      // Para peso, assumimos que começou em 80kg e quer chegar a 70kg
      const startValue = 80;
      return Math.max(0, Math.min(100, ((startValue - current) / (startValue - target)) * 100));
    }
    return Math.max(0, Math.min(100, (current / target) * 100));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'weight': return '⚖️';
      case 'workout': return '💪';
      case 'fasting': return '⏰';
      case 'nutrition': return '🥗';
      default: return '🎯';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'weight': return 'mint';
      case 'workout': return 'lavender';
      case 'fasting': return 'coral';
      case 'nutrition': return 'petroleum';
      default: return 'mint';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-petroleum">Suas Metas</h1>
            <p className="text-petroleum-light">Defina e acompanhe seus objetivos</p>
          </div>
          <Button
            onClick={() => setShowNewGoal(true)}
            className="bg-mint hover:bg-mint-dark text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nova Meta
          </Button>
        </div>

        {/* Frase Motivacional Diária */}
        <Card className="bg-gradient-hero text-white mb-6">
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-xl font-bold mb-2">💫 Motivação do Dia</h2>
              <p className="text-lg text-white/90">
                {motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)]}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Metas Ativas */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-petroleum mb-4">Metas Ativas</h2>
              <div className="space-y-4">
                {metas.filter(meta => !meta.completed).map((meta) => (
                  <Card key={meta.id} className="bg-gradient-card border-mint/20">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{getTypeIcon(meta.type)}</div>
                          <div>
                            <h3 className="font-semibold text-petroleum">{meta.title}</h3>
                            <p className="text-sm text-petroleum-light">{meta.description}</p>
                          </div>
                        </div>
                        <Badge className={`bg-${getTypeColor(meta.type)} text-white`}>
                          {meta.type}
                        </Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-petroleum-light">Progresso:</span>
                          <span className="font-medium text-petroleum">
                            {meta.currentValue}/{meta.targetValue}
                            {meta.type === 'weight' ? 'kg' : meta.type === 'workout' ? ' treinos' : ' dias'}
                          </span>
                        </div>
                        
                        <Progress 
                          value={getProgressPercentage(meta.currentValue, meta.targetValue, meta.type)} 
                          className="w-full" 
                        />
                        
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-petroleum-light">
                            Prazo: {new Date(meta.deadline).toLocaleDateString('pt-BR')}
                          </span>
                          <span className="font-medium text-coral">
                            {Math.round(getProgressPercentage(meta.currentValue, meta.targetValue, meta.type))}% completo
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Metas Concluídas */}
            <div>
              <h2 className="text-xl font-semibold text-petroleum mb-4">Metas Concluídas 🎉</h2>
              <div className="space-y-4">
                {metas.filter(meta => meta.completed).map((meta) => (
                  <Card key={meta.id} className="bg-gradient-card border-coral/20 opacity-80">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="h-6 w-6 text-coral" />
                          <div>
                            <h3 className="font-semibold text-petroleum">{meta.title}</h3>
                            <p className="text-sm text-petroleum-light">{meta.description}</p>
                          </div>
                        </div>
                        <Badge className="bg-coral text-white">Concluída</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Conquistas */}
            <Card className="bg-gradient-card border-mint/20">
              <CardHeader>
                <CardTitle className="text-petroleum flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-coral" />
                  Conquistas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-center space-x-3 p-2 rounded-lg bg-white/50">
                      <div className="text-xl">{achievement.icon}</div>
                      <div>
                        <h4 className="font-medium text-petroleum text-sm">{achievement.title}</h4>
                        <p className="text-xs text-petroleum-light">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Estatísticas */}
            <Card className="bg-gradient-card border-mint/20">
              <CardHeader>
                <CardTitle className="text-petroleum">Suas Estatísticas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-coral">3</div>
                    <div className="text-xs text-petroleum-light">Metas criadas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-mint">1</div>
                    <div className="text-xs text-petroleum-light">Metas concluídas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-lavender">67%</div>
                    <div className="text-xs text-petroleum-light">Taxa de sucesso</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Modal Nova Meta */}
        {showNewGoal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="text-petroleum">Nova Meta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Título da Meta</Label>
                  <Input
                    id="title"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                    placeholder="Ex: Perder 3kg"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={newGoal.description}
                    onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                    placeholder="Descreva sua meta..."
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="target">Valor Alvo</Label>
                    <Input
                      id="target"
                      type="number"
                      value={newGoal.targetValue}
                      onChange={(e) => setNewGoal({...newGoal, targetValue: e.target.value})}
                      placeholder="70"
                    />
                  </div>
                  <div>
                    <Label htmlFor="current">Valor Atual</Label>
                    <Input
                      id="current"
                      type="number"
                      value={newGoal.currentValue}
                      onChange={(e) => setNewGoal({...newGoal, currentValue: e.target.value})}
                      placeholder="75"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="deadline">Prazo</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                  />
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowNewGoal(false)}
                    className="flex-1 border-lavender text-lavender hover:bg-lavender hover:text-white"
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleCreateGoal}
                    className="flex-1 bg-mint hover:bg-mint-dark text-white"
                  >
                    Salvar Meta
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Metas;