
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { UserCheck, Building, Plus, XCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { useBuildingInventory } from '../../hooks/building/useBuildingInventory';
import { usePatrimoine } from '@/hooks/usePatrimoine';
import { toast } from 'sonner';

interface SlaveAssignment {
  propertyId: string;
  propertyName: string;
  assignedSlaves: number;
}

interface SlaveAssignmentsProps {
  slaveAssignments: SlaveAssignment[];
  availableSlaves: number;
  onAssignSlaves: (propertyId: string, propertyName: string, amount: number) => boolean;
  onRemoveAssignment: (propertyId: string) => boolean;
}

export const SlaveAssignments: React.FC<SlaveAssignmentsProps> = ({
  slaveAssignments,
  availableSlaves,
  onAssignSlaves,
  onRemoveAssignment
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [selectedPropertyName, setSelectedPropertyName] = useState<string>('');
  const [assignmentAmount, setAssignmentAmount] = useState(1);
  
  const { ownedBuildings } = useBuildingInventory();
  const { properties } = usePatrimoine();
  
  // Obtenir toutes les propriétés disponibles (bâtiments + propriétés)
  const allProperties = [
    ...ownedBuildings.map(b => ({ id: b.id, name: b.name || 'Bâtiment sans nom' })),
    ...properties.map(p => ({ id: p.id, name: p.name }))
  ];
  
  // Filtrer les propriétés qui n'ont pas encore d'esclaves assignés
  const unassignedProperties = allProperties.filter(
    property => !slaveAssignments.some(a => a.propertyId === property.id)
  );
  
  const handleSelectProperty = (id: string, name: string) => {
    setSelectedPropertyId(id);
    setSelectedPropertyName(name);
  };
  
  const handleAssignSlaves = () => {
    if (!selectedPropertyId || !selectedPropertyName) {
      toast.error("Veuillez sélectionner une propriété");
      return;
    }
    
    if (assignmentAmount <= 0) {
      toast.error("Veuillez entrer une quantité valide");
      return;
    }
    
    if (assignmentAmount > availableSlaves) {
      toast.error(`Vous ne pouvez assigner que ${availableSlaves} esclaves`);
      return;
    }
    
    const success = onAssignSlaves(selectedPropertyId, selectedPropertyName, assignmentAmount);
    
    if (success) {
      setIsDialogOpen(false);
      setSelectedPropertyId(null);
      setSelectedPropertyName('');
      setAssignmentAmount(1);
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Esclaves assignés</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="default" 
                className="gap-1" 
                disabled={unassignedProperties.length === 0 || availableSlaves === 0}
              >
                <Plus className="h-4 w-4" />
                <span>Nouvelle affectation</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Assigner des esclaves</DialogTitle>
                <DialogDescription>
                  Choisissez une propriété et le nombre d'esclaves à y assigner
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Propriété</h3>
                  <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                    {unassignedProperties.map(property => (
                      <Button
                        key={property.id}
                        variant={selectedPropertyId === property.id ? "default" : "outline"}
                        className="justify-start"
                        onClick={() => handleSelectProperty(property.id, property.name)}
                      >
                        <Building className="h-4 w-4 mr-2" />
                        <span className="truncate">{property.name}</span>
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <h3 className="text-sm font-medium">Nombre d'esclaves</h3>
                    <span className="text-sm">{assignmentAmount} / {availableSlaves}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Slider
                        value={[assignmentAmount]}
                        onValueChange={(values) => setAssignmentAmount(values[0])}
                        min={1}
                        max={availableSlaves}
                        step={1}
                      />
                    </div>
                    <Input
                      type="number"
                      value={assignmentAmount}
                      onChange={(e) => setAssignmentAmount(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-20"
                      min={1}
                      max={availableSlaves}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleAssignSlaves}>
                  <UserCheck className="h-4 w-4 mr-2" />
                  Assigner
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {slaveAssignments.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Propriété</TableHead>
                  <TableHead>Esclaves assignés</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {slaveAssignments.map((assignment) => (
                  <TableRow key={assignment.propertyId}>
                    <TableCell className="font-medium">{assignment.propertyName}</TableCell>
                    <TableCell>{assignment.assignedSlaves}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onRemoveAssignment(assignment.propertyId)}
                      >
                        <XCircle className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              <UserCheck className="h-12 w-12 mx-auto mb-2 opacity-20" />
              <p>Aucun esclave n'est actuellement assigné à une propriété</p>
              {availableSlaves > 0 ? (
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setIsDialogOpen(true)}
                  disabled={unassignedProperties.length === 0}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Créer une affectation
                </Button>
              ) : null}
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="p-4 bg-muted rounded-md">
        <h3 className="text-sm font-medium mb-2">Instructions d'affectation</h3>
        <p className="text-sm text-muted-foreground">
          Les esclaves assignés aux propriétés augmentent leur productivité et réduisent les coûts de maintenance. 
          Chaque propriété a une capacité maximale d'esclaves qui lui est propre en fonction de sa taille et de son type.
        </p>
      </div>
    </div>
  );
};
