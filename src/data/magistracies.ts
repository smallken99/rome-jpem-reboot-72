
import { LucideIcon } from 'lucide-react';
import { Building, Gavel, LibraryBig, Scroll, Shield, UserCheck } from 'lucide-react';

export interface Magistrate {
  id: string;
  name: string;
  icon: LucideIcon;
  iconColor: string;
  iconBgColor?: string;
  rank: number;
  description: string;
  bureauAccess?: string[];
  responsibilities?: string[];
}

export const magistracies: Magistrate[] = [
  {
    id: 'consul',
    name: 'Consul',
    icon: Shield,
    iconColor: 'text-red-700',
    iconBgColor: 'bg-red-100',
    rank: 1,
    description: 'Le plus haut magistrat de la République, commandant en chef des armées.',
    bureauAccess: ['trésor', 'diplomatie', 'armée', 'législation', 'domaines-publics'],
    responsibilities: [
      'Commander les armées romaines',
      'Présider les séances du Sénat',
      'Proposer de nouvelles lois',
      'Administrer la justice'
    ]
  },
  {
    id: 'preteur',
    name: 'Préteur',
    icon: Gavel,
    iconColor: 'text-purple-700',
    iconBgColor: 'bg-purple-100',
    rank: 2,
    description: 'Magistrat en charge de la justice et de l\'administration de la loi.',
    bureauAccess: ['justice', 'législation'],
    responsibilities: [
      'Rendre la justice',
      'Interpréter les lois',
      'Remplacer les consuls en leur absence',
      'Gouverner certaines provinces'
    ]
  },
  {
    id: 'edile',
    name: 'Édile',
    icon: Building,
    iconColor: 'text-amber-700',
    iconBgColor: 'bg-amber-100',
    rank: 3,
    description: 'Magistrat responsable des bâtiments publics et de l\'ordre dans les rues.',
    bureauAccess: ['bâtiments', 'temples', 'marchés'],
    responsibilities: [
      'Entretenir les bâtiments publics',
      'Organiser les jeux publics',
      'Surveiller les marchés',
      'Maintenir l\'ordre public'
    ]
  },
  {
    id: 'questeur',
    name: 'Questeur',
    icon: Scroll,
    iconColor: 'text-green-700',
    iconBgColor: 'bg-green-100',
    rank: 4,
    description: 'Magistrat en charge des finances publiques et de la trésorerie.',
    bureauAccess: ['trésor', 'impôts', 'patrimoine-public'],
    responsibilities: [
      'Gérer les finances publiques',
      'Collecter les impôts',
      'Tenir la comptabilité de l\'État',
      'Accompagner les gouverneurs en province'
    ]
  },
  {
    id: 'censeur',
    name: 'Censeur',
    icon: UserCheck,
    iconColor: 'text-blue-700',
    iconBgColor: 'bg-blue-100',
    rank: 5,
    description: 'Magistrat qui tient les registres des citoyens et surveille les mœurs.',
    bureauAccess: ['cens', 'moral', 'magistratures'],
    responsibilities: [
      'Recenser les citoyens',
      'Évaluer les fortunes',
      'Surveiller les mœurs',
      'Nommer les sénateurs'
    ]
  },
  {
    id: 'senateur',
    name: 'Sénateur',
    icon: LibraryBig,
    iconColor: 'text-gray-700',
    iconBgColor: 'bg-gray-100',
    rank: 6,
    description: 'Membre du Sénat ayant un droit de vote et de parole.',
    bureauAccess: ['sénat'],
    responsibilities: [
      'Participer aux débats du Sénat',
      'Voter les lois',
      'Conseiller les magistrats',
      'Représenter les intérêts de Rome'
    ]
  }
];

export const currentMagistracy: Magistrate = magistracies[0]; // Consul
