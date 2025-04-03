
import { GamePhase } from './common';

// Map string phase names to our enum values
export const phaseMapping: Record<string, GamePhase> = {
  // Phases en anglais (original)
  "SENATE": GamePhase.SENATE,
  "ACTIONS": GamePhase.ACTIONS, 
  "ECONOMY": GamePhase.ECONOMY,
  "EVENTS": GamePhase.EVENTS,
  "DIPLOMACY": GamePhase.DIPLOMACY,
  "MILITARY": GamePhase.MILITARY,
  
  // Phases en français (ajoutées)
  "POLITIQUE": GamePhase.POLITIQUE,
  "ECONOMIE": GamePhase.ECONOMIE,
  "MILITAIRE": GamePhase.MILITAIRE,
  "RELIGION": GamePhase.RELIGION,
  "SOCIAL": GamePhase.SOCIAL,
  "SETUP": GamePhase.SETUP,
  "ELECTION": GamePhase.ELECTION,
  "ACTION": GamePhase.ACTION,
  "SENAT": GamePhase.SENAT,
  "EVENEMENT": GamePhase.EVENEMENT,
  "ADMINISTRATION": GamePhase.ADMINISTRATION
};

// Fonction utilitaire pour convertir une phase
export const convertPhase = (phase: string): GamePhase => {
  // Match the phase to our enum without case sensitivity
  const normalizedPhase = phase.toUpperCase();
  
  if (normalizedPhase in GamePhase) {
    return GamePhase[normalizedPhase as keyof typeof GamePhase];
  }
  
  // Check the mapping
  if (normalizedPhase in phaseMapping) {
    return phaseMapping[normalizedPhase];
  }
  
  // Default value
  return GamePhase.NORMAL;
};
