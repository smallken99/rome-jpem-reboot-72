
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

/**
 * Hook to handle form submission state and process
 */
export const useFormSubmission = (
  onValidate: () => boolean,
  successRoute: string
) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!onValidate()) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      toast({
        title: "Inscription réussie",
        description: "Bienvenue dans la République Romaine",
        duration: 3000,
      });
      
      // Redirect to next page
      navigate(successRoute);
    }, 1500);
  };
  
  return {
    isLoading,
    handleSubmit
  };
};
