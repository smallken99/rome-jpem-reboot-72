
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { 
  Plus, Save, Trash2, Search, FileText, 
  CalendarDays, Award
} from 'lucide-react';
import { useMaitreJeu } from './context/MaitreJeuContext';
import { HistoireEntry } from './types/maitreJeuTypes';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { toast } from 'sonner';
import { HistoireTimeline } from './components/HistoireTimeline';

export const GestionHistoire: React.FC = () => {
  const { 
    histoireEntries, 
    addHistoryEntry, 
    updateHistoryEntry,
    removeHistoryEntry 
  } = useMaitreJeu();

  const [searchTerm, setSearchTerm] = useState('');
  const [formMode, setFormMode] = useState<'new' | 'edit'>('new');
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [titre, setTitre] = useState('');
  const [contenu, setContenu] = useState('');
  const [annee, setAnnee] = useState('');
  const [importance, setImportance] = useState<'mineure' | 'moyenne' | 'majeure'>('moyenne');
  
  // Filtrer les entrées historiques
  const filteredEntries = histoireEntries.filter(entry => 
    entry.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.contenu.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.annee.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Trier par ordre chronologique inversé
  const sortedEntries = [...filteredEntries].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  const handleAddEntry = () => {
    if (!titre || !contenu || !annee) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    if (formMode === 'new') {
      addHistoryEntry({
        titre,
        contenu,
        annee,
        importance
      });
    } else if (formMode === 'edit' && editingId) {
      updateHistoryEntry(editingId, {
        titre,
        contenu,
        annee,
        importance
      });
    }
    
    resetForm();
  };
  
  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette entrée historique ?')) {
      removeHistoryEntry(id);
      
      if (editingId === id) {
        resetForm();
      }
    }
  };
  
  const handleEdit = (entry: HistoireEntry) => {
    setFormMode('edit');
    setEditingId(entry.id);
    setTitre(entry.titre);
    setContenu(entry.contenu);
    setAnnee(entry.annee);
    setImportance(entry.importance);
  };
  
  const resetForm = () => {
    setFormMode('new');
    setEditingId(null);
    setTitre('');
    setContenu('');
    setAnnee('');
    setImportance('moyenne');
  };
  
  const getImportanceColor = (importance: string) => {
    switch(importance) {
      case 'majeure': return 'text-amber-500';
      case 'moyenne': return 'text-blue-500';
      case 'mineure': return 'text-gray-500';
      default: return 'text-gray-500';
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Chronologie de Rome</CardTitle>
        </CardHeader>
        <CardContent>
          <HistoireTimeline entries={histoireEntries} />
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Événements historiques</CardTitle>
            <div className="relative w-1/2">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Rechercher..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8" 
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              {sortedEntries.length > 0 ? (
                sortedEntries.map((entry) => (
                  <div key={entry.id} className="border rounded-md p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <h3 className="font-medium">{entry.titre}</h3>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleEdit(entry)}
                          className="h-8 w-8 p-0"
                        >
                          <Save className="h-4 w-4" />
                          <span className="sr-only">Modifier</span>
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDelete(entry.id)}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Supprimer</span>
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{entry.contenu}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                      <div className="flex items-center gap-1">
                        <CalendarDays className="h-3.5 w-3.5" />
                        <span>{entry.annee}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className={`h-3.5 w-3.5 ${getImportanceColor(entry.importance)}`} />
                        <span className={getImportanceColor(entry.importance)}>
                          {entry.importance.charAt(0).toUpperCase() + entry.importance.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-muted-foreground italic">
                  {searchTerm ? "Aucun résultat trouvé pour cette recherche" : "Aucun événement historique enregistré"}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">
              {formMode === 'new' ? 'Ajouter un événement' : 'Modifier l\'événement'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="titre">Titre</Label>
                <Input
                  id="titre" 
                  placeholder="Titre de l'événement"
                  value={titre}
                  onChange={(e) => setTitre(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contenu">Description</Label>
                <Textarea
                  id="contenu"
                  placeholder="Description de l'événement historique"
                  rows={4}
                  value={contenu}
                  onChange={(e) => setContenu(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="annee">Année</Label>
                <Input
                  id="annee"
                  placeholder="ex: 753 av. J.-C. ou 510 AUC"
                  value={annee}
                  onChange={(e) => setAnnee(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="importance">Importance</Label>
                <Select
                  value={importance}
                  onValueChange={(value) => setImportance(value as any)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Importance de l'événement" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mineure">Mineure</SelectItem>
                    <SelectItem value="moyenne">Moyenne</SelectItem>
                    <SelectItem value="majeure">Majeure</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex gap-2 pt-2">
                {formMode === 'edit' && (
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={resetForm}
                  >
                    Annuler
                  </Button>
                )}
                <Button 
                  className="flex-1"
                  onClick={handleAddEntry}
                >
                  {formMode === 'new' ? (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Enregistrer
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
