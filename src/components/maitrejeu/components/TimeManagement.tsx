
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { seasonToFrench } from '@/utils/formatUtils';
import { GamePhase, Season, TimeManagementProps } from '../types/maitreJeuTypes';

export const TimeManagement: React.FC<TimeManagementProps> = ({ 
  currentYear, 
  currentSeason, 
  currentPhase,
  onAdvance, 
  onPhaseChange 
}) => {
  const phases: { value: GamePhase; label: string }[] = [
    { value: 'SETUP', label: 'Préparation' },
    { value: 'ELECTION', label: 'Élections' },
    { value: 'ACTION', label: 'Actions' },
    { value: 'SENAT', label: 'Sénat' },
    { value: 'EVENEMENT', label: 'Événements' },
    { value: 'ADMINISTRATION', label: 'Administration' }
  ];
  
  const handlePhaseChange = (newPhase: string) => {
    onPhaseChange(newPhase as GamePhase);
  };
  
  return (
    <div className="flex items-center space-x-4">
      <div className="text-sm font-medium">
        <span className="mr-2">Année: {currentYear} AUC</span>
        <span className="mr-2">Saison: {seasonToFrench(currentSeason)}</span>
      </div>
      
      <div className="flex items-center space-x-2">
        <Select
          value={currentPhase}
          onValueChange={handlePhaseChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Phase actuelle" />
          </SelectTrigger>
          <SelectContent>
            {phases.map((phase) => (
              <SelectItem key={phase.value} value={phase.value}>
                {phase.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Button 
          size="sm" 
          onClick={onAdvance}
          variant="outline"
        >
          Avancer
        </Button>
      </div>
    </div>
  );
};
