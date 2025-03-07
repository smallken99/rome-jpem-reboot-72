
import React, { createContext, useContext, useState } from 'react';
import { RegistrationData, RegistrationContextType } from '@/types/registration';
import { getDefaultRegistrationData, calculateBonusMalus } from '@/utils/registrationUtils';

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export const RegistrationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [registrationData, setRegistrationData] = useState<RegistrationData>(getDefaultRegistrationData());
  const [currentStep, setCurrentStep] = useState(1);

  const updateRegistrationData = (data: Partial<RegistrationData>) => {
    setRegistrationData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  // Calculate bonuses/maluses based on choices
  const handleCalculateBonusMalus = () => {
    const updatedData = calculateBonusMalus(registrationData);
    setRegistrationData(updatedData);
  };

  return (
    <RegistrationContext.Provider
      value={{
        registrationData,
        currentStep,
        updateRegistrationData,
        nextStep,
        prevStep,
        goToStep,
        calculateBonusMalus: handleCalculateBonusMalus
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (context === undefined) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  return context;
};
