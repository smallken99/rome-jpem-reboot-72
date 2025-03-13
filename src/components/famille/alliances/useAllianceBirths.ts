
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Character } from '@/types/character';
import { useTimeStore, type Season } from '@/utils/timeSystem';
import { checkAllianceForBirths } from './birthUtils';
import { familyAlliances } from '@/data/alliances';

export const useAllianceBirths = (
  characters: Character[],
  onChildBirth?: (child: Character) => void
) => {
  const [lastBirthYear, setLastBirthYear] = useState<number>(0);
  const { toast } = useToast();
  
  // Obtenir l'heure actuelle depuis le store
  const timeStore = useTimeStore();
  const { season } = timeStore;
  const year = timeStore.getYear();
  
  // Filtrer les alliances pour n'afficher que les actives
  const activeAlliances = familyAlliances.filter(alliance => alliance.status === 'actif');
  
  // Fonction pour vérifier les naissances
  const checkForBirths = () => {
    // Vérifier chaque alliance active pour des naissances potentielles
    activeAlliances.forEach(alliance => {
      const birthOccurred = checkAllianceForBirths(
        alliance,
        characters,
        season,
        year,
        (newChild) => {
          // Mettre à jour le composant parent à propos du nouvel enfant
          if (onChildBirth) {
            onChildBirth(newChild);
          }
          
          // Afficher une notification toast
          toast({
            title: "Une naissance dans la famille!",
            description: `${alliance.spouse} a donné naissance à ${newChild.name}.`,
            duration: 5000,
          });
        },
        (birthYear) => {
          // Mettre à jour l'année de dernière naissance
          setLastBirthYear(birthYear);
        }
      );
    });
  };

  // Configurer l'avancement du temps (pour démonstration)
  useEffect(() => {
    // À des fins de démonstration, nous avançons le temps toutes les 15 secondes
    // Dans un vrai jeu, cela pourrait être lié aux actions du jeu ou à un système de lecture/pause
    const timeAdvanceInterval = setInterval(() => {
      timeStore.advanceTime();
      // Vérifier les naissances lorsqu'une année change
      checkForBirths();
    }, 15000); // Faire avancer le temps toutes les 15 secondes
    
    return () => clearInterval(timeAdvanceInterval);
  }, [timeStore]);

  return {
    alliances: familyAlliances,
    lastBirthYear,
    activeAlliances
  };
};
