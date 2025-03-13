import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  MembreFamille,
  FamilleInfo,
  FamilleAlliance
} from '../../types/familles';
import { useMaitreJeu } from '../../context';
import { Checkbox } from '@/components/ui/checkbox';

interface AllianceModalProps {
  isOpen: boolean;
  onClose: () => void;
  familles: FamilleInfo[];
  membres: MembreFamille[];
  initialFamilleId: string | null;
  alliance?: FamilleAlliance;
  onSave?: (data: any) => void;
}

export const AllianceModal: React.FC<AllianceModalProps> = ({
  isOpen,
  onClose,
  familles,
  membres,
  initialFamilleId,
  alliance,
  onSave
}) => {
  const { createAlliance, updateAlliance } = useMaitreJeu();

  const [formData, setFormData] = useState<{
    famille1Id: string;
    famille2Id: string;
    type: FamilleAlliance['type'];
    termes: string;
    membresIds: string[];
    benefices: string[];
  }>({
    famille1Id: initialFamilleId || '',
    famille2Id: '',
    type: 'politique',
    termes: '',
    membresIds: [],
    benefices: []
  });

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      if (alliance) {
        // Initialize with existing alliance data if editing
        setFormData({
          famille1Id: alliance.famille1Id,
          famille2Id: alliance.famille2Id,
          type: alliance.type,
          termes: alliance.termes,
          membresIds: alliance.membres || [],
          benefices: alliance.benefices || [],
        });
      } else {
        // Initialize with default values for new alliance
        setFormData({
          famille1Id: initialFamilleId || '',
          famille2Id: '',
          type: 'politique',
          termes: '',
          membresIds: [],
          benefices: []
        });
      }
    }
  }, [isOpen, initialFamilleId, alliance]);

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTermesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      termes: e.target.value,
    });
  };

  const toggleMembre = (membreId: string) => {
    setFormData(prev => {
      const membresIds = prev.membresIds.includes(membreId)
        ? prev.membresIds.filter(id => id !== membreId)
        : [...prev.membresIds, membreId];
      
      return {
        ...prev,
        membresIds
      };
    });
  };

  const toggleBenefice = (benefice: string) => {
    setFormData(prev => {
      const benefices = prev.benefices.includes(benefice)
        ? prev.benefices.filter(b => b !== benefice)
        : [...prev.benefices, benefice];
      
      return {
        ...prev,
        benefices
      };
    });
  };

  const handleSubmit = () => {
    if (alliance && onSave) {
      onSave(formData);
    } else if (alliance) {
      updateAlliance(alliance.id, formData);
    } else if (onSave) {
      onSave(formData);
    } else {
      createAlliance(
        formData.famille1Id,
        formData.famille2Id,
        formData.type,
        formData.termes,
        formData.benefices
      );
    }
    onClose();
  };

  // Filtre les membres des familles sélectionnées
  const filteredMembres = membres.filter(
    membre => membre.senateurId || // Tout sénateur
      (formData.famille1Id && formData.famille1Id === getMembreFamilleId(membre)) || // Ou membre de famille 1
      (formData.famille2Id && formData.famille2Id === getMembreFamilleId(membre))     // Ou membre de famille 2
  );

  function getMembreFamilleId(membre: MembreFamille) {
    for (const famille of familles) {
      if (famille.membres.includes(membre.id)) {
        return famille.id;
      }
    }
    return null;
  }

  // Liste de bénéfices possibles selon le type d'alliance
  const possibleBenefices = {
    politique: [
      'Votes favorables au Sénat',
      'Soutien aux candidatures aux magistratures',
      'Protection politique mutuelle',
      'Partage d\'informations politiques',
      'Influence sur les votes populaires'
    ],
    matrimoniale: [
      'Renforcement des relations entre familles',
      'Élargissement du réseau d\'influence',
      'Partage de ressources économiques',
      'Acquisition de terres',
      'Prestige social accru'
    ],
    commerciale: [
      'Accès exclusif à certains marchés',
      'Taux préférentiels sur les transactions',
      'Partage de ressources commerciales',
      'Accès à de nouveaux fournisseurs',
      'Réduction des coûts logistiques'
    ],
    militaire: [
      'Soutien militaire mutuel',
      'Accès à des technologies militaires',
      'Partage de renseignements',
      'Protection des territoires',
      'Collaboration dans les campagnes'
    ]
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Nouvelle Alliance</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="famille1">Famille 1</Label>
            <Select
              value={formData.famille1Id}
              onValueChange={(value) => handleSelectChange('famille1Id', value)}
            >
              <SelectTrigger id="famille1">
                <SelectValue placeholder="Sélectionner la première famille" />
              </SelectTrigger>
              <SelectContent>
                {familles.map(famille => (
                  <SelectItem key={famille.id} value={famille.id}>
                    {famille.nom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="famille2">Famille 2</Label>
            <Select
              value={formData.famille2Id}
              onValueChange={(value) => handleSelectChange('famille2Id', value)}
              disabled={!formData.famille1Id}
            >
              <SelectTrigger id="famille2">
                <SelectValue placeholder="Sélectionner la deuxième famille" />
              </SelectTrigger>
              <SelectContent>
                {familles
                  .filter(f => f.id !== formData.famille1Id)
                  .map(famille => (
                    <SelectItem key={famille.id} value={famille.id}>
                      {famille.nom}
                    </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Type d'alliance</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => handleSelectChange('type', value as FamilleAlliance['type'])}
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="Sélectionner le type d'alliance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="politique">Politique</SelectItem>
                <SelectItem value="matrimoniale">Matrimoniale</SelectItem>
                <SelectItem value="commerciale">Commerciale</SelectItem>
                <SelectItem value="militaire">Militaire</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-2 space-y-2">
            <Label htmlFor="termes">Termes de l'alliance</Label>
            <Textarea
              id="termes"
              value={formData.termes}
              onChange={handleTermesChange}
              placeholder="Décrivez les termes spécifiques de cette alliance..."
              rows={3}
            />
          </div>

          <div className="col-span-2 space-y-2">
            <Label>Membres impliqués</Label>
            <div className="border rounded-md p-3 max-h-36 overflow-y-auto grid grid-cols-2 gap-2">
              {filteredMembres.length > 0 ? (
                filteredMembres.map(membre => (
                  <div key={membre.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`membre-${membre.id}`}
                      checked={formData.membresIds.includes(membre.id)}
                      onCheckedChange={() => toggleMembre(membre.id)}
                    />
                    <label
                      htmlFor={`membre-${membre.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {membre.prenom} {membre.nom}
                    </label>
                  </div>
                ))
              ) : (
                <div className="col-span-2 text-center text-muted-foreground">
                  Sélectionnez d'abord les deux familles
                </div>
              )}
            </div>
          </div>

          <div className="col-span-2 space-y-2">
            <Label>Bénéfices de l'alliance</Label>
            <div className="border rounded-md p-3 max-h-36 overflow-y-auto">
              {formData.type && (
                possibleBenefices[formData.type].map(benefice => (
                  <div key={benefice} className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id={`benefice-${benefice}`}
                      checked={formData.benefices.includes(benefice)}
                      onCheckedChange={() => toggleBenefice(benefice)}
                    />
                    <label
                      htmlFor={`benefice-${benefice}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {benefice}
                    </label>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button 
            type="button" 
            onClick={handleSubmit}
            disabled={!formData.famille1Id || !formData.famille2Id || !formData.type || !formData.termes}
          >
            Créer l'alliance
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
