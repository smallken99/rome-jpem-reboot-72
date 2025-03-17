
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FamilleInfo } from '../../../types';
import { useMaitreJeu } from '../../../context';

interface FamilleRelationsOverviewProps {
  familles: FamilleInfo[];
  onSelectFamille: (id: string) => void;
}

export const FamilleRelationsOverview: React.FC<FamilleRelationsOverviewProps> = ({
  familles,
  onSelectFamille
}) => {
  const { getAlliances, getFamille } = useMaitreJeu();
  const alliances = getAlliances();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Relations entre Familles</CardTitle>
          <CardDescription>Vue d'ensemble des alliances et relations entre les familles romaines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md p-4 space-y-4">
            <h3 className="text-lg font-semibold">Graphique des alliances</h3>
            <div className="h-[500px] flex items-center justify-center bg-muted/20 rounded-md">
              {familles.length > 0 ? (
                <div className="text-center">
                  <p className="mb-2 text-muted-foreground">Représentation visuelle des relations entre familles</p>
                  <div className="flex flex-wrap gap-4 justify-center">
                    {alliances.map(alliance => {
                      const famille1 = getFamille(alliance.famille1Id);
                      const famille2 = getFamille(alliance.famille2Id);
                      if (famille1 && famille2) {
                        return (
                          <div key={alliance.id} className="border p-3 rounded-md">
                            <div className="flex items-center">
                              <div 
                                className="w-6 h-6 rounded-full mr-2" 
                                style={{ backgroundColor: famille1.couleurPrimaire || '#ccc' }}
                              />
                              <span 
                                className="font-medium cursor-pointer hover:underline"
                                onClick={() => onSelectFamille(famille1.id)}
                              >
                                {famille1.nom}
                              </span>
                              <span className="mx-2">⟷</span>
                              <div 
                                className="w-6 h-6 rounded-full mr-2" 
                                style={{ backgroundColor: famille2.couleurPrimaire || '#ccc' }}
                              />
                              <span 
                                className="font-medium cursor-pointer hover:underline"
                                onClick={() => onSelectFamille(famille2.id)}
                              >
                                {famille2.nom}
                              </span>
                            </div>
                            <div className="mt-2 text-xs text-muted-foreground">
                              <span className="font-medium">{alliance.type.charAt(0).toUpperCase() + alliance.type.slice(1)}</span>
                              <span> • {alliance.statut}</span>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">Aucune famille disponible pour afficher les relations</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Statistiques des Relations</CardTitle>
          <CardDescription>Analyse des alliances et relations familiales</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted/20 p-4 rounded-md">
              <h3 className="font-medium mb-2">Alliances par Type</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Politiques</span>
                  <span className="font-medium">
                    {alliances.filter(a => a.type === 'politique').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Matrimoniales</span>
                  <span className="font-medium">
                    {alliances.filter(a => a.type === 'matrimoniale').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Commerciales</span>
                  <span className="font-medium">
                    {alliances.filter(a => a.type === 'commerciale').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Militaires</span>
                  <span className="font-medium">
                    {alliances.filter(a => a.type === 'militaire').length}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-muted/20 p-4 rounded-md">
              <h3 className="font-medium mb-2">Familles les plus Alliées</h3>
              <ul className="space-y-2">
                {familles
                  .map(famille => ({
                    id: famille.id,
                    nom: famille.nom,
                    count: alliances.filter(a => a.famille1Id === famille.id || a.famille2Id === famille.id).length
                  }))
                  .sort((a, b) => b.count - a.count)
                  .slice(0, 5)
                  .map(famille => (
                    <li key={famille.id} className="flex justify-between">
                      <span 
                        className="cursor-pointer hover:underline"
                        onClick={() => onSelectFamille(famille.id)}
                      >
                        {famille.nom}
                      </span>
                      <span className="font-medium">{famille.count}</span>
                    </li>
                  ))}
              </ul>
            </div>

            <div className="bg-muted/20 p-4 rounded-md">
              <h3 className="font-medium mb-2">Statut des Alliances</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Actives</span>
                  <span className="font-medium">
                    {alliances.filter(a => a.statut === 'active').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>En négociation</span>
                  <span className="font-medium">
                    {alliances.filter(a => a.statut === 'en négociation').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Inactives</span>
                  <span className="font-medium">
                    {alliances.filter(a => a.statut === 'inactive').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Rompues</span>
                  <span className="font-medium">
                    {alliances.filter(a => a.statut === 'rompue').length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
