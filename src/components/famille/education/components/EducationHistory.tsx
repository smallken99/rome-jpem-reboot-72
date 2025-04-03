
import React from 'react';
import { Character } from '@/types/character';
import { Timeline, TimelineItem, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@/components/ui-custom/Timeline';

interface EducationHistoryProps {
  character: Character;
}

export const EducationHistory: React.FC<EducationHistoryProps> = ({ character }) => {
  // Si pas d'éducation, afficher un message
  if (!character.education && !character.currentEducation) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Aucun historique d'éducation disponible</p>
      </div>
    );
  }
  
  // Créer des événements fictifs pour l'historique
  const startYear = Math.max(1, character.age - (character.currentEducation?.yearsCompleted || 0) - 4);
  
  const events = [
    { year: startYear, event: "Début de l'éducation de base", completed: true },
    { year: startYear + 2, event: "Apprentissage des lettres", completed: true },
    { year: startYear + 4, event: "Initiation aux arts romains", completed: true }
  ];
  
  // Ajouter l'éducation actuelle ou complétée
  if (character.education?.type) {
    events.push({ 
      year: character.age - 1, 
      event: `Fin de l'éducation ${character.education.type}`, 
      completed: true 
    });
  } else if (character.currentEducation) {
    events.push({ 
      year: character.age, 
      event: `En cours: Éducation ${character.currentEducation.type}`, 
      completed: false 
    });
  }
  
  return (
    <div className="py-2">
      <Timeline position="alternate">
        {events.map((event, index) => (
          <TimelineItem key={index}>
            <TimelineOppositeContent>
              An {event.year}
            </TimelineOppositeContent>
            <TimelineDot color={event.completed ? "success" : "info"} />
            {index < events.length - 1 && <TimelineConnector />}
            <TimelineContent>
              <div className="bg-card p-3 rounded shadow-sm">
                {event.event}
              </div>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
};
