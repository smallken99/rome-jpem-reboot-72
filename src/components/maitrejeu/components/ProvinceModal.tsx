
import React, { useState, useEffect } from 'react';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Province, SenateurJouable } from '../types/maitreJeuTypes';
import { Badge } from '@/components/ui/badge';

interface ProvinceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  province: Province | null;
  senateurs: SenateurJouable[];
  onSave: (province: Province) => void;
}

export const ProvinceModal: React.FC<ProvinceModalProps> = ({
  open,
  onOpenChange,
  province,
  senateurs,
  onSave
}) => {
  const [editedProvince, setEditedProvince] = useState<Province | null>(null);
  
  useEffect(() => {
    if (province) {
      setEditedProvince({ ...province });
    }
  }, [province]);
  
  if (!editedProvince) return null;
  
  const handleSave = () => {
    onSave(editedProvince);
    onOpenChange(false);
  };
  
  const handleStatutChange = (value: string) => {
    setEditedProvince({
      ...editedProvince,
      statut: value as 'pacifiée' | 'instable' | 'en révolte' | 'en guerre'
    });
  };
  
  const handleGouverneurChange = (value: string) => {
    setEditedProvince({
      ...editedProvince,
      gouverneur: value === 'null' ? null : value
    });
  };
  
  const handleInputChange = (field: keyof Province, value: any) => {
    setEditedProvince({
      ...editedProvince,
      [field]: value
    });
  };
  
  const eligibleSenators = senateurs.filter(s => 
    s.statut === 'actif' && (!s.fonctionActuelle || s.fonctionActuelle === 'Gouverneur')
  );
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Gestion de la Province: {editedProvince.nom}</DialogTitle>
          <DialogDescription>
            Gérez les détails et l'administration de cette province
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="details">Détails</TabsTrigger>
            <TabsTrigger value="military">Forces militaires</TabsTrigger>
            <TabsTrigger value="economy">Économie</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nom de la province</label>
                <Input 
                  value={editedProvince.nom}
                  onChange={(e) => handleInputChange('nom', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Région</label>
                <Input 
                  value={editedProvince.region}
                  onChange={(e) => handleInputChange('region', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Statut</label>
                <Select 
                  value={editedProvince.statut} 
                  onValueChange={handleStatutChange}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pacifiée">Pacifiée</SelectItem>
                    <SelectItem value="instable">Instable</SelectItem>
                    <SelectItem value="en révolte">En révolte</SelectItem>
                    <SelectItem value="en guerre">En guerre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Gouverneur</label>
                <Select 
                  value={editedProvince.gouverneur || 'null'} 
                  onValueChange={handleGouverneurChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Aucun gouverneur" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="null">Aucun gouverneur</SelectItem>
                    {eligibleSenators.map(senator => (
                      <SelectItem key={senator.id} value={senator.nom}>
                        {senator.nom}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Population</label>
                <Input 
                  type="number"
                  value={editedProvince.population}
                  onChange={(e) => handleInputChange('population', parseInt(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Loyauté</label>
                <Input 
                  type="number"
                  min="0"
                  max="100"
                  value={editedProvince.loyauté}
                  onChange={(e) => handleInputChange('loyauté', parseInt(e.target.value))}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Ressources principales</label>
              <div className="flex flex-wrap gap-2">
                {editedProvince.ressourcesPrincipales.map((ressource, index) => (
                  <Badge key={index}>
                    {ressource}
                    <button
                      className="ml-1 text-xs"
                      onClick={() => {
                        const newResources = [...editedProvince.ressourcesPrincipales];
                        newResources.splice(index, 1);
                        handleInputChange('ressourcesPrincipales', newResources);
                      }}
                    >
                      ×
                    </button>
                  </Badge>
                ))}
                <Input 
                  placeholder="Ajouter une ressource..."
                  className="w-40"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value) {
                      handleInputChange('ressourcesPrincipales', [
                        ...editedProvince.ressourcesPrincipales,
                        e.currentTarget.value
                      ]);
                      e.currentTarget.value = '';
                    }
                  }}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="military" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Légions</label>
                <Input 
                  type="number"
                  min="0"
                  value={editedProvince.légions}
                  onChange={(e) => handleInputChange('légions', parseInt(e.target.value))}
                />
                <p className="text-xs text-muted-foreground">Une légion représente environ 5,000 soldats</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Garnison</label>
                <Input 
                  type="number"
                  min="0"
                  value={editedProvince.garnison}
                  onChange={(e) => handleInputChange('garnison', parseInt(e.target.value))}
                />
                <p className="text-xs text-muted-foreground">Forces auxiliaires et de maintien de l'ordre</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Problèmes</label>
              <div className="flex flex-wrap gap-2">
                {editedProvince.problèmes.map((probleme, index) => (
                  <Badge key={index} variant="destructive">
                    {probleme}
                    <button
                      className="ml-1 text-xs"
                      onClick={() => {
                        const newProblems = [...editedProvince.problèmes];
                        newProblems.splice(index, 1);
                        handleInputChange('problèmes', newProblems);
                      }}
                    >
                      ×
                    </button>
                  </Badge>
                ))}
                <Input 
                  placeholder="Ajouter un problème..."
                  className="w-40"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value) {
                      handleInputChange('problèmes', [
                        ...editedProvince.problèmes,
                        e.currentTarget.value
                      ]);
                      e.currentTarget.value = '';
                    }
                  }}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="economy" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Richesse</label>
                <Input 
                  type="number"
                  min="0"
                  value={editedProvince.richesse}
                  onChange={(e) => handleInputChange('richesse', parseInt(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Revenu annuel</label>
                <Input 
                  type="number"
                  min="0"
                  value={editedProvince.revenuAnnuel}
                  onChange={(e) => handleInputChange('revenuAnnuel', parseInt(e.target.value))}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Impôts (taux en %)</label>
                <Input 
                  type="number"
                  min="0"
                  max="100"
                  value={editedProvince.impôts}
                  onChange={(e) => handleInputChange('impôts', parseInt(e.target.value))}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Opportunités</label>
              <div className="flex flex-wrap gap-2">
                {editedProvince.opportunités.map((opportunite, index) => (
                  <Badge key={index} variant="secondary">
                    {opportunite}
                    <button
                      className="ml-1 text-xs"
                      onClick={() => {
                        const newOpportunities = [...editedProvince.opportunités];
                        newOpportunities.splice(index, 1);
                        handleInputChange('opportunités', newOpportunities);
                      }}
                    >
                      ×
                    </button>
                  </Badge>
                ))}
                <Input 
                  placeholder="Ajouter une opportunité..."
                  className="w-40"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value) {
                      handleInputChange('opportunités', [
                        ...editedProvince.opportunités,
                        e.currentTarget.value
                      ]);
                      e.currentTarget.value = '';
                    }
                  }}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={handleSave}>
            Sauvegarder les modifications
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
