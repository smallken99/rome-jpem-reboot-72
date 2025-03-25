
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ActionsGroup, ActionItem } from '@/components/ui-custom/ActionsGroup';
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Edit, Building2, Map, CircleDollarSign, AreaChart, Wrench, User, ScrollText, BadgePercent, Coins } from "lucide-react";
import { OwnedBuilding } from "@/components/proprietes/hooks/building/types";
import { formatCurrency } from "@/utils/formatters";
import { BuildingSaleDialog } from "../../modals/BuildingSaleDialog";

interface OwnedUrbanPropertyDetailProps {
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

export const OwnedUrbanPropertyDetail: React.FC<OwnedUrbanPropertyDetailProps> = ({
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
                  <Building2 className="h-5 w-5" />
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
              <div className="space-y-4">
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
                    <div className="font-medium text-lg">{formatCurrency(building.income)}</div>
                  </div>
                  
                  <div className="border rounded-md p-3">
                    <div className="text-sm text-muted-foreground">Coût d'entretien</div>
                    <div className="font-medium text-lg">{formatCurrency(building.maintenanceCost)}</div>
                  </div>
                </div>
                
                <div className="p-4 border rounded-md">
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Gestion des esclaves
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
              </div>
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
                <div>{building.buildingType}</div>
                
                <div className="text-muted-foreground">Taille</div>
                <div>{building.size || "Moyenne"}</div>
                
                <div className="text-muted-foreground">Date d'achat</div>
                <div>{building.purchaseDate ? new Date(building.purchaseDate).toLocaleDateString('fr-FR') : "Inconnue"}</div>
                
                <div className="text-muted-foreground">Dernière maintenance</div>
                <div>{building.lastMaintenance ? new Date(building.lastMaintenance).toLocaleDateString('fr-FR') : "Jamais"}</div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">
                  {building.description || "Cette propriété urbaine est située dans " + building.location + ". Elle abrite des locataires et génère des revenus réguliers pour votre famille."}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <BuildingSaleDialog
        building={building}
        estimatedValue={estimatedValue}
        isOpen={isSaleDialogOpen}
        onClose={() => setIsSaleDialogOpen(false)}
        onSell={async () => {
          onSell();
          return true;
        }}
      />
    </div>
  );
};
