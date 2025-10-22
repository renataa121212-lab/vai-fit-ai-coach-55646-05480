import { Receita } from '@/types/receita';

export const receitasLanches: Receita[] = Array.from({ length: 30 }, (_, i) => {
  const lanches = [
    { nome: 'Pasta de Atum com Cenoura', calorias: 180, ingredientes: ['Atum', 'Cenoura ralada', 'Iogurte natural', 'Salsinha'], proteinas: 28, carboidratos: 6, gorduras: 5 },
    { nome: 'Rolinhos de Peito de Peru com Cream Cheese', calorias: 150, ingredientes: ['Peito de peru', 'Cream cheese light', 'Cebolinha', 'Tomate seco'], proteinas: 22, carboidratos: 4, gorduras: 6 },
    { nome: 'Smoothie Verde Detox', calorias: 160, ingredientes: ['Maçã verde', 'Espinafre', 'Pepino', 'Gengibre', 'Limão'], proteinas: 3, carboidratos: 32, gorduras: 1 },
    { nome: 'Guacamole com Chips de Batata Doce', calorias: 220, ingredientes: ['Abacate', 'Tomate', 'Cebola roxa', 'Limão', 'Batata doce'], proteinas: 4, carboidratos: 28, gorduras: 16 },
    { nome: 'Queijo Cottage com Nozes e Mel', calorias: 200, ingredientes: ['Queijo cottage', 'Nozes', 'Mel', 'Canela'], proteinas: 18, carboidratos: 16, gorduras: 10 },
  ];
  
  const base = lanches[i % lanches.length];
  const imagens = {
    'Queijo Cottage com Nozes e Mel': '/src/assets/recipes/iogurte-grego-frutas.jpg',
  };
  
  return {
    id: `lanche-extra-${i + 1}`,
    nome: `${base.nome} ${i > 4 ? `V${Math.floor(i / 5) + 1}` : ''}`,
    imagem: imagens[base.nome] || 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500',
    categoria: 'lanche',
    tempoPreparo: 10 + (i % 15),
    calorias: base.calorias,
    ingredientes: base.ingredientes,
    modoPreparo: [
      'Prepare os ingredientes',
      'Misture conforme receita',
      'Ajuste temperos',
      'Sirva fresco'
    ],
    dicaLivia: 'Lanche prático e saudável para qualquer hora!',
    metasNutricionais: ['rica-em-proteinas', 'poucas-calorias'],
    metodosPreparo: ['rapido', 'facil', 'poucos-ingredientes'],
    ingredientesPrincipais: ['peixe', 'frango', 'laticinios'],
    proteinas: base.proteinas,
    carboidratos: base.carboidratos,
    gorduras: base.gorduras
  };
});
