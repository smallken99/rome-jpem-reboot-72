import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Laurels } from '@/components/ui-custom/Laurels';
import { LogIn, ArrowLeft, Eye, EyeOff, Shield } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulation de connexion (à remplacer par une vraie API)
    setTimeout(() => {
      setIsLoading(false);
      
      // Pour cet exemple, nous utiliserons des identifiants hardcodés
      if (email === 'admin@rome.com' && password === 'admin123') {
        // Connexion réussie - Admin
        toast({
          title: "Connexion réussie",
          description: "Bienvenue, Administrateur",
          duration: 3000,
        });
        navigate('/admin');
      } else if (email === 'user@rome.com' && password === 'user123') {
        // Connexion réussie - Utilisateur normal
        toast({
          title: "Connexion réussie",
          description: "Bienvenue dans la République Romaine",
          duration: 3000,
        });
        navigate('/');
      } else {
        // Échec de connexion
        toast({
          title: "Échec de la connexion",
          description: "Email ou mot de passe incorrect",
          variant: "destructive",
          duration: 3000,
        });
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-roman-pattern flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="mb-6">
            <Link to="/welcome" className="inline-flex items-center text-rome-navy hover:text-rome-terracotta transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour à l'accueil
            </Link>
          </div>
          
          <div className="bg-white/90 backdrop-blur-sm border border-rome-gold/30 rounded-lg p-8 shadow-lg">
            <div className="text-center mb-6">
              <Laurels className="text-rome-navy mb-4">ROME JPEM</Laurels>
              <h1 className="text-2xl font-cinzel text-rome-navy">Connexion</h1>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
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
              
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-rome-navy">
                  Mot de passe
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                
                <div className="flex justify-end">
                  <Link to="/reset-password" className="text-sm text-rome-terracotta hover:underline">
                    Mot de passe oublié?
                  </Link>
                </div>
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
                    Connexion en cours...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <LogIn className="mr-2 h-4 w-4" />
                    Se connecter
                  </span>
                )}
              </Button>
              
              <div className="text-center mt-6">
                <p className="text-sm text-muted-foreground">
                  Vous n'avez pas de compte?{' '}
                  <Link to="/register" className="text-rome-terracotta hover:underline">
                    Inscrivez-vous
                  </Link>
                </p>
              </div>
              
              <div className="pt-4 mt-4 border-t border-border">
                <div className="text-xs text-center text-muted-foreground flex items-center justify-center">
                  <Shield className="h-3 w-3 mr-1" />
                  Connexion sécurisée
                </div>
              </div>
            </form>
          </div>
          
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>Pour tester la connexion:</p>
            <p className="mt-1"><strong>Admin:</strong> admin@rome.com / admin123</p>
            <p><strong>Utilisateur:</strong> user@rome.com / user123</p>
            <p className="mt-4 text-rome-terracotta">
              <Link to="/create-gens" className="hover:underline">
                Accéder directement à la création de Gens (démo)
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
