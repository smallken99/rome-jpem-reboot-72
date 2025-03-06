
import React, { useState } from 'react';
import { Plus, ShoppingCart, ArrowLeft, Info } from 'lucide-react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';

export const PropertyManagementHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isOnMainPatrimoinePage = location.pathname === '/patrimoine';
  const [isNewConstructionDialogOpen, setIsNewConstructionDialogOpen] = useState(false);
  const [isBuyPropertyDialogOpen, setIsBuyPropertyDialogOpen] = useState(false);
  
  const handleNewConstruction = () => {
    setIsNewConstructionDialogOpen(true);
  };
  
  const handleBuyProperty = () => {
    setIsBuyPropertyDialogOpen(true);
  };
  
  const redirectToPropertyTab = (tab: string) => {
    navigate('/patrimoine/proprietes');
    // On utilisera cette fonction pour rediriger vers un onglet spécifique
    // Simulation pour l'instant, dans une application complète cela serait géré par un état global
    setTimeout(() => {
      const tabsElement = document.querySelector(`[value="${tab}"]`) as HTMLElement;
      if (tabsElement) tabsElement.click();
    }, 200);
  };
  
  return (
    <>
      <RomanCard.Header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {!isOnMainPatrimoinePage && (
            <ActionButton 
              icon={<ArrowLeft className="h-4 w-4" />}
              label=""
              variant="outline"
              className="p-2 h-9 w-9"
              onClick={() => navigate('/patrimoine')}
            />
          )}
          <h3 className="font-cinzel text-lg text-rome-navy">Gestion des Propriétés</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            className="rounded-full h-7 w-7 p-0" 
            onClick={() => window.alert("La gestion des propriétés vous permet d'acquérir et de gérer vos biens immobiliers à Rome et dans ses provinces, augmentant votre prestige et vos revenus.")}
          >
            <Info className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-2">
          <ActionButton 
            icon={<Plus className="h-4 w-4" />} 
            label="Nouvelle Construction"
            onClick={handleNewConstruction}
          />
          <ActionButton 
            icon={<ShoppingCart className="h-4 w-4" />} 
            label="Acheter" 
            variant="outline"
            onClick={handleBuyProperty}
          />
        </div>
      </RomanCard.Header>
      
      {/* Dialog for New Construction */}
      <Dialog open={isNewConstructionDialogOpen} onOpenChange={setIsNewConstructionDialogOpen}>
        <DialogContent className="roman-card max-w-md">
          <DialogHeader>
            <DialogTitle className="font-cinzel text-lg text-rome-navy">Nouvelle Construction</DialogTitle>
            <DialogDescription>
              Choisissez le type de propriété que vous souhaitez construire pour accroître votre patrimoine et votre influence.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 gap-4 py-4">
            <Button 
              variant="outline" 
              className="justify-start text-left p-4 h-auto flex flex-col items-start roman-btn-outline"
              onClick={() => {
                setIsNewConstructionDialogOpen(false);
                redirectToPropertyTab('urbaines');
              }}
            >
              <span className="font-cinzel text-rome-navy">Propriété Urbaine</span>
              <span className="text-sm text-muted-foreground mt-1">
                Domus, insula, et autres bâtiments dans les villes romaines pour augmenter votre prestige et vos revenus locatifs.
              </span>
            </Button>
            
            <Button 
              variant="outline" 
              className="justify-start text-left p-4 h-auto flex flex-col items-start roman-btn-outline"
              onClick={() => {
                setIsNewConstructionDialogOpen(false);
                redirectToPropertyTab('rurales');
              }}
            >
              <span className="font-cinzel text-rome-navy">Domaine Rural</span>
              <span className="text-sm text-muted-foreground mt-1">
                Exploitations agricoles, vignobles et élevages pour assurer des revenus stables et l'autosuffisance de votre famille.
              </span>
            </Button>
            
            <Button 
              variant="outline" 
              className="justify-start text-left p-4 h-auto flex flex-col items-start roman-btn-outline"
              onClick={() => {
                setIsNewConstructionDialogOpen(false);
                redirectToPropertyTab('urbaines');
              }}
            >
              <span className="font-cinzel text-rome-navy">Édifice Public</span>
              <span className="text-sm text-muted-foreground mt-1">
                Thermes, temples ou statues pour démontrer votre générosité et accroître votre popularité auprès du peuple.
              </span>
            </Button>
          </div>
          
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button variant="outline" className="roman-btn-outline">Annuler</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialog for Buy Property */}
      <Dialog open={isBuyPropertyDialogOpen} onOpenChange={setIsBuyPropertyDialogOpen}>
        <DialogContent className="roman-card max-w-md">
          <DialogHeader>
            <DialogTitle className="font-cinzel text-lg text-rome-navy">Acheter une Propriété</DialogTitle>
            <DialogDescription>
              Consultez le marché immobilier romain pour acquérir des propriétés existantes.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="rounded-md border border-amber-200 bg-amber-50 p-4 text-sm">
              <p className="text-amber-800">
                Le marché immobilier est actuellement en cours de développement par les architectes de la République. Revenez prochainement pour découvrir les propriétés disponibles à l'achat.
              </p>
            </div>
            
            <div className="mt-4">
              <h4 className="font-cinzel text-sm mb-2">Propriétés qui seront bientôt disponibles:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Villas de campagne en Étrurie</li>
                <li>Insulae dans les quartiers populaires de Rome</li>
                <li>Entrepôts commerciaux au port d'Ostie</li>
                <li>Domaines agricoles en Campanie</li>
              </ul>
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button className="roman-btn">Compris</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
