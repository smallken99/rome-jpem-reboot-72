
export type RelationType = 'positive' | 'negative' | 'neutral';

export interface FamilyRelation {
  id: string;
  targetName: string;
  targetRole: string;
  type: RelationType;
  description: string;
  tags: string[];
}
