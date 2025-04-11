
import React from 'react';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, Download } from 'lucide-react';

interface FamilyTreeControlsProps {
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onExport?: () => void;
  zoom?: number;
  viewMode?: 'default' | 'compact' | 'detailed';
  onViewModeChange?: (mode: 'default' | 'compact' | 'detailed') => void;
}

export const FamilyTreeControls: React.FC<FamilyTreeControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onExport,
  zoom = 1,
  viewMode = 'default',
  onViewModeChange
}) => {
  return (
    <div className="flex items-center space-x-2 mb-4">
      <div className="flex items-center rounded-md border">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onZoomOut}
          disabled={!onZoomOut || (zoom && zoom <= 0.5)}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
        <span className="px-2 text-sm">{Math.round(zoom * 100)}%</span>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onZoomIn}
          disabled={!onZoomIn || (zoom && zoom >= 2)}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
      </div>
      
      {onViewModeChange && (
        <select 
          className="h-9 rounded-md border px-3 py-2 text-sm"
          value={viewMode}
          onChange={(e) => onViewModeChange(e.target.value as 'default' | 'compact' | 'detailed')}
        >
          <option value="default">Vue standard</option>
          <option value="compact">Vue compacte</option>
          <option value="detailed">Vue détaillée</option>
        </select>
      )}
      
      <Button 
        variant="outline" 
        size="sm" 
        className="ml-auto"
        onClick={onExport}
        disabled={!onExport}
      >
        <Download className="h-4 w-4 mr-2" />
        Exporter
      </Button>
    </div>
  );
};
