
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCharacters } from '../hooks/useCharacters';
import { educationPaths } from './data';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EducationHistory } from './components/EducationHistory';
import { EducationSkills } from './components/EducationSkills';
import { EducationPreceptor } from './components/EducationPreceptor';
import { ArrowLeft, GraduationCap, Clock } from 'lucide-react';
import { usePreceptorManagement } from './hooks/usePreceptorManagement';
import { toast } from 'sonner';

export const EducationDetail: React.FC = () => {
  const { childId } = useParams<{ childId: string }>();
  const navigate = useNavigate();
  const { localCharacters, updateCharacter } = useCharacters();
  const [activeTab, setActiveTab] = useState<string>('overview');
  
  const child = localCharacters.find(c => c.id === childId);
  
  // Simuler des précepteurs disponibles
  const { preceptors } = usePreceptorManagement();
  
  useEffect(() => {
    if (!child) {
      toast.error("Enfant non trouvé");
      navigate('/famille/education');
    }
  }, [child, navigate]);
  
  const handleAdvanceEducation = () => {
    if (!child || !child.currentEducation) return;
    
    const currentProgress = child.currentEducation.progress || 0;
    const newProgress = Math.min(currentProgress + 33, 100);
    const yearsCompleted = (child.currentEducation.yearsCompleted || 0) + 1;
    
    updateCharacter(child.id, {
      currentEducation: {
        ...child.currentEducation,
        progress: newProgress,
        yearsCompleted
      }
    });
    
    toast.success(`L'éducation a progressé à ${newProgress}%`);
    
    if (newProgress >= 100) {
      toast.info("L'éducation peut maintenant être complétée");
    }
  };
  
  const handleCompleteEducation = () => {
    if (!child || !child.currentEducation || (child.currentEducation.progress || 0) < 100) return;
    
    const educationType = child.currentEducation.type;
    const educationData = educationPaths[educationType];
    
    if (!educationData) return;
    
    // Compétences acquises
    const acquiredSkills = educationData.skills.slice(0, 2);
    
    // Mettre à jour le personnage
    updateCharacter(child.id, {
      education: {
        type: educationType,
        specialties: [...(child.education?.specialties || []), ...acquiredSkills],
        mentor: child.currentEducation.mentor,
        completed: true,
        completedAt: new Date().toISOString()
      },
      currentEducation: undefined,
      stats: {
        ...child.stats,
        [educationData.relatedStat]: typeof child.stats[educationData.relatedStat] === 'number'
          ? (child.stats[educationData.relatedStat] as number) + educationData.outcomes[educationData.relatedStat]
          : educationData.outcomes[educationData.relatedStat]
      }
    });
    
    toast.success(`L'éducation de ${child.name} est terminée avec succès !`);
  };
  
  if (!child) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <p>Chargement...</p>
        </div>
      </Layout>
    );
  }
  
  const educationType = child.currentEducation?.type || child.education?.type || 'none';
  const educationData = educationPaths[educationType];
  const progress = child.currentEducation?.progress || 0;
  
  return (
    <Layout>
      <PageHeader 
        title={`Éducation de ${child.name}`}
        subtitle={`Superviser le développement de ${child.firstName || child.name.split(' ')[0]}`}
      />
      
      <div className="mb-6">
        <Button variant="outline" onClick={() => navigate('/famille/education')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à la liste
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{child.name}</CardTitle>
                  <CardDescription>
                    {child.age} ans · {child.gender === 'male' ? 'Garçon' : 'Fille'}
                  </CardDescription>
                </div>
                
                <div>
                  {educationType !== 'none' && (
                    <Badge className="ml-2">
                      {educationType === 'military' ? 'Éducation Militaire' :
                       educationType === 'rhetoric' ? 'Éducation Rhétorique' :
                       educationType === 'political' ? 'Éducation Politique' :
                       educationType === 'religious' ? 'Éducation Religieuse' :
                       educationType === 'philosophical' ? 'Éducation Philosophique' :
                       'Éducation Générale'}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-6">
                  <TabsTrigger value="overview">Aperçu</TabsTrigger>
                  <TabsTrigger value="skills">Compétences</TabsTrigger>
                  <TabsTrigger value="history">Historique</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview">
                  {child.currentEducation ? (
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-2">Progression de l'éducation</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Années complétées: {child.currentEducation.yearsCompleted || 0} / {child.currentEducation.totalYears || 3}</span>
                            <span>{progress}%</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                      </div>
                      
                      {educationData && (
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-medium mb-2">Description</h3>
                            <p className="text-muted-foreground">{educationData.description}</p>
                          </div>
                          
                          <div>
                            <h3 className="font-medium mb-2">Compétences en cours d'acquisition</h3>
                            <ul className="list-disc pl-5 space-y-1">
                              {educationData.skills.map((skill, index) => (
                                <li key={index} className={index < 2 ? "font-medium" : "text-muted-foreground"}>
                                  {skill} {index < 2 && <span className="text-xs">(Principal)</span>}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      {child.education?.type ? (
                        <div>
                          <GraduationCap className="h-12 w-12 mx-auto mb-4 text-primary/70" />
                          <h3 className="text-lg font-medium mb-2">Éducation Terminée</h3>
                          <p className="text-muted-foreground">
                            {child.name} a terminé son éducation en{' '}
                            {child.education.type === 'military' ? 'arts militaires' :
                             child.education.type === 'rhetoric' ? 'rhétorique' :
                             child.education.type === 'political' ? 'politique' :
                             child.education.type === 'religious' ? 'religion' :
                             child.education.type === 'philosophical' ? 'philosophie' :
                             'études générales'}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-muted-foreground">
                            Aucune éducation en cours. Retournez à la liste des enfants pour en démarrer une.
                          </p>
                          <Button 
                            variant="outline" 
                            className="mt-4"
                            onClick={() => navigate('/famille/education')}
                          >
                            Démarrer une éducation
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="skills">
                  <EducationSkills 
                    acquiredSkills={child.education?.specialties || []}
                    inProgressSkills={child.currentEducation ? educationData?.skills || [] : []}
                    progress={progress}
                  />
                </TabsContent>
                
                <TabsContent value="history">
                  <EducationHistory character={child} />
                </TabsContent>
              </Tabs>
            </CardContent>
            
            {child.currentEducation && (
              <CardFooter className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={handleAdvanceEducation}
                  disabled={progress >= 100}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Avancer d'un an
                </Button>
                
                <Button
                  onClick={handleCompleteEducation}
                  disabled={progress < 100}
                >
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Compléter l'éducation
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
        
        <div>
          <EducationPreceptor 
            child={child}
            preceptors={preceptors}
            onAssignPreceptor={(preceptorId) => {
              toast.success("Précepteur assigné avec succès");
            }}
          />
        </div>
      </div>
    </Layout>
  );
};
