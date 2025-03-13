
import React, { useState } from 'react';
import { FamilleAlliance, FamilleInfo, MembreFamille } from '../../types/familles';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Handshake, User, Calendar, ScrollText, AlertCircle } from 'lucide-react';
import { useMaitreJeu } from '../../context';

interface FamilleAlliancesProps {
  alliances: FamilleAlliance[];
  familleId: string;
  familles: FamilleInfo[];
  membres: MembreFamille[];
  onEditAlliance: (alliance: FamilleAlliance) => void;
  onDeleteAlliance: (id: string) => void;
}

export const FamilleAlliances: React.FC<FamilleAlliancesProps> = ({ 
  alliances, 
  familleId,
  familles,
  membres,
  onEditAlliance,
  onDeleteAlliance
}) => {
  const [activeTab, setActiveTab] = useState<'actives' | 'inactives' | 'negociations' | 'rompues'>('actives');
  const { updateAlliance } = useMaitreJeu();

  // Filtrer les alliances selon l'onglet actif
  const filteredAlliances = alliances.filter(alliance => {
    switch (activeTab) {
      case 'actives': return alliance.statut === 'active';
      case 'inactives': return alliance.statut === 'inactive';
      case 'negociations': return alliance.statut === 'en négociation';
      case 'rompues': return alliance.statut === 'rompue';
      default: return true;
    }
  });

  // Obtenir le nom de la famille alliée
  const getAlliedFamilyName = (alliance: FamilleAlliance) => {
    const otherFamilyId = alliance.famille1Id === familleId ? alliance.famille2Id : alliance.famille1Id;
    const otherFamily = familles.find(f => f.id === otherFamilyId);
    return otherFamily ? otherFamily.nom : 'Famille inconnue';
  };

  // Obtenir les membres impliqués dans l'alliance
  const getMembresInvolved = (alliance: FamilleAlliance) => {
    return alliance.membres.map(membreId => {
      const membre = membres.find(m => m.id === membreId);
      return membre ? `${membre.prenom} ${membre.nom}` : 'Membre inconnu';
    });
  };

  // Changer le statut d'une alliance
  const handleStatusChange = (allianceId: string, newStatus: FamilleAlliance['statut']) => {
    updateAlliance(allianceId, { statut: newStatus });
  };

  // Fonction pour formater la date (correction de l'erreur)
  const formatDate = (date: { year: number, season: string }) => {
    const seasonFr = date.season === "SPRING" ? "Printemps" :
                     date.season === "SUMMER" ? "Été" :
                     date.season === "AUTUMN" ? "Automne" : "Hiver";
    return `${seasonFr} ${Math.abs(date.year)} ${date.year < 0 ? 'av. J.-C.' : 'ap. J.-C.'}`;
  };

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
        <TabsList className="w-full">
          <TabsTrigger value="actives" className="flex-1">Alliances Actives</TabsTrigger>
          <TabsTrigger value="negociations" className="flex-1">En Négociation</TabsTrigger>
          <TabsTrigger value="inactives" className="flex-1">Inactives</TabsTrigger>
          <TabsTrigger value="rompues" className="flex-1">Rompues</TabsTrigger>
        </TabsList>
        
        {['actives', 'negociations', 'inactives', 'rompues'].map(tab => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            {filteredAlliances.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground italic">
                Aucune alliance dans cette catégorie
              </div>
            ) : (
              filteredAlliances.map(alliance => (
                <Card key={alliance.id} className="overflow-hidden">
                  <div className="bg-muted p-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Handshake className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold text-lg">Alliance avec {getAlliedFamilyName(alliance)}</h3>
                      <Badge variant={
                        alliance.type === 'matrimoniale' ? 'default' :
                        alliance.type === 'politique' ? 'secondary' :
                        alliance.type === 'commerciale' ? 'outline' : 'destructive'
                      }>
                        {alliance.type.charAt(0).toUpperCase() + alliance.type.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Depuis {formatDate({ year: parseInt(alliance.dateDebut.split('-')[0]), season: "SPRING" })}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium flex items-center space-x-1 mb-2">
                          <User className="h-4 w-4" />
                          <span>Membres impliqués</span>
                        </h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {getMembresInvolved(alliance).map((nom, index) => (
                            <li key={index}>{nom}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium flex items-center space-x-1 mb-2">
                          <ScrollText className="h-4 w-4" />
                          <span>Termes de l'alliance</span>
                        </h4>
                        <p className="text-sm">{alliance.termes}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Bénéfices</h4>
                      <ul className="space-y-1">
                        {alliance.benefices.map((benefice, index) => (
                          <li key={index} className="flex items-start space-x-1">
                            <div className="rounded-full bg-green-100 p-1 mt-0.5">
                              <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-sm">{benefice}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex justify-end space-x-2 pt-2">
                      {alliance.statut === 'active' && (
                        <>
                          <Button variant="outline" size="sm" onClick={() => handleStatusChange(alliance.id, 'inactive')}>
                            Suspendre
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleStatusChange(alliance.id, 'rompue')}>
                            Rompre
                          </Button>
                        </>
                      )}
                      {alliance.statut === 'en négociation' && (
                        <>
                          <Button variant="default" size="sm" onClick={() => handleStatusChange(alliance.id, 'active')}>
                            Valider
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleStatusChange(alliance.id, 'rompue')}>
                            Rejeter
                          </Button>
                        </>
                      )}
                      {alliance.statut === 'inactive' && (
                        <Button variant="default" size="sm" onClick={() => handleStatusChange(alliance.id, 'active')}>
                          Réactiver
                        </Button>
                      )}
                      {alliance.statut === 'rompue' && (
                        <Button variant="outline" size="sm" onClick={() => handleStatusChange(alliance.id, 'en négociation')}>
                          Renégocier
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
