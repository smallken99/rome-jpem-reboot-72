
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import ChildEducationCard from '../../ChildEducationCard';
import { useEducation } from '../context/EducationContext';
import { BookOpen, Plus, BookX, School } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

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

  // Animation variants for staggered children
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <TabsContent value="current" className="animate-fade-in">
      <div className="space-y-6">
        {educatingChildren.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg flex items-center">
                <School className="h-5 w-5 mr-2 text-blue-600" />
                Enfants en éducation
              </h3>
              <span className="text-sm text-muted-foreground bg-blue-50 px-2 py-1 rounded-full">
                {educatingChildren.length} enfant{educatingChildren.length > 1 ? 's' : ''}
              </span>
            </div>
            
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {educatingChildren.map(child => (
                <motion.div key={child.id} variants={item}>
                  <ChildEducationCard child={child} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {nonEducatingChildren.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg flex items-center">
                <BookX className="h-5 w-5 mr-2 text-amber-600" />
                Éligibles à l'éducation
              </h3>
              <span className="text-sm text-muted-foreground bg-amber-50 px-2 py-1 rounded-full">
                {nonEducatingChildren.length} enfant{nonEducatingChildren.length > 1 ? 's' : ''}
              </span>
            </div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {nonEducatingChildren.map(child => (
                <motion.div key={child.id} variants={item}>
                  <Card className="border hover:border-primary/30 hover:shadow-sm transition-all hover-scale">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{child.name}</div>
                        <div className="text-xs text-muted-foreground bg-slate-100 px-2 py-0.5 rounded-full">
                          {child.age} ans
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4 flex items-center">
                        <BookX className="h-4 w-4 mr-1 text-slate-400" />
                        Sans éducation formelle
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full hover:bg-primary hover:text-primary-foreground transition-colors"
                        onClick={() => navigate(`/famille/education/child/${child.id}`)}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Commencer l'éducation
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}
        
        {eligibleChildren.length === 0 && (
          <div className="col-span-2 text-center p-8 bg-muted/30 rounded flex flex-col items-center animate-fade-in">
            <BookOpen className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-muted-foreground">Aucun enfant dans votre famille n'est en âge de recevoir une éducation</p>
            <p className="text-xs text-muted-foreground mt-1">Les enfants romains commencent leur éducation à partir de 7 ans</p>
          </div>
        )}
      </div>
    </TabsContent>
  );
};
