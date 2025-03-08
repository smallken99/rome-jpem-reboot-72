
import { Gavel, Scroll, Book, Shield, Users, Landmark, Award, Flag, File, Coins, Scale, Building, Swords, Hammer, BookOpenCheck } from 'lucide-react';
import React from 'react';

// Define types for magistracies and senatorial positions
export type MagistrateType = 'magistracy' | 'senatorial';

export interface Magistrate {
  id: string;
  name: string;
  type: MagistrateType;
  description: string;
  icon: React.ElementType;
  iconBgColor: string;
  iconColor: string;
  active: boolean;
  responsibilities?: string[];
  bureauAccess?: string[];
}

// All possible magistracies
export const magistracies: Magistrate[] = [
  {
    id: 'questeur',
    name: 'Questeur',
    type: 'magistracy',
    description: 'Responsable des finances publiques, de la gestion du trésor et des dépenses de l\'État. Première étape du cursus honorum.',
    icon: Coins,
    iconBgColor: 'bg-rome-gold/10',
    iconColor: 'text-rome-gold',
    active: false,
    responsibilities: [
      "Gérer le trésor public (aerarium)",
      "Administrer les finances publiques",
      "Collecter et superviser les impôts",
      "Effectuer les paiements publics",
      "Distribuer les terres publiques"
    ],
    bureauAccess: [
      "tresor", "impots", "ager", "domaines", "depenses"
    ]
  },
  {
    id: 'edile',
    name: 'Édile',
    type: 'magistracy',
    description: 'Chargé de l\'entretien des édifices publics, de l\'approvisionnement de Rome et de l\'organisation des jeux et festivals.',
    icon: Building,
    iconBgColor: 'bg-rome-terracotta/10',
    iconColor: 'text-rome-terracotta',
    active: false,
    responsibilities: [
      "Superviser l'entretien des édifices publics",
      "Organiser les jeux et festivals publics",
      "Assurer l'approvisionnement de Rome",
      "Maintenir l'ordre public dans la ville",
      "Veiller à l'application des règlements commerciaux"
    ],
    bureauAccess: [
      "securite", "batiments", "marches", "jeux", "enquetes"
    ]
  },
  {
    id: 'preteur',
    name: 'Préteur',
    type: 'magistracy',
    description: 'Administre la justice et peut commander des légions. Peut remplacer les consuls en leur absence.',
    icon: Gavel,
    iconBgColor: 'bg-rome-navy/10',
    iconColor: 'text-rome-navy',
    active: true,
    responsibilities: [
      "Administrer la justice civile et criminelle",
      "Présider les tribunaux",
      "Émettre des édits (edictum praetoris)",
      "Commander des légions en cas de nécessité",
      "Gérer les affaires juridiques avec les non-citoyens"
    ],
    bureauAccess: [
      "justice", "proces", "tribunaux", "edits", "affaires-etrangeres"
    ]
  },
  {
    id: 'consul',
    name: 'Consul',
    type: 'magistracy',
    description: 'Plus haute magistrature ordinaire, les deux consuls dirigent l\'État et commandent l\'armée. Ils président le Sénat et les assemblées.',
    icon: Swords,
    iconBgColor: 'bg-purple-100',
    iconColor: 'text-purple-700',
    active: false,
    responsibilities: [
      "Commander les armées romaines",
      "Présider le Sénat",
      "Diriger l'administration de l'État",
      "Convoquer les assemblées populaires",
      "Représenter Rome dans les relations diplomatiques"
    ],
    bureauAccess: [
      "armee", "senat", "diplomatie", "politique", "elections"
    ]
  },
  {
    id: 'censeur',
    name: 'Censeur',
    type: 'magistracy',
    description: 'Chargé du recensement des citoyens et de l\'évaluation de leur fortune. Veille également à la moralité publique.',
    icon: BookOpenCheck,
    iconBgColor: 'bg-blue-100',
    iconColor: 'text-blue-700',
    active: false,
    responsibilities: [
      "Réaliser le recensement des citoyens",
      "Évaluer la fortune des citoyens",
      "Superviser la moralité publique",
      "Réviser les listes du Sénat",
      "Commander les grands travaux publics"
    ],
    bureauAccess: [
      "lois", "recensement", "morale", "travaux", "senateurs"
    ]
  },
  {
    id: 'pontife',
    name: 'Pontife',
    type: 'magistracy',
    description: 'Membre du collège pontifical, veille au respect des traditions religieuses et interprète les présages.',
    icon: Shield,
    iconBgColor: 'bg-amber-100',
    iconColor: 'text-amber-700',
    active: false,
    responsibilities: [
      "Interpréter les présages",
      "Veiller au respect du calendrier religieux",
      "Superviser les rites et cérémonies",
      "Interpréter le droit sacré",
      "Gérer les temples et sanctuaires"
    ],
    bureauAccess: [
      "religion", "ceremonies", "temples", "oracles", "vestales"
    ]
  },
  {
    id: 'tribun',
    name: 'Tribun de la Plèbe',
    type: 'magistracy',
    description: 'Élu par les plébéiens pour défendre leurs intérêts. Possède un droit de veto sur toutes les décisions des magistrats.',
    icon: Users,
    iconBgColor: 'bg-rose-100',
    iconColor: 'text-rose-700',
    active: false,
    responsibilities: [
      "Protéger les plébéiens",
      "Opposer son veto aux décisions du Sénat",
      "Convoquer le concile de la plèbe",
      "Proposer des lois favorables à la plèbe",
      "Poursuivre les magistrats abusifs"
    ],
    bureauAccess: [
      "assemblees", "reformes", "petitions", "veto", "protection"
    ]
  },
];

// All senatorial positions
export const senatorialPositions: Magistrate[] = [
  {
    id: 'archiviste',
    name: 'Archiviste des Lois',
    type: 'senatorial',
    description: 'Chargé de la conservation des textes de loi et des sénatus-consultes. Conseiller juridique du Sénat.',
    icon: Scroll,
    iconBgColor: 'bg-emerald-100',
    iconColor: 'text-emerald-700',
    active: false,
    responsibilities: [
      "Conserver les textes de loi",
      "Archiver les décisions du Sénat",
      "Conseiller les magistrats sur le droit existant",
      "Authentifier les documents officiels",
      "Gérer la bibliothèque juridique"
    ],
    bureauAccess: [
      "archives", "registre", "bibliotheque", "documents", "authentification"
    ]
  },
  {
    id: 'historien',
    name: 'Historien',
    type: 'senatorial',
    description: 'Chargé de documenter les événements importants de Rome et de conserver la mémoire des institutions.',
    icon: Book,
    iconBgColor: 'bg-cyan-100',
    iconColor: 'text-cyan-700',
    active: false,
    responsibilities: [
      "Documenter les événements importants",
      "Rédiger les annales de la République",
      "Préserver la mémoire institutionnelle",
      "Conseiller sur les précédents historiques",
      "Réaliser des recherches historiques"
    ],
    bureauAccess: [
      "histoire", "annales", "memoires", "recherche", "consultations"
    ]
  },
  {
    id: 'flamine',
    name: 'Flamine',
    type: 'senatorial',
    description: 'Prêtre attaché au culte d\'une divinité spécifique. Les flamines majeurs sont parmi les plus respectés des prêtres romains.',
    icon: Flag,
    iconBgColor: 'bg-indigo-100',
    iconColor: 'text-indigo-700',
    active: false,
    responsibilities: [
      "Officier les rites d'une divinité spécifique",
      "Maintenir le temple attribué",
      "Interpréter les signes divins",
      "Conseiller sur les questions religieuses",
      "Organiser les fêtes sacrées"
    ],
    bureauAccess: [
      "cultes", "rites", "divination", "ceremonies", "fetes"
    ]
  },
];

// Current magistracy of the family's member
export const currentMagistracy: Magistrate = magistracies.find(m => m.active) || {
  id: 'preteur',
  name: 'Préteur',
  type: 'magistracy',
  description: 'En tant que Préteur, Marcus Aurelius administre la justice civile à Rome et peut commander des légions en l\'absence des consuls.',
  icon: Gavel,
  iconBgColor: 'bg-rome-navy/10',
  iconColor: 'text-rome-navy',
  active: true,
  responsibilities: [
    "Administrer la justice civile et criminelle",
    "Présider les tribunaux",
    "Émettre des édits (edictum praetoris)",
    "Commander des légions en cas de nécessité",
    "Gérer les affaires juridiques avec les non-citoyens"
  ],
  bureauAccess: [
    "justice", "proces", "tribunaux", "edits", "affaires-etrangeres"
  ]
};

// Export all possible positions for reuse
export const getAllPositions = (): Magistrate[] => {
  return [...magistracies, ...senatorialPositions];
};
