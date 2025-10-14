import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-hero opacity-10" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-mint/20 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-lavender/20 rounded-full blur-3xl -translate-y-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-coral/10 px-4 py-2 rounded-full border border-coral/20">
            <Sparkles className="w-4 h-4 text-coral animate-pulse-slow" />
            <span className="text-sm font-medium text-petroleum">Comece Grátis Hoje</span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold text-petroleum">
            Pronto para sua{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              transformação?
            </span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Junte-se a milhares de pessoas que já estão transformando seus corpos 
            e vencendo seus limites com o VaiFit
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button variant="accent" size="xl" className="group" onClick={() => window.location.href = '/auth'}>
              Criar Minha Conta Grátis
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="secondary" size="xl" onClick={() => window.location.href = '/auth'}>
              Ver Planos Premium
            </Button>
          </div>
          
          <div className="pt-8 flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-lavender rounded-full" />
              <span>Cancele quando quiser</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-coral rounded-full" />
              <span>100% Seguro</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
