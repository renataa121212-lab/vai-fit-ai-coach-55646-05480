import { Receita } from '@/types/receita';

export const receitasPeixes: Receita[] = Array.from({ length: 50 }, (_, i) => {
  const peixes = [
    { nome: 'Salmão Grelhado com Legumes', calorias: 420, ingredientes: ['Salmão', 'Brócolis', 'Cenoura', 'Limão'], proteinas: 38, carboidratos: 12, gorduras: 24 },
    { nome: 'Tilápia ao Molho de Ervas', calorias: 280, ingredientes: ['Tilápia', 'Manjericão', 'Salsinha', 'Limão'], proteinas: 32, carboidratos: 8, gorduras: 12 },
    { nome: 'Atum Selado com Gergelim', calorias: 320, ingredientes: ['Atum', 'Gergelim', 'Shoyu', 'Gengibre'], proteinas: 36, carboidratos: 10, gorduras: 14 },
    { nome: 'Bacalhau ao Forno', calorias: 340, ingredientes: ['Bacalhau', 'Batata', 'Cebola', 'Azeite'], proteinas: 34, carboidratos: 24, gorduras: 14 },
    { nome: 'Peixe Branco com Molho de Alcaparras', calorias: 260, ingredientes: ['Peixe branco', 'Alcaparras', 'Limão', 'Manteiga'], proteinas: 30, carboidratos: 6, gorduras: 12 },
  ];
  
  const base = peixes[i % peixes.length];
  return {
    id: `peixe-${i + 1}`,
    nome: `${base.nome} ${i > 4 ? `V${Math.floor(i / 5) + 1}` : ''}`,
    imagem: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500',
    categoria: 'almoco',
    tempoPreparo: 20 + (i % 15),
    calorias: base.calorias,
    ingredientes: base.ingredientes,
    modoPreparo: [
      'Tempere o peixe',
      'Grelhe ou asse conforme preferência',
      'Prepare o acompanhamento',
      'Finalize com molho'
    ],
    dicaLivia: 'Peixes são excelentes fontes de proteína e ômega-3!',
    metasNutricionais: ['rica-em-proteinas', 'pescetariana', 'poucas-calorias'],
    metodosPreparo: ['facil', 'rapido'],
    ingredientesPrincipais: ['peixe', 'salmao'],
    proteinas: base.proteinas,
    carboidratos: base.carboidratos,
    gorduras: base.gorduras
  };
});
