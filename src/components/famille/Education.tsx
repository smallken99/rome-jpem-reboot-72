
import React, { useState, useEffect } from 'react';
import { EducationIntro } from './education/EducationIntro';
import { EducationTabs } from './education/EducationTabs';
import { educationPaths } from './education/EducationData';
import { 
  generateRomanName, 
  generateSpeciality, 
  generateReputation, 
  generateFee, 
  generateTitle,
  generateStatBonus,
  generateGender
} from './education/preceptorUtils';
import { Preceptor, PreceptorsByType } from './education/types/educationTypes';
import { Character } from '@/types/character';

// Constants for the education system
const MAX_STAT_VALUE_FROM_EDUCATION = 40;
const MAX_POPULARITY = 100; // Unlimited in practice, but we set a high cap

interface EducationProps {
  characters?: Character[];
  onNameChange?: (characterId: string, newName: string) => void;
  onEducationChange?: (characterId: string, educationType: string, specialties: string[], mentor: string | null) => void;
}

export const Education: React.FC<EducationProps> = ({ 
  characters = [], 
  onNameChange,
  onEducationChange 
}) => {
  const [activeTab, setActiveTab] = useState("current");
  const [preceptors, setPreceptors] = useState<PreceptorsByType>({});

  // Filter out only children (characters under 18)
  const children = characters.filter(char => char.age < 18);

  // Generate random preceptors for each education path
  const generatePreceptors = () => {
    const newPreceptors: PreceptorsByType = {};
    
    educationPaths.forEach(path => {
      const pathPreceptors: Preceptor[] = [];
      // Générer plus de précepteurs (8-12 par type d'éducation)
      const numPreceptors = 8 + Math.floor(Math.random() * 5);
      
      for (let i = 0; i < numPreceptors; i++) {
        // Déterminer le genre selon le type d'éducation
        const gender = generateGender(path.type);
        const title = generateTitle(path.type, gender);
        const name = `${title} ${generateRomanName()}`;
        const speciality = generateSpeciality(path.type);
        const reputation = generateReputation();
        const fee = generateFee(reputation);
        
        // Generate stat bonus based on reputation, respecting the maximum allowed value
        let statBonus = generateStatBonus(reputation);
        
        // Apply maximum stat bonus cap based on path type
        if (path.type === 'political' || path.type === 'religious' || path.type === 'military') {
          // Ensure the bonus doesn't exceed the max value from education
          statBonus = Math.min(statBonus, MAX_STAT_VALUE_FROM_EDUCATION - 30); // Leaving room for growth
        }
        
        pathPreceptors.push({
          id: `${path.type}-${i}`,
          name,
          speciality,
          reputation,
          fee,
          statBonus,
          gender
        });
      }
      
      newPreceptors[path.type] = pathPreceptors;
    });
    
    setPreceptors(newPreceptors);
  };

  // Generate preceptors on initial load
  useEffect(() => {
    generatePreceptors();
  }, []);

  return (
    <div className="education">
      <EducationIntro />
      
      {/* Inheritance and education info box */}
      <div className="mb-6 p-4 bg-muted rounded text-sm">
        <p className="font-medium mb-1">Hérédité des caractéristiques:</p>
        <p>À la naissance, un personnage hérite d'un tiers des caractéristiques combinées de ses parents (divisées par 2).</p>
        <p className="mt-1">L'éducation permet ensuite d'augmenter ces caractéristiques jusqu'à un maximum de 40 (sauf pour la popularité qui est illimitée).</p>
        <p className="mt-1 italic">Les enfants peuvent maintenant enchaîner plusieurs formations pour améliorer leurs compétences.</p>
      </div>
      
      <EducationTabs 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        preceptors={preceptors} 
        refreshPreceptors={generatePreceptors} 
      />
    </div>
  );
};
