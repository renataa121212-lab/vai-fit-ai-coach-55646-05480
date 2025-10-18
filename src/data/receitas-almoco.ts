import { Receita } from '@/types/receita';

export const receitasAlmoco: Receita[] = [
  {
    id: 'almoco-extra-1',
    nome: 'Moqueca de Peixe Light',
    imagem: '/src/assets/recipes/salmao-grelhado.jpg',
    categoria: 'almoco',
    tempoPreparo: 35,
    calorias: 380,
    ingredientes: ['400g de peixe branco', 'Leite de coco light', 'Tomate', 'Cebola', 'Pimentão', 'Coentro', 'Azeite de dendê light'],
    modoPreparo: [
      'Tempere o peixe com sal, limão e alho',
      'Em uma panela, refogue cebola, tomate e pimentão',
      'Adicione o leite de coco',
      'Coloque o peixe e cozinhe por 15 minutos',
      'Finalize com coentro e dendê'
    ],
    dicaLivia: 'Peixe é rico em ômega 3! Essa moqueca fica deliciosa e super saudável.',
    metasNutricionais: ['rica-em-proteinas', 'pescetariana', 'sem-gluten'],
    metodosPreparo: ['facil'],
    ingredientesPrincipais: ['peixe'],
    proteinas: 42,
    carboidratos: 18,
    gorduras: 14
  },
  {
    id: 'almoco-extra-2',
    nome: 'Bowl Buddha Vegetariano',
    imagem: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500',
    categoria: 'almoco',
    tempoPreparo: 25,
    calorias: 420,
    ingredientes: ['Quinoa', 'Grão de bico', 'Abacate', 'Cenoura ralada', 'Brócolis', 'Tahine', 'Limão'],
    modoPreparo: [
      'Cozinhe a quinoa',
      'Asse o grão de bico temperado',
      'Cozinhe o brócolis no vapor',
      'Monte o bowl com todos os ingredientes',
      'Regue com molho de tahine e limão'
    ],
    dicaLivia: 'Refeição completa em um bowl! Carboidrato, proteína e gordura boa.',
    metasNutricionais: ['vegetariana', 'vegana', 'rica-em-proteinas'],
    metodosPreparo: ['facil'],
    ingredientesPrincipais: ['abacate', 'espinafre'],
    proteinas: 18,
    carboidratos: 52,
    gorduras: 16
  },
  {
    id: 'almoco-extra-3',
    nome: 'Filé de Frango Grelhado com Legumes',
    imagem: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500',
    categoria: 'almoco',
    tempoPreparo: 30,
    calorias: 340,
    ingredientes: ['400g de filé de frango', 'Abobrinha', 'Berinjela', 'Pimentão', 'Alho', 'Azeite', 'Ervas'],
    modoPreparo: [
      'Tempere o frango com alho, sal e ervas',
      'Grelhe o frango por 7 minutos de cada lado',
      'Corte os legumes em tiras',
      'Grelhe os legumes com azeite',
      'Sirva tudo junto'
    ],
    dicaLivia: 'Clássico que funciona! Proteína magra + legumes = combinação perfeita.',
    metasNutricionais: ['rica-em-proteinas', 'poucas-calorias', 'low-carb', 'sem-gluten'],
    metodosPreparo: ['facil'],
    ingredientesPrincipais: ['frango'],
    proteinas: 48,
    carboidratos: 12,
    gorduras: 8
  },
  {
    id: 'almoco-extra-4',
    nome: 'Risoto de Camarão Light',
    imagem: 'https://images.unsplash.com/photo-1633504581786-316c8002b1b2?w=500',
    categoria: 'almoco',
    tempoPreparo: 40,
    calorias: 450,
    ingredientes: ['Arroz arbóreo', '300g de camarão', 'Caldo de legumes', 'Vinho branco', 'Cebola', 'Alho', 'Parmesão light'],
    modoPreparo: [
      'Refogue a cebola e o alho',
      'Adicione o arroz e torre por 2 minutos',
      'Acrescente o vinho e deixe evaporar',
      'Vá adicionando o caldo aos poucos',
      'Adicione o camarão e finalize com parmesão'
    ],
    dicaLivia: 'Risoto pode ser saudável, sim! Use caldo caseiro e parmesão light.',
    metasNutricionais: ['rica-em-proteinas', 'pescetariana'],
    metodosPreparo: [],
    ingredientesPrincipais: ['frutos-do-mar', 'arroz'],
    proteinas: 32,
    carboidratos: 58,
    gorduras: 10
  },
  {
    id: 'almoco-extra-5',
    nome: 'Carne Moída com Abobrinha e Quinoa',
    imagem: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500',
    categoria: 'almoco',
    tempoPreparo: 30,
    calorias: 420,
    ingredientes: ['300g de carne moída magra', 'Abobrinha', 'Quinoa', 'Tomate', 'Cebola', 'Alho'],
    modoPreparo: [
      'Cozinhe a quinoa',
      'Refogue a cebola e o alho',
      'Adicione a carne moída',
      'Acrescente tomate e abobrinha ralada',
      'Sirva com a quinoa'
    ],
    dicaLivia: 'Substituir arroz por quinoa aumenta a quantidade de proteína da refeição!',
    metasNutricionais: ['rica-em-proteinas', 'sem-lactose'],
    metodosPreparo: ['facil'],
    ingredientesPrincipais: ['gado'],
    proteinas: 38,
    carboidratos: 42,
    gorduras: 12
  }
];
