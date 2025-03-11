
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Globe } from 'lucide-react';
import { nationsMock, Nation } from './data';

interface NationsListProps {
  searchTerm: string;
}

export const NationsList: React.FC<NationsListProps> = ({ searchTerm }) => {
  // Filtrer les nations selon le terme de recherche
  const filteredNations = nationsMock.filter(nation => 
    nation.nom.toLowerCase().includes(searchTerm.toLowerCase()) || 
    nation.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
    nation.relation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {filteredNations.length === 0 ? (
        <div className="col-span-2 text-center py-12 text-muted-foreground">
          Aucune nation ne correspond à vos critères
        </div>
      ) : (
        filteredNations.map(nation => (
          <NationItem key={nation.id} nation={nation} />
        ))
      )}
    </div>
  );
};

interface NationItemProps {
  nation: Nation;
}

const NationItem: React.FC<NationItemProps> = ({ nation }) => {
  return (
    <div className="flex flex-col p-4 border rounded-lg hover:bg-muted/20">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-full bg-purple-100">
            <Globe className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h3 className="font-medium">{nation.nom}</h3>
            <p className="text-sm text-muted-foreground">
              {nation.region} • Capitale: {nation.capitale}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="bg-gray-100">
                {nation.gouvernement}
              </Badge>
            </div>
          </div>
        </div>
        <div>
          {getRelationBadge(nation.relationLevel)}
        </div>
      </div>
      
      <div className="mt-4 pl-12 grid grid-cols-2 gap-2">
        <div>
          <h4 className="text-xs font-medium mb-1">Commerce:</h4>
          <div className="text-sm text-amber-500">{getCommerceLevelStars(nation.commerceLevel)}</div>
        </div>
        <div>
          <h4 className="text-xs font-medium mb-1">Menace militaire:</h4>
          <div className="text-sm text-red-500">{getMilitaryThreatStars(nation.militaryThreat)}</div>
        </div>
        <div className="col-span-2 mt-2">
          <h4 className="text-xs font-medium mb-1">Notes:</h4>
          <p className="text-sm text-muted-foreground">{nation.notes}</p>
        </div>
      </div>
      
      <div className="mt-4 flex justify-end">
        <Button variant="outline" size="sm" className="mr-2">Diplomatie</Button>
        <Button variant="default" size="sm">Détails</Button>
      </div>
    </div>
  );
};

// Fonctions utilitaires
const getRelationBadge = (relation: string) => {
  switch (relation) {
    case 'Allié':
      return <Badge className="bg-green-100 text-green-800 border-green-200">Allié</Badge>;
    case 'Ami':
      return <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Ami</Badge>;
    case 'Neutre':
      return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Neutre</Badge>;
    case 'Hostile':
      return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Hostile</Badge>;
    case 'Ennemi':
      return <Badge className="bg-red-100 text-red-800 border-red-200">Ennemi</Badge>;
    default:
      return <Badge className="bg-gray-100 text-gray-800 border-gray-200">{relation}</Badge>;
  }
};

const getCommerceLevelStars = (level: number) => {
  return '★'.repeat(level) + '☆'.repeat(5 - level);
};

const getMilitaryThreatStars = (level: number) => {
  return '★'.repeat(level) + '☆'.repeat(5 - level);
};
