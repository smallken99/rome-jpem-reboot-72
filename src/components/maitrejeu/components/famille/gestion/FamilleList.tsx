
import React, { useState } from 'react';
import { useMaitreJeu } from '../../../context';
import { FamilleCard } from '../FamilleCard';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { FamilleInfo, FamilleFilter, StatutFamilial } from '../../../types';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

interface FamilleListProps {
  familles: FamilleInfo[];
  onSelectFamille: (id: string) => void;
  onEditFamille: (famille: FamilleInfo) => void;
  onDeleteFamille: (id: string) => void;
}

export const FamilleList: React.FC<FamilleListProps> = ({
  familles,
  onSelectFamille,
  onEditFamille,
  onDeleteFamille,
}) => {
  const { deleteFamille, getMembresByFamille } = useMaitreJeu();
  const [familleToDelete, setFamilleToDelete] = useState<string | null>(null);
  const [filter, setFilter] = useState<FamilleFilter>({});
  
  const handleFilterChange = (key: keyof FamilleFilter, value: any) => {
    setFilter(prev => ({ ...prev, [key]: value }));
  };
  
  const filteredFamilles = familles.filter(f => {
    if (filter.nom && !f.nom.toLowerCase().includes(filter.nom.toLowerCase())) {
      return false;
    }
    if (filter.statut && f.statut !== filter.statut) {
      return false;
    }
    if (filter.prestigeMin !== undefined && f.prestige < filter.prestigeMin) {
      return false;
    }
    if (filter.prestigeMax !== undefined && f.prestige > filter.prestigeMax) {
      return false;
    }
    return true;
  });
  
  const handleDelete = (id: string) => {
    setFamilleToDelete(id);
  };
  
  const confirmDelete = () => {
    if (familleToDelete) {
      onDeleteFamille(familleToDelete);
      setFamilleToDelete(null);
    }
  };
  
  return (
    <div>
      <div className="mb-6 space-y-4">
        <div>
          <Label>Filtrer par nom</Label>
          <Input 
            placeholder="Rechercher une famille..."
            value={filter.nom || ''}
            onChange={(e) => handleFilterChange('nom', e.target.value)}
          />
        </div>
        
        <div>
          <Label>Statut</Label>
          <ToggleGroup 
            type="single"
            value={filter.statut || ''}
            onValueChange={(value) => handleFilterChange('statut', value as StatutFamilial || undefined)}
            className="justify-start"
          >
            <ToggleGroupItem value="">Tous</ToggleGroupItem>
            <ToggleGroupItem value="Patricien">Patricien</ToggleGroupItem>
            <ToggleGroupItem value="Plébéien">Plébéien</ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        <div>
          <Label>Prestige ({filter.prestigeMin || 0} - {filter.prestigeMax || 100})</Label>
          <Slider 
            defaultValue={[filter.prestigeMin || 0, filter.prestigeMax || 100]} 
            min={0} 
            max={100} 
            step={1}
            onValueChange={(values) => {
              handleFilterChange('prestigeMin', values[0]);
              handleFilterChange('prestigeMax', values[1]);
            }}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFamilles.length === 0 ? (
          <div className="col-span-2 text-center py-8">
            <p className="text-muted-foreground">Aucune famille ne correspond aux critères de recherche</p>
          </div>
        ) : (
          filteredFamilles.map(famille => (
            <FamilleCard 
              key={famille.id}
              famille={famille}
              membres={getMembresByFamille(famille.id)}
              onSelect={() => onSelectFamille(famille.id)}
              onDelete={() => handleDelete(famille.id)}
            />
          ))
        )}
      </div>
      
      <AlertDialog open={!!familleToDelete} onOpenChange={() => setFamilleToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer cette famille ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action supprimera définitivement la famille et tous ses membres associés. 
              Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">Supprimer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
