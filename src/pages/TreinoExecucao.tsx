import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, SkipForward, X, Clock } from 'lucide-react';

const TreinoExecucao = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const workoutId = searchParams.get('id');
  
  const [currentExercise, setCurrentExercise] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45);
  const [motivationalPhrase, setMotivationalPhrase] = useState('');

  // Mock workout data (in real app, fetch from DB)
  const workout = {
    title: "HIIT Queima Gordura",
    exercises: [
      { name: "Burpees", duration: 45, rest: 15, video: "https://www.youtube.com/embed/dZgVxmf6jkA" },
      { name: "Mountain Climbers", duration: 45, rest: 15, video: "https://www.youtube.com/embed/nmwgirgXLYM" },
      { name: "Jump Squats", duration: 45, rest: 15, video: "https://www.youtube.com/embed/YGGq0AHan0Y" },
      { name: "High Knees", duration: 45, rest: 15, video: "https://www.youtube.com/embed/K8wb1_2UUBE" },
    ]
  };

  const motivationalPhrases = [
    "Você está incrível! Continue assim! 💪",
    "Mais uma série e você está mais perto do seu objetivo! 🔥",
    "A dor que você sente hoje será a força de amanhã! 🚀",
    "Não desista! Você é mais forte do que imagina! ⚡",
    "Cada gota de suor te aproxima do seu sonho! 🏆",
    "Lembre-se: você começou por uma razão! 🎯",
    "Seu futuro eu está agradecendo agora! 🌟",
  ];

  useEffect(() => {
    // Select random motivational phrase
    setMotivationalPhrase(motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)]);
  }, [currentExercise]);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Auto-advance to next exercise or rest
          handleNext();
          return workout.exercises[currentExercise].duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, currentExercise]);

  const handleNext = () => {
    if (currentExercise < workout.exercises.length - 1) {
      setCurrentExercise(prev => prev + 1);
      setTimeLeft(workout.exercises[currentExercise + 1].duration);
      setIsPlaying(false);
    } else {
      // Workout complete
      navigate('/treinos');
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleExit = () => {
    navigate('/treinos');
  };

  const progress = ((currentExercise + 1) / workout.exercises.length) * 100;
  const exercise = workout.exercises[currentExercise];

  return (
    <div className="min-h-screen bg-gradient-to-br from-petroleum to-petroleum-light flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">{workout.title}</h1>
          <Button
            variant="outline"
            size="icon"
            onClick={handleExit}
            className="bg-white/10 text-white border-white/20 hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-white mb-2">
            <span>Exercício {currentExercise + 1} de {workout.exercises.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Main Card */}
        <Card className="bg-white/95 backdrop-blur">
          <CardContent className="p-6 space-y-6">
            {/* Video Player */}
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
              <iframe
                src={exercise.video}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Exercise Info */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-petroleum mb-2">{exercise.name}</h2>
              <div className="flex items-center justify-center space-x-2 text-petroleum-light">
                <Clock className="h-5 w-5" />
                <span>{exercise.duration}s de exercício / {exercise.rest}s de descanso</span>
              </div>
            </div>

            {/* Timer */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-hero">
                <div className="text-center text-white">
                  <div className="text-4xl font-bold">{timeLeft}</div>
                  <div className="text-sm">segundos</div>
                </div>
              </div>
            </div>

            {/* Motivational Phrase */}
            <div className="text-center p-4 bg-mint/10 rounded-lg border border-mint/20">
              <p className="text-lg font-medium text-petroleum">{motivationalPhrase}</p>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-4">
              <Button
                size="lg"
                onClick={handlePlayPause}
                className="bg-mint hover:bg-mint-dark text-white px-8"
              >
                {isPlaying ? (
                  <>
                    <Pause className="h-5 w-5 mr-2" />
                    Pausar
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5 mr-2" />
                    {timeLeft === exercise.duration ? 'Iniciar' : 'Continuar'}
                  </>
                )}
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={handleNext}
                className="border-coral text-coral hover:bg-coral hover:text-white px-8"
              >
                <SkipForward className="h-5 w-5 mr-2" />
                Próximo
              </Button>
            </div>

            {/* Exercise List */}
            <div className="border-t pt-4">
              <h3 className="font-semibold text-petroleum mb-3">Sequência do Treino</h3>
              <div className="space-y-2">
                {workout.exercises.map((ex, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      idx === currentExercise
                        ? 'bg-mint/20 border border-mint'
                        : idx < currentExercise
                        ? 'bg-gray-100 text-gray-500'
                        : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        idx === currentExercise
                          ? 'bg-mint text-white'
                          : idx < currentExercise
                          ? 'bg-gray-300 text-gray-600'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {idx < currentExercise ? '✓' : idx + 1}
                      </div>
                      <span className={idx === currentExercise ? 'font-semibold' : ''}>{ex.name}</span>
                    </div>
                    <span className="text-sm text-petroleum-light">{ex.duration}s</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TreinoExecucao;
