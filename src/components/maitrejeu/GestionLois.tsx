
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileCheck, FileX, History, Filter, PlusCircle, Search, ScrollText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loi } from './types/lois';
import { useMaitreJeu } from './context';
import { Season } from './types/common';
import { LoisList } from './components/lois/LoisList';
import { LoiDetail } from './components/lois/LoiDetail';
import { LoiModal } from './components/lois/LoiModal';
import { HistoriqueLois } from './components/lois/HistoriqueLois';

export const GestionLois: React.FC = () => {
  const { lois, addLoi } = useMaitreJeu();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('actives');
  const [showLoiModal, setShowLoiModal] = useState(false);
  const [loiToEdit, setLoiToEdit] = useState<Loi | null>(null);
  const [selectedLoi, setSelectedLoi] = useState<Loi | null>(null);

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

  const handleViewLoi = (loi: Loi) => {
    setSelectedLoi(loi);
  };

  const handleCloseLoi = () => {
    setSelectedLoi(null);
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
              {getFilteredLoisByTab().length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Aucune loi active trouvée
                </p>
              ) : (
                <LoisList 
                  lois={getFilteredLoisByTab()} 
                  onViewLoi={handleViewLoi}
                  onEditLoi={handleEditLoi}
                  showAdditionalActions
                  actionLabel="Abroger"
                  formatSeason={formatSeason}
                />
              )}
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
              {getFilteredLoisByTab().length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Aucune loi proposée trouvée
                </p>
              ) : (
                <LoisList 
                  lois={getFilteredLoisByTab()} 
                  onViewLoi={handleViewLoi}
                  onEditLoi={handleEditLoi}
                  showAdditionalActions
                  actionLabel="Organiser le vote"
                  primaryAction
                  formatSeason={formatSeason}
                />
              )}
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
                <LoisList 
                  lois={getFilteredLoisByTab()} 
                  onViewLoi={handleViewLoi}
                  onEditLoi={handleEditLoi}
                  formatSeason={formatSeason}
                />
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
                <HistoriqueLois 
                  lois={getFilteredLoisByTab()}
                  onViewLoi={handleViewLoi}
                  formatSeason={formatSeason}
                />
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
      
      {selectedLoi && (
        <LoiDetail 
          loi={selectedLoi}
          onClose={handleCloseLoi}
        />
      )}
    </div>
  );
};
