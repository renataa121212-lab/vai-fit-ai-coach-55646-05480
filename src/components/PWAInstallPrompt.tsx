import { useState, useEffect } from 'react';
import { X, Download, Share, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    console.log('[PWA] Component mounted');
    
    // Detectar plataforma
    const userAgent = window.navigator.userAgent.toLowerCase();
    const iOS = /iphone|ipad|ipod/.test(userAgent);
    const android = /android/.test(userAgent);
    
    setIsIOS(iOS);
    setIsAndroid(android);
    
    console.log('[PWA] Platform detection:', { iOS, android });

    const handler = (e: Event) => {
      console.log('[PWA] beforeinstallprompt event fired!');
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Mostrar prompt após 2 segundos
      setTimeout(() => {
        console.log('[PWA] Showing install prompt');
        setShowPrompt(true);
      }, 2000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Se não houver evento (iOS ou já instalado), mostrar após 2s
    setTimeout(() => {
      if (!deferredPrompt && !window.matchMedia('(display-mode: standalone)').matches) {
        console.log('[PWA] No beforeinstallprompt, showing fallback prompt');
        setShowPrompt(true);
      }
    }, 2000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    console.log('[PWA] Install button clicked');
    
    if (deferredPrompt) {
      console.log('[PWA] Using deferredPrompt');
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log('[PWA] User choice:', outcome);
      
      if (outcome === 'accepted') {
        setShowPrompt(false);
      }
      setDeferredPrompt(null);
    } else {
      console.log('[PWA] No deferredPrompt, showing instructions');
      setShowInstructions(true);
    }
  };

  const getInstructions = () => {
    if (isIOS) {
      return (
        <div className="space-y-3 text-sm">
          <p className="font-medium">To install on iOS:</p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Tap the <Share className="w-4 h-4 inline mx-1" /> (Share) button in the bottom bar</li>
            <li>Scroll down and tap "Add to Home Screen"</li>
            <li>Tap "Add" in the top right corner</li>
          </ol>
        </div>
      );
    }
    
    if (isAndroid) {
      return (
        <div className="space-y-3 text-sm">
          <p className="font-medium">To install on Android:</p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Tap the menu <Menu className="w-4 h-4 inline mx-1" /> (3 dots) in the top corner</li>
            <li>Select "Install app" or "Add to home screen"</li>
            <li>Confirm installation</li>
          </ol>
        </div>
      );
    }
    
    return (
      <div className="space-y-3 text-sm">
        <p className="font-medium">To install on Desktop:</p>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li>Click the install icon in the address bar</li>
          <li>Or go to Menu → "Install VaiFit"</li>
          <li>Confirm installation</li>
        </ol>
      </div>
    );
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-300">
      <Card className="w-full max-w-md bg-gradient-to-br from-mint/10 to-lavender/10 border-2 border-mint/20 shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-petroleum">
                Install VaiFit
              </h3>
              <p className="text-sm text-muted-foreground">
                Access faster and get notifications
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowPrompt(false)}
              className="shrink-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {showInstructions ? (
            <>
              {getInstructions()}
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => setShowInstructions(false)}
              >
                Back
              </Button>
            </>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-4 py-4">
                <div className="text-center space-y-1">
                  <div className="w-12 h-12 mx-auto bg-mint/20 rounded-full flex items-center justify-center">
                    <Download className="w-6 h-6 text-mint" />
                  </div>
                  <p className="text-xs text-muted-foreground">Fast</p>
                </div>
                <div className="text-center space-y-1">
                  <div className="w-12 h-12 mx-auto bg-lavender/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🔔</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Notifications</p>
                </div>
                <div className="text-center space-y-1">
                  <div className="w-12 h-12 mx-auto bg-coral/20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📱</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Native</p>
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  onClick={handleInstall}
                  className="w-full bg-gradient-to-r from-mint to-lavender hover:opacity-90 text-white"
                  size="lg"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Install Now
                </Button>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => setShowPrompt(false)}
                >
                  Not now
                </Button>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default PWAInstallPrompt;
