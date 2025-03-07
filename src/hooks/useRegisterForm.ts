
import { useState } from 'react';
import { useFormFields } from './useFormFields';
import { usePasswordVisibility } from './usePasswordVisibility';
import { useFormSubmission } from './useFormSubmission';
import { validateRegisterForm } from '@/utils/validationUtils';

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export const useRegisterForm = () => {
  const { fields: formData, updateField: updateFormField } = useFormFields<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  
  const passwordVisibility = usePasswordVisibility(false);
  const confirmPasswordVisibility = usePasswordVisibility(false);
  
  const [validationError, setValidationError] = useState<string | null>(null);
  
  const validateForm = (): boolean => {
    setValidationError(null);
    
    const validation = validateRegisterForm(
      formData.name,
      formData.email,
      formData.password,
      formData.confirmPassword,
      formData.acceptTerms
    );
    
    if (!validation.isValid) {
      setValidationError(validation.error);
      return false;
    }
    
    return true;
  };
  
  const { isLoading, handleSubmit } = useFormSubmission(validateForm, '/create-gens');
  
  const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
    if (field === 'password') {
      passwordVisibility.toggle();
    } else {
      confirmPasswordVisibility.toggle();
    }
  };
  
  return {
    formData,
    showPassword: passwordVisibility.isVisible,
    showConfirmPassword: confirmPasswordVisibility.isVisible,
    isLoading,
    validationError,
    updateFormField,
    togglePasswordVisibility,
    handleSubmit,
    setValidationError
  };
};
