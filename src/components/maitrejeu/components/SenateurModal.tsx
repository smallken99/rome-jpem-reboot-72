
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MagistratureType, SenateurJouable } from '../types/maitreJeuTypes';

export interface SenateurModalProps {
  senateur: SenateurJouable;
  open: boolean;
  onClose?: () => void;
  onSave: (senateur: SenateurJouable) => void;
}

export const SenateurModal: React.FC<SenateurModalProps> = ({ 
  senateur, 
  open, 
  onClose = () => {}, 
  onSave 
}) => {
  const [editedSenateur, setEditedSenateur] = useState<SenateurJouable>(senateur);
  
  useEffect(() => {
    setEditedSenateur(senateur);
  }, [senateur]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedSenateur(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: keyof SenateurJouable, value: string) => {
    setEditedSenateur(prev => ({ ...prev, [name]: value }));
  };
  
  const handleStatsChange = (statName: string, value: number[]) => {
    setEditedSenateur(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        [statName]: value[0]
      }
    }));
  };
  
  const handleNumberChange = (name: keyof SenateurJouable, value: number) => {
    setEditedSenateur(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSave = () => {
    onSave(editedSenateur);
    onClose();
  };
  
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-cinzel">Éditer le Sénateur</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="flex items-center space-x-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={`/images/senateurs/${editedSenateur.id}.jpg`} alt={editedSenateur.nom} />
              <AvatarFallback className="text-lg">{editedSenateur.nom.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div>
              <div className="mb-4">
                <Label htmlFor="nom">Nom</Label>
                <Input
                  id="nom"
                  name="nom"
                  value={editedSenateur.nom}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="mb-4">
                <Label htmlFor="famille">Famille</Label>
                <Input
                  id="famille"
                  name="famille"
                  value={editedSenateur.famille}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="âge">Âge</Label>
              <Input
                id="âge"
                name="âge"
                type="number"
                value={editedSenateur.âge || editedSenateur.age || 35}
                onChange={(e) => handleNumberChange('âge', parseInt(e.target.value))}
              />
            </div>
            
            <div>
              <Label htmlFor="faction">Faction</Label>
              <Select
                value={editedSenateur.faction}
                onValueChange={(value) => handleSelectChange('faction', value)}
              >
                <SelectTrigger id="faction">
                  <SelectValue placeholder="Sélectionner une faction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Populares">Populares</SelectItem>
                  <SelectItem value="Optimates">Optimates</SelectItem>
                  <SelectItem value="Moderates">Moderates</SelectItem>
                  <SelectItem value="Indépendant">Indépendant</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="magistrature">Magistrature</Label>
              <Select
                value={editedSenateur.magistrature || ""}
                onValueChange={(value) => handleSelectChange('magistrature', value as MagistratureType)}
              >
                <SelectTrigger id="magistrature">
                  <SelectValue placeholder="Sélectionner une magistrature" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Aucune</SelectItem>
                  <SelectItem value="CONSUL">Consul</SelectItem>
                  <SelectItem value="PRETEUR">Préteur</SelectItem>
                  <SelectItem value="EDILE">Édile</SelectItem>
                  <SelectItem value="QUESTEUR">Questeur</SelectItem>
                  <SelectItem value="CENSEUR">Censeur</SelectItem>
                  <SelectItem value="TRIBUN">Tribun de la Plèbe</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="province">Province</Label>
              <Select
                value={editedSenateur.province || ""}
                onValueChange={(value) => handleSelectChange('province', value)}
              >
                <SelectTrigger id="province">
                  <SelectValue placeholder="Sélectionner une province" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Aucune</SelectItem>
                  <SelectItem value="hispania">Hispanie</SelectItem>
                  <SelectItem value="gallia">Gaule</SelectItem>
                  <SelectItem value="sicilia">Sicile</SelectItem>
                  <SelectItem value="sardinia">Sardaigne</SelectItem>
                  <SelectItem value="macedonia">Macédoine</SelectItem>
                  <SelectItem value="africa">Afrique</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold">Statistiques</h3>
            
            <div>
              <div className="flex justify-between">
                <Label htmlFor="eloquence">Éloquence</Label>
                <span>{editedSenateur.stats.éloquence}</span>
              </div>
              <Slider
                id="eloquence"
                defaultValue={[editedSenateur.stats.éloquence]}
                max={10}
                step={1}
                onValueChange={(value) => handleStatsChange('éloquence', value)}
              />
            </div>
            
            <div>
              <div className="flex justify-between">
                <Label htmlFor="administration">Administration</Label>
                <span>{editedSenateur.stats.administration}</span>
              </div>
              <Slider
                id="administration"
                defaultValue={[editedSenateur.stats.administration]}
                max={10}
                step={1}
                onValueChange={(value) => handleStatsChange('administration', value)}
              />
            </div>
            
            <div>
              <div className="flex justify-between">
                <Label htmlFor="militaire">Militaire</Label>
                <span>{editedSenateur.stats.militaire}</span>
              </div>
              <Slider
                id="militaire"
                defaultValue={[editedSenateur.stats.militaire]}
                max={10}
                step={1}
                onValueChange={(value) => handleStatsChange('militaire', value)}
              />
            </div>
            
            <div>
              <div className="flex justify-between">
                <Label htmlFor="intrigue">Intrigue</Label>
                <span>{editedSenateur.stats.intrigue}</span>
              </div>
              <Slider
                id="intrigue"
                defaultValue={[editedSenateur.stats.intrigue]}
                max={10}
                step={1}
                onValueChange={(value) => handleStatsChange('intrigue', value)}
              />
            </div>
            
            <div>
              <div className="flex justify-between">
                <Label htmlFor="charisme">Charisme</Label>
                <span>{editedSenateur.stats.charisme}</span>
              </div>
              <Slider
                id="charisme"
                defaultValue={[editedSenateur.stats.charisme]}
                max={10}
                step={1}
                onValueChange={(value) => handleStatsChange('charisme', value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between">
                <Label htmlFor="influence">Influence</Label>
                <span>{editedSenateur.influence}</span>
              </div>
              <Slider
                id="influence"
                defaultValue={[editedSenateur.influence]}
                max={100}
                step={1}
                onValueChange={(value) => handleNumberChange('influence', value[0])}
              />
            </div>
            
            <div>
              <div className="flex justify-between">
                <Label htmlFor="richesse">Richesse</Label>
                <span>{editedSenateur.richesse}</span>
              </div>
              <Slider
                id="richesse"
                defaultValue={[editedSenateur.richesse]}
                max={10000}
                step={100}
                onValueChange={(value) => handleNumberChange('richesse', value[0])}
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between">
              <Label htmlFor="popularite">Popularité</Label>
              <span>{editedSenateur.popularité}</span>
            </div>
            <Slider
              id="popularite"
              defaultValue={[editedSenateur.popularité]}
              max={100}
              step={1}
              onValueChange={(value) => handleNumberChange('popularité', value[0])}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={handleSave}>Sauvegarder</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
