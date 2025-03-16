
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Users, 
  UserPlus, 
  Gavel, 
  Scale, 
  Globe, 
  BookText,
  CalendarClock,
  BarChart2,
  Hourglass,
  Coins,
  Users2,
  Building,
  ScrollText,
  Landmark,
  Construction,
  AlertTriangle
} from 'lucide-react';
import { useMaitreJeu } from '@/components/maitrejeu/context';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';

export interface MaitreJeuSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const MaitreJeuSidebar: React.FC<MaitreJeuSidebarProps> = ({ 
  activeTab,
  setActiveTab
}) => {
  const { currentDate, currentPhase, advanceTime } = useMaitreJeu();
  const [timeDialogOpen, setTimeDialogOpen] = useState(false);
  
  const navItems = [
    { id: 'accueil', label: 'Accueil', icon: <Landmark className="h-4 w-4" />, developed: true },
    { id: 'senateurs', label: 'Sénateurs', icon: <Users className="h-4 w-4" />, developed: true },
    { id: 'clients', label: 'Clients', icon: <UserPlus className="h-4 w-4" />, developed: true },
    { id: 'familles', label: 'Familles', icon: <Users2 className="h-4 w-4" />, developed: true },
    { id: 'politique', label: 'Politique', icon: <Gavel className="h-4 w-4" />, developed: true },
    { id: 'equilibre', label: 'Équilibre', icon: <Scale className="h-4 w-4" />, developed: false },
    { id: 'provinces', label: 'Provinces', icon: <Globe className="h-4 w-4" />, developed: true },
    { id: 'histoire', label: 'Histoire', icon: <BookText className="h-4 w-4" />, developed: false },
    { id: 'economie', label: 'Économie', icon: <Coins className="h-4 w-4" />, developed: true },
    { id: 'republique', label: 'République', icon: <Landmark className="h-4 w-4" />, developed: true },
    { id: 'batiments', label: 'Bâtiments', icon: <Building className="h-4 w-4" />, developed: true },
    { id: 'lois', label: 'Lois', icon: <ScrollText className="h-4 w-4" />, developed: true },
    { id: 'statistiques', label: 'Statistiques', icon: <BarChart2 className="h-4 w-4" />, developed: false }
  ];
  
  const handleAdvanceTime = () => {
    setTimeDialogOpen(true);
  };
  
  const confirmAdvanceTime = () => {
    advanceTime();
    setTimeDialogOpen(false);
    toast.success("Le temps a avancé à la saison suivante");
  };
  
  const formatDate = (date: { year: number; season: string }) => {
    const seasonMap: Record<string, string> = {
      'Ver': 'Printemps',
      'Aestas': 'Été',
      'Autumnus': 'Automne',
      'Hiems': 'Hiver',
      'SPRING': 'Printemps',
      'SUMMER': 'Été',
      'AUTUMN': 'Automne',
      'WINTER': 'Hiver'
    };
    return `An ${date.year} AUC - ${seasonMap[date.season] || date.season}`;
  };
  
  return (
    <div className="h-full w-56 border-r bg-background flex flex-col">
      <div className="p-4">
        <h2 className="font-cinzel text-lg font-semibold mb-2">Maître du Jeu</h2>
        <div className="text-sm text-muted-foreground mb-2">
          Panneau d'administration
        </div>
      </div>
      
      <div className="p-3 bg-muted/50">
        <div className="flex items-center gap-2 text-sm">
          <CalendarClock className="h-4 w-4 text-muted-foreground" />
          <span>Date:</span>
          <span className="font-medium">
            {formatDate(currentDate)}
          </span>
        </div>
        
        <div className="flex items-center gap-2 text-sm mt-1">
          <Hourglass className="h-4 w-4 text-muted-foreground" />
          <span>Phase:</span>
          <span className="font-medium">{currentPhase}</span>
        </div>
      </div>
      
      <Separator />
      
      <nav className="flex-1 p-2 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map(item => (
            <li key={item.id}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={activeTab === item.id ? "default" : "ghost"}
                      className={`w-full justify-start ${activeTab === item.id ? "" : "text-muted-foreground"}`}
                      onClick={() => setActiveTab(item.id)}
                    >
                      {item.icon}
                      <span className="ml-2">{item.label}</span>
                      
                      {!item.developed && (
                        <Badge variant="outline" className="ml-auto flex items-center gap-0.5 h-5 text-amber-500 border-amber-500">
                          <Construction className="h-3 w-3" />
                          <span className="text-xs">Dév</span>
                        </Badge>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    {item.developed ? 
                      "Section fonctionnelle" : 
                      "Section en cours de développement"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </li>
          ))}
        </ul>
      </nav>
      
      <Separator />
      
      <div className="p-3 space-y-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full flex items-center gap-2"
          onClick={handleAdvanceTime}
        >
          <CalendarClock className="h-4 w-4" />
          Avancer le temps
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full flex items-center gap-2"
          onClick={() => setActiveTab('statistiques')}
        >
          <BarChart2 className="h-4 w-4" />
          Statistiques
        </Button>
      </div>
      
      <Dialog open={timeDialogOpen} onOpenChange={setTimeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Avancer le temps</DialogTitle>
            <DialogDescription>
              Voulez-vous vraiment passer à la saison suivante? Cette action ne peut pas être annulée.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2 py-3 text-amber-500 bg-amber-500/10 px-4 rounded-md">
            <AlertTriangle className="h-5 w-5" />
            <p className="text-sm">
              Tous les événements non résolus de la saison actuelle seront automatiquement résolus.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTimeDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={confirmAdvanceTime}>
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
