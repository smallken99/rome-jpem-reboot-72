
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Handshake } from 'lucide-react';
import { traitesMock } from './data';
import { Traite } from './types';

interface TraitesListProps {
  searchTerm: string;
}

export const TraitesList: React.FC<TraitesListProps> = ({ searchTerm }) => {
  // Filtrer les traités selon le terme de recherche
  const filteredTraites = traitesMock.filter(traite => 
    traite.titre.toLowerCase().includes(searchTerm.toLowerCase()) || 
    traite.parties.some(p => p.toLowerCase().includes(searchTerm.toLowerCase())) ||
    traite.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {filteredTraites.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          Aucun traité ne correspond à vos critères
        </div>
      ) : (
        filteredTraites.map(traite => (
          <TraiteItem key={traite.id} traite={traite} />
        ))
      )}
    </div>
  );
};

interface TraiteItemProps {
  traite: Traite;
}

const TraiteItem: React.FC<TraiteItemProps> = ({ traite }) => {
  return (
    <div className="flex flex-col p-4 border rounded-lg hover:bg-muted/20">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-full bg-blue-100">
            <Handshake className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium">{traite.titre}</h3>
            <p className="text-sm text-muted-foreground">
              Entre {traite.parties.join(' et ')} • Signé le {traite.dateSignature}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="bg-green-100 text-green-800">
                {traite.type}
              </Badge>
              <Badge variant="outline">
                Durée: {traite.duree}
              </Badge>
              <Badge variant="outline" className="bg-blue-100 text-blue-800">
                {traite.statut}
              </Badge>
            </div>
          </div>
        </div>
        <div>
          <Button variant="outline" size="sm">Détails</Button>
        </div>
      </div>
      
      <div className="mt-4 pl-12">
        <h4 className="text-sm font-medium mb-1">Principales clauses:</h4>
        <ul className="text-sm text-muted-foreground list-disc pl-5">
          {traite.clauses.map((clause, index) => (
            <li key={index}>{clause}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
