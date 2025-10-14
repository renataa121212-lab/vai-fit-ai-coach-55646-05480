import { useState } from 'react';
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
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
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

const Configuracoes = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  
  // Configurações de perfil
  const [nome, setNome] = useState(user?.user_metadata?.full_name || '');
  const [genero, setGenero] = useState('');
  const [peso, setPeso] = useState('');
  
  // Configurações de notificação
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleSaveProfile = () => {
    toast.success('Perfil atualizado com sucesso!');
  };

  const handleLogout = async () => {
    await signOut();
    toast.success('Você saiu da sua conta');
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
          Voltar
        </Button>

        <h1 className="text-3xl font-bold text-petroleum mb-6">Configurações</h1>

        <Tabs defaultValue="perfil" className="space-y-6">
          <TabsList className="grid grid-cols-2 lg:grid-cols-5 gap-2">
            <TabsTrigger value="perfil">
              <User className="h-4 w-4 mr-2" />
              Perfil
            </TabsTrigger>
            <TabsTrigger value="notificacoes">
              <Bell className="h-4 w-4 mr-2" />
              Notificações
            </TabsTrigger>
            <TabsTrigger value="tema">
              <Palette className="h-4 w-4 mr-2" />
              Tema
            </TabsTrigger>
            <TabsTrigger value="idioma">
              <Globe className="h-4 w-4 mr-2" />
              Idioma
            </TabsTrigger>
            <TabsTrigger value="assinatura">
              <CreditCard className="h-4 w-4 mr-2" />
              Assinatura
            </TabsTrigger>
          </TabsList>

          {/* Perfil */}
          <TabsContent value="perfil" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome completo</Label>
                  <Input
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Seu nome"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    value={user?.email || ''}
                    disabled
                    className="bg-muted"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="genero">Gênero</Label>
                    <Select value={genero} onValueChange={setGenero}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="masculino">Masculino</SelectItem>
                        <SelectItem value="feminino">Feminino</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                        <SelectItem value="nao-informar">Prefiro não informar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="peso">Peso (kg)</Label>
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
                  Salvar alterações
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Segurança</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full">
                  Alterar senha
                </Button>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Gerenciar dispositivos</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    Ver todos
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notificações */}
          <TabsContent value="notificacoes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Preferências de Notificação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificações push</Label>
                    <p className="text-sm text-muted-foreground">Receber alertas no celular</p>
                  </div>
                  <Switch
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Notificações por e-mail</Label>
                    <p className="text-sm text-muted-foreground">Atualizações na sua caixa de entrada</p>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sons e vibração</Label>
                    <p className="text-sm text-muted-foreground">Alertas sonoros</p>
                  </div>
                  <Switch
                    checked={soundEnabled}
                    onCheckedChange={setSoundEnabled}
                  />
                </div>

                <div className="pt-4 border-t">
                  <Label>Horário silencioso</Label>
                  <p className="text-sm text-muted-foreground mb-4">Configure períodos sem notificações</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs">Início</Label>
                      <Input type="time" defaultValue="22:00" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">Fim</Label>
                      <Input type="time" defaultValue="07:00" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tema */}
          <TabsContent value="tema" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Aparência</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Selecione o tema</Label>
                  <div className="grid grid-cols-1 gap-3">
                    <button
                      onClick={() => setTheme('light')}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        theme === 'light' ? 'border-mint bg-mint/10' : 'border-border hover:border-mint/50'
                      }`}
                    >
                      <div className="font-medium">Claro</div>
                      <div className="text-sm text-muted-foreground">Tema claro para o dia</div>
                    </button>
                    
                    <button
                      onClick={() => setTheme('dark')}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        theme === 'dark' ? 'border-mint bg-mint/10' : 'border-border hover:border-mint/50'
                      }`}
                    >
                      <div className="font-medium">Escuro</div>
                      <div className="text-sm text-muted-foreground">Tema escuro para a noite</div>
                    </button>
                    
                    <button
                      onClick={() => setTheme('auto')}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        theme === 'auto' ? 'border-mint bg-mint/10' : 'border-border hover:border-mint/50'
                      }`}
                    >
                      <div className="font-medium">Automático</div>
                      <div className="text-sm text-muted-foreground">Baseado no sistema do dispositivo</div>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Idioma */}
          <TabsContent value="idioma" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Selecione o idioma</CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={language} onValueChange={setLanguage}>
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

          {/* Assinatura */}
          <TabsContent value="assinatura" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Plano Atual</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gradient-hero rounded-lg text-white">
                  <div className="text-sm opacity-90">Plano Gratuito</div>
                  <div className="text-2xl font-bold">R$ 0,00/mês</div>
                </div>
                <Button className="w-full bg-mint hover:bg-mint-dark text-white">
                  Fazer upgrade para Premium
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  Desbloqueie recursos exclusivos e tenha acesso completo ao VaiFit
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Sair */}
        <Card className="mt-6 border-destructive/20">
          <CardContent className="pt-6">
            <Button
              variant="destructive"
              onClick={() => setShowLogoutDialog(true)}
              className="w-full"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair da conta
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Diálogo de confirmação de logout */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza que deseja sair?</AlertDialogTitle>
            <AlertDialogDescription>
              Você será desconectado da sua conta e precisará fazer login novamente para acessar o VaiFit.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout} className="bg-destructive hover:bg-destructive/90">
              Sim, sair
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Configuracoes;
