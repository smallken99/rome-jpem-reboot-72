
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MaitreJeuProvider } from '@/components/maitrejeu/context/MaitreJeuContext';
import { MaitreJeuLayout } from '@/components/maitrejeu/layout/MaitreJeuLayout';
import { GestionSenateurs } from '@/components/maitrejeu/GestionSenateurs';
import { GestionProvinces } from '@/components/maitrejeu/GestionProvinces';
import { GestionPolitique } from '@/components/maitrejeu/GestionPolitique';
import { GestionEquilibre } from '@/components/maitrejeu/GestionEquilibre';
import { GestionHistoire } from '@/components/maitrejeu/GestionHistoire';
import { GestionClients } from '@/components/maitrejeu/GestionClients';
import { GestionEconomie } from '@/components/maitrejeu/GestionEconomie';
import { GestionFamilles } from '@/components/maitrejeu/GestionFamilles';
import { GestionRepublique } from '@/components/maitrejeu/GestionRepublique';
import { GestionBatiments } from '@/components/maitrejeu/GestionBatiments';
import { GestionLois } from '@/components/maitrejeu/GestionLois';
import { MaitreJeuWelcome } from '@/components/maitrejeu/MaitreJeuWelcome';
import { MaitreJeuStats } from '@/components/maitrejeu/MaitreJeuStats';
import { UnderDevelopmentSection } from '@/components/maitrejeu/components/UnderDevelopmentSection';
import { TimePanel } from '@/components/maitrejeu/components/TimePanel';

const MaitreJeu = () => {
  const [activeTab, setActiveTab] = useState('accueil');

  // Liste des sections développées et non développées
  const developedSections = ['senateurs', 'clients', 'familles', 'republique', 'lois', 'accueil'];
  
  // Fonction pour vérifier si une section est développée
  const isSectionDeveloped = (section: string) => developedSections.includes(section);

  // Rendu des sections
  const renderSection = () => {
    // Toujours afficher le gestionnaire de temps
    const timePanel = activeTab !== 'accueil' ? <TimePanel /> : null;

    // Sections développées
    if (activeTab === 'accueil') return <MaitreJeuWelcome />;
    if (activeTab === 'senateurs') return <><GestionSenateurs /></>;
    if (activeTab === 'clients') return <><GestionClients /></>;
    if (activeTab === 'familles') return <><GestionFamilles /></>;
    if (activeTab === 'republique') return <><GestionRepublique /></>;
    if (activeTab === 'lois') return <><GestionLois /></>;
    
    // Sections en cours de développement
    if (activeTab === 'statistiques') {
      return (
        <>
          {timePanel}
          <MaitreJeuStats />
        </>
      );
    }

    // Utiliser le composant générique pour les sections non développées
    if (!isSectionDeveloped(activeTab)) {
      const titles: {[key: string]: string} = {
        'politique': 'Gestion de la Politique',
        'equilibre': 'Équilibre des Pouvoirs',
        'provinces': 'Administration des Provinces',
        'histoire': 'Chroniques de l\'Histoire',
        'economie': 'Gestion de l\'Économie',
        'batiments': 'Construction de Bâtiments'
      };

      const descriptions: {[key: string]: string} = {
        'politique': 'Ici seront gérées les alliances politiques, les factions et les votes au Sénat.',
        'equilibre': 'Cette section permettra de surveiller et d\'influencer l\'équilibre des pouvoirs à Rome.',
        'provinces': 'Gérez les territoires conquis, leurs gouverneurs, ressources et relations avec Rome.',
        'histoire': 'Enregistrez les événements marquants et consultez les chroniques de la République.',
        'economie': 'Administrez le trésor public, les taxes et l\'économie de la République.',
        'batiments': 'Supervisez la construction, l\'entretien et l\'utilisation des bâtiments publics.'
      };

      return (
        <>
          {timePanel}
          <UnderDevelopmentSection 
            title={titles[activeTab] || `Gestion ${activeTab}`} 
            description={descriptions[activeTab]}
          />
        </>
      );
    }

    // Fallback
    return <MaitreJeuWelcome />;
  };

  return (
    <MaitreJeuProvider>
      <Routes>
        <Route path="/" element={
          <MaitreJeuLayout 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          >
            {renderSection()}
          </MaitreJeuLayout>
        } />
        <Route path="*" element={<Navigate to="/maitre-jeu/" replace />} />
      </Routes>
    </MaitreJeuProvider>
  );
};

export default MaitreJeu;
