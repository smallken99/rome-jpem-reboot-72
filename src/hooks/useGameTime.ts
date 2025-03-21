
import { useState, useEffect } from 'react';
import { useMaitreJeu } from '@/components/maitrejeu/context';
import { GamePhase, Season, formatSeasonDisplay, formatGameDate } from '@/utils/timeSystem';

export const useGameTime = () => {
  const { 
    currentDate,
    currentPhase,
    currentYear,
    currentSeason,
    advanceTime,
    changePhase
  } = useMaitreJeu();

  // Format a season for display
  const formatSeason = (season: Season | string) => {
    return formatSeasonDisplay(season);
  };

  // Format as Roman season
  const formatRomanSeason = (season: Season) => {
    switch (season) {
      case 'Ver': return 'Ver (Printemps)';
      case 'Aestas': return 'Aestas (Été)';
      case 'Autumnus': return 'Autumnus (Automne)';
      case 'Hiems': return 'Hiems (Hiver)';
      default: return season;
    }
  };

  // Format full date
  const formatDate = () => {
    return formatGameDate(currentDate);
  };

  // Translate phase name
  const translatePhase = (phase: string): string => {
    const phaseMap: Record<string, string> = {
      'SENATE': 'Sénat',
      'ECONOMY': 'Économie',
      'ELECTIONS': 'Élections',
      'DIPLOMACY': 'Diplomatie',
      'MILITARY': 'Militaire',
      'RELIGION': 'Religion',
      'VOTE': 'Vote',
      'ACTIONS': 'Actions',
      'EVENTS': 'Événements'
    };
    return phaseMap[phase] || phase;
  };

  // Get phase description
  const getPhaseDescription = (): string => {
    switch (currentPhase) {
      case 'SENATE': 
        return "Phase de réunion du Sénat où les décisions importantes sont débattues.";
      case 'ECONOMY': 
        return "Gérez les finances et l'économie de la République.";
      case 'ELECTION': 
      case 'ELECTIONS':
        return "Les citoyens élisent leurs magistrats pour l'année à venir.";
      case 'DIPLOMACY': 
        return "Négociez avec d'autres nations et établissez des relations diplomatiques.";
      case 'MILITARY': 
        return "Planifiez et exécutez des campagnes militaires.";
      case 'RELIGION': 
        return "Organisez des cérémonies religieuses et consultez les augures.";
      case 'VOTE': 
        return "Votez sur les propositions présentées au Sénat.";
      case 'ACTIONS': 
        return "Les joueurs peuvent effectuer des actions personnelles.";
      case 'EVENTS': 
        return "Résolution des événements aléatoires affectant la République.";
      default:
        return "Phase actuelle du jeu.";
    }
  };

  return {
    currentDate,
    currentPhase,
    advanceTime,
    changePhase,
    year: currentYear,
    season: currentSeason,
    formatSeason,
    formatRomanSeason,
    formatDate,
    translatePhase,
    getPhaseDescription
  };
};
