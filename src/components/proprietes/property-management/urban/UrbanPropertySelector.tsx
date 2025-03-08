
import React from 'react';
import { Button } from '@/components/ui/button';
import { Grid2X2, List, PlusCircle } from 'lucide-react';

interface UrbanPropertySelectorProps {
  buildingType: string;
  selectedId: string;
  onSelect: (id: string) => void;
  isViewingCatalogue?: boolean;
  setIsViewingCatalogue?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UrbanPropertySelector: React.FC<UrbanPropertySelectorProps> = ({
  buildingType,
  selectedId,
  onSelect,
  isViewingCatalogue = false,
  setIsViewingCatalogue
}) => {
  return (
    <div className="border rounded-md p-4 bg-card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-cinzel text-lg text-rome-navy">
          Propriétés {buildingType === 'residential' ? 'Résidentielles' : 
                      buildingType === 'religious' ? 'Religieuses' : 
                      buildingType === 'public' ? 'Publiques' : 'Militaires'}
        </h3>
        
        {setIsViewingCatalogue && (
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className={!isViewingCatalogue ? "bg-rome-gold/20" : ""}
              onClick={() => setIsViewingCatalogue(false)}
            >
              <List className="h-4 w-4 mr-1" />
              Mes propriétés
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={isViewingCatalogue ? "bg-rome-gold/20" : ""}
              onClick={() => setIsViewingCatalogue(true)}
            >
              <Grid2X2 className="h-4 w-4 mr-1" />
              Catalogue
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
