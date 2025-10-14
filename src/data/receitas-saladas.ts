import { Receita } from '@/types/receita';

export const receitasSaladas: Receita[] = [
  {
    id: 'salada-extra-1',
    nome: 'Salada Caprese com Burrata',
    imagem: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500',
    categoria: 'salada',
    tempoPreparo: 10,
    calorias: 320,
    ingredientes: ['Burrata', 'Tomate italiano', 'Manjericão fresco', 'Azeite extravirgem', 'Vinagre balsâmico', 'Sal'],
    modoPreparo: [
      'Fatie os tomates',
      'Disponha em um prato',
      'Coloque a burrata no centro',
      'Decore com manjericão',
      'Regue com azeite e vinagre'
    ],
    dicaLivia: 'Simples e sofisticada! Perfeita para um almoço leve.',
    metasNutricionais: ['vegetariana', 'low-carb'],
    metodosPreparo: ['rapido', 'poucos-ingredientes', 'facil'],
    ingredientesPrincipais: ['laticinios'],
    proteinas: 18,
    carboidratos: 8,
    gorduras: 24
  },
  {
    id: 'salada-extra-2',
    nome: 'Salada de Quinoa com Legumes Grelhados',
    imagem: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500',
    categoria: 'salada',
    tempoPreparo: 25,
    calorias: 280,
    ingredientes: ['Quinoa', 'Abobrinha', 'Berinjela', 'Pimentão', 'Tomate cereja', 'Limão', 'Azeite'],
    modoPreparo: [
      'Cozinhe a quinoa',
      'Grelhe os legumes fatiados',
      'Misture tudo',
      'Tempere com limão, azeite e sal',
      'Sirva morna ou fria'
    ],
    dicaLivia: 'Quinoa é proteína completa! Perfeita para vegetarianos.',
    metasNutricionais: ['vegetariana', 'vegana', 'rica-em-proteinas'],
    metodosPreparo: ['facil'],
    ingredientesPrincipais: [],
    proteinas: 12,
    carboidratos: 42,
    gorduras: 8
  },
  {
    id: 'salada-extra-3',
    nome: 'Salada Caesar com Frango Grelhado',
    imagem: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500',
    categoria: 'salada',
    tempoPreparo: 20,
    calorias: 380,
    ingredientes: ['Alface romana', 'Frango grelhado', 'Parmesão', 'Croutons integrais', 'Molho caesar light'],
    modoPreparo: [
      'Rasgue a alface',
      'Grelhe e fatie o frango',
      'Monte a salada',
      'Adicione parmesão e croutons',
      'Regue com molho'
    ],
    dicaLivia: 'Use molho caesar caseiro com iogurte grego para versão mais saudável!',
    metasNutricionais: ['rica-em-proteinas'],
    metodosPreparo: ['rapido', 'facil'],
    ingredientesPrincipais: ['frango', 'laticinios', 'pao'],
    proteinas: 38,
    carboidratos: 22,
    gorduras: 16
  },
  {
    id: 'salada-extra-4',
    nome: 'Salada Mediterrânea',
    imagem: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500',
    categoria: 'salada',
    tempoPreparo: 15,
    calorias: 240,
    ingredientes: ['Tomate', 'Pepino', 'Azeitona preta', 'Queijo feta', 'Cebola roxa', 'Azeite', 'Orégano'],
    modoPreparo: [
      'Corte tomate e pepino em cubos',
      'Fatie a cebola fininha',
      'Misture com azeitonas',
      'Adicione queijo feta',
      'Tempere com azeite e orégano'
    ],
    dicaLivia: 'Gorduras boas das azeitonas! Sabor incrível e super saudável.',
    metasNutricionais: ['vegetariana', 'low-carb'],
    metodosPreparo: ['rapido', 'poucos-ingredientes', 'facil'],
    ingredientesPrincipais: ['laticinios'],
    proteinas: 12,
    carboidratos: 16,
    gorduras: 14
  },
  {
    id: 'salada-extra-5',
    nome: 'Salada de Salmão com Abacate',
    imagem: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500',
    categoria: 'salada',
    tempoPreparo: 20,
    calorias: 420,
    ingredientes: ['Salmão grelhado', 'Abacate', 'Mix de folhas', 'Manga', 'Nozes', 'Molho de mostarda e mel'],
    modoPreparo: [
      'Grelhe o salmão',
      'Monte base com folhas',
      'Adicione abacate e manga em cubos',
      'Coloque o salmão por cima',
      'Finalize com nozes e molho'
    ],
    dicaLivia: 'Combinação perfeita de ômega 3 e gorduras boas! Refeição completa.',
    metasNutricionais: ['rica-em-proteinas', 'pescetariana'],
    metodosPreparo: ['facil'],
    ingredientesPrincipais: ['salmao', 'abacate', 'nozes'],
    proteinas: 36,
    carboidratos: 24,
    gorduras: 24
  }
];
