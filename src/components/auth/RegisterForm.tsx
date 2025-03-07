
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import AlertMessage from '@/components/ui-custom/AlertMessage';
import PasswordField from '@/components/auth/PasswordField';
import { useRegisterForm } from '@/hooks/useRegisterForm';

const RegisterForm = () => {
  const {
    formData,
    showPassword,
    showConfirmPassword,
    isLoading,
    validationError,
    updateFormField,
    togglePasswordVisibility,
    handleSubmit,
    setValidationError
  } = useRegisterForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {validationError && (
        <AlertMessage 
          type="error" 
          title="Erreur de validation" 
          message={validationError} 
          onClose={() => setValidationError(null)}
        />
      )}
      
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-rome-navy">
          Nom d'utilisateur
        </label>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => updateFormField('name', e.target.value)}
          placeholder="Votre nom d'utilisateur"
          required
          className="w-full"
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-rome-navy">
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => updateFormField('email', e.target.value)}
          placeholder="votre@email.com"
          required
          className="w-full"
        />
      </div>
      
      <PasswordField 
        id="password"
        label="Mot de passe"
        value={formData.password}
        onChange={(value) => updateFormField('password', value)}
        showPassword={showPassword}
        toggleVisibility={() => togglePasswordVisibility('password')}
      />
      
      <PasswordField 
        id="confirmPassword"
        label="Confirmer le mot de passe"
        value={formData.confirmPassword}
        onChange={(value) => updateFormField('confirmPassword', value)}
        showPassword={showConfirmPassword}
        toggleVisibility={() => togglePasswordVisibility('confirmPassword')}
      />
      
      <div className="flex items-start space-x-2 pt-2">
        <Checkbox 
          id="terms" 
          checked={formData.acceptTerms} 
          onCheckedChange={(checked) => updateFormField('acceptTerms', checked as boolean)} 
        />
        <label htmlFor="terms" className="text-sm text-muted-foreground">
          J'accepte les{' '}
          <Link to="/terms" className="text-rome-terracotta hover:underline">
            conditions d'utilisation
          </Link>{' '}
          et la{' '}
          <Link to="/privacy" className="text-rome-terracotta hover:underline">
            politique de confidentialité
          </Link>
        </label>
      </div>
      
      <Button
        type="submit"
        className="w-full bg-rome-terracotta hover:bg-rome-terracotta/90"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Inscription en cours...
          </span>
        ) : (
          <span className="flex items-center">
            <UserPlus className="mr-2 h-4 w-4" />
            S'inscrire
          </span>
        )}
      </Button>
      
      <div className="text-center mt-6">
        <p className="text-sm text-muted-foreground">
          Vous avez déjà un compte?{' '}
          <Link to="/login" className="text-rome-terracotta hover:underline">
            Connectez-vous
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
