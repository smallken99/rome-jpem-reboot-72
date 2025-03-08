
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { QuesteurBureau } from '../bureaux/questeur/QuesteurBureau';
import { EdileBureau } from '../bureaux/edile/EdileBureau';
import { PreteurBureau } from '../bureaux/preteur/PreteurBureau';
import { ConsulBureau } from '../bureaux/consul/ConsulBureau';
import { CenseurBureau } from '../bureaux/censeur/CenseurBureau';
import { currentMagistracy } from '@/data/magistracies';

export const BureauxPage: React.FC = () => {
  const { bureau } = useParams<{ bureau: string }>();
  
  // Si aucun bureau n'est spécifié, redirigez vers le bureau correspondant à la magistrature actuelle
  if (!bureau) {
    return <Navigate to={`/republique/bureaux/${currentMagistracy.id}`} replace />;
  }
  
  // Sélectionner le composant de bureau en fonction du paramètre
  const renderBureau = () => {
    switch (bureau) {
      case 'questeur':
        return <QuesteurBureau />;
      case 'edile':
        return <EdileBureau />;
      case 'preteur':
        return <PreteurBureau />;
      case 'consul':
        return <ConsulBureau />;
      case 'censeur':
        return <CenseurBureau />;
      default:
        return <Navigate to="/republique" replace />;
    }
  };
  
  return (
    <div className="space-y-4">
      <PageHeader 
        title="Bureaux de Magistrature" 
        subtitle="Accédez aux outils administratifs de la République"
      />
      
      {renderBureau()}
    </div>
  );
};
