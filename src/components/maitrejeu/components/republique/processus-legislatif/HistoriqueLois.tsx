
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
          <HistoriqueLoiItem key={loi.id} loi={{
            ...loi,
            // Add required properties that might be missing
            dateProposition: loi.date || "Date inconnue",
            dateAdoption: loi.date || "Date inconnue",
            contenu: [],
            statut: loi.resultat === 'Adoptée' ? 'adopté' : 'rejeté',
            description: loi.description || "Aucune description disponible"
          }} />
        ))
      )}
    </div>
  );
};

interface HistoriqueLoiItemProps {
  loi: HistoriqueLoi;
}

const HistoriqueLoiItem: React.FC<HistoriqueLoiItemProps> = ({ loi }) => {
  // Compatibility: Use either existing resultat or infer from statut
  const resultat = loi.resultat || (loi.statut === 'adopté' ? 'Adoptée' : 'Rejetée');
  
  const getBadgeClass = () => {
    return resultat === 'Adoptée' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  };

  // Format the votes to display as a string
  const formatVotes = (votes: any) => {
    if (typeof votes === 'string') return votes;
    
    if (votes && typeof votes === 'object') {
      return `${votes.pour}-${votes.contre}-${votes.abstention}`;
    }
    
    return 'Votes non comptabilisés';
  };

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/20">
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-full bg-purple-100">
          <History className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <h3 className="font-medium">{loi.titre}</h3>
          <p className="text-sm text-muted-foreground">
            Proposé par {loi.auteur} le {loi.dateProposition || loi.date}
          </p>
          <div className="mt-1">
            <span className={`text-xs px-2 py-0.5 rounded-full ${getBadgeClass()}`}>
              {resultat} ({formatVotes(loi.votes)})
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
