import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"

export const MaintenanceTab: React.FC = () => {
  const [maintenanceStatus, setMaintenanceStatus] = useState(50);
  
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="maintenance">État de maintenance</Label>
        <Slider
          id="maintenance"
          defaultValue={[maintenanceStatus]}
          max={100}
          step={1}
          onValueChange={(value) => setMaintenanceStatus(value[0])}
          className="mt-2"
        />
      </div>
      
      <Progress 
        value={maintenanceStatus} 
        className="h-2" 
        // Utiliser la classe directement sur l'indicateur via CSS
        style={{
          '--progress-background': maintenanceStatus < 30 ? 'red' : 
                             maintenanceStatus < 60 ? 'orange' : 
                             'green'
        } as React.CSSProperties}
      />
      
      <p className="text-sm text-muted-foreground">
        Ajustez l'état de maintenance de vos propriétés. Un entretien régulier assure des revenus stables et évite les problèmes.
      </p>
    </div>
  );
};
