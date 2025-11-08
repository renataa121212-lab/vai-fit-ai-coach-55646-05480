import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Dumbbell, Camera, Target, Trophy, TrendingUp } from "lucide-react";
import fastingIcon from "@/assets/fasting-icon.png";
import workoutIcon from "@/assets/workout-icon.png";
import foodIcon from "@/assets/food-recognition-icon.png";

const features = [
  {
    icon: Clock,
    title: "Smart Fasting",
    description: "Personalized timer with 16:8, 18:6, 20:4 protocols and automatic alerts",
    color: "mint",
    image: fastingIcon,
  },
  {
    icon: Camera,
    title: "Body Scanning",
    description: "Complete analysis of body fat, muscle mass and measurements using just your camera",
    color: "lavender",
    image: null,
  },
  {
    icon: Camera,
    title: "Food AI",
    description: "Take a photo of your plate and instantly see calories and macros",
    color: "coral",
    image: foodIcon,
  },
  {
    icon: Target,
    title: "Healthy Recipes",
    description: "Nutritious recipes for all diets: vegan, low-carb, gluten-free and more",
    color: "mint",
    image: null,
  },
  {
    icon: Trophy,
    title: "Lívia - Your AI Nutritionist",
    description: "24/7 smart assistant to answer questions about nutrition and workouts",
    color: "coral",
    image: null,
  },
  {
    icon: TrendingUp,
    title: "Visual Progress",
    description: "Track weight, measurements and progress with a photo timeline",
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
            Everything you need to{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              transform your body
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful AI tools and personalization to help you reach your goals
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
