
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Laurels } from '@/components/ui-custom/Laurels';
import { RegistrationProvider, useRegistration } from '@/context/RegistrationContext';
import { AccountRegistrationForm } from '@/components/registration/AccountRegistrationForm';
import { GensCreationForm } from '@/components/registration/GensCreationForm';
import { GensCharacteristicsForm } from '@/components/registration/GensCharacteristicsForm';
import { FamilyHeadCreationForm } from '@/components/registration/FamilyHeadCreationForm';
import { useToast } from '@/components/ui/use-toast';
import { ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';

const StepIndicator = ({ step, currentStep }: { step: number; currentStep: number }) => {
  const isActive = step === currentStep;
  const isCompleted = step < currentStep;
  
  return (
    <div className={`flex items-center justify-center w-10 h-10 rounded-full 
      ${isActive ? 'bg-rome-terracotta text-white' : isCompleted ? 'bg-green-500 text-white' : 'bg-rome-parchment text-rome-navy'}`}>
      {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : step}
    </div>
  );
};

const RegistrationSteps = () => {
  const { currentStep, registrationData, nextStep, prevStep, goToStep, calculateBonusMalus } = useRegistration();
  const navigate = useNavigate();
  const { toast } = useToast();

  const validateStep = () => {
    if (currentStep === 1) {
      const { username, email, password } = registrationData;
      if (!username || !email || !password) {
        toast({
          title: "Champs manquants",
          description: "Veuillez remplir tous les champs du formulaire",
          variant: "destructive",
        });
        return false;
      }
    } else if (currentStep === 2) {
      const { gens } = registrationData;
      if (!gens.name) {
        toast({
          title: "Nom de Gens manquant",
          description: "Veuillez saisir un nom pour votre Gens",
          variant: "destructive",
        });
        return false;
      }
    } else if (currentStep === 3) {
      const { gens } = registrationData;
      if (!gens.origin || !gens.philosophy) {
        toast({
          title: "Choix manquants",
          description: "Veuillez choisir l'origine et la philosophie de votre famille",
          variant: "destructive",
        });
        return false;
      }
    } else if (currentStep === 4) {
      const { familyHead, headEducation } = registrationData;
      if (!familyHead.name || !headEducation) {
        toast({
          title: "Informations manquantes",
          description: "Veuillez compléter les informations sur le chef de famille",
          variant: "destructive",
        });
        return false;
      }
    }
    
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep === 3 || currentStep === 4) {
        calculateBonusMalus();
      }
      
      if (currentStep < 4) {
        nextStep();
      } else {
        // Handle final submission
        toast({
          title: "Création réussie !",
          description: "Votre famille romaine a été créée avec succès.",
        });
        
        // Simulate successful registration and redirect
        setTimeout(() => {
          navigate('/');
        }, 1500);
      }
    }
  };

  const handlePrevious = () => {
    prevStep();
  };

  // Render different form based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <AccountRegistrationForm />;
      case 2:
        return <GensCreationForm />;
      case 3:
        return <GensCharacteristicsForm />;
      case 4:
        return <FamilyHeadCreationForm />;
      default:
        return <AccountRegistrationForm />;
    }
  };

  return (
    <div className="min-h-screen bg-roman-pattern flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <Laurels className="text-rome-navy mb-4">ROME JPEM</Laurels>
            <h1 className="text-3xl font-cinzel text-rome-navy">Création de Votre Familia Romana</h1>
            <p className="mt-2 text-muted-foreground">Suivez les étapes pour créer votre famille romaine et commencer votre ascension vers la gloire</p>
          </div>

          <RomanCard className="bg-white/90 backdrop-blur-sm border border-rome-gold/30 shadow-lg">
            <RomanCard.Header className="border-b border-rome-gold/20 pb-4">
              <div className="flex justify-between items-center">
                <div className="flex space-x-2 items-center">
                  <StepIndicator step={1} currentStep={currentStep} />
                  <div className="w-16 h-1 bg-rome-parchment flex-shrink-0" />
                  <StepIndicator step={2} currentStep={currentStep} />
                  <div className="w-16 h-1 bg-rome-parchment flex-shrink-0" />
                  <StepIndicator step={3} currentStep={currentStep} />
                  <div className="w-16 h-1 bg-rome-parchment flex-shrink-0" />
                  <StepIndicator step={4} currentStep={currentStep} />
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Étape {currentStep} sur 4</p>
                </div>
              </div>
            </RomanCard.Header>
            
            <RomanCard.Content className="p-6">
              {renderStepContent()}
            </RomanCard.Content>
            
            <RomanCard.Footer className="border-t border-rome-gold/20 pt-4 flex justify-between">
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="roman-btn-outline"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Précédent
              </Button>
              
              <Button 
                onClick={handleNext} 
                className="roman-btn"
              >
                {currentStep < 4 ? (
                  <>
                    Suivant
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </>
                ) : "Valider et Commencer"}
              </Button>
            </RomanCard.Footer>
          </RomanCard>
        </div>
      </div>
    </div>
  );
};

const CreateGens = () => {
  return (
    <RegistrationProvider>
      <RegistrationSteps />
    </RegistrationProvider>
  );
};

export default CreateGens;
