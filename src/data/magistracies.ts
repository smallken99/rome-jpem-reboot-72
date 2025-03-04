
import { Gavel, Scroll, Book, Shield, User, Users, Landmark, Award, Flag, Key, File } from 'lucide-react';
import React from 'react';

// Define types for magistracies and senatorial positions
export type MagistrateType = 'magistracy' | 'senatorial';

export interface Magistrate {
  id: string;
  name: string;
  type: MagistrateType;
  description: string;
  icon: React.ReactNode;
  iconBgColor: string;
  iconColor: string;
  active: boolean;
}

// All possible magistracies
export const magistracies: Magistrate[] = [
  {
    id: 'questeur',
    name: 'Questeur',
    type: 'magistracy',
    description: 'Responsable des finances publiques, de la gestion du trésor et des dépenses de l\'État. Première étape du cursus honorum.',
    icon: <Coins className="h-6 w-6" />,
    iconBgColor: 'bg-rome-gold/10',
    iconColor: 'text-rome-gold',
    active: false,
  },
  {
    id: 'edile',
    name: 'Édile',
    type: 'magistracy',
    description: 'Chargé de l\'entretien des édifices publics, de l\'approvisionnement de Rome et de l\'organisation des jeux et festivals.',
    icon: <Landmark className="h-6 w-6" />,
    iconBgColor: 'bg-rome-terracotta/10',
    iconColor: 'text-rome-terracotta',
    active: false,
  },
  {
    id: 'preteur',
    name: 'Préteur',
    type: 'magistracy',
    description: 'Administre la justice et peut commander des légions. Peut remplacer les consuls en leur absence.',
    icon: <Gavel className="h-6 w-6" />,
    iconBgColor: 'bg-rome-navy/10',
    iconColor: 'text-rome-navy',
    active: true,
  },
  {
    id: 'consul',
    name: 'Consul',
    type: 'magistracy',
    description: 'Plus haute magistrature ordinaire, les deux consuls dirigent l\'État et commandent l\'armée. Ils président le Sénat et les assemblées.',
    icon: <Award className="h-6 w-6" />,
    iconBgColor: 'bg-purple-100',
    iconColor: 'text-purple-700',
    active: false,
  },
  {
    id: 'censeur',
    name: 'Censeur',
    type: 'magistracy',
    description: 'Chargé du recensement des citoyens et de l\'évaluation de leur fortune. Veille également à la moralité publique.',
    icon: <File className="h-6 w-6" />,
    iconBgColor: 'bg-blue-100',
    iconColor: 'text-blue-700',
    active: false,
  },
  {
    id: 'pontife',
    name: 'Pontife',
    type: 'magistracy',
    description: 'Membre du collège pontifical, veille au respect des traditions religieuses et interprète les présages.',
    icon: <Shield className="h-6 w-6" />,
    iconBgColor: 'bg-amber-100',
    iconColor: 'text-amber-700',
    active: false,
  },
  {
    id: 'tribun',
    name: 'Tribun de la Plèbe',
    type: 'magistracy',
    description: 'Élu par les plébéiens pour défendre leurs intérêts. Possède un droit de veto sur toutes les décisions des magistrats.',
    icon: <Users className="h-6 w-6" />,
    iconBgColor: 'bg-rose-100',
    iconColor: 'text-rose-700',
    active: false,
  },
];

// All senatorial positions
export const senatorialPositions: Magistrate[] = [
  {
    id: 'archiviste',
    name: 'Archiviste des Lois',
    type: 'senatorial',
    description: 'Chargé de la conservation des textes de loi et des sénatus-consultes. Conseiller juridique du Sénat.',
    icon: <Scroll className="h-6 w-6" />,
    iconBgColor: 'bg-emerald-100',
    iconColor: 'text-emerald-700',
    active: false,
  },
  {
    id: 'historien',
    name: 'Historien',
    type: 'senatorial',
    description: 'Chargé de documenter les événements importants de Rome et de conserver la mémoire des institutions.',
    icon: <Book className="h-6 w-6" />,
    iconBgColor: 'bg-cyan-100',
    iconColor: 'text-cyan-700',
    active: false,
  },
  {
    id: 'flamine',
    name: 'Flamine',
    type: 'senatorial',
    description: 'Prêtre attaché au culte d\'une divinité spécifique. Les flamines majeurs sont parmi les plus respectés des prêtres romains.',
    icon: <Flag className="h-6 w-6" />,
    iconBgColor: 'bg-indigo-100',
    iconColor: 'text-indigo-700',
    active: false,
  },
];

// Current magistracy of the family's member
export const currentMagistracy: Magistrate = magistracies.find(m => m.active) || {
  id: 'preteur',
  name: 'Préteur',
  type: 'magistracy',
  description: 'En tant que Préteur, Marcus Aurelius administre la justice civile à Rome et peut commander des légions en l\'absence des consuls.',
  icon: <Gavel className="h-6 w-6" />,
  iconBgColor: 'bg-rome-terracotta/10',
  iconColor: 'text-rome-terracotta',
  active: true,
};

// Export all possible positions for reuse
export const getAllPositions = (): Magistrate[] => {
  return [...magistracies, ...senatorialPositions];
};
