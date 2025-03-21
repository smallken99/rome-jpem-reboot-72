
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
import { UnderDevelopmentSection } from '../components/UnderDevelopmentSection';
import { motion } from 'framer-motion';

interface MaitreJeuContentProps {
  activeTab: string;
}

export const MaitreJeuContent: React.FC<MaitreJeuContentProps> = ({ activeTab }) => {
  // Détecter si la section active nécessite le TimePanel
  const showTimePanel = activeTab !== 'accueil';
  
  // Vérifier si l'onglet actif est en développement
  const isUnderDevelopment = ['equilibre', 'histoire', 'statistiques'].includes(activeTab);
  
  // Générer les fonctionnalités prévues en fonction de l'onglet
  const getPlannedFeatures = () => {
    switch (activeTab) {
      case 'equilibre':
        return [
          "Gestion de l'équilibre des pouvoirs entre les factions",
          "Visualisation graphique des tendances politiques",
          "Simulation des effets des décisions politiques",
          "Système d'alerte pour les déséquilibres critiques"
        ];
      case 'histoire':
        return [
          "Chronologie interactive des événements majeurs",
          "Création et édition d'entrées historiques",
          "Archivage automatique des décisions importantes",
          "Exportation des chroniques pour les joueurs"
        ];
      case 'statistiques':
        return [
          "Tableaux de bord interactifs avec graphiques",
          "Statistiques détaillées sur tous les aspects du jeu",
          "Comparaisons historiques des performances",
          "Exportation des données au format PDF"
        ];
      default:
        return [];
    }
  };
  
  // Obtenir le titre pour la section en développement
  const getUnderDevelopmentTitle = () => {
    switch (activeTab) {
      case 'equilibre':
        return "Gestion de l'Équilibre des Pouvoirs";
      case 'histoire':
        return "Chroniques de la République";
      case 'statistiques':
        return "Statistiques Globales";
      default:
        return "Section en Développement";
    }
  };
  
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
            title={getUnderDevelopmentTitle()}
            estimatedRelease="Prochaine mise à jour"
            features={getPlannedFeatures()}
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
          {activeTab === 'clients' && <GestionClients />}
          {activeTab === 'economie' && <GestionEconomie />}
          {activeTab === 'familles' && <GestionFamilles />}
          {activeTab === 'republique' && <GestionRepublique />}
          {activeTab === 'batiments' && <GestionBatiments />}
          {activeTab === 'lois' && <GestionLois />}
        </>
      )}
    </motion.div>
  );
};
