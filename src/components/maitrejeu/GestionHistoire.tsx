
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Check, Plus, Search, BookText, CalendarClock } from 'lucide-react';
import { useMaitreJeu } from './context';
import { HistoireEntry } from './types/histoire';
import { HistoireTimeline } from './components/HistoireTimeline';
import { v4 as uuidv4 } from 'uuid';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

export const GestionHistoire: React.FC = () => {
  const { histoireEntries, addHistoireEntry, currentDate } = useMaitreJeu();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('chronique');
  
  // État du formulaire d'ajout
  const [titre, setTitre] = useState('');
  const [contenu, setContenu] = useState('');
  const [importance, setImportance] = useState<'majeure' | 'mineure' | 'normale'>('normale');
  const [categorie, setCategorie] = useState('POLITIQUE');
  const [visible, setVisible] = useState(true);
  const [personnagesImpliqués, setPersonnagesImpliqués] = useState('');
  
  // Filtrage des entrées d'histoire
  const filteredEntries = searchTerm 
    ? histoireEntries.filter(
        entry => (entry.titre || entry.title || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                (entry.contenu || entry.description || '').toLowerCase().includes(searchTerm.toLowerCase())
      )
    : histoireEntries;
  
  // Ajouter une nouvelle entrée d'histoire
  const handleAddEntry = () => {
    if (!titre || !contenu) return;
    
    const newEntry: Omit<HistoireEntry, "id"> = {
      titre,
      contenu,
      date: { ...currentDate },
      catégorie: categorie,
      importance: importance,
      auteur: "Maître du Jeu",
      visible,
      personnagesImpliqués: personnagesImpliqués.split(',').map(p => p.trim()).filter(p => p),
      
      // Pour la compatibilité avec le code existant
      title: titre,
      description: contenu,
      year: currentDate.year,
      season: currentDate.season,
      type: categorie
    };
    
    addHistoireEntry(newEntry);
    
    // Réinitialiser le formulaire
    setTitre('');
    setContenu('');
    setImportance('normale');
    setCategorie('POLITIQUE');
    setVisible(true);
    setPersonnagesImpliqués('');
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
            <HistoireTimeline entries={filteredEntries} />
          </TabsContent>
          
          <TabsContent value="ajouter" className="mt-0">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Titre de l'événement</label>
                <Input
                  placeholder="Ex: Victoire contre Carthage"
                  value={titre}
                  onChange={(e) => setTitre(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Décrivez l'événement historique..."
                  className="min-h-[100px]"
                  value={contenu}
                  onChange={(e) => setContenu(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Catégorie</label>
                  <Select value={categorie} onValueChange={setCategorie}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="POLITIQUE">Politique</SelectItem>
                      <SelectItem value="MILITAIRE">Militaire</SelectItem>
                      <SelectItem value="ECONOMIQUE">Économique</SelectItem>
                      <SelectItem value="SOCIAL">Social</SelectItem>
                      <SelectItem value="RELIGIEUX">Religieux</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Importance</label>
                  <Select value={importance} onValueChange={setImportance as (value: string) => void}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner l'importance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="majeure">Majeure</SelectItem>
                      <SelectItem value="normale">Normale</SelectItem>
                      <SelectItem value="mineure">Mineure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Personnages impliqués</label>
                <Input
                  placeholder="Noms séparés par des virgules"
                  value={personnagesImpliqués}
                  onChange={(e) => setPersonnagesImpliqués(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Entrez les noms des personnages séparés par des virgules
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="visible"
                  checked={visible}
                  onChange={(e) => setVisible(e.target.checked)}
                  className="rounded border-input"
                />
                <label htmlFor="visible" className="text-sm">
                  Événement visible pour les joueurs
                </label>
              </div>
              
              <Button 
                onClick={handleAddEntry}
                disabled={!titre || !contenu}
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
