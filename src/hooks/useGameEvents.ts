
import { useState, useCallback } from 'react';
import { useMaitreJeu } from '@/components/maitrejeu/context';
import { formatGameDate, Season } from '@/utils/timeSystem';
import { EvenementType, toEvenementType } from '@/utils/gameEventTypes';
import { toast } from 'sonner';

// Types locaux pour les événements
export type PlayerSeason = 'Ver' | 'Aestas' | 'Autumnus' | 'Hiems';

export const useGameEvents = () => {
  const { 
    currentDate,
    currentPhase,
    addEvenement,
    resolveEvenement,
    evenements
  } = useMaitreJeu();
  
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  
  // Récupérer les événements actifs (non résolus)
  const activeEvents = evenements?.filter(event => !event.resolved) || [];
  
  // Récupérer les événements résolus
  const pastEvents = evenements?.filter(event => event.resolved) || [];
  
  // Filtre les événements par saison et année
  const filterEventsBySeason = useCallback((events: any[], season: PlayerSeason, year: number) => {
    return events.filter(event => {
      return event.date?.season === season && event.date?.year === year;
    });
  }, []);
  
  // Vérifie s'il y a des événements pour une date spécifique
  const hasEventsForDate = useCallback((season: PlayerSeason, year: number) => {
    return activeEvents.some(event => 
      event.date?.season === season && event.date?.year === year
    );
  }, [activeEvents]);
  
  // Formate les événements pour l'affichage
  const formatEvent = useCallback((event: any) => {
    const formattedDate = event.date 
      ? formatGameDate({ year: event.date.year, season: event.date.season })
      : 'Date inconnue';
      
    return {
      ...event,
      formattedDate
    };
  }, []);
  
  // Sélectionne un événement pour l'affichage détaillé
  const selectEvent = useCallback((event: any) => {
    setSelectedEvent(formatEvent(event));
    setShowModal(true);
  }, [formatEvent]);
  
  // Crée un nouvel événement politique
  const createPoliticalEvent = useCallback(() => {
    // Événement politique pour l'année suivante
    const nextYear = currentDate.year;
    const nextSeason = currentDate.season as Season;
    
    addEvenement({
      titre: "Débat au Sénat",
      description: "Un débat important concernant les politiques de la République aura lieu au Sénat.",
      date: {
        year: nextYear,
        season: nextSeason
      },
      importance: ['politique', 'général'],
      type: toEvenementType('politique'),
      resolved: false,
      options: {
        effects: [
          "Influence sur l'équilibre des factions",
          "Répercussions sur les prochaines élections"
        ],
        choices: [
          {
            text: "Participer activement au débat",
            outcome: "Votre participation active augmente votre visibilité politique."
          },
          {
            text: "Observer discrètement",
            outcome: "Vous restez informé sans vous exposer politiquement."
          }
        ]
      }
    });
    
    toast.success("Événement politique créé pour la prochaine saison");
  }, [addEvenement, currentDate]);
  
  // Crée un nouvel événement social
  const createSocialEvent = useCallback(() => {
    // Événement social pour la date actuelle
    addEvenement({
      titre: "Banquet chez un patricien",
      description: "Un important patricien organise un banquet somptueux auquel vous êtes convié.",
      date: {
        year: currentDate.year,
        season: currentDate.season as Season
      },
      importance: ['social', 'réseau'],
      type: toEvenementType('social'),
      resolved: false,
      options: {
        effects: [
          "Nouvelles connexions sociales",
          "Possibilité d'alliance familiale"
        ],
        choices: [
          {
            text: "Assister au banquet",
            outcome: "Vous renforcez vos relations avec d'autres familles influentes."
          },
          {
            text: "Décliner l'invitation",
            outcome: "Vous manquez une opportunité sociale mais préservez votre temps."
          }
        ]
      }
    });
    
    toast.success("Événement social créé");
  }, [addEvenement, currentDate]);
  
  // Résout un événement avec une option choisie
  const resolveEvent = useCallback((eventId: string, optionId: string) => {
    resolveEvenement(eventId, optionId);
    setShowModal(false);
    toast.success("Événement résolu");
  }, [resolveEvenement]);
  
  return {
    activeEvents,
    pastEvents,
    filterEventsBySeason,
    hasEventsForDate,
    formatEvent,
    selectEvent,
    selectedEvent,
    showModal,
    setShowModal,
    createPoliticalEvent,
    createSocialEvent,
    resolveEvent
  };
};
