
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Plus, Globe, FileText, Shield } from 'lucide-react';
import { TraitesList } from './TraitesList';
import { NationsList } from './NationsList';
import { AlliancesMilitaires } from './AlliancesMilitaires';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { ActionsPanel, ActionItem } from '@/components/ui-custom/ActionsPanel';
import { DiplomaticFilters } from './DiplomaticFilters';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Nation, Traite, Alliance } from './types';
import { toast } from 'sonner';

export const RelationsDiplomatiques: React.FC = () => {
  const [activeTab, setActiveTab] = useState('nations');
  const [searchTerm, setSearchTerm] = useState('');
  
  // États pour les filtres avancés
  const [filters, setFilters] = useState({
    status: '',
    region: '',
    dateFrom: '',
    dateTo: ''
  });
  
  // États pour les modales d'ajout
  const [isAddNationOpen, setIsAddNationOpen] = useState(false);
  const [isAddTraiteOpen, setIsAddTraiteOpen] = useState(false);
  const [isAddAllianceOpen, setIsAddAllianceOpen] = useState(false);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  // Fonctions pour la gestion des filtres
  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    toast.success("Filtres appliqués");
  };
  
  const resetFilters = () => {
    setFilters({
      status: '',
      region: '',
      dateFrom: '',
      dateTo: ''
    });
    toast.info("Filtres réinitialisés");
  };
  
  // Fonctions pour ouvrir les modales d'ajout
  const openAddNationModal = () => setIsAddNationOpen(true);
  const openAddTraiteModal = () => setIsAddTraiteOpen(true);
  const openAddAllianceModal = () => setIsAddAllianceOpen(true);
  
  // Fonction générique pour simuler l'ajout (à connecter à une API réelle plus tard)
  const handleAdd = (type: 'nation' | 'traite' | 'alliance') => {
    toast.success(`${type === 'nation' ? 'Nation' : type === 'traite' ? 'Traité' : 'Alliance'} ajouté avec succès`);
    
    // Fermeture des modales appropriées
    if (type === 'nation') setIsAddNationOpen(false);
    else if (type === 'traite') setIsAddTraiteOpen(false);
    else setIsAddAllianceOpen(false);
  };
  
  // Actions spécifiques à chaque tab
  const getTabActions = (): ActionItem[] => {
    switch(activeTab) {
      case 'nations':
        return [
          { 
            label: "Ajouter une nation", 
            icon: <Plus size={16} />, 
            onClick: openAddNationModal, 
            variant: 'default'
          }
        ];
      case 'traites':
        return [
          { 
            label: "Ajouter un traité", 
            icon: <Plus size={16} />, 
            onClick: openAddTraiteModal, 
            variant: 'default'
          }
        ];
      case 'alliances':
        return [
          { 
            label: "Ajouter une alliance", 
            icon: <Plus size={16} />, 
            onClick: openAddAllianceModal, 
            variant: 'default'
          }
        ];
      default:
        return [];
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-row justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold">Relations Diplomatiques</CardTitle>
            <CardDescription>
              Gérez les relations de Rome avec les nations étrangères, les alliances et les traités.
            </CardDescription>
          </div>
          
          {activeTab === 'nations' && (
            <ActionButton 
              icon={<Globe size={16} className="mr-1" />}
              label="Nouvelle nation"
              onClick={openAddNationModal}
              variant="default"
              title="Ajouter une nouvelle nation"
            />
          )}
          
          {activeTab === 'traites' && (
            <ActionButton 
              icon={<FileText size={16} className="mr-1" />}
              label="Nouveau traité"
              onClick={openAddTraiteModal}
              variant="default"
              title="Ajouter un nouveau traité"
            />
          )}
          
          {activeTab === 'alliances' && (
            <ActionButton 
              icon={<Shield size={16} className="mr-1" />}
              label="Nouvelle alliance"
              onClick={openAddAllianceModal}
              variant="default"
              title="Ajouter une nouvelle alliance"
            />
          )}
        </div>
        
        <div className="flex items-center gap-2 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Rechercher par nom, région, type..."
              className="pl-8"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <DiplomaticFilters 
            activeTab={activeTab}
            onFilterChange={handleFilterChange}
            onReset={resetFilters}
          />
        </div>

        {Object.values(filters).some(value => value !== '') && (
          <div className="mt-2 text-sm">
            <span className="font-medium">Filtres actifs: </span>
            {filters.status && <span className="mr-2">Statut: {filters.status}</span>}
            {filters.region && <span className="mr-2">Région: {filters.region}</span>}
            {filters.dateFrom && <span className="mr-2">De: {filters.dateFrom}</span>}
            {filters.dateTo && <span>À: {filters.dateTo}</span>}
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="nations">Nations</TabsTrigger>
            <TabsTrigger value="traites">Traités</TabsTrigger>
            <TabsTrigger value="alliances">Alliances</TabsTrigger>
          </TabsList>
          
          <TabsContent value="nations" className="mt-4">
            <ActionsPanel
              title="Actions disponibles"
              description="Gérez les relations avec les nations étrangères"
              actions={getTabActions()}
              className="mb-4"
            />
            <NationsList searchTerm={searchTerm} filters={filters} />
          </TabsContent>
          
          <TabsContent value="traites" className="mt-4">
            <ActionsPanel
              title="Actions disponibles"
              description="Gérez les traités diplomatiques"
              actions={getTabActions()}
              className="mb-4"
            />
            <TraitesList searchTerm={searchTerm} filters={filters} />
          </TabsContent>
          
          <TabsContent value="alliances" className="mt-4">
            <ActionsPanel
              title="Actions disponibles"
              description="Gérez les alliances militaires"
              actions={getTabActions()}
              className="mb-4"
            />
            <AlliancesMilitaires searchTerm={searchTerm} filters={filters} />
          </TabsContent>
        </Tabs>
      </CardContent>
      
      {/* Modale pour ajouter une nouvelle nation */}
      <Dialog open={isAddNationOpen} onOpenChange={setIsAddNationOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Ajouter une nouvelle nation</DialogTitle>
            <DialogDescription>
              Ajoutez les détails de la nouvelle nation et définissez ses relations avec Rome.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {/* Formulaire à implémenter */}
            <p className="text-center text-muted-foreground">
              Formulaire d'ajout de nation à implémenter
            </p>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddNationOpen(false)}>Annuler</Button>
            <Button onClick={() => handleAdd('nation')}>Ajouter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Modale pour ajouter un nouveau traité */}
      <Dialog open={isAddTraiteOpen} onOpenChange={setIsAddTraiteOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Ajouter un nouveau traité</DialogTitle>
            <DialogDescription>
              Spécifiez les détails du traité et les nations impliquées.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {/* Formulaire à implémenter */}
            <p className="text-center text-muted-foreground">
              Formulaire d'ajout de traité à implémenter
            </p>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTraiteOpen(false)}>Annuler</Button>
            <Button onClick={() => handleAdd('traite')}>Ajouter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Modale pour ajouter une nouvelle alliance */}
      <Dialog open={isAddAllianceOpen} onOpenChange={setIsAddAllianceOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Ajouter une nouvelle alliance</DialogTitle>
            <DialogDescription>
              Définissez les membres et les termes de la nouvelle alliance militaire.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {/* Formulaire à implémenter */}
            <p className="text-center text-muted-foreground">
              Formulaire d'ajout d'alliance à implémenter
            </p>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddAllianceOpen(false)}>Annuler</Button>
            <Button onClick={() => handleAdd('alliance')}>Ajouter</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
