
import React from 'react';
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
  Landmark
} from 'lucide-react';
import { useMaitreJeu } from '@/components/maitrejeu/context';
import { formatDate } from '@/utils/formatUtils';

export interface MaitreJeuSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const MaitreJeuSidebar: React.FC<MaitreJeuSidebarProps> = ({ 
  activeTab,
  setActiveTab
}) => {
  const { currentDate, currentPhase, advanceTime, changePhase } = useMaitreJeu();
  
  const navItems = [
    { id: 'senateurs', label: 'Sénateurs', icon: <Users className="h-4 w-4" /> },
    { id: 'clients', label: 'Clients', icon: <UserPlus className="h-4 w-4" /> },
    { id: 'familles', label: 'Familles', icon: <Users2 className="h-4 w-4" /> },
    { id: 'politique', label: 'Politique', icon: <Gavel className="h-4 w-4" /> },
    { id: 'equilibre', label: 'Équilibre', icon: <Scale className="h-4 w-4" /> },
    { id: 'provinces', label: 'Provinces', icon: <Globe className="h-4 w-4" /> },
    { id: 'histoire', label: 'Histoire', icon: <BookText className="h-4 w-4" /> },
    { id: 'economie', label: 'Économie', icon: <Coins className="h-4 w-4" /> },
    { id: 'republique', label: 'République', icon: <Landmark className="h-4 w-4" /> },
    { id: 'batiments', label: 'Bâtiments', icon: <Building className="h-4 w-4" /> },
    { id: 'lois', label: 'Lois', icon: <ScrollText className="h-4 w-4" /> }
  ];
  
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
              <Button
                variant={activeTab === item.id ? "default" : "ghost"}
                className={`w-full justify-start ${activeTab === item.id ? "" : "text-muted-foreground"}`}
                onClick={() => setActiveTab(item.id)}
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </Button>
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
          onClick={() => advanceTime()}
        >
          <CalendarClock className="h-4 w-4" />
          Avancer le temps
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full flex items-center gap-2"
          onClick={() => console.log("Statistiques globales")}
        >
          <BarChart2 className="h-4 w-4" />
          Statistiques
        </Button>
      </div>
    </div>
  );
};
