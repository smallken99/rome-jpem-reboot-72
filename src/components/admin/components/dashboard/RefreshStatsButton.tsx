
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Loader2 } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export const RefreshStatsButton: React.FC = () => {
  const { refreshStats, lastUpdated } = useAdmin();
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    refreshStats();
    // Simuler un délai pour l'effet visuel
    setTimeout(() => setIsRefreshing(false), 1500);
  };
  
  return (
    <div className="flex flex-col items-end gap-2">
      <Button 
        onClick={handleRefresh} 
        size="sm" 
        variant="outline"
        disabled={isRefreshing}
        className="flex items-center gap-2"
      >
        {isRefreshing ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCw className="h-4 w-4" />
        )}
        Actualiser
      </Button>
      {lastUpdated && (
        <p className="text-xs text-muted-foreground">
          Dernière mise à jour: {lastUpdated.toLocaleTimeString()}
        </p>
      )}
    </div>
  );
};
