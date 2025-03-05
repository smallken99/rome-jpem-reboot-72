
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { formatDowry } from './dowryUtils';
import { Button } from '@/components/ui/button';
import { HeartHandshake, Scroll, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Character } from '@/types/character';

export interface FemaleCardProps {
  character: Character;
  dowryAmount: number;
  index: number;
}

export const FemaleCard: React.FC<FemaleCardProps> = ({ character, dowryAmount, index }) => {
  const navigate = useNavigate();
  
  return (
    <Card className="mb-3 overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border-rome-gold/20">
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-pink-50 to-white p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
            <div className="bg-pink-100 p-2.5 rounded-full">
              <User className="h-5 w-5 text-pink-600" />
            </div>
            
            <div>
              <h4 className="font-cinzel text-lg font-medium text-rome-navy">{character.name}</h4>
              <div className="text-sm text-muted-foreground">{character.role}</div>
              <div className="text-sm mt-1">
                <span className="font-medium">Âge:</span> {character.age} ans
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
            <div className="bg-rome-gold/10 px-3 py-1.5 rounded flex items-center gap-1.5">
              <Scroll className="h-4 w-4 text-rome-gold" />
              <span className="font-medium">Dot: {formatDowry(dowryAmount)}</span>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1 border-rome-terracotta/50 text-rome-terracotta hover:bg-rome-terracotta/10"
              onClick={() => navigate(`/famille/heritage/dowry/${character.id}`)}
            >
              <HeartHandshake className="h-4 w-4" />
              Gérer la dot
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
