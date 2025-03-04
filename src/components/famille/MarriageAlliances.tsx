
import React, { useState, useEffect } from 'react';
import { AllianceItem } from '../features/AllianceItem';
import { Baby, Calendar, Clock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { checkForBirth, generateChild } from './utils/birthSystem';
import { Character } from '@/types/character';
import { useTimeStore, useTimeEvents } from '@/utils/timeSystem';

// Marriage alliances data that matches the characters data
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

interface MarriageAlliancesProps {
  characters: Character[];
  onChildBirth?: (child: Character) => void;
}

export const MarriageAlliances: React.FC<MarriageAlliancesProps> = ({ 
  characters, 
  onChildBirth 
}) => {
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
      // Find the characters in this alliance
      const husband = characters.find(char => char.name === alliance.member);
      const wife = characters.find(char => char.name === alliance.spouse);
      
      if (husband && wife) {
        // Check if a birth occurs, passing the current season
        if (checkForBirth(wife, season)) {
          // Generate a child
          const newChild = generateChild(husband, wife);
          
          // Update the parent component about the new child
          if (onChildBirth) {
            onChildBirth(newChild);
          }
          
          // Update the last birth year
          setLastBirthYear(year);
          
          // Show a toast notification
          toast({
            title: "Une naissance dans la famille!",
            description: `${wife.name} a donné naissance à ${newChild.name}.`,
            duration: 5000,
          });
        }
      }
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
  
  return (
    <div className="marriage-alliances">
      <div className="p-4 mb-4 bg-rome-parchment/50 rounded-md">
        <p className="italic text-muted-foreground">
          Les alliances matrimoniales sont essentielles pour étendre l'influence de votre Gens.
          Elles sont gérées automatiquement par les familles nobles selon les traditions romaines.
        </p>
      </div>
      
      {lastBirthYear > 0 && (
        <div className="p-2 mb-4 bg-blue-50 rounded-md flex items-center gap-2 text-sm text-blue-700">
          <Baby className="h-4 w-4" />
          <span>Dernière naissance: {year - lastBirthYear} an(s)</span>
        </div>
      )}
      
      <div className="space-y-4">
        {activeAlliances.map(alliance => (
          <div key={alliance.id} className="border rounded-md overflow-hidden">
            <div className="p-3 border-b bg-muted/30">
              <div className="flex items-center gap-2">
                <h3 className="font-cinzel">{alliance.member}</h3>
                <span className="text-rome-terracotta">♥</span>
                <h3 className="font-cinzel">{alliance.spouse}</h3>
              </div>
              <div className="text-sm text-muted-foreground">
                {alliance.date}
              </div>
            </div>
            
            <AllianceItem
              name={alliance.name}
              type={alliance.type}
              status={alliance.status}
              benefits={alliance.benefits}
            />
          </div>
        ))}
      </div>
      
      {activeAlliances.length === 0 && (
        <div className="text-center p-4 text-muted-foreground italic">
          Aucune alliance active pour le moment.
        </div>
      )}
    </div>
  );
};
