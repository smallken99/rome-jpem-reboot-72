
import React from 'react';
import { ChevronRight, Star, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ActionButton } from '@/components/ui-custom/ActionButton';

interface CardActionsProps {
  clientId: number;
}

export const CardActions: React.FC<CardActionsProps> = ({ clientId }) => {
  const navigate = useNavigate();
  
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
        <ActionButton 
          variant="outline" 
          size="sm"
          onClick={handleFavor}
          icon={<Star className="h-3.5 w-3.5" />}
          label=""
          className="text-xs h-8 px-2"
        />
        <ActionButton 
          variant="outline" 
          size="sm"
          onClick={handleContact}
          icon={<MessageSquare className="h-3.5 w-3.5" />}
          label=""
          className="text-xs h-8 px-2"
        />
      </div>
      
      <ActionButton
        variant="outline" 
        to={`/clientele/client/${clientId}`}
        label="Détails"
        icon={<ChevronRight className="ml-1 h-3.5 w-3.5" />}
        className="text-xs gap-1 py-1 h-8"
      />
    </div>
  );
};
