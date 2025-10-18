import { Receita } from '@/types/receita';

export const receitasJantar: Receita[] = [
  {
    id: 'jantar-extra-1',
    nome: 'Salmão ao Molho de Laranja',
    imagem: '/src/assets/recipes/salmao-grelhado.jpg',
    categoria: 'jantar',
    tempoPreparo: 25,
    calorias: 420,
    ingredientes: ['400g de salmão', 'Suco de 2 laranjas', 'Mel', 'Gengibre', 'Aspargos', 'Azeite'],
    modoPreparo: [
      'Tempere o salmão com sal e pimenta',
      'Grelhe o salmão por 5 minutos de cada lado',
      'Em uma panela, reduza o suco de laranja com mel e gengibre',
      'Grelhe os aspargos com azeite',
      'Sirva o salmão com o molho e aspargos'
    ],
    dicaLivia: 'Salmão é rico em ômega 3! Perfeito para um jantar leve e nutritivo.',
    metasNutricionais: ['rica-em-proteinas', 'pescetariana', 'sem-gluten', 'sem-lactose'],
    metodosPreparo: ['facil'],
    ingredientesPrincipais: ['salmao'],
    proteinas: 45,
    carboidratos: 22,
    gorduras: 18
  },
  {
    id: 'jantar-extra-2',
    nome: 'Omelete de Forno com Legumes',
    imagem: 'https://images.unsplash.com/photo-1587398838839-62b02fe9b45a?w=500',
    categoria: 'jantar',
    tempoPreparo: 30,
    calorias: 280,
    ingredientes: ['6 ovos', 'Brócolis', 'Tomate', 'Cebola', 'Queijo cottage', 'Ervas'],
    modoPreparo: [
      'Bata os ovos com sal e pimenta',
      'Pique os legumes',
      'Misture tudo e adicione queijo cottage',
      'Coloque em forma untada',
      'Asse a 180°C por 25 minutos'
    ],
    dicaLivia: 'Jantar leve e proteico! Você pode fazer no domingo e comer durante a semana.',
    metasNutricionais: ['rica-em-proteinas', 'low-carb', 'vegetariana', 'sem-gluten'],
    metodosPreparo: ['facil'],
    ingredientesPrincipais: ['ovos', 'laticinios'],
    proteinas: 32,
    carboidratos: 8,
    gorduras: 16
  },
  {
    id: 'jantar-extra-3',
    nome: 'Strogonoff de Frango Light',
    imagem: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500',
    categoria: 'jantar',
    tempoPreparo: 30,
    calorias: 350,
    ingredientes: ['500g de frango em cubos', 'Champignon', 'Cebola', 'Alho', 'Iogurte grego', 'Mostarda', 'Catchup light'],
    modoPreparo: [
      'Tempere e grelhe o frango',
      'Refogue a cebola, alho e champignon',
      'Adicione o frango',
      'Acrescente iogurte, mostarda e catchup',
      'Cozinhe por 5 minutos'
    ],
    dicaLivia: 'Versão saudável do clássico! Use iogurte grego no lugar do creme de leite.',
    metasNutricionais: ['rica-em-proteinas'],
    metodosPreparo: ['facil'],
    ingredientesPrincipais: ['frango', 'laticinios'],
    proteinas: 46,
    carboidratos: 18,
    gorduras: 10
  },
  {
    id: 'jantar-extra-4',
    nome: 'Espaguete de Abobrinha com Camarão',
    imagem: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=500',
    categoria: 'jantar',
    tempoPreparo: 20,
    calorias: 290,
    ingredientes: ['3 abobrinhas grandes', '300g de camarão', 'Tomate cereja', 'Alho', 'Azeite', 'Manjericão'],
    modoPreparo: [
      'Corte as abobrinhas em espiral (tipo macarrão)',
      'Refogue o alho com azeite',
      'Adicione o camarão e tomate',
      'Acrescente a abobrinha e cozinhe por 3 minutos',
      'Finalize com manjericão'
    ],
    dicaLivia: 'Low carb e delicioso! A abobrinha substitui a massa perfeitamente.',
    metasNutricionais: ['low-carb', 'poucas-calorias', 'rica-em-proteinas', 'pescetariana', 'sem-gluten'],
    metodosPreparo: ['rapido', 'facil'],
    ingredientesPrincipais: ['frutos-do-mar'],
    proteinas: 35,
    carboidratos: 12,
    gorduras: 10
  },
  {
    id: 'jantar-extra-5',
    nome: 'Berinjela Recheada com Carne',
    imagem: 'https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?w=500',
    categoria: 'jantar',
    tempoPreparo: 45,
    calorias: 380,
    ingredientes: ['2 berinjelas grandes', '300g de carne moída', 'Tomate', 'Cebola', 'Queijo muçarela light', 'Manjericão'],
    modoPreparo: [
      'Corte as berinjelas ao meio e tire a polpa',
      'Refogue carne, cebola e tomate',
      'Recheie as berinjelas',
      'Cubra com queijo',
      'Asse a 180°C por 30 minutos'
    ],
    dicaLivia: 'Substituir arroz por berinjela reduz muito as calorias da refeição!',
    metasNutricionais: ['rica-em-proteinas', 'low-carb'],
    metodosPreparo: ['facil'],
    ingredientesPrincipais: ['gado', 'laticinios'],
    proteinas: 36,
    carboidratos: 20,
    gorduras: 18
  }
];
