
// Constantes pour les phases de jeu
export const GAME_PHASES = {
  FORUM: 'FORUM',
  COMBAT: 'COMBAT',
  SENAT: 'SENAT',
  COMMERCE: 'COMMERCE'
};

// Constantes pour les statuts d'événements
export const EVENT_STATUS = {
  SCHEDULED: 'planifiée',
  IN_PROGRESS: 'en cours',
  COMPLETED: 'terminée'
};

// Ajouter une table de correspondance pour les phases de jeu
export const GAME_PHASE_MAP = {
  FORUM: 'FORUM',
  COMBAT: 'COMBAT',
  SENAT: 'SENATE', // corriger la correspondance pour SENAT
  COMMERCE: 'COMMERCE'
};

// Ajouter une table de correspondance pour les statuts en anglais et français
export const EVENT_STATUS_MAP = {
  scheduled: 'planifiée',
  in_progress: 'en cours',
  completed: 'terminée'
};
