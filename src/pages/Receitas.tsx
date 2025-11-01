import { useState } from 'react';
import AppNav from '@/components/AppNav';
import { useTranslation } from '@/lib/i18n';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Search, Filter, Heart, Clock, Flame, ChevronRight } from 'lucide-react';
import { receitas } from '@/data/receitas';
import { LiviaChat } from '@/components/LiviaChat';
import { useNavigate } from 'react-router-dom';
import type { CategoriaRefeicao, MetaNutricional, MetodoPreparo, IngredienteDisponivel } from '@/types/receita';
import bebidasDigestao from '@/assets/bebidas-digestao.jpg';
import treinoJejum from '@/assets/treino-jejum.jpg';
import vontadeDoce from '@/assets/vontade-doce.jpg';
import alimentosNoite from '@/assets/alimentos-noite-new.jpg';
import focoFimDeSemana from '@/assets/foco-fim-de-semana-new.jpg';
import fomeNoite from '@/assets/fome-noite-new.jpg';
import horarioRefeicao from '@/assets/horario-refeicao-new.jpg';

const categoriasLabels: Record<CategoriaRefeicao, string> = {
  'cafe-da-manha': 'Café da Manhã',
  'almoco': 'Almoço',
  'jantar': 'Jantar',
  'lanche': 'Lanche',
  'salada': 'Salada',
  'sopa': 'Sopa',
  'doce-saudavel': 'Doces Saudáveis'
};

const metasLabels: Record<MetaNutricional, string> = {
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

const metodosLabels: Record<MetodoPreparo, string> = {
  'rapido': 'Rápido',
  'poucos-ingredientes': 'Poucos ingredientes',
  'facil': 'Fácil'
};

const ingredientesLabels: Record<IngredienteDisponivel, string> = {
  'peixe': 'Peixe',
  'frango': 'Frango',
  'porco': 'Porco',
  'gado': 'Gado',
  'bacon': 'Bacon',
  'ovos': 'Ovos',
  'laticinios': 'Laticínios',
  'nozes': 'Nozes',
  'espinafre': 'Espinafre',
  'abacate': 'Abacate',
  'batata': 'Batata',
  'arroz': 'Arroz',
  'massa': 'Massa',
  'pao': 'Pão',
  'salmao': 'Salmão',
  'frutos-do-mar': 'Frutos do mar'
};

export default function Receitas() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [busca, setBusca] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState<CategoriaRefeicao | 'todas'>('todas');
  const [metasSelecionadas, setMetasSelecionadas] = useState<MetaNutricional[]>([]);
  const [metodosSelecionados, setMetodosSelecionados] = useState<MetodoPreparo[]>([]);
  const [ingredientesSelecionados, setIngredientesSelecionados] = useState<IngredienteDisponivel[]>([]);
  const [caloriaMax, setCaloriaMax] = useState(600);
  const [favoritos, setFavoritos] = useState<Set<string>>(
    new Set(JSON.parse(localStorage.getItem('receitasFavoritas') || '[]'))
  );
  const [liviaTrigger, setLiviaTrigger] = useState<string>('');

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

  const receitasFiltradas = receitas.filter(receita => {
    // Filtro de busca
    if (busca && !receita.nome.toLowerCase().includes(busca.toLowerCase())) {
      return false;
    }

    // Filtro de categoria
    if (categoriaAtiva !== 'todas' && receita.categoria !== categoriaAtiva) {
      return false;
    }

    // Filtro de metas nutricionais
    if (metasSelecionadas.length > 0) {
      if (!metasSelecionadas.some(meta => receita.metasNutricionais.includes(meta))) {
        return false;
      }
    }

    // Filtro de métodos de preparo
    if (metodosSelecionados.length > 0) {
      if (!metodosSelecionados.some(metodo => receita.metodosPreparo.includes(metodo))) {
        return false;
      }
    }

    // Filtro de ingredientes
    if (ingredientesSelecionados.length > 0) {
      if (!ingredientesSelecionados.some(ing => receita.ingredientesPrincipais.includes(ing))) {
        return false;
      }
    }

    // Filtro de calorias
    if (receita.calorias > caloriaMax) {
      return false;
    }

    return true;
  });

  const limparFiltros = () => {
    setBusca('');
    setCategoriaAtiva('todas');
    setMetasSelecionadas([]);
    setMetodosSelecionados([]);
    setIngredientesSelecionados([]);
    setCaloriaMax(600);
  };

  return (
    <div className="min-h-screen bg-background">
      <AppNav />
      
      <main className="container mx-auto px-4 pt-24 pb-20">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-petroleum">{t('recipesTitle')}</h1>
            <p className="text-muted-foreground">
              {t('recipesSubtitle')}
            </p>
          </div>

          {/* Cards da Lívia */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card 
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-all group"
              onClick={() => setLiviaTrigger('Me conte mais sobre as melhores bebidas para melhorar a digestão. Quais você recomenda?')}
            >
              <div className="relative h-40 overflow-hidden">
                <img 
                  src={bebidasDigestao} 
                  alt="Bebidas para digestão" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-petroleum/90 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-semibold text-white text-sm mb-1">
                    As melhores bebidas para melhorar a digestão
                  </h3>
                  <p className="text-xs text-white/80">Dica da Lívia</p>
                </div>
              </div>
            </Card>

            <Card 
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-all group"
              onClick={() => setLiviaTrigger('Quando é o melhor momento para treinar durante o jejum intermitente? Como otimizar meus resultados?')}
            >
              <div className="relative h-40 overflow-hidden">
                <img 
                  src={treinoJejum} 
                  alt="Treino em jejum" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-petroleum/90 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-semibold text-white text-sm mb-1">
                    Quando treinar durante o jejum?
                  </h3>
                  <p className="text-xs text-white/80">Otimize seus resultados</p>
                </div>
              </div>
            </Card>

            <Card 
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-all group"
              onClick={() => setLiviaTrigger('Como posso lidar com a vontade de comer doce à noite? Você tem estratégias práticas para isso?')}
            >
              <div className="relative h-40 overflow-hidden">
                <img 
                  src={vontadeDoce} 
                  alt="Vontade de doce" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-petroleum/90 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-semibold text-white text-sm mb-1">
                    Como lidar com a vontade de doce à noite?
                  </h3>
                  <p className="text-xs text-white/80">Estratégias práticas</p>
                </div>
              </div>
            </Card>

            <Card
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-all group"
              onClick={() => setLiviaTrigger('O que posso comer antes de dormir que não atrapalhe meu sono e me ajude a emagrecer?')}
            >
              <div className="relative h-40 overflow-hidden">
                <img 
                  src={alimentosNoite} 
                  alt="Alimentação noturna" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-petroleum/90 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-semibold text-white text-sm mb-1">
                    O que comer antes de dormir?
                  </h3>
                  <p className="text-xs text-white/80">Melhore seu sono</p>
                </div>
              </div>
            </Card>

            <Card 
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-all group"
              onClick={() => setLiviaTrigger('Como manter o foco na alimentação saudável durante o fim de semana? Preciso de dicas práticas!')}
            >
              <div className="relative h-40 overflow-hidden">
                <img 
                  src={focoFimDeSemana} 
                  alt="Foco no fim de semana" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-petroleum/90 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-semibold text-white text-sm mb-1">
                    Como manter o foco no fim de semana?
                  </h3>
                  <p className="text-xs text-white/80">Equilíbrio e diversão</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Tabs Principais: Todas receitas e Favoritos */}
          <Tabs defaultValue="todas" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="todas">{t('allRecipes')}</TabsTrigger>
              <TabsTrigger value="favoritos" className="gap-2">
                <Heart className="h-4 w-4" />
                {t('favorites')}
                {favoritos.size > 0 && (
                  <Badge variant="secondary" className="ml-1">{favoritos.size}</Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="todas" className="space-y-6">
              {/* Busca e Filtros */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder={t('search')}
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <Filter className="h-4 w-4" />
                      {t('filters')}
                      {(metasSelecionadas.length + metodosSelecionados.length + ingredientesSelecionados.length > 0) && (
                        <Badge variant="secondary" className="ml-1">
                          {metasSelecionadas.length + metodosSelecionados.length + ingredientesSelecionados.length}
                        </Badge>
                      )}
                    </Button>
                  </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filtros</SheetTitle>
                </SheetHeader>

                <div className="mt-6 space-y-6">
                  {/* Calorias */}
                  <div className="space-y-2">
                    <Label>Calorias máximas: {caloriaMax}+</Label>
                    <Slider
                      value={[caloriaMax]}
                      onValueChange={([value]) => setCaloriaMax(value)}
                      min={0}
                      max={600}
                      step={50}
                      className="w-full"
                    />
                  </div>


                  {/* Metas Nutricionais */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">Meta nutricional</Label>
                    {(Object.keys(metasLabels) as MetaNutricional[]).map((meta) => (
                      <div key={meta} className="flex items-center space-x-2">
                        <Checkbox
                          id={meta}
                          checked={metasSelecionadas.includes(meta)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setMetasSelecionadas([...metasSelecionadas, meta]);
                            } else {
                              setMetasSelecionadas(metasSelecionadas.filter(m => m !== meta));
                            }
                          }}
                        />
                        <Label htmlFor={meta} className="cursor-pointer">
                          {metasLabels[meta]}
                        </Label>
                      </div>
                    ))}
                  </div>

                  {/* Método de Preparo */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">Método de preparo</Label>
                    {(Object.keys(metodosLabels) as MetodoPreparo[]).map((metodo) => (
                      <div key={metodo} className="flex items-center space-x-2">
                        <Checkbox
                          id={metodo}
                          checked={metodosSelecionados.includes(metodo)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setMetodosSelecionados([...metodosSelecionados, metodo]);
                            } else {
                              setMetodosSelecionados(metodosSelecionados.filter(m => m !== metodo));
                            }
                          }}
                        />
                        <Label htmlFor={metodo} className="cursor-pointer">
                          {metodosLabels[metodo]}
                        </Label>
                      </div>
                    ))}
                  </div>

                  {/* Ingredientes Disponíveis */}
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">Ingredientes disponíveis</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {(Object.keys(ingredientesLabels) as IngredienteDisponivel[]).map((ing) => (
                        <div key={ing} className="flex items-center space-x-2">
                          <Checkbox
                            id={ing}
                            checked={ingredientesSelecionados.includes(ing)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setIngredientesSelecionados([...ingredientesSelecionados, ing]);
                              } else {
                                setIngredientesSelecionados(ingredientesSelecionados.filter(i => i !== ing));
                              }
                            }}
                          />
                          <Label htmlFor={ing} className="cursor-pointer text-sm">
                            {ingredientesLabels[ing]}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <SheetTrigger asChild>
                      <Button className="flex-1 bg-mint hover:bg-mint-dark text-white">
                        Mostrar receitas
                      </Button>
                    </SheetTrigger>
                    <Button onClick={limparFiltros} variant="outline" className="flex-1">
                      Limpar
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Button 
              className="gap-2 bg-mint hover:bg-mint-dark text-white"
              onClick={() => navigate('/receitas-ingredientes')}
            >
              🏠 Receita com o que tenho em casa
            </Button>
          </div>

          {/* Tabs de Categorias */}
          <Tabs value={categoriaAtiva} onValueChange={(value) => setCategoriaAtiva(value as CategoriaRefeicao | 'todas')}>
            <TabsList className="w-full justify-start overflow-x-auto">
              <TabsTrigger value="todas">Todas</TabsTrigger>
              {(Object.keys(categoriasLabels) as CategoriaRefeicao[]).map((cat) => (
                <TabsTrigger key={cat} value={cat}>
                  {categoriasLabels[cat]}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={categoriaAtiva} className="mt-6">
              {receitasFiltradas.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <p className="text-muted-foreground text-center">
                      Nenhuma receita encontrada com os filtros selecionados
                    </p>
                    <Button onClick={limparFiltros} variant="link" className="mt-2">
                      Limpar filtros
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {receitasFiltradas.map((receita) => (
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
                  )}
                </TabsContent>
              </Tabs>
            </TabsContent>

            {/* Tab de Favoritos */}
            <TabsContent value="favoritos" className="space-y-6">
              {favoritos.size === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Heart className="h-16 w-16 text-muted-foreground/20 mb-4" />
                    <p className="text-muted-foreground text-center mb-2">
                      Você ainda não tem receitas favoritas
                    </p>
                    <p className="text-sm text-muted-foreground text-center">
                      Clique no ícone de coração nas receitas para salvá-las aqui
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {receitas.filter(r => favoritos.has(r.id)).map((receita) => (
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
                            className="h-5 w-5 fill-rose text-rose"
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
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <LiviaChat 
        context="Receitas e alimentação saudável" 
        triggerMessage={liviaTrigger}
        onMessageSent={() => setLiviaTrigger('')}
      />
    </div>
  );
}
