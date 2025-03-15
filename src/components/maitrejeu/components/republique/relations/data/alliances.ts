
import { Alliance } from '../types';

export const alliancesMock: Alliance[] = [
  {
    id: 'alliance-1',
    name: 'Ligue Latine',
    type: 'defensive',
    nations: ['rome', 'latin_cities'],
    status: 'active',
    description: 'Alliance historique entre Rome et les cités latines, formant le noyau de l\'expansion romaine en Italie.',
    dateCreation: '650 AUC',
    duration: 100,
    members: ['Rome', 'Præneste', 'Tibur', 'Tusculum', 'Lavinium'],
    militarySupport: 'Fourniture de troupes auxiliaires, défense commune du Latium.',
    economicBenefits: 'Marché commun, droit de commerce et de mariage entre citoyens.',
    commitments: 'Défense mutuelle, participation aux guerres défensives, partage du butin.'
  },
  {
    id: 'alliance-2',
    name: 'Confédération Numido-Romaine',
    type: 'military',
    nations: ['rome', 'numidia'],
    status: 'active',
    description: 'Alliance stratégique contre Carthage, renforçant la position romaine en Afrique du Nord.',
    dateCreation: '685 AUC',
    duration: 20,
    members: ['République Romaine', 'Royaume de Numidie'],
    militarySupport: 'Fourniture de cavalerie numide, opérations conjointes contre Carthage.',
    economicBenefits: 'Accès privilégié aux ports numides, protection des marchands.',
    commitments: 'Assistance militaire, interdiction d\'alliances avec Carthage.'
  },
  {
    id: 'alliance-3',
    name: 'Ligue Achéenne',
    type: 'defensive',
    nations: ['rome', 'achaean_league'],
    status: 'inactive',
    description: 'Alliance avec la confédération de cités grecques du Péloponnèse, garantissant l\'influence romaine en Grèce.',
    dateCreation: '675 AUC',
    duration: 25,
    members: ['République Romaine', 'Corinthe', 'Sparte', 'Argos', 'Mégalopolis'],
    militarySupport: 'Bases navales romaines, contingents auxiliaires grecs.',
    economicBenefits: 'Réduction des taxes portuaires, échanges culturels.',
    commitments: 'Protection contre la Macédoine, arbitrage romain des conflits internes.'
  },
  {
    id: 'alliance-4',
    name: 'Pacte Massiliote',
    type: 'trade',
    nations: ['rome', 'massilia'],
    status: 'expired',
    description: 'Alliance commerciale et militaire avec Massilia (Marseille), porte d\'entrée romaine en Gaule.',
    dateCreation: '650 AUC',
    duration: 40,
    members: ['République Romaine', 'Massilia'],
    militarySupport: 'Protection navale des routes commerciales, défense contre les tribus gauloises.',
    economicBenefits: 'Monopole commercial sur le delta du Rhône, échanges de vins et de produits manufacturés.',
    commitments: 'Protection de Massilia contre les raids gaulois, partage des informations sur les mouvements de tribus.'
  },
  {
    id: 'alliance-5',
    name: 'Entente Ptolémaïque',
    type: 'cultural',
    nations: ['rome', 'egypt'],
    status: 'active',
    description: 'Alliance diplomatique et culturelle avec l\'Égypte ptolémaïque, garantissant l\'approvisionnement en grain.',
    dateCreation: '690 AUC',
    duration: 30,
    members: ['République Romaine', 'Royaume Ptolémaïque d\'Égypte'],
    militarySupport: 'Protection navale limitée, échange d\'experts militaires.',
    economicBenefits: 'Accès privilégié au grain égyptien, tarifs préférentiels sur les produits de luxe.',
    commitments: 'Non-ingérence dans les affaires dynastiques égyptiennes, protection diplomatique contre les Séleucides.'
  }
];
