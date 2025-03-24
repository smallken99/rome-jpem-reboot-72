
import React from 'react';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { ActionsGroup } from '@/components/ui-custom/ActionsGroup';
import { 
  Eye, 
  Edit, 
  Trash2, 
  MessageSquare, 
  Handshake, 
  Flag, 
  Swords 
} from 'lucide-react';
import { Nation } from '../relations/types';

interface NationActionsProps {
  nation: Nation;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onSendMessage?: (id: string) => void;
  onCreateTreaty?: (id: string) => void;
  onDeclareWar?: (id: string) => void;
  onEstablishAlliance?: (id: string) => void;
  compact?: boolean;
}

export const NationActions: React.FC<NationActionsProps> = ({
  nation,
  onView,
  onEdit,
  onDelete,
  onSendMessage,
  onCreateTreaty,
  onDeclareWar,
  onEstablishAlliance,
  compact = false
}) => {
  const primaryActions = [
    {
      icon: <Eye className="h-4 w-4" />,
      label: compact ? "" : "Voir",
      onClick: () => onView(nation.id),
      variant: "outline" as const,
      size: "sm" as const,
      title: "Voir les détails"
    },
    {
      icon: <Edit className="h-4 w-4" />,
      label: compact ? "" : "Modifier",
      onClick: () => onEdit(nation.id),
      variant: "outline" as const,
      size: "sm" as const,
      title: "Modifier les informations"
    }
  ];
  
  const diplomaticActions = [];
  
  if (onSendMessage) {
    diplomaticActions.push({
      icon: <MessageSquare className="h-4 w-4" />,
      label: compact ? "" : "Message",
      onClick: () => onSendMessage(nation.id),
      variant: "outline" as const,
      size: "sm" as const,
      title: "Envoyer un message diplomatique"
    });
  }
  
  if (onCreateTreaty) {
    diplomaticActions.push({
      icon: <Flag className="h-4 w-4" />,
      label: compact ? "" : "Traité",
      onClick: () => onCreateTreaty(nation.id),
      variant: "outline" as const,
      size: "sm" as const,
      title: "Négocier un traité"
    });
  }
  
  if (onEstablishAlliance) {
    diplomaticActions.push({
      icon: <Handshake className="h-4 w-4" />,
      label: compact ? "" : "Alliance",
      onClick: () => onEstablishAlliance(nation.id),
      variant: "outline" as const,
      size: "sm" as const,
      title: "Établir une alliance"
    });
  }
  
  if (onDeclareWar) {
    diplomaticActions.push({
      icon: <Swords className="h-4 w-4" />,
      label: compact ? "" : "Guerre",
      onClick: () => onDeclareWar(nation.id),
      variant: "outline" as const,
      size: "sm" as const,
      className: "text-red-600 hover:bg-red-50",
      title: "Déclarer la guerre"
    });
  }
  
  const dangerousActions = [
    {
      icon: <Trash2 className="h-4 w-4" />,
      label: compact ? "" : "Supprimer",
      onClick: () => onDelete(nation.id),
      variant: "outline" as const,
      size: "sm" as const,
      className: "text-red-600 hover:bg-red-50",
      title: "Supprimer la nation"
    }
  ];
  
  return (
    <div className="flex flex-col gap-2">
      <ActionsGroup 
        actions={primaryActions}
        spacing="xs"
        justify={compact ? "center" : "start"}
      />
      
      {diplomaticActions.length > 0 && (
        <ActionsGroup 
          actions={diplomaticActions}
          spacing="xs"
          justify={compact ? "center" : "start"}
        />
      )}
      
      <ActionsGroup 
        actions={dangerousActions}
        spacing="xs"
        justify={compact ? "center" : "start"}
      />
    </div>
  );
};
