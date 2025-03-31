
import React, { useState } from 'react';
import { useMaitreJeu } from './context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Filter, CalendarDays, BookOpen } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { HistoireEntry } from './types/histoire';

export const GestionHistoire: React.FC = () => {
  // État de recherche et de filtrage
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chronologie');
  
  // Données contextuelles
  const { histoireEntries = [], addHistoireEntry, gameState } = useMaitreJeu();
  
  // Nouvelles entrées d'histoire
  const [newEntryTitle, setNewEntryTitle] = useState('');
  const [newEntryContent, setNewEntryContent] = useState('');
  const [newEntryType, setNewEntryType] = useState<HistoireEntry['type']>('politique');
  
  // Filtrer les entrées d'histoire
  const filteredEntries = histoireEntries.filter(entry => 
    entry.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.contenu.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fonction pour créer une nouvelle entrée d'histoire
  const handleCreateEntry = () => {
    if (!newEntryTitle.trim() || !newEntryContent.trim()) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }
    
    const newEntry: HistoireEntry = {
      id: uuidv4(),
      titre: newEntryTitle,
      contenu: newEntryContent,
      date: gameState,
      type: newEntryType,
      importanceLevel: 'standard',
      personnesImpliquées: [],
      tags: []
    };
    
    addHistoireEntry(newEntry);
    setIsModalOpen(false);
    
    // Réinitialiser les champs
    setNewEntryTitle('');
    setNewEntryContent('');
    setNewEntryType('politique');
    
    toast.success("Nouvelle entrée historique créée");
  };
  
  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Chroniques de la République</h1>
          <p className="text-muted-foreground">
            Enregistrez et consultez les événements marquants de l'histoire de Rome
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un événement
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Événements historiques</CardTitle>
              <CardDescription>
                Les moments qui ont façonné la République
              </CardDescription>
            </div>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-full sm:w-[250px]"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="chronologie">Chronologie</TabsTrigger>
              <TabsTrigger value="categories">Par catégorie</TabsTrigger>
              <TabsTrigger value="importance">Par importance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="chronologie">
              {filteredEntries.length > 0 ? (
                <div className="space-y-4">
                  {filteredEntries
                    .sort((a, b) => {
                      // Tri par date décroissante
                      if (a.date.year !== b.date.year) {
                        return b.date.year - a.date.year;
                      }
                      
                      // Si même année, tri par saison
                      const seasons = ['SPRING', 'SUMMER', 'AUTUMN', 'WINTER'];
                      return seasons.indexOf(String(b.date.season)) - seasons.indexOf(String(a.date.season));
                    })
                    .map(entry => (
                      <Card key={entry.id} className="overflow-hidden">
                        <div className="flex border-l-4 border-blue-500">
                          <div className="py-4 px-6 bg-muted/20 flex flex-col justify-center items-center min-w-[100px]">
                            <div className="font-semibold">{entry.date.year}</div>
                            <div className="text-sm text-muted-foreground">{entry.date.season}</div>
                          </div>
                          <div className="py-4 px-6 flex-1">
                            <h3 className="font-semibold text-lg mb-1">{entry.titre}</h3>
                            <p className="text-muted-foreground">{entry.contenu}</p>
                            
                            <div className="flex mt-2 gap-2">
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                entry.type === 'politique' ? 'bg-blue-100 text-blue-800' :
                                entry.type === 'militaire' ? 'bg-red-100 text-red-800' :
                                entry.type === 'économique' ? 'bg-green-100 text-green-800' :
                                entry.type === 'religieux' ? 'bg-purple-100 text-purple-800' :
                                entry.type === 'social' ? 'bg-amber-100 text-amber-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {entry.type}
                              </span>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                entry.importanceLevel === 'mineur' ? 'bg-gray-100 text-gray-800' :
                                entry.importanceLevel === 'standard' ? 'bg-blue-100 text-blue-800' : 
                                entry.importanceLevel === 'majeur' ? 'bg-amber-100 text-amber-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {entry.importanceLevel}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Aucun événement trouvé</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm 
                      ? "Aucun événement ne correspond à votre recherche"
                      : "Commencez à enregistrer l'histoire de la République"}
                  </p>
                  <Button onClick={() => setIsModalOpen(true)}>
                    Créer un premier événement
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="categories">
              <div className="text-center py-12">
                <span className="text-muted-foreground">
                  Visualisation par catégories en cours de développement
                </span>
              </div>
            </TabsContent>
            
            <TabsContent value="importance">
              <div className="text-center py-12">
                <span className="text-muted-foreground">
                  Visualisation par niveau d'importance en cours de développement
                </span>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
