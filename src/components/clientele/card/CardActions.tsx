
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, Star, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CardActionsProps {
  clientId: number;
}

export const CardActions: React.FC<CardActionsProps> = ({ clientId }) => {
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    navigate(`/clientele/client/${clientId}`);
  };
  
  const handleFavor = (e: React.MouseEvent) => {
    e.stopPropagation(); // Empêche la navigation vers les détails
    console.log('Accorder une faveur au client', clientId);
    // Implémenter la logique pour accorder une faveur
  };
  
  const handleContact = (e: React.MouseEvent) => {
    e.stopPropagation(); // Empêche la navigation vers les détails
    console.log('Contacter le client', clientId);
    // Implémenter la logique pour contacter le client
  };
  
  return (
    <div className="flex items-center justify-between mt-5 pt-4 border-t border-rome-gold/20">
      <div className="flex gap-1">
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleFavor}
          className="roman-btn-outline text-xs h-8 px-2"
        >
          <Star className="h-3.5 w-3.5" />
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleContact}
          className="roman-btn-outline text-xs h-8 px-2"
        >
          <MessageSquare className="h-3.5 w-3.5" />
        </Button>
      </div>
      
      <Button 
        variant="outline" 
        onClick={handleViewDetails}
        className="roman-btn-outline text-xs gap-1 py-1 h-8"
      >
        Détails
        <ChevronRight className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
};
