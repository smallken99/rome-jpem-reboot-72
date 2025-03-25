
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { AddNationModalProps, Nation } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { Slider } from '@/components/ui/slider';

export const AddNationModal: React.FC<AddNationModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [name, setName] = useState('');
  const [region, setRegion] = useState('');
  const [status, setStatus] = useState<'ally' | 'neutral' | 'hostile' | 'vassal' | 'tributary' | 'enemy'>('neutral');
  const [relationScore, setRelationScore] = useState(50);
  const [leader, setLeader] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#3b82f6');
  const [leaderTitle, setLeaderTitle] = useState('');
  
  const regions = [
    { id: 'europa', name: 'Europe' },
    { id: 'africa', name: 'Afrique' },
    { id: 'asia', name: 'Asie' },
    { id: 'gaul', name: 'Gaule' },
    { id: 'germania', name: 'Germanie' },
    { id: 'hispania', name: 'Hispanie' },
    { id: 'britannia', name: 'Britannia' },
    { id: 'aegyptus', name: 'Égypte' },
    { id: 'graecia', name: 'Grèce' }
  ];
  
  const statusOptions = [
    { id: 'ally', name: 'Allié' },
    { id: 'neutral', name: 'Neutre' },
    { id: 'hostile', name: 'Hostile' },
    { id: 'vassal', name: 'Vassal' },
    { id: 'tributary', name: 'Tributaire' },
    { id: 'enemy', name: 'Ennemi' }
  ];
  
  const leaderTitles = [
    { id: 'rex', name: 'Roi' },
    { id: 'imperator', name: 'Empereur' },
    { id: 'princeps', name: 'Prince' },
    { id: 'dux', name: 'Duc' },
    { id: 'consul', name: 'Consul' },
    { id: 'strategos', name: 'Stratège' },
    { id: 'pharaoh', name: 'Pharaon' },
    { id: 'chieftain', name: 'Chef de Tribu' },
    { id: 'tetrarch', name: 'Tétrarque' }
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newNation: Nation = {
      id: uuidv4(),
      name,
      region,
      status,
      relationScore,
      leader,
      description,
      color,
      leaderTitle,
      population: Math.floor(Math.random() * 1000000) + 500000,
      militaryStrength: Math.floor(Math.random() * 100) + 1,
      diplomaticInfluence: Math.floor(Math.random() * 100) + 1,
      lastContact: new Date().toISOString()
    };
    
    onSave(newNation);
    resetForm();
    onClose();
  };
  
  const resetForm = () => {
    setName('');
    setRegion('');
    setStatus('neutral');
    setRelationScore(50);
    setLeader('');
    setDescription('');
    setColor('#3b82f6');
    setLeaderTitle('');
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(isOpen) => {
      if (!isOpen) {
        resetForm();
        onClose();
      }
    }}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Ajouter une nouvelle nation</DialogTitle>
          <DialogDescription>
            Créez une nouvelle nation étrangère et définissez sa relation avec Rome
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom de la nation</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="region">Région</Label>
              <Select value={region} onValueChange={setRegion} required>
                <SelectTrigger id="region">
                  <SelectValue placeholder="Sélectionner une région" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((regionOption) => (
                    <SelectItem key={regionOption.id} value={regionOption.id}>
                      {regionOption.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Statut diplomatique</Label>
              <Select value={status} onValueChange={(value) => setStatus(value as any)} required>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((statusOption) => (
                    <SelectItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="color">Couleur</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  id="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-12 h-9 p-1"
                />
                <Input
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="relationScore">Relation avec Rome</Label>
              <span className="text-sm">{relationScore}%</span>
            </div>
            <Slider
              id="relationScore"
              value={[relationScore]}
              min={0}
              max={100}
              step={1}
              onValueChange={(values) => setRelationScore(values[0])}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="leaderTitle">Titre du dirigeant</Label>
              <Select value={leaderTitle} onValueChange={setLeaderTitle}>
                <SelectTrigger id="leaderTitle">
                  <SelectValue placeholder="Sélectionner un titre" />
                </SelectTrigger>
                <SelectContent>
                  {leaderTitles.map((title) => (
                    <SelectItem key={title.id} value={title.id}>
                      {title.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="leader">Nom du dirigeant</Label>
              <Input
                id="leader"
                value={leader}
                onChange={(e) => setLeader(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">Ajouter la nation</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
