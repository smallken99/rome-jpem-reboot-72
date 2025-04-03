
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ActionsGroup, ActionItem } from '@/components/ui-custom/ActionsGroup';
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Edit, Home, Map, CircleDollarSign, AreaChart, Wrench, User, ScrollText, BadgePercent, Coins, Cloud, Grain, Plant } from "lucide-react";
import { OwnedBuilding } from "@/components/proprietes/hooks/building/types";
import { formatCurrency } from "@/utils/formatters";
import { BuildingSaleDialog } from "../../modals/BuildingSaleDialog";
import { PropertySaleDialog } from "../../dialogs/PropertySaleDialog";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

interface OwnedRuralPropertyDetailProps {
  building: OwnedBuilding;
  onBack: () => void;
  onMaintenance: () => void;
  onMaintenanceToggle: (enabled: boolean) => void;
  onAssignSlaves: (count: number) => void;
  onCollectIncome: () => void;
  onSell: () => void;
  onRename: (newName: string) => void;
  estimatedValue: number;
  efficiency: number;
}

export const OwnedRuralPropertyDetail: React.FC<OwnedRuralPropertyDetailProps> = ({
  building,
  onBack,
  onMaintenance,
  onMaintenanceToggle,
  onAssignSlaves,
  onCollectIncome,
  onSell,
  onRename,
  estimatedValue,
  efficiency
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(building.name);
  const [slaveCount, setSlaveCount] = useState(building.slaves || 0);
  const [isSaleDialogOpen, setIsSaleDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();
  
  const handleRename = () => {
    if (isEditing && newName.trim() !== "") {
      onRename(newName);
    }
    setIsEditing(!isEditing);
  };
  
  const handleAssignSlaves = () => {
    onAssignSlaves(slaveCount);
  };
  
  const primaryActions: ActionItem[] = [
    {
      icon: <Wrench className="h-4 w-4" />,
      label: "Maintenance",
      onClick: onMaintenance,
      variant: "secondary"
    },
    {
      icon: <CircleDollarSign className="h-4 w-4" />,
      label: "Collecter revenus",
      onClick: onCollectIncome,
      variant: "secondary"
    },
    {
      icon: <Coins className="h-4 w-4" />,
      label: "Vendre",
      onClick: () => setIsSaleDialogOpen(true),
      variant: "outline"
    }
  ];
  
  const maintenanceAction: ActionItem = {
    icon: <Wrench className="h-4 w-4" />,
    label: building.maintenanceEnabled ? "Désactiver entretien" : "Activer entretien",
    onClick: () => onMaintenanceToggle(!building.maintenanceEnabled),
    variant: building.maintenanceEnabled ? "outline" : "secondary"
  };
  
  const handleHarvest = () => {
    toast({
      title: "Récolte effectuée",
      description: `La récolte de ${building.name} a été effectuée avec succès.`,
    });
  };
  
  const handlePlant = () => {
    toast({
      title: "Plantation effectuée",
      description: `Les semences ont été plantées dans ${building.name}.`,
    });
  };
  
  return (
    <div className="space-y-6">
      <Button 
        variant="ghost" 
        className="mb-2" 
        onClick={onBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour à la liste
      </Button>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-2/3 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-start gap-2">
                <div className="mt-1">
                  <Home className="h-5 w-5" />
                </div>
                <div>
                  {isEditing ? (
                    <Input
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="h-8 w-64"
                      autoFocus
                    />
                  ) : (
                    <CardTitle className="text-xl">{building.name}</CardTitle>
                  )}
                  <div className="flex items-center mt-1 text-sm text-muted-foreground">
                    <Map className="h-4 w-4 mr-1" />
                    {building.location}
                  </div>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRename}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </CardHeader>
            
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="overview">Vue générale</TabsTrigger>
                  <TabsTrigger value="production">Production</TabsTrigger>
                  <TabsTrigger value="personnel">Personnel</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <ActionsGroup
                    actions={primaryActions}
                    direction="row"
                    justify="start"
                    wrap={true}
                    spacing="sm"
                  />
                  
                  <ActionsGroup
                    actions={[maintenanceAction]}
                    direction="row"
                    justify="start"
                    wrap={true}
                    spacing="sm"
                  />
                  
                  <Separator />
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="border rounded-md p-3">
                      <div className="text-sm text-muted-foreground">État</div>
                      <div className="font-medium text-lg">{building.condition}%</div>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <div className="text-sm text-muted-foreground">Valeur estimée</div>
                      <div className="font-medium text-lg">{formatCurrency(estimatedValue)}</div>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <div className="text-sm text-muted-foreground">Revenu annuel</div>
                      <div className="font-medium text-lg">{formatCurrency(building.income || 0)}</div>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <div className="text-sm text-muted-foreground">Coût d'entretien</div>
                      <div className="font-medium text-lg">{formatCurrency(building.maintenanceCost || 0)}</div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="production" className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <Grain className="h-5 w-5" />
                      <span>Cultures et Production</span>
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Cultures actuelles</p>
                        <p className="font-medium">Blé, Olives, Vignes</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Rendement</p>
                        <div className="flex items-center gap-2">
                          <Progress value={efficiency} className="h-2" />
                          <span className="text-sm">{efficiency.toFixed(1)}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Button variant="secondary" size="sm" onClick={handlePlant} className="gap-1">
                        <Plant className="h-4 w-4" />
                        <span>Planter</span>
                      </Button>
                      <Button variant="secondary" size="sm" onClick={handleHarvest} className="gap-1">
                        <Grain className="h-4 w-4" />
                        <span>Récolter</span>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <Cloud className="h-5 w-5" />
                      <span>Climat et Conditions</span>
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Climat actuel</p>
                        <p className="font-medium">Été chaud et sec</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Fertilité du sol</p>
                        <div className="flex items-center gap-2">
                          <Progress value={85} className="h-2" />
                          <span className="text-sm">85%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="personnel" className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <h3 className="font-medium mb-3 flex items-center gap-2">
                      <User className="h-5 w-5" />
                      <span>Gestion des esclaves</span>
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-4 items-center">
                      <div className="w-full sm:w-auto">
                        <Input 
                          type="number" 
                          min="0"
                          value={slaveCount}
                          onChange={(e) => setSlaveCount(Number(e.target.value))}
                          className="w-full sm:w-32"
                        />
                      </div>
                      
                      <Button 
                        variant="secondary" 
                        onClick={handleAssignSlaves}
                      >
                        Assigner esclaves
                      </Button>
                      
                      <div className="flex items-center gap-2">
                        <BadgePercent className="h-4 w-4" />
                        <span>Efficacité: {efficiency.toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <h3 className="font-medium mb-3">Personnel par tâche</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Laboureurs</p>
                        <p className="font-medium">{Math.floor(slaveCount * 0.4)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Bergers</p>
                        <p className="font-medium">{Math.floor(slaveCount * 0.2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Jardiniers</p>
                        <p className="font-medium">{Math.floor(slaveCount * 0.2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Gardes</p>
                        <p className="font-medium">{Math.floor(slaveCount * 0.2)}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div className="w-full md:w-1/3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ScrollText className="h-5 w-5" />
                <span>Détails de la propriété</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-muted-foreground">Type</div>
                <div>{building.buildingType || "Rural"}</div>
                
                <div className="text-muted-foreground">Taille</div>
                <div>{building.size || "Moyenne"}</div>
                
                <div className="text-muted-foreground">Acquis le</div>
                <div>{building.purchaseDate?.toLocaleDateString() || "Date inconnue"}</div>
                
                <div className="text-muted-foreground">Type de sol</div>
                <div>Fertile</div>
                
                <div className="text-muted-foreground">Accès à l'eau</div>
                <div>Rivière à proximité</div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="text-sm font-medium mb-2">Revenus récents</h4>
                <ul className="text-sm space-y-1">
                  <li className="flex justify-between">
                    <span>Dernier trimestre</span>
                    <span className="text-green-600">{formatCurrency((building.income || 0) / 4)}</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Année en cours</span>
                    <span className="text-green-600">{formatCurrency((building.income || 0) * 0.75)}</span>
                  </li>
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="text-sm font-medium mb-2">Actions spéciales</h4>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <AreaChart className="h-4 w-4 mr-2" />
                    Rapport détaillé
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Wrench className="h-4 w-4 mr-2" />
                    Améliorer l'irrigation
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <PropertySaleDialog
        open={isSaleDialogOpen}
        onOpenChange={setIsSaleDialogOpen}
        building={building}
        estimatedValue={estimatedValue}
        onSell={(id) => {
          onSell();
          return true;
        }}
      />
    </div>
  );
};
