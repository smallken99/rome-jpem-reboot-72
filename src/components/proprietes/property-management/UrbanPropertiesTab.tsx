import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ExternalLink, Pencil, DollarSign } from 'lucide-react';
import { BuildingDetailsModal } from './building-details/BuildingDetailsModal';
import { Property } from '@/types/proprietes';

interface UrbanPropertiesTabProps {
  properties: Property[];
  onViewDetails: (propertyId: string) => void;
  onSell: (propertyId: string) => void;
}

export const UrbanPropertiesTab: React.FC<UrbanPropertiesTabProps> = ({ properties, onViewDetails, onSell }) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const handleViewDetails = (property: Property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
    onViewDetails(property.id);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
  };
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Propriétés Urbaines</CardTitle>
          <CardDescription>
            Gérez vos bâtiments et propriétés situés dans les villes de Rome
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {properties.map(property => (
                <Card key={property.id} className="border">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{property.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {property.type}, {property.location}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <Badge variant="secondary">
                            <DollarSign className="h-3 w-3 mr-1" />
                            {property.income} / an
                          </Badge>
                          <Badge variant="outline">
                            État: {property.condition}%
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewDetails(property)}
                        >
                          <Pencil className="h-4 w-4 mr-2" />
                          Détails
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => onSell(property.id)}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Vendre
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      
      {selectedProperty && (
        <BuildingDetailsModal 
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          building={selectedProperty}
        />
      )}
    </div>
  );
};
