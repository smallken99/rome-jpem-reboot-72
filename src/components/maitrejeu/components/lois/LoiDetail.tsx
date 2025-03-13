
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loi } from '../../types/lois';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

export interface LoiDetailProps {
  loi: Loi;
  onEdit: () => void;
}

export const LoiDetail: React.FC<LoiDetailProps> = ({ loi, onEdit }) => {
  // Helper pour afficher le statut avec la bonne couleur
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'adoptée':
      case 'Promulguée':
      case 'votée':
        return <Badge className="bg-green-500">Adoptée</Badge>;
      case 'rejetée':
      case 'Rejetée':
        return <Badge className="bg-red-500">Rejetée</Badge>;
      case 'proposée':
        return <Badge variant="outline">Proposée</Badge>;
      case 'En délibération':
      case 'en_débat':
        return <Badge variant="secondary">En délibération</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Helper pour afficher l'importance
  const getImportanceBadge = (importance?: string) => {
    if (!importance) return null;
    
    switch (importance) {
      case 'majeure':
        return <Badge variant="destructive">Majeure</Badge>;
      case 'normale':
        return <Badge variant="secondary">Normale</Badge>;
      case 'mineure':
        return <Badge variant="outline">Mineure</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold">{loi.titre}</CardTitle>
            {loi.nom && <p className="text-muted-foreground">{loi.nom}</p>}
          </div>
          <Button size="sm" variant="outline" onClick={onEdit}>
            <Edit className="w-4 h-4 mr-2" />
            Modifier
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {getStatusBadge(loi.état)}
          <Badge variant="secondary">{loi.type}</Badge>
          {loi.catégorie && <Badge variant="outline">{loi.catégorie}</Badge>}
          {getImportanceBadge(loi.importance)}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Description</h3>
            <p className="whitespace-pre-line">{loi.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Proposeur</h3>
              <p>{loi.proposeur}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Date de proposition</h3>
              <p>An {loi.dateProposition.year}, {loi.dateProposition.season}</p>
            </div>
          </div>

          {loi.dateVote && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Date de vote</h3>
              <p>An {loi.dateVote.year}, {loi.dateVote.season}</p>
            </div>
          )}

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Résultat du vote</h3>
            <div className="grid grid-cols-3 gap-2 mt-2">
              <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded">
                <p className="text-sm text-muted-foreground">Pour</p>
                <p className="text-xl font-bold text-green-600 dark:text-green-400">{loi.votes.pour}</p>
              </div>
              <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded">
                <p className="text-sm text-muted-foreground">Contre</p>
                <p className="text-xl font-bold text-red-600 dark:text-red-400">{loi.votes.contre}</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                <p className="text-sm text-muted-foreground">Abstention</p>
                <p className="text-xl font-bold">{loi.votes.abstention}</p>
              </div>
            </div>
          </div>

          {loi.clauses && loi.clauses.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Clauses</h3>
              <ul className="space-y-2">
                {loi.clauses.map((clause, index) => (
                  <li key={clause.id} className="bg-muted p-3 rounded">
                    <p className="font-medium">Clause {index + 1}</p>
                    <p className="mt-1">{clause.texte}</p>
                    {clause.explication && (
                      <p className="mt-1 text-sm text-muted-foreground">{clause.explication}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {loi.impacts && loi.impacts.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Impacts</h3>
              <ul className="space-y-2">
                {loi.impacts.map((impact, index) => (
                  <li key={index} className="bg-muted p-3 rounded flex justify-between">
                    <span>{impact.domaine}</span>
                    <span className={impact.valeur > 0 ? 'text-green-500' : 'text-red-500'}>
                      {impact.valeur > 0 ? '+' : ''}{impact.valeur}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {loi.effets && (typeof loi.effets === 'object' || loi.effets.length > 0) && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Effets</h3>
              {Array.isArray(loi.effets) ? (
                <ul className="list-disc pl-5 space-y-1">
                  {loi.effets.map((effet, index) => (
                    <li key={index}>{effet}</li>
                  ))}
                </ul>
              ) : (
                <div className="space-y-2">
                  {Object.entries(loi.effets).map(([key, value]) => (
                    <div key={key} className="bg-muted p-3 rounded flex justify-between">
                      <span className="capitalize">{key}</span>
                      <span>{typeof value === 'object' ? JSON.stringify(value) : value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {loi.commentaires && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Commentaires</h3>
              <p className="whitespace-pre-line">{loi.commentaires}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
