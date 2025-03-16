
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { User, Crown, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Heir {
  id: string;
  name: string;
  role: string;
  gender: 'male' | 'female';
  age: number;
}

interface HeirCardProps {
  heir: Heir;
  isSelected: boolean;
  onSelect: (heirId: string) => void;
}

export const HeirCard: React.FC<HeirCardProps> = ({ heir, isSelected, onSelect }) => {
  return (
    <Card className={`relative overflow-hidden transition-all ${isSelected ? 'border-amber-400 bg-amber-50' : ''}`}>
      {isSelected && (
        <div className="absolute top-0 right-0 bg-amber-400 text-white p-2 rounded-bl-md">
          <Crown className="h-4 w-4" />
        </div>
      )}
      <CardContent className="p-4 flex items-center">
        <div className={`rounded-full p-3 ${heir.gender === 'male' ? 'bg-blue-100' : 'bg-pink-100'} mr-4`}>
          <User className={`h-8 w-8 ${heir.gender === 'male' ? 'text-blue-500' : 'text-pink-500'}`} />
        </div>
        
        <div className="flex-1">
          <h4 className="font-cinzel text-lg font-semibold">{heir.name}</h4>
          <p className="text-sm text-muted-foreground">{heir.role}</p>
          
          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              {heir.age} ans
            </span>
          </div>
        </div>
        
        <Button 
          variant={isSelected ? "default" : "outline"} 
          size="sm" 
          onClick={() => onSelect(heir.id)}
          className={isSelected ? 'bg-amber-500 hover:bg-amber-600' : ''}
        >
          {isSelected ? 'Sélectionné' : 'Sélectionner'}
        </Button>
      </CardContent>
    </Card>
  );
};
