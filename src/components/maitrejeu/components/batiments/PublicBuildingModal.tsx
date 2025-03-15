
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Coins, Calendar, Construction } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface PublicBuildingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (data: any) => void;
  balance: number;
}

export const PublicBuildingModal: React.FC<PublicBuildingModalProps> = ({
  isOpen,
  onClose,
  onCreateProject,
  balance
}) => {
  const [buildingType, setBuildingType] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [location, setLocation] = useState<string>('Rome');
  const [constructionTime, setConstructionTime] = useState<number>(4);
  const [customCost, setCustomCost] = useState<string>('');
  
  // Get building info based on type
  const getBuildingInfo = (type: string) => {
    const buildingTypes: Record<string, { name: string, cost: number, time: number, benefits: string[] }> = {
      'forum': {
        name: 'Forum',
        cost: 50000,
        time: 8,
        benefits: ['Augmente le prestige', 'Favorise le commerce']
      },
      'temple': {
        name: 'Temple',
        cost: 30000,
        time: 4,
        benefits: ['Augmente la piété', 'Diminue les troubles civils']
      },
      'market': {
        name: 'Marché',
        cost: 25000,
        time: 3,
        benefits: ['Augmente les revenus', 'Améliore l\'approvisionnement']
      },
      'aqueduct': {
        name: 'Aqueduc',
        cost: 80000,
        time: 10,
        benefits: ['Améliore la santé publique', 'Réduit les risques d\'incendie']
      },
      'bath': {
        name: 'Thermes',
        cost: 40000,
        time: 6,
        benefits: ['Augmente le bonheur', 'Améliore la santé publique']
      },
      'granary': {
        name: 'Grenier',
        cost: 20000,
        time: 2,
        benefits: ['Stockage de nourriture', 'Réduit les risques de famine']
      },
      'theater': {
        name: 'Théâtre',
        cost: 35000,
        time: 5,
        benefits: ['Augmente le divertissement', 'Améliore la culture']
      },
      'barracks': {
        name: 'Caserne',
        cost: 30000,
        time: 4,
        benefits: ['Améliore le recrutement militaire', 'Renforce la sécurité']
      }
    };
    
    return buildingTypes[type] || { name: 'Bâtiment personnalisé', cost: 20000, time: 3, benefits: [] };
  };
  
  const selectedBuildingInfo = buildingType ? getBuildingInfo(buildingType) : null;
  
  // Calculate upfront cost (30% of total)
  const totalCost = customCost 
    ? parseInt(customCost) 
    : (selectedBuildingInfo?.cost || 0);
  const upfrontCost = Math.round(totalCost * 0.3);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!buildingType || !name || !location) {
      return;
    }
    
    const buildingData = {
      name,
      typeId: buildingType,
      buildingType: 'public',
      location,
      cost: totalCost,
      constructionTime,
      benefits: selectedBuildingInfo?.benefits || [],
    };
    
    onCreateProject(buildingData);
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Construction className="mr-2 h-5 w-5" />
            Nouveau Projet de Construction
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="buildingType">Type de bâtiment</Label>
                <Select 
                  value={buildingType} 
                  onValueChange={setBuildingType}
                >
                  <SelectTrigger id="buildingType">
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="forum">Forum</SelectItem>
                    <SelectItem value="temple">Temple</SelectItem>
                    <SelectItem value="market">Marché</SelectItem>
                    <SelectItem value="aqueduct">Aqueduc</SelectItem>
                    <SelectItem value="bath">Thermes</SelectItem>
                    <SelectItem value="granary">Grenier</SelectItem>
                    <SelectItem value="theater">Théâtre</SelectItem>
                    <SelectItem value="barracks">Caserne</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name">Nom du bâtiment</Label>
                <Input 
                  id="name" 
                  placeholder="ex: Forum Romanum" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Emplacement</Label>
                <Select 
                  value={location} 
                  onValueChange={setLocation}
                >
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Sélectionner un emplacement" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Rome">Rome</SelectItem>
                    <SelectItem value="Ostie">Ostie</SelectItem>
                    <SelectItem value="Capoue">Capoue</SelectItem>
                    <SelectItem value="Pompéi">Pompéi</SelectItem>
                    <SelectItem value="Naples">Naples</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cost">Coût estimé (As)</Label>
                  <Input 
                    id="cost" 
                    type="number" 
                    placeholder={selectedBuildingInfo?.cost.toString() || "0"}
                    value={customCost}
                    onChange={(e) => setCustomCost(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="time">Durée (saisons)</Label>
                  <Input 
                    id="time" 
                    type="number" 
                    value={constructionTime}
                    onChange={(e) => setConstructionTime(parseInt(e.target.value))}
                    min={1}
                    max={20}
                  />
                </div>
              </div>
            </div>
            
            {selectedBuildingInfo && (
              <div>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-4">Détails du projet</h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <span className="font-medium">{selectedBuildingInfo.name}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Coût total:</span>
                        <span className="font-medium">{totalCost.toLocaleString()} As</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Paiement initial (30%):</span>
                        <span className="font-medium">{upfrontCost.toLocaleString()} As</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Solde disponible:</span>
                        <span className={`font-medium ${balance < upfrontCost ? 'text-red-500' : ''}`}>
                          {balance.toLocaleString()} As
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Durée estimée:</span>
                        <span className="font-medium">{constructionTime} saisons</span>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Avantages:</h4>
                      <ul className="text-sm space-y-1">
                        {selectedBuildingInfo.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 mr-2" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center text-sm">
                <Coins className="h-4 w-4 mr-1.5 text-amber-500" />
                <span>Paiement initial: <strong>{upfrontCost.toLocaleString()} As</strong></span>
              </div>
              
              <div className="space-x-2">
                <Button variant="outline" type="button" onClick={onClose}>
                  Annuler
                </Button>
                <Button 
                  type="submit"
                  disabled={!buildingType || !name || !location || balance < upfrontCost}
                >
                  <Construction className="h-4 w-4 mr-1.5" />
                  Démarrer le projet
                </Button>
              </div>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
