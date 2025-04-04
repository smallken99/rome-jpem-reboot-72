
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Building, MapPin, Users, Coins, Wrench } from 'lucide-react';
import { OwnedBuilding } from '@/components/proprietes/types/property';
import { PropertyActions } from './PropertyActions';
import { PropertyRelationsPanel } from '../relations/PropertyRelationsPanel';
import { useBuildingManagement } from '@/hooks/useBuildingManagement';
import { toast } from 'sonner';
import { RomanCard } from '@/components/ui-custom/RomanCard';

export const PropertyDetail: React.FC = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const navigate = useNavigate();
  const { buildings, sellBuilding, updateBuildingCondition } = useBuildingManagement();
  
  const building = buildings.find(b => b.id === propertyId);
  
  if (!building) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold">Propriété non trouvée</h2>
        <p className="mb-4 text-muted-foreground">
          La propriété que vous recherchez n'existe pas ou a été supprimée.
        </p>
        <Button onClick={() => navigate('/patrimoine/proprietes')}>
          Retour aux propriétés
        </Button>
      </div>
    );
  }
  
  const getConditionColor = (condition: number) => {
    if (condition >= 80) return 'bg-green-600';
    if (condition >= 60) return 'bg-green-500';
    if (condition >= 40) return 'bg-yellow-500';
    if (condition >= 20) return 'bg-orange-500';
    return 'bg-red-500';
  };
  
  const getConditionText = (condition: number) => {
    if (condition >= 80) return 'Excellent';
    if (condition >= 60) return 'Bon';
    if (condition >= 40) return 'Moyen';
    if (condition >= 20) return 'Mauvais';
    return 'Critique';
  };
  
  const handleRenovate = () => {
    updateBuildingCondition(building.id.toString(), 20);
    toast.success(`${building.name} a été rénové avec succès`);
  };
  
  const handleSell = () => {
    if (window.confirm(`Êtes-vous sûr de vouloir vendre ${building.name}?`)) {
      sellBuilding(building.id.toString());
      toast.success(`${building.name} a été vendu avec succès`);
      navigate('/patrimoine/proprietes');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/patrimoine/proprietes')}
          className="flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Button>
        <h1 className="text-2xl font-bold font-cinzel">{building.name}</h1>
      </div>
      
      <RomanCard>
        <RomanCard.Header>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Détails de la propriété</h2>
            </div>
            <Badge variant={building.maintenanceEnabled ? "default" : "destructive"}>
              {building.maintenanceEnabled ? "Entretenue" : "Négligée"}
            </Badge>
          </div>
        </RomanCard.Header>
        <RomanCard.Content>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center mb-1">
                    <MapPin className="w-4 h-4 mr-1 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Emplacement</span>
                  </div>
                  <p className="font-medium">{building.location}</p>
                </div>
                
                <div>
                  <div className="flex items-center mb-1">
                    <Users className="w-4 h-4 mr-1 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Personnel</span>
                  </div>
                  <p className="font-medium">{building.workers || 0} travailleurs</p>
                  <p className="text-sm text-muted-foreground">
                    {building.slaves || 0} esclaves assignés
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center mb-1">
                    <Coins className="w-4 h-4 mr-1 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Finances</span>
                  </div>
                  <p className="font-medium">
                    {(building.income || 0).toLocaleString()} As/an de revenus
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {(building.maintenanceCost || 0).toLocaleString()} As/an d'entretien
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                      <Wrench className="w-4 h-4 mr-1 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">État</span>
                    </div>
                    <span className="text-sm font-medium">{getConditionText(building.condition)}</span>
                  </div>
                  <Progress 
                    value={building.condition} 
                    className={`h-2 ${getConditionColor(building.condition)}`} 
                  />
                </div>
              </div>
            </div>
          </div>
        </RomanCard.Content>
      </RomanCard>
      
      <PropertyActions 
        building={building as OwnedBuilding}
        onRenovate={handleRenovate}
        onSell={handleSell}
        maintenanceEnabled={building.maintenanceEnabled}
      />
      
      <PropertyRelationsPanel 
        propertyId={building.id.toString()} 
        propertyName={building.name} 
      />
    </div>
  );
};
