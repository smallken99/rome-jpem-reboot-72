
import React from 'react';
import { Sword, Building, ScrollText, ShieldQuestion, Heart, BookOpen, CalendarDays, Award } from 'lucide-react';
import { Coins } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

interface ChildEducation {
  type: string;
  mentor: string | null;
  progress: number;
  skills: string[];
  pityBonus?: number; // Optional pity bonus field
  yearsCompleted?: number; // Number of years completed in current education
  totalYears?: number; // Total years required for this education path
  statBonus?: number; // Add stat bonus field that will be applied on completion
}

interface ChildProps {
  id: string;
  name: string;
  age: number;
  gender: string;
  currentEducation: ChildEducation;
}

interface ChildEducationCardProps {
  child: ChildProps;
}

export const ChildEducationCard: React.FC<ChildEducationCardProps> = ({ child }) => {
  const getEducationTypeIcon = (type: string) => {
    switch(type) {
      case 'military':
        return <Sword className="h-4 w-4" />;
      case 'political':
        return <Building className="h-4 w-4" />;
      case 'commercial':
        return <Coins className="h-4 w-4" />;
      case 'religious':
        return <ScrollText className="h-4 w-4" />;
      default:
        return <ShieldQuestion className="h-4 w-4" />;
    }
  };
  
  const getEducationTypeName = (type: string) => {
    switch(type) {
      case 'military':
        return 'Militaire';
      case 'political':
        return 'Politique';
      case 'commercial':
        return 'Commerce';
      case 'religious':
        return 'Religieuse';
      default:
        return 'Aucune';
    }
  };
  
  // Get the related stat name based on education type
  const getRelatedStatName = (type: string): string => {
    switch(type) {
      case 'military':
        return 'Éducation Martiale';
      case 'political':
        return 'Éloquence';
      case 'religious':
        return 'Piété';
      default:
        return 'Caractéristique';
    }
  };
  
  // Check if there's an invalid education assignment (military for females)
  const hasInvalidEducation = child.gender === 'female' && child.currentEducation.type === 'military';
  
  // Calculate the total progress including pity bonus if it exists
  const baseProgress = child.currentEducation.progress;
  const pityBonus = child.currentEducation.pityBonus || 0;
  const totalProgress = Math.min(baseProgress + pityBonus, 100); // Cap at 100%
  
  // Years information
  const yearsCompleted = child.currentEducation.yearsCompleted || 0;
  const totalYears = child.currentEducation.totalYears || 0;
  const yearProgress = totalYears > 0 ? (yearsCompleted / totalYears) * 100 : 0;
  
  // Stat bonus that will be applied upon completion
  const statBonus = child.currentEducation.statBonus || 0;
  
  return (
    <div className="roman-card p-4 hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-cinzel">{child.name}</h4>
          <p className="text-sm text-muted-foreground">
            {child.age} ans • {child.gender === 'male' ? 'Garçon' : 'Fille'}
          </p>
        </div>
        
        {child.currentEducation.type !== 'none' ? (
          <div className={`flex items-center gap-1 px-2 py-1 ${hasInvalidEducation ? 'bg-red-100 text-red-700' : 'bg-rome-navy/10'} rounded text-xs`}>
            {getEducationTypeIcon(child.currentEducation.type)}
            <span>{getEducationTypeName(child.currentEducation.type)}</span>
            {hasInvalidEducation && <span className="text-xs text-red-600 ml-1">⚠️</span>}
          </div>
        ) : (
          <div className="px-2 py-1 bg-muted rounded text-xs">
            Pas d'éducation
          </div>
        )}
      </div>
      
      {child.currentEducation.type !== 'none' && (
        <>
          {hasInvalidEducation && (
            <div className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded">
              Les femmes n'ont pas accès à l'éducation militaire dans la Rome antique.
            </div>
          )}
          
          {/* Add stat bonus information if available */}
          {statBonus > 0 && !hasInvalidEducation && (
            <div className="mt-2 flex items-center gap-1 text-xs bg-green-50 p-2 rounded text-green-700">
              <Award className="h-3 w-3" />
              <span>À la validation: +{statBonus} en {getRelatedStatName(child.currentEducation.type)}</span>
            </div>
          )}
          
          {/* Annual progress */}
          <div className="mt-3">
            <div className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <CalendarDays className="h-3 w-3" />
                Progression annuelle:
              </p>
              <p className="text-xs font-medium">
                {yearsCompleted} / {totalYears} années
              </p>
            </div>
            <Progress value={yearProgress} className="h-2 mt-1" />
          </div>
          
          {/* Skill progression */}
          <div className="mt-3">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <BookOpen className="h-3 w-3" />
              Maîtrise des compétences:
            </p>
            <div className="mt-1 h-2 bg-muted rounded-full">
              <div 
                className={`h-full ${hasInvalidEducation ? 'bg-red-400' : 'bg-rome-terracotta'} rounded-full`}
                style={{ width: `${totalProgress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span>Débutant</span>
              <span>{baseProgress}%{pityBonus > 0 && <span className="text-green-600"> (+{pityBonus}% piété)</span>}</span>
              <span>Maître</span>
            </div>
          </div>
          
          {pityBonus > 0 && (
            <div className="mt-2 flex items-center gap-1 text-xs text-green-600 bg-green-50 p-2 rounded">
              <Heart className="h-3 w-3" />
              <span>Bonus de piété: +{pityBonus}% de progression</span>
            </div>
          )}
          
          <Separator className="my-3" />
          
          <div className="mt-2">
            <p className="text-xs text-muted-foreground">Précepteur:</p>
            <p className="text-sm font-medium">{child.currentEducation.mentor}</p>
          </div>
          
          <div className="mt-3">
            <p className="text-xs text-muted-foreground">Compétences acquises:</p>
            <ul className="ml-5 list-disc text-xs mt-1">
              {child.currentEducation.skills.map((skill, idx) => (
                <li key={idx}>{skill}</li>
              ))}
            </ul>
          </div>
        </>
      )}
      
      <div className="mt-4 flex justify-end gap-2">
        {child.currentEducation.type !== 'none' && (
          <button className="roman-btn-outline text-xs bg-rome-navy/5 hover:bg-rome-navy/10">
            Changer de précepteur
          </button>
        )}
        <button className="roman-btn-outline text-xs">
          {child.currentEducation.type !== 'none' ? 'Modifier' : 'Assigner'}
        </button>
      </div>
    </div>
  );
};
