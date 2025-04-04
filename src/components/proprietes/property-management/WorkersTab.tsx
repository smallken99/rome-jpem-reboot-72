
import React, { useState } from 'react';
import { OwnedBuilding } from '@/components/proprietes/types/property';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Users, UserCircle } from 'lucide-react';
import { toast } from 'sonner';

export interface WorkersTabProps {
  building: OwnedBuilding;
  updateWorkers: (count: number) => void;
}

export const WorkersTab: React.FC<WorkersTabProps> = ({ building, updateWorkers }) => {
  const [workersCount, setWorkersCount] = useState(building.workers || 0);
  const [slavesCount, setSlavesCount] = useState(building.slaves || 0);
  
  const maxWorkers = building.maxWorkers || 10;
  
  const handleWorkerUpdate = () => {
    updateWorkers(workersCount);
    toast.success(`Personnel mis à jour pour ${building.name}`);
  };
  
  const calculateEfficiency = () => {
    const workersEfficiency = (workersCount / maxWorkers) * 0.7; // 70% de l'efficacité max
    const slavesEfficiency = (slavesCount / 10) * 0.3; // 30% de l'efficacité max
    
    return Math.min(100, Math.round((workersEfficiency + slavesEfficiency) * 100));
  };
  
  const efficiency = calculateEfficiency();
  
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Users className="h-5 w-5" />
          Gestion du personnel
        </h3>
        
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Travailleurs libres</h4>
              <span className="font-semibold">{workersCount} / {maxWorkers}</span>
            </div>
            
            <Slider
              value={[workersCount]}
              min={0}
              max={maxWorkers}
              step={1}
              onValueChange={(values) => setWorkersCount(values[0])}
              className="my-4"
            />
            
            <p className="text-sm text-muted-foreground">
              Les travailleurs libres sont rémunérés régulièrement mais sont plus efficaces que les esclaves.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Esclaves assignés</h4>
              <span className="font-semibold">{slavesCount} / {maxWorkers}</span>
            </div>
            
            <Slider
              value={[slavesCount]}
              min={0}
              max={Math.min(20, maxWorkers * 2)}
              step={1}
              onValueChange={(values) => setSlavesCount(values[0])}
              className="my-4"
            />
            
            <p className="text-sm text-muted-foreground">
              Les esclaves nécessitent moins d'entretien mais sont moins efficaces.
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Efficacité de la main d'œuvre</h4>
              <span className="font-semibold text-green-600">{efficiency}%</span>
            </div>
            
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${efficiency > 80 ? 'bg-green-500' : efficiency > 50 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                style={{ width: `${efficiency}%` }}
              ></div>
            </div>
            
            <p className="text-sm text-muted-foreground">
              L'efficacité influence directement les revenus et la qualité d'entretien de la propriété.
            </p>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <Button onClick={handleWorkerUpdate}>
            Mettre à jour le personnel
          </Button>
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <UserCircle className="h-5 w-5" />
          Personnel spécialisé
        </h3>
        
        <p className="text-muted-foreground mb-4">
          Aucun personnel spécialisé n'est assigné à cette propriété. Vous pouvez recruter des spécialistes pour améliorer les performances de cette propriété.
        </p>
        
        <Button variant="outline">
          Recruter un spécialiste
        </Button>
      </Card>
    </div>
  );
};
