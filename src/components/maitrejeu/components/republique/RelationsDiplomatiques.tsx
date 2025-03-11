
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, Globe, Handshake, Swords, ShieldX, Search, FileText } from 'lucide-react';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { Badge } from '@/components/ui/badge';

export const RelationsDiplomatiques: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('traites');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Relations Diplomatiques</CardTitle>
        <CardDescription>
          Gestion des traités, alliances et relations internationales
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Filtres et recherche */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="pl-8 px-3 py-2 border rounded-md w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <ActionButton 
              variant="default"
              label="Nouveau traité"
              icon={<Plus className="h-4 w-4" />}
              onClick={() => console.log('Nouveau traité')}
            />
          </div>
        </div>

        {/* Onglets */}
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="mb-6">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="traites">Traités</TabsTrigger>
            <TabsTrigger value="nations">Nations</TabsTrigger>
            <TabsTrigger value="alliances">Alliances militaires</TabsTrigger>
          </TabsList>
          
          <TabsContent value="traites" className="pt-6">
            <TraitesList searchTerm={searchTerm} />
          </TabsContent>
          
          <TabsContent value="nations" className="pt-6">
            <NationsList searchTerm={searchTerm} />
          </TabsContent>
          
          <TabsContent value="alliances" className="pt-6">
            <AlliancesMilitaires searchTerm={searchTerm} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

// Composant pour les traités
const TraitesList: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  // Données fictives
  const traites = [
    { 
      id: '1', 
      titre: 'Traité de Paix Romain-Carthaginois', 
      parties: ['Rome', 'Carthage'],
      type: 'Paix',
      dateSignature: '15/04/240 av. J.-C.',
      duree: 'Indéfinie',
      statut: 'En vigueur',
      clauses: [
        'Carthage évacuera la Sicile',
        'Carthage paiera une indemnité de guerre de 3 200 talents'
      ]
    },
    { 
      id: '2', 
      titre: 'Traité Commercial Romain-Grec', 
      parties: ['Rome', 'Ligue Achéenne'],
      type: 'Commerce',
      dateSignature: '22/07/235 av. J.-C.',
      duree: '20 ans',
      statut: 'En vigueur',
      clauses: [
        'Tarifs préférentiels pour les marchands romains',
        'Accès aux ports grecs sans taxe portuaire'
      ]
    },
    { 
      id: '3', 
      titre: 'Alliance défensive avec Massilia', 
      parties: ['Rome', 'Massilia'],
      type: 'Alliance',
      dateSignature: '08/02/230 av. J.-C.',
      duree: '10 ans',
      statut: 'En vigueur',
      clauses: [
        'Défense mutuelle en cas d'attaque',
        'Échange d'informations militaires'
      ]
    }
  ];

  // Filtrer les traités selon le terme de recherche
  const filteredTraites = traites.filter(traite => 
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
          <div key={traite.id} className="flex flex-col p-4 border rounded-lg hover:bg-muted/20">
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
        ))
      )}
    </div>
  );
};

// Composant pour les nations
const NationsList: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  // Données fictives
  const nations = [
    { 
      id: '1', 
      nom: 'Carthage', 
      region: 'Afrique du Nord',
      capitale: 'Carthage',
      gouvernement: 'République oligarchique',
      relation: 'Paix fragile',
      relationLevel: 'Neutre',
      commerceLevel: 3,
      militaryThreat: 4,
      notes: 'Puissance maritime et commerciale'
    },
    { 
      id: '2', 
      nom: 'Royaume de Macédoine', 
      region: 'Grèce',
      capitale: 'Pella',
      gouvernement: 'Monarchie',
      relation: 'Alliance',
      relationLevel: 'Allié',
      commerceLevel: 4,
      militaryThreat: 2,
      notes: 'Dynastie Antigonide, héritière d\'Alexandre'
    },
    { 
      id: '3', 
      nom: 'Ligue Étolienne', 
      region: 'Grèce centrale',
      capitale: 'Thermos',
      gouvernement: 'Confédération',
      relation: 'Méfiance',
      relationLevel: 'Hostile',
      commerceLevel: 2,
      militaryThreat: 3,
      notes: 'Force terrestre importante, mercenaires'
    },
    { 
      id: '4', 
      nom: 'Royaume des Galates', 
      region: 'Asie Mineure',
      capitale: 'Ancyre',
      gouvernement: 'Tribus confédérées',
      relation: 'Hostile',
      relationLevel: 'Ennemi',
      commerceLevel: 1,
      militaryThreat: 3,
      notes: 'Descendants des Celtes, guerriers redoutables'
    }
  ];

  // Filtrer les nations selon le terme de recherche
  const filteredNations = nations.filter(nation => 
    nation.nom.toLowerCase().includes(searchTerm.toLowerCase()) || 
    nation.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
    nation.relation.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {filteredNations.length === 0 ? (
        <div className="col-span-2 text-center py-12 text-muted-foreground">
          Aucune nation ne correspond à vos critères
        </div>
      ) : (
        filteredNations.map(nation => (
          <div key={nation.id} className="flex flex-col p-4 border rounded-lg hover:bg-muted/20">
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
        ))
      )}
    </div>
  );
};

// Composant pour les alliances militaires
const AlliancesMilitaires: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  // Données fictives
  const alliances = [
    { 
      id: '1', 
      nom: 'Foedus Aequum Romain-Massilia', 
      membres: ['Rome', 'Massilia'],
      type: 'Défensive',
      dateCreation: '08/02/230 av. J.-C.',
      commandement: 'Rome',
      forces: {
        legions: 2,
        auxiliaires: 5000,
        navires: 15
      },
      statut: 'Active'
    },
    { 
      id: '2', 
      nom: 'Alliance contre les Barbares du Nord', 
      membres: ['Rome', 'Tribus Galloises pacifiées'],
      type: 'Offensive',
      dateCreation: '12/05/231 av. J.-C.',
      commandement: 'Rome',
      forces: {
        legions: 1,
        auxiliaires: 3000,
        navires: 0
      },
      statut: 'Active'
    }
  ];

  // Filtrer les alliances selon le terme de recherche
  const filteredAlliances = alliances.filter(alliance => 
    alliance.nom.toLowerCase().includes(searchTerm.toLowerCase()) || 
    alliance.membres.some(m => m.toLowerCase().includes(searchTerm.toLowerCase())) ||
    alliance.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {filteredAlliances.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          Aucune alliance militaire ne correspond à vos critères
        </div>
      ) : (
        filteredAlliances.map(alliance => (
          <div key={alliance.id} className="flex flex-col p-4 border rounded-lg hover:bg-muted/20">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-red-100">
                  <Swords className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-medium">{alliance.nom}</h3>
                  <p className="text-sm text-muted-foreground">
                    Membres: {alliance.membres.join(', ')} • Créée le {alliance.dateCreation}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="bg-red-100 text-red-800">
                      {alliance.type}
                    </Badge>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800">
                      Commandement: {alliance.commandement}
                    </Badge>
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      {alliance.statut}
                    </Badge>
                  </div>
                </div>
              </div>
              <div>
                <Button variant="outline" size="sm">Détails</Button>
              </div>
            </div>
            
            <div className="mt-4 pl-12">
              <h4 className="text-sm font-medium mb-2">Forces militaires:</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-2 bg-red-50 rounded-md">
                  <div className="text-lg font-bold text-red-600">{alliance.forces.legions}</div>
                  <div className="text-xs text-muted-foreground">Légions</div>
                </div>
                <div className="text-center p-2 bg-amber-50 rounded-md">
                  <div className="text-lg font-bold text-amber-600">{alliance.forces.auxiliaires}</div>
                  <div className="text-xs text-muted-foreground">Auxiliaires</div>
                </div>
                <div className="text-center p-2 bg-blue-50 rounded-md">
                  <div className="text-lg font-bold text-blue-600">{alliance.forces.navires}</div>
                  <div className="text-xs text-muted-foreground">Navires</div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
