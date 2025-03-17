
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, BookText, Users, GraduationCap, Award } from 'lucide-react';
import { useChildEducation } from './hooks/useChildEducation';
import { ChildHeader } from './components/ChildHeader';
import { CurrentEducationStatus } from './components/CurrentEducationStatus';
import { EducationFormActions } from './components/EducationFormActions';
import { EducationObjectives } from './components/EducationObjectives';
import { EducationProgressButtons } from './components/EducationProgressButtons';
import { EducationStatus } from './components/EducationStatus';
import { EducationTypeSelector } from './components/EducationTypeSelector';
import { EducationWarning } from './components/EducationWarning';
import { SkillProgress } from './components/SkillProgress';
import { MentorInfo } from './components/MentorInfo';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ChildNotFound } from './components/ChildNotFound';
import { EducationFormData, EducationPathType, EducationType } from './types/educationTypes';
import { educationPaths } from './data';

export const ChildEducationDetail = () => {
  const { childId } = useParams<{ childId: string }>();
  const navigate = useNavigate();
  
  const {
    child,
    education,
    loading,
    preceptors,
    updateEducation,
    advanceEducation,
    startNewEducation,
    cancelEducation,
    completeEducation,
  } = useChildEducation(childId || '');
  
  const [currentTab, setCurrentTab] = useState('current');
  const [selectedPathType, setSelectedPathType] = useState<EducationPathType>('none');
  const [selectedPreceptorId, setSelectedPreceptorId] = useState<string | null>(null);
  const [showStartNewForm, setShowStartNewForm] = useState(false);
  
  useEffect(() => {
    if (education && education.preceptorId) {
      setSelectedPreceptorId(education.preceptorId);
    }
  }, [education]);
  
  const handleBackToList = () => {
    navigate('/famille/education');
  };
  
  const handleStartNewEducation = () => {
    setShowStartNewForm(true);
    setCurrentTab('new');
  };
  
  const handleCancelNewEducation = () => {
    setShowStartNewForm(false);
    setCurrentTab('current');
    setSelectedPathType('none');
    setSelectedPreceptorId(null);
  };
  
  const handleSaveNewEducation = () => {
    if (selectedPathType === 'none' || !selectedPreceptorId || !childId) return;
    
    const formData: EducationFormData = {
      educationType: selectedPathType,
      mentor: selectedPreceptorId,
      childId,
      pathType: selectedPathType,
      preceptorId: selectedPreceptorId,
      startYear: new Date().getFullYear(),
      currentYear: 1,
      totalYears: selectedPathType === 'military' ? 10 : 12,
      status: 'in_progress',
      skills: {},
      specialties: [],
    };
    
    startNewEducation(formData);
    setShowStartNewForm(false);
    setCurrentTab('current');
  };
  
  const handleAdvanceEducation = () => {
    if (education) {
      advanceEducation(education.id);
    }
  };
  
  const handleCancelEducation = () => {
    if (education) {
      cancelEducation(education.id);
    }
  };
  
  const handleCompleteEducation = () => {
    if (education) {
      completeEducation(education.id);
    }
  };
  
  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!child) {
    return <ChildNotFound onBack={handleBackToList} childId={childId} />;
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={handleBackToList} className="flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" />
          <span>Retour à la liste</span>
        </Button>
        
        {education && education.status === 'in_progress' && (
          <div className="flex items-center gap-2">
            <Button onClick={handleCancelEducation} variant="outline">
              Abandonner l'éducation
            </Button>
            <Button onClick={handleAdvanceEducation}>Avancer l'éducation</Button>
          </div>
        )}
        
        {!education && !showStartNewForm && (
          <Button onClick={handleStartNewEducation}>
            Commencer une nouvelle éducation
          </Button>
        )}
      </div>
      
      <Card>
        <CardHeader>
          <ChildHeader child={child} />
        </CardHeader>
        
        <CardContent>
          <Tabs value={currentTab} onValueChange={setCurrentTab}>
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="current" disabled={showStartNewForm}>
                <BookText className="h-4 w-4 mr-2" />
                Éducation actuelle
              </TabsTrigger>
              <TabsTrigger value="history" disabled={showStartNewForm}>
                <GraduationCap className="h-4 w-4 mr-2" />
                Historique
              </TabsTrigger>
              <TabsTrigger value="stats" disabled={showStartNewForm}>
                <Award className="h-4 w-4 mr-2" />
                Compétences
              </TabsTrigger>
              <TabsTrigger value="new" disabled={education?.status === 'in_progress'}>
                <Users className="h-4 w-4 mr-2" />
                Nouvelle éducation
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="current">
              {education ? (
                <div className="space-y-6">
                  <CurrentEducationStatus education={education} />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Progression</h3>
                      <div className="space-y-4">
                        {Object.entries(education.skills || {}).map(([skillName, value]) => (
                          <SkillProgress key={skillName} label={skillName} value={value} />
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Précepteur</h3>
                      {education.preceptorId && (
                        <MentorInfo 
                          mentor={preceptors.find(p => p.id === education.preceptorId) || null}
                          educationType={education.pathType}
                        />
                      )}
                      
                      <h3 className="text-lg font-medium mb-3 mt-6">Spécialités acquises</h3>
                      <div className="flex flex-wrap gap-2">
                        {education.specialties && education.specialties.length > 0 ? (
                          education.specialties.map((specialty, index) => (
                            <Badge key={index} variant="secondary">
                              {specialty}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-muted-foreground">Aucune spécialité acquise</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {education.status === 'in_progress' && (
                    <div className="mt-6">
                      <Separator className="my-4" />
                      <EducationProgressButtons 
                        onAdvance={handleAdvanceEducation}
                        onCancel={handleCancelEducation}
                        onComplete={handleCompleteEducation}
                        canComplete={education.currentYear >= education.totalYears * 0.75}
                        isEducating={loading}
                        hasEducation={true}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <GraduationCap className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">Aucune éducation en cours</h3>
                  <p className="text-muted-foreground mt-2">
                    Commencez une nouvelle éducation en utilisant l'onglet "Nouvelle éducation"
                  </p>
                  <Button onClick={handleStartNewEducation} className="mt-4">
                    Commencer une éducation
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="history">
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Historique d'éducation</h3>
                
                {education && education.status === 'completed' ? (
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">
                          {educationPaths.find(p => p.id === education.pathType)?.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {education.startYear} - {education.startYear + education.currentYear}
                        </p>
                      </div>
                      <Badge className="bg-green-500">Complétée</Badge>
                    </div>
                    
                    <Separator className="my-3" />
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <h5 className="text-sm font-medium mb-2">Compétences acquises</h5>
                        <div className="space-y-2">
                          {Object.entries(education.skills || {}).map(([skill, value]) => (
                            <div key={skill} className="flex items-center justify-between">
                              <span className="capitalize">{skill}</span>
                              <span className="font-medium">{value}/10</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="text-sm font-medium mb-2">Spécialités</h5>
                        <div className="flex flex-wrap gap-2">
                          {education.specialties && education.specialties.length > 0 ? (
                            education.specialties.map((specialty, index) => (
                              <Badge key={index} variant="outline">
                                {specialty}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-muted-foreground">Aucune spécialité</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Aucun historique d'éducation disponible
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="stats">
              <div className="space-y-6">
                <h3 className="text-lg font-medium">Compétences actuelles</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-md font-medium mb-4">Compétences intellectuelles</h4>
                    <div className="space-y-3">
                      <SkillProgress label="rhétorique" value={child.skills?.rhetoric || 0} />
                      <SkillProgress label="politique" value={child.skills?.politics || 0} />
                      <SkillProgress label="stratégie" value={child.skills?.strategy || 0} />
                      <SkillProgress label="diplomatie" value={child.skills?.diplomacy || 0} />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-md font-medium mb-4">Compétences martiales</h4>
                    <div className="space-y-3">
                      <SkillProgress label="combat" value={child.skills?.combat || 0} />
                      <SkillProgress label="commandement" value={child.skills?.leadership || 0} />
                      <SkillProgress label="équitation" value={child.skills?.riding || 0} />
                      <SkillProgress label="tactique" value={child.skills?.tactics || 0} />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-md font-medium mb-4">Traits de caractère</h4>
                  <div className="flex flex-wrap gap-2">
                    {child.traits && child.traits.length > 0 ? (
                      child.traits.map((trait, index) => (
                        <Badge key={index} variant="outline">
                          {trait}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-muted-foreground">Aucun trait particulier</span>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="new">
              {showStartNewForm && (
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">Commencer une nouvelle éducation</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-md font-medium mb-4">Choisir un parcours éducatif</h4>
                      <EducationTypeSelector 
                        selectedType={selectedPathType}
                        onChange={(type: string) => setSelectedPathType(type as EducationType)}
                        childGender={child.gender}
                      />
                      
                      {selectedPathType && selectedPathType !== 'none' && (
                        <div className="mt-4">
                          <EducationObjectives educationType={selectedPathType} />
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h4 className="text-md font-medium mb-4">Choisir un précepteur</h4>
                      <div className="space-y-4">
                        {preceptors.length > 0 ? (
                          preceptors.map(preceptor => (
                            <div
                              key={preceptor.id}
                              className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                                selectedPreceptorId === preceptor.id
                                  ? 'border-primary bg-primary/5'
                                  : 'hover:border-primary/50'
                              }`}
                              onClick={() => setSelectedPreceptorId(preceptor.id)}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <h5 className="font-medium">{preceptor.name}</h5>
                                  <p className="text-sm text-muted-foreground">
                                    Spécialité: {preceptor.specialty || preceptor.speciality}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <span className="text-sm font-medium">
                                    Qualité: {preceptor.quality}/5
                                  </span>
                                  <p className="text-sm text-muted-foreground">
                                    Coût: {preceptor.cost} as/an
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-4 text-muted-foreground">
                            Aucun précepteur disponible
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <EducationFormActions
                    onCancel={handleCancelNewEducation}
                    onSave={handleSaveNewEducation}
                    disabled={!selectedPathType || selectedPathType === 'none' || !selectedPreceptorId}
                  />
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
