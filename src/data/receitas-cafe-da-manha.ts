import { Receita } from '@/types/receita';

export const receitasCafeDaManha: Receita[] = Array.from({ length: 30 }, (_, i) => {
  const cafes = [
    { nome: 'Bowl de Açaí Proteico', calorias: 380, ingredientes: ['Açaí congelado', 'Whey protein', 'Banana', 'Granola', 'Frutas vermelhas'], proteinas: 25, carboidratos: 52, gorduras: 12 },
    { nome: 'Wrap de Ovo com Abacate', calorias: 340, ingredientes: ['Ovos', 'Abacate', 'Tortilha integral', 'Tomate', 'Rúcula'], proteinas: 18, carboidratos: 28, gorduras: 16 },
    { nome: 'Vitamina de Banana com Pasta de Amendoim', calorias: 290, ingredientes: ['Banana', 'Leite', 'Pasta de amendoim', 'Canela'], proteinas: 12, carboidratos: 35, gorduras: 11 },
    { nome: 'Crepioca com Queijo e Peito de Peru', calorias: 280, ingredientes: ['Ovo', 'Tapioca', 'Queijo branco', 'Peito de peru'], proteinas: 22, carboidratos: 25, gorduras: 8 },
    { nome: 'Mingau de Aveia com Frutas', calorias: 260, ingredientes: ['Aveia', 'Leite', 'Canela', 'Frutas', 'Mel'], proteinas: 10, carboidratos: 42, gorduras: 6 },
  ];
  
  const base = cafes[i % cafes.length];
  const imagens = {
    'Bowl de Açaí Proteico': '/src/assets/recipes/bowl-acai.jpg',
    'Crepioca com Queijo e Peito de Peru': '/src/assets/recipes/panqueca-proteica.jpg',
  };
  
  return {
    id: `cafe-extra-${i + 1}`,
    nome: `${base.nome} ${i > 4 ? `V${Math.floor(i / 5) + 1}` : ''}`,
    imagem: imagens[base.nome] || 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500',
    categoria: 'cafe-da-manha',
    tempoPreparo: 10 + (i % 15),
    calorias: base.calorias,
    ingredientes: base.ingredientes,
    modoPreparo: [
      'Prepare os ingredientes',
      'Siga o modo de preparo',
      'Ajuste ao seu gosto',
      'Sirva fresco'
    ],
    dicaLivia: 'Comece o dia com energia e nutrição!',
    metasNutricionais: ['rica-em-proteinas'],
    metodosPreparo: ['rapido', 'facil'],
    ingredientesPrincipais: ['ovos', 'laticinios'],
    proteinas: base.proteinas,
    carboidratos: base.carboidratos,
    gorduras: base.gorduras
  };
});
