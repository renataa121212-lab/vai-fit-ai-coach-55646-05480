import { Receita } from '@/types/receita';

export const receitasVegetarianas: Receita[] = Array.from({ length: 35 }, (_, i) => {
  const vegetarianas = [
    { nome: 'Bowl Vegano de Quinoa', calorias: 380, ingredientes: ['Quinoa', 'Grão-de-bico', 'Abacate', 'Tomate'], proteinas: 16, carboidratos: 58, gorduras: 12 },
    { nome: 'Hambúrguer de Lentilha', calorias: 280, ingredientes: ['Lentilha', 'Aveia', 'Cebola', 'Temperos'], proteinas: 18, carboidratos: 42, gorduras: 6 },
    { nome: 'Risoto de Cogumelos', calorias: 340, ingredientes: ['Arroz arbóreo', 'Cogumelos', 'Vinho', 'Parmesão'], proteinas: 12, carboidratos: 54, gorduras: 10 },
    { nome: 'Curry de Grão-de-Bico', calorias: 320, ingredientes: ['Grão-de-bico', 'Leite de coco', 'Curry', 'Espinafre'], proteinas: 14, carboidratos: 48, gorduras: 12 },
    { nome: 'Tacos Veganos', calorias: 300, ingredientes: ['Tortilha', 'Feijão preto', 'Abacate', 'Salsa'], proteinas: 12, carboidratos: 46, gorduras: 10 },
  ];
  
  const base = vegetarianas[i % vegetarianas.length];
  const imagens = {
    'Bowl Vegano de Quinoa': '/src/assets/recipes/bowl-quinoa-vegano.jpg',
  };
  
  return {
    id: `vegetariana-${i + 1}`,
    nome: `${base.nome} ${i > 4 ? `V${Math.floor(i / 5) + 1}` : ''}`,
    imagem: imagens[base.nome] || '/src/assets/recipes/bowl-quinoa-vegano.jpg',
    categoria: 'almoco',
    tempoPreparo: 30 + (i % 20),
    calorias: base.calorias,
    ingredientes: base.ingredientes,
    modoPreparo: [
      'Prepare os ingredientes',
      'Cozinhe conforme receita',
      'Tempere a gosto',
      'Sirva quente'
    ],
    dicaLivia: 'Refeições vegetarianas são ricas em fibras e nutrientes!',
    metasNutricionais: ['vegetariana', 'vegana', 'rica-em-proteinas'],
    metodosPreparo: ['facil'],
    ingredientesPrincipais: ['arroz'],
    proteinas: base.proteinas,
    carboidratos: base.carboidratos,
    gorduras: base.gorduras
  };
});
