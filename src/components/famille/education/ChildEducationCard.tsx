
import React from 'react';
import { Sword, Building, ScrollText, ShieldQuestion } from 'lucide-react';
import { Coins } from 'lucide-react';

interface ChildEducation {
  type: string;
  mentor: string | null;
  progress: number;
  skills: string[];
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
          <div className="flex items-center gap-1 px-2 py-1 bg-rome-navy/10 rounded text-xs">
            {getEducationTypeIcon(child.currentEducation.type)}
            <span>{getEducationTypeName(child.currentEducation.type)}</span>
          </div>
        ) : (
          <div className="px-2 py-1 bg-muted rounded text-xs">
            Pas d'éducation
          </div>
        )}
      </div>
      
      {child.currentEducation.type !== 'none' && (
        <>
          <div className="mt-3">
            <p className="text-xs text-muted-foreground">Progression:</p>
            <div className="mt-1 h-2 bg-muted rounded-full">
              <div 
                className="h-full bg-rome-terracotta rounded-full" 
                style={{ width: `${child.currentEducation.progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span>Débutant</span>
              <span>{child.currentEducation.progress}%</span>
              <span>Maître</span>
            </div>
          </div>
          
          <div className="mt-3">
            <p className="text-xs text-muted-foreground">Mentor:</p>
            <p className="text-sm">{child.currentEducation.mentor}</p>
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
      
      <div className="mt-4 flex justify-end">
        <button className="roman-btn-outline text-xs">
          {child.currentEducation.type !== 'none' ? 'Modifier' : 'Assigner'}
        </button>
      </div>
    </div>
  );
};
