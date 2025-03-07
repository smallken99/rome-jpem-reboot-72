
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { UserPlus, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les mots de passe ne correspondent pas",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    if (!acceptTerms) {
      toast({
        title: "Erreur",
        description: "Vous devez accepter les conditions d'utilisation",
        variant: "destructive",
        duration: 3000,
      });
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

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-rome-navy">
          Nom d'utilisateur
        </label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="votre@email.com"
          required
          className="w-full"
        />
      </div>
      
      <PasswordField 
        id="password"
        label="Mot de passe"
        value={password}
        onChange={setPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
      
      <PasswordField 
        id="confirmPassword"
        label="Confirmer le mot de passe"
        value={confirmPassword}
        onChange={setConfirmPassword}
        showPassword={showConfirmPassword}
        setShowPassword={setShowConfirmPassword}
      />
      
      <div className="flex items-start space-x-2 pt-2">
        <Checkbox 
          id="terms" 
          checked={acceptTerms} 
          onCheckedChange={(checked) => setAcceptTerms(checked as boolean)} 
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

// Password field component
interface PasswordFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}

export const PasswordField: React.FC<PasswordFieldProps> = ({ 
  id, 
  label, 
  value, 
  onChange, 
  showPassword, 
  setShowPassword 
}) => {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-rome-navy">
        {label}
      </label>
      <div className="relative">
        <Input
          id={id}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="••••••••"
          required
          className="w-full pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
