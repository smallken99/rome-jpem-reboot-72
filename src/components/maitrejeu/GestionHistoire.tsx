
import React, { useState } from 'react';
import { useMaitreJeu } from './context/MaitreJeuContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { CalendarDays, Clock, FileText, Plus, Search, Star, CalendarCheck } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { HistoireEntry } from './types/maitreJeuTypes';
import { v4 as uuidv4 } from 'uuid';
import { useTimeStore } from '@/utils/timeSystem';

import { HistoireTimeline } from './components/HistoireTimeline';

export const GestionHistoire: React.FC = () => {
  const { histoireEntries, addHistoireEntry, updateHistoireEntry } = useMaitreJeu();
  const { toast } = useToast();
  const { year, season } = useTimeStore();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'MAJEUR' | 'MINEUR'>('MINEUR');
  const [personnages, setPersonnages] = useState<string[]>([]);
  const [newPersonnage, setNewPersonnage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  
  const resetForm = () => {
    setTitle('');
    setDescription('');
    setType('MINEUR');
    setPersonnages([]);
    setNewPersonnage('');
    setEditMode(false);
    setEditId(null);
  };
  
  const handleAddPersonnage = () => {
    if (newPersonnage.trim() && !personnages.includes(newPersonnage.trim())) {
      setPersonnages([...personnages, newPersonnage.trim()]);
      setNewPersonnage('');
    }
  };
  
  const handleRemovePersonnage = (index: number) => {
    setPersonnages(personnages.filter((_, i) => i !== index));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      toast({
        title: "Erreur de validation",
        description: "Le titre et la description sont obligatoires.",
        variant: "destructive",
      });
      return;
    }
    
    const entry: HistoireEntry = {
      id: editMode && editId ? editId : uuidv4(),
      title,
      description,
      date: {
        year,
        season,
      },
      type,
      personnagesImpliqués: personnages,
    };
    
    if (editMode && editId) {
      updateHistoireEntry(editId, entry);
      toast({
        title: "Événement mis à jour",
        description: "L'événement historique a été mis à jour avec succès.",
      });
    } else {
      addHistoireEntry(entry);
      toast({
        title: "Événement ajouté",
        description: "L'événement historique a été ajouté avec succès.",
      });
    }
    
    resetForm();
  };
  
  const handleEdit = (id: string) => {
    const entry = histoireEntries.find(e => e.id === id);
    
    if (entry) {
      setTitle(entry.title);
      setDescription(entry.description);
      setType(entry.type);
      setPersonnages(entry.personnagesImpliqués || []);
      setEditMode(true);
      setEditId(id);
    }
  };
  
  const filteredEntries = searchTerm
    ? histoireEntries.filter(entry => 
        entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.personnagesImpliqués.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : histoireEntries;
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="timeline" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="timeline" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Chronologie
          </TabsTrigger>
          <TabsTrigger value="ajouter" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            {editMode ? 'Modifier' : 'Ajouter'}
          </TabsTrigger>
          <TabsTrigger value="recherche" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Recherche
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="timeline">
          <div className="mb-4 flex justify-between items-center">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-muted-foreground" />
              Chronologie des événements
            </h3>
            
            <div className="flex items-center">
              <Input
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-xs"
              />
            </div>
          </div>
          
          {filteredEntries.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              Aucun événement historique à afficher.
            </div>
          ) : (
            <HistoireTimeline onEdit={handleEdit} />
          )}
        </TabsContent>
        
        <TabsContent value="ajouter">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">
                {editMode ? 'Modifier un événement historique' : 'Ajouter un événement historique'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre</Label>
                  <Input 
                    id="title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Titre de l'événement"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    placeholder="Description détaillée de l'événement"
                    rows={4}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Type d'événement</Label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="type-mineur" 
                        name="type" 
                        checked={type === 'MINEUR'} 
                        onChange={() => setType('MINEUR')} 
                        className="mr-2"
                      />
                      <Label htmlFor="type-mineur">Mineur</Label>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id="type-majeur" 
                        name="type" 
                        checked={type === 'MAJEUR'} 
                        onChange={() => setType('MAJEUR')} 
                        className="mr-2"
                      />
                      <Label htmlFor="type-majeur" className="flex items-center">
                        Majeur
                        <Star className="h-4 w-4 text-amber-500 ml-1" />
                      </Label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date">Date de l'événement</Label>
                  <div className="flex items-center bg-gray-50 p-2 rounded-md">
                    <CalendarCheck className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span>{season}, {year} AUC (date actuelle)</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    L'événement sera enregistré à la date actuelle du jeu.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label>Personnages impliqués</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      value={newPersonnage} 
                      onChange={(e) => setNewPersonnage(e.target.value)} 
                      placeholder="Nom du personnage"
                      className="flex-1"
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleAddPersonnage}
                    >
                      Ajouter
                    </Button>
                  </div>
                  
                  {personnages.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {personnages.map((personnage, index) => (
                        <div key={index} className="flex items-center justify-between rounded-md border p-2 bg-gray-50">
                          <span>{personnage}</span>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleRemovePersonnage(index)}
                            className="text-red-500 hover:text-red-700 h-8 w-8 p-0"
                          >
                            &times;
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  {editMode && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={resetForm}
                    >
                      Annuler
                    </Button>
                  )}
                  
                  <ActionButton
                    type="submit"
                    variant="default"
                    label={editMode ? "Mettre à jour" : "Ajouter à l'histoire"}
                    icon={<FileText className="h-4 w-4" />}
                  />
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recherche">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-4">
              <Search className="h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Rechercher des événements historiques..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
            </div>
            
            {filteredEntries.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                Aucun résultat trouvé pour "{searchTerm}".
              </div>
            ) : (
              <div className="space-y-4">
                {filteredEntries.map(entry => (
                  <Card key={entry.id} className={`border-l-4 ${entry.type === 'MAJEUR' ? 'border-l-amber-500' : 'border-l-blue-500'}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            {entry.type === 'MAJEUR' && (
                              <Star className="h-4 w-4 text-amber-500" />
                            )}
                            <h3 className="font-medium text-lg">{entry.title}</h3>
                          </div>
                          
                          <p className="text-sm text-muted-foreground">
                            {entry.date.season}, {entry.date.year} AUC
                          </p>
                          
                          <p className="text-sm mt-2">{entry.description}</p>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <ActionButton
                            variant="outline"
                            size="sm"
                            label="Modifier"
                            onClick={() => handleEdit(entry.id)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
