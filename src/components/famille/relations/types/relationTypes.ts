
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
  properties?: PropertyRelation[]; // Propriétés partagées ou contestées
}

export interface PropertyRelation {
  propertyId: string;
  propertyName: string;
  type: 'shared' | 'disputed' | 'leased' | 'borrowed';
  details: string;
  value?: number;
  startDate?: Date;  // Date du début de la relation (bail, prêt, etc.)
  endDate?: Date;    // Date de fin (pour les baux temporaires)
  terms?: string;    // Termes spécifiques
  incomeShare?: number;  // Part des revenus partagés (en pourcentage)
  maintenanceShare?: number; // Part des frais d'entretien partagés
  history?: PropertyRelationEvent[]; // Historique des événements liés à cette relation de propriété
}

export interface PropertyRelationEvent {
  id: string;
  date: Date;
  type: 'dispute' | 'agreement' | 'payment' | 'transfer' | 'other';
  description: string;
  impact: number; // Impact sur la relation (-100 à +100)
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
    propertyRelationChange?: {
      propertyId: string;
      change: 'improve' | 'degrade' | 'resolve' | 'create_dispute';
    }
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

export interface RelationsContextType {
  relations: FamilyRelation[];
  addRelation: (relation: Omit<FamilyRelation, 'id'>) => string;
  removeRelation: (id: string) => void;
  updateRelation: (id: string, updates: Partial<FamilyRelation>) => void;
  getRelationsByType: () => Record<RelationType | 'all', FamilyRelation[]>;
  getRelationHistory: (relationId: string) => RelationHistory[];
  addPropertyToRelation: (relationId: string, property: Omit<PropertyRelation, 'id'>) => void;
  updatePropertyRelation: (relationId: string, propertyId: string, updates: Partial<PropertyRelation>) => void;
  removePropertyFromRelation: (relationId: string, propertyId: string) => void;
  getRelationsForProperty: (propertyId: string) => FamilyRelation[];
}
