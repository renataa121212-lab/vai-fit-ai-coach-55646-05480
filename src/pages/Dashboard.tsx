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
            Hello, {user?.user_metadata?.full_name || 'user'}! 👋
          </h1>
          <p className="text-petroleum-light">Let's achieve your goals today!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Metas Card */}
          <Card className="bg-gradient-card border-mint/20 hover:shadow-md transition-all duration-300 cursor-pointer" onClick={() => navigate('/metas')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-petroleum">Your Goals</CardTitle>
              <Target className="h-4 w-4 text-mint" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-petroleum mb-2">{goalWeight}kg</div>
              <p className="text-xs text-petroleum-light mb-3">Weight goal</p>
              <Progress value={100 - progressPercentage} className="w-full" />
              <p className="text-xs text-petroleum-light mt-2">{Math.abs(currentWeight - goalWeight)}kg to go</p>
            </CardContent>
          </Card>

          {/* Timer de Jejum Card */}
          <Card className="bg-gradient-card border-mint/20 hover:shadow-md transition-all duration-300 cursor-pointer" onClick={() => navigate('/jejum')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-petroleum">Intermittent Fasting</CardTitle>
              <Timer className="h-4 w-4 text-coral" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-petroleum mb-2">16:8</div>
              <p className="text-xs text-petroleum-light mb-3">Active protocol</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-petroleum-light">Next fast:</span>
                <span className="text-xs font-medium text-coral">8:00 PM</span>
              </div>
            </CardContent>
          </Card>


          {/* Evolução Card */}
          <Card className="bg-gradient-card border-mint/20 hover:shadow-md transition-all duration-300 cursor-pointer" onClick={() => navigate('/evolucao')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-petroleum">Your Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-coral" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-petroleum mb-2">-2kg</div>
              <p className="text-xs text-petroleum-light mb-3">This week</p>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-petroleum-light">Current weight:</span>
                  <span className="font-medium text-petroleum">{currentWeight}kg</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-petroleum-light">Mood:</span>
                  <span className="font-medium text-coral">😊 Great</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reconhecimento de Alimentos Card */}
          <Card className="bg-gradient-card border-mint/20 hover:shadow-md transition-all duration-300 cursor-pointer" onClick={() => navigate('/alimentos')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-petroleum">Food Scan</CardTitle>
              <Camera className="h-4 w-4 text-mint" />
            </CardHeader>
            <CardContent>
              <div className="text-center mb-3">
                <Camera className="h-8 w-8 text-mint mx-auto mb-2" />
                <p className="text-xs text-petroleum-light">Scan your meal</p>
              </div>
              <Button className="w-full bg-mint hover:bg-mint-dark text-white">
                Take Photo
              </Button>
            </CardContent>
          </Card>

          {/* Diário Card */}
          <Card className="bg-gradient-card border-mint/20 hover:shadow-md transition-all duration-300 cursor-pointer" onClick={() => navigate('/evolucao')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-petroleum">Journal</CardTitle>
              <BookOpen className="h-4 w-4 text-lavender" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold text-petroleum mb-2">7 days</div>
              <p className="text-xs text-petroleum-light mb-3">Active streak</p>
              <Button variant="outline" className="w-full border-lavender text-lavender hover:bg-lavender hover:text-white">
                View History
              </Button>
            </CardContent>
          </Card>

          {/* Escaneamento Corporal Card */}
          <Card className="bg-gradient-card border-mint/20 hover:shadow-md transition-all duration-300 cursor-pointer" onClick={() => navigate('/body-scan/intro')}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-petroleum">Body Scan</CardTitle>
              <Scan className="h-4 w-4 text-coral" />
            </CardHeader>
            <CardContent>
              <div className="text-center mb-3">
                <Scan className="h-8 w-8 text-coral mx-auto mb-2" />
                <p className="text-xs text-petroleum-light">3D body analysis</p>
              </div>
              <Button className="w-full bg-coral hover:bg-coral-dark text-white">
                Start Scan
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Resumo Rápido */}
        <div className="mt-8">
          <Card className="bg-gradient-hero text-white">
            <CardContent className="pt-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Keep it up! 🚀</h2>
                <p className="text-white/90 mb-4">
                  You're on the right track to achieving your health and wellness goals!
                </p>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center">
                    <div className="text-xl font-bold">15</div>
                    <div className="text-xs text-white/80">Active days</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">8</div>
                    <div className="text-xs text-white/80">Workouts completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">3</div>
                    <div className="text-xs text-white/80">Goals achieved</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Lívia Chat */}
      <LiviaChat 
        context="Dashboard - user progress overview"
        initialMessage="Hello! I'm Lívia, your fitness expert. How can I help you today? 💪"
      />
    </div>
  );
};

export default Dashboard;