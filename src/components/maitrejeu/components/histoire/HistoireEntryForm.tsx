
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HistoireEntry, Season } from '../../types/histoire';

interface HistoireEntryFormProps {
  year: number;
  season: Season;
  onSubmit: (entry: Omit<HistoireEntry, "id">) => void;
}

export const HistoireEntryForm: React.FC<HistoireEntryFormProps> = ({ 
  year, 
  season, 
  onSubmit 
}) => {
  const [newEntry, setNewEntry] = useState<Omit<HistoireEntry, "id">>({
    titre: '',
    contenu: '',
    date: {
      year: year,
      season: season,
      day: 1
    },
    personnagesImpliqués: [],
    type: 'POLITIQUE'
  });
  
  const [personnage, setPersonnage] = useState('');
  const [entryType, setEntryType] = useState<string>('POLITIQUE');
  
  const handleAddPersonnage = () => {
    if (personnage.trim()) {
      setNewEntry({
        ...newEntry,
        personnagesImpliqués: [...(newEntry.personnagesImpliqués || []), personnage.trim()]
      });
      setPersonnage('');
    }
  };
  
  const handleRemovePersonnage = (index: number) => {
    setNewEntry({
      ...newEntry,
      personnagesImpliqués: newEntry.personnagesImpliqués?.filter((_, i) => i !== index)
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSubmit({
      ...newEntry,
      type: entryType
    });
    
    // Reset form
    setNewEntry({
      titre: '',
      contenu: '',
      date: {
        year: year,
        season: season,
        day: 1
      },
      personnagesImpliqués: [],
      type: 'POLITIQUE'
    });
    setEntryType('POLITIQUE');
  };

  return (
    <div className="p-4 bg-white rounded-md shadow">
      <h3 className="text-lg font-semibold mb-4">Ajouter un événement historique</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Titre</label>
          <Input 
            value={newEntry.titre}
            onChange={(e) => setNewEntry({...newEntry, titre: e.target.value})}
            placeholder="Titre de l'événement"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Année</label>
            <Input 
              type="number"
              value={newEntry.date.year}
              onChange={(e) => setNewEntry({
                ...newEntry, 
                date: {...newEntry.date, year: parseInt(e.target.value)}
              })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Saison</label>
            <Select 
              value={newEntry.date.season} 
              onValueChange={(value: Season) => setNewEntry({
                ...newEntry, 
                date: {...newEntry.date, season: value}
              })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SPRING">Printemps</SelectItem>
                <SelectItem value="SUMMER">Été</SelectItem>
                <SelectItem value="AUTUMN">Automne</SelectItem>
                <SelectItem value="WINTER">Hiver</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <Select 
            value={entryType} 
            onValueChange={setEntryType}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="POLITIQUE">Politique</SelectItem>
              <SelectItem value="MILITAIRE">Militaire</SelectItem>
              <SelectItem value="SOCIAL">Social</SelectItem>
              <SelectItem value="RELIGIEUX">Religieux</SelectItem>
              <SelectItem value="ECONOMIQUE">Économique</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Contenu</label>
          <Textarea 
            value={newEntry.contenu}
            onChange={(e) => setNewEntry({...newEntry, contenu: e.target.value})}
            placeholder="Détails de l'événement historique..."
            className="min-h-[150px]"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Personnages impliqués</label>
          <div className="flex gap-2">
            <Input 
              value={personnage}
              onChange={(e) => setPersonnage(e.target.value)}
              placeholder="Nom du personnage"
            />
            <Button type="button" onClick={handleAddPersonnage} variant="outline">
              Ajouter
            </Button>
          </div>
          
          {newEntry.personnagesImpliqués && newEntry.personnagesImpliqués.length > 0 && (
            <div className="mt-2 space-y-1">
              {newEntry.personnagesImpliqués.map((p, index) => (
                <div key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                  <span>{p}</span>
                  <Button 
                    type="button" 
                    onClick={() => handleRemovePersonnage(index)}
                    variant="ghost" 
                    size="sm" 
                    className="h-7 text-red-600"
                  >
                    Retirer
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <Button type="submit" className="w-full">
          Enregistrer l'événement
        </Button>
      </form>
    </div>
  );
};
