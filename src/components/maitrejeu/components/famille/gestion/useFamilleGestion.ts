
import { useState } from 'react';
import { useMaitreJeu } from '../../../context';
import { toast } from 'sonner';
import { 
  FamilleInfo, 
  FamilleCreationData, 
  FamilleFilter, 
  MembreFamille, 
  FamilleAlliance 
} from '../../../types';

export const useFamilleGestion = () => {
  const { 
    familles, 
    membres, 
    alliances, 
    addFamille, 
    updateFamille,
    deleteFamille,
    getMembresByFamille,
    addMembreFamille,
    updateMembreFamille,
    deleteMembreFamille,
    createAlliance,
    updateAlliance
  } = useMaitreJeu();
  
  const [activeTab, setActiveTab] = useState('familles');
  const [selectedFamilleId, setSelectedFamilleId] = useState<string | null>(null);
  const [showFamilleModal, setShowFamilleModal] = useState(false);
  const [showMembreModal, setShowMembreModal] = useState(false);
  const [showAllianceModal, setShowAllianceModal] = useState(false);
  const [familleFilter, setFamilleFilter] = useState<FamilleFilter>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMembre, setSelectedMembre] = useState<MembreFamille | null>(null);
  const [selectedAlliance, setSelectedAlliance] = useState<FamilleAlliance | null>(null);
  
  const selectedFamille = selectedFamilleId ? familles.find(f => f.id === selectedFamilleId) : null;
  const familleMembres = selectedFamilleId ? getMembresByFamille(selectedFamilleId) : [];
  const familleAlliances = selectedFamilleId ? alliances.filter(a => 
    a.famille1Id === selectedFamilleId || a.famille2Id === selectedFamilleId
  ) : [];
  
  const handleCreateFamille = (familleData: FamilleCreationData) => {
    const familleId = addFamille(familleData);
    setSelectedFamilleId(familleId);
    setShowFamilleModal(false);
    setActiveTab('detail');
    toast.success(`Famille ${familleData.nom} créée avec succès`);
  };
  
  const handleUpdateFamille = (familleData: FamilleCreationData) => {
    if (selectedFamille) {
      updateFamille(selectedFamille.id, familleData);
      setShowFamilleModal(false);
      toast.success(`Famille ${familleData.nom} mise à jour`);
    }
  };
  
  const handleDeleteFamille = (familleId: string) => {
    const famille = familles.find(f => f.id === familleId);
    if (famille) {
      deleteFamille(familleId);
      setSelectedFamilleId(null);
      setActiveTab('familles');
      toast.success(`Famille ${famille.nom} supprimée`);
    }
  };
  
  const handleCreateMembre = (membreData: any) => {
    addMembreFamille({
      ...membreData,
      familleId: selectedFamilleId || membreData.familleId
    });
    setShowMembreModal(false);
    toast.success(`Membre ${membreData.prenom} ${membreData.nom} ajouté`);
  };
  
  const handleUpdateMembre = (membreData: any) => {
    if (selectedMembre) {
      updateMembreFamille(selectedMembre.id, membreData);
      setSelectedMembre(null);
      setShowMembreModal(false);
      toast.success(`Membre ${membreData.prenom} ${membreData.nom} mis à jour`);
    }
  };
  
  const handleDeleteMembre = (membreId: string) => {
    const membre = membres.find(m => m.id === membreId);
    if (membre) {
      deleteMembreFamille(membreId);
      toast.success(`Membre ${membre.prenom} ${membre.nom} supprimé`);
    }
  };
  
  const handleCreateAlliance = (allianceData: any) => {
    createAlliance(
      allianceData.famille1Id || selectedFamilleId,
      allianceData.famille2Id,
      allianceData.type,
      allianceData.termes,
      allianceData.benefices
    );
    setShowAllianceModal(false);
    toast.success(`Alliance créée avec succès`);
  };
  
  const handleUpdateAlliance = (allianceData: any) => {
    if (selectedAlliance) {
      updateAlliance(selectedAlliance.id, allianceData);
      setSelectedAlliance(null);
      setShowAllianceModal(false);
      toast.success(`Alliance mise à jour`);
    }
  };
  
  const handleEditFamille = (famille: FamilleInfo) => {
    setSelectedFamilleId(famille.id);
    setShowFamilleModal(true);
  };
  
  const handleEditMembre = (membre: MembreFamille) => {
    setSelectedMembre(membre);
    setShowMembreModal(true);
  };
  
  const handleEditAlliance = (alliance: FamilleAlliance) => {
    setSelectedAlliance(alliance);
    setShowAllianceModal(true);
  };

  return {
    // State
    activeTab,
    setActiveTab,
    selectedFamilleId,
    setSelectedFamilleId,
    showFamilleModal,
    setShowFamilleModal,
    showMembreModal,
    setShowMembreModal,
    showAllianceModal,
    setShowAllianceModal,
    familleFilter,
    setFamilleFilter,
    searchTerm,
    setSearchTerm,
    selectedMembre,
    setSelectedMembre,
    selectedAlliance,
    setSelectedAlliance,
    
    // Data
    familles,
    membres,
    alliances,
    selectedFamille,
    familleMembres,
    familleAlliances,
    
    // Handlers
    handleCreateFamille,
    handleUpdateFamille,
    handleDeleteFamille,
    handleCreateMembre,
    handleUpdateMembre,
    handleDeleteMembre,
    handleCreateAlliance,
    handleUpdateAlliance,
    handleEditFamille,
    handleEditMembre,
    handleEditAlliance
  };
};
