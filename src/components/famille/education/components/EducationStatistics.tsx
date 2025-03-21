
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Child, EducationType } from '../types/educationTypes';
import { useEducation } from '../context/EducationContext';
import { CharacterStats } from '../../CharacterStats';
import { CharacterStat } from '@/types/character';
import { GraduationCap, BookOpen, Activity, Award, History } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

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
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <GraduationCap className="h-5 w-5 mr-2 text-muted-foreground" />
            Statistiques d'éducation
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex flex-col items-center justify-center text-center py-6">
            <BookOpen className="h-10 w-10 text-muted-foreground mb-3" />
            <p className="text-muted-foreground">
              Aucune statistique à afficher. L'enfant n'a pas encore commencé d'éducation.
            </p>
            <div className="mt-3 text-xs text-muted-foreground">
              Commencez une éducation pour voir les statistiques et compétences acquises
            </div>
          </div>
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
      value: child.educationType === 'rhetoric' ? Math.min(30, 10 + Math.floor(bonus / 2)) : 10,
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

  // Déterminer les compétences acquises en fonction du type d'éducation
  const getAcquiredSkills = () => {
    const progress = child.progress;
    
    if (child.educationType === 'military') {
      return [
        { name: "Discipline", acquired: progress >= 25 },
        { name: "Tactique de base", acquired: progress >= 50 },
        { name: "Commandement", acquired: progress >= 75 },
        { name: "Stratégie militaire", acquired: progress >= 100 }
      ];
    }
    
    if (child.educationType === 'rhetoric') {
      return [
        { name: "Élocution", acquired: progress >= 25 },
        { name: "Argumentation", acquired: progress >= 50 },
        { name: "Débat public", acquired: progress >= 75 },
        { name: "Éloquence politique", acquired: progress >= 100 }
      ];
    }
    
    if (child.educationType === 'religious') {
      return [
        { name: "Rituels de base", acquired: progress >= 25 },
        { name: "Interprétation des présages", acquired: progress >= 50 },
        { name: "Connaissance des dieux", acquired: progress >= 75 },
        { name: "Présidence de cérémonies", acquired: progress >= 100 }
      ];
    }
    
    return [
        { name: "Histoire de Rome", acquired: progress >= 25 },
        { name: "Philosophie", acquired: progress >= 50 },
        { name: "Mathématiques", acquired: progress >= 75 },
        { name: "Sciences naturelles", acquired: progress >= 100 }
    ];
  };
  
  const acquiredSkills = getAcquiredSkills();
  
  return (
    <Card className="animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
          Statistiques d'éducation
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-6">
        <CharacterStats 
          stats={childStats} 
          isFemale={child.gender === 'female'} 
        />
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-sm flex items-center">
              <Award className="h-4 w-4 mr-1 text-amber-500" />
              Compétences acquises
            </h4>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              {acquiredSkills.filter(s => s.acquired).length}/{acquiredSkills.length}
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {acquiredSkills.map((skill, index) => (
              <div 
                key={index} 
                className={`flex items-center p-2 rounded border ${
                  skill.acquired 
                    ? 'bg-green-50 border-green-100 text-green-700' 
                    : 'bg-slate-50 border-slate-100 text-slate-500'
                }`}
              >
                <Activity className={`h-3.5 w-3.5 mr-1.5 ${skill.acquired ? 'text-green-500' : 'text-slate-400'}`} />
                <span className="text-xs">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-sm bg-blue-50 p-3 rounded-md border border-blue-100">
          <h4 className="font-medium text-blue-700 mb-1.5 flex items-center">
            <History className="h-4 w-4 mr-1" />
            Impact de l'éducation {child.educationType === 'military' ? 'militaire' : 
              child.educationType === 'rhetoric' ? 'rhétorique' : 
              child.educationType === 'religious' ? 'religieuse' : 'académique'}
          </h4>
          <ul className="list-disc pl-5 text-xs text-blue-600 space-y-1">
            {child.educationType === 'military' && (
              <>
                <li>Éducation martiale (+{bonus} points)</li>
                <li>Prestige parmi les soldats</li>
                <li>Capacités de commandement</li>
                <li>Aptitude à devenir général</li>
              </>
            )}
            {child.educationType === 'rhetoric' && (
              <>
                <li>Éloquence (+{bonus} points)</li>
                <li>Popularité auprès des citoyens (+{Math.floor(bonus/2)} points)</li>
                <li>Capacités de négociation</li>
                <li>Aptitude politique</li>
              </>
            )}
            {child.educationType === 'religious' && (
              <>
                <li>Piété (+{bonus} points)</li>
                <li>Respect des prêtres</li>
                <li>Capacité à interpréter les présages</li>
                <li>Aptitude aux fonctions sacerdotales</li>
              </>
            )}
            {child.educationType === 'academic' && (
              <>
                <li>Intelligence (+{bonus} points)</li>
                <li>Respect des intellectuels</li>
                <li>Capacités d'analyse</li>
                <li>Aptitude à la gestion et à l'administration</li>
              </>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
