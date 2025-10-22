import { Receita } from '@/types/receita';

export const receitasDocesSaudaveis: Receita[] = Array.from({ length: 35 }, (_, i) => {
  const doces = [
    { nome: 'Brownie de Batata-Doce', calorias: 180, ingredientes: ['Batata-doce', 'Ovos', 'Cacau em pó', 'Mel', 'Farinha de amêndoas'], proteinas: 6, carboidratos: 28, gorduras: 5 },
    { nome: 'Mousse de Abacate com Cacau', calorias: 220, ingredientes: ['Abacate', 'Cacau', 'Mel', 'Leite de coco'], proteinas: 3, carboidratos: 24, gorduras: 14 },
    { nome: 'Cookies de Banana e Aveia', calorias: 95, ingredientes: ['Bananas', 'Aveia', 'Nozes', 'Canela', 'Chocolate 70%'], proteinas: 3, carboidratos: 18, gorduras: 2 },
    { nome: 'Pudim de Chia com Frutas', calorias: 160, ingredientes: ['Chia', 'Leite de amêndoas', 'Mel', 'Frutas vermelhas'], proteinas: 8, carboidratos: 20, gorduras: 9 },
    { nome: 'Sorvete de Banana Fit', calorias: 105, ingredientes: ['Bananas congeladas', 'Cacau', 'Pasta de amendoim'], proteinas: 4, carboidratos: 22, gorduras: 3 },
    { nome: 'Brigadeiro Proteico', calorias: 85, ingredientes: ['Leite condensado zero', 'Cacau', 'Whey chocolate', 'Manteiga ghee'], proteinas: 8, carboidratos: 12, gorduras: 3 },
    { nome: 'Panqueca de Banana Low Carb', calorias: 140, ingredientes: ['Banana', 'Ovos', 'Farinha de coco', 'Canela'], proteinas: 7, carboidratos: 16, gorduras: 6 },
    { nome: 'Bolo de Cenoura Fit', calorias: 195, ingredientes: ['Cenouras', 'Ovos', 'Farinha de amêndoas', 'Mel', 'Cacau'], proteinas: 8, carboidratos: 22, gorduras: 9 },
    { nome: 'Trufas de Tâmaras e Nozes', calorias: 110, ingredientes: ['Tâmaras', 'Nozes', 'Cacau', 'Coco ralado'], proteinas: 3, carboidratos: 18, gorduras: 6 },
    { nome: 'Cheesecake Fit de Limão', calorias: 210, ingredientes: ['Cream cheese light', 'Ovos', 'Limão', 'Aveia', 'Gelatina'], proteinas: 12, carboidratos: 18, gorduras: 11 },
  ];
  
  const base = doces[i % doces.length];
  const imagens = {
    'Brownie de Batata-Doce': '/src/assets/recipes/mousse-chocolate.jpg',
    'Mousse de Abacate com Cacau': '/src/assets/recipes/mousse-chocolate.jpg',
  };
  
  return {
    id: `doce-${i + 1}`,
    nome: `${base.nome} ${i > 9 ? `V${Math.floor(i / 10) + 1}` : ''}`,
    imagem: imagens[base.nome] || 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=500',
    categoria: 'doce-saudavel',
    tempoPreparo: 20 + (i % 30),
    calorias: base.calorias,
    ingredientes: base.ingredientes,
    modoPreparo: [
      'Prepare os ingredientes',
      'Misture conforme receita',
      'Asse ou refrigere',
      'Sirva e aproveite'
    ],
    dicaLivia: 'Doce saudável para satisfazer sem culpa!',
    metasNutricionais: ['sem-acucar', 'poucas-calorias'],
    metodosPreparo: ['facil'],
    ingredientesPrincipais: ['ovos', 'nozes', 'batata'],
    proteinas: base.proteinas,
    carboidratos: base.carboidratos,
    gorduras: base.gorduras
  };
});
