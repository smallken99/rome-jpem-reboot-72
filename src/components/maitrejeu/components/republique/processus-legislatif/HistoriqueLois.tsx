
import React from 'react';
import { Button } from '@/components/ui/button';
import { History } from 'lucide-react';
import { historiqueData } from './data';
import { HistoriqueLoi } from './types';

interface HistoriqueLoiProps {
  searchTerm: string;
}

export const HistoriqueLois: React.FC<HistoriqueLoiProps> = ({ searchTerm }) => {
  // Filtrer les lois selon le terme de recherche
  const filteredLois = historiqueData.filter(loi => 
    loi.titre.toLowerCase().includes(searchTerm.toLowerCase()) || 
    loi.auteur.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {filteredLois.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          Aucune loi dans l'historique ne correspond à vos critères
        </div>
      ) : (
        filteredLois.map(loi => (
          <HistoriqueLoiItem key={loi.id} loi={loi} />
        ))
      )}
    </div>
  );
};

interface HistoriqueLoiItemProps {
  loi: HistoriqueLoi;
}

const HistoriqueLoiItem: React.FC<HistoriqueLoiItemProps> = ({ loi }) => {
  const getBadgeClass = () => {
    return loi.resultat === 'Adoptée' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/20">
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-full bg-purple-100">
          <History className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <h3 className="font-medium">{loi.titre}</h3>
          <p className="text-sm text-muted-foreground">Proposé par {loi.auteur} le {loi.date}</p>
          <div className="mt-1">
            <span className={`text-xs px-2 py-0.5 rounded-full ${getBadgeClass()}`}>
              {loi.resultat} ({loi.votes})
            </span>
          </div>
        </div>
      </div>
      <div>
        <Button variant="outline" size="sm">Consulter</Button>
      </div>
    </div>
  );
};
