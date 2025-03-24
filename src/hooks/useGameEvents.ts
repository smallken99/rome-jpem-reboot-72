
import { useState, useCallback } from 'react';
import { GameEvent, EvenementAction, EvenementType, ImportanceType } from '@/components/maitrejeu/types/evenements';
import { Season } from '@/utils/timeSystem';
import { toEvenementType } from '@/utils/gameEventTypes';
import { toast } from 'sonner';

export const useGameEvents = () => {
  const [events, setEvents] = useState<GameEvent[]>([]);
  const [activeEvents, setActiveEvents] = useState<GameEvent[]>([]);
  const [historicalEvents, setHistoricalEvents] = useState<GameEvent[]>([]);
  
  // Créer un nouvel événement
  const createEvent = useCallback((event: Omit<GameEvent, 'id'>) => {
    const id = `event-${Date.now()}`;
    const newEvent: GameEvent = {
      ...event,
      id
    };
    
    setEvents(prev => [...prev, newEvent]);
    setActiveEvents(prev => [...prev, newEvent]);
    
    return id;
  }, []);
  
  // Résoudre un événement
  const resolveEvent = useCallback((eventId: string, resolution: string) => {
    setEvents(prev => 
      prev.map(event => 
        event.id === eventId 
          ? { ...event, resolved: true, resolution } 
          : event
      )
    );
    
    setActiveEvents(prev => prev.filter(event => event.id !== eventId));
    setHistoricalEvents(prev => [
      ...prev,
      { 
        ...events.find(e => e.id === eventId)!,
        resolved: true,
        resolution
      }
    ]);
    
    toast.success('Événement résolu');
  }, [events]);
  
  // Générer des événements aléatoires pour une saison
  const generateEventsForSeason = useCallback((season: Season, year: number) => {
    // Exemple d'événement politique
    const politicalEvent: GameEvent = {
      id: `event-${Date.now()}-1`,
      title: 'Proposition de loi agraire',
      description: 'Une nouvelle loi agraire est proposée par le tribun de la plèbe',
      importance: ['SENAT', 'POLITIQUE'],
      type: 'POLITIQUE' as EvenementType,
      season,
      year,
      actions: [
        {
          label: 'Soutenir',
          consequence: 'Augmente votre popularité auprès de la plèbe mais irrite les patriciens'
        },
        {
          label: 'S\'opposer',
          consequence: 'Maintient le soutien des patriciens mais diminue votre popularité'
        }
      ],
      resolved: false
    };
    
    // Exemple d'événement économique
    const economicEvent: GameEvent = {
      id: `event-${Date.now()}-2`,
      title: 'Fluctuation des prix du grain',
      description: 'Les prix du grain ont considérablement augmenté suite à une mauvaise récolte',
      importance: ['ECONOMIE', 'POPULATION'],
      type: 'ECONOMIQUE' as EvenementType,
      season,
      year,
      actions: [
        {
          label: 'Subventionner les importations',
          consequence: 'Coûteux pour le trésor mais populaire auprès du peuple'
        },
        {
          label: 'Laisser le marché s\'ajuster',
          consequence: 'Économise de l\'argent mais risque de mécontentement'
        }
      ],
      resolved: false
    };
    
    setEvents(prev => [...prev, politicalEvent, economicEvent]);
    setActiveEvents(prev => [...prev, politicalEvent, economicEvent]);
    
    return [politicalEvent.id, economicEvent.id];
  }, []);
  
  // Supprimer un événement
  const deleteEvent = useCallback((eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
    setActiveEvents(prev => prev.filter(event => event.id !== eventId));
    setHistoricalEvents(prev => prev.filter(event => event.id !== eventId));
    
    toast.info('Événement supprimé');
  }, []);
  
  return {
    events,
    activeEvents,
    historicalEvents,
    createEvent,
    resolveEvent,
    generateEventsForSeason,
    deleteEvent
  };
};
