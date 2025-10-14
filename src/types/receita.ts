export type CategoriaRefeicao = 'cafe-da-manha' | 'almoco' | 'jantar' | 'lanche' | 'salada' | 'sopa' | 'doce-saudavel';

export type MetaNutricional = 
  | 'poucas-calorias' 
  | 'rica-em-proteinas' 
  | 'low-carb' 
  | 'sem-acucar' 
  | 'sem-gluten' 
  | 'sem-lactose' 
  | 'vegetariana' 
  | 'vegana'
  | 'pescetariana';

export type MetodoPreparo = 'rapido' | 'poucos-ingredientes' | 'facil';

export type IngredienteDisponivel = 
  | 'peixe' 
  | 'frango' 
  | 'porco' 
  | 'gado' 
  | 'bacon' 
  | 'ovos' 
  | 'laticinios' 
  | 'nozes' 
  | 'espinafre' 
  | 'abacate' 
  | 'batata' 
  | 'arroz' 
  | 'massa' 
  | 'pao' 
  | 'salmao' 
  | 'frutos-do-mar';

export interface Receita {
  id: string;
  nome: string;
  imagem: string;
  categoria: CategoriaRefeicao;
  tempoPreparo: number; // em minutos
  calorias: number;
  ingredientes: string[];
  modoPreparo: string[];
  dicaLivia: string;
  metasNutricionais: MetaNutricional[];
  metodosPreparo: MetodoPreparo[];
  ingredientesPrincipais: IngredienteDisponivel[];
  proteinas: number;
  carboidratos: number;
  gorduras: number;
}

export interface FiltrosReceita {
  categoria?: CategoriaRefeicao;
  metasNutricionais?: MetaNutricional[];
  metodosPreparo?: MetodoPreparo[];
  ingredientesDisponiveis?: IngredienteDisponivel[];
  caloriaMax?: number;
  apenasRavoritos?: boolean;
}
