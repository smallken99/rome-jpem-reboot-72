import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMaitreJeu } from './context/MaitreJeuContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, Plus, CalendarClock, Trash2 
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { HistoireTimeline } from './components/HistoireTimeline';
import { Season } from '@/utils/timeSystem';
import { EvenementType } from './types/maitreJeuTypes';

export const GestionHistoire: React.FC = () => {
  const { histoireEntries, addHistoireEntry, updateHistoireEntry, deleteHistoireEntry } = useMaitreJeu();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [currentYear, setCurrentYear] = useState(703);
  const [currentSeason, setCurrentSeason] = useState<Season>("printemps");
  const [newEntryTitle, setNewEntryTitle] = useState('');
  const [newEntryDescription, setNewEntryDescription] = useState('');
  const [newEntryCategory, setNewEntryCategory] = useState<EvenementType>("politique");
  const [newEntryImportance, setNewEntryImportance] = useState<1 | 2 | 3>(1);
  const [sortedEntries, setSortedEntries] = useState([...histoireEntries]);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  useEffect(() => {
    setSortedEntries([...histoireEntries].sort((a, b) => {
      const dateA = new Date(a.date.year, getSeasonIndex(a.date.season), a.date.day);
      const dateB = new Date(b.date.year, getSeasonIndex(b.date.season), b.date.day);
      return sortDirection === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    }));
  }, [histoireEntries, sortDirection]);
  
  const getSeasonIndex = (season: Season) => {
    switch (season) {
      case "printemps": return 0;
      case "été": return 1;
      case "automne": return 2;
      case "hiver": return 3;
    }
  };
  
  const handleAddEntry = () => {
    const newEntry = {
      titre: newEntryTitle,
      description: newEntryDescription,
      date: {
        year: currentYear,
        season: currentSeason,
        day: 1 // Ajouter une valeur par défaut pour le jour
      },
      catégorie: newEntryCategory,
      importance: newEntryImportance
    };
    
    addHistoireEntry(newEntry);
    setNewEntryTitle('');
    setNewEntryDescription('');
  };
  
  const handleSortEntries = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };
  
  const handleUpdateEntry = (entryId: string, updates: Partial<HistoireEntry>) => {
    updateHistoireEntry(entryId, updates);
  };
  
  const handleDeleteEntry = (entryId: string) => {
    deleteHistoireEntry(entryId);
  };
  
  const filteredEntries = sortedEntries.filter(entry =>
    entry.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CalendarClock className="h-5 w-5" />
            Ajouter une entrée historique
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1">
              <Label htmlFor="year">Année</Label>
              <Input 
                type="number" 
                id="year" 
                value={currentYear} 
                onChange={(e) => setCurrentYear(Number(e.target.value))} 
              />
            </div>
            <div className="col-span-1">
              <Label htmlFor="season">Saison</Label>
              <Select value={currentSeason} onValueChange={(value) => setCurrentSeason(value as Season)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionner une saison" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="printemps">Printemps</SelectItem>
                  <SelectItem value="été">Été</SelectItem>
                  <SelectItem value="automne">Automne</SelectItem>
                  <SelectItem value="hiver">Hiver</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-1">
              <Label htmlFor="importance">Importance</Label>
              <Slider
                defaultValue={[newEntryImportance]}
                max={3}
                min={1}
                step={1}
                onValueChange={(value) => setNewEntryImportance(value[0] as 1 | 2 | 3)}
              />
              <p className="text-sm text-muted-foreground text-center">
                {newEntryImportance === 1 ? 'Mineur' : newEntryImportance === 2 ? 'Moyen' : 'Majeur'}
              </p>
            </div>
          </div>
          
          <Label htmlFor="title">Titre</Label>
          <Input 
            type="text" 
            id="title" 
            value={newEntryTitle} 
            onChange={(e) => setNewEntryTitle(e.target.value)} 
          />
          
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={newEntryDescription}
            onChange={(e) => setNewEntryDescription(e.target.value)}
            className="resize-none"
          />
          
          <Label htmlFor="category">Catégorie</Label>
          <Select value={newEntryCategory} onValueChange={(value) => setNewEntryCategory(value as EvenementType)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sélectionner une catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="politique">Politique</SelectItem>
              <SelectItem value="militaire">Militaire</SelectItem>
              <SelectItem value="économique">Économique</SelectItem>
              <SelectItem value="religieux">Religieux</SelectItem>
              <SelectItem value="social">Social</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={handleAddEntry} className="w-full">
            Ajouter une entrée
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-lg">Chronologie historique</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Rechercher..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-[200px]" 
              />
            </div>
            <Button variant="outline" size="sm" onClick={handleSortEntries}>
              Trier par date ({sortDirection === 'asc' ? 'ascendant' : 'descendant'})
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <HistoireTimeline 
            entries={filteredEntries} 
            onUpdateEntry={handleUpdateEntry} 
            onDeleteEntry={handleDeleteEntry}
          />
        </CardContent>
      </Card>
    </div>
  );
};
