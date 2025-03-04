
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
  generateStatBonus
} from './education/preceptorUtils';

// Type for a preceptor (teacher)
type Preceptor = {
  id: string;
  name: string;
  speciality: string;
  reputation: 'Excellent' | 'Bon' | 'Moyen';
  fee: number;
  statBonus: number;
};

type PreceptorsByType = {
  [key: string]: Preceptor[];
};

// Constants for the education system
const MAX_STAT_VALUE_FROM_EDUCATION = 40;
const MAX_POPULARITY = 100; // Unlimited in practice, but we set a high cap

export const Education: React.FC = () => {
  const [activeTab, setActiveTab] = useState("current");
  const [preceptors, setPreceptors] = useState<PreceptorsByType>({});

  // Generate random preceptors for each education path
  const generatePreceptors = () => {
    const newPreceptors: PreceptorsByType = {};
    
    educationPaths.forEach(path => {
      const pathPreceptors: Preceptor[] = [];
      const numPreceptors = 5 + Math.floor(Math.random() * 3); // 5 to 7 preceptors per path
      
      for (let i = 0; i < numPreceptors; i++) {
        const title = generateTitle(path.type);
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
          statBonus
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
