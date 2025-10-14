import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Clock, Home, Building, Dumbbell, Heart, Flame, Wind } from 'lucide-react';
import AppNav from '@/components/AppNav';
import { LiviaChat } from '@/components/LiviaChat';
import { WorkoutPlayer } from '@/components/WorkoutPlayer';
import { useToast } from '@/hooks/use-toast';

const Treinos = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('casa');
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<any>(null);

  const categories = [
    { id: 'casa', name: 'Em Casa', icon: Home },
    { id: 'academia', name: 'Academia', icon: Dumbbell },
    { id: 'funcional', name: 'Funcional', icon: Flame },
    { id: 'core', name: 'Core/Abdômen', icon: Heart },
    { id: 'cardio', name: 'Cardio', icon: Wind },
    { id: 'yoga', name: 'Yoga & Alongamento', icon: Wind },
  ];

  const treinos = {
    casa: [
      { id: 1, title: "HIIT Queima Gordura", duration: "20 min", difficulty: "Iniciante", calories: "180-220 kcal", exercises: ["Burpees", "Mountain Climbers", "Jump Squats"], description: "Treino intenso para acelerar o metabolismo", video: "https://www.youtube.com/embed/dZgVxmf6jkA" },
      { id: 2, title: "Cardio + Força", duration: "35 min", difficulty: "Intermediário", calories: "250-300 kcal", exercises: ["Agachamentos", "Flexões", "Prancha"], description: "Combinação perfeita", video: "https://www.youtube.com/embed/ML6XirMl68Y" },
      { id: 3, title: "Agachamento Completo", duration: "15 min", difficulty: "Iniciante", calories: "120-150 kcal", exercises: ["Agachamento Livre", "Agachamento Sumô"], description: "Fortalecimento de pernas", video: "https://www.youtube.com/embed/YGGq0AHan0Y" },
      { id: 4, title: "Flexões Variadas", duration: "12 min", difficulty: "Intermediário", calories: "100-130 kcal", exercises: ["Flexão Normal", "Flexão Diamante"], description: "Treino de peitoral e tríceps", video: "https://www.youtube.com/embed/IODxDxX7oi4" },
      { id: 5, title: "Prancha Dinâmica", duration: "10 min", difficulty: "Iniciante", calories: "80-100 kcal", exercises: ["Prancha Frontal", "Prancha Lateral"], description: "Core e estabilidade", video: "https://www.youtube.com/embed/pSHjTRCQxIw" },
      { id: 6, title: "Saltos e Pliometria", duration: "18 min", difficulty: "Avançado", calories: "200-250 kcal", exercises: ["Box Jump", "Jump Squat"], description: "Explosão e potência", video: "https://www.youtube.com/embed/NBY9-kTuHEk" },
      { id: 7, title: "Treino de Glúteos", duration: "25 min", difficulty: "Intermediário", calories: "180-220 kcal", exercises: ["Ponte", "Elevação Pélvica"], description: "Definição de glúteos", video: "https://www.youtube.com/embed/SEdqd1n0cvg" },
      { id: 8, title: "Tríceps em Casa", duration: "14 min", difficulty: "Iniciante", calories: "90-120 kcal", exercises: ["Mergulho", "Flexão Fechada"], description: "Fortalecimento de braços", video: "https://www.youtube.com/embed/0326dy_-CzM" },
      { id: 9, title: "Bíceps sem Peso", duration: "12 min", difficulty: "Iniciante", calories: "70-90 kcal", exercises: ["Isométrico", "Autoajuda"], description: "Trabalho de bíceps", video: "https://www.youtube.com/embed/nQ3a_8Z5lk0" },
      { id: 10, title: "Full Body Intenso", duration: "30 min", difficulty: "Avançado", calories: "300-400 kcal", exercises: ["Burpees", "Mountain Climbers", "Agachamento"], description: "Corpo inteiro", video: "https://www.youtube.com/embed/ml6cT4AZdqI" },
      { id: 11, title: "Mobilidade Matinal", duration: "15 min", difficulty: "Iniciante", calories: "60-80 kcal", exercises: ["Alongamento", "Rotação"], description: "Desperte o corpo", video: "https://www.youtube.com/embed/g_tea8ZNk5A" },
      { id: 12, title: "Treino de Costas", duration: "20 min", difficulty: "Intermediário", calories: "150-180 kcal", exercises: ["Superman", "Remada Invertida"], description: "Fortalecimento dorsal", video: "https://www.youtube.com/embed/rGf2nnWXCiw" },
      { id: 13, title: "Abdômen Rápido", duration: "10 min", difficulty: "Iniciante", calories: "70-90 kcal", exercises: ["Crunch", "Bicicleta"], description: "Core express", video: "https://www.youtube.com/embed/FjI8zNbroY8" },
      { id: 14, title: "Panturrilha e Equilíbrio", duration: "12 min", difficulty: "Iniciante", calories: "80-100 kcal", exercises: ["Elevação", "Unilateral"], description: "Membros inferiores", video: "https://www.youtube.com/embed/f7k2LmL8qMg" },
      { id: 15, title: "Metabolismo Ativo", duration: "25 min", difficulty: "Intermediário", calories: "220-280 kcal", exercises: ["Jumping Jacks", "High Knees"], description: "Queima calórica", video: "https://www.youtube.com/embed/c_Dq_NCzj8M" },
      { id: 16, title: "Força Isométrica", duration: "15 min", difficulty: "Avançado", calories: "100-130 kcal", exercises: ["Parede", "Cadeira"], description: "Resistência muscular", video: "https://www.youtube.com/embed/Lsdmq-ye2xM" },
      { id: 17, title: "Treino de Ombros", duration: "18 min", difficulty: "Intermediário", calories: "130-160 kcal", exercises: ["Pike Push-up", "Lateral Raise"], description: "Definição de ombros", video: "https://www.youtube.com/embed/hsaQ2vt-5_8" },
      { id: 18, title: "Pernas Completo", duration: "28 min", difficulty: "Avançado", calories: "250-320 kcal", exercises: ["Agachamento", "Afundo", "Stiff"], description: "Membros inferiores completo", video: "https://www.youtube.com/embed/bs_Ej32IYgo" },
      { id: 19, title: "Definição Geral", duration: "35 min", difficulty: "Intermediário", calories: "280-350 kcal", exercises: ["Circuito Full Body"], description: "Definição muscular", video: "https://www.youtube.com/embed/UBMk30rjy0o" },
      { id: 20, title: "Recuperação Ativa", duration: "20 min", difficulty: "Iniciante", calories: "100-120 kcal", exercises: ["Mobilidade", "Alongamento"], description: "Pós-treino recovery", video: "https://www.youtube.com/embed/qULTwquOuT4" },
    ],
    academia: [
      { id: 21, title: "Peito e Tríceps", duration: "45 min", difficulty: "Intermediário", calories: "280-350 kcal", exercises: ["Supino Reto", "Supino Inclinado", "Tríceps Pulley"], description: "Treino de push", video: "https://www.youtube.com/embed/rT7DgCr-3pg" },
      { id: 22, title: "Costas e Bíceps", duration: "50 min", difficulty: "Intermediário", calories: "300-380 kcal", exercises: ["Puxada", "Remada", "Rosca Direta"], description: "Treino de pull", video: "https://www.youtube.com/embed/eGo4IYlbE5g" },
      { id: 23, title: "Pernas Completas", duration: "60 min", difficulty: "Avançado", calories: "400-500 kcal", exercises: ["Agachamento Livre", "Leg Press", "Cadeira Extensora"], description: "Lower body power", video: "https://www.youtube.com/embed/BS-oRydlnCE" },
      { id: 24, title: "Ombro e Trapézio", duration: "40 min", difficulty: "Intermediário", calories: "250-320 kcal", exercises: ["Desenvolvimento", "Elevação Lateral", "Encolhimento"], description: "Delts workout", video: "https://www.youtube.com/embed/q5sNYB1Q6aM" },
      { id: 25, title: "Braços Completo", duration: "35 min", difficulty: "Iniciante", calories: "200-260 kcal", exercises: ["Rosca Direta", "Tríceps Testa", "Martelo"], description: "Arms day", video: "https://www.youtube.com/embed/dXd3H6NnTkc" },
      { id: 26, title: "Glúteos e Posteriores", duration: "45 min", difficulty: "Intermediário", calories: "320-400 kcal", exercises: ["Hip Thrust", "Stiff", "Mesa Flexora"], description: "Lower posterior chain", video: "https://www.youtube.com/embed/ihn-kZ_pMCw" },
      { id: 27, title: "Peito Completo", duration: "50 min", difficulty: "Avançado", calories: "350-430 kcal", exercises: ["Supino Reto", "Crucifixo", "Flexão"], description: "Chest hypertrophy", video: "https://www.youtube.com/embed/IODxDxX7oi4" },
      { id: 28, title: "Costas Largas", duration: "55 min", difficulty: "Avançado", calories: "380-460 kcal", exercises: ["Puxada Aberta", "Remada Curvada", "Pull Over"], description: "Back width", video: "https://www.youtube.com/embed/eGo4IYlbE5g" },
      { id: 29, title: "Quadríceps Power", duration: "50 min", difficulty: "Avançado", calories: "400-500 kcal", exercises: ["Agachamento", "Hack", "Passada"], description: "Quad focus", video: "https://www.youtube.com/embed/PUWnCU52F_4" },
      { id: 30, title: "Full Body Academia", duration: "60 min", difficulty: "Intermediário", calories: "420-520 kcal", exercises: ["Supino", "Agachamento", "Puxada"], description: "Total body", video: "https://www.youtube.com/embed/cDJFOlLfYWE" },
      { id: 31, title: "Upper Push", duration: "40 min", difficulty: "Intermediário", calories: "280-350 kcal", exercises: ["Supino", "Desenvolvimento", "Tríceps"], description: "Upper push focus", video: "https://www.youtube.com/embed/xuUy8cKSMFI" },
      { id: 32, title: "Upper Pull", duration: "42 min", difficulty: "Intermediário", calories: "290-360 kcal", exercises: ["Puxada", "Remada", "Rosca"], description: "Upper pull focus", video: "https://www.youtube.com/embed/IODxDxX7oi4" },
      { id: 33, title: "Lower Power", duration: "55 min", difficulty: "Avançado", calories: "410-510 kcal", exercises: ["Agachamento", "Levantamento Terra", "Leg Press"], description: "Lower power", video: "https://www.youtube.com/embed/BS-oRydlnCE" },
      { id: 34, title: "Definição Muscular", duration: "45 min", difficulty: "Intermediário", calories: "300-380 kcal", exercises: ["Circuito", "Drop Set", "Super Set"], description: "Muscle definition", video: "https://www.youtube.com/embed/ml6cT4AZdqI" },
      { id: 35, title: "Força Máxima", duration: "50 min", difficulty: "Avançado", calories: "320-400 kcal", exercises: ["Agachamento 5x5", "Supino 5x5", "Terra 5x5"], description: "Strength building", video: "https://www.youtube.com/embed/xxFpHWEi6UE" },
      { id: 36, title: "Resistência Muscular", duration: "40 min", difficulty: "Iniciante", calories: "250-320 kcal", exercises: ["Alta Repetição", "Circuito"], description: "Muscle endurance", video: "https://www.youtube.com/embed/U9ENCvFf-VE" },
      { id: 37, title: "Hipertrofia Avançada", duration: "60 min", difficulty: "Avançado", calories: "400-500 kcal", exercises: ["Volume Alto", "Técnicas Avançadas"], description: "Advanced hypertrophy", video: "https://www.youtube.com/embed/ml6cT4AZdqI" },
      { id: 38, title: "Explosão e Potência", duration: "45 min", difficulty: "Avançado", calories: "350-430 kcal", exercises: ["Pliometria", "Olímpicos"], description: "Power development", video: "https://www.youtube.com/embed/NBY9-kTuHEk" },
      { id: 39, title: "Condicionamento Geral", duration: "50 min", difficulty: "Intermediário", calories: "380-470 kcal", exercises: ["Funcional", "CrossFit Style"], description: "General conditioning", video: "https://www.youtube.com/embed/UBMk30rjy0o" },
      { id: 40, title: "Mobilidade + Força", duration: "40 min", difficulty: "Iniciante", calories: "200-280 kcal", exercises: ["Mobilidade", "Força Funcional"], description: "Mobility and strength", video: "https://www.youtube.com/embed/g_tea8ZNk5A" },
    ],
    funcional: [
      { id: 41, title: "Funcional Básico", duration: "25 min", difficulty: "Iniciante", calories: "180-230 kcal", exercises: ["Agachamento", "Flexão", "Prancha"], description: "Fundamentos funcionais", video: "https://www.youtube.com/embed/UBMk30rjy0o" },
      { id: 42, title: "CrossFit WOD", duration: "30 min", difficulty: "Avançado", calories: "350-450 kcal", exercises: ["AMRAP", "EMOM", "Tabata"], description: "Alta intensidade", video: "https://www.youtube.com/embed/ml6cT4AZdqI" },
      { id: 43, title: "Battle Rope", duration: "15 min", difficulty: "Intermediário", calories: "180-240 kcal", exercises: ["Ondas", "Slams"], description: "Cardio + força", video: "https://www.youtube.com/embed/UBMk30rjy0o" },
      { id: 44, title: "TRX Total Body", duration: "35 min", difficulty: "Intermediário", calories: "260-340 kcal", exercises: ["Suspensão", "Core"], description: "Treino suspenso", video: "https://www.youtube.com/embed/ml6cT4AZdqI" },
      { id: 45, title: "Kettlebell Flow", duration: "28 min", difficulty: "Intermediário", calories: "240-310 kcal", exercises: ["Swing", "Snatch", "Clean"], description: "Kettlebell mastery", video: "https://www.youtube.com/embed/UBMk30rjy0o" },
      { id: 46, title: "Medicine Ball", duration: "22 min", difficulty: "Iniciante", calories: "150-200 kcal", exercises: ["Slams", "Rotações"], description: "Core + explosão", video: "https://www.youtube.com/embed/ml6cT4AZdqI" },
      { id: 47, title: "Funcional HIIT", duration: "25 min", difficulty: "Avançado", calories: "300-380 kcal", exercises: ["Circuito Intenso"], description: "Queima máxima", video: "https://www.youtube.com/embed/NBY9-kTuHEk" },
      { id: 48, title: "Agilidade", duration: "20 min", difficulty: "Intermediário", calories: "180-240 kcal", exercises: ["Cones", "Escadas"], description: "Speed & agility", video: "https://www.youtube.com/embed/ml6cT4AZdqI" },
      { id: 49, title: "Funcional + Cardio", duration: "32 min", difficulty: "Intermediário", calories: "280-360 kcal", exercises: ["Mix Completo"], description: "Conditioning", video: "https://www.youtube.com/embed/UBMk30rjy0o" },
      { id: 50, title: "Animal Flow", duration: "25 min", difficulty: "Avançado", calories: "200-260 kcal", exercises: ["Movimentos Animais"], description: "Mobilidade avançada", video: "https://www.youtube.com/embed/ml6cT4AZdqI" },
    ],
    core: [
      { id: 51, title: "Core Básico", duration: "15 min", difficulty: "Iniciante", calories: "90-120 kcal", exercises: ["Prancha", "Crunch", "Bicicleta"], description: "Fundamentos de core", video: "https://www.youtube.com/embed/FjI8zNbroY8" },
      { id: 52, title: "Abdômen Definido", duration: "20 min", difficulty: "Intermediário", calories: "130-170 kcal", exercises: ["Russian Twist", "Leg Raises", "Prancha Lateral"], description: "Six pack abs", video: "https://www.youtube.com/embed/FjI8zNbroY8" },
      { id: 53, title: "Core Avançado", duration: "25 min", difficulty: "Avançado", calories: "160-210 kcal", exercises: ["Dragon Flag", "Ab Wheel", "L-Sit"], description: "Core power", video: "https://www.youtube.com/embed/FjI8zNbroY8" },
      { id: 54, title: "Oblíquos", duration: "18 min", difficulty: "Intermediário", calories: "110-150 kcal", exercises: ["Side Plank", "Wood Chops"], description: "Lateral core", video: "https://www.youtube.com/embed/FjI8zNbroY8" },
      { id: 55, title: "Lower Abs", duration: "16 min", difficulty: "Intermediário", calories: "100-140 kcal", exercises: ["Leg Raises", "Reverse Crunch"], description: "Abdômen inferior", video: "https://www.youtube.com/embed/FjI8zNbroY8" },
      { id: 56, title: "Upper Abs", duration: "14 min", difficulty: "Iniciante", calories: "80-110 kcal", exercises: ["Crunch", "Sit-ups"], description: "Abdômen superior", video: "https://www.youtube.com/embed/FjI8zNbroY8" },
      { id: 57, title: "Rotacional", duration: "20 min", difficulty: "Intermediário", calories: "130-170 kcal", exercises: ["Rotações", "Chops"], description: "Core rotacional", video: "https://www.youtube.com/embed/FjI8zNbroY8" },
      { id: 58, title: "Estabilidade", duration: "22 min", difficulty: "Avançado", calories: "140-180 kcal", exercises: ["Plank Variations"], description: "Core stability", video: "https://www.youtube.com/embed/pSHjTRCQxIw" },
      { id: 59, title: "Anti-Rotação", duration: "18 min", difficulty: "Intermediário", calories: "110-150 kcal", exercises: ["Pallof Press", "Dead Bug"], description: "Anti-rotation", video: "https://www.youtube.com/embed/FjI8zNbroY8" },
      { id: 60, title: "Core Completo", duration: "28 min", difficulty: "Avançado", calories: "180-240 kcal", exercises: ["Mix Total"], description: "Total core", video: "https://www.youtube.com/embed/FjI8zNbroY8" },
    ],
    cardio: [
      { id: 61, title: "Cardio Leve", duration: "30 min", difficulty: "Iniciante", calories: "200-280 kcal", exercises: ["Caminhada Rápida"], description: "Low impact", video: "https://www.youtube.com/embed/c_Dq_NCzj8M" },
      { id: 62, title: "Running Intervals", duration: "25 min", difficulty: "Intermediário", calories: "300-400 kcal", exercises: ["Corrida Intervalada"], description: "Run intervals", video: "https://www.youtube.com/embed/c_Dq_NCzj8M" },
      { id: 63, title: "HIIT Cardio", duration: "20 min", difficulty: "Avançado", calories: "350-450 kcal", exercises: ["Burpees", "Sprints"], description: "Alta intensidade", video: "https://www.youtube.com/embed/NBY9-kTuHEk" },
      { id: 64, title: "Jump Rope", duration: "15 min", difficulty: "Intermediário", calories: "180-250 kcal", exercises: ["Pular Corda"], description: "Cardio clássico", video: "https://www.youtube.com/embed/c_Dq_NCzj8M" },
      { id: 65, title: "Dança Fitness", duration: "35 min", difficulty: "Iniciante", calories: "280-360 kcal", exercises: ["Zumba Style"], description: "Dance cardio", video: "https://www.youtube.com/embed/c_Dq_NCzj8M" },
      { id: 66, title: "Spinning", duration: "40 min", difficulty: "Intermediário", calories: "350-480 kcal", exercises: ["Bike Intervals"], description: "Indoor cycling", video: "https://www.youtube.com/embed/c_Dq_NCzj8M" },
      { id: 67, title: "Remo Cardio", duration: "25 min", difficulty: "Intermediário", calories: "250-330 kcal", exercises: ["Rowing"], description: "Full body cardio", video: "https://www.youtube.com/embed/c_Dq_NCzj8M" },
      { id: 68, title: "Stair Climbing", duration: "20 min", difficulty: "Intermediário", calories: "220-300 kcal", exercises: ["Escadas"], description: "Subida de escadas", video: "https://www.youtube.com/embed/c_Dq_NCzj8M" },
      { id: 69, title: "Boxing Cardio", duration: "30 min", difficulty: "Intermediário", calories: "320-420 kcal", exercises: ["Sombra", "Saco"], description: "Fight cardio", video: "https://www.youtube.com/embed/c_Dq_NCzj8M" },
      { id: 70, title: "Tabata Extreme", duration: "18 min", difficulty: "Avançado", calories: "280-380 kcal", exercises: ["20/10 Protocol"], description: "Tabata style", video: "https://www.youtube.com/embed/NBY9-kTuHEk" },
    ],
    yoga: [
      { id: 71, title: "Yoga Matinal", duration: "20 min", difficulty: "Iniciante", calories: "80-120 kcal", exercises: ["Saudação ao Sol"], description: "Morning flow", video: "https://www.youtube.com/embed/g_tea8ZNk5A" },
      { id: 72, title: "Vinyasa Flow", duration: "30 min", difficulty: "Intermediário", calories: "140-190 kcal", exercises: ["Flow Contínuo"], description: "Dynamic yoga", video: "https://www.youtube.com/embed/g_tea8ZNk5A" },
      { id: 73, title: "Hatha Yoga", duration: "35 min", difficulty: "Iniciante", calories: "100-150 kcal", exercises: ["Posturas Clássicas"], description: "Traditional yoga", video: "https://www.youtube.com/embed/g_tea8ZNk5A" },
      { id: 74, title: "Power Yoga", duration: "40 min", difficulty: "Avançado", calories: "200-280 kcal", exercises: ["Força + Flexibilidade"], description: "Strength yoga", video: "https://www.youtube.com/embed/g_tea8ZNk5A" },
      { id: 75, title: "Yin Yoga", duration: "45 min", difficulty: "Iniciante", calories: "70-100 kcal", exercises: ["Posturas Longas"], description: "Deep stretch", video: "https://www.youtube.com/embed/g_tea8ZNk5A" },
      { id: 76, title: "Alongamento Completo", duration: "25 min", difficulty: "Iniciante", calories: "60-90 kcal", exercises: ["Full Body Stretch"], description: "Total stretch", video: "https://www.youtube.com/embed/qULTwquOuT4" },
      { id: 77, title: "Mobilidade Articular", duration: "22 min", difficulty: "Iniciante", calories: "70-100 kcal", exercises: ["Joint Mobility"], description: "Articular mobility", video: "https://www.youtube.com/embed/g_tea8ZNk5A" },
      { id: 78, title: "Yoga Noturno", duration: "28 min", difficulty: "Iniciante", calories: "80-120 kcal", exercises: ["Relaxamento"], description: "Evening relaxation", video: "https://www.youtube.com/embed/g_tea8ZNk5A" },
      { id: 79, title: "Flexibilidade", duration: "30 min", difficulty: "Intermediário", calories: "90-140 kcal", exercises: ["Splits", "Back Bends"], description: "Flexibility training", video: "https://www.youtube.com/embed/qULTwquOuT4" },
      { id: 80, title: "Restaurativo", duration: "40 min", difficulty: "Iniciante", calories: "60-90 kcal", exercises: ["Posturas Suaves"], description: "Restorative yoga", video: "https://www.youtube.com/embed/g_tea8ZNk5A" },
    ],
  };

  const currentWorkouts = treinos[selectedCategory as keyof typeof treinos] || [];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Iniciante': return 'bg-mint text-white';
      case 'Intermediário': return 'bg-lavender text-white';
      case 'Avançado': return 'bg-coral text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const handleStartWorkout = (workout: any) => {
    // Convert workout to exercise format for WorkoutPlayer
    const exercises = workout.exercises.map((name: string, index: number) => ({
      id: index + 1,
      name,
      duration: 30,
      animationUrl: workout.video,
      difficulty: workout.difficulty as 'Iniciante' | 'Intermediário' | 'Avançado',
    }));
    
    setSelectedWorkout({ ...workout, exercises });
    setIsPlaying(true);
  };

  const handleWorkoutComplete = () => {
    toast({
      title: "Treino Completo! 🎉",
      description: "Parabéns! Você completou o treino com sucesso!",
    });
    setIsPlaying(false);
    setSelectedWorkout(null);
  };

  const handleWorkoutExit = () => {
    setIsPlaying(false);
    setSelectedWorkout(null);
  };

  return (
    <>
      {isPlaying && selectedWorkout && (
        <WorkoutPlayer
          exercises={selectedWorkout.exercises}
          onComplete={handleWorkoutComplete}
          onExit={handleWorkoutExit}
        />
      )}
      
      <div className="min-h-screen bg-background">
        <AppNav />
        <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-petroleum">Treinos</h1>
          <p className="text-petroleum-light">Mais de 80 treinos organizados por categoria</p>
        </div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 bg-muted">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <TabsTrigger key={cat.id} value={cat.id} className="flex items-center space-x-2">
                  <Icon className="h-4 w-4" />
                  <span className="hidden md:inline">{cat.name}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {Object.keys(treinos).map((category) => (
            <TabsContent key={category} value={category} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentWorkouts.map((workout) => (
                  <Card key={workout.id} className="bg-gradient-card border-mint/20 hover:shadow-md transition-all duration-300">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-lg text-petroleum">{workout.title}</CardTitle>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge className={getDifficultyColor(workout.difficulty)}>
                          {workout.difficulty}
                        </Badge>
                        <Badge variant="outline" className="border-mint text-mint">
                          <Clock className="h-3 w-3 mr-1" />
                          {workout.duration}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-petroleum-light">{workout.description}</p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-petroleum-light">Queima:</span>
                        <span className="font-medium text-coral">{workout.calories}</span>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium text-petroleum mb-2">Exercícios:</h4>
                        <div className="flex flex-wrap gap-1">
                          {workout.exercises.slice(0, 2).map((exercise, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {exercise}
                            </Badge>
                          ))}
                          {workout.exercises.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{workout.exercises.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <Button 
                        onClick={() => handleStartWorkout(workout)}
                        className="w-full bg-mint hover:bg-mint-dark text-white"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        Iniciar Treino
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <LiviaChat 
          context={`Treinos - Categoria: ${selectedCategory}`}
          initialMessage="Olá! Estou aqui para te ajudar com seus treinos. Vamos começar? 💪"
        />
        </div>
      </div>
    </>
  );
};

export default Treinos;
