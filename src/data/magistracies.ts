
import { LucideIcon } from 'lucide-react';
import { Building, Gavel, LibraryBig, Scroll, Shield, UserCheck } from 'lucide-react';

export interface Magistrate {
  id: string;
  name: string;
  icon: LucideIcon;
  iconColor: string;
  rank: number;
  description: string;
  bureauAccess?: string[];
}

export const magistracies: Magistrate[] = [
  {
    id: 'consul',
    name: 'Consul',
    icon: Shield,
    iconColor: 'text-red-700',
    rank: 1,
    description: 'Le plus haut magistrat de la République, commandant en chef des armées.',
    bureauAccess: ['trésor', 'diplomatie', 'armée', 'législation', 'domaines-publics']
  },
  {
    id: 'preteur',
    name: 'Préteur',
    icon: Gavel,
    iconColor: 'text-purple-700',
    rank: 2,
    description: 'Magistrat en charge de la justice et de l\'administration de la loi.',
    bureauAccess: ['justice', 'législation']
  },
  {
    id: 'edile',
    name: 'Édile',
    icon: Building,
    iconColor: 'text-amber-700',
    rank: 3,
    description: 'Magistrat responsable des bâtiments publics et de l\'ordre dans les rues.',
    bureauAccess: ['bâtiments', 'temples', 'marchés']
  },
  {
    id: 'questeur',
    name: 'Questeur',
    icon: Scroll,
    iconColor: 'text-green-700',
    rank: 4,
    description: 'Magistrat en charge des finances publiques et de la trésorerie.',
    bureauAccess: ['trésor', 'impôts', 'patrimoine-public']
  },
  {
    id: 'censeur',
    name: 'Censeur',
    icon: UserCheck,
    iconColor: 'text-blue-700',
    rank: 5,
    description: 'Magistrat qui tient les registres des citoyens et surveille les mœurs.',
    bureauAccess: ['cens', 'moral', 'magistratures']
  },
  {
    id: 'senateur',
    name: 'Sénateur',
    icon: LibraryBig,
    iconColor: 'text-gray-700',
    rank: 6,
    description: 'Membre du Sénat ayant un droit de vote et de parole.',
    bureauAccess: ['sénat']
  }
];

export const currentMagistracy: Magistrate = magistracies[0]; // Consul
