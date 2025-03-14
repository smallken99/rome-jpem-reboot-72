
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Character } from '@/types/character';
import { useGameTime } from '@/hooks/useGameTime';
import { checkAllianceForBirths } from './birthUtils';
import { familyAlliances } from '@/data/alliances';
import { Season } from '@/utils/timeSystem';

// Add missing reverseSeasonMapping
const reverseSeasonMapping: Record<string, Season> = {
  'Printemps': 'Ver',
  'Été': 'Aestas',
  'Automne': 'Autumnus',
  'Hiver': 'Hiems',
  'Spring': 'Ver',
  'Summer': 'Aestas',
  'Autumn': 'Autumnus',
  'Winter': 'Hiems'
};

export const useAllianceBirths = (
  characters: Character[],
  onChildBirth?: (child: Character) => void
) => {
  const [lastBirthYear, setLastBirthYear] = useState<number>(0);
  const { toast } = useToast();
  
  // Obtenir l'heure actuelle depuis le store
  const gameTime = useGameTime();
  const playerSeason = gameTime.season;
  // Convertir la saison au format attendu
  const season: Season = reverseSeasonMapping[playerSeason] || "Ver";
  const year = gameTime.year;
  
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
      gameTime.advanceTime();
      // Vérifier les naissances lorsqu'une année change
      checkForBirths();
    }, 15000); // Faire avancer le temps toutes les 15 secondes
    
    return () => clearInterval(timeAdvanceInterval);
  }, [gameTime]);

  return {
    alliances: familyAlliances,
    lastBirthYear,
    activeAlliances
  };
};
