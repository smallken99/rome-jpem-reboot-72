
import React from 'react';
import { useRelations } from '@/components/famille/relations/context/RelationsContext';
import { PropertyRelation } from '@/components/famille/relations/types/relationTypes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { Badge } from '@/components/ui/badge';
import { Handshake, Landmark, Users, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PropertyRelationsPanelProps {
  propertyId: string;
  propertyName: string;
}

export const PropertyRelationsPanel: React.FC<PropertyRelationsPanelProps> = ({
  propertyId,
  propertyName
}) => {
  const { relations } = useRelations();
  const navigate = useNavigate();
  
  // Filtrer les relations qui ont des liens avec cette propriété
  const relatedRelations = relations.filter(relation => 
    relation.properties?.some(prop => prop.propertyId === propertyId)
  );
  
  if (relatedRelations.length === 0) {
    return (
      <Card className="mt-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5" />
            Relations liées à cette propriété
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm italic">
            Aucune relation n'est liée à cette propriété pour le moment.
          </p>
        </CardContent>
      </Card>
    );
  }
  
  const getRelationTypeColor = (type: string) => {
    switch (type) {
      case 'shared': return 'bg-green-500';
      case 'disputed': return 'bg-red-500';
      case 'leased': return 'bg-blue-500';
      case 'borrowed': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };
  
  const getRelationTypeLabel = (type: string) => {
    switch (type) {
      case 'shared': return 'Partagée';
      case 'disputed': return 'Contestée';
      case 'leased': return 'Louée';
      case 'borrowed': return 'Empruntée';
      default: return 'Autre';
    }
  };

  return (
    <Card className="mt-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Users className="h-5 w-5" />
          Relations liées à cette propriété
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {relatedRelations.map(relation => {
            const propertyRelation = relation.properties?.find(
              prop => prop.propertyId === propertyId
            );
            
            if (!propertyRelation) return null;
            
            return (
              <div key={relation.id} className="border rounded-md p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Handshake className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{relation.targetName}</span>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getRelationTypeColor(propertyRelation.type)} bg-opacity-20 border-opacity-40`}
                    >
                      {getRelationTypeLabel(propertyRelation.type)}
                    </Badge>
                  </div>
                  <Badge variant={relation.type === 'positive' ? 'default' : relation.type === 'negative' ? 'destructive' : 'secondary'}>
                    {relation.type === 'positive' ? 'Positive' : relation.type === 'negative' ? 'Négative' : 'Neutre'}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">
                  {propertyRelation.details}
                </p>
                
                <ActionButton
                  variant="outline"
                  size="sm"
                  icon={<ArrowRight className="h-4 w-4" />}
                  label="Voir la relation"
                  onClick={() => navigate(`/famille/relations/${relation.id}`)}
                  className="w-full justify-between"
                />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
