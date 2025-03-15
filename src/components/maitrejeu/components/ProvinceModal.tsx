
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Province, ProvinceModalProps } from '../types/provinces';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Coins, Flag, ShieldAlert, Anchor, Map } from 'lucide-react';

export const ProvinceModal: React.FC<ProvinceModalProps> = ({
  isOpen,
  province,
  onClose,
  onSave
}) => {
  const [activeTab, setActiveTab] = useState('general');
  const [editedProvince, setEditedProvince] = useState<Province | null>(province);
  
  if (!editedProvince) return null;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProvince(prev => {
      if (!prev) return null;
      return { ...prev, [name]: value };
    });
  };
  
  const handleNumberChange = (name: string, value: number) => {
    setEditedProvince(prev => {
      if (!prev) return null;
      return { ...prev, [name]: value };
    });
  };
  
  const handleSliderChange = (name: string, value: number[]) => {
    setEditedProvince(prev => {
      if (!prev) return null;
      return { ...prev, [name]: value[0] };
    });
  };
  
  const handleSave = () => {
    if (onSave && editedProvince) {
      onSave(editedProvince);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {editedProvince.nom}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="general">Général</TabsTrigger>
            <TabsTrigger value="military">Militaire</TabsTrigger>
            <TabsTrigger value="economy">Économie</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nom">Nom de la province</Label>
                <Input 
                  id="nom" 
                  name="nom" 
                  value={editedProvince.nom} 
                  onChange={handleInputChange} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="région">Région</Label>
                <Input 
                  id="région" 
                  name="région" 
                  value={editedProvince.région} 
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gouverneur">Gouverneur</Label>
                <Input 
                  id="gouverneur" 
                  name="gouverneur" 
                  value={editedProvince.gouverneur} 
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Statut</Label>
                <Input 
                  id="status" 
                  name="status" 
                  value={editedProvince.status} 
                  onChange={handleInputChange}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                value={editedProvince.description} 
                onChange={handleInputChange}
                rows={3}
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label>Loyauté ({editedProvince.loyauté}%)</Label>
                <div className="text-sm text-muted-foreground">
                  Variation: {editedProvince.loyautéVariation || editedProvince.variationLoyauté || 0}%
                </div>
              </div>
              <Slider 
                min={0} 
                max={100} 
                step={1}
                value={[editedProvince.loyauté]} 
                onValueChange={(values) => handleSliderChange('loyauté', values)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="population">Population</Label>
              <Input 
                id="population" 
                name="population" 
                type="number" 
                value={editedProvince.population} 
                onChange={(e) => handleNumberChange('population', Number(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dernierEvenement">Dernier événement</Label>
              <Input 
                id="dernierEvenement" 
                name="dernierEvenement" 
                value={editedProvince.dernierEvenement || editedProvince.dernierEvénement || ''} 
                onChange={handleInputChange}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="military" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5" />
                  Forces militaires
                </CardTitle>
                <CardDescription>
                  Troupes stationnées dans la province
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="légions">Légions</Label>
                  <Input 
                    id="légions" 
                    name="armée.légions" 
                    type="number" 
                    value={editedProvince.armée?.légions || 0} 
                    onChange={(e) => {
                      const newProvince = { ...editedProvince };
                      if (!newProvince.armée) newProvince.armée = { légions: 0, auxiliaires: 0, navires: 0 };
                      newProvince.armée.légions = Number(e.target.value);
                      setEditedProvince(newProvince);
                    }}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="auxiliaires">Auxiliaires</Label>
                  <Input 
                    id="auxiliaires" 
                    name="armée.auxiliaires" 
                    type="number" 
                    value={editedProvince.armée?.auxiliaires || 0} 
                    onChange={(e) => {
                      const newProvince = { ...editedProvince };
                      if (!newProvince.armée) newProvince.armée = { légions: 0, auxiliaires: 0, navires: 0 };
                      newProvince.armée.auxiliaires = Number(e.target.value);
                      setEditedProvince(newProvince);
                    }}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="navires">Navires</Label>
                  <Input 
                    id="navires" 
                    name="armée.navires" 
                    type="number" 
                    value={editedProvince.armée?.navires || 0} 
                    onChange={(e) => {
                      const newProvince = { ...editedProvince };
                      if (!newProvince.armée) newProvince.armée = { légions: 0, auxiliaires: 0, navires: 0 };
                      newProvince.armée.navires = Number(e.target.value);
                      setEditedProvince(newProvince);
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="economy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coins className="h-5 w-5" />
                  Économie
                </CardTitle>
                <CardDescription>
                  Ressources et revenus de la province
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="richesse">Richesse</Label>
                  <Slider 
                    min={0} 
                    max={100} 
                    step={1}
                    value={[editedProvince.richesse]} 
                    onValueChange={(values) => handleSliderChange('richesse', values)}
                  />
                  <div className="flex justify-between text-xs">
                    <span>Pauvre</span>
                    <span>Moyenne</span>
                    <span>Riche</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="impôts">Impôts (en As)</Label>
                  <Input 
                    id="impôts" 
                    name="impôts" 
                    type="number" 
                    value={editedProvince.impôts} 
                    onChange={(e) => handleNumberChange('impôts', Number(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ressources">Ressources (séparées par des virgules)</Label>
                  <Input 
                    id="ressources" 
                    name="ressources" 
                    value={editedProvince.ressources?.join(', ') || ''} 
                    onChange={(e) => {
                      const ressources = e.target.value.split(',').map(r => r.trim()).filter(Boolean);
                      setEditedProvince(prev => prev ? { ...prev, ressources } : null);
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <DialogFooter className="flex justify-between mt-4">
          <Button variant="outline" onClick={onClose}>Annuler</Button>
          <Button onClick={handleSave}>Sauvegarder les modifications</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
