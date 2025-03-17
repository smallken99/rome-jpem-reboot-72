
import React from 'react';
import { FamilleAlliance } from '../../../types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Calendar, FileText, Users } from 'lucide-react';
import { useMaitreJeu } from '../../../context';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface FamilleAlliancesTabContentProps {
  alliances: FamilleAlliance[];
  familleId: string;
  onEditAlliance: (alliance: FamilleAlliance) => void;
}

export const FamilleAlliancesTabContent: React.FC<FamilleAlliancesTabContentProps> = ({
  alliances,
  familleId,
  onEditAlliance
}) => {
  const { getFamille, getMembre } = useMaitreJeu();

  const getOtherFamille = (alliance: FamilleAlliance) => {
    return alliance.famille1Id === familleId 
      ? getFamille(alliance.famille2Id) 
      : getFamille(alliance.famille1Id);
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'PPP', { locale: fr });
    } catch (e) {
      return 'Date inconnue';
    }
  };

  const getAllianceStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500 hover:bg-green-600';
      case 'en négociation':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'inactive':
        return 'bg-gray-500 hover:bg-gray-600';
      case 'rompue':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-blue-500 hover:bg-blue-600';
    }
  };

  return (
    <div className="space-y-4">
      {alliances.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Cette famille n'a pas encore d'alliances</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {alliances.map(alliance => {
            const otherFamille = getOtherFamille(alliance);
            
            return (
              <Card key={alliance.id}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-lg">Alliance avec {otherFamille?.nom}</h3>
                        <Badge className={getAllianceStatusColor(alliance.statut)}>
                          {alliance.statut}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground capitalize">
                        Alliance {alliance.type}
                      </p>
                    </div>
                    <Button size="sm" variant="ghost" onClick={() => onEditAlliance(alliance)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Modifier
                    </Button>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Début: {formatDate(alliance.dateDebut)}</span>
                      {alliance.dateFin && (
                        <>
                          <span className="mx-2">•</span>
                          <span>Fin: {formatDate(alliance.dateFin)}</span>
                        </>
                      )}
                    </div>
                    
                    <div className="flex items-start text-sm mb-3">
                      <FileText className="h-4 w-4 mr-2 mt-1" />
                      <div>
                        <div className="font-medium mb-1">Termes de l'alliance</div>
                        <p>{alliance.termes}</p>
                      </div>
                    </div>
                    
                    {alliance.benefices.length > 0 && (
                      <div className="mt-3">
                        <div className="text-sm font-medium mb-2">Bénéfices</div>
                        <div className="flex flex-wrap gap-2">
                          {alliance.benefices.map((benefice, index) => (
                            <Badge key={index} variant="secondary">{benefice}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {alliance.membres.length > 0 && (
                      <div className="mt-4 pt-3 border-t">
                        <div className="flex items-center text-sm font-medium mb-2">
                          <Users className="h-4 w-4 mr-2" />
                          <span>Membres impliqués</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {alliance.membres.map(membreId => {
                            const membre = getMembre(membreId);
                            if (!membre) return null;
                            
                            return (
                              <Badge key={membreId} variant="outline">
                                {membre.prenom} {membre.nom}
                              </Badge>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
