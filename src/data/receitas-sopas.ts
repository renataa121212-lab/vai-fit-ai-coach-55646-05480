import { Receita } from '@/types/receita';

export const receitasSopas: Receita[] = Array.from({ length: 28 }, (_, i) => {
  const sopas = [
    { nome: 'Canja de Galinha Light', calorias: 250, ingredientes: ['Peito de frango', 'Arroz integral', 'Cenoura', 'Batata', 'Salsinha'], proteinas: 28, carboidratos: 32, gorduras: 4 },
    { nome: 'Creme de Abóbora com Gengibre', calorias: 180, ingredientes: ['Abóbora', 'Gengibre', 'Cebola', 'Caldo de legumes', 'Leite de coco'], proteinas: 4, carboidratos: 35, gorduras: 5 },
    { nome: 'Sopa de Lentilha', calorias: 280, ingredientes: ['Lentilha', 'Cenoura', 'Batata', 'Bacon', 'Tomate'], proteinas: 18, carboidratos: 42, gorduras: 6 },
    { nome: 'Sopa de Peixe com Legumes', calorias: 240, ingredientes: ['Peixe branco', 'Tomate', 'Batata', 'Cenoura', 'Coentro'], proteinas: 32, carboidratos: 24, gorduras: 4 },
    { nome: 'Minestrone Italiana', calorias: 220, ingredientes: ['Feijão branco', 'Macarrão integral', 'Tomate', 'Abobrinha', 'Manjericão'], proteinas: 12, carboidratos: 38, gorduras: 3 },
  ];
  
  const base = sopas[i % sopas.length];
  const imagens = {
    'Canja de Galinha Light': '/src/assets/recipes/sopa-frango.jpg',
  };
  
  return {
    id: `sopa-extra-${i + 1}`,
    nome: `${base.nome} ${i > 4 ? `V${Math.floor(i / 5) + 1}` : ''}`,
    imagem: imagens[base.nome] || 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500',
    categoria: 'sopa',
    tempoPreparo: 35 + (i % 15),
    calorias: base.calorias,
    ingredientes: base.ingredientes,
    modoPreparo: [
      'Prepare o caldo',
      'Adicione os ingredientes',
      'Cozinhe até amolecer',
      'Ajuste temperos e sirva'
    ],
    dicaLivia: 'Sopas são reconfortantes e nutritivas!',
    metasNutricionais: ['poucas-calorias', 'rica-em-proteinas'],
    metodosPreparo: ['facil'],
    ingredientesPrincipais: ['frango', 'peixe', 'batata'],
    proteinas: base.proteinas,
    carboidratos: base.carboidratos,
    gorduras: base.gorduras
  };
});
