import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import heroImage from "@/assets/hero-transformation.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-hero opacity-10" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-gradient-card px-4 py-2 rounded-full border border-mint/20">
              <Zap className="w-4 h-4 text-coral animate-pulse-slow" />
              <span className="text-sm font-medium text-petroleum">Powered by AI</span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold text-petroleum leading-tight">
                Transform yourself and overcome your{" "}
                <span className="bg-gradient-hero bg-clip-text text-transparent">
                  limits
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-xl">
                Smart intermittent fasting, healthy fitness recipes, 
                AI body scanning and Lívia, your 24/7 nutrition assistant.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" className="group" onClick={() => window.location.href = '/auth'}>
                Start Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="secondary" size="xl" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
                Learn More
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div>
                <div className="text-3xl font-bold text-mint">50K+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-lavender">4.9★</div>
                <div className="text-sm text-muted-foreground">Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-coral">95%</div>
                <div className="text-sm text-muted-foreground">Reach Goals</div>
              </div>
            </div>
          </div>
          
          {/* Hero Image */}
          <div className="relative animate-float">
            <div className="absolute -inset-4 bg-gradient-hero opacity-20 blur-3xl rounded-full" />
            <img 
              src={heroImage} 
              alt="Fitness Transformation" 
              className="relative rounded-3xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
