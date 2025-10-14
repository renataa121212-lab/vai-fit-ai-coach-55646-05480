import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, SkipForward, X } from 'lucide-react';

interface Exercise {
  id: number;
  name: string;
  duration: number;
  animationUrl: string;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
}

interface WorkoutPlayerProps {
  exercises: Exercise[];
  onComplete: () => void;
  onExit: () => void;
}

const motivationalPhrases = [
  "Você consegue!",
  "Força! Está indo muito bem!",
  "Continue assim!",
  "Quase lá!",
  "Últimos segundos!",
  "Respira e continua!",
  "Você é forte!",
  "Mandando bem!",
  "Foco no objetivo!",
  "Não desista agora!",
  "Cada segundo conta!",
  "Você está evoluindo!"
];

export const WorkoutPlayer = ({ exercises, onComplete, onExit }: WorkoutPlayerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45); // 45 seconds per exercise
  const [isPlaying, setIsPlaying] = useState(true);
  const [isResting, setIsResting] = useState(false);
  const [phrase, setPhrase] = useState(motivationalPhrases[0]);

  const currentExercise = exercises[currentIndex];
  const EXERCISE_DURATION = 45; // seconds
  const REST_DURATION = 15; // seconds

  // Calculate total workout time
  const totalWorkoutTime = exercises.length * (EXERCISE_DURATION + REST_DURATION);
  const elapsedTime = currentIndex * (EXERCISE_DURATION + REST_DURATION) + 
    (isResting ? EXERCISE_DURATION : (EXERCISE_DURATION - timeLeft));
  const totalProgress = (elapsedTime / totalWorkoutTime) * 100;

  useEffect(() => {
    setTimeLeft(isResting ? REST_DURATION : EXERCISE_DURATION);
  }, [currentIndex, isResting]);

  useEffect(() => {
    const phraseInterval = setInterval(() => {
      setPhrase(motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)]);
    }, 3000);

    return () => clearInterval(phraseInterval);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (isResting) {
              // Rest period ended, move to next exercise
              handleNext();
            } else {
              // Exercise ended, start rest period
              setIsResting(true);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, currentIndex, isResting]);

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsResting(false);
      setIsPlaying(true);
    } else {
      onComplete();
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const exerciseProgress = isResting 
    ? 100 
    : ((EXERCISE_DURATION - timeLeft) / EXERCISE_DURATION) * 100;

  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
      <div className="w-full h-full flex flex-col">
        {/* Header with progress bar */}
        <div className="bg-background border-b px-4 py-3">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="text-lg font-bold text-petroleum">
                  {isResting ? 'Descanso' : currentExercise?.name}
                </h2>
                <p className="text-xs text-petroleum-light">
                  Exercício {currentIndex + 1} de {exercises.length}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onExit}
                className="text-coral hover:bg-coral hover:text-white"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <Progress value={totalProgress} className="h-2" />
            <p className="text-xs text-petroleum-light mt-1 text-center">
              Tempo total: {Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')} / {Math.floor(totalWorkoutTime / 60)}:{(totalWorkoutTime % 60).toString().padStart(2, '0')}
            </p>
          </div>
        </div>

        {/* Main content area - centered animation */}
        <div className="flex-1 flex items-center justify-center bg-white relative">
          {/* Centered exercise animation */}
          <div className="relative flex flex-col items-center justify-center">
            {/* Placeholder for animation - neutral avatar style */}
            <div className="relative mb-8">
              <div className="w-64 h-64 flex items-center justify-center">
                {isResting ? (
                  <div className="text-8xl animate-pulse">⏸️</div>
                ) : (
                  <div className="w-full h-full rounded-lg bg-gradient-to-br from-mint/5 to-petroleum/5 flex items-center justify-center animate-pulse">
                    <div className="text-7xl">🏃</div>
                  </div>
                )}
              </div>
              
              {/* Timer overlay - large and visible */}
              <div className="absolute -top-4 -right-4 bg-petroleum text-white rounded-full w-24 h-24 flex items-center justify-center shadow-xl">
                <div className="text-center">
                  <div className="text-3xl font-bold">{timeLeft}</div>
                  <div className="text-xs">seg</div>
                </div>
              </div>
            </div>

            {/* Exercise info */}
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-petroleum mb-2">
                {isResting ? 'Prepare-se para o próximo!' : currentExercise?.name}
              </h3>
              {!isResting && (
                <Badge variant="outline" className="text-sm">
                  {currentExercise?.difficulty}
                </Badge>
              )}
            </div>

            {/* Motivational phrase */}
            {!isResting && (
              <div className="bg-mint text-white px-6 py-3 rounded-full shadow-lg animate-fade-in">
                <p className="text-base font-medium">{phrase}</p>
              </div>
            )}

            {/* Note about animation */}
            <p className="text-xs text-petroleum-light/70 mt-6 max-w-md text-center px-4">
              Em produção: Animação 3D do boneco executando o movimento em loop contínuo
              <br />
              (Use modelos de Mixamo, Sketchfab ou CGTrader: .glb, .fbx, .json)
            </p>
          </div>
        </div>

        {/* Bottom controls */}
        <div className="bg-background border-t px-4 py-4">
          <div className="max-w-4xl mx-auto">
            <Progress value={exerciseProgress} className="h-2 mb-4" />
            
            <div className="flex items-center justify-center gap-4 mb-4">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePlayPause}
                className="w-16 h-16 rounded-full border-2 border-petroleum hover:bg-petroleum hover:text-white"
              >
                {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
              </Button>
              
              <Button
                onClick={handleNext}
                className="bg-mint hover:bg-mint-dark text-white px-8 py-6 text-lg"
              >
                {currentIndex === exercises.length - 1 ? 'Finalizar' : 'Próximo Exercício'}
                <SkipForward className="h-5 w-5 ml-2" />
              </Button>
            </div>

            {/* Exercise sequence - compact */}
            <div className="max-h-32 overflow-y-auto">
              <div className="flex gap-2 flex-wrap justify-center">
                {exercises.map((exercise, index) => (
                  <div
                    key={exercise.id}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs ${
                      index === currentIndex
                        ? 'bg-mint text-white'
                        : index < currentIndex
                        ? 'bg-coral/20 text-coral'
                        : 'bg-muted/50 text-petroleum-light'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                        index === currentIndex
                          ? 'bg-white text-mint'
                          : index < currentIndex
                          ? 'bg-coral text-white'
                          : 'bg-muted text-petroleum-light'
                      }`}
                    >
                      {index < currentIndex ? '✓' : index + 1}
                    </div>
                    <span className="font-medium">{exercise.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
