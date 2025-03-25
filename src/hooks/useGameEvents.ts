
import { useState, useEffect } from 'react';

// Définition locale de l'interface GameEvent
export interface GameEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  category: 'politique' | 'économie' | 'militaire' | 'social' | 'familial' | 'religieux';
  impact: 'positive' | 'negative' | 'neutral';
  severity: 1 | 2 | 3 | 4 | 5;
  read: boolean;
  actions?: {
    label: string;
    effect: string;
    onClick: () => void;
  }[];
}

export const useGameEvents = () => {
  const [events, setEvents] = useState<GameEvent[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  
  // Fonction pour ajouter un nouvel événement
  const addEvent = (newEvent: Omit<GameEvent, 'id' | 'read'>) => {
    const event: GameEvent = {
      id: `event-${Date.now()}`,
      read: false,
      ...newEvent
    };
    
    setEvents(prev => [event, ...prev]);
    setUnreadCount(prev => prev + 1);
    
    return event.id;
  };
  
  // Fonction pour marquer un événement comme lu
  const markAsRead = (eventId: string) => {
    setEvents(prev => 
      prev.map(event => 
        event.id === eventId && !event.read 
          ? { ...event, read: true } 
          : event
      )
    );
    
    // Mettre à jour le compteur d'événements non lus
    const wasUnread = events.find(e => e.id === eventId && !e.read);
    if (wasUnread) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };
  
  // Fonction pour marquer tous les événements comme lus
  const markAllAsRead = () => {
    setEvents(prev => prev.map(event => ({ ...event, read: true })));
    setUnreadCount(0);
  };
  
  // Fonction pour supprimer un événement
  const deleteEvent = (eventId: string) => {
    const eventToDelete = events.find(e => e.id === eventId);
    setEvents(prev => prev.filter(event => event.id !== eventId));
    
    // Mettre à jour le compteur d'événements non lus si nécessaire
    if (eventToDelete && !eventToDelete.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };
  
  // Fonction pour obtenir les événements filtrés
  const getFilteredEvents = (
    category?: string, 
    readStatus?: boolean, 
    limit?: number
  ) => {
    let filteredEvents = [...events];
    
    if (category) {
      filteredEvents = filteredEvents.filter(e => e.category === category);
    }
    
    if (readStatus !== undefined) {
      filteredEvents = filteredEvents.filter(e => e.read === readStatus);
    }
    
    // Trier par date (les plus récents d'abord)
    filteredEvents.sort((a, b) => b.date.getTime() - a.date.getTime());
    
    // Limiter le nombre de résultats si nécessaire
    if (limit && limit > 0) {
      filteredEvents = filteredEvents.slice(0, limit);
    }
    
    return filteredEvents;
  };
  
  // Générer quelques événements fictifs pour la démo
  useEffect(() => {
    if (events.length === 0) {
      const demoEvents: Omit<GameEvent, 'id' | 'read'>[] = [
        {
          title: "Campagne électorale pour le poste de questeur",
          description: "Votre candidature au poste de questeur a été acceptée. La campagne électorale commence.",
          date: new Date(),
          category: 'politique',
          impact: 'neutral',
          severity: 3,
          actions: [
            {
              label: "Organiser un banquet public",
              effect: "Augmente votre popularité mais coûte 5000 As",
              onClick: () => console.log("Banquet organisé")
            },
            {
              label: "Faire un discours au forum",
              effect: "Augmente légèrement votre popularité",
              onClick: () => console.log("Discours effectué")
            }
          ]
        },
        {
          title: "Mauvaise récolte dans vos domaines",
          description: "La récolte de cette année a été mauvaise. Vos revenus agricoles sont réduits de 30%.",
          date: new Date(Date.now() - 86400000), // Hier
          category: 'économie',
          impact: 'negative',
          severity: 2
        }
      ];
      
      demoEvents.forEach(event => addEvent(event));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return {
    events,
    unreadCount,
    addEvent,
    markAsRead,
    markAllAsRead,
    deleteEvent,
    getFilteredEvents
  };
};
