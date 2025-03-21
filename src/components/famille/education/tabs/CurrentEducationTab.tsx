
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import ChildEducationCard from '../../ChildEducationCard';
import { useEducation } from '../context/EducationContext';
import { BookOpen, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const CurrentEducationTab: React.FC = () => {
  const navigate = useNavigate();
  // Use education context to get children
  const { children } = useEducation();

  // Filter children eligible for education (between 7 and 17 years old)
  const eligibleChildren = children.filter(child => child.age >= 7 && child.age <= 17);
  
  // Filter children currently receiving education
  const educatingChildren = eligibleChildren.filter(child => child.educationType !== 'none');
  
  // Filter children not receiving education but eligible
  const nonEducatingChildren = eligibleChildren.filter(child => child.educationType === 'none');

  return (
    <TabsContent value="current" className="animate-fade-in">
      <div className="space-y-6">
        {educatingChildren.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Enfants en éducation</h3>
              <span className="text-sm text-muted-foreground">{educatingChildren.length} enfant(s)</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {educatingChildren.map(child => (
                <ChildEducationCard 
                  key={child.id} 
                  child={child} 
                />
              ))}
            </div>
          </div>
        )}

        {nonEducatingChildren.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg">Éligibles à l'éducation</h3>
              <span className="text-sm text-muted-foreground">{nonEducatingChildren.length} enfant(s)</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {nonEducatingChildren.map(child => (
                <div key={child.id} className="border rounded-lg p-4 bg-slate-50 hover:bg-white hover:shadow-sm transition-all hover-scale">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{child.name}</div>
                    <div className="text-xs text-muted-foreground">{child.age} ans</div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Sans éducation formelle
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => navigate(`/famille/education/child/${child.id}`)}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Commencer l'éducation
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {eligibleChildren.length === 0 && (
          <div className="col-span-2 text-center p-8 bg-muted/30 rounded flex flex-col items-center">
            <BookOpen className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-muted-foreground">Aucun enfant dans votre famille n'est en âge de recevoir une éducation</p>
            <p className="text-xs text-muted-foreground mt-1">Les enfants romains commencent leur éducation à partir de 7 ans</p>
          </div>
        )}
      </div>
    </TabsContent>
  );
};
