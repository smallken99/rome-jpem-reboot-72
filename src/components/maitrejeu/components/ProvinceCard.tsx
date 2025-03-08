
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, User, CoinsIcon, Building, ShieldAlert } from 'lucide-react';
import { Province } from '../types/maitreJeuTypes';

interface ProvinceCardProps {
  province: Province;
  onEdit: (province: Province) => void;
}

export const ProvinceCard: React.FC<ProvinceCardProps> = ({ province, onEdit }) => {
  const getStatusColor = (statut: string) => {
    switch (statut) {
      case 'pacifiée': return 'bg-green-100 text-green-800 border-green-300';
      case 'instable': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'en révolte': return 'bg-red-100 text-red-800 border-red-300';
      case 'en guerre': return 'bg-red-800 text-white border-red-700';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-cinzel">{province.nom}</CardTitle>
          <Badge variant="outline" className={getStatusColor(province.statut)}>
            {province.statut}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{province.region}</p>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground flex items-center">
              <User className="w-4 h-4 mr-1" />
              Population:
            </span>
            <span className="font-medium">{province.population.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground flex items-center">
              <CoinsIcon className="w-4 h-4 mr-1" />
              Revenu:
            </span>
            <span className="font-medium">{province.revenuAnnuel.toLocaleString()} As/an</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground flex items-center">
              <Building className="w-4 h-4 mr-1" />
              Gouverneur:
            </span>
            <span className="font-medium">{province.gouverneur || "Vacant"}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground flex items-center">
              <ShieldAlert className="w-4 h-4 mr-1" />
              Légions:
            </span>
            <span className="font-medium">{province.légions}</span>
          </div>
        </div>
        
        <div className="mt-3">
          <h4 className="text-sm font-medium mb-1">Ressources principales:</h4>
          <div className="flex flex-wrap gap-1">
            {province.ressourcesPrincipales.map((ressource, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {ressource}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full flex items-center gap-2"
          onClick={() => onEdit(province)}
        >
          <Edit className="h-4 w-4" />
          Gérer la province
        </Button>
      </CardFooter>
    </Card>
  );
};
