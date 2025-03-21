
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
import { motion } from 'framer-motion';

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
  
  const parentVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0 }
  };
  
  return (
    <div className="h-full w-56 border-r bg-background flex flex-col">
      <motion.div 
        className="p-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="font-cinzel text-lg font-semibold mb-2">Maître du Jeu</h2>
        <div className="text-sm text-muted-foreground mb-2">
          Panneau d'administration
        </div>
      </motion.div>
      
      <motion.div 
        className="p-3 bg-muted/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
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
      </motion.div>
      
      <Separator />
      
      <nav className="flex-1 p-2 overflow-y-auto">
        <motion.ul 
          className="space-y-1"
          variants={parentVariants}
          initial="hidden"
          animate="show"
        >
          {navItems.map(item => (
            <motion.li key={item.id} variants={itemVariants}>
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
            </motion.li>
          ))}
        </motion.ul>
      </nav>
      
      <Separator />
      
      <motion.div 
        className="p-3 space-y-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full flex items-center gap-2"
            onClick={handleAdvanceTime}
          >
            <CalendarClock className="h-4 w-4" />
            Avancer le temps
          </Button>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full flex items-center gap-2"
            onClick={() => setActiveTab('statistiques')}
          >
            <BarChart2 className="h-4 w-4" />
            Statistiques
          </Button>
        </motion.div>
      </motion.div>
      
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
