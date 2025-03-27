import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Building, Property, PropertyUpgrade } from '@/types/proprietes';
import { UpgradeList } from '../UpgradeList';
import { useToast } from '@/components/ui/use-toast';
import { useProperties } from '../../hooks/useProperties';

interface BuildingDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  building: Building | null;
}

export const BuildingDetailsModal: React.FC<BuildingDetailsModalProps> = ({
  isOpen,
  onClose,
  building,
}) => {
  const { toast } = useToast();
  const { installUpgrade } = useProperties();
  const [selectedUpgrade, setSelectedUpgrade] = useState<PropertyUpgrade | null>(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedUpgrade(null);
    }
  }, [isOpen]);

  if (!building) {
    return null;
  }

  const stats = {
    totalIncome: 0,
    totalMaintenance: 0,
    totalValue: 0
  };

  const handleInstallUpgrade = (property: Property, upgradeId: string) => {
    installUpgrade(property.id, upgradeId);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{building.name}</DialogTitle>
          <DialogDescription>
            Détails et améliorations du bâtiment
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Informations</h3>
            <p>Type: {building.type}</p>
            <p>Localisation: {building.location}</p>
            <p>Valeur: {building.value}</p>
            <p>Maintenance: {building.maintenance}</p>
            <p>Condition: {building.condition}</p>
            {building.workers && <p>Travailleurs: {building.workers}</p>}
            {building.securityLevel && <p>Niveau de sécurité: {building.securityLevel}</p>}
            {building.maintenanceLevel && <p>Niveau de maintenance: {building.maintenanceLevel}</p>}
            {building.status && <p>Statut: {building.status}</p>}
            {building.income && <p>Revenu: {building.income}</p>}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Améliorations</h3>
            <UpgradeList
              upgrades={building.upgrades || []}
              onSelectUpgrade={setSelectedUpgrade}
              selectedUpgrade={selectedUpgrade}
            />
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onClose}>
            Fermer
          </Button>
          {selectedUpgrade && (
            <Button onClick={() => {
              if (building) {
                handleInstallUpgrade(building, selectedUpgrade.id);
                toast({
                  title: "Amélioration installée",
                  description: "L'amélioration a été installée avec succès.",
                });
                onClose();
              }
            }}>
              Installer Amélioration
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
