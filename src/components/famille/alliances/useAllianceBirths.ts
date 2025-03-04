
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Character } from '@/types/character';
import { useTimeStore, useTimeEvents } from '@/utils/timeSystem';
import { checkAllianceForBirths } from './birthUtils';

// Alliance data that matches the characters data
const alliances = [
  {
    id: '1',
    name: 'Gens Cornelia',
    member: 'Marcus Aurelius Cotta',
    spouse: 'Livia Aurelia',
    type: 'matrimoniale' as const,
    status: 'actif' as const,
    benefits: ['Stabilité familiale', 'Gestion du patrimoine'],
    date: '705 AUC'
  },
  {
    id: '2',
    name: 'Gens Fabia',
    member: 'Julia Aurelia',
    spouse: 'Quintus Fabius',
    type: 'matrimoniale' as const,
    status: 'en négociation' as const,
    benefits: ['Soutien militaire', 'Accès aux ports'],
    date: '710 AUC (prévu)'
  }
];

export const useAllianceBirths = (
  characters: Character[],
  onChildBirth?: (child: Character) => void
) => {
  const [lastBirthYear, setLastBirthYear] = useState<number>(0);
  const { toast } = useToast();
  
  // Get current time from the store
  const { year, season } = useTimeStore();
  
  // Filter alliances to only show active ones
  const activeAlliances = alliances.filter(alliance => alliance.status === 'actif');
  
  // Function to check for births
  const checkForBirths = () => {
    // Check each active alliance for potential births
    activeAlliances.forEach(alliance => {
      const birthOccurred = checkAllianceForBirths(
        alliance,
        characters,
        season,
        year,
        (newChild) => {
          // Update the parent component about the new child
          if (onChildBirth) {
            onChildBirth(newChild);
          }
          
          // Show a toast notification
          toast({
            title: "Une naissance dans la famille!",
            description: `${alliance.spouse} a donné naissance à ${newChild.name}.`,
            duration: 5000,
          });
        },
        (birthYear) => {
          // Update the last birth year
          setLastBirthYear(birthYear);
        }
      );
    });
  };

  // Set up time event listeners
  const { advanceTime } = useTimeEvents(
    undefined, // No special day event
    undefined, // No special season event
    () => {
      // Year change event - check for births
      checkForBirths();
    }
  );

  // Set up automatic time advancement (for demonstration)
  useEffect(() => {
    // For demo purposes, we're advancing time every 15 seconds
    // In a real game, this might be tied to game actions or a play/pause system
    const timeAdvanceInterval = setInterval(() => {
      advanceTime();
    }, 15000); // Advance time every 15 seconds
    
    return () => clearInterval(timeAdvanceInterval);
  }, [advanceTime]);

  return {
    alliances,
    lastBirthYear,
    activeAlliances
  };
};
