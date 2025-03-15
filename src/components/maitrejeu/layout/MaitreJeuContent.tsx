
import React from 'react';
import { GestionSenateurs } from '../GestionSenateurs';
import { GestionProvinces } from '../GestionProvinces';
import { GestionPolitique } from '../GestionPolitique';
import { GestionEquilibre } from '../GestionEquilibre';
import { GestionHistoire } from '../GestionHistoire';
import { GestionClients } from '../GestionClients';
import { GestionEconomie } from '../GestionEconomie';
import { GestionFamilles } from '../GestionFamilles';
import { GestionRepublique } from '../GestionRepublique';
import { GestionBatiments } from '../GestionBatiments';
import { GestionLois } from '../GestionLois';
import { MaitreJeuStats } from '../MaitreJeuStats';
import { TimePanel } from '../components/TimePanel';
import { MaitreJeuWelcome } from '../MaitreJeuWelcome';

interface MaitreJeuContentProps {
  activeTab: string;
}

export const MaitreJeuContent: React.FC<MaitreJeuContentProps> = ({ activeTab }) => {
  // Détecter si la section active nécessite le TimePanel
  const showTimePanel = activeTab !== 'accueil';
  
  return (
    <div className="bg-background border rounded-lg shadow overflow-hidden">
      {showTimePanel && <TimePanel />}
      
      {/* Page d'accueil */}
      {activeTab === 'accueil' && <MaitreJeuWelcome />}
      
      {/* Sections principales */}
      {activeTab === 'senateurs' && <GestionSenateurs />}
      {activeTab === 'provinces' && <GestionProvinces />}
      {activeTab === 'politique' && <GestionPolitique />}
      {activeTab === 'equilibre' && <GestionEquilibre />}
      {activeTab === 'histoire' && <GestionHistoire />}
      {activeTab === 'clients' && <GestionClients />}
      {activeTab === 'economie' && <GestionEconomie />}
      {activeTab === 'familles' && <GestionFamilles />}
      {activeTab === 'republique' && <GestionRepublique />}
      {activeTab === 'batiments' && <GestionBatiments />}
      {activeTab === 'lois' && <GestionLois />}
      {activeTab === 'statistiques' && <MaitreJeuStats />}
    </div>
  );
};
