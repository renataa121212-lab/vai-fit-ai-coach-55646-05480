import { Receita } from '@/types/receita';

export const receitasAlmoco: Receita[] = Array.from({ length: 30 }, (_, i) => {
  const almocos = [
    { nome: 'Moqueca de Peixe Light', calorias: 380, ingredientes: ['Peixe branco', 'Leite de coco light', 'Tomate', 'Cebola', 'Pimentão', 'Coentro'], proteinas: 42, carboidratos: 18, gorduras: 14 },
    { nome: 'Bowl Buddha Vegetariano', calorias: 420, ingredientes: ['Quinoa', 'Grão de bico', 'Abacate', 'Cenoura', 'Brócolis', 'Tahine'], proteinas: 18, carboidratos: 52, gorduras: 16 },
    { nome: 'Filé de Frango Grelhado com Legumes', calorias: 340, ingredientes: ['Frango', 'Abobrinha', 'Berinjela', 'Pimentão', 'Alho', 'Azeite'], proteinas: 48, carboidratos: 12, gorduras: 8 },
    { nome: 'Risoto de Camarão Light', calorias: 450, ingredientes: ['Arroz arbóreo', 'Camarão', 'Caldo de legumes', 'Vinho branco', 'Parmesão light'], proteinas: 32, carboidratos: 58, gorduras: 10 },
    { nome: 'Carne Moída com Abobrinha e Quinoa', calorias: 420, ingredientes: ['Carne moída magra', 'Abobrinha', 'Quinoa', 'Tomate', 'Cebola'], proteinas: 38, carboidratos: 42, gorduras: 12 },
  ];
  
  const base = almocos[i % almocos.length];
  const imagens = {
    'Moqueca de Peixe Light': '/src/assets/recipes/salmao-grelhado.jpg',
    'Filé de Frango Grelhado com Legumes': '/src/assets/recipes/frango-grelhado-quinoa.jpg',
  };
  
  return {
    id: `almoco-extra-${i + 1}`,
    nome: `${base.nome} ${i > 4 ? `V${Math.floor(i / 5) + 1}` : ''}`,
    imagem: imagens[base.nome] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500',
    categoria: 'almoco',
    tempoPreparo: 25 + (i % 20),
    calorias: base.calorias,
    ingredientes: base.ingredientes,
    modoPreparo: [
      'Prepare os ingredientes',
      'Cozinhe conforme receita',
      'Tempere a gosto',
      'Sirva quente'
    ],
    dicaLivia: 'Almoço equilibrado e nutritivo!',
    metasNutricionais: ['rica-em-proteinas'],
    metodosPreparo: ['facil'],
    ingredientesPrincipais: ['frango', 'peixe'],
    proteinas: base.proteinas,
    carboidratos: base.carboidratos,
    gorduras: base.gorduras
  };
});
