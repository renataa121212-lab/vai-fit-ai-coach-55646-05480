import { Receita } from '@/types/receita';

export const receitasFitnessExtras: Receita[] = Array.from({ length: 50 }, (_, i) => {
  const extras = [
    { nome: 'Bowl de Açaí Fitness', calorias: 350, ingredientes: ['Açaí', 'Banana', 'Granola', 'Whey'], proteinas: 25, carboidratos: 48, gorduras: 8 },
    { nome: 'Panqueca Proteica', calorias: 280, ingredientes: ['Whey', 'Aveia', 'Ovo', 'Banana'], proteinas: 28, carboidratos: 32, gorduras: 6 },
    { nome: 'Muffin de Banana Fit', calorias: 180, ingredientes: ['Banana', 'Aveia', 'Ovo', 'Canela'], proteinas: 8, carboidratos: 28, gorduras: 4 },
    { nome: 'Wrap de Frango Fit', calorias: 320, ingredientes: ['Tortilha integral', 'Frango', 'Salada', 'Molho'], proteinas: 32, carboidratos: 28, gorduras: 10 },
    { nome: 'Cookie Proteico', calorias: 150, ingredientes: ['Whey', 'Pasta amendoim', 'Aveia', 'Chocolate'], proteinas: 15, carboidratos: 18, gorduras: 6 },
  ];
  
  const base = extras[i % extras.length];
  const imagens = {
    'Bowl de Açaí Fitness': '/src/assets/recipes/bowl-acai.jpg',
    'Panqueca Proteica': '/src/assets/recipes/panqueca-proteica.jpg',
  };
  
  return {
    id: `fitness-extra-${i + 1}`,
    nome: `${base.nome} ${i > 4 ? `V${Math.floor(i / 5) + 1}` : ''}`,
    imagem: imagens[base.nome] || 'https://images.unsplash.com/photo-1517673400267-0251440c45dc?w=500',
    categoria: 'lanche',
    tempoPreparo: 15 + (i % 10),
    calorias: base.calorias,
    ingredientes: base.ingredientes,
    modoPreparo: [
      'Misture todos os ingredientes',
      'Prepare conforme orientação',
      'Ajuste proteína se necessário',
      'Sirva e aproveite'
    ],
    dicaLivia: 'Receitas fitness para quem treina pesado!',
    metasNutricionais: ['rica-em-proteinas', 'poucas-calorias'],
    metodosPreparo: ['rapido', 'facil'],
    ingredientesPrincipais: ['ovos'],
    proteinas: base.proteinas,
    carboidratos: base.carboidratos,
    gorduras: base.gorduras
  };
});
