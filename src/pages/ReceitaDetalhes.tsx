import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppNav from '@/components/AppNav';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Heart, Clock, Flame, ChefHat, Lightbulb } from 'lucide-react';
import { receitas } from '@/data/receitas';
import { LiviaChat } from '@/components/LiviaChat';
import liviaAvatar from '@/assets/livia-avatar.jpg';

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

export default function ReceitaDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const receita = receitas.find(r => r.id === id);

  const [favoritos, setFavoritos] = useState<Set<string>>(
    new Set(JSON.parse(localStorage.getItem('receitasFavoritas') || '[]'))
  );

  if (!receita) {
    return (
      <div className="min-h-screen bg-background">
        <AppNav />
        <main className="container mx-auto px-4 pt-24 pb-20">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground">Receita não encontrada</p>
              <Button onClick={() => navigate('/receitas')} variant="link" className="mt-2">
                Voltar para receitas
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const toggleFavorito = () => {
    const novosFavoritos = new Set(favoritos);
    if (novosFavoritos.has(receita.id)) {
      novosFavoritos.delete(receita.id);
    } else {
      novosFavoritos.add(receita.id);
    }
    setFavoritos(novosFavoritos);
    localStorage.setItem('receitasFavoritas', JSON.stringify([...novosFavoritos]));
  };

  const isFavorito = favoritos.has(receita.id);

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

            <Button 
              variant={isFavorito ? 'default' : 'outline'}
              onClick={toggleFavorito}
              className="gap-2"
            >
              <Heart className={`h-4 w-4 ${isFavorito ? 'fill-current' : ''}`} />
              {isFavorito ? 'Favoritado' : 'Favoritar'}
            </Button>
          </div>

          {/* Imagem Principal */}
          <div className="relative aspect-video rounded-xl overflow-hidden">
            <img 
              src={receita.imagem} 
              alt={receita.nome}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Título e Info Básica */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-petroleum">{receita.nome}</h1>

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-5 w-5" />
                <span>{receita.tempoPreparo} minutos</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Flame className="h-5 w-5" />
                <span>{receita.calorias} kcal</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <ChefHat className="h-5 w-5" />
                <span>{receita.metodosPreparo.map(m => 
                  m === 'rapido' ? 'Rápido' : m === 'facil' ? 'Fácil' : 'Poucos ingredientes'
                ).join(', ')}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {receita.metasNutricionais.map((meta) => (
                <Badge key={meta} variant="secondary">
                  {metasLabels[meta]}
                </Badge>
              ))}
            </div>
          </div>

          {/* Dica da Lívia */}
          <Card className="bg-gradient-hero text-white">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <img 
                  src={liviaAvatar} 
                  alt="Lívia" 
                  className="w-16 h-16 rounded-full object-cover border-2 border-white/30"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="h-5 w-5" />
                    <span className="font-semibold">Dica da Lívia</span>
                  </div>
                  <p className="text-white/90">{receita.dicaLivia}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informações Nutricionais */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-petroleum mb-4">
                Informações Nutricionais (por porção)
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-mint">{receita.calorias}</div>
                  <div className="text-sm text-muted-foreground">Calorias</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-mint">{receita.proteinas}g</div>
                  <div className="text-sm text-muted-foreground">Proteínas</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-mint">{receita.carboidratos}g</div>
                  <div className="text-sm text-muted-foreground">Carboidratos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-mint">{receita.gorduras}g</div>
                  <div className="text-sm text-muted-foreground">Gorduras</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ingredientes */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-petroleum mb-4">Ingredientes</h2>
              <ul className="space-y-2">
                {receita.ingredientes.map((ingrediente, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-mint mt-1">•</span>
                    <span>{ingrediente}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Modo de Preparo */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-petroleum mb-4">Modo de Preparo</h2>
              <ol className="space-y-4">
                {receita.modoPreparo.map((passo, index) => (
                  <li key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-mint text-white flex items-center justify-center font-semibold">
                      {index + 1}
                    </div>
                    <p className="flex-1 pt-1">{passo}</p>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          {/* Botão Ver Substituições */}
          <Button variant="outline" className="w-full" size="lg">
            Ver substituições de ingredientes
          </Button>
        </div>
      </main>

      <LiviaChat 
        context={`Receita: ${receita.nome}`}
        initialMessage={`Oi! Vi que você está olhando a receita de ${receita.nome}. ${receita.dicaLivia} Posso te ajudar com dúvidas sobre a receita ou sugerir substituições?`}
      />
    </div>
  );
}
