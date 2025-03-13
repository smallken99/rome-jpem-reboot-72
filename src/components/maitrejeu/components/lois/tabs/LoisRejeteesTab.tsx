
import React from 'react';
import { LoisList } from '../LoisList';
import { useMaitreJeu } from '../../../context';
import { Loi } from '../../../types/lois';

interface LoisRejeteesTabProps {
  onViewLoi: (loi: Loi) => void;
}

export const LoisRejeteesTab: React.FC<LoisRejeteesTabProps> = ({ onViewLoi }) => {
  const { lois } = useMaitreJeu();
  
  // Filtrer les lois rejetées
  const loisRejetees = lois.filter(
    (loi) => loi.état === 'rejetée'
  );
  
  // Handler adapté pour passer l'ID mais récupérer la loi complète
  const handleViewLoi = (id: string) => {
    const loi = lois.find(l => l.id === id);
    if (loi) {
      onViewLoi(loi);
    }
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Lois rejetées</h2>
      <LoisList lois={loisRejetees} onViewLoi={handleViewLoi} />
    </div>
  );
};
