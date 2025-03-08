
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Cpu, HardDrive, Clock } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { formatUptime } from '@/utils/formatUtils';

export const SystemStatusCard: React.FC = () => {
  const { stats } = useAdmin();
  
  // Vérifie si les statistiques sont disponibles
  if (!stats || !stats.serverStats) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-lg">État du Système</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm italic">Chargement des statistiques...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const { cpuUsage, memoryUsage, diskUsage, uptime } = stats.serverStats;
  
  const getStatusColor = (value: number) => {
    if (value > 90) return "text-red-500";
    if (value > 70) return "text-amber-500";
    return "text-green-500";
  };
  
  const getStatusClass = (value: number) => {
    if (value > 90) return "bg-red-500";
    if (value > 70) return "bg-amber-500";
    return "bg-green-500";
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">État du Système</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* CPU Usage */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">CPU</span>
              </div>
              <span className={`text-sm font-medium ${getStatusColor(cpuUsage)}`}>
                {cpuUsage.toFixed(1)}%
              </span>
            </div>
            <Progress 
              value={cpuUsage} 
              className="h-2 bg-muted"
              style={{ 
                '--progress-indicator-color': getStatusClass(cpuUsage).replace('bg-', '')
              } as React.CSSProperties}
            />
          </div>

          {/* Memory Usage */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <HardDrive className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Mémoire</span>
              </div>
              <span className={`text-sm font-medium ${getStatusColor(memoryUsage)}`}>
                {memoryUsage.toFixed(1)}%
              </span>
            </div>
            <Progress 
              value={memoryUsage} 
              className="h-2 bg-muted"
              style={{ 
                '--progress-indicator-color': getStatusClass(memoryUsage).replace('bg-', '')
              } as React.CSSProperties}
            />
          </div>

          {/* Disk Usage */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <HardDrive className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Disque</span>
              </div>
              <span className={`text-sm font-medium ${getStatusColor(diskUsage)}`}>
                {diskUsage.toFixed(1)}%
              </span>
            </div>
            <Progress 
              value={diskUsage} 
              className="h-2 bg-muted"
              style={{ 
                '--progress-indicator-color': getStatusClass(diskUsage).replace('bg-', '')
              } as React.CSSProperties}
            />
          </div>

          {/* Uptime */}
          <div className="flex justify-between items-center pt-2 border-t">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Temps de fonctionnement</span>
            </div>
            <span className="text-sm font-medium">
              {formatUptime(uptime)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
