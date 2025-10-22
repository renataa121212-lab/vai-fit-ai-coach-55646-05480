import { Receita } from '@/types/receita';

export const receitasSaladas: Receita[] = Array.from({ length: 28 }, (_, i) => {
  const saladas = [
    { nome: 'Salada Caprese com Burrata', calorias: 320, ingredientes: ['Burrata', 'Tomate italiano', 'Manjericão', 'Azeite', 'Vinagre balsâmico'], proteinas: 18, carboidratos: 8, gorduras: 24 },
    { nome: 'Salada de Quinoa com Legumes Grelhados', calorias: 280, ingredientes: ['Quinoa', 'Abobrinha', 'Berinjela', 'Pimentão', 'Limão'], proteinas: 12, carboidratos: 42, gorduras: 8 },
    { nome: 'Salada Caesar com Frango Grelhado', calorias: 380, ingredientes: ['Alface romana', 'Frango', 'Parmesão', 'Croutons', 'Molho caesar'], proteinas: 38, carboidratos: 22, gorduras: 16 },
    { nome: 'Salada Mediterrânea', calorias: 240, ingredientes: ['Tomate', 'Pepino', 'Azeitona', 'Queijo feta', 'Cebola roxa'], proteinas: 12, carboidratos: 16, gorduras: 14 },
    { nome: 'Salada de Salmão com Abacate', calorias: 420, ingredientes: ['Salmão grelhado', 'Abacate', 'Mix de folhas', 'Manga', 'Nozes'], proteinas: 36, carboidratos: 24, gorduras: 24 },
  ];
  
  const base = saladas[i % saladas.length];
  const imagens = {
    'Salada Caprese com Burrata': '/src/assets/recipes/salada-verde.jpg',
    'Salada de Salmão com Abacate': '/src/assets/recipes/salada-verde.jpg',
  };
  
  return {
    id: `salada-extra-${i + 1}`,
    nome: `${base.nome} ${i > 4 ? `V${Math.floor(i / 5) + 1}` : ''}`,
    imagem: imagens[base.nome] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500',
    categoria: 'salada',
    tempoPreparo: 15 + (i % 15),
    calorias: base.calorias,
    ingredientes: base.ingredientes,
    modoPreparo: [
      'Lave bem os ingredientes',
      'Corte conforme preferência',
      'Monte a salada',
      'Tempere e sirva'
    ],
    dicaLivia: 'Saladas são ricas em fibras e vitaminas!',
    metasNutricionais: ['poucas-calorias', 'rica-em-proteinas'],
    metodosPreparo: ['rapido', 'facil'],
    ingredientesPrincipais: ['espinafre', 'abacate'],
    proteinas: base.proteinas,
    carboidratos: base.carboidratos,
    gorduras: base.gorduras
  };
});
