
import React from 'react';
import { LoisList } from '../LoisList';
import { useMaitreJeu } from '../../../context';
import { Loi } from '../../../types/lois';

interface LoisActivesTabProps {
  onViewLoi: (loi: Loi) => void;
}

export const LoisActivesTab: React.FC<LoisActivesTabProps> = ({ onViewLoi }) => {
  const { lois } = useMaitreJeu();
  
  // Filtrer les lois actives
  const loisActives = lois.filter(
    (loi) => loi.état === 'adoptée' || loi.état === 'Promulguée'
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
      <h2 className="text-2xl font-bold mb-4">Lois en vigueur</h2>
      <LoisList lois={loisActives} onViewLoi={handleViewLoi} />
    </div>
  );
};
