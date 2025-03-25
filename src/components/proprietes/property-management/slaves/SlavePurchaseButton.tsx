
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useSlaveAssignment } from '../../hooks/building/useSlaveAssignment';
import { useEconomy } from '@/hooks/useEconomy';
import { SlavePurchaseDialog } from './SlavePurchaseDialog';
import { Users } from 'lucide-react';

interface SlavePurchaseButtonProps {
  className?: string;
}

export const SlavePurchaseButton: React.FC<SlavePurchaseButtonProps> = ({ className }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { purchaseSlaves, totalSlaves, assignedSlaves } = useSlaveAssignment();
  const { balance } = useEconomy();
  
  const handlePurchase = (count: number) => {
    purchaseSlaves(count);
  };
  
  const availableSlaves = totalSlaves - assignedSlaves;
  
  return (
    <>
      <Button 
        onClick={() => setDialogOpen(true)}
        className={className}
        variant="outline"
      >
        <Users className="mr-2 h-4 w-4" />
        Acheter des esclaves
      </Button>
      
      <SlavePurchaseDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onPurchase={handlePurchase}
        availableSlaves={availableSlaves}
        pricePerSlave={1000}
        balance={balance}
      />
    </>
  );
};
