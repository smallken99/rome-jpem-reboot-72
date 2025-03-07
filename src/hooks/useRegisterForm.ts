
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export const useRegisterForm = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const updateFormField = <K extends keyof RegisterFormData>(
    field: K,
    value: RegisterFormData[K]
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
    if (field === 'password') {
      setShowPassword(prev => !prev);
    } else {
      setShowConfirmPassword(prev => !prev);
    }
  };

  const validateForm = (): boolean => {
    setValidationError(null);
    
    if (formData.password !== formData.confirmPassword) {
      setValidationError("Les mots de passe ne correspondent pas");
      return false;
    }
    
    if (!formData.acceptTerms) {
      setValidationError("Vous devez accepter les conditions d'utilisation");
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulation d'inscription (à remplacer par une vraie API)
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Inscription réussie",
        description: "Bienvenue dans la République Romaine",
        duration: 3000,
      });
      // Rediriger vers la création de la Gens
      navigate('/create-gens');
    }, 1500);
  };

  return {
    formData,
    showPassword,
    showConfirmPassword,
    isLoading,
    validationError,
    updateFormField,
    togglePasswordVisibility,
    handleSubmit,
    setValidationError
  };
};
