import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Target, Trophy, Calendar, CheckCircle, Star } from 'lucide-react';
import AppNav from '@/components/AppNav';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { useTranslation } from '@/lib/i18n';

const Metas = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [showNewGoal, setShowNewGoal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    targetValue: '',
    currentValue: '',
    deadline: '',
    type: 'weight'
  });

  const [metas, setMetas] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      loadGoals();
    }
  }, [user]);

  const loadGoals = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setMetas(data || []);
    } catch (error) {
      console.error('Error loading goals:', error);
      toast.error('Error loading goals');
    } finally {
      setLoading(false);
    }
  };

  const achievements = [
    { id: 1, title: "First Week", icon: "🎯", description: "Completed 7 consecutive days" },
    { id: 2, title: "Dedication", icon: "💪", description: "20 workouts completed" },
    { id: 3, title: "Consistency", icon: "⚡", description: "14 days of fasting in a row" },
    { id: 4, title: "Transformation", icon: "🏆", description: "First weight goal achieved" }
  ];

  const motivationalPhrases = [
    "Every day is a new opportunity! 💪",
    "You're stronger than you think! 🌟",
    "Progress, not perfection! 🚀",
    "Your future self thanks you! ✨",
    "Small steps, big results! 🎯"
  ];

  const handleCreateGoal = async () => {
    if (!newGoal.title || !newGoal.targetValue || !user) {
      toast.error('Fill in all required fields');
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from('goals')
      .insert({
        user_id: user.id,
        title: newGoal.title,
        description: newGoal.description,
        target_value: Number(newGoal.targetValue),
        current_value: Number(newGoal.currentValue) || 0,
        deadline: newGoal.deadline || null,
        goal_type: newGoal.type,
        completed: false,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating goal:', error);
      toast.error('Error creating goal');
      setLoading(false);
      return;
    }

    toast.success('Goal created successfully!');
    setNewGoal({
      title: '',
      description: '',
      targetValue: '',
      currentValue: '',
      deadline: '',
      type: 'weight'
    });
    setShowNewGoal(false);
    setLoading(false);
    loadGoals();
  };

  const getProgressPercentage = (current: number, target: number, type: string) => {
    if (type === 'weight') {
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
            <h1 className="text-3xl font-bold text-petroleum">{t('goalsTitle')}</h1>
            <p className="text-petroleum-light">{t('goalsSubtitle')}</p>
          </div>
          <Button
            onClick={() => setShowNewGoal(true)}
            className="bg-mint hover:bg-mint-dark text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            {t('newGoal')}
          </Button>
        </div>

        {/* Motivational Phrase */}
        <Card className="bg-gradient-hero text-white mb-6">
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-xl font-bold mb-2">💫 Daily Motivation</h2>
              <p className="text-lg text-white/90">
                {motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)]}
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Goals */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-petroleum mb-4">{t('activeGoals')}</h2>
              {loading ? (
                <p className="text-petroleum-light">Loading...</p>
              ) : metas.filter(meta => !meta.completed).length === 0 ? (
                <p className="text-petroleum-light">No active goals yet.</p>
              ) : (
                <div className="space-y-4">
                  {metas.filter(meta => !meta.completed).map((meta) => (
                    <Card key={meta.id} className="bg-gradient-card border-mint/20">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="text-2xl">{getTypeIcon(meta.goal_type)}</div>
                            <div>
                              <h3 className="font-semibold text-petroleum">{meta.title}</h3>
                              <p className="text-sm text-petroleum-light">{meta.description}</p>
                            </div>
                          </div>
                          <Badge className={`bg-${getTypeColor(meta.goal_type)} text-white`}>
                            {meta.goal_type}
                          </Badge>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-petroleum-light">Progress:</span>
                            <span className="font-medium text-petroleum">
                              {meta.current_value}/{meta.target_value}
                              {meta.goal_type === 'weight' ? 'kg' : meta.goal_type === 'workout' ? ' workouts' : ' days'}
                            </span>
                          </div>
                          
                          <Progress 
                            value={getProgressPercentage(meta.current_value, meta.target_value, meta.goal_type)} 
                            className="w-full" 
                          />
                          
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-petroleum-light">
                              {meta.deadline && `Deadline: ${new Date(meta.deadline).toLocaleDateString('en-US')}`}
                            </span>
                            <span className="font-medium text-coral">
                              {Math.round(getProgressPercentage(meta.current_value, meta.target_value, meta.goal_type))}% complete
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Completed Goals */}
            <div>
              <h2 className="text-xl font-semibold text-petroleum mb-4">{t('completedGoals')} 🎉</h2>
              {metas.filter(meta => meta.completed).length === 0 ? (
                <p className="text-petroleum-light">No completed goals yet.</p>
              ) : (
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
                          <Badge className="bg-coral text-white">Completed</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            <Card className="bg-gradient-card border-mint/20">
              <CardHeader>
                <CardTitle className="text-petroleum flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-coral" />
                  Achievements
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

            {/* Statistics */}
            <Card className="bg-gradient-card border-mint/20">
              <CardHeader>
                <CardTitle className="text-petroleum">Your Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-coral">{metas.length}</div>
                    <div className="text-xs text-petroleum-light">Goals created</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-mint">{metas.filter(m => m.completed).length}</div>
                    <div className="text-xs text-petroleum-light">Goals completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-lavender">
                      {metas.length > 0 ? Math.round((metas.filter(m => m.completed).length / metas.length) * 100) : 0}%
                    </div>
                    <div className="text-xs text-petroleum-light">Success rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* New Goal Modal */}
        {showNewGoal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="text-petroleum">New Goal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Goal Title</Label>
                  <Input
                    id="title"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                    placeholder="E.g.: Lose 3kg"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newGoal.description}
                    onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                    placeholder="Describe your goal..."
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="target">Target Value</Label>
                    <Input
                      id="target"
                      type="number"
                      value={newGoal.targetValue}
                      onChange={(e) => setNewGoal({...newGoal, targetValue: e.target.value})}
                      placeholder="70"
                    />
                  </div>
                  <div>
                    <Label htmlFor="current">Current Value</Label>
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
                  <Label htmlFor="deadline">Deadline</Label>
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
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateGoal}
                    className="flex-1 bg-mint hover:bg-mint-dark text-white"
                    disabled={loading}
                  >
                    {t('save')}
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