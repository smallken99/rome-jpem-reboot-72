
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, Users, TrendingUp, Coins, Shield, Construction, 
  BarChart4, DollarSign, Info
} from 'lucide-react';
import { ProvinceCardProps } from '../types/maitreJeuTypes';

export const ProvinceCard: React.FC<ProvinceCardProps> = ({ 
  province, 
  onViewProvince 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pacifiée':
        return 'bg-green-500 hover:bg-green-600';
      case 'instable':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'en révolte':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{province.nom}</CardTitle>
          <Badge className={getStatusColor(province.status)}>
            {province.status}
          </Badge>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground text-sm">
          <MapPin className="h-3 w-3" />
          <span>{province.région}</span>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm line-clamp-3 mb-4">{province.description}</p>
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3 text-muted-foreground" />
            <span>{province.population.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Coins className="h-3 w-3 text-muted-foreground" />
            <span>{province.revenu.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3 text-muted-foreground" />
            <span>{province.revenuAnnuel?.toLocaleString() || 'N/A'}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <DollarSign className="h-3 w-3 text-muted-foreground" />
            <span>{province.dépense.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Shield className="h-3 w-3 text-muted-foreground" />
            <span>{province.légions || 0} légions</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Construction className="h-3 w-3 text-muted-foreground" />
            <span>{province.gouverneur ? 'Gouvernée' : 'Sans gouverneur'}</span>
          </div>
        </div>
        
        {province.ressourcesPrincipales && province.ressourcesPrincipales.length > 0 && (
          <div className="mt-3">
            <div className="text-xs font-medium mb-1">Ressources principales:</div>
            <div className="flex flex-wrap gap-1">
              {province.ressourcesPrincipales.map((ressource, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {ressource}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full"
          variant="outline"
          onClick={() => onViewProvince && onViewProvince(province)}
        >
          <Info className="h-4 w-4 mr-2" />
          Détails
        </Button>
      </CardFooter>
    </Card>
  );
};
