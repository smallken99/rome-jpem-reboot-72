import React from 'react';
import { OwnedBuildingProps } from '../../../hooks/building/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Edit, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { BuildingCondition } from './BuildingCondition';

interface OwnedUrbanPropertiesSectionProps {
  buildings: OwnedBuildingProps['building'][];
  onSell: (id: number | string) => void;
  estimatedValue: (building: OwnedBuildingProps['building']) => number;
}

export const OwnedUrbanPropertiesSection: React.FC<OwnedUrbanPropertiesSectionProps> = ({ buildings, onSell, estimatedValue }) => {
  if (!buildings || buildings.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500">Aucune propriété urbaine acquise pour le moment.</p>
      </div>
    );
  }

  const BuildingCard: React.FC<OwnedBuildingProps> = ({ building, onSell, estimatedValue }) => {
    const [condition, setCondition] = React.useState(building.condition);
    const [isEditing, setIsEditing] = React.useState(false);
    const [newName, setNewName] = React.useState(building.name);

    const handleConditionChange = (value: number[]) => {
      setCondition(value[0]);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewName(e.target.value);
    };

    const handleEditClick = () => {
      setIsEditing(true);
    };

    const handleSaveClick = () => {
      // Save the new name and update the building
      // Here you would typically call a function to update the building's name
      toast.success(`Nom de la propriété mis à jour: ${newName}`);
      setIsEditing(false);
    };

    const handleCancelClick = () => {
      setNewName(building.name);
      setIsEditing(false);
    };

    // Fix the type error on line 106
    const handleSellProperty = (id: number | string) => {
      // Convert id to appropriate type for onSell
      const numericId = typeof id === 'string' ? parseInt(id) : id;
      onSell(numericId);
    };

    return (
      <Card className="bg-zinc-100 shadow-md">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            {isEditing ? (
              <Input type="text" value={newName} onChange={handleNameChange} className="text-lg font-semibold" />
            ) : (
              <span className="text-lg font-semibold">{building.name}</span>
            )}
            {building.buildingType === "urban" && <Badge className="bg-blue-500 text-white">{building.buildingType}</Badge>}
            {building.buildingType === "religious" && <Badge className="bg-green-500 text-white">{building.buildingType}</Badge>}
            {building.buildingType === "public" && <Badge className="bg-amber-500 text-white">{building.buildingType}</Badge>}
          </CardTitle>
          <CardDescription>{building.location}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Label htmlFor="condition">État:</Label>
            <BuildingCondition condition={condition} />
          </div>
          <Slider
            id="condition"
            defaultValue={[condition]}
            max={100}
            step={1}
            onValueChange={handleConditionChange}
            aria-label="État du bâtiment"
          />
          <div className="space-y-2">
            <p>Valeur estimée: {estimatedValue(building)} As</p>
            <p>Coût de maintenance: {building.maintenanceCost} As</p>
            <p>Esclaves: {building.slaves}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          {isEditing ? (
            <div className="space-x-2">
              <Button size="sm" onClick={handleSaveClick}>Sauvegarder</Button>
              <Button size="sm" variant="ghost" onClick={handleCancelClick}>Annuler</Button>
            </div>
          ) : (
            <Button size="sm" variant="outline" onClick={handleEditClick}>
              <Edit className="h-4 w-4 mr-2" />
              Modifier
            </Button>
          )}
          <Button size="sm" variant="destructive" onClick={() => handleSellProperty(building.id)}>
            <Trash2 className="h-4 w-4 mr-2" />
            Vendre
          </Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {buildings.map((building) => (
        <BuildingCard
          key={building.id}
          building={building}
          onSell={onSell}
          estimatedValue={estimatedValue}
        />
      ))}
    </div>
  );
};
