
import React, { useState, useEffect } from 'react';
import { GraduationCap, ShieldQuestion, User, Library, CalendarDays } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ChildEducationCard } from './education/ChildEducationCard';
import { EducationPathCard } from './education/EducationPathCard';
import { EducationIntro } from './education/EducationIntro';
import { children, educationPaths, romanNamePrefixes, romanNameSuffixes, specialties, titles } from './education/EducationData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

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

  // Generate a random Roman name
  const generateRomanName = () => {
    const prefix = romanNamePrefixes[Math.floor(Math.random() * romanNamePrefixes.length)];
    const suffix = romanNameSuffixes[Math.floor(Math.random() * romanNameSuffixes.length)];
    return `${prefix} ${suffix}`;
  };

  // Generate a random speciality based on education type
  const generateSpeciality = (type: string) => {
    const typeSpecialties = specialties[type as keyof typeof specialties] || [];
    return typeSpecialties[Math.floor(Math.random() * typeSpecialties.length)];
  };

  // Generate a random reputation
  const generateReputation = () => {
    const reputations: ('Excellent' | 'Bon' | 'Moyen')[] = ['Excellent', 'Bon', 'Moyen'];
    const weights = [0.3, 0.5, 0.2]; // 30% Excellent, 50% Bon, 20% Moyen
    
    const random = Math.random();
    let cumulativeWeight = 0;
    
    for (let i = 0; i < reputations.length; i++) {
      cumulativeWeight += weights[i];
      if (random < cumulativeWeight) {
        return reputations[i];
      }
    }
    
    return 'Bon'; // Fallback
  };

  // Generate a random fee based on reputation
  const generateFee = (reputation: string) => {
    const baseFee = 1000;
    const reputationMultiplier = reputation === 'Excellent' ? 1.5 : 
                                reputation === 'Bon' ? 1.2 : 1.0;
    const randomVariation = 0.8 + Math.random() * 0.4; // 80% to 120% variation
    
    return Math.round(baseFee * reputationMultiplier * randomVariation / 100) * 100;
  };

  // Generate a random title based on education type
  const generateTitle = (type: string) => {
    const typeTitles = titles[type as keyof typeof titles] || [];
    return typeTitles[Math.floor(Math.random() * typeTitles.length)];
  };

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
          </div>
        </TabsContent>
        
        <TabsContent value="preceptors">
          <div className="flex justify-end mb-4">
            <Button 
              variant="outline" 
              onClick={generatePreceptors}
              className="border-rome-gold/30 hover:bg-rome-gold/10 hover:text-rome-navy"
            >
              Actualiser la Liste des Précepteurs
            </Button>
          </div>
          
          <div className="preceptors">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {Object.entries(preceptors).map(([type, teacherList]) => {
                // Get the education path title
                const pathTitle = educationPaths.find(path => path.type === type)?.title || type;
                // Get the education path icon
                const pathIcon = educationPaths.find(path => path.type === type)?.icon || <ShieldQuestion className="h-5 w-5" />;
                
                return (
                  <div key={type} className="roman-card p-4">
                    <div className="flex items-center gap-2 mb-3">
                      {pathIcon}
                      <h3 className="font-cinzel">Précepteurs en {pathTitle.replace('Éducation ', '')}</h3>
                    </div>
                    
                    <div className="space-y-4">
                      {teacherList.map(teacher => (
                        <div key={teacher.id} className="border border-muted rounded p-3 hover:border-rome-gold/50 transition-colors">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium">{teacher.name}</h4>
                            <span className={`text-xs px-2 py-1 rounded ${
                              teacher.reputation === 'Excellent' ? 'bg-green-100 text-green-800' :
                              teacher.reputation === 'Bon' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {teacher.reputation}
                            </span>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mt-1">Spécialité: {teacher.speciality}</p>
                          
                          <div className="flex justify-between items-center mt-3">
                            <span className="text-sm font-medium">{teacher.fee} denarii/an</span>
                            <button className="roman-btn-outline text-xs">Engager</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
