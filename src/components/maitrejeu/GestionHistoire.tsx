
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Check, Plus, Search, BookText, CalendarClock } from 'lucide-react';
import { useMaitreJeu } from './context';
import { HistoireEntry } from './types/histoire';
import { v4 as uuidv4 } from 'uuid';

export const GestionHistoire: React.FC = () => {
  const { histoireEntries, addHistoireEntry, currentDate } = useMaitreJeu();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('chronique');
  
  // État du formulaire d'ajout
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [importance, setImportance] = useState<'majeur' | 'mineur' | 'normal'>('normal');
  const [isPublic, setIsPublic] = useState(true);
  
  // Filtrage des entrées d'histoire
  const filteredEntries = searchTerm 
    ? histoireEntries.filter(
        entry => entry.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                entry.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : histoireEntries;
  
  // Tri des entrées par date (plus récentes en premier)
  const sortedEntries = [...filteredEntries].sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    return b.season.localeCompare(a.season);
  });
  
  // Ajouter une nouvelle entrée d'histoire
  const handleAddEntry = () => {
    if (!title || !description) return;
    
    const newEntry: Omit<HistoireEntry, "id"> = {
      title,
      description,
      year: currentDate.year,
      season: currentDate.season,
      importance,
      public: isPublic,
      tags: []
    };
    
    addHistoireEntry(newEntry);
    
    // Réinitialiser le formulaire
    setTitle('');
    setDescription('');
    setImportance('normal');
    setIsPublic(true);
  };
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="flex items-center gap-2">
              <BookText className="h-8 w-8 text-amber-600" />
              Chroniques Historiques
            </span>
          </h1>
          <p className="text-muted-foreground">
            Enregistrez et consultez les événements marquants de la République
          </p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Gestion de l'Histoire</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <TabsList>
              <TabsTrigger value="chronique">Chronique</TabsTrigger>
              <TabsTrigger value="ajouter">Ajouter un Événement</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        
        <CardContent>
          <TabsContent value="chronique" className="mt-0">
            <div className="space-y-8">
              {sortedEntries.length > 0 ? (
                sortedEntries.map((entry) => (
                  <div key={entry.id} className="relative pl-6 border-l-2 border-muted pb-8">
                    <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-muted-foreground"></div>
                    <div className="flex items-center gap-2 mb-2">
                      <CalendarClock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        An {entry.year} AUC - {entry.season}
                      </span>
                      <span className={`text-xs ml-2 px-2 py-0.5 rounded-full ${
                        entry.importance === 'majeur' 
                          ? 'bg-red-100 text-red-800' 
                          : entry.importance === 'mineur'
                            ? 'bg-blue-100 text-blue-800'
                            : '
bg-green-100 text-green-800'
                      }`}>
                        {entry.importance}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{entry.title}</h3>
                    <p className="text-muted-foreground">{entry.description}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Aucun événement historique n'a été enregistré.
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="ajouter" className="mt-0">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Titre de l'événement</label>
                <Input
                  placeholder="Ex: Victoire contre Carthage"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Décrivez l'événement historique..."
                  className="min-h-[100px]"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Importance</label>
                  <select
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    value={importance}
                    onChange={(e) => setImportance(e.target.value as 'majeur' | 'mineur' | 'normal')}
                  >
                    <option value="majeur">Majeur</option>
                    <option value="normal">Normal</option>
                    <option value="mineur">Mineur</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Visibilité</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={isPublic}
                      onChange={(e) => setIsPublic(e.target.checked)}
                      className="rounded border-input"
                    />
                    <span className="text-sm">Public</span>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={handleAddEntry}
                disabled={!title || !description}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter l'événement
              </Button>
            </div>
          </TabsContent>
        </CardContent>
      </Card>
    </div>
  );
};
