
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
import { UnderDevelopmentSection } from '../components/UnderDevelopmentSection';
import { motion } from 'framer-motion';

interface MaitreJeuContentProps {
  activeTab: string;
}

export const MaitreJeuContent: React.FC<MaitreJeuContentProps> = ({ activeTab }) => {
  // Détecter si la section active nécessite le TimePanel
  const showTimePanel = activeTab !== 'accueil';
  
  // Vérifier si l'onglet actif est en développement
  const developmentSections: Record<string, { title: string, description: string, release: string, features: string[] }> = {
    'histoire': {
      title: "Chroniques de la République",
      description: "Enregistrez et consultez les événements marquants de l'histoire de Rome.",
      release: "Deux mises à jour à venir",
      features: [
        "Chronologie interactive des événements majeurs",
        "Création et édition d'entrées historiques",
        "Archivage automatique des décisions importantes",
        "Exportation des chroniques pour les joueurs"
      ]
    },
    'statistiques': {
      title: "Statistiques Globales",
      description: "Analysez en détail tous les aspects de la République à travers des tableaux de bord interactifs.",
      release: "Prochaine mise à jour",
      features: [
        "Tableaux de bord interactifs avec graphiques",
        "Statistiques détaillées sur tous les aspects du jeu",
        "Comparaisons historiques des performances",
        "Exportation des données au format PDF"
      ]
    }
  };
  
  const isUnderDevelopment = Object.keys(developmentSections).includes(activeTab);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };
  
  return (
    <motion.div
      key={activeTab}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-background border rounded-lg shadow overflow-hidden h-full"
    >
      {showTimePanel && <TimePanel />}
      
      {isUnderDevelopment ? (
        <div className="p-6">
          <UnderDevelopmentSection 
            title={developmentSections[activeTab].title}
            description={developmentSections[activeTab].description}
            estimatedRelease={developmentSections[activeTab].release}
            features={developmentSections[activeTab].features}
          />
        </div>
      ) : (
        <>
          {/* Page d'accueil */}
          {activeTab === 'accueil' && <MaitreJeuWelcome />}
          
          {/* Sections principales */}
          {activeTab === 'senateurs' && <GestionSenateurs />}
          {activeTab === 'provinces' && <GestionProvinces />}
          {activeTab === 'politique' && <GestionPolitique />}
          {activeTab === 'equilibre' && <GestionEquilibre />}
          {activeTab === 'clients' && <GestionClients />}
          {activeTab === 'economie' && <GestionEconomie />}
          {activeTab === 'familles' && <GestionFamilles />}
          {activeTab === 'republique' && <GestionRepublique />}
          {activeTab === 'batiments' && <GestionBatiments />}
          {activeTab === 'lois' && <GestionLois />}
          {activeTab === 'database' && <GestionDatabase />}
        </>
      )}
    </motion.div>
  );
};
