
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Character } from '@/types/character';
import { useTimeStore } from '@/utils/timeSystem';
import { checkAllianceForBirths } from './birthUtils';
import { familyAlliances } from '@/data/alliances';

export const useAllianceBirths = (
  characters: Character[],
  onChildBirth?: (child: Character) => void
) => {
  const [lastBirthYear, setLastBirthYear] = useState<number>(0);
  const { toast } = useToast();
  
  // Get current time from the store
  const timeStore = useTimeStore();
  const { season } = timeStore;
  const year = timeStore.getYear();
  
  // Filter alliances to only show active ones
  const activeAlliances = familyAlliances.filter(alliance => alliance.status === 'actif');
  
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

  // Set up time advancement (for demonstration)
  useEffect(() => {
    // For demo purposes, we're advancing time every 15 seconds
    // In a real game, this might be tied to game actions or a play/pause system
    const timeAdvanceInterval = setInterval(() => {
      timeStore.advanceTime();
      // Check for births when a year changes
      checkForBirths();
    }, 15000); // Advance time every 15 seconds
    
    return () => clearInterval(timeAdvanceInterval);
  }, [timeStore]);

  return {
    alliances: familyAlliances,
    lastBirthYear,
    activeAlliances
  };
};
