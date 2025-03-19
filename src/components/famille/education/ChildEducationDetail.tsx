
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChildHeader } from './components/ChildHeader';
import { EducationPathSelector } from './components/EducationPathSelector';
import { EducationProgressButtons } from './components/EducationProgressButtons';
import { EducationStatus } from './components/EducationStatus';
import { SpecialtySelector } from './components/SpecialtySelector';
import { PreceptorSelector } from './components/PreceptorSelector';
import { useEducation } from './context/EducationContext';
import { Child, EducationPath, EducationType } from './types/educationTypes';
import { HirePreceptorDialog } from './dialogs/HirePreceptorDialog';
import { FirePreceptorDialog } from './dialogs/FirePreceptorDialog';
import { usePreceptorsManagement } from './hooks/usePreceptorsManagement';
import { toast } from 'sonner';

export const ChildEducationDetail: React.FC = () => {
  const { childId } = useParams<{ childId: string }>();
  const navigate = useNavigate();
  
  // Access context functions
  const { 
    children, 
    getChild,
    startEducation, 
    advanceEducationYear,
    completeEducation,
    cancelEducation,
    isEducating,
    findEducationPathById,
    getAllEducationPaths
  } = useEducation();
  
  // Access preceptor management functions
  const {
    preceptors,
    hirePreceptor,
    firePreceptor,
    getPreceptorById
  } = usePreceptorsManagement();
  
  const [selectedPath, setSelectedPath] = useState<EducationType | null>(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [selectedPreceptorId, setSelectedPreceptorId] = useState<string | null>(null);
  const [hireDialogOpen, setHireDialogOpen] = useState(false);
  const [fireDialogOpen, setFireDialogOpen] = useState(false);
  
  const child = childId ? getChild(childId) : undefined;
  
  useEffect(() => {
    if (!child) {
      navigate('/famille/education');
    }
  }, [child, navigate]);
  
  if (!child) {
    return null;
  }
  
  const hasEducation = !!child.educationType;
  const educationPath = hasEducation ? findEducationPathById(child.educationType) : null;
  const preceptor = child.preceptorId ? getPreceptorById(child.preceptorId) : null;
  
  // Check if education is valid for gender
  const isEducationValid = !hasEducation || 
    educationPath?.suitableFor.gender === 'both' || 
    educationPath?.suitableFor.gender === child.gender;
  
  // Check if education is complete
  const isCompleteEnabled = hasEducation && 
    child.progress >= 100 && 
    child.age >= (educationPath?.minAge || 0) + (educationPath?.duration || 0);
  
  const handleSelectPath = (pathId: EducationType) => {
    setSelectedPath(pathId);
    setSelectedSpecialty(null);
  };
  
  const handleSelectSpecialty = (specialtyId: string) => {
    setSelectedSpecialty(specialtyId);
  };
  
  const handleSelectPreceptor = (preceptorId: string) => {
    setSelectedPreceptorId(preceptorId);
  };
  
  const handleStartEducation = () => {
    if (selectedPath) {
      startEducation(child.id, selectedPath);
      toast.success(`${child.name} a commencé son éducation ${selectedPath}.`);
    }
  };
  
  const handleAdvanceEducation = () => {
    if (hasEducation) {
      advanceEducationYear(child.id);
    }
  };
  
  const handleCompleteEducation = () => {
    if (hasEducation && isCompleteEnabled) {
      completeEducation(child.id);
      toast.success(`${child.name} a terminé son éducation avec succès.`);
    }
  };
  
  const handleCancelEducation = () => {
    if (hasEducation) {
      if (window.confirm(`Êtes-vous sûr de vouloir annuler l'éducation de ${child.name} ?`)) {
        cancelEducation(child.id);
        toast.error(`L'éducation de ${child.name} a été annulée.`);
      }
    }
  };
  
  const handleHirePreceptor = () => {
    if (selectedPreceptorId) {
      hirePreceptor(selectedPreceptorId, child.id);
      setHireDialogOpen(false);
      toast.success(`Un nouveau précepteur a été engagé pour ${child.name}.`);
    }
  };
  
  const handleFirePreceptor = () => {
    if (child.preceptorId) {
      firePreceptor(child.preceptorId);
      setFireDialogOpen(false);
      toast.error(`Le précepteur de ${child.name} a été renvoyé.`);
    }
  };
  
  const openHireDialog = (preceptorId: string) => {
    setSelectedPreceptorId(preceptorId);
    setHireDialogOpen(true);
  };
  
  // Modification here to handle specialty display with specialties array
  const getChildSpecialty = () => {
    if (!child.specialties || child.specialties.length === 0) {
      return child.specialty || 'Inconnue';
    }
    const specialtyId = child.specialties[0];
    const specialty = educationPath?.specialtyDetails?.find(s => s.id === specialtyId);
    return specialty?.name || 'Inconnue';
  };
  
  const renderEducationSetup = () => {
    return (
      <div className="space-y-6">
        <EducationPathSelector
          childAge={child.age}
          childGender={child.gender}
          selectedPath={selectedPath}
          onSelectPath={handleSelectPath}
        />
        
        {selectedPath && (
          <SpecialtySelector
            pathId={selectedPath}
            selectedSpecialty={selectedSpecialty}
            onSelectSpecialty={handleSelectSpecialty}
          />
        )}
        
        {selectedPath && selectedSpecialty && (
          <div className="flex justify-end mt-6">
            <Button onClick={handleStartEducation}>
              Commencer l'éducation
            </Button>
          </div>
        )}
      </div>
    );
  };
  
  const renderEducationProgress = () => {
    if (!hasEducation || !educationPath) return null;
    
    return (
      <div className="space-y-6">
        <Card>
          <ChildHeader 
            child={child} 
            hasInvalidEducation={!isEducationValid}
            onNameChange={() => {}}
          />
          
          <div className="p-4">
            <EducationStatus 
              child={child} 
              hasEducation={hasEducation}
              hasInvalidEducation={!isEducationValid}
            />
            
            <div className="mt-6 space-y-4">
              <h3 className="font-semibold">Détails de l'éducation</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500">Type d'éducation</p>
                  <p className="font-medium">{educationPath.name}</p>
                </div>
                
                <div>
                  <p className="text-sm text-slate-500">Spécialité</p>
                  <p className="font-medium">{getChildSpecialty()}</p>
                </div>
                
                <div>
                  <p className="text-sm text-slate-500">Durée totale</p>
                  <p className="font-medium">{educationPath.duration} ans</p>
                </div>
                
                <div>
                  <p className="text-sm text-slate-500">Progression</p>
                  <p className="font-medium">{child.progress}% complété</p>
                </div>
              </div>
            </div>
            
            <EducationProgressButtons
              onAdvanceYear={handleAdvanceEducation}
              onCompleteEducation={handleCompleteEducation}
              canComplete={isCompleteEnabled}
              isEducating={!!isEducating[child.id]}
              hasEducation={true}
              educationProgress={child.progress || 0}
              onCancel={handleCancelEducation}
            />
          </div>
        </Card>
        
        <Card>
          <div className="p-4">
            <h3 className="font-semibold mb-4">Précepteur</h3>
            
            {preceptor ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-500">Nom</p>
                    <p className="font-medium">{preceptor.name}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-slate-500">Spécialité</p>
                    <p className="font-medium">{preceptor.specialty || preceptor.speciality}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-slate-500">Qualité</p>
                    <p className="font-medium">{preceptor.quality}/100</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-slate-500">Coût annuel</p>
                    <p className="font-medium">{preceptor.price} as</p>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    variant="outline" 
                    className="text-red-600 hover:bg-red-50"
                    onClick={() => setFireDialogOpen(true)}
                  >
                    Renvoyer le précepteur
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-slate-500">Aucun précepteur n'est assigné à cet enfant.</p>
                
                <PreceptorSelector
                  preceptors={preceptors.filter(p => 
                    (p.specialty === child.educationType || p.speciality === child.educationType) && 
                    p.available !== false
                  )}
                  selectedPreceptorId={selectedPreceptorId}
                  onSelectPreceptor={handleSelectPreceptor}
                  onHirePreceptor={openHireDialog}
                />
              </div>
            )}
          </div>
        </Card>
      </div>
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Éducation de {child.name}</h2>
        <Button variant="outline" onClick={() => navigate('/famille/education')}>
          Retour à la liste
        </Button>
      </div>
      
      {hasEducation ? renderEducationProgress() : renderEducationSetup()}
      
      <HirePreceptorDialog
        isOpen={hireDialogOpen}
        onOpenChange={setHireDialogOpen}
        preceptorId={selectedPreceptorId || ''}
        onHire={handleHirePreceptor}
      />
      
      <FirePreceptorDialog
        isOpen={fireDialogOpen}
        onOpenChange={setFireDialogOpen}
        preceptorId={child.preceptorId || ''}
        onFire={handleFirePreceptor}
      />
    </div>
  );
};
