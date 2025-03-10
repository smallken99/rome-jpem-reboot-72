
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollText, FileCheck, FileX, History, Filter, PlusCircle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loi } from './types/lois';
import { useMaitreJeu } from './context';
import { LoiModal } from './components/lois/LoiModal';
import { Season } from './types/common';

// Créons un composant pour le modal de loi
export const GestionLois: React.FC = () => {
  const { lois, addLoi } = useMaitreJeu();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('actives');
  const [showLoiModal, setShowLoiModal] = useState(false);
  const [loiToEdit, setLoiToEdit] = useState<Loi | null>(null);

  // Filtrer les lois en fonction du terme de recherche
  const filteredLois = lois.filter(loi => 
    loi.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loi.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loi.proposeur.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loi.catégorie.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filtrer les lois en fonction de l'onglet actif
  const getFilteredLoisByTab = () => {
    switch(activeTab) {
      case 'actives':
        return filteredLois.filter(loi => loi.état === "Promulguée");
      case 'proposees':
        return filteredLois.filter(loi => loi.état === "En délibération");
      case 'rejetees': 
        return filteredLois.filter(loi => loi.état === "Rejetée");
      case 'historique':
        return filteredLois; // Afficher toutes les lois dans l'onglet historique
      default:
        return filteredLois;
    }
  };

  const handleAddLoi = (loi: Loi) => {
    addLoi(loi);
    setShowLoiModal(false);
    setLoiToEdit(null);
  };

  const handleEditLoi = (loi: Loi) => {
    setLoiToEdit(loi);
    setShowLoiModal(true);
  };

  // Fonction pour traduire la saison en français
  const formatSeason = (season: Season): string => {
    switch(season) {
      case "SPRING": return "Printemps";
      case "SUMMER": return "Été";
      case "AUTUMN": return "Automne";
      case "WINTER": return "Hiver";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Gestion des Lois</h2>
          <p className="text-muted-foreground">
            Gérez les lois de la République, leur promulgation et leurs effets
          </p>
        </div>
        <Button onClick={() => setShowLoiModal(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nouvelle Loi
        </Button>
      </div>

      <div className="flex items-center space-x-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Rechercher une loi..." 
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="actives" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="actives" className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            <span>Lois Actives</span>
          </TabsTrigger>
          <TabsTrigger value="proposees" className="flex items-center gap-2">
            <ScrollText className="h-4 w-4" />
            <span>Lois Proposées</span>
          </TabsTrigger>
          <TabsTrigger value="rejetees" className="flex items-center gap-2">
            <FileX className="h-4 w-4" />
            <span>Lois Rejetées</span>
          </TabsTrigger>
          <TabsTrigger value="historique" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            <span>Historique</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="actives">
          <Card>
            <CardHeader>
              <CardTitle>Lois en vigueur</CardTitle>
              <CardDescription>
                Lois promulguées et actuellement en application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getFilteredLoisByTab().length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    Aucune loi active trouvée
                  </p>
                ) : (
                  getFilteredLoisByTab().map(loi => (
                    <Card key={loi.id} className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-lg">{loi.titre}</h3>
                          <p className="text-sm text-muted-foreground">{loi.description}</p>
                          <div className="flex gap-2 mt-2">
                            <span className="text-xs bg-secondary px-2 py-1 rounded-full">
                              {loi.catégorie}
                            </span>
                            <span className="text-xs bg-secondary px-2 py-1 rounded-full">
                              {`${formatSeason(loi.date.season)} ${Math.abs(loi.date.year)} ${loi.date.year < 0 ? 'av. J.-C.' : 'ap. J.-C.'}`}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditLoi(loi)}>Modifier</Button>
                          <Button variant="destructive" size="sm">Abroger</Button>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="proposees">
          <Card>
            <CardHeader>
              <CardTitle>Lois proposées</CardTitle>
              <CardDescription>
                Projets de loi en attente de vote
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getFilteredLoisByTab().length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    Aucune loi proposée trouvée
                  </p>
                ) : (
                  getFilteredLoisByTab().map(loi => (
                    <Card key={loi.id} className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-lg">{loi.titre}</h3>
                          <p className="text-sm text-muted-foreground">{loi.description}</p>
                          <p className="text-sm mt-1">Proposeur: <span className="font-medium">{loi.proposeur}</span></p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="default" size="sm">Organiser le vote</Button>
                          <Button variant="outline" size="sm" onClick={() => handleEditLoi(loi)}>Détails</Button>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="rejetees">
          <Card>
            <CardHeader>
              <CardTitle>Lois rejetées</CardTitle>
              <CardDescription>
                Projets de loi qui n'ont pas été adoptés
              </CardDescription>
            </CardHeader>
            <CardContent>
              {getFilteredLoisByTab().length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Aucune loi rejetée trouvée
                </p>
              ) : (
                <div className="space-y-4">
                  {getFilteredLoisByTab().map(loi => (
                    <Card key={loi.id} className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-lg">{loi.titre}</h3>
                          <p className="text-sm text-muted-foreground">{loi.description}</p>
                          <div className="flex gap-2 mt-2">
                            <span className="text-xs bg-secondary px-2 py-1 rounded-full">
                              {loi.catégorie}
                            </span>
                            <span className="text-xs bg-secondary px-2 py-1 rounded-full">
                              {`${formatSeason(loi.date.season)} ${Math.abs(loi.date.year)} ${loi.date.year < 0 ? 'av. J.-C.' : 'ap. J.-C.'}`}
                            </span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => handleEditLoi(loi)}>Détails</Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="historique">
          <Card>
            <CardHeader>
              <CardTitle>Historique législatif</CardTitle>
              <CardDescription>
                Archives des lois et des votes passés
              </CardDescription>
            </CardHeader>
            <CardContent>
              {getFilteredLoisByTab().length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Aucune loi dans l'historique
                </p>
              ) : (
                <div className="space-y-6">
                  {getFilteredLoisByTab().map(loi => (
                    <div key={loi.id} className="border-l-4 pl-4 pb-6 relative">
                      <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-2"></div>
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium text-lg">{loi.titre}</h3>
                          <p className="text-sm text-muted-foreground">
                            {formatSeason(loi.date.season)} {Math.abs(loi.date.year)} {loi.date.year < 0 ? 'av. J.-C.' : 'ap. J.-C.'}
                          </p>
                        </div>
                        <div className="self-start">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            loi.état === "Promulguée" ? "bg-green-100 text-green-800" : 
                            loi.état === "Rejetée" ? "bg-red-100 text-red-800" : 
                            "bg-yellow-100 text-yellow-800"
                          }`}>
                            {loi.état}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm mt-1">{loi.description}</p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs bg-secondary px-2 py-1 rounded-full">
                          {loi.catégorie}
                        </span>
                        <span className="text-xs bg-secondary px-2 py-1 rounded-full">
                          Importance: {loi.importance}
                        </span>
                      </div>
                      <Button variant="ghost" size="sm" className="mt-2" onClick={() => handleEditLoi(loi)}>
                        Voir les détails
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {showLoiModal && (
        <LoiModal 
          isOpen={showLoiModal}
          onClose={() => {
            setShowLoiModal(false);
            setLoiToEdit(null);
          }}
          onSave={handleAddLoi}
          editLoi={loiToEdit}
        />
      )}
    </div>
  );
};
