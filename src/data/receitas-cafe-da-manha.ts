import { Receita } from '@/types/receita';

export const receitasCafeDaManha: Receita[] = [
  {
    id: 'cafe-extra-1',
    nome: 'Bowl de Açaí Proteico',
    imagem: '/src/assets/recipes/bowl-acai.jpg',
    categoria: 'cafe-da-manha',
    tempoPreparo: 10,
    calorias: 380,
    ingredientes: ['200g de açaí congelado', '1 scoop de whey protein', '1 banana', 'Granola', 'Frutas vermelhas', 'Mel'],
    modoPreparo: [
      'Bata o açaí com o whey protein e a banana',
      'Coloque em uma tigela',
      'Decore com granola e frutas',
      'Finalize com um fio de mel'
    ],
    dicaLivia: 'Perfeito pós-treino! O açaí com whey vai te dar energia e proteína para recuperação muscular.',
    metasNutricionais: ['rica-em-proteinas'],
    metodosPreparo: ['rapido', 'facil'],
    ingredientesPrincipais: ['nozes'],
    proteinas: 25,
    carboidratos: 52,
    gorduras: 12
  },
  {
    id: 'cafe-extra-2',
    nome: 'Wrap de Ovo com Abacate',
    imagem: 'https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?w=500',
    categoria: 'cafe-da-manha',
    tempoPreparo: 15,
    calorias: 340,
    ingredientes: ['2 ovos', '1/2 abacate', '1 tortilha integral', 'Tomate', 'Rúcula', 'Sal e pimenta'],
    modoPreparo: [
      'Faça ovos mexidos com sal e pimenta',
      'Amasse o abacate',
      'Espalhe o abacate na tortilha',
      'Adicione os ovos, tomate e rúcula',
      'Enrole e sirva'
    ],
    dicaLivia: 'Gordura boa do abacate + proteína dos ovos = combo perfeito para começar o dia!',
    metasNutricionais: ['rica-em-proteinas', 'vegetariana'],
    metodosPreparo: ['rapido', 'facil'],
    ingredientesPrincipais: ['ovos', 'abacate', 'pao'],
    proteinas: 18,
    carboidratos: 28,
    gorduras: 16
  },
  {
    id: 'cafe-extra-3',
    nome: 'Vitamina de Banana com Pasta de Amendoim',
    imagem: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=500',
    categoria: 'cafe-da-manha',
    tempoPreparo: 5,
    calorias: 290,
    ingredientes: ['1 banana', '200ml de leite', '1 colher de pasta de amendoim', 'Canela', 'Gelo'],
    modoPreparo: [
      'Coloque todos os ingredientes no liquidificador',
      'Bata até ficar homogêneo',
      'Sirva gelado'
    ],
    dicaLivia: 'Rápido, prático e nutritivo! Ideal para quem tem pressa mas não quer pular o café.',
    metasNutricionais: ['rica-em-proteinas', 'vegetariana'],
    metodosPreparo: ['rapido', 'poucos-ingredientes', 'facil'],
    ingredientesPrincipais: ['laticinios', 'nozes'],
    proteinas: 12,
    carboidratos: 35,
    gorduras: 11
  },
  {
    id: 'cafe-extra-4',
    nome: 'Crepioca com Queijo e Peito de Peru',
    imagem: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500',
    categoria: 'cafe-da-manha',
    tempoPreparo: 12,
    calorias: 280,
    ingredientes: ['1 ovo', '2 colheres de goma de tapioca', 'Queijo branco', 'Peito de peru', 'Orégano'],
    modoPreparo: [
      'Bata o ovo com a goma de tapioca',
      'Despeje em frigideira antiaderente',
      'Adicione queijo e peito de peru',
      'Dobre ao meio e sirva'
    ],
    dicaLivia: 'Sem glúten e rica em proteína! Perfeita para quem quer variar no café.',
    metasNutricionais: ['sem-gluten', 'rica-em-proteinas'],
    metodosPreparo: ['rapido', 'poucos-ingredientes', 'facil'],
    ingredientesPrincipais: ['ovos', 'laticinios', 'frango'],
    proteinas: 22,
    carboidratos: 25,
    gorduras: 8
  },
  {
    id: 'cafe-extra-5',
    nome: 'Mingau de Aveia com Frutas',
    imagem: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=500',
    categoria: 'cafe-da-manha',
    tempoPreparo: 10,
    calorias: 260,
    ingredientes: ['3 colheres de aveia', '200ml de leite', 'Canela', 'Frutas variadas', 'Mel'],
    modoPreparo: [
      'Aqueça o leite com a aveia',
      'Mexa até engrossar',
      'Adicione canela',
      'Sirva com frutas e mel'
    ],
    dicaLivia: 'Café da manhã quentinho e reconfortante! Rico em fibras para te dar saciedade.',
    metasNutricionais: ['vegetariana'],
    metodosPreparo: ['rapido', 'poucos-ingredientes', 'facil'],
    ingredientesPrincipais: ['laticinios'],
    proteinas: 10,
    carboidratos: 42,
    gorduras: 6
  }
];
