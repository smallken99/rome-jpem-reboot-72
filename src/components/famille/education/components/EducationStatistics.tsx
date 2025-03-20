
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Child, EducationType } from '../types/educationTypes';
import { useEducation } from '../context/EducationContext';
import { CharacterStats } from '../../CharacterStats';
import { CharacterStat } from '@/types/character';

interface EducationStatisticsProps {
  child: Child;
}

export const EducationStatistics: React.FC<EducationStatisticsProps> = ({ child }) => {
  const { findEducationPathById } = useEducation();
  
  // Fonction pour obtenir le bonus statistique basé sur le type d'éducation
  const getEducationBonus = (type: EducationType): { stat: string, bonus: number } => {
    const path = findEducationPathById(type);
    
    if (!path) {
      return { stat: 'popularity', bonus: 0 };
    }
    
    const relatedStat = path.relatedStat || 'popularity';
    const bonus = path.statBonus || (child.progress >= 100 ? 25 : Math.floor(child.progress / 4));
    
    return { stat: relatedStat, bonus };
  };
  
  // Si l'enfant n'a pas d'éducation, ne rien afficher
  if (child.educationType === 'none' || !child.educationType) {
    return (
      <Card>
        <CardContent className="p-4">
          <p className="text-muted-foreground">
            Aucune statistique à afficher. L'enfant n'a pas encore commencé d'éducation.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  // Calculer les bonus d'éducation
  const { stat, bonus } = getEducationBonus(child.educationType);
  
  // Créer les statistiques de base de l'enfant
  const childStats: CharacterStat[] = [
    {
      name: 'Popularité',
      value: 10,
      maxValue: 100,
      icon: 'popularity',
      description: 'Influence auprès du peuple et des citoyens romains',
      color: 'blue'
    },
    {
      name: 'Éloquence',
      value: child.educationType === 'rhetoric' ? bonus : 5,
      maxValue: 100,
      icon: 'oratory',
      description: 'Art de la persuasion et capacité à s\'exprimer en public',
      color: 'green'
    },
    {
      name: 'Piété',
      value: child.educationType === 'religious' ? bonus : 5,
      maxValue: 100,
      icon: 'piety',
      description: 'Respect et dévotion envers les dieux de Rome',
      color: 'purple'
    },
    {
      name: 'Éducation Martiale',
      value: child.educationType === 'military' ? bonus : 5,
      maxValue: 100,
      icon: 'martialEducation',
      description: 'Maîtrise des arts militaires et de la stratégie',
      color: 'red'
    }
  ];
  
  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <h3 className="font-semibold">Statistiques d'éducation</h3>
        
        <CharacterStats 
          stats={childStats} 
          isFemale={child.gender === 'female'} 
        />
        
        <div className="text-sm text-muted-foreground">
          <p className="mb-1">
            <strong>L'éducation {child.educationType} a un impact direct sur:</strong>
          </p>
          <ul className="list-disc pl-5">
            {child.educationType === 'military' && (
              <>
                <li>Éducation martiale (+{bonus} points)</li>
                <li>Prestige parmi les soldats</li>
                <li>Capacités de commandement</li>
              </>
            )}
            {child.educationType === 'rhetoric' && (
              <>
                <li>Éloquence (+{bonus} points)</li>
                <li>Popularité auprès des citoyens</li>
                <li>Capacités de négociation</li>
              </>
            )}
            {child.educationType === 'religious' && (
              <>
                <li>Piété (+{bonus} points)</li>
                <li>Respect des prêtres</li>
                <li>Capacité à interpréter les présages</li>
              </>
            )}
            {child.educationType === 'academic' && (
              <>
                <li>Intelligence (+{bonus} points)</li>
                <li>Respect des intellectuels</li>
                <li>Capacités d'analyse</li>
              </>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
