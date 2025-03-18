
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Preceptor } from './types/educationTypes';
import { Info, Check, X, Medal, Eye, UserCheck, Bookmark } from 'lucide-react';

export interface PreceptorCardProps {
  preceptor: Preceptor;
  isSelected?: boolean;
  isHired?: boolean;
  hired?: boolean;
  hireCost?: number;
  onSelect?: (id: string) => void;
  onHire?: (id: string) => void;
  onFire?: (id: string) => void;
  onAssign?: (id: string) => void;
  onView?: () => void;
  viewOnly?: boolean;
  childId?: string;
}

export const PreceptorCard: React.FC<PreceptorCardProps> = ({
  preceptor,
  isSelected = false,
  isHired = false,
  hired = false,
  hireCost,
  onSelect,
  onHire,
  onFire,
  onAssign,
  onView,
  viewOnly = false,
  childId
}) => {
  // Quality star display
  const qualityStars = () => {
    const quality = preceptor.quality || Math.floor((preceptor.expertise || preceptor.skill || 50) / 20) || 3;
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <Medal 
            key={index}
            className={`h-4 w-4 ${index < quality ? 'text-yellow-500' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  const handleClick = () => {
    if (onSelect && !viewOnly) {
      onSelect(preceptor.id);
    }
    if (onView && (viewOnly || hired || isHired)) {
      onView();
    }
  };

  const getStatusBadge = () => {
    if (hired || isHired) {
      if (preceptor.childId) {
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Assigné</Badge>;
      }
      return <Badge variant="secondary">Engagé</Badge>;
    }
    return <Badge variant="outline">Disponible</Badge>;
  };

  return (
    <Card 
      className={`transition-all hover:shadow-md cursor-pointer ${isSelected ? 'border-primary ring-1 ring-primary' : ''}`}
      onClick={handleClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{preceptor.name}</CardTitle>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-muted-foreground">Spécialité:</span>
            <p className="capitalize">{preceptor.specialty || preceptor.speciality}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Coût:</span>
            <p>{hireCost || preceptor.cost || preceptor.price} as/an</p>
          </div>
          <div>
            <span className="text-muted-foreground">Qualité:</span>
            <div>{qualityStars()}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Expertise:</span>
            <p>{preceptor.expertise || preceptor.skill || 50}/100</p>
          </div>
        </div>
        
        {preceptor.description && (
          <p className="text-sm text-muted-foreground italic">{preceptor.description}</p>
        )}
        
        {!viewOnly && (
          <div className="flex justify-end space-x-2 pt-2">
            {!(hired || isHired) && onHire && (
              <Button size="sm" onClick={(e) => {
                e.stopPropagation();
                onHire(preceptor.id);
              }}>
                <Check className="mr-1 h-4 w-4" />
                Embaucher
              </Button>
            )}
            
            {(hired || isHired) && onFire && (
              <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50" onClick={(e) => {
                e.stopPropagation();
                onFire(preceptor.id);
              }}>
                <X className="mr-1 h-4 w-4" />
                Licencier
              </Button>
            )}
            
            {(hired || isHired) && !preceptor.childId && onAssign && (
              <Button size="sm" variant="secondary" onClick={(e) => {
                e.stopPropagation();
                onAssign(preceptor.id);
              }}>
                <UserCheck className="mr-1 h-4 w-4" />
                Assigner
              </Button>
            )}
            
            {onView && (
              <Button size="sm" variant="outline" onClick={(e) => {
                e.stopPropagation();
                onView();
              }}>
                <Eye className="mr-1 h-4 w-4" />
                Détails
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
