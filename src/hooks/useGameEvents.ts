
import { useState, useEffect } from 'react';
import { useMaitreJeu } from '@/components/maitrejeu/context';
import { toast } from 'sonner';
import { GameDate, formatGameDate, convertToStandardSeason } from '@/utils/timeSystem';

export const useGameEvents = () => {
  const { 
    currentDate, 
    evenements, 
    addEvenement, 
    resolveEvenement,
    advanceTime
  } = useMaitreJeu();
  
  // Événements actifs pour la date actuelle
  const currentEvents = evenements.filter(event => 
    event.date.year === currentDate.year && 
    event.date.season === currentDate.season && 
    !event.resolved
  );
  
  // Événements résolus pour la date actuelle
  const resolvedEvents = evenements.filter(event => 
    event.date.year === currentDate.year && 
    event.date.season === currentDate.season && 
    event.resolved
  );
  
  // Événements à venir (prochaine saison)
  const getUpcomingEvents = () => {
    let nextSeason = currentDate.season;
    let nextYear = currentDate.year;
    
    const currentSeason = convertToStandardSeason(currentDate.season as string);
    
    switch (currentSeason) {
      case 'Ver': nextSeason = 'Aestas'; break;
      case 'Aestas': nextSeason = 'Autumnus'; break;
      case 'Autumnus': nextSeason = 'Hiems'; break;
      case 'Hiems': nextSeason = 'Ver'; nextYear++; break;
    }
    
    return evenements.filter(event => 
      event.date.year === nextYear && 
      event.date.season === nextSeason
    );
  };
  
  // Ajouter un événement pour la date actuelle
  const addCurrentEvent = (
    title: string, 
    description: string, 
    importance: string[], 
    type: string, 
    options?: { 
      effects?: string[]; 
      choices?: { text: string; outcome: string }[] 
    }
  ) => {
    const newEvent = {
      titre: title,
      description,
      date: { ...currentDate },
      importance,
      type,
      resolved: false,
      options: {
        effects: options?.effects || [],
        choices: options?.choices || []
      }
    };
    
    addEvenement(newEvent);
    toast.success(`Événement ajouté : ${title}`);
    
    return title;
  };
  
  // Ajouter un événement pour une date future
  const scheduleEvent = (
    title: string, 
    description: string, 
    targetDate: GameDate, 
    importance: string[], 
    type: string, 
    options?: { 
      effects?: string[]; 
      choices?: { text: string; outcome: string }[] 
    }
  ) => {
    const newEvent = {
      titre: title,
      description,
      date: { ...targetDate },
      importance,
      type,
      resolved: false,
      options: {
        effects: options?.effects || [],
        choices: options?.choices || []
      }
    };
    
    addEvenement(newEvent);
    
    // Standardiser la date pour l'affichage
    const standardizedDate = {
      year: targetDate.year,
      season: convertToStandardSeason(targetDate.season)
    };
    
    toast.success(`Événement programmé pour ${formatGameDate(standardizedDate)} : ${title}`);
    
    return title;
  };
  
  // Résoudre un événement avec un résultat donné
  const resolveEvent = (eventId: string, resolution: string) => {
    resolveEvenement(eventId, resolution);
    toast.success("Événement résolu");
  };
  
  // Vérifier s'il y a des événements non résolus avant d'avancer le temps
  const checkPendingEvents = (): boolean => {
    const hasPendingEvents = currentEvents.length > 0;
    
    if (hasPendingEvents) {
      toast.warning(
        "Événements non résolus", 
        { description: `Il y a ${currentEvents.length} événements non résolus dans la saison actuelle.` }
      );
    }
    
    return hasPendingEvents;
  };
  
  // Avancer le temps avec résolution automatique d'événements si nécessaire
  const advanceTimeWithEventCheck = () => {
    const hasPendingEvents = checkPendingEvents();
    
    if (hasPendingEvents) {
      // Résoudre automatiquement tous les événements en suspens
      currentEvents.forEach(event => {
        resolveEvenement(event.id, "Résolution automatique");
      });
    }
    
    advanceTime();
    
    // Notifier des nouveaux événements de la saison
    const newEvents = getUpcomingEvents();
    if (newEvents.length > 0) {
      toast.info(
        `${newEvents.length} événement(s) pour cette saison`, 
        { description: "Consultez la section événements pour plus de détails." }
      );
    }
  };
  
  return {
    currentEvents,
    resolvedEvents,
    upcomingEvents: getUpcomingEvents(),
    addCurrentEvent,
    scheduleEvent,
    resolveEvent,
    checkPendingEvents,
    advanceTimeWithEventCheck
  };
};
