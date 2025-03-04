
import React from 'react';
import { CalendarDays, Library, User } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChildEducationCard } from './ChildEducationCard';
import { EducationPathCard } from './EducationPathCard';
import { PreceptorList } from './PreceptorList';
import { children, educationPaths } from './EducationData';

// Type for a preceptor (teacher) - matching the type in Education.tsx
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

interface EducationTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  preceptors: PreceptorsByType;
  refreshPreceptors: () => void;
}

export const EducationTabs: React.FC<EducationTabsProps> = ({ 
  activeTab, 
  setActiveTab, 
  preceptors, 
  refreshPreceptors 
}) => {
  // Helper function to explain stat inheritance and education limits
  const getStatInheritanceInfo = (statName: string) => {
    const isPopularity = statName === 'popularity';
    return {
      inheritanceNote: `Un enfant hérite d'un tiers des caractéristiques combinées de ses parents (divisées par 2).`,
      maxValue: isPopularity ? 'illimitée' : '40',
    };
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
      <TabsList className="w-full justify-start bg-white border border-rome-gold/30 mb-6">
        <TabsTrigger value="current" className="data-[state=active]:bg-rome-gold/10">
          <CalendarDays className="h-4 w-4 mr-2" />
          Éducation en Cours
        </TabsTrigger>
        <TabsTrigger value="paths" className="data-[state=active]:bg-rome-gold/10">
          <Library className="h-4 w-4 mr-2" />
          Parcours Disponibles
        </TabsTrigger>
        <TabsTrigger value="preceptors" className="data-[state=active]:bg-rome-gold/10">
          <User className="h-4 w-4 mr-2" />
          Précepteurs
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="current">
        <div className="children-education">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {children.map(child => (
              <ChildEducationCard key={child.id} child={child} />
            ))}
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="paths">
        <div className="education-paths">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {educationPaths.map((path, idx) => (
              <EducationPathCard key={idx} path={path} />
            ))}
          </div>
          
          <div className="mt-6 p-3 bg-muted rounded text-sm">
            <p className="font-medium mb-1">Limites d'éducation par caractéristique:</p>
            <ul className="list-disc pl-5 mt-1">
              <li>Popularité: valeur maximale illimitée</li>
              <li>Éloquence: valeur maximale de 40 par éducation</li>
              <li>Piété: valeur maximale de 40 par éducation</li>
              <li>Éducation Martiale: valeur maximale de 40 par éducation</li>
            </ul>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="preceptors">
        <PreceptorList preceptors={preceptors} refreshPreceptors={refreshPreceptors} />
      </TabsContent>
    </Tabs>
  );
};
