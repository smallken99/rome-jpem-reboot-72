
export type RelationType = 'positive' | 'negative' | 'neutral';

export interface FamilyRelation {
  id: string;
  targetName: string;
  targetRole: string;
  type: RelationType;
  description: string;
  tags: string[];
  strength?: number; // Force de la relation (0-100)
  lastInteraction?: Date; // Date de la dernière interaction
  benefits?: string[]; // Avantages de cette relation
  actions?: RelationAction[]; // Actions disponibles pour cette relation
}

export interface RelationAction {
  id: string;
  name: string;
  description: string;
  cost?: number;
  requirements?: {
    reputation?: number;
    influence?: number;
    gold?: number;
  };
  outcome?: {
    reputation?: number;
    influence?: number;
    relationChange?: number;
  };
}

export interface RelationHistory {
  id: string;
  relationId: string;
  date: Date;
  event: string;
  impact: number; // Négatif ou positif
}

export interface RelationGroup {
  name: string;
  description: string;
  relations: FamilyRelation[];
}

export type RelationFilter = 'all' | 'positive' | 'negative' | 'neutral';
