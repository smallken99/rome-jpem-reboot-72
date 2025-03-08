
import { PublicBuilding, ConstructionProject } from '../types/buildingTypes';

// Liste des bâtiments publics existants
export const mockPublicBuildings: PublicBuilding[] = [
  {
    id: 'forum-romanum',
    buildingTypeId: 'forum',
    name: 'Forum Romanum',
    location: 'Centre de Rome',
    constructionYear: 450,
    condition: 85,
    maintenanceCost: 50000,
    maintenanceLevel: 'standard',
    lastMaintenance: 703,
    benefits: [
      'Centre de la vie politique romaine',
      'Augmente le prestige de la cité de 15%',
      'Facilite le commerce et les échanges'
    ],
    capacity: 10000,
    investmentAmount: 1500000,
    constructionStatus: 'completed'
  },
  {
    id: 'basilica-aemilia',
    buildingTypeId: 'basilica',
    name: 'Basilica Aemilia',
    location: 'Forum Romanum',
    constructionYear: 580,
    condition: 90,
    maintenanceCost: 30000,
    maintenanceLevel: 'excellent',
    lastMaintenance: 704,
    benefits: [
      'Tribunal et centre administratif',
      'Augmente l\'efficacité judiciaire de 10%',
      'Améliore la perception des impôts de 5%'
    ],
    investmentAmount: 800000,
    constructionStatus: 'completed'
  },
  {
    id: 'temple-jupiter',
    buildingTypeId: 'temple',
    name: 'Temple de Jupiter Optimus Maximus',
    location: 'Capitole',
    constructionYear: 509,
    condition: 78,
    maintenanceCost: 35000,
    maintenanceLevel: 'standard',
    lastMaintenance: 700,
    benefits: [
      'Centre religieux principal de Rome',
      'Augmente la piété des citoyens de 15%',
      'Améliore les relations avec les dieux'
    ],
    investmentAmount: 1200000,
    constructionStatus: 'completed'
  }
];

// Projets de construction en cours ou planifiés
export const mockConstructionProjects: ConstructionProject[] = [
  {
    id: 'project-circus-flaminius',
    buildingTypeId: 'circus',
    name: 'Circus Flaminius',
    location: 'Champ de Mars',
    estimatedCost: 600000,
    duration: 3,
    progress: 65,
    startedYear: 702,
    expectedCompletionYear: 705,
    benefits: [
      'Divertissement pour les citoyens',
      'Augmente la popularité des magistrats de 10%',
      'Peut accueillir des jeux et des courses'
    ],
    sponsors: ['Gaius Flaminius', 'Famille Aemilia'],
    approved: true
  },
  {
    id: 'project-aqueduc-appia',
    buildingTypeId: 'aqueduct',
    name: 'Rénovation de l\'Aqueduc Appia',
    location: 'Sud-est de Rome',
    estimatedCost: 400000,
    duration: 2,
    progress: 30,
    startedYear: 703,
    expectedCompletionYear: 705,
    benefits: [
      'Améliore l\'approvisionnement en eau de 20%',
      'Réduit les risques de maladies et d\'épidémies',
      'Augmente la capacité d\'irrigation des terres agricoles'
    ],
    sponsors: ['Sénat romain'],
    approved: true
  },
  {
    id: 'project-temple-minerva',
    buildingTypeId: 'temple',
    name: 'Temple de Minerva',
    location: 'Aventine',
    estimatedCost: 350000,
    duration: 2,
    progress: 0,
    benefits: [
      'Renforce la piété des citoyens',
      'Honore la déesse de la sagesse et des arts',
      'Améliore le prestige du quartier de l\'Aventine'
    ],
    sponsors: ['Famille Claudia'],
    approved: false
  }
];
