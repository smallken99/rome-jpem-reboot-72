
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, Scroll, User } from 'lucide-react';
import { ActionButton } from '@/components/ui-custom/ActionButton';

export interface HeirProps {
  id: string;
  name: string;
  role?: string;
  gender: 'male' | 'female';
  age: number;
}

export interface HeirCardProps {
  heir: HeirProps;
  isSelected: boolean;
  onSelect: (heirId: string) => void;
}

export const HeirCard: React.FC<HeirCardProps> = ({ heir, isSelected, onSelect }) => {
  const relation = heir.role || 'Fils';
  
  return (
    <Card className={`overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ${isSelected ? 'border-l-4 border-l-rome-gold bg-rome-gold/5' : ''}`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="bg-rome-navy/10 p-2.5 rounded-full">
              <User className="h-5 w-5 text-rome-navy" />
            </div>
            
            <div>
              <h4 className="font-cinzel text-lg font-medium text-rome-navy">{heir.name}</h4>
              <div className="text-sm text-muted-foreground">{relation} • {heir.age} ans</div>
            </div>
          </div>
          
          <div>
            {isSelected ? (
              <div className="px-3 py-1.5 text-sm bg-rome-gold/20 text-rome-gold rounded flex items-center gap-1.5">
                <Crown className="h-4 w-4" />
                Héritier Désigné
              </div>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onSelect(heir.id)}
                className="text-sm border-rome-navy/30 text-rome-navy hover:bg-rome-navy/10"
              >
                Désigner Héritier
              </Button>
            )}
          </div>
        </div>
        
        {isSelected && (
          <div className="mt-4 pt-3 border-t border-dashed border-muted">
            <div className="bg-blue-50 p-3 rounded-md">
              <h5 className="font-medium text-sm flex items-center gap-1.5 mb-2">
                <Scroll className="h-4 w-4 text-blue-600" />
                Droits de succession
              </h5>
              <p className="text-xs text-rome-navy">
                En tant qu'héritier principal, {heir.name} recevra :
              </p>
              <ul className="text-xs text-rome-navy mt-2 space-y-1 list-disc pl-4">
                <li>Le nom et les titres de la famille</li>
                <li>La responsabilité de perpétuer les traditions familiales</li>
                <li>La position politique et l'influence au Sénat</li>
                <li>La direction de la famille après votre décès</li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
