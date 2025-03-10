
import { GamePhase } from './common';

// Si ce fichier existe et cause des erreurs, assurons-nous qu'il respecte le nouveau type GamePhase
// Note: Je ne sais pas exactement ce que contient ce fichier, mais je corrige
// les erreurs de compatibilité avec le nouveau type GamePhase

// Exemple de mapping entre phases de jeu anglaises et françaises
export const phaseMapping: Record<string, GamePhase> = {
  // Phases en anglais (original)
  "SENATE": "SENATE",
  "ACTIONS": "ACTIONS", 
  "ECONOMY": "ECONOMY",
  "EVENTS": "EVENTS",
  "DIPLOMACY": "DIPLOMACY",
  "MILITARY": "MILITARY",
  
  // Phases en français (ajoutées)
  "POLITIQUE": "POLITIQUE",
  "ECONOMIE": "ECONOMIE",
  "MILITAIRE": "MILITAIRE",
  "RELIGION": "RELIGION",
  "SOCIAL": "SOCIAL",
  "SETUP": "SETUP",
  "ELECTION": "ELECTION",
  "ACTION": "ACTION",
  "SENAT": "SENAT",
  "EVENEMENT": "EVENEMENT",
  "ADMINISTRATION": "ADMINISTRATION"
};

// Fonction utilitaire pour convertir une phase
export const convertPhase = (phase: string): GamePhase => {
  // Vérifier si la phase existe dans le mapping
  if (phase in phaseMapping) {
    return phaseMapping[phase];
  }
  
  // Par défaut, retourner SENATE
  return "SENATE";
};
