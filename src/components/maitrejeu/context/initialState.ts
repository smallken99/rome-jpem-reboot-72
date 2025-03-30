
import { Equilibre } from '@/types/equilibre';
import { Evenement } from '../types/evenement';
import { GameDate } from '@/utils/types/gameDate';
import { SenateurJouable } from '@/components/maitrejeu/types/senateurs';

// État initial pour le jeu
export const initialGameState = {
  year: 510,
  season: 'spring' as const,
  phase: 'normal' as const,
  day: 1
};

// État initial pour l'équilibre
export const initialEquilibre: Equilibre = {
  politique: {
    populaires: 50,
    optimates: 50,
    moderates: 50,
    total: 150
  },
  economie: {
    stabilite: 70,
    croissance: 60,
    commerce: 65,
    agriculture: 75
  },
  social: {
    plebeiens: 60,
    patriciens: 70,
    esclaves: 40,
    cohesion: 65
  },
  militaire: {
    moral: 80,
    effectifs: 70,
    equipement: 65,
    discipline: 75
  },
  religion: {
    piete: 70,
    traditions: 80,
    superstition: 60
  },
  population: 500000,
  date: new Date()
};

// État initial pour les sénateurs
export const initialSenateurs: SenateurJouable[] = [
  {
    id: '1',
    name: 'Marcus Aurelius',
    nom: 'Aurelius',
    prenom: 'Marcus',
    gens: 'Aurelia',
    gender: 'male',
    age: 45,
    faction: 'optimates',
    influence: 70,
    prestige: 65,
    richesse: 80,
    fonction: 'consul',
    appartenance: 'patricien',
    magistrature: 'consul',
    statut: 'actif',
    joueur: false,
    playerId: '',
    popularite: 60,
    militaire: 75,
    piete: 70,
    eloquence: 65,
    actif: true,
    famille: 'Aurelia',
    stats: {
      popularity: 60,
      oratory: 65,
      piety: 70,
      martialEducation: 75
    },
    diplomatie: {
      allies: ['2', '5'],
      ennemis: ['3'],
      contacts: ['7', '9']
    }
  },
  {
    id: '2',
    name: 'Lucius Junius',
    nom: 'Junius',
    prenom: 'Lucius',
    gens: 'Junia',
    gender: 'male',
    age: 42,
    faction: 'populares',
    influence: 65,
    prestige: 60,
    richesse: 70,
    fonction: 'préteur',
    appartenance: 'plébéien',
    magistrature: 'préteur',
    statut: 'actif',
    joueur: true,
    playerId: 'user1',
    popularite: 75,
    militaire: 60,
    piete: 65,
    eloquence: 70,
    actif: true,
    famille: 'Junia',
    stats: {
      popularity: 75,
      oratory: 70,
      piety: 65,
      martialEducation: 60
    },
    diplomatie: {
      allies: ['4', '7'],
      ennemis: ['1'],
      contacts: ['6', '8']
    }
  }
];

// État initial pour les événements
export const initialEvenements: Evenement[] = [
  {
    id: '1',
    title: 'Tensions au Sénat',
    description: 'Des tensions croissantes entre populares et optimates menacent la stabilité politique.',
    date: { year: 510, season: 'spring' },
    type: 'POLITIQUE',
    importance: 'haute',
    resolved: false,
    impact: {
      'politique.stability': -5,
      'social.cohesion': -3
    },
    tags: ['politique', 'sénat'],
    actions: [
      {
        id: '1-1',
        texte: 'Organiser une médiation',
        label: 'Médiation',
        effets: { 'politique.stability': +2 },
        consequence: 'Réduction temporaire des tensions'
      },
      {
        id: '1-2',
        texte: 'Laisser la situation s\'envenimer',
        label: 'Ignorer',
        effets: { 'politique.stability': -3 },
        consequence: 'Aggravation de la crise politique'
      }
    ]
  }
];

// État initial pour les lois
export const initialLois = [];

// État initial pour les provinces
export const initialProvinces = [];

// État initial pour l'historique
export const initialHistoireEntries = [];

// État initial pour les élections
export const initialElections = [];

// État initial complet
export const initialState = {
  gameState: initialGameState,
  equilibre: initialEquilibre,
  senateurs: initialSenateurs,
  evenements: initialEvenements,
  lois: initialLois,
  provinces: initialProvinces,
  histoireEntries: initialHistoireEntries,
  elections: initialElections
};

export const initialDate: GameDate = {
  year: 510,
  season: 'spring'
};
