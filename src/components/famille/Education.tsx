
import React, { useState, useEffect } from 'react';
import { EducationIntro } from './education/EducationIntro';
import { EducationTabs } from './education/EducationTabs';
import { educationPaths } from './education/EducationData';
import { 
  generateRomanName, 
  generateSpeciality, 
  generateReputation, 
  generateFee, 
  generateTitle 
} from './education/preceptorUtils';

// Type for a preceptor (teacher)
type Preceptor = {
  id: string;
  name: string;
  speciality: string;
  reputation: 'Excellent' | 'Bon' | 'Moyen';
  fee: number;
};

type PreceptorsByType = {
  [key: string]: Preceptor[];
};

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
        
        pathPreceptors.push({
          id: `${path.type}-${i}`,
          name,
          speciality,
          reputation,
          fee
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
      <EducationTabs 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        preceptors={preceptors} 
        refreshPreceptors={generatePreceptors} 
      />
    </div>
  );
};
