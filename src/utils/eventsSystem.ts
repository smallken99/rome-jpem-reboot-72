
import { toast } from 'sonner';
import { Season } from './timeSystem';

// Types d'événements
export type EventType = 'political' | 'economic' | 'military' | 'social' | 'religious';
export type EventSeverity = 'minor' | 'moderate' | 'major' | 'critical';

// Structure d'un événement
export interface GameEvent {
  id: string;
  title: string;
  description: string;
  type: EventType;
  severity: EventSeverity;
  season?: Season;
  year?: number;
  duration?: number; // Durée en jours
  effects: EventEffect[];
  choices?: EventChoice[];
}

// Effets d'un événement
export interface EventEffect {
  target: string; // 'treasury' | 'population' | 'stability' | 'influence' | etc.
  value: number;
  type: 'add' | 'multiply' | 'set';
  duration?: number; // Durée en jours, si temporaire
}

// Choix disponibles pour un événement
export interface EventChoice {
  id: string;
  title: string;
  description: string;
  effects: EventEffect[];
}

// Base de données d'événements
const eventDatabase: GameEvent[] = [
  {
    id: 'drought',
    title: 'Sécheresse en Italie',
    description: 'Une sécheresse sévère frappe l\'Italie, menaçant les récoltes et provoquant l\'inquiétude des paysans.',
    type: 'economic',
    severity: 'moderate',
    season: 'Aestas', // Été
    effects: [
      { target: 'ager_publicus_revenue', value: 0.8, type: 'multiply' },
      { target: 'food_supply', value: -20, type: 'add' },
      { target: 'population_happiness', value: -10, type: 'add' }
    ],
    choices: [
      {
        id: 'subsidize',
        title: 'Subventionner les agriculteurs',
        description: 'Puiser dans le trésor pour aider les agriculteurs touchés',
        effects: [
          { target: 'treasury', value: -50000, type: 'add' },
          { target: 'population_happiness', value: 15, type: 'add' },
          { target: 'senatorial_reputation', value: 5, type: 'add' }
        ]
      },
      {
        id: 'prayer',
        title: 'Organiser des prières publiques',
        description: 'Demander aux prêtres d\'organiser des cérémonies pour implorer la pluie',
        effects: [
          { target: 'treasury', value: -10000, type: 'add' },
          { target: 'piety', value: 10, type: 'add' },
          { target: 'population_happiness', value: 5, type: 'add' }
        ]
      },
      {
        id: 'ignore',
        title: 'Ne rien faire',
        description: 'Laisser les paysans se débrouiller seuls',
        effects: [
          { target: 'population_happiness', value: -20, type: 'add' },
          { target: 'senatorial_reputation', value: -10, type: 'add' }
        ]
      }
    ]
  },
  {
    id: 'barbarian_raid',
    title: 'Raids barbares à la frontière',
    description: 'Des tribus barbares attaquent les villages à la frontière nord de la République.',
    type: 'military',
    severity: 'major',
    effects: [
      { target: 'stability', value: -15, type: 'add' },
      { target: 'border_security', value: -20, type: 'add' }
    ],
    choices: [
      {
        id: 'send_troops',
        title: 'Envoyer des troupes',
        description: 'Dépêcher une légion pour protéger la frontière',
        effects: [
          { target: 'treasury', value: -100000, type: 'add' },
          { target: 'military_readiness', value: -10, type: 'add' },
          { target: 'border_security', value: 30, type: 'add' }
        ]
      },
      {
        id: 'diplomacy',
        title: 'Négocier avec les tribus',
        description: 'Envoyer des émissaires pour apaiser les tensions',
        effects: [
          { target: 'treasury', value: -30000, type: 'add' },
          { target: 'diplomacy', value: 10, type: 'add' },
          { target: 'senatorial_reputation', value: -5, type: 'add' }
        ]
      }
    ]
  }
];

/**
 * Génère un événement aléatoire en fonction de la saison et de l'année
 */
export const generateRandomEvent = (season: Season, year: number): GameEvent | null => {
  // Probabilité d'événement (20%)
  if (Math.random() > 0.2) return null;
  
  // Filtrer les événements possibles selon la saison
  const possibleEvents = eventDatabase.filter(event => 
    !event.season || event.season === season
  );
  
  if (possibleEvents.length === 0) return null;
  
  // Sélectionner un événement aléatoire
  const randomIndex = Math.floor(Math.random() * possibleEvents.length);
  const selectedEvent = { ...possibleEvents[randomIndex], year };
  
  // Annoncer l'événement
  toast.info(`Événement: ${selectedEvent.title}`, {
    description: selectedEvent.description.substring(0, 100) + '...',
    duration: 5000,
  });
  
  return selectedEvent;
};

/**
 * Applique les effets d'un événement au jeu
 */
export const applyEventEffects = (event: GameEvent, choiceId?: string): void => {
  // Trouver les effets à appliquer
  let effectsToApply = [...event.effects];
  
  // Si un choix a été fait, ajouter ses effets
  if (choiceId && event.choices) {
    const choice = event.choices.find(c => c.id === choiceId);
    if (choice) {
      effectsToApply = [...effectsToApply, ...choice.effects];
    }
  }
  
  // Ici, nous simulons l'application des effets
  // Dans une implémentation réelle, il faudrait modifier les valeurs du jeu
  console.log(`Applying effects for event: ${event.title}`);
  effectsToApply.forEach(effect => {
    console.log(`- ${effect.target}: ${effect.type === 'add' ? '+' : ''}${effect.value}`);
  });
  
  // Notifier l'utilisateur
  const severity = event.severity === 'critical' ? 'error' :
                  event.severity === 'major' ? 'warning' :
                  event.severity === 'moderate' ? 'info' : 'default';
                  
  if (choiceId) {
    const choice = event.choices?.find(c => c.id === choiceId);
    if (choice) {
      toast(`Vous avez choisi: ${choice.title}`, {
        description: "Les effets de cette décision seront bientôt visibles.",
      });
    }
  }
};
