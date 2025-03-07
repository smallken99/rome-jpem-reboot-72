
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRegistration } from '@/context/RegistrationContext';
import { Eye, EyeOff } from 'lucide-react';

export const AccountRegistrationForm: React.FC = () => {
  const { registrationData, updateRegistrationData } = useRegistration();
  const [showPassword, setShowPassword] = React.useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateRegistrationData({
      [name]: value
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-cinzel text-rome-navy">Créez votre compte</h2>
        <p className="text-muted-foreground mt-1">
          Commencez votre voyage dans la République Romaine
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Nom d'utilisateur</Label>
          <Input
            id="username"
            name="username"
            value={registrationData.username}
            onChange={handleChange}
            placeholder="Votre nom d'utilisateur"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Adresse e-mail</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={registrationData.email}
            onChange={handleChange}
            placeholder="votre@email.com"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Mot de passe</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={registrationData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="pr-10"
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
      </div>
      
      <div className="text-sm text-muted-foreground mt-4">
        <p>En créant un compte, vous acceptez nos conditions d'utilisation et notre politique de confidentialité.</p>
      </div>
    </div>
  );
};
