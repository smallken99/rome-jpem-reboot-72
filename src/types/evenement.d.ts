
export interface Evenement {
  id: string;
  titre: string;
  description: string;
  date: Date;
  endDate?: Date;
  type: string;
  importance: string;
  impact: number;
  tags?: string[];
  acteurs: string[];
  actions?: string[];
  lieu: string;
  nom?: string;
}
