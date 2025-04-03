
import React from 'react';
import { FamilyRelation } from '../types/relationTypes';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, ThumbsUp, ThumbsDown } from 'lucide-react';

interface RelationsListProps {
  relations: FamilyRelation[];
  onUpdateRelation: (id: string, updates: Partial<FamilyRelation>) => void;
  onRemoveRelation: (id: string) => void;
}

export const RelationsList: React.FC<RelationsListProps> = ({ 
  relations, 
  onUpdateRelation, 
  onRemoveRelation 
}) => {
  const getRelationColor = (type: string) => {
    switch (type) {
      case 'positive':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'negative':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'neutral':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };
  
  if (relations.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>Aucune relation n'a été établie.</p>
        <p className="mt-2 text-sm">
          Créez de nouvelles relations pour développer l'influence de votre famille.
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {relations.map(relation => (
        <Card key={relation.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center border-b p-4">
              <div className="flex-1">
                <h3 className="font-medium">{relation.targetName}</h3>
                <p className="text-sm text-muted-foreground">{relation.targetRole}</p>
              </div>
              <Badge className={getRelationColor(relation.type)}>
                {relation.type === 'positive' ? 'Allié' : relation.type === 'negative' ? 'Rival' : 'Neutre'}
              </Badge>
            </div>
            
            <div className="p-4">
              <p className="text-sm mb-3">{relation.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-2 text-xs">
                {relation.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end gap-2 p-2 bg-gray-50">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onUpdateRelation(relation.id, { 
                  type: 'positive' 
                })}
              >
                <ThumbsUp className="h-4 w-4 mr-1" />
                Améliorer
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onUpdateRelation(relation.id, { 
                  type: 'negative' 
                })}
              >
                <ThumbsDown className="h-4 w-4 mr-1" />
                Dégrader
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onRemoveRelation(relation.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Supprimer
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
