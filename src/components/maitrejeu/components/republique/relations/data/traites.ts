
import { Traite } from '../types';

export const traitesMock: Traite[] = [
  {
    id: 'traite-egypt-1',
    title: 'Accord Commercial d\'Alexandrie',
    type: 'commercial',
    parties: ['rome', 'egypt'],
    status: 'active',
    description: 'Accord commercial garantissant l\'accès privilégié aux ports égyptiens et l\'importation de grain pour Rome.',
    dateSignature: '690 AUC',
    dateExpiration: '710 AUC',
    clauses: [
      'Accès privilégié aux ports d\'Alexandrie et de Péluse',
      'Tarifs préférentiels sur le grain égyptien',
      'Protection des marchands romains sur le territoire égyptien'
    ],
    benefits: 'Augmentation de 30% des échanges commerciaux, sécurisation de l\'approvisionnement en grain.',
    obligations: 'Protection des intérêts égyptiens en Méditerranée orientale, assistance navale en cas de piraterie.'
  },
  {
    id: 'traite-numidia-1',
    title: 'Alliance Romano-Numide',
    type: 'military',
    parties: ['rome', 'numidia'],
    status: 'active',
    description: 'Alliance militaire contre Carthage offrant un soutien mutuel et des échanges de troupes.',
    dateSignature: '685 AUC',
    dateExpiration: '705 AUC',
    clauses: [
      'Assistance militaire mutuelle contre Carthage',
      'Fourniture de cavalerie numide aux légions romaines',
      'Partage du renseignement militaire'
    ],
    benefits: 'Renforcement de la position romaine en Afrique du Nord, accès à la cavalerie légère numide.',
    obligations: 'Protection du royaume numide, aide militaire en cas d\'agression carthaginoise.'
  },
  {
    id: 'traite-macedon-1',
    title: 'Pacte de Non-Agression de l\'Adriatique',
    type: 'commercial',
    parties: ['rome', 'macedon'],
    status: 'expired',
    description: 'Accord temporaire de stabilisation des relations et de commerce entre Rome et la Macédoine.',
    dateSignature: '679 AUC',
    dateExpiration: '689 AUC',
    clauses: [
      'Non-interférence dans les affaires illyriennes',
      'Liberté de commerce en mer Adriatique',
      'Reconnaissance des sphères d\'influence respectives'
    ],
    benefits: 'Stabilité temporaire des frontières orientales, développement du commerce maritime.',
    obligations: 'Restriction des mouvements navals en mer Adriatique, consultation avant toute alliance avec d\'autres puissances grecques.'
  },
  {
    id: 'traite-seleucid-1',
    title: 'Traité d\'Apamée',
    type: 'peace',
    parties: ['rome', 'seleucid'],
    status: 'violated',
    description: 'Traité imposé à l\'Empire Séleucide après sa défaite, limitant sa flotte et son armée.',
    dateSignature: '688 AUC',
    dateExpiration: '∞',
    clauses: [
      'Retrait des forces séleucides d\'Europe et d\'Asie Mineure à l\'ouest du Taurus',
      'Limitation de la flotte à 10 navires de guerre',
      'Paiement d\'une indemnité de 15,000 talents sur 12 ans',
      'Livraison des éléphants de guerre et interdiction d\'en élever de nouveaux'
    ],
    benefits: 'Élimination de la menace séleucide en Mer Égée, expansion de l\'influence romaine en Asie Mineure.',
    obligations: 'Garantie de l\'indépendance des cités grecques d\'Asie Mineure.'
  },
  {
    id: 'traite-parthia-1',
    title: 'Accord de l\'Euphrate',
    type: 'peace',
    parties: ['rome', 'parthia'],
    status: 'active',
    description: 'Reconnaissance mutuelle de l\'Euphrate comme frontière entre les deux empires.',
    dateSignature: '692 AUC',
    dateExpiration: '712 AUC',
    clauses: [
      'Reconnaissance de l\'Euphrate comme frontière naturelle',
      'Échange d\'ambassadeurs permanents',
      'Engagement à ne pas interférer dans les affaires internes de l\'autre empire'
    ],
    benefits: 'Stabilisation de la frontière orientale, développement des routes commerciales vers l\'Asie.',
    obligations: 'Consultation mutuelle avant toute action militaire en Mésopotamie ou en Arménie.'
  }
];
