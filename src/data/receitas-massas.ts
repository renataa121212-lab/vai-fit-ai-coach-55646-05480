import { Receita } from '@/types/receita';

export const receitasMassas: Receita[] = Array.from({ length: 32 }, (_, i) => {
  const massas = [
    { nome: 'Macarrão Integral ao Molho de Tomate', calorias: 320, ingredientes: ['Macarrão integral', 'Tomate', 'Alho', 'Manjericão'], proteinas: 12, carboidratos: 58, gorduras: 6 },
    { nome: 'Espaguete de Abobrinha com Camarão', calorias: 280, ingredientes: ['Abobrinha', 'Camarão', 'Alho', 'Azeite'], proteinas: 28, carboidratos: 18, gorduras: 12 },
    { nome: 'Penne ao Pesto Light', calorias: 340, ingredientes: ['Penne integral', 'Manjericão', 'Nozes', 'Parmesão'], proteinas: 14, carboidratos: 52, gorduras: 10 },
    { nome: 'Lasanha de Berinjela', calorias: 380, ingredientes: ['Berinjela', 'Carne moída', 'Queijo light', 'Tomate'], proteinas: 32, carboidratos: 28, gorduras: 16 },
    { nome: 'Nhoque de Batata Doce', calorias: 300, ingredientes: ['Batata doce', 'Farinha integral', 'Ovo', 'Molho'], proteinas: 10, carboidratos: 54, gorduras: 6 },
  ];
  
  const base = massas[i % massas.length];
  const imagens = {
    'Macarrão Integral ao Molho de Tomate': '/src/assets/recipes/macarrao-integral.jpg',
  };
  
  return {
    id: `massa-${i + 1}`,
    nome: `${base.nome} ${i > 4 ? `V${Math.floor(i / 5) + 1}` : ''}`,
    imagem: imagens[base.nome] || '/src/assets/recipes/macarrao-integral.jpg',
    categoria: 'almoco',
    tempoPreparo: 25 + (i % 10),
    calorias: base.calorias,
    ingredientes: base.ingredientes,
    modoPreparo: [
      'Prepare a massa conforme embalagem',
      'Prepare o molho separadamente',
      'Misture tudo',
      'Finalize com temperos frescos'
    ],
    dicaLivia: 'Massas integrais são excelentes fontes de carboidratos complexos!',
    metasNutricionais: ['vegetariana', 'rica-em-proteinas'],
    metodosPreparo: ['facil'],
    ingredientesPrincipais: ['massa'],
    proteinas: base.proteinas,
    carboidratos: base.carboidratos,
    gorduras: base.gorduras
  };
});
