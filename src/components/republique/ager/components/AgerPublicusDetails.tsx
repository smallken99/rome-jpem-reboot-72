
import React, { useState } from 'react';
import { LandParcel, AgerPublicusOverseer } from '../types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, UserPlus, UsersRound, Leaf, CircleDollarSign, Warehouse, ShieldAlert } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAgerPublicus } from '../hooks/useAgerPublicus';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AgerPublicusDetailsProps {
  parcel: LandParcel;
  onClose: () => void;
}

export const AgerPublicusDetails: React.FC<AgerPublicusDetailsProps> = ({ parcel, onClose }) => {
  const { addOfficialToParcel, addSlavesToParcel, publicSlavePool, getAvailableOverseersForParcel } = useAgerPublicus();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddSlaveDialog, setShowAddSlaveDialog] = useState(false);
  const [slaveAmount, setSlaveAmount] = useState(5);
  const [showAddOfficialDialog, setShowAddOfficialDialog] = useState(false);
  const [officialType, setOfficialType] = useState<'magistrate' | 'overseer'>('overseer');
  
  // Récupérer les contremaîtres disponibles
  const availableOverseers = getAvailableOverseersForParcel(parcel.id);
  
  // Calculer l'efficacité du travail
  const workforceEfficiency = parcel.workforce?.efficiency || 0;
  
  // Obtenir la couleur de l'efficacité
  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 80) return 'bg-emerald-500';
    if (efficiency >= 60) return 'bg-green-500';
    if (efficiency >= 40) return 'bg-yellow-500';
    if (efficiency >= 20) return 'bg-orange-500';
    return 'bg-red-500';
  };
  
  // Fonction pour obtenir l'état de la parcelle
  const getStatusLabel = (status: LandParcel['status']) => {
    switch (status) {
      case 'allocated': return { label: 'Allouée', color: 'bg-blue-100 text-blue-800' };
      case 'available': return { label: 'Disponible', color: 'bg-green-100 text-green-800' };
      case 'disputed': return { label: 'Disputée', color: 'bg-orange-100 text-orange-800' };
      case 'protected': return { label: 'Protégée', color: 'bg-purple-100 text-purple-800' };
      default: return { label: 'Inconnue', color: 'bg-gray-100 text-gray-800' };
    }
  };
  
  // Gestion de l'ajout d'esclaves
  const handleAddSlaves = () => {
    if (slaveAmount > 0) {
      addSlavesToParcel(parcel.id, slaveAmount);
      setShowAddSlaveDialog(false);
    }
  };
  
  // Gestion de l'ajout de fonctionnaires
  const handleAddOfficial = () => {
    addOfficialToParcel(parcel.id, officialType, 1);
    setShowAddOfficialDialog(false);
  };
  
  const status = getStatusLabel(parcel.status);
  
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-cinzel">{parcel.name}</CardTitle>
            <CardDescription>{parcel.location} • {parcel.size} iugera</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant="outline" className={status.color}>{status.label}</Badge>
          {parcel.allocation && (
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              Famille {parcel.allocation.familyName}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="px-6">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="overview">Aperçu</TabsTrigger>
          <TabsTrigger value="workforce">Main d'œuvre</TabsTrigger>
          <TabsTrigger value="production">Production</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="pt-4 pb-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm">
              <Leaf className="h-4 w-4 text-green-600" />
              <span className="font-medium">Type:</span> 
              <span className="capitalize">
                {parcel.type === 'cultivable' ? 'Terres cultivables' : 
                 parcel.type === 'pastoral' ? 'Pâturages' :
                 parcel.type === 'forest' ? 'Forêt' :
                 parcel.type === 'wetland' ? 'Zones humides' :
                 parcel.type === 'rocky' ? 'Terrain rocheux' : 
                 parcel.type}
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <CircleDollarSign className="h-4 w-4 text-amber-600" />
              <span className="font-medium">Valeur estimée:</span> 
              <span>{parcel.value.toLocaleString()} as</span>
            </div>
            
            {parcel.allocation && (
              <div className="flex items-center gap-2 text-sm">
                <UsersRound className="h-4 w-4 text-blue-600" />
                <span className="font-medium">Allouée à:</span> 
                <span>Famille {parcel.allocation.familyName}</span>
                {parcel.allocation.since && (
                  <span className="text-muted-foreground text-xs">
                    (depuis {parcel.allocation.since})
                  </span>
                )}
              </div>
            )}
            
            <Separator />
            
            <div>
              <h4 className="font-medium mb-1">Ressources</h4>
              {parcel.resources ? (
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Fertilité</p>
                    <Progress value={parcel.resources.fertility ? parcel.resources.fertility * 10 : 0} className="h-2" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Eau</p>
                    <Progress value={parcel.resources.water ? parcel.resources.water * 10 : 0} className="h-2" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Minéraux</p>
                    <Progress value={parcel.resources.minerals ? parcel.resources.minerals * 10 : 0} className="h-2" />
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Aucune information disponible sur les ressources.</p>
              )}
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Description</h4>
              <p className="text-sm">{parcel.description || "Aucune description disponible."}</p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="workforce" className="pt-4 pb-6">
          <div className="space-y-4">
            <div className="flex justify-between">
              <h4 className="font-medium">Main d'œuvre assignée</h4>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={() => setShowAddOfficialDialog(true)}>
                  <UserPlus className="h-3.5 w-3.5 mr-1" />
                  Fonctionnaire
                </Button>
                <Button size="sm" variant="outline" onClick={() => setShowAddSlaveDialog(true)}>
                  <UsersRound className="h-3.5 w-3.5 mr-1" />
                  Esclaves
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="border rounded-md p-3">
                <div className="text-sm font-medium">Magistrats</div>
                <div className="text-2xl font-bold">{parcel.workforce?.magistrates || 0}</div>
              </div>
              <div className="border rounded-md p-3">
                <div className="text-sm font-medium">Contremaîtres</div>
                <div className="text-2xl font-bold">{parcel.workforce?.overseers || 0}</div>
              </div>
              <div className="border rounded-md p-3">
                <div className="text-sm font-medium">Esclaves</div>
                <div className="text-2xl font-bold">{parcel.workforce?.publicSlaves || 0}</div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <h4 className="font-medium">Efficacité du travail</h4>
                <span className="text-sm font-medium">{workforceEfficiency}%</span>
              </div>
              <Progress value={workforceEfficiency} className={`h-2 ${getEfficiencyColor(workforceEfficiency)}`} />
              <p className="text-xs text-muted-foreground mt-1">
                Main d'œuvre requise: {parcel.workforce?.requiredWorkforce || "N/A"}
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Contremaîtres assignés</h4>
              {availableOverseers.length > 0 ? (
                <div className="space-y-2">
                  {availableOverseers.map(overseer => (
                    <div key={overseer.id} className="border rounded-md p-3 text-sm flex justify-between items-center">
                      <div>
                        <p className="font-medium">{overseer.name}</p>
                        <p className="text-xs text-muted-foreground">{overseer.title}</p>
                      </div>
                      <Badge variant={overseer.assignedParcelId === parcel.id ? "default" : "outline"}>
                        {overseer.assignedParcelId === parcel.id ? "Assigné" : "Disponible"}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Aucun contremaître disponible.</p>
              )}
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Dépenses</h4>
              {parcel.expenses ? (
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Entretien:</span>
                    <span>{parcel.expenses.maintenance.toLocaleString()} as/an</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Salaires:</span>
                    <span>{parcel.expenses.salaries.toLocaleString()} as/an</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Fournitures:</span>
                    <span>{parcel.expenses.supplies.toLocaleString()} as/an</span>
                  </div>
                  <Separator className="my-1" />
                  <div className="flex justify-between text-sm font-medium">
                    <span>Total:</span>
                    <span>{(parcel.expenses.maintenance + parcel.expenses.salaries + parcel.expenses.supplies).toLocaleString()} as/an</span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Aucune information disponible sur les dépenses.</p>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="production" className="pt-4 pb-6">
          <div className="space-y-4">
            {parcel.production ? (
              <>
                <div className="flex items-start gap-2">
                  <Warehouse className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Production de {parcel.production.type}</h4>
                    <p className="text-2xl font-bold">{parcel.production.amount.toLocaleString()} {parcel.production.unit}</p>
                    <p className="text-sm text-muted-foreground">
                      Potentiel: {parcel.production.potentialYield?.toLocaleString() || "N/A"} {parcel.production.unit}
                      {parcel.production.potentialYield && (
                        <span className="ml-2">
                          ({Math.round((parcel.production.amount / parcel.production.potentialYield) * 100)}% du potentiel)
                        </span>
                      )}
                    </p>
                    {parcel.production.lastHarvest && (
                      <p className="text-sm text-muted-foreground">
                        Dernière récolte: {parcel.production.lastHarvest}
                      </p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-1">Rendement</h4>
                  <div className="flex items-center gap-2">
                    <Progress 
                      value={parcel.production.potentialYield 
                        ? (parcel.production.amount / parcel.production.potentialYield) * 100 
                        : 50} 
                      className="h-2 flex-1" 
                    />
                    <span className="text-sm">
                      {parcel.production.potentialYield 
                        ? Math.round((parcel.production.amount / parcel.production.potentialYield) * 100) 
                        : "?"}%
                    </span>
                  </div>
                </div>
                
                {parcel.workforce && (
                  <div>
                    <h4 className="font-medium mb-1">Impact de la main d'œuvre</h4>
                    <p className="text-sm">
                      Une efficacité de {parcel.workforce.efficiency}% de la main d'œuvre permet d'atteindre {" "}
                      {parcel.production.potentialYield 
                        ? Math.round((parcel.production.amount / parcel.production.potentialYield) * 100) 
                        : "?"}% 
                      du potentiel de production.
                    </p>
                    
                    {parcel.workforce.efficiency < 60 && (
                      <div className="flex items-center gap-2 mt-2 p-2 rounded-md bg-amber-50 text-amber-800 text-sm">
                        <ShieldAlert className="h-4 w-4" />
                        <p>
                          Ajouter plus de main d'œuvre pourrait augmenter significativement la production.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              <p className="text-muted-foreground">Aucune information disponible sur la production.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      <CardFooter className="flex justify-between pt-0">
        <Button variant="outline" onClick={onClose}>
          Fermer
        </Button>
        <Button>
          Éditer
        </Button>
      </CardFooter>
      
      {/* Dialog pour ajouter des esclaves */}
      <Dialog open={showAddSlaveDialog} onOpenChange={setShowAddSlaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter des esclaves publics</DialogTitle>
            <DialogDescription>
              Assignez des esclaves publics à cette parcelle pour améliorer sa productivité.
              {publicSlavePool > 0 ? (
                <span className="block mt-1 text-green-600">
                  {publicSlavePool} esclave{publicSlavePool > 1 ? 's' : ''} disponible{publicSlavePool > 1 ? 's' : ''}
                </span>
              ) : (
                <span className="block mt-1 text-red-600">
                  Aucun esclave disponible. Achetez-en de nouveaux auprès du Questeur.
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Label htmlFor="slave-amount" className="mb-2 block">
              Nombre d'esclaves à assigner
            </Label>
            <Input 
              id="slave-amount"
              type="number"
              value={slaveAmount}
              onChange={(e) => setSlaveAmount(Math.min(publicSlavePool, Math.max(1, parseInt(e.target.value) || 0)))}
              min={1}
              max={publicSlavePool}
              disabled={publicSlavePool <= 0}
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddSlaveDialog(false)}>
              Annuler
            </Button>
            <Button onClick={handleAddSlaves} disabled={publicSlavePool <= 0 || slaveAmount <= 0}>
              Assigner
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialog pour ajouter des fonctionnaires */}
      <Dialog open={showAddOfficialDialog} onOpenChange={setShowAddOfficialDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter un fonctionnaire</DialogTitle>
            <DialogDescription>
              Assignez un magistrat ou un contremaître à cette parcelle pour améliorer sa supervision.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Label htmlFor="official-type" className="mb-2 block">
              Type de fonctionnaire
            </Label>
            <Select value={officialType} onValueChange={(val) => setOfficialType(val as 'magistrate' | 'overseer')}>
              <SelectTrigger id="official-type">
                <SelectValue placeholder="Type de fonctionnaire" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="magistrate">Magistrat</SelectItem>
                <SelectItem value="overseer">Contremaître</SelectItem>
              </SelectContent>
            </Select>
            
            <p className="text-xs text-muted-foreground mt-2">
              {officialType === 'magistrate' 
                ? "Les magistrats supervisent les aspects administratifs et légaux de la parcelle." 
                : "Les contremaîtres gèrent directement la main d'œuvre et la production quotidienne."}
            </p>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddOfficialDialog(false)}>
              Annuler
            </Button>
            <Button onClick={handleAddOfficial}>
              Assigner
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
