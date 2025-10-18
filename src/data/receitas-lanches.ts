import { Receita } from '@/types/receita';

export const receitasLanches: Receita[] = [
  {
    id: 'lanche-extra-1',
    nome: 'Pasta de Atum com Cenoura',
    imagem: '/src/assets/recipes/iogurte-grego-frutas.jpg',
    categoria: 'lanche',
    tempoPreparo: 10,
    calorias: 180,
    ingredientes: ['1 lata de atum', 'Cenoura ralada', 'Iogurte natural', 'Salsinha', 'Limão'],
    modoPreparo: [
      'Escorra o atum',
      'Misture com cenoura, iogurte e salsinha',
      'Tempere com limão e sal',
      'Sirva com palitos de cenoura ou torradas'
    ],
    dicaLivia: 'Lanche super proteico! Perfeito para levar em qualquer lugar.',
    metasNutricionais: ['rica-em-proteinas', 'poucas-calorias', 'pescetariana'],
    metodosPreparo: ['rapido', 'poucos-ingredientes', 'facil'],
    ingredientesPrincipais: ['peixe', 'laticinios'],
    proteinas: 28,
    carboidratos: 6,
    gorduras: 5
  },
  {
    id: 'lanche-extra-2',
    nome: 'Rolinhos de Peito de Peru com Cream Cheese',
    imagem: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500',
    categoria: 'lanche',
    tempoPreparo: 5,
    calorias: 150,
    ingredientes: ['8 fatias de peito de peru', 'Cream cheese light', 'Cebolinha', 'Tomate seco'],
    modoPreparo: [
      'Espalhe cream cheese nas fatias',
      'Adicione cebolinha e tomate seco',
      'Enrole as fatias',
      'Prenda com palito se necessário'
    ],
    dicaLivia: 'Praticidade máxima! Prepare vários e leve na bolsa.',
    metasNutricionais: ['rica-em-proteinas', 'poucas-calorias', 'low-carb'],
    metodosPreparo: ['rapido', 'poucos-ingredientes', 'facil'],
    ingredientesPrincipais: ['frango', 'laticinios'],
    proteinas: 22,
    carboidratos: 4,
    gorduras: 6
  },
  {
    id: 'lanche-extra-3',
    nome: 'Smoothie Verde Detox',
    imagem: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=500',
    categoria: 'lanche',
    tempoPreparo: 5,
    calorias: 160,
    ingredientes: ['1 maçã verde', 'Espinafre', 'Pepino', 'Gengibre', 'Limão', 'Água de coco'],
    modoPreparo: [
      'Coloque todos os ingredientes no liquidificador',
      'Bata até ficar homogêneo',
      'Sirva gelado'
    ],
    dicaLivia: 'Hidratante e refrescante! Rico em vitaminas e minerais.',
    metasNutricionais: ['poucas-calorias', 'vegana', 'sem-gluten', 'sem-lactose'],
    metodosPreparo: ['rapido', 'poucos-ingredientes', 'facil'],
    ingredientesPrincipais: ['espinafre'],
    proteinas: 3,
    carboidratos: 32,
    gorduras: 1
  },
  {
    id: 'lanche-extra-4',
    nome: 'Guacamole com Chips de Batata Doce',
    imagem: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=500',
    categoria: 'lanche',
    tempoPreparo: 25,
    calorias: 220,
    ingredientes: ['2 abacates', 'Tomate', 'Cebola roxa', 'Limão', '1 batata doce', 'Azeite', 'Sal'],
    modoPreparo: [
      'Amasse o abacate',
      'Adicione tomate, cebola e limão',
      'Fatie a batata doce fininha',
      'Asse as fatias com azeite a 180°C por 20 minutos',
      'Sirva o guacamole com os chips'
    ],
    dicaLivia: 'Gordura boa + carboidrato inteligente! Lanche completo e saboroso.',
    metasNutricionais: ['vegana', 'sem-gluten', 'sem-lactose'],
    metodosPreparo: ['facil'],
    ingredientesPrincipais: ['abacate', 'batata'],
    proteinas: 4,
    carboidratos: 28,
    gorduras: 16
  },
  {
    id: 'lanche-extra-5',
    nome: 'Queijo Cottage com Nozes e Mel',
    imagem: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=500',
    categoria: 'lanche',
    tempoPreparo: 5,
    calorias: 200,
    ingredientes: ['1 pote de queijo cottage', 'Nozes picadas', 'Mel', 'Canela'],
    modoPreparo: [
      'Coloque o queijo em um pote',
      'Adicione as nozes',
      'Regue com mel',
      'Polvilhe canela'
    ],
    dicaLivia: 'Lanche doce e proteico! Perfeito para aquela vontade de comer algo gostoso.',
    metasNutricionais: ['rica-em-proteinas', 'vegetariana'],
    metodosPreparo: ['rapido', 'poucos-ingredientes', 'facil'],
    ingredientesPrincipais: ['laticinios', 'nozes'],
    proteinas: 18,
    carboidratos: 16,
    gorduras: 10
  }
];
