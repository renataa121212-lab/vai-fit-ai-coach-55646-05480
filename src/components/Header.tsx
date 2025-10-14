import { Button } from "@/components/ui/button";
import { Activity, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center shadow-sm">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            VaiFit
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-petroleum hover:text-mint transition-colors">
            Recursos
          </a>
          <a href="#pricing" className="text-sm font-medium text-petroleum hover:text-mint transition-colors">
            Planos
          </a>
          <a href="#about" className="text-sm font-medium text-petroleum hover:text-mint transition-colors">
            Sobre
          </a>
        </nav>
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm text-muted-foreground hidden sm:inline">
                {user.email}
              </span>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={signOut}
                title="Sair"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="ghost" 
                className="hidden sm:inline-flex"
                onClick={() => navigate('/auth')}
              >
                Entrar
              </Button>
              <Button 
                variant="hero"
                onClick={() => navigate('/auth')}
              >
                Começar Grátis
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
