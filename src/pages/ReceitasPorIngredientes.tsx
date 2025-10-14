import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppNav from '@/components/AppNav';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Sparkles, Heart, Clock, Flame, RefreshCw, MessageCircle } from 'lucide-react';
import { receitas } from '@/data/receitas';
import { LiviaChat } from '@/components/LiviaChat';
import liviaAvatar from '@/assets/livia-avatar.jpg';
import type { Receita } from '@/types/receita';

const metasLabels = {
  'poucas-calorias': 'Poucas calorias',
  'rica-em-proteinas': 'Rica em proteínas',
  'low-carb': 'Low carb',
  'sem-acucar': 'Sem açúcar',
  'sem-gluten': 'Sem glúten',
  'sem-lactose': 'Sem lactose',
  'vegetariana': 'Vegetariana',
  'vegana': 'Vegana',
  'pescetariana': 'Pescetariana'
};

export default function ReceitasPorIngredientes() {
  const navigate = useNavigate();
  const [ingredientes, setIngredientes] = useState('');
  const [sugestoes, setSugestoes] = useState<Receita[]>([]);
  const [buscando, setBuscando] = useState(false);
  const [liviaTrigger, setLiviaTrigger] = useState('');
  const [favoritos, setFavoritos] = useState<Set<string>>(
    new Set(JSON.parse(localStorage.getItem('receitasFavoritas') || '[]'))
  );

  const buscarReceitas = () => {
    if (!ingredientes.trim()) return;

    setBuscando(true);

    setTimeout(() => {
      // Algoritmo aprimorado: busca receitas que contenham os ingredientes mencionados
      const palavrasChave = ingredientes
        .toLowerCase()
        .split(/[,;]/)
        .map(p => p.trim())
        .filter(p => p.length > 2); // Ignora palavras muito curtas
      
      const receitasEncontradas = receitas
        .map(receita => {
          // Cria um score baseado em quantos ingredientes batem
          const textoReceita = `${receita.nome} ${receita.ingredientes.join(' ')}`.toLowerCase();
          const ingredientesPrincipais = receita.ingredientesPrincipais.map(i => i.toLowerCase()).join(' ');
          
          let score = 0;
          palavrasChave.forEach(palavra => {
            if (textoReceita.includes(palavra) || ingredientesPrincipais.includes(palavra)) {
              score += 1;
            }
          });
          
          return { receita, score };
        })
        .filter(item => item.score > 0) // Apenas receitas com pelo menos um ingrediente
        .sort((a, b) => b.score - a.score) // Ordena por relevância
        .slice(0, 3) // Limita a 3 sugestões
        .map(item => item.receita);

      setSugestoes(receitasEncontradas);
      setBuscando(false);
    }, 1500);
  };

  const buscarOutraOpcao = () => {
    setBuscando(true);
    
    setTimeout(() => {
      // Embaralha e pega 3 receitas aleatórias
      const receitasAleatorias = [...receitas]
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      
      setSugestoes(receitasAleatorias);
      setBuscando(false);
    }, 1500);
  };

  const toggleFavorito = (receitaId: string) => {
    const novosFavoritos = new Set(favoritos);
    if (novosFavoritos.has(receitaId)) {
      novosFavoritos.delete(receitaId);
    } else {
      novosFavoritos.add(receitaId);
    }
    setFavoritos(novosFavoritos);
    localStorage.setItem('receitasFavoritas', JSON.stringify([...novosFavoritos]));
  };

  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      
      <main className="container mx-auto px-4 pt-24 pb-20">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/receitas')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
          </div>

          {/* Título */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-petroleum">
              O que você tem na geladeira?
            </h1>
            <p className="text-muted-foreground">
              Me conte os ingredientes que você tem e vou sugerir receitas incríveis!
            </p>
          </div>

          {/* Card com Avatar da Lívia */}
          <Card className="bg-gradient-hero text-white">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <img 
                  src={liviaAvatar} 
                  alt="Lívia" 
                  className="w-16 h-16 rounded-full object-cover border-2 border-white/30"
                />
                <div className="flex-1">
                  <p className="text-white/90">
                    Oi! Sou a Lívia, sua especialista em nutrição. Vou te ajudar a criar receitas deliciosas com o que você tem em casa. Só me falar os ingredientes!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs: Busca por Ingredientes ou Pergunte à Lívia */}
          <Tabs defaultValue="ingredientes" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="ingredientes">
                <Sparkles className="h-4 w-4 mr-2" />
                Buscar Receitas
              </TabsTrigger>
              <TabsTrigger value="livia">
                <MessageCircle className="h-4 w-4 mr-2" />
                Pergunte à Lívia
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ingredientes" className="space-y-4 mt-6">
              {/* Input de Ingredientes */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-petroleum">
                      Liste seus ingredientes
                    </label>
                    <Textarea
                      placeholder="Ex: frango, batata, brócolis, alho..."
                      value={ingredientes}
                      onChange={(e) => setIngredientes(e.target.value)}
                      rows={4}
                      className="resize-none"
                    />
                    <p className="text-xs text-muted-foreground">
                      Separe os ingredientes por vírgula
                    </p>
                  </div>

                  <Button 
                    onClick={buscarReceitas}
                    disabled={!ingredientes.trim() || buscando}
                    className="w-full bg-mint hover:bg-mint-dark text-white gap-2"
                    size="lg"
                  >
                    {buscando ? (
                      <>
                        <RefreshCw className="h-5 w-5 animate-spin" />
                        Buscando receitas...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5" />
                        Buscar receitas
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="livia" className="space-y-4 mt-6">
              <Card className="bg-gradient-to-br from-lavender/10 to-mint/10 border-lavender/20">
                <CardContent className="p-8 space-y-4 text-center">
                  <div className="flex justify-center">
                    <img 
                      src={liviaAvatar} 
                      alt="Lívia" 
                      className="w-24 h-24 rounded-full object-cover border-4 border-lavender/30 shadow-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-petroleum">
                      Converse com a Lívia
                    </h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      Prefere conversar diretamente? Posso ajudar a criar receitas personalizadas com base nos ingredientes disponíveis!
                    </p>
                  </div>
                  <Button 
                    onClick={() => setLiviaTrigger('Oi Lívia! Tenho alguns ingredientes em casa e gostaria de sugestões de receitas. Pode me ajudar?')}
                    className="bg-lavender hover:bg-lavender-dark text-white gap-2"
                    size="lg"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Conversar com a Lívia
                  </Button>
                  
                  <div className="pt-4 space-y-3">
                    <p className="text-sm font-medium text-petroleum">Exemplos de perguntas:</p>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="w-full text-left justify-start h-auto py-3 px-4"
                        onClick={() => setLiviaTrigger('Tenho frango, batata e brócolis. O que posso fazer?')}
                      >
                        <Sparkles className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="text-sm">Tenho frango, batata e brócolis. O que posso fazer?</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full text-left justify-start h-auto py-3 px-4"
                        onClick={() => setLiviaTrigger('Preciso de uma receita low carb com ovos')}
                      >
                        <Sparkles className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="text-sm">Preciso de uma receita low carb com ovos</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full text-left justify-start h-auto py-3 px-4"
                        onClick={() => setLiviaTrigger('Quero fazer um jantar saudável com salmão')}
                      >
                        <Sparkles className="h-4 w-4 mr-2 flex-shrink-0" />
                        <span className="text-sm">Quero fazer um jantar saudável com salmão</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Sugestões */}
          {sugestoes.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-petroleum">
                  Sugestões da Lívia
                </h2>
                <Button 
                  variant="outline" 
                  onClick={buscarOutraOpcao}
                  disabled={buscando}
                  className="gap-2"
                >
                  <RefreshCw className={`h-4 w-4 ${buscando ? 'animate-spin' : ''}`} />
                  Quero outra opção
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sugestoes.map((receita) => (
                  <Card 
                    key={receita.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                    onClick={() => navigate(`/receitas/${receita.id}`)}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src={receita.imagem} 
                        alt={receita.nome}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorito(receita.id);
                        }}
                        className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
                      >
                        <Heart 
                          className={`h-5 w-5 ${favoritos.has(receita.id) ? 'fill-rose text-rose' : 'text-muted-foreground'}`}
                        />
                      </button>
                    </div>

                    <CardContent className="p-4 space-y-3">
                      <h3 className="font-semibold text-lg text-petroleum line-clamp-1">
                        {receita.nome}
                      </h3>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{receita.tempoPreparo} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Flame className="h-4 w-4" />
                          <span>{receita.calorias} kcal</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {receita.metasNutricionais.slice(0, 2).map((meta) => (
                          <Badge key={meta} variant="secondary" className="text-xs">
                            {metasLabels[meta]}
                          </Badge>
                        ))}
                      </div>

                      <p className="text-sm text-muted-foreground italic">
                        💜 {receita.dicaLivia}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <LiviaChat 
        context="Sugestões de receitas com base nos ingredientes disponíveis"
        initialMessage="Oi! Vi que você está buscando receitas com os ingredientes que tem em casa. Vamos criar algo delicioso juntas! Me fala o que você tem aí."
        triggerMessage={liviaTrigger}
        onMessageSent={() => setLiviaTrigger('')}
      />
    </div>
  );
}
