import React, { useState } from 'react';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BatimentsTable } from '@/components/republique/batiments/BatimentsTable';
import { useBatimentsPublics, PublicBuilding, ConstructionProject } from '@/components/republique/batiments/hooks/useBatimentsPublics';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CirclePlus, RefreshCw, FileText, Sword, Shield, Map } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { formatMoney } from '@/utils/formatUtils';
import { toast } from 'sonner';

export const BatimentsMilitairesPage: React.FC = () => {
  const {
    publicBuildings: militaryBuildings,
    constructionProjects: militaryProjects,
    startConstructionProject,
    approveConstructionProject,
    advanceConstruction,
    maintainBuilding
  } = useBatimentsPublics(); // Nous utilisons le même hook, mais nous filtrerons les bâtiments militaires
  
  const [selectedItem, setSelectedItem] = useState<PublicBuilding | ConstructionProject | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isMaintenanceDialogOpen, setIsMaintenanceDialogOpen] = useState(false);
  const [isNewProjectDialogOpen, setIsNewProjectDialogOpen] = useState(false);
  const [maintenanceLevel, setMaintenanceLevel] = useState<'minimal' | 'standard' | 'excellent'>('standard');
  
  // État pour le nouveau projet
  const [newProject, setNewProject] = useState({
    name: '',
    location: '',
    estimatedCost: 150000,
    duration: 3,
    buildingTypeId: 'castra',
    benefits: []
  });
  
  // Fonctions de gestion identiques à BatimentsPage
  const handleViewDetails = (item: PublicBuilding | ConstructionProject) => {
    setSelectedItem(item);
    setIsDetailsOpen(true);
  };
  
  const handleMaintainBuilding = (buildingId: string) => {
    const building = militaryBuildings.find(b => b.id === buildingId);
    if (building) {
      setSelectedItem(building);
      setIsMaintenanceDialogOpen(true);
    }
  };
  
  const handlePerformMaintenance = () => {
    if (selectedItem && 'id' in selectedItem) {
      maintainBuilding(selectedItem.id, maintenanceLevel as 'minimal' | 'normal' | 'excellent');
      setIsMaintenanceDialogOpen(false);
    }
  };
  
  const handleApproveProject = (projectId: string) => {
    approveConstructionProject(projectId);
  };
  
  const handleAdvanceProject = (projectId: string) => {
    advanceConstruction(projectId, 10);
  };
  
  const handleCreateProject = () => {
    if (!newProject.name || !newProject.location) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    
    const project = {
      ...newProject,
      benefits: ['Renforce la défense de Rome', 'Améliore la puissance militaire'],
      sponsors: ['Sénat romain', 'Commandement militaire']
    };
    
    startConstructionProject(project);
    setIsNewProjectDialogOpen(false);
    
    // Reset form
    setNewProject({
      name: '',
      location: '',
      estimatedCost: 150000,
      duration: 3,
      buildingTypeId: 'castra',
      benefits: []
    });
  };
  
  const isBuilding = (item: any): item is PublicBuilding => {
    return 'constructionStatus' in item;
  };
  
  // Filtrer pour n'afficher que les bâtiments militaires (simulation)
  const filteredMilitaryBuildings = militaryBuildings.filter(b => 
    ['castra', 'arsenal', 'muraille', 'champ_mars', 'portus_militum'].includes(b.buildingTypeId)
  );
  
  const filteredMilitaryProjects = militaryProjects.filter(p => 
    ['castra', 'arsenal', 'muraille', 'champ_mars', 'portus_militum'].includes(p.buildingTypeId)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageHeader 
          title="Infrastructures Militaires" 
          subtitle="Gestion des défenses et des installations militaires de la République" 
        />
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsNewProjectDialogOpen(true)}
            className="roman-btn-outline"
          >
            <CirclePlus className="h-4 w-4 mr-1" />
            Nouveau projet
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="roman-btn-outline"
          >
            <Map className="h-4 w-4 mr-1" />
            Carte stratégique
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="roman-btn-outline"
          >
            <Shield className="h-4 w-4 mr-1" />
            Rapport militaire
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="buildings" className="space-y-4">
        <TabsList className="border border-rome-gold/30 bg-white">
          <TabsTrigger value="buildings">Installations existantes</TabsTrigger>
          <TabsTrigger value="projects">Projets de construction</TabsTrigger>
          <TabsTrigger value="strategy">Stratégie défensive</TabsTrigger>
        </TabsList>
        
        <TabsContent value="buildings">
          <RomanCard>
            <RomanCard.Header>
              <h2 className="font-cinzel text-lg">Infrastructures militaires de Rome</h2>
            </RomanCard.Header>
            <RomanCard.Content>
              <p className="text-muted-foreground mb-4">
                Les installations militaires sont essentielles à la défense de la République et à la projection de sa puissance. Assurez-vous de maintenir ces structures en bon état.
              </p>
              <BatimentsTable 
                buildings={filteredMilitaryBuildings}
                type="buildings"
                onViewDetails={handleViewDetails}
                onMaintain={handleMaintainBuilding}
              />
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
        
        <TabsContent value="projects">
          <RomanCard>
            <RomanCard.Header>
              <h2 className="font-cinzel text-lg">Projets militaires en cours</h2>
            </RomanCard.Header>
            <RomanCard.Content>
              <p className="text-muted-foreground mb-4">
                Ces projets stratégiques renforceront la capacité militaire de Rome. Supervisez leur progression et assurez-vous qu'ils respectent les délais.
              </p>
              <BatimentsTable 
                projects={filteredMilitaryProjects}
                type="projects"
                onViewDetails={handleViewDetails}
                onApprove={handleApproveProject}
                onAdvance={handleAdvanceProject}
              />
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
        
        <TabsContent value="strategy">
          <RomanCard>
            <RomanCard.Header>
              <h2 className="font-cinzel text-lg">Stratégie défensive</h2>
            </RomanCard.Header>
            <RomanCard.Content>
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <Sword className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Planification stratégique</h3>
                <p className="text-muted-foreground">
                  Cette section est réservée au Consul et au Sénat. Elle permet de planifier la stratégie défensive de Rome et d'allouer les ressources militaires.
                </p>
              </div>
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
      </Tabs>
      
      {/* Dialogues identiques à BatimentsPage */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle className="font-cinzel">
                  {selectedItem.name}
                  {isBuilding(selectedItem) && (
                    <Badge className="ml-2">
                      {selectedItem.constructionStatus === 'completed' ? 'Terminé' : 
                       selectedItem.constructionStatus === 'damaged' ? 'Endommagé' :
                       selectedItem.constructionStatus === 'in_progress' ? 'En construction' : 'Planifié'}
                    </Badge>
                  )}
                </DialogTitle>
                <DialogDescription>
                  Situé à {selectedItem.location}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                {isBuilding(selectedItem) ? (
                  <>
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label className="text-right">Année de construction</Label>
                      <div>{selectedItem.constructionYear} AUC</div>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label className="text-right">État actuel</Label>
                      <div>{selectedItem.condition}%</div>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label className="text-right">Coût d'entretien</Label>
                      <div>{formatMoney(selectedItem.maintenanceCost)}/an</div>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label className="text-right">Niveau d'entretien</Label>
                      <div>
                        <span className={selectedItem.maintenanceLevel === 'minimal' ? 'font-medium' : ''}>Minimal</span>
                        {' • '}
                        <span className={selectedItem.maintenanceLevel === 'normal' ? 'font-medium' : ''}>Normal</span>
                        {' • '}
                        <span className={selectedItem.maintenanceLevel === 'excellent' ? 'font-medium' : ''}>Excellent</span>
                      </div>
                    </div>
                    {selectedItem.lastMaintenance && (
                      <div className="grid grid-cols-2 items-center gap-4">
                        <Label className="text-right">Dernier entretien</Label>
                        <div>{selectedItem.lastMaintenance} AUC</div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label className="text-right">Coût estimé</Label>
                      <div>{formatMoney(selectedItem.estimatedCost)}</div>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label className="text-right">Durée estimée</Label>
                      <div>{selectedItem.duration} {selectedItem.duration > 1 ? 'années' : 'année'}</div>
                    </div>
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label className="text-right">Progression</Label>
                      <div>{selectedItem.progress}%</div>
                    </div>
                    {selectedItem.startedYear && (
                      <div className="grid grid-cols-2 items-center gap-4">
                        <Label className="text-right">Début des travaux</Label>
                        <div>{selectedItem.startedYear} AUC</div>
                      </div>
                    )}
                    {selectedItem.expectedCompletionYear && (
                      <div className="grid grid-cols-2 items-center gap-4">
                        <Label className="text-right">Fin prévue</Label>
                        <div>{selectedItem.expectedCompletionYear} AUC</div>
                      </div>
                    )}
                    {selectedItem.sponsors && (
                      <div className="grid grid-cols-2 items-center gap-4">
                        <Label className="text-right">Financeurs</Label>
                        <div>{selectedItem.sponsors.join(', ')}</div>
                      </div>
                    )}
                  </>
                )}
                
                <Separator />
                
                <div className="grid grid-cols-2 items-start gap-4">
                  <Label className="text-right">Avantages</Label>
                  <div>
                    <ul className="list-disc pl-5 space-y-1">
                      {selectedItem.benefits.map((benefit, index) => (
                        <li key={index} className="text-sm">{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                  Fermer
                </Button>
                {isBuilding(selectedItem) && (
                  <Button onClick={() => {
                    setIsDetailsOpen(false);
                    handleMaintainBuilding(selectedItem.id);
                  }}>
                    Effectuer la maintenance
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Dialogue de maintenance identique */}
      <Dialog open={isMaintenanceDialogOpen} onOpenChange={setIsMaintenanceDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Maintenance de l'installation militaire</DialogTitle>
            <DialogDescription>
              Choisissez le niveau de maintenance à effectuer pour {selectedItem?.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="maintenance-minimal">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="maintenance-minimal"
                    name="maintenance"
                    checked={maintenanceLevel === 'minimal'}
                    onChange={() => setMaintenanceLevel('minimal')}
                    className="h-4 w-4"
                  />
                  <span>Minimal (70% du coût)</span>
                </div>
                <p className="text-sm text-muted-foreground ml-6">
                  Réparations essentielles uniquement. Améliore l'état de 5%.
                </p>
              </Label>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maintenance-standard">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="maintenance-standard"
                    name="maintenance"
                    checked={maintenanceLevel === 'standard'}
                    onChange={() => setMaintenanceLevel('standard')}
                    className="h-4 w-4"
                  />
                  <span>Standard (100% du coût)</span>
                </div>
                <p className="text-sm text-muted-foreground ml-6">
                  Maintenance complète. Améliore l'état de 15%.
                </p>
              </Label>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="maintenance-excellent">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="maintenance-excellent"
                    name="maintenance"
                    checked={maintenanceLevel === 'excellent'}
                    onChange={() => setMaintenanceLevel('excellent')}
                    className="h-4 w-4"
                  />
                  <span>Excellent (150% du coût)</span>
                </div>
                <p className="text-sm text-muted-foreground ml-6">
                  Maintenance stratégique avec renforcements. Améliore l'état de 30%.
                </p>
              </Label>
            </div>
            
            {selectedItem && isBuilding(selectedItem) && (
              <div className="mt-2 p-3 bg-muted rounded-md">
                <p className="text-sm">
                  Coût estimé: {formatMoney(selectedItem.maintenanceCost * (
                    maintenanceLevel === 'minimal' ? 0.7 : 
                    maintenanceLevel === 'standard' ? 1 : 1.5
                  ))}
                </p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMaintenanceDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handlePerformMaintenance}>
              Effectuer la maintenance
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialogue pour nouveau projet militaire */}
      <Dialog open={isNewProjectDialogOpen} onOpenChange={setIsNewProjectDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Nouveau projet militaire</DialogTitle>
            <DialogDescription>
              Proposez une nouvelle installation militaire pour renforcer les défenses de la République.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="project-name" className="text-right">
                Nom
              </Label>
              <Input
                id="project-name"
                value={newProject.name}
                onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                className="col-span-3"
                placeholder="Ex: Castra Prætoria"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="project-location" className="text-right">
                Emplacement
              </Label>
              <Input
                id="project-location"
                value={newProject.location}
                onChange={(e) => setNewProject({...newProject, location: e.target.value})}
                className="col-span-3"
                placeholder="Ex: Nord de Rome"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="project-cost" className="text-right">
                Coût estimé
              </Label>
              <Input
                id="project-cost"
                type="number"
                value={newProject.estimatedCost}
                onChange={(e) => setNewProject({...newProject, estimatedCost: parseInt(e.target.value)})}
                className="col-span-3"
                min={50000}
                step={10000}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="project-duration" className="text-right">
                Durée (années)
              </Label>
              <Input
                id="project-duration"
                type="number"
                value={newProject.duration}
                onChange={(e) => setNewProject({...newProject, duration: parseInt(e.target.value)})}
                className="col-span-3"
                min={1}
                max={10}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="project-type" className="text-right">
                Type
              </Label>
              <select
                id="project-type"
                value={newProject.buildingTypeId}
                onChange={(e) => setNewProject({...newProject, buildingTypeId: e.target.value})}
                className="col-span-3 border rounded-md p-2"
              >
                <option value="castra">Castra (Camp militaire)</option>
                <option value="arsenal">Arsenal</option>
                <option value="champ_mars">Champ de Mars</option>
                <option value="portus_militum">Port militaire</option>
                <option value="muraille">Muraille et fortifications</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewProjectDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleCreateProject}>
              Proposer le projet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
