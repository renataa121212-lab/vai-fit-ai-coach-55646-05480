import { Activity, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-petroleum text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-hero flex items-center justify-center shadow-sm">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">VaiFit</span>
            </div>
            <p className="text-sm text-white/70">
              Transforme-se e vença seus limites com inteligência artificial
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Produto</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#" className="hover:text-white transition-colors">Recursos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Planos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Atualizações</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Roadmap</a></li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#" className="hover:text-white transition-colors">Sobre</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Carreiras</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Termos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">LGPD</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 text-center text-sm text-white/60">
          <p>© 2025 VaiFit. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
