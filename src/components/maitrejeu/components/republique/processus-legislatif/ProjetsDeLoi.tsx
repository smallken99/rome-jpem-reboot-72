
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { projetsData } from './data';
import { ProjetLoi } from './types';

interface ProjetsDeLoiProps {
  searchTerm: string;
}

export const ProjetsDeLoi: React.FC<ProjetsDeLoiProps> = ({ searchTerm }) => {
  // Filtrer les projets selon le terme de recherche
  const filteredProjets = projetsData.filter(projet => 
    projet.titre.toLowerCase().includes(searchTerm.toLowerCase()) || 
    projet.auteur.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {filteredProjets.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          Aucun projet de loi ne correspond à vos critères
        </div>
      ) : (
        filteredProjets.map(projet => (
          <ProjetItem key={projet.id} projet={projet} />
        ))
      )}
    </div>
  );
};

interface ProjetItemProps {
  projet: ProjetLoi;
}

const ProjetItem: React.FC<ProjetItemProps> = ({ projet }) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/20">
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-full bg-amber-100">
          <FileText className="h-6 w-6 text-amber-600" />
        </div>
        <div>
          <h3 className="font-medium">{projet.titre}</h3>
          <p className="text-sm text-muted-foreground">Proposé par {projet.auteur} le {projet.date}</p>
          <div className="mt-1">
            <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
              {projet.statut}
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">Modifier</Button>
        <Button variant="default" size="sm">
          {projet.statut === 'Prêt pour vote' ? 'Soumettre au vote' : 'Voir détails'}
        </Button>
      </div>
    </div>
  );
};
