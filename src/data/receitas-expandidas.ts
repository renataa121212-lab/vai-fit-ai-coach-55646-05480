import { Receita } from '@/types/receita';

// Receitas adicionais para expandir o banco de dados
export const receitasExpandidas: Receita[] = [
  // CAFÉ DA MANHÃ - Receitas 11-50
  {
    id: 'cafe-11',
    nome: 'Bowl de Açaí Fitness',
    imagem: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=500',
    categoria: 'cafe-da-manha',
    tempoPreparo: 10,
    calorias: 350,
    ingredientes: ['Polpa de açaí', 'Banana congelada', 'Granola', 'Frutas vermelhas', 'Mel'],
    modoPreparo: [
      'Bata o açaí com banana congelada',
      'Despeje em uma tigela',
      'Decore com granola e frutas',
      'Finalize com mel'
    ],
    dicaLivia: 'Antioxidantes poderosos! Perfeito para o pós-treino.',
    metasNutricionais: ['vegetariana', 'rica-em-proteinas'],
    metodosPreparo: ['rapido', 'facil'],
    ingredientesPrincipais: ['nozes'],
    proteinas: 8,
    carboidratos: 58,
    gorduras: 12
  },
  {
    id: 'cafe-12',
    nome: 'Torrada Integral com Abacate',
    imagem: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=500',
    categoria: 'cafe-da-manha',
    tempoPreparo: 5,
    calorias: 290,
    ingredientes: ['2 fatias de pão integral', '1 abacate', 'Ovo poché', 'Sal rosa', 'Pimenta'],
    modoPreparo: [
      'Torrar o pão integral',
      'Amassar o abacate com sal e pimenta',
      'Espalhar sobre as torradas',
      'Adicionar ovo poché por cima'
    ],
    dicaLivia: 'Gorduras boas para começar o dia! Abacate é fonte de energia sustentada.',
    metasNutricionais: ['vegetariana', 'rica-em-proteinas'],
    metodosPreparo: ['rapido', 'facil'],
    ingredientesPrincipais: ['abacate', 'ovos', 'pao'],
    proteinas: 14,
    carboidratos: 28,
    gorduras: 16
  },
  {
    id: 'cafe-13',
    nome: 'Smoothie de Manga e Coco',
    imagem: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=500',
    categoria: 'cafe-da-manha',
    tempoPreparo: 5,
    calorias: 220,
    ingredientes: ['Manga congelada', 'Leite de coco', 'Chia', 'Mel', 'Gelo'],
    modoPreparo: [
      'Adicionar todos ingredientes no liquidificador',
      'Bater até ficar cremoso',
      'Servir gelado'
    ],
    dicaLivia: 'Tropical e refrescante! Rico em vitamina C.',
    metasNutricionais: ['vegana', 'sem-lactose', 'sem-gluten'],
    metodosPreparo: ['rapido', 'poucos-ingredientes', 'facil'],
    ingredientesPrincipais: [],
    proteinas: 4,
    carboidratos: 42,
    gorduras: 6
  },
  {
    id: 'cafe-15',
    nome: 'Mingau de Aveia com Frutas',
    imagem: 'https://images.unsplash.com/photo-1593560704563-f176a2eb61db?w=500',
    categoria: 'cafe-da-manha',
    tempoPreparo: 10,
    calorias: 280,
    ingredientes: ['Aveia', 'Leite de amêndoas', 'Canela', 'Banana', 'Nozes'],
    modoPreparo: [
      'Cozinhar aveia com leite',
      'Adicionar canela',
      'Servir com banana fatiada',
      'Finalizar com nozes'
    ],
    dicaLivia: 'Quentinho e aconchegante! Fibras que mantêm você saciada.',
    metasNutricionais: ['vegetariana', 'sem-lactose'],
    metodosPreparo: ['rapido', 'facil'],
    ingredientesPrincipais: ['nozes'],
    proteinas: 10,
    carboidratos: 44,
    gorduras: 8
  },
  {
    id: 'cafe-16',
    nome: 'Wrap de Ovo Mexicano',
    imagem: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500',
    categoria: 'cafe-da-manha',
    tempoPreparo: 15,
    calorias: 340,
    ingredientes: ['Tortilha integral', 'Ovos mexidos', 'Feijão preto', 'Abacate', 'Salsa'],
    modoPreparo: [
      'Aquecer tortilha',
      'Preparar ovos mexidos',
      'Adicionar feijão aquecido',
      'Cobrir com abacate e salsa',
      'Enrolar'
    ],
    dicaLivia: 'Energia latina! Combinação perfeita de proteína e carboidratos.',
    metasNutricionais: ['vegetariana', 'rica-em-proteinas'],
    metodosPreparo: ['facil'],
    ingredientesPrincipais: ['ovos', 'abacate', 'pao'],
    proteinas: 18,
    carboidratos: 36,
    gorduras: 14
  },
  {
    id: 'cafe-17',
    nome: 'Pudim de Chia com Frutas',
    imagem: 'https://images.unsplash.com/photo-1511688878353-3a2f5be94cd7?w=500',
    categoria: 'cafe-da-manha',
    tempoPreparo: 5,
    calorias: 250,
    ingredientes: ['3 col chia', 'Leite vegetal', 'Mel', 'Frutas variadas', 'Coco ralado'],
    modoPreparo: [
      'Misturar chia com leite',
      'Deixar na geladeira por 4 horas',
      'Servir com frutas',
      'Polvilhar coco'
    ],
    dicaLivia: 'Prepara de véspera! Rico em ômega-3 e fibras.',
    metasNutricionais: ['vegana', 'sem-lactose', 'sem-gluten'],
    metodosPreparo: ['poucos-ingredientes', 'facil'],
    ingredientesPrincipais: [],
    proteinas: 8,
    carboidratos: 32,
    gorduras: 12
  },
  {
    id: 'cafe-18',
    nome: 'Sanduíche Natural Light',
    imagem: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500',
    categoria: 'cafe-da-manha',
    tempoPreparo: 10,
    calorias: 300,
    ingredientes: ['Pão integral', 'Frango desfiado', 'Cottage', 'Alface', 'Cenoura ralada'],
    modoPreparo: [
      'Misturar frango com cottage',
      'Montar sanduíche com verduras',
      'Cortar ao meio'
    ],
    dicaLivia: 'Prático para levar! Proteína magra e muitas fibras.',
    metasNutricionais: ['rica-em-proteinas', 'poucas-calorias'],
    metodosPreparo: ['rapido', 'facil'],
    ingredientesPrincipais: ['frango', 'pao', 'laticinios'],
    proteinas: 24,
    carboidratos: 32,
    gorduras: 6
  },
  {
    id: 'cafe-19',
    nome: 'Waffles de Aveia Proteicos',
    imagem: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=500',
    categoria: 'cafe-da-manha',
    tempoPreparo: 15,
    calorias: 330,
    ingredientes: ['Aveia', 'Whey protein', 'Ovos', 'Fermento', 'Frutas vermelhas'],
    modoPreparo: [
      'Bater todos ingredientes',
      'Despejar na máquina de waffle',
      'Assar por 5 minutos',
      'Servir com frutas'
    ],
    dicaLivia: 'Versão fitness do clássico! Alto teor proteico.',
    metasNutricionais: ['rica-em-proteinas', 'vegetariana'],
    metodosPreparo: ['facil'],
    ingredientesPrincipais: ['ovos'],
    proteinas: 28,
    carboidratos: 38,
    gorduras: 8
  },
  {
    id: 'cafe-20',
    nome: 'Overnight Oats Chocolate',
    imagem: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=500',
    categoria: 'cafe-da-manha',
    tempoPreparo: 5,
    calorias: 310,
    ingredientes: ['Aveia', 'Leite', 'Cacau em pó', 'Banana', 'Pasta de amendoim'],
    modoPreparo: [
      'Misturar aveia, leite e cacau',
      'Refrigerar overnight',
      'Servir com banana',
      'Adicionar pasta de amendoim'
    ],
    dicaLivia: 'Prepara de véspera e acorda feliz! Sabor de sobremesa.',
    metasNutricionais: ['vegetariana'],
    metodosPreparo: ['poucos-ingredientes', 'facil'],
    ingredientesPrincipais: ['laticinios', 'nozes'],
    proteinas: 14,
    carboidratos: 42,
    gorduras: 10
  },

  // Continuando com mais receitas de café da manhã (21-50)
  {
    id: 'cafe-21',
    nome: 'Smoothie Bowl Verde',
    imagem: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=500',
    categoria: 'cafe-da-manha',
    tempoPreparo: 8,
    calorias: 270,
    ingredientes: ['Espinafre', 'Abacaxi', 'Banana', 'Kiwi', 'Chia'],
    modoPreparo: [
      'Bater frutas com espinafre',
      'Despejar em tigela',
      'Decorar com frutas fatiadas',
      'Polvilhar chia'
    ],
    dicaLivia: 'Verde mas delicioso! Cheio de vitaminas.',
    metasNutricionais: ['vegana', 'sem-lactose', 'sem-gluten'],
    metodosPreparo: ['rapido', 'facil'],
    ingredientesPrincipais: ['espinafre'],
    proteinas: 6,
    carboidratos: 48,
    gorduras: 4
  },

  // ALMOÇO - Receitas 31-70
  {
    id: 'almoco-31',
    nome: 'Bowl de Quinoa e Legumes',
    imagem: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500',
    categoria: 'almoco',
    tempoPreparo: 25,
    calorias: 380,
    ingredientes: ['Quinoa', 'Brócolis', 'Cenoura', 'Grão-de-bico', 'Tahine'],
    modoPreparo: [
      'Cozinhar quinoa',
      'Refogar legumes',
      'Adicionar grão-de-bico',
      'Montar bowl',
      'Regar com tahine'
    ],
    dicaLivia: 'Proteína vegetal completa! Quinoa é superfood.',
    metasNutricionais: ['vegana', 'rica-em-proteinas', 'sem-gluten'],
    metodosPreparo: ['facil'],
    ingredientesPrincipais: [],
    proteinas: 16,
    carboidratos: 52,
    gorduras: 12
  },
  {
    id: 'almoco-32',
    nome: 'Wrap de Frango Grelhado',
    imagem: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500',
    categoria: 'almoco',
    tempoPreparo: 20,
    calorias: 420,
    ingredientes: ['Tortilha integral', 'Peito de frango', 'Alface', 'Tomate', 'Iogurte grego'],
    modoPreparo: [
      'Grelhar frango temperado',
      'Aquecer tortilha',
      'Adicionar vegetais',
      'Cobrir com iogurte',
      'Enrolar'
    ],
    dicaLivia: 'Prático e completo! Leve para o trabalho.',
    metasNutricionais: ['rica-em-proteinas', 'poucas-calorias'],
    metodosPreparo: ['rapido', 'facil'],
    ingredientesPrincipais: ['frango', 'pao', 'laticinios'],
    proteinas: 32,
    carboidratos: 38,
    gorduras: 12
  },
  {
    id: 'almoco-33',
    nome: 'Escondidinho de Frango',
    imagem: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=500',
    categoria: 'almoco',
    tempoPreparo: 40,
    calorias: 450,
    ingredientes: ['Frango desfiado', 'Purê de batata-doce', 'Queijo light', 'Cebolinha'],
    modoPreparo: [
      'Preparar frango desfiado temperado',
      'Fazer purê de batata-doce',
      'Montar camadas em refratário',
      'Cobrir com queijo',
      'Gratinar'
    ],
    dicaLivia: 'Comfort food saudável! Batata-doce tem baixo índice glicêmico.',
    metasNutricionais: ['rica-em-proteinas', 'sem-gluten'],
    metodosPreparo: ['facil'],
    ingredientesPrincipais: ['frango', 'batata', 'laticinios'],
    proteinas: 36,
    carboidratos: 42,
    gorduras: 14
  },
  {
    id: 'almoco-34',
    nome: 'Poke Bowl de Salmão',
    imagem: 'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?w=500',
    categoria: 'almoco',
    tempoPreparo: 15,
    calorias: 480,
    ingredientes: ['Salmão', 'Arroz integral', 'Abacate', 'Edamame', 'Molho ponzu'],
    modoPreparo: [
      'Cozinhar arroz integral',
      'Cortar salmão em cubos',
      'Preparar vegetais',
      'Montar bowl',
      'Regar com molho'
    ],
    dicaLivia: 'Ômega-3 direto do Havaí! Salmão é ouro para sua saúde.',
    metasNutricionais: ['rica-em-proteinas', 'pescetariana', 'sem-lactose'],
    metodosPreparo: ['rapido', 'facil'],
    ingredientesPrincipais: ['salmao', 'arroz', 'abacate'],
    proteinas: 32,
    carboidratos: 48,
    gorduras: 18
  },
  {
    id: 'almoco-35',
    nome: 'Strogonoff de Carne Magra',
    imagem: 'https://images.unsplash.com/photo-1565299543923-37dd37887442?w=500',
    categoria: 'almoco',
    tempoPreparo: 30,
    calorias: 520,
    ingredientes: ['Patinho', 'Cogumelos', 'Creme de leite light', 'Mostarda', 'Arroz integral'],
    modoPreparo: [
      'Refogar carne em tiras',
      'Adicionar cogumelos',
      'Incorporar creme e mostarda',
      'Cozinhar por 15 min',
      'Servir com arroz'
    ],
    dicaLivia: 'Clássico reinventado! Versão mais leve e saudável.',
    metasNutricionais: ['rica-em-proteinas'],
    metodosPreparo: ['facil'],
    ingredientesPrincipais: ['gado', 'arroz', 'laticinios'],
    proteinas: 42,
    carboidratos: 44,
    gorduras: 18
  },

  // JANTAR - Receitas 41-80
  {
    id: 'jantar-41',
    nome: 'Omelete de Forno Recheada',
    imagem: 'https://images.unsplash.com/photo-1612240498427-8c3f10c729c8?w=500',
    categoria: 'jantar',
    tempoPreparo: 25,
    calorias: 310,
    ingredientes: ['6 ovos', 'Espinafre', 'Tomate seco', 'Queijo feta', 'Orégano'],
    modoPreparo: [
      'Bater ovos com temperos',
      'Adicionar recheio picado',
      'Despejar em forma untada',
      'Assar por 20 minutos a 180°C'
    ],
    dicaLivia: 'Jantar leve e proteico! Perfeito para noite.',
    metasNutricionais: ['rica-em-proteinas', 'poucas-calorias', 'sem-gluten'],
    metodosPreparo: ['facil'],
    ingredientesPrincipais: ['ovos', 'espinafre', 'laticinios'],
    proteinas: 28,
    carboidratos: 8,
    gorduras: 18
  },
  {
    id: 'jantar-42',
    nome: 'Sopa Detox Verde',
    imagem: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500',
    categoria: 'jantar',
    tempoPreparo: 20,
    calorias: 180,
    ingredientes: ['Couve', 'Abobrinha', 'Espinafre', 'Alho-poró', 'Gengibre'],
    modoPreparo: [
      'Refogar alho-poró',
      'Adicionar todos vegetais',
      'Cobrir com água',
      'Cozinhar por 15 min',
      'Bater no liquidificador'
    ],
    dicaLivia: 'Leve e desintoxicante! Ideal para reset noturno.',
    metasNutricionais: ['vegana', 'poucas-calorias', 'sem-gluten', 'sem-lactose'],
    metodosPreparo: ['rapido', 'facil'],
    ingredientesPrincipais: ['espinafre'],
    proteinas: 6,
    carboidratos: 28,
    gorduras: 2
  },

  // LANCHES - Receitas 21-60
  {
    id: 'lanche-21',
    nome: 'Energy Balls de Tâmara',
    imagem: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=500',
    categoria: 'lanche',
    tempoPreparo: 10,
    calorias: 180,
    ingredientes: ['Tâmaras', 'Castanhas', 'Cacau', 'Coco ralado'],
    modoPreparo: [
      'Processar tâmaras e castanhas',
      'Adicionar cacau',
      'Formar bolinhas',
      'Rolar no coco'
    ],
    dicaLivia: 'Energia instantânea! Perfeito pré ou pós-treino.',
    metasNutricionais: ['vegana', 'sem-gluten', 'sem-lactose'],
    metodosPreparo: ['rapido', 'poucos-ingredientes', 'facil'],
    ingredientesPrincipais: ['nozes'],
    proteinas: 4,
    carboidratos: 28,
    gorduras: 8
  },
  {
    id: 'lanche-22',
    nome: 'Queijo Cottage com Mel e Nozes',
    imagem: 'https://images.unsplash.com/photo-1628176723292-0c2e9d68f0f3?w=500',
    categoria: 'lanche',
    tempoPreparo: 3,
    calorias: 220,
    ingredientes: ['Cottage', 'Mel', 'Mix de nozes', 'Canela'],
    modoPreparo: [
      'Colocar cottage em tigela',
      'Regar com mel',
      'Adicionar nozes',
      'Polvilhar canela'
    ],
    dicaLivia: 'Doce e proteico! Equilíbrio perfeito.',
    metasNutricionais: ['vegetariana', 'rica-em-proteinas'],
    metodosPreparo: ['rapido', 'poucos-ingredientes', 'facil'],
    ingredientesPrincipais: ['laticinios', 'nozes'],
    proteinas: 18,
    carboidratos: 22,
    gorduras: 10
  },

  // SALADAS - Receitas 16-55
  {
    id: 'salada-16',
    nome: 'Salada Grega Autêntica',
    imagem: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500',
    categoria: 'salada',
    tempoPreparo: 10,
    calorias: 280,
    ingredientes: ['Tomate', 'Pepino', 'Cebola roxa', 'Queijo feta', 'Azeitonas', 'Orégano'],
    modoPreparo: [
      'Cortar vegetais em cubos',
      'Adicionar azeitonas',
      'Cobrir com queijo feta',
      'Temperar com azeite e orégano'
    ],
    dicaLivia: 'Mediterrânea e refrescante! Gorduras boas do azeite.',
    metasNutricionais: ['vegetariana', 'sem-gluten', 'low-carb'],
    metodosPreparo: ['rapido', 'poucos-ingredientes', 'facil'],
    ingredientesPrincipais: ['laticinios'],
    proteinas: 12,
    carboidratos: 18,
    gorduras: 18
  },
  {
    id: 'salada-17',
    nome: 'Buddha Bowl Completo',
    imagem: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500',
    categoria: 'salada',
    tempoPreparo: 20,
    calorias: 420,
    ingredientes: ['Grão-de-bico', 'Batata-doce', 'Couve', 'Abacate', 'Tahine'],
    modoPreparo: [
      'Assar batata-doce e grão-de-bico',
      'Refogar couve',
      'Montar bowl',
      'Adicionar abacate',
      'Regar com tahine'
    ],
    dicaLivia: 'Refeição completa em uma tigela! Todos nutrientes.',
    metasNutricionais: ['vegana', 'rica-em-proteinas', 'sem-gluten'],
    metodosPreparo: ['facil'],
    ingredientesPrincipais: ['batata', 'abacate', 'espinafre'],
    proteinas: 16,
    carboidratos: 58,
    gorduras: 16
  },

  // SOPAS - Receitas 11-50
  {
    id: 'sopa-11',
    nome: 'Caldo Verde Tradicional',
    imagem: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500',
    categoria: 'sopa',
    tempoPreparo: 30,
    calorias: 280,
    ingredientes: ['Batata', 'Couve', 'Linguiça calabresa', 'Alho', 'Cebola'],
    modoPreparo: [
      'Cozinhar batatas',
      'Bater até virar creme',
      'Adicionar couve fatiada',
      'Refogar linguiça',
      'Servir quente'
    ],
    dicaLivia: 'Clássico português! Aconchego em forma de sopa.',
    metasNutricionais: ['sem-gluten'],
    metodosPreparo: ['facil'],
    ingredientesPrincipais: ['batata', 'espinafre', 'porco'],
    proteinas: 14,
    carboidratos: 32,
    gorduras: 12
  },
  {
    id: 'sopa-12',
    nome: 'Creme de Aspargos',
    imagem: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500',
    categoria: 'sopa',
    tempoPreparo: 25,
    calorias: 190,
    ingredientes: ['Aspargos', 'Batata', 'Cebola', 'Creme de leite light', 'Caldo de legumes'],
    modoPreparo: [
      'Refogar cebola',
      'Adicionar aspargos e batata',
      'Cozinhar em caldo',
      'Bater no liquidificador',
      'Adicionar creme'
    ],
    dicaLivia: 'Sofisticada e nutritiva! Aspargo é diurético natural.',
    metasNutricionais: ['vegetariana', 'poucas-calorias', 'sem-gluten'],
    metodosPreparo: ['facil'],
    ingredientesPrincipais: ['batata', 'laticinios'],
    proteinas: 8,
    carboidratos: 24,
    gorduras: 6
  }
];
