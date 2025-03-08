
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  UserPlus, 
  Gavel, 
  Scale, 
  Globe, 
  BookText,
  Calendar,
  Crown
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface MaitreJeuSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const MaitreJeuSidebar: React.FC<MaitreJeuSidebarProps> = ({ 
  activeTab, 
  setActiveTab 
}) => {
  const { toast } = useToast();

  return (
    <aside className="w-full md:w-64 bg-white/90 backdrop-blur-sm border border-rome-gold/30 rounded-lg p-4 shadow-sm">
      <div className="mb-6">
        <div className="w-full h-20 rounded-md bg-gradient-to-br from-rome-terracotta to-rome-terracotta/70 flex items-center justify-center text-white font-cinzel mb-3">
          <Crown className="h-8 w-8 mr-2" />
          <span className="text-lg">Maître du Jeu</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Gérez tous les aspects du jeu et façonnez l'histoire de Rome.
        </p>
      </div>
      
      <nav className="space-y-2">
        <Button 
          variant={activeTab === 'senateurs' ? 'default' : 'ghost'} 
          className="w-full justify-start"
          onClick={() => setActiveTab('senateurs')}
        >
          <Users className="h-5 w-5 mr-2" />
          Gestion des Sénateurs
        </Button>
        <Button 
          variant={activeTab === 'clients' ? 'default' : 'ghost'} 
          className="w-full justify-start"
          onClick={() => setActiveTab('clients')}
        >
          <UserPlus className="h-5 w-5 mr-2" />
          Gestion des Clients
        </Button>
        <Button 
          variant={activeTab === 'politique' ? 'default' : 'ghost'} 
          className="w-full justify-start"
          onClick={() => setActiveTab('politique')}
        >
          <Gavel className="h-5 w-5 mr-2" />
          Influence Politique
        </Button>
        <Button 
          variant={activeTab === 'equilibre' ? 'default' : 'ghost'} 
          className="w-full justify-start"
          onClick={() => setActiveTab('equilibre')}
        >
          <Scale className="h-5 w-5 mr-2" />
          Équilibrage du Jeu
        </Button>
        <Button 
          variant={activeTab === 'provinces' ? 'default' : 'ghost'} 
          className="w-full justify-start"
          onClick={() => setActiveTab('provinces')}
        >
          <Globe className="h-5 w-5 mr-2" />
          Provinces & Guerres
        </Button>
        <Button 
          variant={activeTab === 'histoire' ? 'default' : 'ghost'} 
          className="w-full justify-start"
          onClick={() => setActiveTab('histoire')}
        >
          <BookText className="h-5 w-5 mr-2" />
          Édition de l'Histoire
        </Button>
      </nav>
      
      <div className="mt-8 pt-6 border-t border-rome-gold/20">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">État du jeu</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Année en cours:</span>
              <span className="font-medium">632 AUC</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Saison:</span>
              <span className="font-medium">Printemps</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Joueurs actifs:</span>
              <span className="font-medium">12</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => toast({ title: "Action simulée", description: "Passage à la saison suivante" })}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Avancer le temps
          </Button>
        </div>
      </div>
    </aside>
  );
};
