
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { InfoIcon, Banknote, Settings, HistoryIcon, ArrowUpRight, Wrench } from 'lucide-react';
import UpgradeList from '../UpgradeList';
import { Property, Building } from '@/types/proprietes';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

// Create placeholder components for the missing imports
const BuildingStats: React.FC<{ building: Building }> = ({ building }) => (
  <div>
    <h3 className="text-lg font-medium mb-4">Building Stats</h3>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label>Type</Label>
        <p className="text-sm">{building.type}</p>
      </div>
      <div>
        <Label>Value</Label>
        <p className="text-sm">{building.value} as</p>
      </div>
      <div>
        <Label>Maintenance</Label>
        <p className="text-sm">{building.maintenance} as/year</p>
      </div>
      <div>
        <Label>Condition</Label>
        <p className="text-sm">{building.condition}%</p>
      </div>
    </div>
  </div>
);

const BuildingHistory: React.FC<{ building: Building }> = ({ building }) => (
  <div>
    <h3 className="text-lg font-medium mb-4">Building History</h3>
    <p className="text-sm text-muted-foreground">
      Historical events and logs related to this building will appear here.
    </p>
  </div>
);

interface BuildingDetailsModalProps {
  building: Building;
  isOpen: boolean;
  onClose: () => void;
  onUpgradeInstall: (buildingId: string, upgradeId: string) => void;
}

const BuildingDetailsModal: React.FC<BuildingDetailsModalProps> = ({
  building,
  isOpen,
  onClose,
  onUpgradeInstall
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();

  const handleUpgradeInstall = (upgradeId: string) => {
    onUpgradeInstall(building.id, upgradeId);
    toast({
      title: 'Upgrade installed',
      description: 'The upgrade has been successfully installed.',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{building.name}</DialogTitle>
          <div className="flex items-center space-x-2 mt-1">
            <Badge variant="outline" className="capitalize">{building.type}</Badge>
            <Badge variant="outline" className={cn(
              "capitalize",
              building.condition > 75 ? "bg-green-50 text-green-700 border-green-200" :
              building.condition > 50 ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
              "bg-red-50 text-red-700 border-red-200"
            )}>
              {building.condition}% condition
            </Badge>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="upgrades">Upgrades</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <BuildingStats building={building} />
          </TabsContent>

          <TabsContent value="upgrades">
            {building.upgrades && building.upgrades.length > 0 ? (
              <UpgradeList
                upgrades={building.upgrades}
                onInstall={handleUpgradeInstall}
                propertyValue={building.value}
                propertyCondition={building.condition}
                installedUpgrades={building.upgrades.filter(u => u.installed).map(u => u.id)}
              />
            ) : (
              <p className="text-muted-foreground text-center p-6">
                No upgrades available for this property.
              </p>
            )}
          </TabsContent>

          <TabsContent value="history">
            <BuildingHistory building={building} />
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BuildingDetailsModal;
