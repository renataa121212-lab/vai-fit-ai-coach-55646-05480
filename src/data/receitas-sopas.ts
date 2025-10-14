import { Receita } from '@/types/receita';

export const receitasSopas: Receita[] = [
  {
    id: 'sopa-extra-1',
    nome: 'Canja de Galinha Light',
    imagem: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500',
    categoria: 'sopa',
    tempoPreparo: 40,
    calorias: 250,
    ingredientes: ['Peito de frango', 'Arroz integral', 'Cenoura', 'Batata', 'Cebola', 'Alho', 'Salsinha'],
    modoPreparo: [
      'Cozinhe o frango em água',
      'Retire o frango e desfie',
      'No mesmo caldo, adicione os legumes',
      'Acrescente o arroz',
      'Volte o frango e cozinhe por 20 minutos',
      'Finalize com salsinha'
    ],
    dicaLivia: 'Canja é reconfortante e nutritiva! Perfeita para dias frios.',
    metasNutricionais: ['rica-em-proteinas', 'sem-lactose'],
    metodosPreparo: ['facil'],
    ingredientesPrincipais: ['frango', 'arroz', 'batata'],
    proteinas: 28,
    carboidratos: 32,
    gorduras: 4
  },
  {
    id: 'sopa-extra-2',
    nome: 'Creme de Abóbora com Gengibre',
    imagem: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=500',
    categoria: 'sopa',
    tempoPreparo: 35,
    calorias: 180,
    ingredientes: ['Abóbora', 'Gengibre', 'Cebola', 'Alho', 'Caldo de legumes', 'Leite de coco light'],
    modoPreparo: [
      'Refogue cebola, alho e gengibre',
      'Adicione a abóbora em cubos',
      'Acrescente o caldo',
      'Cozinhe até amolecer',
      'Bata no liquidificador com leite de coco'
    ],
    dicaLivia: 'Abóbora é rica em vitamina A! Ótima para a visão e imunidade.',
    metasNutricionais: ['vegana', 'poucas-calorias', 'sem-gluten', 'sem-lactose'],
    metodosPreparo: ['facil'],
    ingredientesPrincipais: [],
    proteinas: 4,
    carboidratos: 35,
    gorduras: 5
  },
  {
    id: 'sopa-extra-3',
    nome: 'Sopa de Lentilha',
    imagem: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500',
    categoria: 'sopa',
    tempoPreparo: 45,
    calorias: 280,
    ingredientes: ['Lentilha', 'Cenoura', 'Batata', 'Bacon (opcional)', 'Cebola', 'Alho', 'Tomate'],
    modoPreparo: [
      'Deixe a lentilha de molho por 2 horas',
      'Refogue bacon, cebola e alho',
      'Adicione tomate, lentilha e legumes',
      'Cubra com água',
      'Cozinhe por 30 minutos'
    ],
    dicaLivia: 'Lentilha é super nutritiva e rica em ferro! Versão sem bacon fica vegana.',
    metasNutricionais: ['rica-em-proteinas', 'vegetariana'],
    metodosPreparo: ['facil'],
    ingredientesPrincipais: ['bacon', 'batata'],
    proteinas: 18,
    carboidratos: 42,
    gorduras: 6
  },
  {
    id: 'sopa-extra-4',
    nome: 'Sopa de Peixe com Legumes',
    imagem: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=500',
    categoria: 'sopa',
    tempoPreparo: 35,
    calorias: 240,
    ingredientes: ['Peixe branco', 'Tomate', 'Batata', 'Cenoura', 'Cebola', 'Alho', 'Coentro'],
    modoPreparo: [
      'Refogue cebola, alho e tomate',
      'Adicione batata e cenoura',
      'Cubra com água e cozinhe',
      'Acrescente o peixe em pedaços',
      'Finalize com coentro'
    ],
    dicaLivia: 'Peixe cozinha rápido! Adicione por último para não desmanchar.',
    metasNutricionais: ['rica-em-proteinas', 'pescetariana', 'poucas-calorias'],
    metodosPreparo: ['facil'],
    ingredientesPrincipais: ['peixe', 'batata'],
    proteinas: 32,
    carboidratos: 24,
    gorduras: 4
  },
  {
    id: 'sopa-extra-5',
    nome: 'Minestrone Italiana',
    imagem: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500',
    categoria: 'sopa',
    tempoPreparo: 40,
    calorias: 220,
    ingredientes: ['Feijão branco', 'Macarrão integral', 'Tomate', 'Abobrinha', 'Cenoura', 'Manjericão'],
    modoPreparo: [
      'Refogue cebola e alho',
      'Adicione tomate e legumes',
      'Acrescente o feijão cozido',
      'Cubra com caldo',
      'Adicione macarrão e cozinhe por 10 minutos'
    ],
    dicaLivia: 'Sopa completa e nutritiva! Rica em fibras e proteínas vegetais.',
    metasNutricionais: ['vegetariana', 'vegana'],
    metodosPreparo: ['facil'],
    ingredientesPrincipais: ['massa'],
    proteinas: 12,
    carboidratos: 38,
    gorduras: 3
  }
];
