
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Check, AlertTriangle, AlertCircle } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export const SystemStatusCard: React.FC = () => {
  const { stats } = useAdmin();
  
  if (!stats) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>État du Système</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Chargement des données...</p>
        </CardContent>
      </Card>
    );
  }
  
  const getCpuStatus = (usage: number) => {
    if (usage < 50) return { icon: <Check className="h-4 w-4 text-green-500" />, text: 'Normal', color: 'bg-green-500' };
    if (usage < 80) return { icon: <AlertTriangle className="h-4 w-4 text-amber-500" />, text: 'Élevé', color: 'bg-amber-500' };
    return { icon: <AlertCircle className="h-4 w-4 text-red-500" />, text: 'Critique', color: 'bg-red-500' };
  };
  
  const getMemoryStatus = (usage: number) => {
    if (usage < 60) return { icon: <Check className="h-4 w-4 text-green-500" />, text: 'Normal', color: 'bg-green-500' };
    if (usage < 85) return { icon: <AlertTriangle className="h-4 w-4 text-amber-500" />, text: 'Élevé', color: 'bg-amber-500' };
    return { icon: <AlertCircle className="h-4 w-4 text-red-500" />, text: 'Critique', color: 'bg-red-500' };
  };
  
  const getDiskStatus = (usage: number) => {
    if (usage < 70) return { icon: <Check className="h-4 w-4 text-green-500" />, text: 'Normal', color: 'bg-green-500' };
    if (usage < 90) return { icon: <AlertTriangle className="h-4 w-4 text-amber-500" />, text: 'Attention', color: 'bg-amber-500' };
    return { icon: <AlertCircle className="h-4 w-4 text-red-500" />, text: 'Critique', color: 'bg-red-500' };
  };
  
  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / (24 * 3600));
    const hours = Math.floor((seconds % (24 * 3600)) / 3600);
    return `${days}j ${hours}h`;
  };
  
  const cpuStatus = getCpuStatus(stats.serverStats.cpuUsage);
  const memoryStatus = getMemoryStatus(stats.serverStats.memoryUsage);
  const diskStatus = getDiskStatus(stats.serverStats.diskUsage);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>État du Système</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="flex items-center">
              <span className="text-sm font-medium">CPU</span>
            </div>
            <div className="flex items-center gap-2">
              {cpuStatus.icon}
              <span className="text-xs">{cpuStatus.text}</span>
            </div>
          </div>
          <Progress value={stats.serverStats.cpuUsage} className="h-2" indicatorClassName={cpuStatus.color} />
          <p className="text-xs text-muted-foreground text-right">
            {stats.serverStats.cpuUsage.toFixed(1)}%
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="flex items-center">
              <span className="text-sm font-medium">Mémoire</span>
            </div>
            <div className="flex items-center gap-2">
              {memoryStatus.icon}
              <span className="text-xs">{memoryStatus.text}</span>
            </div>
          </div>
          <Progress value={stats.serverStats.memoryUsage} className="h-2" indicatorClassName={memoryStatus.color} />
          <p className="text-xs text-muted-foreground text-right">
            {stats.serverStats.memoryUsage.toFixed(1)}%
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="flex items-center">
              <span className="text-sm font-medium">Stockage</span>
            </div>
            <div className="flex items-center gap-2">
              {diskStatus.icon}
              <span className="text-xs">{diskStatus.text}</span>
            </div>
          </div>
          <Progress value={stats.serverStats.diskUsage} className="h-2" indicatorClassName={diskStatus.color} />
          <p className="text-xs text-muted-foreground text-right">
            {stats.serverStats.diskUsage.toFixed(1)}%
          </p>
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Temps de fonctionnement</span>
            <span className="text-sm">{formatUptime(stats.serverStats.uptime)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
