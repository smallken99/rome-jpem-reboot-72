
import { useState } from 'react';
import { ProjetLoi, VoteLoi, HistoriqueLoi } from '../types';
import { projetsData, votesData, historiqueData } from '../data';
import { toast } from 'sonner';

export const useProcessusLegislatif = (isEditable = true) => {
  const [activeTab, setActiveTab] = useState('projets');
  
  const [projets, setProjets] = useState<ProjetLoi[]>(() => {
    return projetsData.map(projet => ({
      ...projet,
      description: projet.description || '',
      contenu: Array.isArray(projet.contenu) ? projet.contenu : (projet.contenu ? [projet.contenu as string] : [])
    }));
  });
  
  const [votes, setVotes] = useState<VoteLoi[]>(() => {
    return votesData.map(vote => ({
      ...vote,
      description: vote.description || '',
      contenu: Array.isArray(vote.contenu) ? vote.contenu : (vote.contenu ? [vote.contenu as string] : [])
    }));
  });
  
  const [historique, setHistorique] = useState<HistoriqueLoi[]>(() => {
    return historiqueData.map(histoire => {
      let votesObj;
      if (typeof histoire.votes === 'string') {
        const parts = histoire.votes.split('-');
        votesObj = {
          pour: parseInt(parts[0]) || 0,
          contre: parseInt(parts[1]) || 0,
          abstention: parseInt(parts[2]) || 0
        };
      } else {
        votesObj = histoire.votes || { pour: 0, contre: 0, abstention: 0 };
      }
      
      return {
        ...histoire,
        dateProposition: histoire.date || '',
        dateAdoption: histoire.date || '',
        contenu: Array.isArray(histoire.contenu) ? histoire.contenu : (histoire.contenu ? [histoire.contenu as string] : []),
        statut: histoire.resultat === 'Adoptée' ? 'adopté' : 'rejeté',
        description: histoire.description || 'Aucune description',
        votes: votesObj
      };
    });
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLoi, setSelectedLoi] = useState<ProjetLoi | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [loiToDelete, setLoiToDelete] = useState<string | null>(null);
  const [startVoteConfirmOpen, setStartVoteConfirmOpen] = useState(false);
  const [loiToStartVote, setLoiToStartVote] = useState<ProjetLoi | null>(null);
  
  const handleAddLoi = () => {
    setSelectedLoi(null);
    setIsModalOpen(true);
  };
  
  const handleEditLoi = (loi: ProjetLoi) => {
    setSelectedLoi(loi);
    setIsModalOpen(true);
  };
  
  const handleSaveLoi = (loiData: any) => {
    if (selectedLoi) {
      setProjets(projets.map(p => p.id === selectedLoi.id ? { ...p, ...loiData } : p));
      toast.success(`Loi "${loiData.titre}" mise à jour`);
    } else {
      const newLoi: ProjetLoi = {
        id: `proj-${Date.now()}`,
        ...loiData
      };
      setProjets([...projets, newLoi]);
      toast.success(`Nouvelle loi "${loiData.titre}" créée`);
    }
    setIsModalOpen(false);
  };
  
  const handleDeleteRequest = (loiId: string) => {
    setLoiToDelete(loiId);
    setDeleteConfirmOpen(true);
  };
  
  const confirmDelete = () => {
    if (loiToDelete) {
      setProjets(projets.filter(p => p.id !== loiToDelete));
      toast.info("Projet de loi supprimé");
      setDeleteConfirmOpen(false);
      setLoiToDelete(null);
    }
  };
  
  const handleStartVoteRequest = (loi: ProjetLoi) => {
    setLoiToStartVote(loi);
    setStartVoteConfirmOpen(true);
  };
  
  const confirmStartVote = () => {
    if (loiToStartVote) {
      setProjets(projets.filter(p => p.id !== loiToStartVote.id));
      
      const newVote: VoteLoi = {
        id: loiToStartVote.id,
        titre: loiToStartVote.titre,
        auteur: loiToStartVote.auteur,
        dateDebut: new Date().toLocaleDateString('fr-FR'),
        dateFin: "À déterminer",
        description: loiToStartVote.description,
        contenu: loiToStartVote.contenu,
        pour: 0,
        contre: 0,
        abstention: 0
      };
      
      setVotes([...votes, newVote]);
      toast.success(`Vote démarré pour la loi "${loiToStartVote.titre}"`);
      setStartVoteConfirmOpen(false);
      setLoiToStartVote(null);
    }
  };

  const handleVote = (voteId: string, voteType: 'pour' | 'contre' | 'abstention', count: number = 1) => {
    setVotes(votes.map(vote => {
      if (vote.id === voteId) {
        return {
          ...vote,
          [voteType]: vote[voteType] + count
        };
      }
      return vote;
    }));
    
    const vote = votes.find(v => v.id === voteId);
    if (vote) {
      toast.success(`Vote "${voteType}" pour "${vote.titre}"`);
    }
  };

  const handleCompleteVote = (voteId: string) => {
    const vote = votes.find(v => v.id === voteId);
    if (!vote) return;
    
    const isAdopted = vote.pour > vote.contre;
    
    const historyEntry: HistoriqueLoi = {
      id: vote.id,
      titre: vote.titre,
      auteur: vote.auteur,
      dateProposition: vote.dateDebut,
      dateAdoption: new Date().toLocaleDateString('fr-FR'),
      description: vote.description,
      contenu: vote.contenu,
      votes: {
        pour: vote.pour,
        contre: vote.contre,
        abstention: vote.abstention
      },
      statut: isAdopted ? 'adopté' : 'rejeté',
      resultat: isAdopted ? 'Adoptée' : 'Rejetée',
      date: vote.dateDebut
    };
    
    setHistorique([historyEntry, ...historique]);
    setVotes(votes.filter(v => v.id !== voteId));
    
    toast.success(`Vote terminé : Loi ${isAdopted ? 'adoptée' : 'rejetée'}`);
  };

  return {
    activeTab,
    setActiveTab,
    projets,
    votes,
    historique,
    isModalOpen,
    setIsModalOpen,
    selectedLoi,
    deleteConfirmOpen,
    setDeleteConfirmOpen,
    startVoteConfirmOpen, 
    setStartVoteConfirmOpen,
    handleAddLoi,
    handleEditLoi,
    handleSaveLoi,
    handleDeleteRequest,
    confirmDelete,
    handleStartVoteRequest,
    confirmStartVote,
    handleVote,
    handleCompleteVote,
    isEditable
  };
};
