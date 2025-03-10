
export interface Loi {
  id: string;
  titre: string;
  description: string;
  proposeur: string;
  catégorie: 'Agraire' | 'Politique' | 'Militaire' | 'Economique' | 'Sociale' | 'Religieuse';
  date: {
    year: number;
    season: string;
  };
  état: 'Public' | 'Privé' | 'En délibération';
  importance: string;
  votesPositifs: number;
  votesNégatifs: number;
  votesAbstention: number;
  effets: Record<string, any>;
}
