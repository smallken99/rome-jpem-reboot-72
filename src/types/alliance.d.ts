
export type AllianceType = 'matrimoniale' | 'politique' | 'militaire';
export type AllianceStatus = 'active' | 'pending' | 'broken';

export interface Alliance {
  id: string;
  name: string;
  type: AllianceType;
  established: string;
  status: AllianceStatus;
  benefits: string[];
  members?: string[];
}
