import { Receita } from '@/types/receita';

export const receitasSmoothies: Receita[] = Array.from({ length: 50 }, (_, i) => {
  const smoothies = [
    { nome: 'Smoothie de Morango e Banana', calorias: 180, ingredientes: ['Morango', 'Banana', 'Iogurte', 'Mel'], proteinas: 6, carboidratos: 38, gorduras: 2 },
    { nome: 'Smoothie Verde Detox', calorias: 150, ingredientes: ['Espinafre', 'Abacaxi', 'Gengibre', 'Água de coco'], proteinas: 3, carboidratos: 32, gorduras: 1 },
    { nome: 'Smoothie Proteico de Chocolate', calorias: 250, ingredientes: ['Whey chocolate', 'Banana', 'Leite', 'Pasta de amendoim'], proteinas: 25, carboidratos: 28, gorduras: 8 },
    { nome: 'Smoothie Tropical', calorias: 200, ingredientes: ['Manga', 'Abacaxi', 'Coco', 'Iogurte'], proteinas: 8, carboidratos: 42, gorduras: 3 },
    { nome: 'Smoothie de Frutas Vermelhas', calorias: 170, ingredientes: ['Mix berries', 'Banana', 'Leite de amêndoas', 'Chia'], proteinas: 6, carboidratos: 35, gorduras: 4 },
  ];
  
  const base = smoothies[i % smoothies.length];
  const imagens = {
    'Smoothie de Frutas Vermelhas': '/src/assets/recipes/smoothie-frutas-vermelhas.jpg',
  };
  
  return {
    id: `smoothie-${i + 1}`,
    nome: `${base.nome} ${i > 4 ? `V${Math.floor(i / 5) + 1}` : ''}`,
    imagem: imagens[base.nome] || '/src/assets/recipes/smoothie-frutas-vermelhas.jpg',
    categoria: 'lanche',
    tempoPreparo: 5,
    calorias: base.calorias + (i * 2),
    ingredientes: base.ingredientes,
    modoPreparo: [
      'Coloque todos os ingredientes no liquidificador',
      'Bata até ficar homogêneo',
      'Adicione gelo se desejar',
      'Sirva imediatamente'
    ],
    dicaLivia: 'Smoothies são perfeitos para lanches rápidos e nutritivos!',
    metasNutricionais: ['poucas-calorias', 'rica-em-proteinas'],
    metodosPreparo: ['rapido', 'poucos-ingredientes', 'facil'],
    ingredientesPrincipais: [],
    proteinas: base.proteinas,
    carboidratos: base.carboidratos,
    gorduras: base.gorduras
  };
});
