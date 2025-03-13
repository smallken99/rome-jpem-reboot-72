
import React from 'react';
import { LoisList } from '../LoisList';
import { useMaitreJeu } from '../../../context';
import { Loi } from '../../../types/lois';

interface LoisProposeesTabProps {
  onViewLoi: (loi: Loi) => void;
}

export const LoisProposeesTab: React.FC<LoisProposeesTabProps> = ({ onViewLoi }) => {
  const { lois } = useMaitreJeu();
  
  // Filtrer les lois proposées
  const loisProposees = lois.filter(
    (loi) => loi.état === 'proposée' || loi.état === 'En délibération'
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
      <h2 className="text-2xl font-bold mb-4">Lois proposées</h2>
      <LoisList lois={loisProposees} onViewLoi={handleViewLoi} />
    </div>
  );
};
