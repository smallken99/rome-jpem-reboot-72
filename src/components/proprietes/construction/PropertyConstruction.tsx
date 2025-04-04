
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from '@/components/ui/card';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { ArrowLeft, Home, Building2, MapPin, Landmark, Clock } from 'lucide-react';
import { formatCurrency } from '@/utils/currencyUtils';
import { usePatrimoineManager } from '@/hooks/usePatrimoineManager';
import { useBuildingManagement } from '@/hooks/useBuildingManagement';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { BuildingConstructionDialog } from '../property-management/dialogs/BuildingConstructionDialog';
import { toast } from 'sonner';

const constructionTypes = [
  { id: 'insula', name: 'Insula', description: 'Immeuble d\'habitation urbain', type: 'urban', basePrice: 15000, maintenanceCost: 1500, constructionTime: 4, prestige: 2 },
  { id: 'domus', name: 'Domus', description: 'Maison patricienne', type: 'urban', basePrice: 25000, maintenanceCost: 2000, constructionTime: 6, prestige: 5 },
  { id: 'villa_urbana', name: 'Villa Urbana', description: 'Résidence luxueuse', type: 'urban', basePrice: 35000, maintenanceCost: 3000, constructionTime: 8, prestige: 8 },
  { id: 'villa_rustica', name: 'Villa Rustica', description: 'Domaine agricole', type: 'rural', basePrice: 20000, maintenanceCost: 2500, constructionTime: 6, prestige: 4 },
  { id: 'vineyard', name: 'Vignoble', description: 'Domaine viticole', type: 'rural', basePrice: 18000, maintenanceCost: 2200, constructionTime: 5, prestige: 3 },
  { id: 'olive_grove', name: 'Oliveraie', description: 'Plantation d\'oliviers', type: 'rural', basePrice: 16000, maintenanceCost: 1800, constructionTime: 5, prestige: 3 },
  { id: 'small_temple', name: 'Petit Temple', description: 'Sanctuaire dédié à une divinité', type: 'religious', basePrice: 12000, maintenanceCost: 1000, constructionTime: 4, prestige: 6 },
  { id: 'shrine', name: 'Autel', description: 'Lieu de culte modeste', type: 'religious', basePrice: 5000, maintenanceCost: 500, constructionTime: 2, prestige: 2 }
];

const locations = {
  urban: ['Rome - Palatin', 'Rome - Forum', 'Rome - Aventin', 'Rome - Subure', 'Rome - Champ de Mars', 'Rome - Via Sacra', 'Ostie', 'Capoue'],
  rural: ['Latium', 'Campanie', 'Étrurie', 'Ombrie', 'Apulie', 'Sicile', 'Sardaigne'],
  religious: ['Rome - Forum', 'Rome - Capitole', 'Rome - Champ de Mars', 'Rome - Via Sacra', 'Latium', 'Campanie', 'Étrurie']
};

export const PropertyConstruction: React.FC = () => {
  const navigate = useNavigate();
  const { balance } = usePatrimoineManager();
  const { handleAddProperty } = useBuildingManagement();
  
  const [constructionType, setConstructionType] = useState('');
  const [constructionLocation, setConstructionLocation] = useState('');
  const [propertyName, setPropertyName] = useState('');
  const [propertySize, setPropertySize] = useState(100);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const selectedType = constructionTypes.find(type => type.id === constructionType);
  
  const calculateConstructionCost = () => {
    if (!selectedType) return 0;
    const sizeMultiplier = propertySize / 100;
    return Math.round(selectedType.basePrice * sizeMultiplier);
  };
  
  const calculateMaintenanceCost = () => {
    if (!selectedType) return 0;
    const sizeMultiplier = propertySize / 100;
    return Math.round(selectedType.maintenanceCost * sizeMultiplier);
  };
  
  const calculateConstructionTime = () => {
    if (!selectedType) return 0;
    const sizeMultiplier = propertySize / 100;
    return Math.round(selectedType.constructionTime * sizeMultiplier);
  };
  
  const canAfford = balance >= calculateConstructionCost();
  
  const locationOptions = selectedType 
    ? locations[selectedType.type as keyof typeof locations] || []
    : [];
  
  const handleStartConstruction = () => {
    if (!selectedType || !constructionLocation || !propertyName) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    
    if (!canAfford) {
      toast.error("Fonds insuffisants pour démarrer cette construction");
      return;
    }
    
    // Dans un système réel, on démarrerait un projet de construction qui serait terminé après un délai
    // Pour cette démonstration, on ajoute directement le bâtiment
    const success = handleAddProperty(
      constructionType,
      selectedType.type as "urban" | "rural" | "religious" | "public",
      constructionLocation,
      propertyName
    );
    
    if (success) {
      toast.success(`Construction de ${propertyName} démarrée avec succès!`);
      navigate('/patrimoine/proprietes');
    }
  };
  
  const getSizeLabel = (size: number) => {
    if (size < 80) return "Petit";
    if (size < 120) return "Moyen";
    if (size < 150) return "Grand";
    return "Très grand";
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-2 mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/patrimoine/proprietes')}
          className="flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Button>
        <h1 className="text-2xl font-bold font-cinzel">Construction de Propriété</h1>
      </div>
      
      <RomanCard>
        <RomanCard.Header>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><circle cx="8" cy="8" r="6"></circle><path d="M18.09 10.37A6 6 0 1 1 10.34 18" /><path d="M7 6h1v4" /><path d="m16.71 13.88.7.71-2.82 2.82" /></svg>
              <h2 className="text-lg font-semibold">Votre trésorerie</h2>
            </div>
            <span className="text-lg font-bold">{formatCurrency(balance)}</span>
          </div>
        </RomanCard.Header>
        <RomanCard.Content className="text-sm text-muted-foreground">
          <p>Pour construire une nouvelle propriété, vous devez disposer des fonds nécessaires et choisir son type, sa taille et son emplacement.</p>
        </RomanCard.Content>
      </RomanCard>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Détails de la propriété</CardTitle>
              <CardDescription>
                Définissez les caractéristiques de votre nouvelle propriété
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="constructionType">Type de construction</Label>
                <Select value={constructionType} onValueChange={(value) => {
                  setConstructionType(value);
                  setConstructionLocation('');
                }}>
                  <SelectTrigger id="constructionType">
                    <SelectValue placeholder="Sélectionnez un type de bâtiment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Choisir un type</SelectItem>
                    {constructionTypes.map(type => (
                      <SelectItem key={type.id} value={type.id}>
                        {type.name} - {type.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="propertyName">Nom de la propriété</Label>
                <Input 
                  id="propertyName" 
                  placeholder="Ex: Villa Julia sur l'Aventin" 
                  value={propertyName}
                  onChange={(e) => setPropertyName(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="constructionLocation">Emplacement</Label>
                <Select 
                  value={constructionLocation} 
                  onValueChange={setConstructionLocation}
                  disabled={!selectedType}
                >
                  <SelectTrigger id="constructionLocation">
                    <SelectValue placeholder={selectedType ? "Sélectionnez un emplacement" : "Choisissez d'abord un type"} />
                  </SelectTrigger>
                  <SelectContent>
                    {locationOptions.map(location => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label htmlFor="propertySize">Taille de la propriété</Label>
                  <Badge variant="outline">{getSizeLabel(propertySize)}</Badge>
                </div>
                <Slider
                  id="propertySize"
                  min={50}
                  max={200}
                  step={5}
                  value={[propertySize]}
                  onValueChange={(value) => setPropertySize(value[0])}
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Petit</span>
                  <span>Moyen</span>
                  <span>Grand</span>
                  <span>Très grand</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Notes de construction</CardTitle>
              <CardDescription>
                Ajoutez des détails supplémentaires pour les architectes (optionnel)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Ex: Orientation vers l'est, péristyle central avec fontaine, vue sur le forum..."
                className="resize-none"
                rows={4}
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Résumé du projet</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedType ? (
                <>
                  <div className="flex items-center gap-2">
                    {selectedType.type === 'urban' ? <Home className="h-5 w-5" /> : 
                     selectedType.type === 'rural' ? <MapPin className="h-5 w-5" /> : 
                     <Landmark className="h-5 w-5" />}
                    <span className="font-medium">{selectedType.name}</span>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Description</p>
                    <p>{selectedType.description}</p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Coût estimé</p>
                    <p className={`text-lg font-bold ${!canAfford ? 'text-red-600' : ''}`}>
                      {formatCurrency(calculateConstructionCost())}
                    </p>
                    {!canAfford && (
                      <p className="text-red-500 text-sm">Fonds insuffisants</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 py-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Entretien annuel</p>
                      <p className="font-medium">{formatCurrency(calculateMaintenanceCost())}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Prestige</p>
                      <p className="font-medium">+{selectedType.prestige}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Temps de construction</span>
                      </div>
                      <span>{calculateConstructionTime()} saisons</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  
                  {propertyName && constructionLocation ? (
                    <div className="space-y-1 p-3 bg-muted/20 rounded-md">
                      <p className="font-medium">{propertyName}</p>
                      <p className="text-sm">{constructionLocation}</p>
                      <p className="text-sm text-muted-foreground">
                        Taille: {getSizeLabel(propertySize)} ({propertySize}%)
                      </p>
                    </div>
                  ) : (
                    <Alert variant="default" className="bg-amber-50 text-amber-800 border-amber-200">
                      <AlertDescription>
                        Veuillez compléter le nom et l'emplacement de la propriété.
                      </AlertDescription>
                    </Alert>
                  )}
                </>
              ) : (
                <div className="py-8 text-center">
                  <Building2 className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Sélectionnez un type de construction pour voir les détails
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <div className="w-full grid gap-2">
                <Button
                  onClick={handleStartConstruction}
                  disabled={!selectedType || !propertyName || !constructionLocation || !canAfford}
                  className="w-full"
                >
                  Démarrer la construction
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/patrimoine/proprietes')} 
                  className="w-full"
                >
                  Annuler
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};
