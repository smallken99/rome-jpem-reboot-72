
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';

interface BureauReportsProps {
  magistratureId: string;
}

export const BureauReports: React.FC<BureauReportsProps> = ({ magistratureId }) => {
  // Cette fonction pourrait récupérer des rapports spécifiques à la magistrature
  const getReportTitle = () => {
    switch (magistratureId) {
      case 'consul':
        return 'Rapports consulaires';
      case 'preteur':
        return 'Rapports judiciaires';
      case 'edile':
        return 'Rapports de l\'administration urbaine';
      case 'questeur':
        return 'Rapports financiers';
      case 'censeur':
        return 'Rapports du census';
      default:
        return 'Rapports';
    }
  };

  return (
    <RomanCard>
      <RomanCard.Header>
        <h3 className="font-cinzel">{getReportTitle()}</h3>
      </RomanCard.Header>
      <RomanCard.Content>
        <div className="py-10 text-center text-muted-foreground">
          <p>Les rapports de cette magistrature seront bientôt disponibles.</p>
          <p className="mt-2 text-sm">Consultez régulièrement cette section pour suivre les activités officielles.</p>
        </div>
      </RomanCard.Content>
    </RomanCard>
  );
};
