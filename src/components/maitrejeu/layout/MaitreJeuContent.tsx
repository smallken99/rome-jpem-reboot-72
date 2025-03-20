
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
import { GestionDatabase } from '../GestionDatabase';
import { MaitreJeuStats } from '../MaitreJeuStats';
import { TimePanel } from '../components/TimePanel';
import { MaitreJeuWelcome } from '../MaitreJeuWelcome';

interface MaitreJeuContentProps {
  activeTab: string;
}

export const MaitreJeuContent: React.FC<MaitreJeuContentProps> = ({ activeTab }) => {
  // Détecter si la section active nécessite le TimePanel
  const showTimePanel = activeTab !== 'accueil';
  
  // Mappage des onglets vers les composants
  const tabComponents: Record<string, React.ReactNode> = {
    'accueil': <MaitreJeuWelcome />,
    'senateurs': <GestionSenateurs />,
    'provinces': <GestionProvinces />,
    'politique': <GestionPolitique />,
    'equilibre': <GestionEquilibre />,
    'histoire': <GestionHistoire />,
    'clients': <GestionClients />,
    'economie': <GestionEconomie />,
    'familles': <GestionFamilles />,
    'republique': <GestionRepublique />,
    'batiments': <GestionBatiments />,
    'lois': <GestionLois />,
    'database': <GestionDatabase />,
    'statistiques': <MaitreJeuStats />
  };
  
  return (
    <div className="bg-background border rounded-lg shadow overflow-hidden">
      {showTimePanel && <TimePanel />}
      {tabComponents[activeTab] || <div className="p-6">Section non trouvée</div>}
    </div>
  );
};
