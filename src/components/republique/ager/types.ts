
export interface LandParcel {
  id: string;
  name: string;
  location: string;
  size: number;
  buildingType: 'domaine_cereales' | 'domaine_vignoble' | 'domaine_oliviers' | 'paturage_equides' | 'paturage_bovins' | 'paturage_moutons';
  status: 'available' | 'allocated' | 'disputed' | 'protected';
  value: number;
  allocation?: {
    familyId?: string;
    familyName?: string;
    since?: string;
    until?: string;
  };
  coordinates?: {
    x: number;
    y: number;
  };
  // Nouveaux champs pour la gestion des fonctionnaires et esclaves
  workforce?: {
    magistrates?: number; // Fonctionnaires romains supervisant la parcelle
    overseers?: number; // Contremaîtres
    publicSlaves?: number; // Esclaves publics (servi publici)
    requiredWorkforce?: number; // Main d'œuvre totale nécessaire
    efficiency?: number; // Efficacité de 0 à 100
  };
  production?: {
    type: string; // Type de production (céréales, vin, huile, etc.)
    amount: number; // Quantité produite
    unit: string; // Unité de mesure
    potentialYield?: number; // Rendement potentiel maximal
    lastHarvest?: string; // Dernière récolte
  };
  expenses?: {
    maintenance: number; // Coût d'entretien annuel
    salaries: number; // Salaires des fonctionnaires
    supplies: number; // Fournitures et matériaux
  };
}

export interface AgerPublicusOverseer {
  id: string;
  name: string;
  title: string;
  salary: number;
  experience: number; // 1-10
  specialization: 'agriculture' | 'livestock' | 'forestry' | 'mining' | 'administration';
  assignedParcelId?: string;
  loyalty: number; // 1-10, loyauté envers la République
  skills: {
    management: number; // 1-10
    agriculture: number; // 1-10
    logistics: number; // 1-10
  };
}

export interface PublicWorkforceStatistics {
  totalMagistrates: number;
  totalOverseers: number;
  totalPublicSlaves: number;
  unmanagedParcels: number;
  efficiencyRating: number; // 0-100
  expensesByType: {
    magistrateSalaries: number;
    overseerSalaries: number;
    slaveMaintenance: number;
    supplies: number;
  };
  productivityByRegion: Record<string, number>;
}
