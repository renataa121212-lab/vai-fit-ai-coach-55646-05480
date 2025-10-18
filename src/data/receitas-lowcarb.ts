import { Receita } from '@/types/receita';

export const receitasLowCarb: Receita[] = Array.from({ length: 50 }, (_, i) => {
  const lowcarb = [
    { nome: 'Frango com Cream Cheese', calorias: 380, ingredientes: ['Frango', 'Cream cheese', 'Bacon', 'Temperos'], proteinas: 42, carboidratos: 4, gorduras: 22 },
    { nome: 'Omelete Recheada Low Carb', calorias: 320, ingredientes: ['Ovos', 'Queijo', 'Presunto', 'Espinafre'], proteinas: 28, carboidratos: 6, gorduras: 22 },
    { nome: 'Carne Moída com Brócolis', calorias: 350, ingredientes: ['Carne moída', 'Brócolis', 'Alho', 'Azeite'], proteinas: 38, carboidratos: 10, gorduras: 20 },
    { nome: 'Pizza Low Carb de Frango', calorias: 340, ingredientes: ['Frango moído', 'Queijo', 'Tomate', 'Orégano'], proteinas: 36, carboidratos: 8, gorduras: 18 },
    { nome: 'Salada Caesar com Frango', calorias: 380, ingredientes: ['Alface', 'Frango', 'Parmesão', 'Molho caesar'], proteinas: 38, carboidratos: 12, gorduras: 20 },
  ];
  
  const base = lowcarb[i % lowcarb.length];
  const imagens = {
    'Frango com Cream Cheese': '/src/assets/recipes/frango-cream-cheese.jpg',
  };
  
  return {
    id: `lowcarb-${i + 1}`,
    nome: `${base.nome} ${i > 4 ? `V${Math.floor(i / 5) + 1}` : ''}`,
    imagem: imagens[base.nome] || '/src/assets/recipes/frango-cream-cheese.jpg',
    categoria: 'almoco',
    tempoPreparo: 20 + (i % 15),
    calorias: base.calorias,
    ingredientes: base.ingredientes,
    modoPreparo: [
      'Prepare os ingredientes',
      'Cozinhe conforme receita low carb',
      'Evite carboidratos refinados',
      'Sirva com salada'
    ],
    dicaLivia: 'Low carb é excelente para quem busca emagrecimento!',
    metasNutricionais: ['low-carb', 'rica-em-proteinas', 'poucas-calorias'],
    metodosPreparo: ['facil', 'rapido'],
    ingredientesPrincipais: ['frango', 'ovos'],
    proteinas: base.proteinas,
    carboidratos: base.carboidratos,
    gorduras: base.gorduras
  };
});
