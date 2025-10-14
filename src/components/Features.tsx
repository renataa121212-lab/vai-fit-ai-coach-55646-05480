import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Dumbbell, Camera, Target, Trophy, TrendingUp } from "lucide-react";
import fastingIcon from "@/assets/fasting-icon.png";
import workoutIcon from "@/assets/workout-icon.png";
import foodIcon from "@/assets/food-recognition-icon.png";

const features = [
  {
    icon: Clock,
    title: "Jejum Inteligente",
    description: "Timer personalizado com protocolos 16:8, 18:6, 20:4 e alertas automáticos",
    color: "mint",
    image: fastingIcon,
  },
  {
    icon: Dumbbell,
    title: "Treinos Personalizados",
    description: "Planos adaptados para casa, academia ou ar livre com vídeos e acompanhamento",
    color: "lavender",
    image: workoutIcon,
  },
  {
    icon: Camera,
    title: "IA de Alimentos",
    description: "Tire foto do prato e veja calorias e macros instantaneamente",
    color: "coral",
    image: foodIcon,
  },
  {
    icon: Target,
    title: "Metas Personalizadas",
    description: "Defina objetivos semanais e mensais com check-ins motivacionais",
    color: "mint",
    image: null,
  },
  {
    icon: Trophy,
    title: "Gamificação",
    description: "Medalhas, conquistas e recompensas para manter você motivado",
    color: "coral",
    image: null,
  },
  {
    icon: TrendingUp,
    title: "Evolução Visual",
    description: "Acompanhe peso, medidas e progresso com linha do tempo fotográfica",
    color: "lavender",
    image: null,
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-petroleum">
            Tudo que você precisa para{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              transformar seu corpo
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ferramentas poderosas de IA e personalização para você alcançar seus objetivos
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-2 hover:border-mint/50 bg-gradient-card"
              >
                <CardHeader>
                  {feature.image ? (
                    <div className="w-16 h-16 mb-4 rounded-2xl bg-background shadow-sm flex items-center justify-center overflow-hidden">
                      <img src={feature.image} alt={feature.title} className="w-12 h-12 object-contain" />
                    </div>
                  ) : (
                    <div className={`w-16 h-16 mb-4 rounded-2xl bg-${feature.color}/10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-8 h-8 text-${feature.color}`} />
                    </div>
                  )}
                  <CardTitle className="text-2xl text-petroleum">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
