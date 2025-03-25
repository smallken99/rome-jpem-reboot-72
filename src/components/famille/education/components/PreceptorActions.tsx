
import React from 'react';
import { ActionsGroup } from '@/components/ui-custom/ActionsGroup';
import { UserCheck, UserX, BookOpen, Coins } from 'lucide-react';

interface PreceptorActionsProps {
  preceptorId: string;
  isAssigned: boolean;
  onAssign: (preceptorId: string) => void;
  onDismiss: (preceptorId: string) => void;
  onViewDetails: (preceptorId: string) => void;
  onPaySalary: (preceptorId: string) => void;
  canAssign: boolean;
  canDismiss: boolean;
  canPaySalary: boolean;
}

export const PreceptorActions: React.FC<PreceptorActionsProps> = ({
  preceptorId,
  isAssigned,
  onAssign,
  onDismiss,
  onViewDetails,
  onPaySalary,
  canAssign,
  canDismiss,
  canPaySalary
}) => {
  const actions = [
    {
      icon: <BookOpen className="h-4 w-4" />,
      label: "Détails",
      onClick: () => onViewDetails(preceptorId),
      variant: "outline" as const,
      size: "sm" as const
    },
    {
      icon: <UserCheck className="h-4 w-4" />,
      label: "Engager",
      onClick: () => onAssign(preceptorId),
      variant: "outline" as const,
      size: "sm" as const,
      disabled: !canAssign || isAssigned
    },
    {
      icon: <UserX className="h-4 w-4" />,
      label: "Renvoyer",
      onClick: () => onDismiss(preceptorId),
      variant: "outline" as const,
      size: "sm" as const,
      disabled: !canDismiss || !isAssigned
    },
    {
      icon: <Coins className="h-4 w-4" />,
      label: "Payer",
      onClick: () => onPaySalary(preceptorId),
      variant: "outline" as const,
      size: "sm" as const,
      disabled: !canPaySalary || !isAssigned
    }
  ];

  return (
    <ActionsGroup
      actions={actions}
      direction="row"
      justify="start"
      wrap={true}
      spacing="sm"
    />
  );
};
