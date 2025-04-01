
import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Hammer, Coins, Users, Shield, Settings, ArrowUpCircle } from "lucide-react";
import { OwnedBuilding } from '../types/buildingTypes';
import { toast } from "sonner";

interface BuildingManagementActionsProps {
  building: OwnedBuilding;
  onPerformMaintenance: (buildingId: string) => void;
  onUpdateMaintenanceLevel: (buildingId: string, level: number) => void;
  onUpdateSecurityLevel: (buildingId: string, level: number) => void;
  onAssignWorkers: (buildingId: string, count: number) => void;
  onRename: (buildingId: string, newName: string) => void;
  onToggleMaintenance: (buildingId: string, enabled: boolean) => void;
  canAffordMaintenance: boolean;
  canAffordSecurity: boolean;
}

export const BuildingManagementActions: React.FC<BuildingManagementActionsProps> = ({
  building,
  onPerformMaintenance,
  onUpdateMaintenanceLevel,
  onUpdateSecurityLevel,
  onAssignWorkers,
  onRename,
  onToggleMaintenance,
  canAffordMaintenance,
  canAffordSecurity
}) => {
  const [maintenanceLevel, setMaintenanceLevel] = React.useState(building.maintenanceLevel || 1);
  const [securityLevel, setSecurityLevel] = React.useState(building.securityLevel || 1);
  const [workerCount, setWorkerCount] = React.useState(building.workers || 0);
  const [newName, setNewName] = React.useState(building.name);
  const [maintenanceEnabled, setMaintenanceEnabled] = React.useState(building.maintenanceEnabled || false);
  
  // Effet de la maintenanceLevel sur le coût
  const maintenanceCost = Math.round(building.maintenanceCost * (maintenanceLevel / 5));
  
  // Effet du securityLevel sur le coût
  const securityCost = Math.round(building.maintenanceCost * 0.5 * (securityLevel / 5));
  
  // Confirmation pour la maintenance immédiate
  const handlePerformMaintenance = () => {
    if (window.confirm(`Effectuer une maintenance immédiate pour ${Math.round(building.maintenanceCost * 0.5)} As ?`)) {
      onPerformMaintenance(building.id);
    }
  };
  
  // Appliquer les changements de niveau de maintenance
  const applyMaintenanceChange = () => {
    onUpdateMaintenanceLevel(building.id, maintenanceLevel);
    toast.success(`Niveau d'entretien mis à jour pour ${building.name}`);
  };
  
  // Appliquer les changements de niveau de sécurité
  const applySecurityChange = () => {
    onUpdateSecurityLevel(building.id, securityLevel);
    toast.success(`Niveau de sécurité mis à jour pour ${building.name}`);
  };
  
  // Affecter des travailleurs
  const applyWorkerChange = () => {
    onAssignWorkers(building.id, workerCount);
    toast.success(`${workerCount} travailleurs affectés à ${building.name}`);
  };
  
  // Renommer le bâtiment
  const applyRename = () => {
    if (newName.trim() === '') {
      toast.error("Le nom ne peut pas être vide");
      return;
    }
    onRename(building.id, newName);
    toast.success(`Bâtiment renommé en ${newName}`);
  };
  
  // Activer/désactiver l'entretien automatique
  const toggleMaintenance = () => {
    const newState = !maintenanceEnabled;
    setMaintenanceEnabled(newState);
    onToggleMaintenance(building.id, newState);
    toast.success(`Entretien automatique ${newState ? 'activé' : 'désactivé'} pour ${building.name}`);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Actions pour {building.name}
        </CardTitle>
        <CardDescription>
          Gérez l'entretien, la sécurité et le personnel de ce bâtiment
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="maintenance" className="w-full">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="maintenance" className="flex items-center gap-1">
              <Hammer className="h-4 w-4" />
              <span className="hidden sm:inline">Entretien</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-1">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Sécurité</span>
            </TabsTrigger>
            <TabsTrigger value="workers" className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Personnel</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-1">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Paramètres</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Onglet Entretien */}
          <TabsContent value="maintenance" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="flex flex-col space-y-1">
                <div className="flex justify-between">
                  <Label htmlFor="maintenance-level">Niveau d'entretien</Label>
                  <span className="text-sm">{maintenanceLevel}/10</span>
                </div>
                <Slider 
                  id="maintenance-level"
                  min={1} 
                  max={10} 
                  step={1}
                  value={[maintenanceLevel]}
                  onValueChange={(values) => setMaintenanceLevel(values[0])}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Coût estimé: {maintenanceCost} As/mois
                </p>
              </div>
              
              <div className="flex items-center justify-between space-x-2">
                <Button 
                  onClick={applyMaintenanceChange} 
                  disabled={!canAffordMaintenance}
                  variant="outline"
                >
                  Appliquer les changements
                </Button>
                
                <Button 
                  onClick={handlePerformMaintenance}
                  disabled={building.condition >= 100}
                  variant="secondary"
                >
                  Maintenance immédiate
                </Button>
              </div>
              
              <div className="flex items-center space-x-2 pt-2">
                <Button 
                  onClick={toggleMaintenance}
                  variant={maintenanceEnabled ? "default" : "outline"}
                  className="w-full"
                >
                  {maintenanceEnabled ? "Désactiver" : "Activer"} l'entretien automatique
                </Button>
              </div>
            </div>
          </TabsContent>
          
          {/* Onglet Sécurité */}
          <TabsContent value="security" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="flex flex-col space-y-1">
                <div className="flex justify-between">
                  <Label htmlFor="security-level">Niveau de sécurité</Label>
                  <span className="text-sm">{securityLevel}/10</span>
                </div>
                <Slider 
                  id="security-level"
                  min={1} 
                  max={10} 
                  step={1}
                  value={[securityLevel]}
                  onValueChange={(values) => setSecurityLevel(values[0])}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Coût estimé: {securityCost} As/mois
                </p>
              </div>
              
              <Button 
                onClick={applySecurityChange} 
                disabled={!canAffordSecurity}
                className="w-full"
              >
                Appliquer les changements
              </Button>
            </div>
          </TabsContent>
          
          {/* Onglet Personnel */}
          <TabsContent value="workers" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="flex flex-col space-y-1">
                <Label htmlFor="worker-count">Nombre de travailleurs</Label>
                <div className="flex items-center space-x-2">
                  <Input 
                    id="worker-count"
                    type="number" 
                    min={0} 
                    max={building.maxWorkers || 20}
                    value={workerCount}
                    onChange={(e) => setWorkerCount(Number(e.target.value))}
                    className="w-20"
                  />
                  <span className="text-sm text-muted-foreground">
                    / {building.maxWorkers || 20} max
                  </span>
                </div>
              </div>
              
              <Button 
                onClick={applyWorkerChange} 
                className="w-full"
              >
                Affecter le personnel
              </Button>
            </div>
          </TabsContent>
          
          {/* Onglet Paramètres */}
          <TabsContent value="settings" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="flex flex-col space-y-1">
                <Label htmlFor="building-name">Nom du bâtiment</Label>
                <Input 
                  id="building-name"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
              
              <Button 
                onClick={applyRename} 
                className="w-full"
              >
                Renommer
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
