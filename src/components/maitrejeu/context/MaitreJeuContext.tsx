import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { generateId } from '../types/common';
import { 
  GamePhase, 
  Season, 
  ImportanceType 
} from '../types/common';
import { Equilibre } from '../types/equilibre';
import { Province } from '../types/provinces';
import { SenateurJouable } from '../types/senateurs';
import { Evenement, EvenementAction, EvenementType } from '../types/evenements';
import { Election } from '../types/elections';
import { Loi } from '../types/lois';
import { HistoireEntry } from '../types/histoire';

export interface MaitreJeuContextType {
  // État du jeu
  currentYear: number;
  currentSeason: Season;
  currentPhase: GamePhase;
  
  // Données du jeu
  senateurs: SenateurJouable[];
  provinces: Province[];
  equilibre: Equilibre;
  evenements: Evenement[];
  elections: Election[];
  lois: Loi[];
  histoireEntries: HistoireEntry[];
  
  // Fonctions pour mettre à jour les données
  advanceTime: () => void;
  changePhase: (phase: GamePhase) => void;
  updateSenateur: (updatedSenateur: SenateurJouable) => void;
  assignSenateurToPlayer: (senateurId: string, playerId: string | null) => void;
  updateProvince: (updatedProvince: Province) => void;
  addEvenement: (newEvenement: Omit<Evenement, 'id'>) => void;
  resolveEvenement: (evenementId: string, optionId: string) => void;
  planifierElection: (magistrature: string, year: number, season: Season) => void;
  addCandidateToElection: (electionId: string, candidateId: string) => void;
  proposerLoi: (nouvelleLoi: Omit<Loi, 'id'>) => void;
  voterLoi: (loiId: string, type: 'pour' | 'contre' | 'abstention', nombre: number) => void;
  addHistoireEntry: (entry: Omit<HistoireEntry, 'id'>) => void;
  updateEquilibre: (newValues: Partial<Equilibre>) => void;
}

// Contexte pour le maître du jeu
export const MaitreJeuContext = createContext<MaitreJeuContextType>({} as MaitreJeuContextType);

// Hook pour utiliser le contexte
export const useMaitreJeu = () => useContext(MaitreJeuContext);

interface MaitreJeuProviderProps {
  children: ReactNode;
}

export const MaitreJeuProvider: React.FC<MaitreJeuProviderProps> = ({ children }) => {
  // État du temps
  const [currentYear, setCurrentYear] = useState<number>(632);
  const [currentSeason, setCurrentSeason] = useState<Season>('SPRING');
  const [currentPhase, setCurrentPhase] = useState<GamePhase>('ADMINISTRATION');
  
  // Données du jeu
  const [senateurs, setSenateurs] = useState<SenateurJouable[]>([
    {
      id: '1',
      nom: 'Marcus Porcius Cato',
      famille: 'Porcius',
      age: 45,
      popularite: 70,
      richesse: 5000000,
      influence: 85,
      fonction: 'Censeur',
      appartenance: 'Optimates',
      status: 'actif',
      magistrature: 'CENSEUR',
      playerId: 'admin'
    },
    {
      id: '2',
      nom: 'Gaius Julius Caesar',
      famille: 'Julius',
      age: 38,
      popularite: 85,
      richesse: 8000000,
      influence: 75,
      fonction: 'Proconsul',
      appartenance: 'Populares',
      status: 'actif',
      magistrature: 'CONSUL',
      playerId: null
    }
  ]);
  
  const [provinces, setProvinces] = useState<Province[]>([
    {
      id: '1',
      nom: 'Hispania Citerior',
      gouverneur: 'Quintus Servilius',
      région: 'Ibérie',
      population: 1500000,
      status: 'pacifiée',
      description: 'Province Nord de l\'Espagne',
      richesse: 750000,
      loyauté: 75,
      loyautéVariation: 5,
      ressources: ['Argent', 'Fer', 'Céréales'],
      armée: {
        légions: 2,
        auxiliaires: 5000,
        navires: 10
      },
      impôts: 120000,
      dernierEvenement: 'Révolte des Lusitaniens matée par le gouverneur',
      position: { x: 150, y: 200 }
    },
    {
      id: '2',
      nom: 'Gallia Cisalpina',
      gouverneur: 'Marcus Calpurnius',
      région: 'Gaule',
      population: 2000000,
      status: 'instable',
      description: 'Gaule au nord de l\'Italie',
      richesse: 950000,
      loyauté: 65,
      loyautéVariation: -3,
      ressources: ['Or', 'Bois', 'Bétail'],
      armée: {
        légions: 3,
        auxiliaires: 8000,
        navires: 5
      },
      impôts: 180000,
      dernierEvenement: 'Incursions de tribus gauloise à la frontière',
      position: { x: 240, y: 150 }
    }
  ]);
  
  const [equilibre, setEquilibre] = useState<Equilibre>({
    population: 80,
    armée: 70,
    économie: 65,
    morale: 60,
    loyauté: 75,
    patriciens: 50,
    plébéiens: 60,
    populares: 45,
    optimates: 55,
    neutrales: 50
  });
  
  const [evenements, setEvenements] = useState<Evenement[]>([
    {
      id: '1',
      titre: 'Invasion des Helvètes',
      description: 'Les Helvètes migrent en masse et menacent la Gaule Transalpine.',
      type: 'GUERRE',
      date: { year: 632, season: 'WINTER' },
      importance: 'majeure',
      options: [
        {
          id: '1a',
          texte: 'Envoyer deux légions pour les arrêter',
          effets: {
            'armée': -10,
            'économie': -5
          }
        },
        {
          id: '1b',
          texte: 'Négocier un passage pacifique',
          effets: {
            'diplomatie': +5,
            'populaires': +3
          }
        }
      ],
      resolved: false
    }
  ]);
  
  const [elections, setElections] = useState<Election[]>([
    {
      id: '1',
      magistrature: 'CONSUL',
      annee: 632,
      saison: 'SUMMER',
      candidats: ['Gaius Julius Caesar', 'Marcus Calpurnius Bibulus'],
      results: null,
      status: 'planifiée',
      // Compatibility fields
      year: 632,
      season: 'SUMMER',
      candidates: ['Gaius Julius Caesar', 'Marcus Calpurnius Bibulus']
    }
  ]);
  
  const [lois, setLois] = useState<Loi[]>([
    {
      id: '1',
      titre: 'Lex Agraria',
      description: 'Redistribuer les terres publiques aux vétérans et citoyens pauvres.',
      proposeur: 'Gaius Julius Caesar',
      catégorie: 'économique',
      date: { year: 632, season: 'SPRING' },
      état: 'proposée',
      importance: 'majeure',
      votesPositifs: 120,
      votesNégatifs: 90,
      votesAbstention: 30,
      effets: {
        'populares': +10,
        'optimates': -8,
        'plébéiens': +15
      }
    }
  ]);

  const [histoireEntries, setHistoireEntries] = useState<HistoireEntry[]>([
    {
      id: '1',
      titre: 'Fondation du Premier Triumvirat',
      contenu: 'Pompée, Crassus et César forment une alliance politique secrète.',
      date: { year: 631, season: 'AUTUMN' },
      catégorie: 'POLITIQUE',
      importance: 'majeure',
      auteur: 'Système',
      visible: true
    }
  ]);
  
  // Fonctions pour mettre à jour les données
  const advanceTime = () => {
    const seasons: Season[] = ['SPRING', 'SUMMER', 'AUTUMN', 'WINTER'];
    const currentIndex = seasons.indexOf(currentSeason);
    
    if (currentIndex === seasons.length - 1) {
      setCurrentYear(prev => prev + 1);
      setCurrentSeason('SPRING');
    } else {
      setCurrentSeason(seasons[currentIndex + 1] as Season);
    }
    
    // Réinitialiser la phase du jeu
    setCurrentPhase('ADMINISTRATION');
  };
  
  const changePhase = (phase: GamePhase) => {
    setCurrentPhase(phase);
  };
  
  // Fonctions pour les sénateurs
  const updateSenateur = (updatedSenateur: SenateurJouable) => {
    setSenateurs(prev => prev.map(s => 
      s.id === updatedSenateur.id ? updatedSenateur : s
    ));
  };
  
  const assignSenateurToPlayer = (senateurId: string, playerId: string | null) => {
    setSenateurs(prev => prev.map(s => 
      s.id === senateurId ? { ...s, playerId } : s
    ));
  };
  
  // Fonctions pour les provinces
  const updateProvince = (updatedProvince: Province) => {
    setProvinces(prev => prev.map(p => 
      p.id === updatedProvince.id ? updatedProvince : p
    ));
  };
  
  // Fonctions pour les événements
  const addEvenement = (newEvenement: Omit<Evenement, 'id'>) => {
    const evenementWithId: Evenement = {
      ...newEvenement,
      id: uuidv4()
    };
    setEvenements(prev => [...prev, evenementWithId]);
  };
  
  const resolveEvenement = (evenementId: string, optionId: string) => {
    setEvenements(prev => prev.map(e => {
      if (e.id === evenementId) {
        const selectedOption = e.options.find(o => o.id === optionId);
        if (!selectedOption) return e;
        
        return {
          ...e,
          resolved: true,
          selectedOption: optionId
        };
      }
      return e;
    }));
    
    // Appliquer les effets de l'option choisie
    const evenement = evenements.find(e => e.id === evenementId);
    if (!evenement) return;
    
    const selectedOption = evenement.options.find(o => o.id === optionId);
    if (!selectedOption || !selectedOption.effets) return;
    
    // Mettre à jour l'équilibre en fonction des effets
    setEquilibre(prev => {
      const newEquilibre: Partial<Equilibre> = { ...prev };
      
      if ('population' in selectedOption.effets) {
        newEquilibre.population = prev.population + (selectedOption.effets.population || 0);
      }
      if ('armée' in selectedOption.effets) {
        newEquilibre.armée = prev.armée + (selectedOption.effets.armée || 0);
      }
      if ('économie' in selectedOption.effets) {
        newEquilibre.économie = prev.économie + (selectedOption.effets.économie || 0);
      }
      if ('morale' in selectedOption.effets) {
        newEquilibre.morale = prev.morale + (selectedOption.effets.morale || 0);
      }
      if ('loyauté' in selectedOption.effets) {
        newEquilibre.loyauté = prev.loyauté + (selectedOption.effets.loyauté || 0);
      }
      
      return newEquilibre as Equilibre;
    });
  };
  
  // Fonctions pour les élections
  const planifierElection = (magistrature: string, year: number, season: Season) => {
    const nouvelleElection: Election = {
      id: generateId(),
      magistrature,
      annee: year,
      saison: season,
      candidats: [],
      results: null,
      status: 'planifiée',
      // Compatibility fields
      year,
      season,
      candidates: []
    };
    
    setElections(prev => [...prev, nouvelleElection]);
  };
  
  const addCandidateToElection = (electionId: string, candidateId: string) => {
    setElections(prev => prev.map(e => {
      if (e.id === electionId) {
        return {
          ...e,
          candidats: [...e.candidats, candidateId],
          candidates: [...e.candidates || [], candidateId]
        };
      }
      return e;
    }));
  };
  
  // Fonctions pour les lois
  const proposerLoi = (nouvelleLoi: Omit<Loi, 'id'>) => {
    const loiAvecId: Loi = {
      ...nouvelleLoi,
      id: uuidv4()
    };
    
    setLois(prev => [...prev, loiAvecId]);
  };
  
  const voterLoi = (loiId: string, type: 'pour' | 'contre' | 'abstention', nombre: number) => {
    setLois(prev => prev.map(l => {
      if (l.id === loiId) {
        const updatedLoi = { ...l };
        
        if (type === 'pour') {
          updatedLoi.votesPositifs += nombre;
        } else if (type === 'contre') {
          updatedLoi.votesNégatifs += nombre;
        } else {
          updatedLoi.votesAbstention += nombre;
        }
        
        // Vérifier si la loi est adoptée ou rejetée
        const totalVotes = updatedLoi.votesPositifs + updatedLoi.votesNégatifs + updatedLoi.votesAbstention;
        const majorite = totalVotes / 2;
        
        if (updatedLoi.votesPositifs > majorite) {
          updatedLoi.état = 'adoptée';
        } else if (updatedLoi.votesNégatifs > majorite) {
          updatedLoi.état = 'rejetée';
        }
        
        return updatedLoi;
      }
      return l;
    }));
  };
  
  // Fonctions pour l'histoire
  const addHistoireEntry = (entry: Omit<HistoireEntry, 'id'>) => {
    const newEntry: HistoireEntry = {
      ...entry,
      id: uuidv4()
    };
    
    setHistoireEntries(prev => [...prev, newEntry]);
  };
  
  // Fonction pour mettre à jour l'équilibre global
  const updateEquilibre = (newValues: Partial<Equilibre>) => {
    setEquilibre(prev => ({
      ...prev,
      ...newValues
    }));
  };
  
  // Value à fournir au contexte
  const contextValue: MaitreJeuContextType = {
    // Temps
    currentYear,
    currentSeason,
    currentPhase,
    advanceTime,
    changePhase,
    
    // Sénateurs
    senateurs,
    updateSenateur,
    assignSenateurToPlayer,
    
    // Provinces
    provinces,
    updateProvince,
    
    // Équilibre
    equilibre,
    updateEquilibre,
    
    // Événements
    evenements,
    addEvenement,
    resolveEvenement,
    
    // Élections
    elections,
    planifierElection,
    addCandidateToElection,
    
    // Lois
    lois,
    proposerLoi,
    voterLoi,
    
    // Histoire
    histoireEntries,
    addHistoireEntry
  };
  
  return (
    <MaitreJeuContext.Provider value={contextValue}>
      {children}
    </MaitreJeuContext.Provider>
  );
};

export default MaitreJeuContext;
