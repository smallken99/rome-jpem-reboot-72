import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Flag } from 'lucide-react';
import { nationsMock } from './data';
import { Nation } from './types';

interface NationsListProps {
  searchTerm: string;
}

export const NationsList: React.FC<NationsListProps> = ({ searchTerm }) => {
  // Filtrer les nations selon le terme de recherche
  const filteredNations = nationsMock.filter(nation => 
    nation.nom.toLowerCase().includes(searchTerm.toLowerCase()) || 
    nation.région.toLowerCase().includes(searchTerm.toLowerCase()) ||
    nation.statut.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {filteredNations.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
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
          <div className="p-2 rounded-full bg-yellow-100">
            <Flag className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <h3 className="font-medium">{nation.nom}</h3>
            <p className="text-sm text-muted-foreground">
              {nation.région} • Capitale: {nation.capitale}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="bg-blue-100 text-blue-800">
                {nation.statut}
              </Badge>
              <Badge variant="outline">
                Relation avec Rome: {nation.relationAvecRome}
              </Badge>
            </div>
          </div>
        </div>
        <div>
          <Button variant="outline" size="sm">Détails</Button>
        </div>
      </div>
      
      <div className="mt-4 pl-12">
        <h4 className="text-sm font-medium mb-1">Notes:</h4>
        <p className="text-sm text-muted-foreground">
          {nation.notes}
        </p>
      </div>
    </div>
  );
};
