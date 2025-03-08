
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { useMaitreJeu } from './context/MaitreJeuContext';
import { HistoireTimeline } from './components/HistoireTimeline';
import { CreateEvenementForm } from './components/CreateEvenementForm';
import { HistoireEntry, Season } from './types/maitreJeuTypes';

export const GestionHistoire: React.FC = () => {
  const { histoireEntries, addHistoireEntry, updateHistoireEntry, deleteHistoireEntry, currentYear } = useMaitreJeu();
  
  const [activeTab, setActiveTab] = useState('timeline');
  const [filterYear, setFilterYear] = useState(currentYear);
  const [filterSeason, setFilterSeason] = useState<Season>('SPRING');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Formulaire d'ajout d'entrée
  const [newEntryTitle, setNewEntryTitle] = useState('');
  const [newEntryType, setNewEntryType] = useState('événement');
  const [newEntryDescription, setNewEntryDescription] = useState('');
  const [newEntryPersonnages, setNewEntryPersonnages] = useState('');
  const [newEntryImportance, setNewEntryImportance] = useState<'majeure' | 'mineure' | 'normale'>('normale');
  
  // Filtrage des entrées
  const filteredEntries = histoireEntries.filter(entry => {
    // Filtre par année et saison
    if (entry.date.year !== filterYear) return false;
    
    // Filtre par saison si sélectionnée
    if (filterSeason) {
      if (entry.date.season !== filterSeason) return false;
    }
    
    // Recherche textuelle
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        entry.titre.toLowerCase().includes(searchLower) ||
        entry.description.toLowerCase().includes(searchLower) ||
        entry.personnagesImpliqués.some(p => p.toLowerCase().includes(searchLower))
      );
    }
    
    return true;
  });
  
  // Gestion de la soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEntry: Omit<HistoireEntry, 'id'> = {
      titre: newEntryTitle,
      type: newEntryType,
      description: newEntryDescription,
      personnagesImpliqués: newEntryPersonnages.split(',').map(p => p.trim()).filter(p => p),
      date: {
        year: filterYear,
        season: filterSeason,
        day: 1 // default day
      },
      importance: newEntryImportance
    };
    
    addHistoireEntry(newEntry);
    
    // Reset the form
    setNewEntryTitle('');
    setNewEntryType('événement');
    setNewEntryDescription('');
    setNewEntryPersonnages('');
    setNewEntryImportance('normale');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Gestion de l'Histoire</h2>
          <p className="text-muted-foreground">
            Gérez les événements historiques et créez le récit de la République
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select value={String(filterYear)} onValueChange={(value) => setFilterYear(Number(value))}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Année" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 10 }, (_, i) => currentYear - 5 + i).map(year => (
                <SelectItem key={year} value={String(year)}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={filterSeason} onValueChange={(value) => setFilterSeason(value as Season)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Saison" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SPRING">Printemps</SelectItem>
              <SelectItem value="SUMMER">Été</SelectItem>
              <SelectItem value="AUTUMN">Automne</SelectItem>
              <SelectItem value="WINTER">Hiver</SelectItem>
            </SelectContent>
          </Select>
          
          <Input
            className="w-full md:w-auto"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="timeline">Frise Chronologique</TabsTrigger>
          <TabsTrigger value="create">Créer un Événement</TabsTrigger>
        </TabsList>
        
        <TabsContent value="timeline" className="space-y-4 py-4">
          {filteredEntries.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <p className="text-muted-foreground text-center">
                  Aucune entrée historique pour cette période.
                </p>
                <Button 
                  className="mt-4" 
                  variant="outline"
                  onClick={() => setActiveTab('create')}
                >
                  Créer une entrée
                </Button>
              </CardContent>
            </Card>
          ) : (
            <HistoireTimeline 
              histoireEntries={filteredEntries}
              onUpdateEntry={updateHistoireEntry}
              onDeleteEntry={deleteHistoireEntry}
            />
          )}
        </TabsContent>
        
        <TabsContent value="create" className="space-y-4 py-4">
          <RomanCard>
            <RomanCard.Header>
              <h3 className="text-lg font-medium">Ajouter une Entrée Historique</h3>
            </RomanCard.Header>
            <RomanCard.Content>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Titre</label>
                    <Input
                      value={newEntryTitle}
                      onChange={(e) => setNewEntryTitle(e.target.value)}
                      placeholder="Titre de l'événement"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Type</label>
                    <Select value={newEntryType} onValueChange={setNewEntryType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Type d'événement" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="événement">Événement</SelectItem>
                        <SelectItem value="décision">Décision</SelectItem>
                        <SelectItem value="bataille">Bataille</SelectItem>
                        <SelectItem value="politique">Politique</SelectItem>
                        <SelectItem value="social">Social</SelectItem>
                        <SelectItem value="religieux">Religieux</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    className="w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    value={newEntryDescription}
                    onChange={(e) => setNewEntryDescription(e.target.value)}
                    placeholder="Description détaillée de l'événement"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Personnages Impliqués</label>
                    <Input
                      value={newEntryPersonnages}
                      onChange={(e) => setNewEntryPersonnages(e.target.value)}
                      placeholder="Séparés par des virgules"
                    />
                    <p className="text-xs text-muted-foreground">
                      Séparez les noms par des virgules
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Importance</label>
                    <Select 
                      value={newEntryImportance} 
                      onValueChange={(value) => setNewEntryImportance(value as 'majeure' | 'mineure' | 'normale')}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Importance" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="majeure">Majeure</SelectItem>
                        <SelectItem value="normale">Normale</SelectItem>
                        <SelectItem value="mineure">Mineure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button type="submit">Ajouter à l'Histoire</Button>
                </div>
              </form>
            </RomanCard.Content>
          </RomanCard>
          
          <Card>
            <CardHeader>
              <CardTitle>Créer un Événement avec Conséquences</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Utilisez ce formulaire pour créer des événements plus complexes avec des actions et conséquences.
              </p>
              <CreateEvenementForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
