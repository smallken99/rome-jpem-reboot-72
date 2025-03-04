
import React, { useState } from 'react';
import { GraduationCap, ShieldQuestion, User, Library, CalendarDays } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ChildEducationCard } from './education/ChildEducationCard';
import { EducationPathCard } from './education/EducationPathCard';
import { EducationIntro } from './education/EducationIntro';
import { children, educationPaths, preceptors } from './education/EducationData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const Education: React.FC = () => {
  const [activeTab, setActiveTab] = useState("current");

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
                      <h3 className="font-cinzel">Précepteurs en {pathTitle}</h3>
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
