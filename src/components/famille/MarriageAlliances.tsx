
import React, { useState } from 'react';
import { AllianceItem } from '../features/AllianceItem';
import { Button } from '@/components/ui/button';
import { Baby, Calendar } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { checkForBirth, generateChild } from './utils/birthSystem';
import { Character } from '@/types/character';

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
  const [yearsPassed, setYearsPassed] = useState<number>(0);
  const { toast } = useToast();
  
  // Filter alliances to only show active ones
  const activeAlliances = alliances.filter(alliance => alliance.status === 'actif');
  
  // Function to simulate the passage of time and check for births
  const simulateYear = () => {
    // Increment years passed
    setYearsPassed(prev => prev + 1);
    
    // Check each active alliance for potential births
    activeAlliances.forEach(alliance => {
      // Find the characters in this alliance
      const husband = characters.find(char => char.name === alliance.member);
      const wife = characters.find(char => char.name === alliance.spouse);
      
      if (husband && wife) {
        // Check if a birth occurs
        if (checkForBirth(wife)) {
          // Generate a child
          const newChild = generateChild(husband, wife);
          
          // Update the parent component about the new child
          if (onChildBirth) {
            onChildBirth(newChild);
          }
          
          // Update the last birth year
          setLastBirthYear(yearsPassed);
          
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
  
  return (
    <div className="marriage-alliances">
      <div className="p-4 mb-4 bg-rome-parchment/50 rounded-md">
        <p className="italic text-muted-foreground">
          Les alliances matrimoniales sont essentielles pour étendre l'influence de votre Gens.
          Elles sont gérées automatiquement par les familles nobles selon les traditions romaines.
        </p>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-muted-foreground flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>Années simulées: {yearsPassed}</span>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={simulateYear}
          className="text-xs border-rome-navy/30 hover:bg-rome-navy/10"
        >
          Simuler un an
        </Button>
      </div>
      
      {lastBirthYear > 0 && (
        <div className="p-2 mb-4 bg-blue-50 rounded-md flex items-center gap-2 text-sm text-blue-700">
          <Baby className="h-4 w-4" />
          <span>Dernière naissance: il y a {yearsPassed - lastBirthYear} an(s)</span>
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
