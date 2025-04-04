
import React from 'react';
import { ChevronRight, Star, MessageSquare, Info, UserX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { toast } from 'sonner';

interface CardActionsProps {
  clientId: number;
  clientName?: string;
}

export const CardActions: React.FC<CardActionsProps> = ({ clientId, clientName = "Client" }) => {
  const navigate = useNavigate();
  
  const handleFavor = () => {
    console.log('Accorder une faveur au client', clientId);
    toast.success(`Faveur accordée à ${clientName}`);
  };
  
  const handleContact = () => {
    console.log('Contacter le client', clientId);
    toast.success(`Message envoyé à ${clientName}`);
    // Rediriger vers la messagerie avec ce client pré-sélectionné
    // navigate(`/messages/new?recipient=${clientId}`);
  };
  
  const handleDeleteClient = () => {
    toast.error(`Suppression du client ${clientName} non implémentée`);
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
          title="Accorder une faveur"
          className="text-xs h-8 px-2"
        />
        <ActionButton 
          variant="outline" 
          size="sm"
          onClick={handleContact}
          icon={<MessageSquare className="h-3.5 w-3.5" />}
          label=""
          title="Envoyer un message"
          className="text-xs h-8 px-2"
        />
        <ActionButton 
          variant="destructive" 
          size="sm"
          onClick={handleDeleteClient}
          icon={<UserX className="h-3.5 w-3.5" />}
          label=""
          title="Supprimer le client"
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
