
import { Landmark, Gavel, Shield, Coins, Building } from 'lucide-react';

export interface Magistrate {
  id: string;
  name: string;
  description: string;
  responsibilities: string[];
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  iconColor: string;
  iconBgColor: string;
  tenure: number; // Years
  reelection: boolean;
  minAge: number;
  currentHolder: string;
  deputies?: string[];
  previousHolder?: string;
}

export const magistracies: Magistrate[] = [
  {
    id: 'consul',
    name: 'Consul',
    description: 'Plus haute magistrature de la République, les consuls détiennent l\'imperium et dirigent l\'État et les armées.',
    responsibilities: [
      'Commander les légions romaines',
      'Présider le Sénat',
      'Superviser les affaires civiles et religieuses',
      'Proposer de nouvelles lois',
      'Veto sur les actions d\'autres magistrats'
    ],
    icon: Landmark,
    iconColor: 'text-purple-700',
    iconBgColor: 'bg-purple-100',
    tenure: 1,
    reelection: false,
    minAge: 42,
    currentHolder: 'Marcus Aurelius Cotta',
    deputies: ['Lucius Cornelius Sulla'],
    previousHolder: 'Quintus Lutatius Catulus'
  },
  {
    id: 'preteur',
    name: 'Préteur',
    description: 'Magistrat doté de l\'imperium, responsable de l\'administration de la justice à Rome.',
    responsibilities: [
      'Présider les tribunaux',
      'Interpréter et appliquer les lois',
      'Émettre des édits prétoriens',
      'Remplacer les consuls en leur absence',
      'Gouverner une province après mandat'
    ],
    icon: Gavel,
    iconColor: 'text-blue-700',
    iconBgColor: 'bg-blue-100',
    tenure: 1,
    reelection: false,
    minAge: 39,
    currentHolder: 'Gaius Claudius Nero',
    previousHolder: 'Publius Licinius Crassus'
  },
  {
    id: 'edile',
    name: 'Édile',
    description: 'Responsable de l\'administration urbaine, de l\'ordre public et des festivals à Rome.',
    responsibilities: [
      'Superviser les marchés et le commerce',
      'Maintenir les édifices publics',
      'Organiser les jeux publics et festivals',
      'Assurer l\'approvisionnement en grain',
      'Maintenir l\'ordre public dans la ville'
    ],
    icon: Shield,
    iconColor: 'text-red-700',
    iconBgColor: 'bg-red-100',
    tenure: 1,
    reelection: false,
    minAge: 36,
    currentHolder: 'Titus Quinctius Flamininus',
    previousHolder: 'Gnaeus Domitius Ahenobarbus'
  },
  {
    id: 'questeur',
    name: 'Questeur',
    description: 'Officiel financier chargé de l\'administration du trésor public et des fonds militaires.',
    responsibilities: [
      'Gérer le trésor public (aerarium)',
      'Collecter les taxes et impôts',
      'Payer les dépenses publiques',
      'Accompagner les gouverneurs en provinces',
      'Superviser les finances militaires'
    ],
    icon: Coins,
    iconColor: 'text-yellow-700',
    iconBgColor: 'bg-yellow-100',
    tenure: 1,
    reelection: false,
    minAge: 30,
    currentHolder: 'Publius Servilius Vatia',
    previousHolder: 'Marcus Aemilius Lepidus'
  },
  {
    id: 'censeur',
    name: 'Censeur',
    description: 'Magistrat supérieur chargé du recensement des citoyens et de la surveillance des mœurs publiques.',
    responsibilities: [
      'Conduire le recensement des citoyens',
      'Réviser la liste des sénateurs',
      'Superviser la moralité publique',
      'Gérer les contrats publics',
      'Attribuer le statut social'
    ],
    icon: Building,
    iconColor: 'text-green-700',
    iconBgColor: 'bg-green-100',
    tenure: 18, // 18 mois
    reelection: false,
    minAge: 45,
    currentHolder: 'Lucius Gellius Publicola',
    previousHolder: 'Gnaeus Cornelius Lentulus'
  }
];

// Magistrature actuelle du joueur (à remplacer par la logique de votre jeu)
export const currentMagistracy = magistracies[0]; // Consul par défaut
