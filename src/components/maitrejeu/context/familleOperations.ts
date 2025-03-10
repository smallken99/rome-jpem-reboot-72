
import { v4 as uuidv4 } from 'uuid';
import {
  FamilleInfo,
  MembreFamille,
  FamilleAlliance,
  MariageInfo,
  FamilleCreationData,
  MembreFamilleCreationData,
  FamilleFilter,
  MembreFamilleFilter,
  FamilleRelation,
  RelationType
} from '../types/familles';

export const createFamilleOperations = (
  setFamilles: React.Dispatch<React.SetStateAction<FamilleInfo[]>>,
  setMembres: React.Dispatch<React.SetStateAction<MembreFamille[]>>,
  setAlliances: React.Dispatch<React.SetStateAction<FamilleAlliance[]>>,
  setMariages: React.Dispatch<React.SetStateAction<MariageInfo[]>>,
  setRelations: React.Dispatch<React.SetStateAction<FamilleRelation[]>>
) => {
  // Opérations sur les familles
  const addFamille = (familleData: FamilleCreationData): string => {
    const familleId = uuidv4();
    
    const newFamille: FamilleInfo = {
      id: familleId,
      nom: familleData.nom,
      gens: familleData.gens,
      statut: familleData.statut,
      prestige: familleData.prestige,
      influence: familleData.influence,
      richesse: familleData.richesse,
      description: familleData.description,
      devise: familleData.devise,
      blason: familleData.blason,
      membres: [],
      alliances: [],
      couleurPrimaire: familleData.couleurPrimaire,
      couleurSecondaire: familleData.couleurSecondaire
    };
    
    setFamilles(prev => [...prev, newFamille]);
    
    // Si un chef initial est fourni, l'ajouter comme membre
    if (familleData.chefInitial) {
      const chefId = addMembreFamille({
        ...familleData.chefInitial,
        familleId,
        genre: 'male',
        role: "Pater Familias"
      });
      
      // Mettre à jour la famille avec le chef
      updateFamille(familleId, { chefId });
    }
    
    // Si une matrone initiale est fournie, l'ajouter comme membre
    if (familleData.matroneInitiale) {
      const matroneId = addMembreFamille({
        ...familleData.matroneInitiale,
        familleId,
        genre: 'female',
        role: "Mater Familias"
      });
      
      // Mettre à jour la famille avec la matrone
      updateFamille(familleId, { matrone: matroneId });
      
      // Si un chef a été ajouté, créer un mariage entre les deux
      if (familleData.chefInitial && newFamille.chefId) {
        createMariage(newFamille.chefId, matroneId, familleId, familleId, 0);
      }
    }
    
    return familleId;
  };
  
  const updateFamille = (id: string, updates: Partial<FamilleInfo>): void => {
    setFamilles(prev => prev.map(f => 
      f.id === id ? { ...f, ...updates } : f
    ));
  };
  
  const deleteFamille = (id: string): void => {
    // Supprimer les membres de la famille
    setMembres(prev => prev.filter(m => {
      const famille = getFamilleOfMembre(m.id);
      return famille?.id !== id;
    }));
    
    // Supprimer les alliances liées à cette famille
    setAlliances(prev => prev.filter(a => 
      a.famille1Id !== id && a.famille2Id !== id
    ));
    
    // Supprimer les mariages liés à cette famille
    setMariages(prev => prev.filter(m => 
      m.familleEpoux !== id && m.familleEpouse !== id
    ));
    
    // Supprimer la famille elle-même
    setFamilles(prev => prev.filter(f => f.id !== id));
  };
  
  const getFamille = (id: string): FamilleInfo | undefined => {
    return getFamilles().find(f => f.id === id);
  };
  
  const getFamilles = (): FamilleInfo[] => {
    let familles: FamilleInfo[] = [];
    setFamilles(prev => {
      familles = [...prev];
      return prev;
    });
    return familles;
  };
  
  const filterFamilles = (filter: FamilleFilter): FamilleInfo[] => {
    return getFamilles().filter(f => {
      if (filter.nom && !f.nom.toLowerCase().includes(filter.nom.toLowerCase())) {
        return false;
      }
      if (filter.statut && f.statut !== filter.statut) {
        return false;
      }
      if (filter.prestigeMin !== undefined && f.prestige < filter.prestigeMin) {
        return false;
      }
      if (filter.prestigeMax !== undefined && f.prestige > filter.prestigeMax) {
        return false;
      }
      return true;
    });
  };
  
  // Opérations sur les membres de famille
  const addMembreFamille = (membreData: MembreFamilleCreationData): string => {
    const membreId = uuidv4();
    
    const newMembre: MembreFamille = {
      id: membreId,
      nom: membreData.nom,
      prenom: membreData.prenom,
      age: membreData.age,
      genre: membreData.genre,
      statut: membreData.statut,
      statutMatrimonial: membreData.statutMatrimonial,
      role: membreData.role,
      pere: membreData.pere,
      mere: membreData.mere,
      senateurId: membreData.senateurId,
      education: membreData.education,
      popularite: membreData.popularite,
      piete: membreData.piete,
      joueur: membreData.joueur,
      description: membreData.description,
      portrait: membreData.portrait
    };
    
    setMembres(prev => [...prev, newMembre]);
    
    // Ajouter le membre à la famille
    if (membreData.familleId) {
      setFamilles(prev => prev.map(f => {
        if (f.id === membreData.familleId) {
          return {
            ...f,
            membres: [...f.membres, membreId]
          };
        }
        return f;
      }));
    }
    
    // Créer des relations parent-enfant si nécessaire
    if (membreData.pere) {
      addRelation(membreData.pere, membreId, membreData.genre === 'male' ? 'Fils' : 'Fille');
    }
    
    if (membreData.mere) {
      addRelation(membreData.mere, membreId, membreData.genre === 'male' ? 'Fils' : 'Fille');
    }
    
    return membreId;
  };
  
  const updateMembreFamille = (id: string, updates: Partial<MembreFamille>): void => {
    setMembres(prev => prev.map(m => 
      m.id === id ? { ...m, ...updates } : m
    ));
  };
  
  const deleteMembreFamille = (id: string): void => {
    // Supprimer le membre des familles
    const famille = getFamilleOfMembre(id);
    if (famille) {
      setFamilles(prev => prev.map(f => {
        if (f.id === famille.id) {
          return {
            ...f,
            membres: f.membres.filter(m => m !== id),
            chefId: f.chefId === id ? undefined : f.chefId,
            matrone: f.matrone === id ? undefined : f.matrone
          };
        }
        return f;
      }));
    }
    
    // Supprimer les relations impliquant ce membre
    setRelations(prev => prev.filter(r => 
      r.membre1Id !== id && r.membre2Id !== id
    ));
    
    // Supprimer les mariages impliquant ce membre
    setMariages(prev => prev.filter(m => 
      m.epoux !== id && m.epouse !== id
    ));
    
    // Supprimer le membre lui-même
    setMembres(prev => prev.filter(m => m.id !== id));
  };
  
  const getMembre = (id: string): MembreFamille | undefined => {
    return getMembres().find(m => m.id === id);
  };
  
  const getMembres = (): MembreFamille[] => {
    let membres: MembreFamille[] = [];
    setMembres(prev => {
      membres = [...prev];
      return prev;
    });
    return membres;
  };
  
  const filterMembres = (filter: MembreFamilleFilter): MembreFamille[] => {
    return getMembres().filter(m => {
      if (filter.nom && !(`${m.prenom} ${m.nom}`).toLowerCase().includes(filter.nom.toLowerCase())) {
        return false;
      }
      if (filter.genre && m.genre !== filter.genre) {
        return false;
      }
      if (filter.statut && m.statut !== filter.statut) {
        return false;
      }
      if (filter.statutMatrimonial && m.statutMatrimonial !== filter.statutMatrimonial) {
        return false;
      }
      if (filter.age?.min !== undefined && m.age < filter.age.min) {
        return false;
      }
      if (filter.age?.max !== undefined && m.age > filter.age.max) {
        return false;
      }
      if (filter.familleId) {
        const famille = getFamilleOfMembre(m.id);
        if (!famille || famille.id !== filter.familleId) {
          return false;
        }
      }
      return true;
    });
  };
  
  const getFamilleOfMembre = (membreId: string): FamilleInfo | undefined => {
    return getFamilles().find(f => f.membres.includes(membreId));
  };
  
  const getMembresByFamille = (familleId: string): MembreFamille[] => {
    const famille = getFamille(familleId);
    if (!famille) return [];
    
    return famille.membres.map(id => getMembre(id)).filter(Boolean) as MembreFamille[];
  };
  
  // Opérations sur les alliances
  const createAlliance = (
    famille1Id: string,
    famille2Id: string,
    type: FamilleAlliance['type'],
    termes: string,
    benefices: string[]
  ): string => {
    const allianceId = uuidv4();
    
    const newAlliance: FamilleAlliance = {
      id: allianceId,
      famille1Id,
      famille2Id,
      type,
      dateDebut: new Date().toISOString(),
      termes,
      benefices,
      statut: "en négociation",
      membres: []
    };
    
    setAlliances(prev => [...prev, newAlliance]);
    
    // Ajouter l'alliance aux deux familles
    setFamilles(prev => prev.map(f => {
      if (f.id === famille1Id || f.id === famille2Id) {
        return {
          ...f,
          alliances: [...f.alliances, allianceId]
        };
      }
      return f;
    }));
    
    return allianceId;
  };
  
  const updateAlliance = (id: string, updates: Partial<FamilleAlliance>): void => {
    setAlliances(prev => prev.map(a => 
      a.id === id ? { ...a, ...updates } : a
    ));
  };
  
  const getAlliancesByFamille = (familleId: string): FamilleAlliance[] => {
    return getAlliances().filter(a => 
      a.famille1Id === familleId || a.famille2Id === familleId
    );
  };
  
  const getAlliances = (): FamilleAlliance[] => {
    let alliances: FamilleAlliance[] = [];
    setAlliances(prev => {
      alliances = [...prev];
      return prev;
    });
    return alliances;
  };
  
  // Opérations sur les mariages
  const createMariage = (
    epouxId: string,
    epouseId: string,
    familleEpouxId: string,
    familleEpouseId: string,
    dot: number
  ): string => {
    const mariageId = uuidv4();
    
    const newMariage: MariageInfo = {
      id: mariageId,
      epoux: epouxId,
      epouse: epouseId,
      familleEpoux: familleEpouxId,
      familleEpouse: familleEpouseId,
      dot,
      date: new Date().toISOString(),
      statut: "prévu"
    };
    
    setMariages(prev => [...prev, newMariage]);
    
    // Mettre à jour le statut matrimonial des membres
    updateMembreFamille(epouxId, { statutMatrimonial: "Marié" });
    updateMembreFamille(epouseId, { statutMatrimonial: "Marié" });
    
    // Créer une alliance matrimoniale entre les familles si elles sont différentes
    if (familleEpouxId !== familleEpouseId) {
      const allianceId = createAlliance(
        familleEpouxId,
        familleEpouseId,
        "matrimoniale",
        `Mariage entre ${getMembre(epouxId)?.prenom} ${getMembre(epouxId)?.nom} et ${getMembre(epouseId)?.prenom} ${getMembre(epouseId)?.nom}`,
        ["Alliance politique", "Renforcement des liens familiaux"]
      );
      
      updateAlliance(allianceId, { 
        membres: [epouxId, epouseId],
        statut: "active"
      });
    }
    
    // Créer la relation d'époux entre les deux membres
    addRelation(epouxId, epouseId, "Époux");
    
    return mariageId;
  };
  
  const updateMariage = (id: string, updates: Partial<MariageInfo>): void => {
    setMariages(prev => prev.map(m => 
      m.id === id ? { ...m, ...updates } : m
    ));
    
    // Si le statut du mariage change, mettre à jour le statut matrimonial des membres
    if (updates.statut) {
      const mariage = getMariages().find(m => m.id === id);
      if (mariage) {
        if (updates.statut === "rompu") {
          updateMembreFamille(mariage.epoux, { statutMatrimonial: "Divorcé" });
          updateMembreFamille(mariage.epouse, { statutMatrimonial: "Divorcé" });
        } else if (updates.statut === "veuvage") {
          // Déterminer qui est décédé et mettre à jour l'autre
          // Pour simplifier, nous supposons que l'époux est décédé
          updateMembreFamille(mariage.epouse, { statutMatrimonial: "Veuf" });
        }
      }
    }
  };
  
  const getMariages = (): MariageInfo[] => {
    let mariages: MariageInfo[] = [];
    setMariages(prev => {
      mariages = [...prev];
      return prev;
    });
    return mariages;
  };
  
  const getMariagesByMembre = (membreId: string): MariageInfo[] => {
    return getMariages().filter(m => 
      m.epoux === membreId || m.epouse === membreId
    );
  };
  
  // Opérations sur les relations
  const addRelation = (
    membre1Id: string,
    membre2Id: string,
    type: RelationType
  ): string => {
    const relationId = uuidv4();
    
    const newRelation: FamilleRelation = {
      id: relationId,
      membre1Id,
      membre2Id,
      type
    };
    
    setRelations(prev => [...prev, newRelation]);
    
    // Ajouter la relation réciproque si nécessaire
    if (type === "Père") {
      addRelation(membre2Id, membre1Id, "Fils");
    } else if (type === "Mère") {
      addRelation(membre2Id, membre1Id, "Fils");
    } else if (type === "Frère" || type === "Soeur") {
      addRelation(membre2Id, membre1Id, getMembre(membre1Id)?.genre === 'male' ? "Frère" : "Soeur");
    } else if (type === "Époux") {
      addRelation(membre2Id, membre1Id, "Épouse");
    }
    
    return relationId;
  };
  
  const getRelations = (): FamilleRelation[] => {
    let relations: FamilleRelation[] = [];
    setRelations(prev => {
      relations = [...prev];
      return prev;
    });
    return relations;
  };
  
  const getRelationsByMembre = (membreId: string): FamilleRelation[] => {
    return getRelations().filter(r => 
      r.membre1Id === membreId || r.membre2Id === membreId
    );
  };
  
  return {
    // Famille
    addFamille,
    updateFamille,
    deleteFamille,
    getFamille,
    getFamilles,
    filterFamilles,
    
    // Membre
    addMembreFamille,
    updateMembreFamille,
    deleteMembreFamille,
    getMembre,
    getMembres,
    filterMembres,
    getFamilleOfMembre,
    getMembresByFamille,
    
    // Alliance
    createAlliance,
    updateAlliance,
    getAlliancesByFamille,
    getAlliances,
    
    // Mariage
    createMariage,
    updateMariage,
    getMariages,
    getMariagesByMembre,
    
    // Relation
    addRelation,
    getRelations,
    getRelationsByMembre
  };
};
