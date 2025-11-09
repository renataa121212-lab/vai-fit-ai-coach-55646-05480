import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, User, Bell, Globe, Palette, CreditCard, LogOut, Smartphone } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import AppNav from '@/components/AppNav';
import { useTranslation } from '@/lib/i18n';
import { supabase } from '@/integrations/supabase/client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Configuracoes = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { language, changeLanguage } = useTranslation();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Theme
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as 'light' | 'dark' | 'auto') || 'auto';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    
    const applyTheme = () => {
      const root = document.documentElement;
      
      if (theme === 'auto') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.classList.toggle('dark', prefersDark);
      } else {
        root.classList.toggle('dark', theme === 'dark');
      }
    };

    applyTheme();

    if (theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => applyTheme();
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, [theme]);

  
  // Profile settings
  const [nome, setNome] = useState(user?.user_metadata?.full_name || '');
  const [genero, setGenero] = useState(user?.user_metadata?.gender || '');
  const [peso, setPeso] = useState(user?.user_metadata?.weight || '');
  
  // Notification settings
  const [pushNotifications, setPushNotifications] = useState(() => {
    const saved = localStorage.getItem('notifications');
    return saved ? JSON.parse(saved).push : true;
  });
  const [emailNotifications, setEmailNotifications] = useState(() => {
    const saved = localStorage.getItem('notifications');
    return saved ? JSON.parse(saved).email : true;
  });
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('notifications');
    return saved ? JSON.parse(saved).sound : true;
  });
  const [quietStart, setQuietStart] = useState('22:00');
  const [quietEnd, setQuietEnd] = useState('07:00');

  const handleSaveProfile = async () => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: nome,
          gender: genero,
          weight: peso
        }
      });

      if (error) throw error;
      
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Error updating profile');
    }
  };

  const handleChangePassword = async () => {
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      toast.success('Password changed successfully!');
      setShowPasswordDialog(false);
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      console.error('Error changing password:', error);
      toast.error(error.message || 'Error changing password');
    }
  };

  const handleViewDevices = () => {
    toast.info('Device management coming soon!');
  };

  const handleUpgradePremium = () => {
    toast.info('Premium plans coming soon! Stay tuned 🚀');
  };

  const handleSaveNotifications = () => {
    const settings = {
      push: pushNotifications,
      email: emailNotifications,
      sound: soundEnabled,
      quietStart,
      quietEnd
    };
    localStorage.setItem('notifications', JSON.stringify(settings));
    toast.success('Notification preferences saved!');
  };

  const handleLogout = async () => {
    await signOut();
    toast.success('You have been signed out');
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      <div className="container mx-auto px-4 py-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <h1 className="text-3xl font-bold text-petroleum mb-6">Settings</h1>

        <Tabs defaultValue="perfil" className="space-y-6">
          <TabsList className="grid grid-cols-2 lg:grid-cols-5 gap-2">
            <TabsTrigger value="perfil">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notificacoes">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="tema">
              <Palette className="h-4 w-4 mr-2" />
              Theme
            </TabsTrigger>
            <TabsTrigger value="idioma">
              <Globe className="h-4 w-4 mr-2" />
              Language
            </TabsTrigger>
            <TabsTrigger value="assinatura">
              <CreditCard className="h-4 w-4 mr-2" />
              Subscription
            </TabsTrigger>
          </TabsList>

          {/* Profile */}
          <TabsContent value="perfil" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Full name</Label>
                  <Input
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Your name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    value={user?.email || ''}
                    disabled
                    className="bg-muted"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="genero">Gender</Label>
                    <Select value={genero} onValueChange={setGenero}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="peso">Weight (kg)</Label>
                    <Input
                      id="peso"
                      type="number"
                      value={peso}
                      onChange={(e) => setPeso(e.target.value)}
                      placeholder="70"
                    />
                  </div>
                </div>

                <Button onClick={handleSaveProfile} className="w-full bg-mint hover:bg-mint-dark text-white">
                  Save changes
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => setShowPasswordDialog(true)}
                >
                  Change password
                </Button>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Manage devices</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={handleViewDevices}>
                    View all
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notificacoes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive alerts on your phone</p>
                  </div>
                  <Switch
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email notifications</Label>
                    <p className="text-sm text-muted-foreground">Updates in your inbox</p>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sounds and vibration</Label>
                    <p className="text-sm text-muted-foreground">Sound alerts</p>
                  </div>
                  <Switch
                    checked={soundEnabled}
                    onCheckedChange={setSoundEnabled}
                  />
                </div>

                  <div className="pt-4 border-t">
                    <Label>Quiet hours</Label>
                    <p className="text-sm text-muted-foreground mb-4">Configure periods without notifications</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs">Start</Label>
                        <Input 
                          type="time" 
                          value={quietStart} 
                          onChange={(e) => setQuietStart(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs">End</Label>
                        <Input 
                          type="time" 
                          value={quietEnd}
                          onChange={(e) => setQuietEnd(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <Button onClick={handleSaveNotifications} className="w-full bg-mint hover:bg-mint-dark text-white mt-4">
                    Save preferences
                  </Button>
                </CardContent>
            </Card>
          </TabsContent>

          {/* Theme */}
          <TabsContent value="tema" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Select theme</Label>
                  <div className="grid grid-cols-1 gap-3">
                    <button
                      onClick={() => setTheme('light')}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        theme === 'light' ? 'border-mint bg-mint/10' : 'border-border hover:border-mint/50'
                      }`}
                    >
                      <div className="font-medium">Light</div>
                      <div className="text-sm text-muted-foreground">Light theme for daytime</div>
                    </button>
                    
                    <button
                      onClick={() => setTheme('dark')}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        theme === 'dark' ? 'border-mint bg-mint/10' : 'border-border hover:border-mint/50'
                      }`}
                    >
                      <div className="font-medium">Dark</div>
                      <div className="text-sm text-muted-foreground">Dark theme for nighttime</div>
                    </button>
                    
                    <button
                      onClick={() => setTheme('auto')}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        theme === 'auto' ? 'border-mint bg-mint/10' : 'border-border hover:border-mint/50'
                      }`}
                    >
                      <div className="font-medium">Automatic</div>
                      <div className="text-sm text-muted-foreground">Based on device system</div>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Language */}
          <TabsContent value="idioma" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Select language</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={language} onValueChange={(val) => changeLanguage(val as any)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt">🇧🇷 Português</SelectItem>
                    <SelectItem value="en">🇺🇸 English</SelectItem>
                    <SelectItem value="es">🇪🇸 Español</SelectItem>
                    <SelectItem value="fr">🇫🇷 Français</SelectItem>
                    <SelectItem value="de">🇩🇪 Deutsch</SelectItem>
                    <SelectItem value="it">🇮🇹 Italiano</SelectItem>
                    <SelectItem value="pl">🇵🇱 Polski</SelectItem>
                    <SelectItem value="cs">🇨🇿 Čeština</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subscription */}
          <TabsContent value="assinatura" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Current Plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gradient-hero rounded-lg text-white">
                  <div className="text-sm opacity-90">Free Plan</div>
                  <div className="text-2xl font-bold">$0.00/month</div>
                </div>
                <Button className="w-full bg-mint hover:bg-mint-dark text-white" onClick={handleUpgradePremium}>
                  Upgrade to Premium
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  Unlock exclusive features and get full access to VaiFit
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Sign Out */}
        <Card className="mt-6 border-destructive/20">
          <CardContent className="pt-6">
            <Button
              variant="destructive"
              onClick={() => setShowLogoutDialog(true)}
              className="w-full"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign out
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Logout confirmation dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to sign out?</AlertDialogTitle>
            <AlertDialogDescription>
              You will be signed out of your account and will need to sign in again to access VaiFit.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout} className="bg-destructive hover:bg-destructive/90">
              Yes, sign out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Password change dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your new password below. It must be at least 6 characters long.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPasswordDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleChangePassword} className="bg-mint hover:bg-mint-dark text-white">
              Change Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Configuracoes;
