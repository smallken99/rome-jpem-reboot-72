
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { FamillesList } from '../FamillesList';
import { FamilleFilter, FamilleInfo } from '../../../types';

interface FamillesTabContentProps {
  familles: FamilleInfo[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  familleFilter: FamilleFilter;
  setFamilleFilter: (filter: FamilleFilter) => void;
  onSelectFamille: (id: string) => void;
  onEditFamille: (famille: FamilleInfo) => void;
  onDeleteFamille: (id: string) => void;
  onAddMembre: (familleId: string) => void;
  onAddAlliance: (familleId: string) => void;
}

export const FamillesTabContent: React.FC<FamillesTabContentProps> = ({
  familles,
  searchTerm,
  setSearchTerm,
  familleFilter,
  setFamilleFilter,
  onSelectFamille,
  onEditFamille,
  onDeleteFamille,
  onAddMembre,
  onAddAlliance
}) => {
  const filteredFamilles = familles.filter(famille => {
    // Appliquer le filtre de recherche
    if (searchTerm && !famille.nom.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Appliquer les autres filtres
    if (familleFilter.nom && !famille.nom.toLowerCase().includes(familleFilter.nom.toLowerCase())) {
      return false;
    }
    if (familleFilter.statut && famille.statut !== familleFilter.statut) {
      return false;
    }
    if (familleFilter.prestigeMin !== undefined && famille.prestige < familleFilter.prestigeMin) {
      return false;
    }
    if (familleFilter.prestigeMax !== undefined && famille.prestige > familleFilter.prestigeMax) {
      return false;
    }
    
    return true;
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Liste des Familles</CardTitle>
          <CardDescription>
            Gérez les familles romaines et leurs membres
          </CardDescription>
        </div>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="search"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs"
          />
        </div>
      </CardHeader>
      <CardContent>
        <FamillesList 
          familles={filteredFamilles}
          onSelectFamille={onSelectFamille}
          onEditFamille={onEditFamille}
          onDeleteFamille={onDeleteFamille}
          onAddMembre={onAddMembre}
          onAddAlliance={onAddAlliance}
          filter={familleFilter}
          onFilterChange={setFamilleFilter}
        />
      </CardContent>
    </Card>
  );
};
