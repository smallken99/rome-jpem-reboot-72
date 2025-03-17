
import React, { useState } from 'react';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BuildingsTable } from './components/BuildingsTable';
import { useBatimentsPublics, PublicBuilding, ConstructionProject } from './hooks/useBatimentsPublics';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CirclePlus, RefreshCw, FileText } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { formatMoney } from '@/utils/formatUtils';
import { toast } from 'sonner';
import { BatimentsTable } from './BatimentsTable';

export const GestionBatimentsPage: React.FC = () => {
  const {
    publicBuildings,
    constructionProjects,
    maintainBuilding,
    addPublicBuilding,
    updateBuildingCondition,
    startConstructionProject,
    approveConstructionProject,
    advanceConstruction,
    updateBuilding
  } = useBatimentsPublics();

  const [selectedItem, setSelectedItem] = useState<PublicBuilding | ConstructionProject | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isMaintenanceDialogOpen, setIsMaintenanceDialogOpen] = useState(false);
  const [maintenanceLevel, setMaintenanceLevel] = useState<'minimal' | 'normal' | 'excellent'>('normal');
  const [isNewProjectDialogOpen, setIsNewProjectDialogOpen] = useState(false);

  const handleViewDetails = (item: PublicBuilding | ConstructionProject) => {
    setSelectedItem(item);
    setIsDetailsOpen(true);
  };

  const handleMaintainBuilding = (buildingId: string) => {
    const building = publicBuildings.find(b => b.id === buildingId);
    if (building) {
      setSelectedItem(building);
      setIsMaintenanceDialogOpen(true);
    }
  };

  const handlePerformMaintenance = () => {
    if (selectedItem && 'id' in selectedItem) {
      maintainBuilding(selectedItem.id, maintenanceLevel as 'minimal' | 'normal' | 'excellent');
      setIsMaintenanceDialogOpen(false);
      toast.success(`Maintenance effectuée pour ${selectedItem.name}`);
    }
  };

  const handleApproveProject = (projectId: string) => {
    approveConstructionProject(projectId);
  };

  const handleAdvanceProject = (projectId: string) => {
    advanceConstruction(projectId, 10);
  };

  const isBuilding = (item: PublicBuilding | ConstructionProject): item is PublicBuilding => {
    return 'condition' in item;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <PageHeader
          title="Gestion des Bâtiments Publics"
          subtitle="Supervision et entretien des infrastructures de la République"
        />
        <Button variant="outline" size="sm" onClick={() => setIsNewProjectDialogOpen(true)}>
          <CirclePlus className="h-4 w-4 mr-1" />
          Nouveau projet
        </Button>
      </div>

      <Tabs defaultValue="buildings" className="space-y-4">
        <TabsList className="border border-rome-gold/30 bg-white">
          <TabsTrigger value="buildings">Bâtiments existants</TabsTrigger>
          <TabsTrigger value="projects">Projets de construction</TabsTrigger>
        </TabsList>

        <TabsContent value="buildings">
          <RomanCard>
            <RomanCard.Header>
              <h2 className="font-cinzel text-lg">Infrastructures de la République</h2>
            </RomanCard.Header>
            <RomanCard.Content>
              <p className="text-muted-foreground mb-4">
                Les bâtiments publics sont essentiels au bon fonctionnement de la République. Assurez-vous de maintenir ces structures en bon état.
              </p>
              <BuildingsTable
                buildings={publicBuildings}
                onViewDetails={handleViewDetails}
                onMaintain={handleMaintainBuilding}
              />
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>

        <TabsContent value="projects">
          <RomanCard>
            <RomanCard.Header>
              <h2 className="font-cinzel text-lg">Projets de construction en cours</h2>
            </RomanCard.Header>
            <RomanCard.Content>
              <p className="text-muted-foreground mb-4">
                Ces projets amélioreront l'infrastructure de Rome. Supervisez leur progression et assurez-vous qu'ils respectent les délais.
              </p>
              <BatimentsTable
                type="projects"
                projects={constructionProjects}
                onViewDetails={handleViewDetails}
                onApprove={handleApproveProject}
                onAdvance={handleAdvanceProject}
              />
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
      </Tabs>

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
                      <div>{selectedItem.maintenanceLevel === 'minimal' ? 'Minimal' :
                           selectedItem.maintenanceLevel === 'normal' ? 'Normal' : 'Excellent'}</div>
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
                      {selectedItem.benefits && selectedItem.benefits.map((benefit, index) => (
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

      <Dialog open={isMaintenanceDialogOpen} onOpenChange={setIsMaintenanceDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Maintenance du bâtiment public</DialogTitle>
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
                    checked={maintenanceLevel === 'normal'}
                    onChange={() => setMaintenanceLevel('normal')}
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
                    maintenanceLevel === 'normal' ? 1 : 1.5
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

      <Dialog open={isNewProjectDialogOpen} onOpenChange={setIsNewProjectDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Nouveau projet de construction</DialogTitle>
            <DialogDescription>
              Proposez un nouveau bâtiment public pour améliorer Rome.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nom
              </Label>
              <Input id="name" defaultValue="Nouveau bâtiment" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Emplacement
              </Label>
              <Input id="location" defaultValue="Rome" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cost" className="text-right">
                Coût estimé
              </Label>
              <Input id="cost" defaultValue="100000" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duration" className="text-right">
                Durée (années)
              </Label>
              <Input id="duration" defaultValue="5" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewProjectDialogOpen(false)}>
              Annuler
            </Button>
            <Button>
              Proposer le projet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
