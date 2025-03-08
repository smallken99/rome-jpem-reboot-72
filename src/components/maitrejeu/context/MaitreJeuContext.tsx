
import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useTimeStore, Season } from '@/utils/timeSystem';
import { 
  MaitreJeuContextType, 
  GamePhase, 
  Evenement, 
  HistoireEntry, 
  Province, 
  SenateurJouable, 
  Faction, 
  Election, 
  Loi, 
  Equilibre, 
  MagistratureType, 
  EvenementType
} from '../types/maitreJeuTypes';
import { toast } from 'sonner';

// Créer le contexte
const MaitreJeuContext = createContext<MaitreJeuContextType>({} as MaitreJeuContextType);

// Hook personnalisé pour utiliser le contexte
export const useMaitreJeu = () => useContext(MaitreJeuContext);

// Données initiales pour le jeu
const initialFactions: Faction[] = [
  {
    id: '1',
    nom: 'Optimates',
    description: 'Défenseurs de la tradition et des intérêts aristocratiques',
    leader: null,
    membres: [],
    influence: 35,
    couleur: '#3b5998',
    objectifs: ['Maintenir le pouvoir du Sénat', 'Limiter les réformes populaires']
  },
  {
    id: '2',
    nom: 'Populares',
    description: 'Partisans des réformes et des intérêts du peuple',
    leader: null,
    membres: [],
    influence: 30,
    couleur: '#e74c3c',
    objectifs: ['Réformes agraires', 'Distribution de blé aux citoyens pauvres']
  },
  {
    id: '3',
    nom: 'Moderati',
    description: 'Favorisent la stabilité et les compromis',
    leader: null,
    membres: [],
    influence: 25,
    couleur: '#2ecc71',
    objectifs: ['Maintenir l\'équilibre entre les factions', 'Éviter les conflits civils']
  },
  {
    id: '4',
    nom: 'Militares',
    description: 'Priorisent l\'expansion militaire et les intérêts de l\'armée',
    leader: null,
    membres: [],
    influence: 10,
    couleur: '#f39c12',
    objectifs: ['Augmenter le budget militaire', 'Nouvelles conquêtes']
  }
];

// Provider pour le contexte
export const MaitreJeuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const timeStore = useTimeStore();
  
  // États
  const [gamePhase, setGamePhase] = useState<GamePhase>('ADMINISTRATION');
  const [stabilityIndex, setStabilityIndex] = useState(70);
  const [publicTreasury, setPublicTreasury] = useState(1000000);
  const [romePrestige, setRomePrestige] = useState(80);
  const [religionIndex, setReligionIndex] = useState(75);
  
  const [evenements, setEvenements] = useState<Evenement[]>([]);
  const [histoireEntries, setHistoireEntries] = useState<HistoireEntry[]>([]);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [senateurs, setSenateurs] = useState<SenateurJouable[]>([]);
  const [factions, setFactions] = useState<Faction[]>(initialFactions);
  const [elections, setElections] = useState<Election[]>([]);
  const [lois, setLois] = useState<Loi[]>([]);
  
  const [equilibre, setEquilibre] = useState<Equilibre>({
    populaires: 30,
    optimates: 35,
    moderates: 35,
    historique: [
      {
        année: timeStore.year,
        saison: timeStore.season,
        populaires: 30,
        optimates: 35,
        moderates: 35
      }
    ]
  });
  
  // Initialiser des données d'exemple au démarrage
  useEffect(() => {
    // Initialiser des provinces d'exemple
    setProvinces([
      {
        id: uuidv4(),
        nom: 'Italia',
        région: 'Europe',
        gouverneur: null,
        status: 'pacifiée',
        population: 4000000,
        revenu: 500000,
        dépense: 300000,
        armée: 2,
        loyauté: 95,
        description: 'Centre de la République romaine',
        ressources: ['Blé', 'Vin', 'Huile d\'olive'],
        position: { x: 50, y: 50 }
      },
      {
        id: uuidv4(),
        nom: 'Hispania',
        région: 'Europe',
        gouverneur: null,
        status: 'instable',
        population: 1500000,
        revenu: 250000,
        dépense: 200000,
        armée: 3,
        loyauté: 70,
        description: 'Riche en mines d\'argent et autres ressources',
        ressources: ['Argent', 'Or', 'Fer'],
        position: { x: 20, y: 48 }
      },
      {
        id: uuidv4(),
        nom: 'Gallia',
        région: 'Europe',
        gouverneur: null,
        status: 'en révolte',
        population: 2000000,
        revenu: 300000,
        dépense: 350000,
        armée: 4,
        loyauté: 40,
        description: 'Terres fertiles et tribus guerrières',
        ressources: ['Fer', 'Bois', 'Esclaves'],
        position: { x: 30, y: 35 }
      }
    ]);
    
    // Initialiser des événements d'exemple
    setEvenements([
      {
        id: uuidv4(),
        type: 'politique',
        titre: 'Tensions au Sénat',
        description: 'Des tensions émergent entre les factions au Sénat sur la question des terres publiques.',
        date: {
          year: timeStore.year,
          season: timeStore.season,
          day: timeStore.dayInSeason
        },
        impact: {
          stabilité: -5,
          prestigeRome: -2
        },
        options: [
          {
            id: '1',
            titre: 'Soutenir les Optimates',
            description: 'Renforcer le contrôle sénatorial sur les terres publiques',
            résultat: 'Le Sénat maintient son contrôle, mais le peuple est mécontent',
            impact: {
              stabilité: -2,
              prestigeRome: 0,
              autre: { 'équilibre_optimates': 5, 'équilibre_populaires': -5 }
            }
          },
          {
            id: '2',
            titre: 'Soutenir les Populares',
            description: 'Proposer une redistribution des terres aux citoyens pauvres',
            résultat: 'Le peuple est satisfait, mais les sénateurs influents sont furieux',
            impact: {
              stabilité: 3,
              prestigeRome: 2,
              autre: { 'équilibre_optimates': -5, 'équilibre_populaires': 5 }
            }
          }
        ],
        résolu: false
      }
    ]);
    
    // Initialiser des entrées historiques d'exemple
    setHistoireEntries([
      {
        id: uuidv4(),
        titre: 'Fondation de Rome',
        description: 'Selon la tradition, Rome est fondée par Romulus sur le Palatin.',
        date: {
          year: 0,
          season: 'Ver',
          day: 1
        },
        catégorie: 'politique',
        importance: 1
      },
      {
        id: uuidv4(),
        titre: 'Établissement de la République',
        description: 'Expulsion du dernier roi et établissement de la République.',
        date: {
          year: 45,
          season: 'Aestas',
          day: 15
        },
        catégorie: 'politique',
        importance: 1
      }
    ]);
    
    // Initialiser des sénateurs jouables d'exemple
    setSenateurs([
      {
        id: uuidv4(),
        nom: 'Marcus Caelius',
        famille: 'Caelii',
        joueurId: null,
        age: 42,
        stats: {
          éloquence: 7,
          administration: 5,
          militaire: 3,
          intrigue: 6,
          charisme: 8
        },
        magistrature: 'PRÉTEUR',
        province: null,
        faction: 'Optimates',
        richesse: 500000,
        influence: 65
      },
      {
        id: uuidv4(),
        nom: 'Gaius Marius',
        famille: 'Marii',
        joueurId: null,
        age: 38,
        stats: {
          éloquence: 5,
          administration: 4,
          militaire: 9,
          intrigue: 3,
          charisme: 6
        },
        magistrature: null,
        province: null,
        faction: 'Populares',
        richesse: 350000,
        influence: 55
      }
    ]);
    
    // Initialiser des lois d'exemple
    setLois([
      {
        id: uuidv4(),
        titre: 'Lex Agraria',
        description: 'Distribution des terres publiques aux citoyens sans terres',
        proposeur: 'Gaius Marius',
        date: {
          year: timeStore.year,
          season: timeStore.season,
          day: timeStore.dayInSeason - 10
        },
        catégorie: 'politique',
        votesPositifs: 15,
        votesNégatifs: 20,
        votesAbstention: 5,
        état: 'proposée',
        impact: {
          stabilité: 5,
          trésorPublique: -100000,
          prestigeRome: 2
        }
      }
    ]);
    
  }, []);
  
  // Fonction pour avancer le temps
  const advanceTime = () => {
    // Récupérer l'état actuel
    const currentSeason = timeStore.season;
    const currentYear = timeStore.year;
    
    // Avancer au prochain jour
    const nextPhase = timeStore.advanceGamePhase(gamePhase);
    setGamePhase(nextPhase as GamePhase);
    
    // Si nous avons changé de saison, enregistrer l'historique d'équilibre
    if (currentSeason !== timeStore.season) {
      setEquilibre(prev => ({
        ...prev,
        historique: [
          ...prev.historique,
          {
            année: timeStore.year,
            saison: timeStore.season,
            populaires: prev.populaires,
            optimates: prev.optimates,
            moderates: prev.moderates
          }
        ]
      }));
      
      // Notifier le changement de saison
      toast.info(`Nouvelle saison: ${timeStore.season}`);
    }
    
    // Si nous avons changé d'année
    if (currentYear !== timeStore.year) {
      // Mettre à jour les âges des sénateurs
      setSenateurs(prev => prev.map(senateur => ({
        ...senateur,
        age: senateur.age + 1
      })));
      
      // Notifier le changement d'année
      toast.success(`Nouvelle année: ${timeStore.year} AUC`);
    }
    
    // Notifier le changement de phase
    toast.info(`Nouvelle phase: ${nextPhase}`);
  };
  
  // Fonction pour ajouter un événement
  const addEvenement = (evenement: Omit<Evenement, 'id' | 'résolu'>) => {
    const id = uuidv4();
    setEvenements(prev => [
      ...prev,
      {
        ...evenement,
        id,
        résolu: false
      }
    ]);
    return id;
  };
  
  // Fonction pour résoudre un événement
  const resolveEvenement = (evenementId: string, optionId?: string) => {
    // Trouver l'événement
    const evenement = evenements.find(e => e.id === evenementId);
    if (!evenement) return;
    
    // Mettre à jour l'événement
    setEvenements(prev => prev.map(e => {
      if (e.id === evenementId) {
        return {
          ...e,
          résolu: true,
          optionChoisie: optionId
        };
      }
      return e;
    }));
    
    // Appliquer les impacts de l'option choisie si elle existe
    if (optionId && evenement.options) {
      const option = evenement.options.find(o => o.id === optionId);
      if (option) {
        // Appliquer les impacts
        setStabilityIndex(prev => Math.max(0, Math.min(100, prev + (option.impact.stabilité || 0))));
        setPublicTreasury(prev => prev + (option.impact.trésorPublique || 0));
        setRomePrestige(prev => Math.max(0, Math.min(100, prev + (option.impact.prestigeRome || 0))));
        setReligionIndex(prev => Math.max(0, Math.min(100, prev + (option.impact.religion || 0))));
        
        // Appliquer les impacts sur l'équilibre
        if (option.impact.autre) {
          if (option.impact.autre['équilibre_optimates']) {
            setEquilibre(prev => ({
              ...prev,
              optimates: Math.max(0, Math.min(100, prev.optimates + option.impact.autre!['équilibre_optimates']))
            }));
          }
          if (option.impact.autre['équilibre_populaires']) {
            setEquilibre(prev => ({
              ...prev,
              populaires: Math.max(0, Math.min(100, prev.populaires + option.impact.autre!['équilibre_populaires']))
            }));
          }
          if (option.impact.autre['équilibre_moderates']) {
            setEquilibre(prev => ({
              ...prev,
              moderates: Math.max(0, Math.min(100, prev.moderates + option.impact.autre!['équilibre_moderates']))
            }));
          }
        }
        
        // Notifier le résultat
        toast.success(`Événement résolu: ${evenement.titre}`);
        toast.info(`Résultat: ${option.résultat}`);
      }
    }
    
    // Ajouter l'événement à l'histoire si c'est un événement important
    if (evenement.impact.stabilité && Math.abs(evenement.impact.stabilité) >= 10 ||
        evenement.impact.prestigeRome && Math.abs(evenement.impact.prestigeRome) >= 10) {
      addHistoireEntry({
        titre: evenement.titre,
        description: evenement.description,
        date: evenement.date,
        catégorie: evenement.type,
        importance: 2
      });
    }
  };
  
  // Fonctions pour gérer l'histoire
  const addHistoireEntry = (entry: Omit<HistoireEntry, 'id'>) => {
    const id = uuidv4();
    setHistoireEntries(prev => [
      ...prev,
      {
        ...entry,
        id
      }
    ]);
    return id;
  };
  
  const updateHistoireEntry = (entryId: string, updates: Partial<HistoireEntry>) => {
    setHistoireEntries(prev => prev.map(entry => {
      if (entry.id === entryId) {
        return {
          ...entry,
          ...updates
        };
      }
      return entry;
    }));
  };
  
  const deleteHistoireEntry = (entryId: string) => {
    setHistoireEntries(prev => prev.filter(entry => entry.id !== entryId));
  };
  
  // Fonctions pour gérer les provinces
  const addProvince = (province: Omit<Province, 'id'>) => {
    const id = uuidv4();
    setProvinces(prev => [
      ...prev,
      {
        ...province,
        id
      }
    ]);
    return id;
  };
  
  const updateProvince = (provinceId: string, updates: Partial<Province>) => {
    setProvinces(prev => prev.map(province => {
      if (province.id === provinceId) {
        return {
          ...province,
          ...updates
        };
      }
      return province;
    }));
  };
  
  const deleteProvince = (provinceId: string) => {
    // Vérifier si un sénateur est gouverneur de cette province
    const province = provinces.find(p => p.id === provinceId);
    if (province && province.gouverneur) {
      // Retirer l'affectation du sénateur
      setSenateurs(prev => prev.map(senateur => {
        if (senateur.id === province.gouverneur) {
          return {
            ...senateur,
            province: null
          };
        }
        return senateur;
      }));
    }
    
    // Supprimer la province
    setProvinces(prev => prev.filter(province => province.id !== provinceId));
  };
  
  const assignGovernor = (provinceId: string, senateurId: string | null) => {
    // Mettre à jour la province
    setProvinces(prev => prev.map(province => {
      if (province.id === provinceId) {
        return {
          ...province,
          gouverneur: senateurId
        };
      }
      // Si le sénateur était gouverneur d'une autre province, le retirer
      if (province.gouverneur === senateurId) {
        return {
          ...province,
          gouverneur: null
        };
      }
      return province;
    }));
    
    // Mettre à jour le sénateur
    if (senateurId) {
      setSenateurs(prev => prev.map(senateur => {
        if (senateur.id === senateurId) {
          return {
            ...senateur,
            province: provinceId
          };
        }
        return senateur;
      }));
    }
  };
  
  // Fonctions pour gérer les sénateurs
  const addSenateur = (senateur: Omit<SenateurJouable, 'id'>) => {
    const id = uuidv4();
    setSenateurs(prev => [
      ...prev,
      {
        ...senateur,
        id
      }
    ]);
    return id;
  };
  
  const updateSenateur = (senateurId: string, updates: Partial<SenateurJouable>) => {
    setSenateurs(prev => prev.map(senateur => {
      if (senateur.id === senateurId) {
        return {
          ...senateur,
          ...updates
        };
      }
      return senateur;
    }));
  };
  
  const deleteSenateur = (senateurId: string) => {
    // Vérifier si le sénateur est gouverneur d'une province
    const senateur = senateurs.find(s => s.id === senateurId);
    if (senateur && senateur.province) {
      // Retirer l'affectation de la province
      setProvinces(prev => prev.map(province => {
        if (province.id === senateur.province) {
          return {
            ...province,
            gouverneur: null
          };
        }
        return province;
      }));
    }
    
    // Supprimer le sénateur
    setSenateurs(prev => prev.filter(senateur => senateur.id !== senateurId));
  };
  
  const assignSenateur = (senateurId: string, joueurId: string | null) => {
    setSenateurs(prev => prev.map(senateur => {
      if (senateur.id === senateurId) {
        return {
          ...senateur,
          joueurId
        };
      }
      return senateur;
    }));
  };
  
  // Fonctions pour gérer les élections
  const scheduleElection = (magistrature: MagistratureType, year: number, season: Season) => {
    const id = uuidv4();
    setElections(prev => [
      ...prev,
      {
        id,
        année: year,
        saison: season,
        magistrature,
        candidats: [],
        élu: null,
        terminée: false
      }
    ]);
    return id;
  };
  
  const addCandidate = (electionId: string, senateurId: string) => {
    setElections(prev => prev.map(election => {
      if (election.id === electionId) {
        // Vérifier si le sénateur est déjà candidat
        const existingCandidate = election.candidats.find(c => c.senateurId === senateurId);
        if (existingCandidate) return election;
        
        return {
          ...election,
          candidats: [
            ...election.candidats,
            {
              senateurId,
              votes: 0,
              soutiens: []
            }
          ]
        };
      }
      return election;
    }));
  };
  
  const voteForCandidate = (electionId: string, senateurId: string, votes: number) => {
    setElections(prev => prev.map(election => {
      if (election.id === electionId) {
        return {
          ...election,
          candidats: election.candidats.map(candidat => {
            if (candidat.senateurId === senateurId) {
              return {
                ...candidat,
                votes: candidat.votes + votes
              };
            }
            return candidat;
          })
        };
      }
      return election;
    }));
  };
  
  const finalizeElection = (electionId: string) => {
    const election = elections.find(e => e.id === electionId);
    if (!election) return;
    
    // Trouver le candidat avec le plus de votes
    let winner = null;
    let maxVotes = -1;
    
    for (const candidat of election.candidats) {
      if (candidat.votes > maxVotes) {
        maxVotes = candidat.votes;
        winner = candidat.senateurId;
      }
    }
    
    // Mettre à jour l'élection
    setElections(prev => prev.map(e => {
      if (e.id === electionId) {
        return {
          ...e,
          élu: winner,
          terminée: true
        };
      }
      return e;
    }));
    
    // Mettre à jour le sénateur élu
    if (winner) {
      setSenateurs(prev => prev.map(senateur => {
        if (senateur.id === winner) {
          return {
            ...senateur,
            magistrature: election.magistrature
          };
        }
        // Si un autre sénateur avait cette magistrature, la lui retirer
        if (senateur.magistrature === election.magistrature) {
          return {
            ...senateur,
            magistrature: null
          };
        }
        return senateur;
      }));
      
      // Ajouter une entrée historique pour cette élection
      const winnerSenateur = senateurs.find(s => s.id === winner);
      if (winnerSenateur) {
        addHistoireEntry({
          titre: `Élection de ${winnerSenateur.nom} comme ${election.magistrature}`,
          description: `${winnerSenateur.nom} a été élu ${election.magistrature} pour l'année à venir.`,
          date: {
            year: election.année,
            season: election.saison,
            day: timeStore.dayInSeason
          },
          catégorie: 'politique',
          importance: 2
        });
      }
    }
  };
  
  // Fonctions pour gérer les lois
  const proposeLoi = (loi: Omit<Loi, 'id' | 'état' | 'votesPositifs' | 'votesNégatifs' | 'votesAbstention'>) => {
    const id = uuidv4();
    setLois(prev => [
      ...prev,
      {
        ...loi,
        id,
        état: 'proposée',
        votesPositifs: 0,
        votesNégatifs: 0,
        votesAbstention: 0
      }
    ]);
    return id;
  };
  
  const voteLoi = (loiId: string, vote: 'pour' | 'contre' | 'abstention', count: number) => {
    setLois(prev => prev.map(loi => {
      if (loi.id === loiId) {
        if (vote === 'pour') {
          return {
            ...loi,
            votesPositifs: loi.votesPositifs + count
          };
        } else if (vote === 'contre') {
          return {
            ...loi,
            votesNégatifs: loi.votesNégatifs + count
          };
        } else {
          return {
            ...loi,
            votesAbstention: loi.votesAbstention + count
          };
        }
      }
      return loi;
    }));
  };
  
  const finalizeLoi = (loiId: string) => {
    const loi = lois.find(l => l.id === loiId);
    if (!loi) return;
    
    const totalVotes = loi.votesPositifs + loi.votesNégatifs + loi.votesAbstention;
    const votesNeeded = Math.floor(totalVotes / 2) + 1;
    
    // Déterminer si la loi est votée ou rejetée
    const newState = loi.votesPositifs >= votesNeeded ? 'votée' : 'rejetée';
    
    // Mettre à jour la loi
    setLois(prev => prev.map(l => {
      if (l.id === loiId) {
        return {
          ...l,
          état: newState
        };
      }
      return l;
    }));
    
    // Si la loi est votée, appliquer son impact
    if (newState === 'votée') {
      setStabilityIndex(prev => Math.max(0, Math.min(100, prev + (loi.impact.stabilité || 0))));
      setPublicTreasury(prev => prev + (loi.impact.trésorPublique || 0));
      setRomePrestige(prev => Math.max(0, Math.min(100, prev + (loi.impact.prestigeRome || 0))));
      setReligionIndex(prev => Math.max(0, Math.min(100, prev + (loi.impact.religion || 0))));
      
      // Ajouter une entrée historique pour cette loi
      addHistoireEntry({
        titre: `Vote de la loi: ${loi.titre}`,
        description: loi.description,
        date: {
          year: timeStore.year,
          season: timeStore.season,
          day: timeStore.dayInSeason
        },
        catégorie: loi.catégorie,
        importance: 2
      });
      
      toast.success(`La loi ${loi.titre} a été votée`);
    } else {
      toast.error(`La loi ${loi.titre} a été rejetée`);
    }
  };
  
  // Fonction pour mettre à jour l'équilibre des pouvoirs
  const updateEquilibre = (populaires: number, optimates: number, moderates: number) => {
    // Normaliser pour s'assurer que la somme est 100
    const total = populaires + optimates + moderates;
    const factor = 100 / total;
    
    const normalizedPopulaires = Math.round(populaires * factor);
    const normalizedOptimates = Math.round(optimates * factor);
    // Pour éviter les erreurs d'arrondi, calculer les modérés comme le reste pour atteindre 100
    const normalizedModerates = 100 - normalizedPopulaires - normalizedOptimates;
    
    setEquilibre(prev => ({
      ...prev,
      populaires: normalizedPopulaires,
      optimates: normalizedOptimates,
      moderates: normalizedModerates
    }));
  };
  
  // Valeur du contexte
  const contextValue: MaitreJeuContextType = {
    // État général
    year: timeStore.year,
    season: timeStore.season,
    gamePhase,
    
    // Indicateurs
    stabilityIndex,
    publicTreasury,
    romePrestige,
    religionIndex,
    
    // Données
    evenements,
    histoireEntries,
    provinces,
    senateurs,
    factions,
    elections,
    lois,
    
    // Équilibre des pouvoirs
    equilibre,
    
    // Gestion du temps
    advanceTime,
    setGamePhase,
    
    // Gestion des événements
    addEvenement,
    resolveEvenement,
    
    // Gestion de l'histoire
    addHistoireEntry,
    updateHistoireEntry,
    deleteHistoireEntry,
    
    // Gestion des provinces
    addProvince,
    updateProvince,
    deleteProvince,
    assignGovernor,
    
    // Gestion des sénateurs
    addSenateur,
    updateSenateur,
    deleteSenateur,
    assignSenateur,
    
    // Gestion des élections
    scheduleElection,
    addCandidate,
    voteForCandidate,
    finalizeElection,
    
    // Gestion des lois
    proposeLoi,
    voteLoi,
    finalizeLoi,
    
    // Équilibre des pouvoirs
    updateEquilibre
  };
  
  return (
    <MaitreJeuContext.Provider value={contextValue}>
      {children}
    </MaitreJeuContext.Provider>
  );
};
