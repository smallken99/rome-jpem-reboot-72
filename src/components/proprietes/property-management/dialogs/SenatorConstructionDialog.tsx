
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { BuilderIcon, Hammer, FileText, DollarSign, Clock } from 'lucide-react';
import { useSenatorConstruction, ConstructionOptions } from '../../hooks/building/useSenatorConstruction';
import { formatCurrency } from '@/utils/currencyUtils';
import { toast } from 'sonner';

interface SenatorConstructionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  senatorId: string;
  senatorName: string;
  availableBalance: number;
}

export const SenatorConstructionDialog: React.FC<SenatorConstructionDialogProps> = ({
  open,
  onOpenChange,
  senatorId,
  senatorName,
  availableBalance
}) => {
  const [buildingType, setBuildingType] = useState('urban');
  const [buildingName, setBuildingName] = useState('');
  const [location, setLocation] = useState('Rome - Forum');
  const [constructionCost, setConstructionCost] = useState(50000);
  const [constructionTime, setConstructionTime] = useState(2);
  const [description, setDescription] = useState('');
  
  const { startConstruction, isLoading } = useSenatorConstruction();
  
  const canAfford = availableBalance >= constructionCost;
  
  const handleStartConstruction = async () => {
    if (!canAfford || !buildingName || !location) {
      toast.error("Veuillez remplir tous les champs et vous assurer d'avoir les fonds nécessaires.");
      return;
    }
    
    const options: ConstructionOptions = {
      senatorId,
      senatorName,
      buildingType,
      buildingName,
      location,
      cost: constructionCost,
      constructionTime,
      description,
      maintenanceCost: Math.round(constructionCost * 0.05)
    };
    
    const result = await startConstruction(options);
    
    if (result) {
      resetForm();
      onOpenChange(false);
    }
  };
  
  const resetForm = () => {
    setBuildingType('urban');
    setBuildingName('');
    setLocation('Rome - Forum');
    setConstructionCost(50000);
    setConstructionTime(2);
    setDescription('');
  };
  
  const buildingTypes = [
    { id: 'urban', name: 'Résidence urbaine' },
    { id: 'rural', name: 'Domaine rural' },
    { id: 'commercial', name: 'Établissement commercial' },
    { id: 'religious', name: 'Temple ou sanctuaire' },
    { id: 'public', name: 'Bâtiment public' }
  ];
  
  const locations = {
    urban: [
      'Rome - Palatin',
      'Rome - Forum',
      'Rome - Capitole',
      'Rome - Aventin',
      'Rome - Champ de Mars',
      'Rome - Via Sacra'
    ],
    rural: [
      'Latium',
      'Campanie',
      'Toscane',
      'Ombrie',
      'Apulie',
      'Sicile'
    ],
    other: [
      'Rome',
      'Ostie',
      'Capoue',
      'Naples',
      'Pompéi',
      'Tarente'
    ]
  };
  
  // Obtenir la liste des emplacements en fonction du type de bâtiment
  const getLocations = () => {
    if (buildingType === 'urban') return locations.urban;
    if (buildingType === 'rural') return locations.rural;
    return locations.other;
  };
  
  return (
    <Dialog open={open} onOpenChange={(open) => {
      if (!open) resetForm();
      onOpenChange(open);
    }}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="font-cinzel flex items-center gap-2">
            <Hammer className="h-5 w-5" />
            <span>Construction d'un nouveau bâtiment</span>
          </DialogTitle>
          <DialogDescription>
            En tant que sénateur, vous pouvez investir vos As dans la construction de nouveaux bâtiments
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-5 py-3">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="buildingType" className="text-right">Type</Label>
            <Select value={buildingType} onValueChange={setBuildingType}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Type de bâtiment" />
              </SelectTrigger>
              <SelectContent>
                {buildingTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="buildingName" className="text-right">Nom</Label>
            <Input
              id="buildingName"
              value={buildingName}
              onChange={(e) => setBuildingName(e.target.value)}
              className="col-span-3"
              placeholder="Ex: Villa Julia"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">Emplacement</Label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Choisir un emplacement" />
              </SelectTrigger>
              <SelectContent>
                {getLocations().map((loc) => (
                  <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Coût</Label>
            <div className="col-span-3 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Minimum: 10 000 As</span>
                <span>Maximum: 1 000 000 As</span>
              </div>
              <Slider
                value={[constructionCost]}
                min={10000}
                max={1000000}
                step={5000}
                onValueChange={(values) => setConstructionCost(values[0])}
              />
              <div className={`text-right font-medium text-lg ${!canAfford ? 'text-red-600' : ''}`}>
                {formatCurrency(constructionCost)}
              </div>
              {!canAfford && (
                <p className="text-red-600 text-sm">
                  Fonds insuffisants (balance: {formatCurrency(availableBalance)})
                </p>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Durée</Label>
            <div className="col-span-3 space-y-2">
              <Slider
                value={[constructionTime]}
                min={1}
                max={10}
                step={1}
                onValueChange={(values) => setConstructionTime(values[0])}
              />
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {constructionTime} {constructionTime > 1 ? 'saisons' : 'saison'}
                </span>
                <span>Environ {Math.ceil(constructionTime / 4)} {Math.ceil(constructionTime / 4) > 1 ? 'ans' : 'an'}</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
              placeholder="Description du bâtiment (optionnel)"
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Maintenance</Label>
            <div className="col-span-3">
              <div className="bg-muted p-2 rounded-md text-sm">
                Coût d'entretien annuel: {formatCurrency(Math.round(constructionCost * 0.05))}
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button 
            onClick={handleStartConstruction}
            disabled={isLoading || !canAfford || !buildingName || !location}
          >
            {isLoading ? "Traitement..." : "Démarrer la construction"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
