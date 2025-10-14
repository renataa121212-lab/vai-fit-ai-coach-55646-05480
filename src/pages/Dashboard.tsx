import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/hooks/useAuth';
import { Target, Timer, Dumbbell, TrendingUp, Camera, BookOpen, Scan } from 'lucide-react';
import AppNav from '@/components/AppNav';
import { LiviaChat } from '@/components/LiviaChat';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentWeight, setCurrentWeight] = useState(75);
  const [goalWeight, setGoalWeight] = useState(70);

  const progressPercentage = Math.max(0, ((currentWeight - goalWeight) / (80 - goalWeight)) * 100);

  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-petroleum mb-2">
            Olá, {user?.user_metadata?.full_name || 'usuário'}! 👋
          </h1>
          <p className="text-petroleum-light">Vamos conquistar os objetivos hoje!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Metas Card */}
          <Card className="bg-gradient-card border-mint/20 hover:shadow-md transition-all duration-300 cursor-pointer" onClick={() => navigate('/metas')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-petroleum">Suas Metas</CardTitle>
              <Target className="h-4 w-4 text-mint" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-petroleum mb-2">{goalWeight}kg</div>
              <p className="text-xs text-petroleum-light mb-3">Meta de peso</p>
              <Progress value={100 - progressPercentage} className="w-full" />
              <p className="text-xs text-petroleum-light mt-2">Faltam {Math.abs(currentWeight - goalWeight)}kg</p>
            </CardContent>
          </Card>

          {/* Timer de Jejum Card */}
          <Card className="bg-gradient-card border-mint/20 hover:shadow-md transition-all duration-300 cursor-pointer" onClick={() => navigate('/jejum')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-petroleum">Jejum Intermitente</CardTitle>
              <Timer className="h-4 w-4 text-coral" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-petroleum mb-2">16:8</div>
              <p className="text-xs text-petroleum-light mb-3">Protocolo ativo</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-petroleum-light">Próximo jejum:</span>
                <span className="text-xs font-medium text-coral">20:00</span>
              </div>
            </CardContent>
          </Card>

          {/* Treino do Dia Card */}
          <Card className="bg-gradient-card border-mint/20 hover:shadow-md transition-all duration-300 cursor-pointer" onClick={() => navigate('/treinos')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-petroleum">Treino do Dia</CardTitle>
              <Dumbbell className="h-4 w-4 text-lavender" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-petroleum mb-2">Perna & Glúteos</div>
              <p className="text-xs text-petroleum-light mb-3">45 min • Intermediário</p>
              <Button className="w-full bg-mint hover:bg-mint-dark text-white">
                Iniciar Treino
              </Button>
            </CardContent>
          </Card>

          {/* Evolução Card */}
          <Card className="bg-gradient-card border-mint/20 hover:shadow-md transition-all duration-300 cursor-pointer" onClick={() => navigate('/evolucao')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-petroleum">Sua Evolução</CardTitle>
              <TrendingUp className="h-4 w-4 text-coral" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-petroleum mb-2">-2kg</div>
              <p className="text-xs text-petroleum-light mb-3">Nesta semana</p>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-petroleum-light">Peso atual:</span>
                  <span className="font-medium text-petroleum">{currentWeight}kg</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-petroleum-light">Humor:</span>
                  <span className="font-medium text-coral">😊 Ótimo</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reconhecimento de Alimentos Card */}
          <Card className="bg-gradient-card border-mint/20 hover:shadow-md transition-all duration-300 cursor-pointer" onClick={() => navigate('/alimentos')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-petroleum">Scan de Alimentos</CardTitle>
              <Camera className="h-4 w-4 text-mint" />
            </CardHeader>
            <CardContent>
              <div className="text-center mb-3">
                <Camera className="h-8 w-8 text-mint mx-auto mb-2" />
                <p className="text-xs text-petroleum-light">Escaneie sua refeição</p>
              </div>
              <Button className="w-full bg-mint hover:bg-mint-dark text-white">
                Tirar Foto
              </Button>
            </CardContent>
          </Card>

          {/* Diário Card */}
          <Card className="bg-gradient-card border-mint/20 hover:shadow-md transition-all duration-300 cursor-pointer" onClick={() => navigate('/evolucao')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-petroleum">Diário</CardTitle>
              <BookOpen className="h-4 w-4 text-lavender" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-petroleum mb-2">7 dias</div>
              <p className="text-xs text-petroleum-light mb-3">Sequência ativa</p>
              <Button variant="outline" className="w-full border-lavender text-lavender hover:bg-lavender hover:text-white">
                Ver Histórico
              </Button>
            </CardContent>
          </Card>

          {/* Escaneamento Corporal Card */}
          <Card className="bg-gradient-card border-mint/20 hover:shadow-md transition-all duration-300 cursor-pointer" onClick={() => navigate('/body-scan/intro')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-petroleum">Scan Corporal</CardTitle>
              <Scan className="h-4 w-4 text-coral" />
            </CardHeader>
            <CardContent>
              <div className="text-center mb-3">
                <Scan className="h-8 w-8 text-coral mx-auto mb-2" />
                <p className="text-xs text-petroleum-light">Análise 3D do corpo</p>
              </div>
              <Button className="w-full bg-coral hover:bg-coral-dark text-white">
                Iniciar Scan
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Resumo Rápido */}
        <div className="mt-8">
          <Card className="bg-gradient-hero text-white">
            <CardContent className="pt-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Continue assim! 🚀</h2>
                <p className="text-white/90 mb-4">
                  No caminho certo para atingir as metas de saúde e bem-estar!
                </p>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center">
                    <div className="text-xl font-bold">15</div>
                    <div className="text-xs text-white/80">Dias ativos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">8</div>
                    <div className="text-xs text-white/80">Treinos completos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">3</div>
                    <div className="text-xs text-white/80">Metas atingidas</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Lívia Chat */}
      <LiviaChat 
        context="Dashboard - visão geral do progresso do usuário"
        initialMessage="Olá! Sou a Lívia, sua especialista fitness. Como posso te ajudar hoje? 💪"
      />
    </div>
  );
};

export default Dashboard;