import React, { createContext, useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { 
  MaitreJeuContextType, 
  Equilibre, 
  Loi, 
  Province,
  SenateurJouable, 
  Evenement, 
  EvenementAction, 
  HistoireEntry,
  Election,
  MagistratureType,
  Season,
  GamePhase,
  Faction,
  EvenementType,
  adaptLegacyData,
  convertTimeSeasonToMaitreJeuSeason
} from '../types';
import { getCurrentSeason } from '@/utils/timeSystem';

// Création du contexte avec une valeur par défaut vide
export const MaitreJeuContext = createContext<MaitreJeuContextType>({} as MaitreJeuContextType);

// Hook personnalisé pour utiliser le contexte
export const useMaitreJeu = () => useContext(MaitreJeuContext);

// Données initiales pour le provider
const initialFactions: Faction[] = [
  {
    id: 'populares',
    nom: 'Populares',
    description: 'Les Populares sont une faction politique romaine qui cherche à défendre les intérêts du peuple et à limiter le pouvoir de l\'aristocratie.',
    leader: null,
    membres: [],
    influence: 50,
    couleur: 'red',
    objectifs: ['Réformes agraires', 'Réduction de la dette', 'Extension de la citoyenneté']
  },
  {
    id: 'optimates',
    nom: 'Optimates',
    description: 'Les Optimates sont une faction politique romaine qui cherche à défendre les intérêts de l\'aristocratie et à maintenir le statu quo politique.',
    leader: null,
    membres: [],
    influence: 50,
    couleur: 'blue',
    objectifs: ['Maintien du pouvoir de l\'aristocratie', 'Opposition aux réformes', 'Défense des traditions']
  },
  {
    id: 'moderati',
    nom: 'Moderati',
    description: 'Les Moderati sont une faction politique romaine qui cherche à trouver un compromis entre les intérêts du peuple et de l\'aristocratie.',
    leader: null,
    membres: [],
    influence: 50,
    couleur: 'green',
    objectifs: ['Compromis politique', 'Stabilité', 'Modération']
  }
];

export const MaitreJeuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // États pour gérer les différentes entités du jeu
  const [currentYear, setCurrentYear] = useState<number>(275);
  const [currentSeason, setCurrentSeason] = useState<Season>(getCurrentSeason());
  const [currentPhase, setCurrentPhase] = useState<GamePhase>('SETUP');
  const [equilibre, setEquilibre] = useState<Equilibre>({
    plebeiens: 50,
    patriciens: 50,
    armée: 50,
    économie: 50,
    religion: 50,
    diplomatie: 50,
    historique: []
  });
  const [lois, setLois] = useState<Loi[]>([]);
  const [provinces, setProvinces] = useState<Province[]>([
    {
      id: uuidv4(),
      nom: 'Rome',
      gouverneur: null,
      région: 'Italie',
      population: 1000000,
      status: 'pacifiée',
      description: 'La capitale de la République romaine.',
      revenu: 1000000,
      dépense: 500000,
      loyauté: 100,
      légions: 4,
      garnison: 2000,
      richesse: 10000000,
      revenuAnnuel: 1000000,
      impôts: 10,
      ressourcesPrincipales: ['Commerce', 'Agriculture'],
      problèmes: [],
      opportunités: [],
      coordonnées: {
        x: 12.5,
        y: 41.9
      }
    }
  ]);
  const [senateurs, setSenateurs] = useState<SenateurJouable[]>([
    {
      id: uuidv4(),
      nom: 'Marcus Tullius Cicero',
      famille: 'Tullia',
      âge: 45,
      joueurId: null,
      stats: {
        éloquence: 90,
        administration: 70,
        militaire: 30,
        intrigue: 60,
        charisme: 80
      },
      popularité: 75,
      richesse: 500000,
      influence: 80,
      magistrature: null,
      faction: 'Optimates',
      province: null
    }
  ]);
  const [evenements, setEvenements] = useState<Evenement[]>([
    {
      id: uuidv4(),
      titre: 'Révolte en Gaule',
      description: 'Une révolte éclate en Gaule, menaçant la domination romaine.',
      type: 'GUERRE',
      date: {
        year: 275,
        season: 'SUMMER'
      },
      importance: 'majeure',
      options: [
        {
          id: uuidv4(),
          texte: 'Envoyer des légions pour réprimer la révolte.',
          effets: {
            stabilité: -10,
            trésorPublique: -50000
          }
        },
        {
          id: uuidv4(),
          texte: 'Négocier avec les rebelles.',
          effets: {
            stabilité: 5,
            trésorPublique: 0
          }
        }
      ],
      resolved: false
    }
  ]);
  const [histoireEntries, setHistoireEntries] = useState<HistoireEntry[]>([
    {
      id: uuidv4(),
      titre: 'Fondation de Rome',
      contenu: 'Selon la légende, Rome a été fondée par Romulus et Remus en 753 avant J.-C.',
      date: {
        year: -753,
        season: 'SPRING'
      }
    }
  ]);
  const [elections, setElections] = useState<Election[]>([
    {
      id: uuidv4(),
      année: 275,
      saison: 'SUMMER',
      magistrature: 'CONSUL',
      candidats: [],
      élu: null,
      terminée: false
    }
  ]);

  // Fonction pour avancer le temps
  const advanceTime = () => {
    setCurrentYear(prevYear => prevYear + 1);
    setCurrentSeason(getCurrentSeason());
  };

  // Fonction pour changer la phase du jeu
  const changePhase = (phase: GamePhase) => {
    setCurrentPhase(phase);
  };

  // Fonction pour mettre à jour l'équilibre
  const updateEquilibre = (updates: Partial<Equilibre>) => {
    setEquilibre(prevEquilibre => ({
      ...prevEquilibre,
      ...updates,
      historique: [
        ...prevEquilibre.historique,
        {
          année: currentYear,
          saison: currentSeason,
          plebeiens: updates.plebeiens !== undefined ? updates.plebeiens : prevEquilibre.plebeiens,
          patriciens: updates.patriciens !== undefined ? updates.patriciens : prevEquilibre.patriciens,
          armée: updates.armée !== undefined ? updates.armée : prevEquilibre.armée,
          économie: updates.économie !== undefined ? updates.économie : prevEquilibre.économie,
          religion: updates.religion !== undefined ? updates.religion : prevEquilibre.religion,
          diplomatie: updates.diplomatie !== undefined ? updates.diplomatie : prevEquilibre.diplomatie,
          populaires: updates.populaires !== undefined ? updates.populaires : prevEquilibre.populaires,
          optimates: updates.optimates !== undefined ? updates.optimates : prevEquilibre.optimates,
          moderates: updates.moderates !== undefined ? updates.moderates : prevEquilibre.moderates,
        }
      ]
    }));
  };

  // Fonction pour mettre à jour l'équilibre des factions
  const updateFactionBalance = (populaires: number, optimates: number, moderates: number) => {
    // Adaptation pour compatibilité avec la nouvelle signature
    updateEquilibre({
      populaires,
      optimates,
      moderates
    });
  };

  // Fonction pour ajouter une loi
  const addLoi = (loi: Omit<Loi, "id">) => {
    const newLoi: Loi = {
      id: uuidv4(),
      ...loi
    };
    setLois(prevLois => [...prevLois, newLoi]);
  };

  // Fonction pour voter une loi
  const voteLoi = (id: string, vote: 'pour' | 'contre' | 'abstention', count: number = 1) => {
    setLois(prevLois =>
      prevLois.map(loi => {
        if (loi.id === id) {
          return {
            ...loi,
            votesPositifs: vote === 'pour' ? loi.votesPositifs + count : loi.votesPositifs,
            votesNégatifs: vote === 'contre' ? loi.votesNégatifs + count : loi.votesNégatifs,
            votesAbstention: vote === 'abstention' ? loi.votesAbstention + count : loi.votesAbstention
          };
        }
        return loi;
      })
    );
  };

  // Fonction pour programmer une élection
  const scheduleElection = (magistrature: MagistratureType, year: number, season: Season) => {
    const newElection: Election = {
      id: uuidv4(),
      année: year,
      saison: season,
      magistrature: magistrature,
      candidats: [],
      élu: null,
      terminée: false
    };
    setElections(prevElections => [...prevElections, newElection]);
    return ""; // Retour vide corrigé
  };

  // Fonction pour ajouter un événement
  const addEvenement = (evenement: Omit<Evenement, "id">) => {
    const newEvenement: Evenement = {
      id: uuidv4(),
      ...evenement,
      resolved: false
    };
    setEvenements(prevEvenements => [...prevEvenements, newEvenement]);
  };

  // Fonction pour résoudre un événement
  const resolveEvenement = (id: string, optionId: string) => {
    setEvenements(prevEvenements =>
      prevEvenements.map(evenement => {
        if (evenement.id === id) {
          const selectedOption = evenement.options?.find(option => option.id === optionId);
          return {
            ...evenement,
            resolved: true,
            impact: selectedOption?.effets
          };
        }
        return evenement;
      })
    );
  };

  // Fonction pour ajouter une entrée d'histoire
  const addHistoireEntry = (entry: Omit<HistoireEntry, "id">) => {
    const newHistoireEntry: HistoireEntry = {
      id: uuidv4(),
      ...entry
    };
    setHistoireEntries(prevHistoireEntries => [...prevHistoireEntries, newHistoireEntry]);
  };

  // Fonction pour mettre à jour une province
  const updateProvince = (id: string, updates: Partial<Province>) => {
    setProvinces(prevProvinces =>
      prevProvinces.map(province => {
        if (province.id === id) {
          return {
            ...province,
            ...updates
          };
        }
        return province;
      })
    );
  };

  // Fonction pour mettre à jour un sénateur
  const updateSenateur = (id: string, updates: Partial<SenateurJouable>) => {
    setSenateurs(prevSenateurs =>
      prevSenateurs.map(senateur => {
        if (senateur.id === id) {
          return {
            ...senateur,
            ...updates
          };
        }
        return senateur;
      })
    );
  };

  // Fonction pour assigner un sénateur à un joueur
  const assignSenateurToPlayer = (senateurId: string, playerId: string) => {
    setSenateurs(prevSenateurs =>
      prevSenateurs.map(senateur => {
        if (senateur.id === senateurId) {
          return {
            ...senateur,
            joueurId: playerId
          };
        }
        return senateur;
      })
    );
  };

  // Valeur du contexte
  const contextValue: MaitreJeuContextType = {
    // État du jeu
    gameState: {
      year: currentYear,
      season: currentSeason,
      phase: currentPhase,
      day: 1
    },
    currentYear,
    currentSeason,
    currentPhase,
    year: currentYear, // Pour compatibilité
    season: currentSeason, // Pour compatibilité
    
    // Entities
    equilibre,
    lois,
    provinces,
    senateurs,
    evenements,
    histoireEntries,
    elections,
    factions: initialFactions, // Pour compatibilité
    
    // Actions
    advanceTime,
    changePhase,
    updateEquilibre,
    updateFactionBalance,
    
    // Political
    addLoi,
    voteLoi,
    scheduleElection,
    
    // Events management
    addEvenement,
    resolveEvenement,
    
    // Histoire (History) management
    addHistoireEntry,
    
    // Provinces
    updateProvince,
    
    // Senateurs
    updateSenateur,
    assignSenateurToPlayer,
    addSenateur: undefined, // Pour compatibilité
    deleteSenateur: undefined, // Pour compatibilité
    assignSenateur: undefined  // Pour compatibilité
  };

  return (
    <MaitreJeuContext.Provider value={contextValue}>
      {children}
    </MaitreJeuContext.Provider>
  );
};
