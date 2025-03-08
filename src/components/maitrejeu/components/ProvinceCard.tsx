
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, TrendingUp, Activity, Map } from 'lucide-react';
import { Province } from '../types/maitreJeuTypes';

interface ProvinceCardProps {
  province: Province;
  onViewProvince: (provinceId: string) => void;
}

export const ProvinceCard: React.FC<ProvinceCardProps> = ({ province, onViewProvince }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pacifiée':
        return 'bg-green-500 hover:bg-green-600';
      case 'instable':
        return 'bg-amber-500 hover:bg-amber-600';
      case 'rebelle':
      case 'en révolte':
        return 'bg-red-500 hover:bg-red-600';
      case 'conquise':
        return 'bg-blue-500 hover:bg-blue-600';
      default:
        return 'bg-slate-500 hover:bg-slate-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pacifiée':
        return 'Pacifiée';
      case 'instable':
        return 'Instable';
      case 'rebelle':
      case 'en révolte':
        return 'En révolte';
      case 'conquise':
        return 'Conquise récemment';
      default:
        return status;
    }
  };

  return (
    <Card className="h-full flex flex-col transition-all duration-300 hover:shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-cinzel">{province.nom}</CardTitle>
          <Badge 
            className={`${getStatusColor(province.status || province.statut || '')} text-white`}
          >
            {getStatusText(province.status || province.statut || '')}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{province.région || province.region}</p>
      </CardHeader>
      <CardContent className="pt-0 flex-grow flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>Population: {province.population.toLocaleString()}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <TrendingUp className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>Revenu annuel: {province.revenuAnnuel.toLocaleString()} As</span>
          </div>
          
          <div className="flex items-center text-sm">
            <Activity className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>Loyauté: {province.loyauté}/100</span>
          </div>
        </div>
        
        <div className="pt-4">
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => onViewProvince(province.id)}
          >
            <Map className="h-4 w-4 mr-2" />
            Détails de la province
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
