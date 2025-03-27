
export interface FamilyAlliance {
  id: string;
  family: string;
  type: 'matrimoniale' | 'politique' | 'commerciale' | 'militaire';
  established: string;
  status: 'active' | 'pending' | 'broken';
  benefits: string[];
  members?: string[];
}

export const familyAlliances: FamilyAlliance[] = [
  {
    id: '1',
    family: 'Valerii',
    type: 'matrimoniale',
    established: 'An 753',
    status: 'active',
    benefits: [
      'Accès aux magistratures inférieures',
      'Soutien dans les votes populaires',
      'Coopération commerciale'
    ]
  },
  {
    id: '2',
    family: 'Aemilii',
    type: 'matrimoniale',
    established: 'An 754',
    status: 'active',
    benefits: [
      'Soutien militaire',
      'Accès aux marchés provinciaux',
      'Protection juridique mutuelle'
    ]
  }
];

export const pendingAlliances: FamilyAlliance[] = [
  {
    id: '3',
    family: 'Cornelii',
    type: 'matrimoniale',
    established: 'An 755 (proposée)',
    status: 'pending',
    benefits: [
      'Influence politique majeure',
      'Accès aux magistratures supérieures',
      'Opportunités commerciales lucratives'
    ]
  }
];
