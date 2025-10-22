import { Receita } from '@/types/receita';

export const receitasJantar: Receita[] = Array.from({ length: 30 }, (_, i) => {
  const jantares = [
    { nome: 'Salmão ao Molho de Laranja', calorias: 420, ingredientes: ['Salmão', 'Suco de laranja', 'Mel', 'Gengibre', 'Aspargos'], proteinas: 45, carboidratos: 22, gorduras: 18 },
    { nome: 'Omelete de Forno com Legumes', calorias: 280, ingredientes: ['Ovos', 'Brócolis', 'Tomate', 'Cebola', 'Queijo cottage'], proteinas: 32, carboidratos: 8, gorduras: 16 },
    { nome: 'Strogonoff de Frango Light', calorias: 350, ingredientes: ['Frango', 'Champignon', 'Cebola', 'Iogurte grego', 'Mostarda'], proteinas: 46, carboidratos: 18, gorduras: 10 },
    { nome: 'Espaguete de Abobrinha com Camarão', calorias: 290, ingredientes: ['Abobrinha', 'Camarão', 'Tomate cereja', 'Alho', 'Manjericão'], proteinas: 35, carboidratos: 12, gorduras: 10 },
    { nome: 'Berinjela Recheada com Carne', calorias: 380, ingredientes: ['Berinjela', 'Carne moída', 'Tomate', 'Queijo muçarela light'], proteinas: 36, carboidratos: 20, gorduras: 18 },
  ];
  
  const base = jantares[i % jantares.length];
  const imagens = {
    'Salmão ao Molho de Laranja': '/src/assets/recipes/salmao-grelhado.jpg',
  };
  
  return {
    id: `jantar-extra-${i + 1}`,
    nome: `${base.nome} ${i > 4 ? `V${Math.floor(i / 5) + 1}` : ''}`,
    imagem: imagens[base.nome] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500',
    categoria: 'jantar',
    tempoPreparo: 25 + (i % 20),
    calorias: base.calorias,
    ingredientes: base.ingredientes,
    modoPreparo: [
      'Prepare os ingredientes',
      'Cozinhe conforme orientação',
      'Finalize com temperos',
      'Sirva quente'
    ],
    dicaLivia: 'Jantar leve e nutritivo para uma boa noite!',
    metasNutricionais: ['rica-em-proteinas', 'poucas-calorias'],
    metodosPreparo: ['facil'],
    ingredientesPrincipais: ['salmao', 'frango', 'ovos'],
    proteinas: base.proteinas,
    carboidratos: base.carboidratos,
    gorduras: base.gorduras
  };
});
