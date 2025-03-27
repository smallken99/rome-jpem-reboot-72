
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Crown, User, UserCheck } from 'lucide-react';

export interface Heir {
  id: string;
  name: string;
  role: string;
  gender: 'male' | 'female';
  age: number;
  traits?: string[];
}

interface HeirCardProps {
  heir: Heir;
  isSelected: boolean;
  onSelect: (heirId: string) => void;
}

export const HeirCard: React.FC<HeirCardProps> = ({ heir, isSelected, onSelect }) => {
  return (
    <Card className={`transition-colors ${isSelected ? 'border-2 border-amber-500' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className={`${heir.gender === 'male' ? 'bg-blue-100' : 'bg-pink-100'} h-12 w-12`}>
              <AvatarFallback className={heir.gender === 'male' ? 'text-blue-700' : 'text-pink-700'}>
                {heir.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-lg">{heir.name}</h3>
                {isSelected && (
                  <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">
                    <Crown className="h-3 w-3 mr-1" />
                    Héritier désigné
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <span className="mr-3">{heir.role}</span>
                <span>{heir.age} ans</span>
              </div>
            </div>
          </div>
          
          <Button
            variant={isSelected ? "secondary" : "outline"}
            size="sm"
            onClick={() => onSelect(heir.id)}
            className="flex items-center gap-1"
          >
            {isSelected ? (
              <>
                <UserCheck className="h-4 w-4" />
                <span>Sélectionné</span>
              </>
            ) : (
              <>
                <User className="h-4 w-4" />
                <span>Sélectionner</span>
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
