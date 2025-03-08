
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Edit, Trash, Calendar, Users, Info, BookOpen } from 'lucide-react';
import { HistoireEntry, HistoireTimelineProps, Season } from '../types/maitreJeuTypes';

export const HistoireTimeline: React.FC<HistoireTimelineProps> = ({ 
  histoireEntries, 
  onUpdateEntry, 
  onDeleteEntry 
}) => {
  const [editingEntry, setEditingEntry] = useState<HistoireEntry | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // État local pour l'édition
  const [editTitle, setEditTitle] = useState('');
  const [editType, setEditType] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editPersonnages, setEditPersonnages] = useState('');
  const [editImportance, setEditImportance] = useState<'majeure' | 'mineure' | 'normale'>('normale');
  
  // Helper to get season name in French
  const getSeasonName = (season: Season): string => {
    switch (season) {
      case 'SPRING': return 'Printemps';
      case 'SUMMER': return 'Été';
      case 'AUTUMN': return 'Automne';
      case 'WINTER': return 'Hiver';
      default: return 'Inconnu';
    }
  };
  
  // Helper to get CSS class based on type
  const getTypeColorClass = (type: string): string => {
    switch (type) {
      case 'événement': return 'bg-blue-100 text-blue-800';
      case 'bataille': return 'bg-red-100 text-red-800';
      case 'politique': return 'bg-purple-100 text-purple-800';
      case 'décision': return 'bg-green-100 text-green-800';
      case 'social': return 'bg-amber-100 text-amber-800';
      case 'religieux': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Ouvrir le dialogue d'édition
  const openEditDialog = (entry: HistoireEntry) => {
    setEditingEntry(entry);
    setEditTitle(entry.titre);
    setEditType(entry.type);
    setEditDescription(entry.description);
    setEditPersonnages(entry.personnagesImpliqués.join(', '));
    setEditImportance(entry.importance);
    setIsDialogOpen(true);
  };
  
  // Gérer la soumission du formulaire d'édition
  const handleEditSubmit = () => {
    if (!editingEntry) return;
    
    const updatedEntry: HistoireEntry = {
      ...editingEntry,
      titre: editTitle,
      type: editType,
      description: editDescription,
      personnagesImpliqués: editPersonnages.split(',').map(p => p.trim()).filter(p => p),
      importance: editImportance
    };
    
    onUpdateEntry(editingEntry.id, updatedEntry);
    setIsDialogOpen(false);
  };
  
  // Regrouper les entrées par année et saison
  const groupedEntries: Record<number, Record<Season, HistoireEntry[]>> = {};
  
  histoireEntries.forEach(entry => {
    if (!groupedEntries[entry.date.year]) {
      groupedEntries[entry.date.year] = {} as Record<Season, HistoireEntry[]>;
    }
    
    if (!groupedEntries[entry.date.year][entry.date.season]) {
      groupedEntries[entry.date.year][entry.date.season] = [];
    }
    
    groupedEntries[entry.date.year][entry.date.season].push(entry);
  });
  
  // Trier les années
  const sortedYears = Object.keys(groupedEntries).map(Number).sort((a, b) => b - a);
  
  // Ordre des saisons
  const seasonOrder: Season[] = ['SPRING', 'SUMMER', 'AUTUMN', 'WINTER'];
  
  return (
    <div className="space-y-8">
      {sortedYears.map(year => (
        <div key={year} className="space-y-4">
          <h3 className="text-xl font-semibold border-b pb-2">{year}</h3>
          
          {seasonOrder.map(season => {
            const entries = groupedEntries[year]?.[season] || [];
            if (entries.length === 0) return null;
            
            return (
              <div key={`${year}-${season}`} className="pl-4 border-l-2 border-gray-200 space-y-3">
                <h4 className="text-lg font-medium text-muted-foreground flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {getSeasonName(season)}
                </h4>
                
                {entries.map(entry => (
                  <Card key={entry.id} className={`overflow-hidden ${
                    entry.importance === 'majeure' ? 'border-red-200 shadow-md' : 
                    entry.importance === 'mineure' ? 'border-gray-200' : 'border-blue-200'
                  }`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`text-xs px-2 py-0.5 rounded-full ${getTypeColorClass(entry.type)}`}>
                              {entry.type}
                            </span>
                            {entry.importance === 'majeure' && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-800">
                                Majeur
                              </span>
                            )}
                          </div>
                          <h5 className="text-lg font-semibold">{entry.titre}</h5>
                        </div>
                        
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" onClick={() => openEditDialog(entry)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => onDeleteEntry(entry.id)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <p className="mt-2 text-sm text-muted-foreground">{entry.description}</p>
                      
                      {entry.personnagesImpliqués && entry.personnagesImpliqués.length > 0 && (
                        <div className="mt-3 flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <p className="text-xs text-muted-foreground">
                            {entry.personnagesImpliqués.join(', ')}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            );
          })}
        </div>
      ))}
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Modifier l'entrée historique</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Titre</label>
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Titre de l'événement"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Type</label>
              <Select value={editType} onValueChange={setEditType}>
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
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Description détaillée"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Personnages Impliqués</label>
              <Input
                value={editPersonnages}
                onChange={(e) => setEditPersonnages(e.target.value)}
                placeholder="Séparés par des virgules"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Importance</label>
              <Select 
                value={editImportance} 
                onValueChange={(value) => setEditImportance(value as 'majeure' | 'mineure' | 'normale')}
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
            
            <div className="pt-2 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Annuler</Button>
              <Button onClick={handleEditSubmit}>Enregistrer</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
