import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building, 
  PropertyUpgrade 
} from '@/types/proprietes';
import { Card, CardContent } from '@/components/ui/card';
import { 
  HomeIcon, 
  HistoryIcon, 
  UpgradeIcon, 
  CogIcon, 
  CoinsIcon 
} from 'lucide-react';
import UpgradeList from "../UpgradeList";
import BuildingStats from '../BuildingStats';
import BuildingHistory from '../BuildingHistory';

interface BuildingDetailsModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  building: Building;
}

const BuildingDetailsModal: React.FC<BuildingDetailsModalProps> = ({ isOpen, onOpenChange, building }) => {
  const [activeTab, setActiveTab] = useState('stats');
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HomeIcon className="h-5 w-5 mr-2" />
            {building.name}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="stats">
              <CogIcon className="h-4 w-4 mr-1" />
              Statistiques
            </TabsTrigger>
            <TabsTrigger value="history">
              <HistoryIcon className="h-4 w-4 mr-1" />
              Historique
            </TabsTrigger>
            <TabsTrigger value="upgrades">
              <UpgradeIcon className="h-4 w-4 mr-1" />
              Améliorations
            </TabsTrigger>
            <TabsTrigger value="finances">
              <CoinsIcon className="h-4 w-4 mr-1" />
              Finances
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="stats">
            <Card>
              <CardContent>
                <BuildingStats building={building} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardContent>
                <BuildingHistory building={building} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="upgrades">
            <Card>
              <CardContent>
                <UpgradeList 
                  upgrades={[]}
                  onInstall={() => {}}
                  propertyValue={building.value}
                  propertyCondition={building.condition}
                  installedUpgrades={[]}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="finances">
            <Card>
              <CardContent>
                {/* Finances Content */}
                <p>Contenu des finances</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fermer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BuildingDetailsModal;
