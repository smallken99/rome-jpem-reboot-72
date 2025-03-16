
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, ArrowUpDown, BookOpen, ChevronDown, FileText, Plus, Power, UserPlus, Users } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export interface FamilleActionsProps {
  onCreateFamille?: () => void;
  onCreateMembre?: () => void;
  onCreateAlliance?: () => void;
  onManageRelations?: () => void;
}

export const FamilleActions: React.FC<FamilleActionsProps> = ({
  onCreateFamille,
  onCreateMembre,
  onCreateAlliance,
  onManageRelations
}) => {
  const [eventDialogOpen, setEventDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState('');
  
  const handleEventAction = (event: string) => {
    setSelectedEvent(event);
    setEventDialogOpen(true);
  };
  
  const confirmEvent = () => {
    setEventDialogOpen(false);
    
    switch (selectedEvent) {
      case 'naissance':
        toast.success('Un nouvel enfant est né dans la famille!');
        if (onCreateMembre) onCreateMembre();
        break;
      case 'deces':
        toast.error('Un membre de la famille est décédé');
        break;
      case 'mariage':
        toast.success('Un mariage a été arrangé');
        if (onCreateAlliance) onCreateAlliance();
        break;
      case 'divorce':
        toast.info('Un divorce a été prononcé');
        break;
      case 'adoption':
        toast.success('Un enfant a été adopté dans la famille');
        if (onCreateMembre) onCreateMembre();
        break;
      case 'succession':
        toast.info('Une succession a été établie');
        break;
    }
  };
  
  const getEventTitle = () => {
    switch (selectedEvent) {
      case 'naissance': return 'Déclarer une naissance';
      case 'deces': return 'Déclarer un décès';
      case 'mariage': return 'Arranger un mariage';
      case 'divorce': return 'Prononcer un divorce';
      case 'adoption': return 'Adopter un enfant';
      case 'succession': return 'Gérer une succession';
      default: return 'Événement familial';
    }
  };
  
  const getEventDescription = () => {
    switch (selectedEvent) {
      case 'naissance': 
        return 'Enregistrer la naissance d\'un nouvel enfant dans la famille.';
      case 'deces': 
        return 'Déclarer le décès d\'un membre de la famille. Cela affectera la succession et les relations familiales.';
      case 'mariage': 
        return 'Arranger un mariage entre deux familles, créant une alliance et renforçant les relations politiques.';
      case 'divorce': 
        return 'Prononcer un divorce, mettant fin à une alliance matrimoniale entre familles.';
      case 'adoption': 
        return 'Adopter un enfant extérieur à la famille, lui donnant tous les droits d\'un membre de sang.';
      case 'succession': 
        return 'Gérer la succession d\'un défunt et transférer ses biens et titres à ses héritiers.';
      default: 
        return 'Gérer un événement important dans la vie de la famille.';
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Actions Familiales</CardTitle>
        <CardDescription>
          Gérez votre famille, créez des alliances et enregistrez des événements importants
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 justify-start" 
            onClick={onCreateFamille}
          >
            <Users className="h-4 w-4" />
            <span>Créer une famille</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2 justify-start" 
            onClick={onCreateMembre}
          >
            <UserPlus className="h-4 w-4" />
            <span>Ajouter un membre</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2 justify-start" 
            onClick={onCreateAlliance}
          >
            <ArrowUpDown className="h-4 w-4" />
            <span>Créer une alliance</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2 justify-start" 
            onClick={onManageRelations}
          >
            <BookOpen className="h-4 w-4" />
            <span>Gérer les relations</span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 justify-start w-full col-span-2">
                <FileText className="h-4 w-4" />
                <span>Événements familiaux</span>
                <ChevronDown className="h-4 w-4 ml-auto" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => handleEventAction('naissance')}>
                <Plus className="h-4 w-4 mr-2" />
                <span>Naissance</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleEventAction('deces')}>
                <Power className="h-4 w-4 mr-2" />
                <span>Décès</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleEventAction('mariage')}>
                <Users className="h-4 w-4 mr-2" />
                <span>Mariage</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleEventAction('divorce')}>
                <ArrowUpDown className="h-4 w-4 mr-2" />
                <span>Divorce</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleEventAction('adoption')}>
                <UserPlus className="h-4 w-4 mr-2" />
                <span>Adoption</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleEventAction('succession')}>
                <FileText className="h-4 w-4 mr-2" />
                <span>Succession</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
      
      <Dialog open={eventDialogOpen} onOpenChange={setEventDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{getEventTitle()}</DialogTitle>
            <DialogDescription>
              {getEventDescription()}
            </DialogDescription>
          </DialogHeader>
          
          <div className="bg-amber-50 border border-amber-200 rounded-md p-3 flex gap-2 items-start">
            <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
            <div className="text-sm text-amber-800">
              <p>Cette action aura des conséquences importantes sur l'équilibre des familles et la progression du jeu.</p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setEventDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={confirmEvent}>
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
