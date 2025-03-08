
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, LogOut } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export const MaitreJeuHeader: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt, Maître du Jeu !",
      duration: 3000,
    });
    navigate('/welcome');
  };

  return (
    <header className="py-4 px-6 bg-gradient-to-b from-rome-navy to-rome-navy/90 text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-rome-gold" />
          <h1 className="font-cinzel text-xl">Maître du Jeu - ROME JPEM</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-white hover:text-rome-gold" onClick={() => navigate('/admin')}>
            Interface Admin
          </Button>
          <Button variant="ghost" className="text-white hover:text-rome-gold" onClick={handleLogout}>
            <LogOut className="h-5 w-5 mr-2" />
            Déconnexion
          </Button>
        </div>
      </div>
    </header>
  );
};
