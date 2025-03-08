
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  Evenement, 
  HistoireEntry, 
  PoliticalEvent, 
  ProvinceData, 
  SenateurJouable 
} from '../types/maitreJeuTypes';

interface MaitreJeuContextType {
  // État du jeu
  anneeActuelle: string;
  phaseActuelle: number;
  
  // Équilibre de la république
  stabiliteSenat: number;
  stabilitePopulaire: number;
  stabiliteMilitaire: number;
  
  // Histoire et événements
  evenements: Evenement[];
  histoireEntries: HistoireEntry[];
  politicalEvents: PoliticalEvent[];
  
  // Provinces et territoires
  provinces: ProvinceData[];
  
  // Sénateurs et joueurs
  senateursJouables: SenateurJouable[];
  senateursAssignes: Record<string, string>;
  
  // Actions
  updateEquilibre: (type: 'senat' | 'populaire' | 'militaire', value: number) => void;
  addHistoryEntry: (entry: Omit<HistoireEntry, 'id' | 'date'>) => void;
  updateHistoryEntry: (id: string, updates: Partial<HistoireEntry>) => void;
  removeHistoryEntry: (id: string) => void;
  addEvent: (event: Omit<Evenement, 'id'>) => void;
  updateEvent: (id: string, updates: Partial<Evenement>) => void;
  removeEvent: (id: string) => void;
  addProvince: (province: Omit<ProvinceData, 'id'>) => void;
  updateProvince: (id: string, updates: Partial<ProvinceData>) => void;
  removeProvince: (id: string) => void;
  assignSenateurToPlayer: (senateurId: string, playerId: string) => void;
  unassignSenateur: (senateurId: string) => void;
  advancePhase: () => void;
  advanceYear: () => void;
  triggerRandomEvent: () => void;
}

const MaitreJeuContext = createContext<MaitreJeuContextType | undefined>(undefined);

export const MaitreJeuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // État initial du jeu
  const [anneeActuelle, setAnneeActuelle] = useState('703 AUC');
  const [phaseActuelle, setPhaseActuelle] = useState(1);
  
  // Équilibre de la république
  const [stabiliteSenat, setStabiliteSenat] = useState(50);
  const [stabilitePopulaire, setStabilitePopulaire] = useState(50);
  const [stabiliteMilitaire, setStabiliteMilitaire] = useState(50);
  
  // Histoire et événements
  const [evenements, setEvenements] = useState<Evenement[]>([]);
  const [histoireEntries, setHistoireEntries] = useState<HistoireEntry[]>([]);
  const [politicalEvents, setPoliticalEvents] = useState<PoliticalEvent[]>([]);
  
  // Provinces et territoires
  const [provinces, setProvinces] = useState<ProvinceData[]>([]);
  
  // Sénateurs et joueurs
  const [senateursJouables, setSenateursJouables] = useState<SenateurJouable[]>([]);
  const [senateursAssignes, setSenateursAssignes] = useState<Record<string, string>>({});
  
  // Charger les données initiales
  useEffect(() => {
    // Simuler le chargement des données depuis une API
    // Pour l'instant, utilisons des données fictives
    setEvenements([
      { 
        id: '1', 
        titre: 'Soulèvement en Gaule',
        description: 'Des tribus gauloises se sont révoltées dans la province de la Gaule Cisalpine',
        type: 'militaire',
        impact: { militaire: -10, populaire: -5, senat: 0 },
        dateCreation: new Date(),
        statut: 'pending'
      },
      { 
        id: '2', 
        titre: 'Famine à Rome',
        description: 'Les réserves de grain sont au plus bas, provoquant une hausse des prix',
        type: 'civil',
        impact: { militaire: 0, populaire: -15, senat: -5 },
        dateCreation: new Date(),
        statut: 'active'
      }
    ]);
    
    setHistoireEntries([
      {
        id: '1',
        titre: 'Fondation de la République',
        contenu: 'Après l\'expulsion du dernier roi, Tarquin le Superbe, la République est instaurée.',
        annee: '510 av. J.-C.',
        importance: 'majeure',
        date: new Date('2023-01-01')
      },
      {
        id: '2',
        titre: 'Première Guerre Punique',
        contenu: 'Rome entre en conflit avec Carthage pour le contrôle de la Sicile.',
        annee: '264-241 av. J.-C.',
        importance: 'majeure',
        date: new Date('2023-02-15')
      }
    ]);
    
    setProvinces([
      {
        id: '1',
        nom: 'Italia',
        statut: 'core',
        richesse: 100,
        stabilite: 95,
        gouverneur: null,
        ressources: ['grain', 'vin', 'huile', 'marbre'],
        population: 5000000,
        troupes: 20000,
        villes: ['Rome', 'Neapolis', 'Tarentum']
      },
      {
        id: '2',
        nom: 'Sicilia',
        statut: 'province',
        richesse: 80,
        stabilite: 70,
        gouverneur: 'Gaius Flaminius',
        ressources: ['grain', 'poisson', 'vin'],
        population: 800000,
        troupes: 5000,
        villes: ['Syracuse', 'Messana']
      }
    ]);
    
    setSenateursJouables([
      {
        id: '1',
        nom: 'Marcus Junius Brutus',
        famille: 'Junii',
        influence: 75,
        richesse: 80,
        commandement: 60,
        eloquence: 85,
        loyaute: 70,
        traits: ['Stoïcien', 'Républicain convaincu']
      },
      {
        id: '2',
        nom: 'Quintus Caecilius Metellus',
        famille: 'Caecilii',
        influence: 70,
        richesse: 90,
        commandement: 65,
        eloquence: 60,
        loyaute: 75,
        traits: ['Conservateur', 'Pragmatique']
      }
    ]);
  }, []);
  
  // Mettre à jour l'équilibre de la république
  const updateEquilibre = (type: 'senat' | 'populaire' | 'militaire', value: number) => {
    switch(type) {
      case 'senat':
        setStabiliteSenat(prev => Math.max(0, Math.min(100, prev + value)));
        break;
      case 'populaire':
        setStabilitePopulaire(prev => Math.max(0, Math.min(100, prev + value)));
        break;
      case 'militaire':
        setStabiliteMilitaire(prev => Math.max(0, Math.min(100, prev + value)));
        break;
    }
    
    toast.success(`Équilibre ${type} mis à jour (${value > 0 ? '+' : ''}${value})`);
  };
  
  // Ajouter une entrée dans l'histoire
  const addHistoryEntry = (entry: Omit<HistoireEntry, 'id' | 'date'>) => {
    const newEntry: HistoireEntry = {
      ...entry,
      id: Date.now().toString(),
      date: new Date()
    };
    
    setHistoireEntries(prev => [...prev, newEntry]);
    toast.success(`Entrée historique "${entry.titre}" ajoutée`);
  };
  
  // Mettre à jour une entrée historique
  const updateHistoryEntry = (id: string, updates: Partial<HistoireEntry>) => {
    setHistoireEntries(prev => 
      prev.map(entry => entry.id === id ? { ...entry, ...updates } : entry)
    );
    toast.success(`Entrée historique mise à jour`);
  };
  
  // Supprimer une entrée historique
  const removeHistoryEntry = (id: string) => {
    setHistoireEntries(prev => prev.filter(entry => entry.id !== id));
    toast.success(`Entrée historique supprimée`);
  };
  
  // Ajouter un événement
  const addEvent = (event: Omit<Evenement, 'id'>) => {
    const newEvent: Evenement = {
      ...event,
      id: Date.now().toString()
    };
    
    setEvenements(prev => [...prev, newEvent]);
    toast.success(`Événement "${event.titre}" ajouté`);
  };
  
  // Mettre à jour un événement
  const updateEvent = (id: string, updates: Partial<Evenement>) => {
    setEvenements(prev => 
      prev.map(event => event.id === id ? { ...event, ...updates } : event)
    );
    toast.success(`Événement mis à jour`);
  };
  
  // Supprimer un événement
  const removeEvent = (id: string) => {
    setEvenements(prev => prev.filter(event => event.id !== id));
    toast.success(`Événement supprimé`);
  };
  
  // Ajouter une province
  const addProvince = (province: Omit<ProvinceData, 'id'>) => {
    const newProvince: ProvinceData = {
      ...province,
      id: Date.now().toString()
    };
    
    setProvinces(prev => [...prev, newProvince]);
    toast.success(`Province "${province.nom}" ajoutée`);
  };
  
  // Mettre à jour une province
  const updateProvince = (id: string, updates: Partial<ProvinceData>) => {
    setProvinces(prev => 
      prev.map(province => province.id === id ? { ...province, ...updates } : province)
    );
    toast.success(`Province mise à jour`);
  };
  
  // Supprimer une province
  const removeProvince = (id: string) => {
    setProvinces(prev => prev.filter(province => province.id !== id));
    toast.success(`Province supprimée`);
  };
  
  // Assigner un sénateur à un joueur
  const assignSenateurToPlayer = (senateurId: string, playerId: string) => {
    setSenateursAssignes(prev => ({
      ...prev,
      [senateurId]: playerId
    }));
    toast.success(`Sénateur assigné au joueur`);
  };
  
  // Désassigner un sénateur
  const unassignSenateur = (senateurId: string) => {
    setSenateursAssignes(prev => {
      const newAssignments = { ...prev };
      delete newAssignments[senateurId];
      return newAssignments;
    });
    toast.success(`Sénateur désassigné`);
  };
  
  // Avancer d'une phase
  const advancePhase = () => {
    setPhaseActuelle(prev => (prev % 4) + 1);
    toast.success(`Passage à la phase ${(phaseActuelle % 4) + 1}`);
  };
  
  // Avancer d'une année
  const advanceYear = () => {
    // Extraire l'année numérique actuelle
    const anneeMatch = anneeActuelle.match(/(\d+)/);
    if (anneeMatch) {
      const anneeNum = parseInt(anneeMatch[0]);
      setAnneeActuelle(`${anneeNum + 1} AUC`);
      
      // Réinitialiser la phase
      setPhaseActuelle(1);
      
      toast.success(`Passage à l'année ${anneeNum + 1} AUC`);
    }
  };
  
  // Déclencher un événement aléatoire
  const triggerRandomEvent = () => {
    const eventTypes = ['militaire', 'civil', 'politique', 'religieux', 'naturel'];
    const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
    
    let title, description, impact;
    
    switch(type) {
      case 'militaire':
        title = 'Attaque barbare';
        description = 'Des tribus barbares ont attaqué des colonies aux frontières nord.';
        impact = { militaire: -5, populaire: -3, senat: 0 };
        break;
      case 'civil':
        title = 'Pénurie alimentaire';
        description = 'Les stocks de grain sont insuffisants pour nourrir la plèbe.';
        impact = { militaire: 0, populaire: -10, senat: -3 };
        break;
      case 'politique':
        title = 'Scandale au Sénat';
        description = 'Un sénateur a été surpris à accepter des pots-de-vin.';
        impact = { militaire: 0, populaire: -2, senat: -8 };
        break;
      case 'religieux':
        title = 'Mauvais présages';
        description = 'Les augures rapportent des présages inquiétants pour l\'avenir de Rome.';
        impact = { militaire: -1, populaire: -5, senat: -2 };
        break;
      case 'naturel':
        title = 'Inondation du Tibre';
        description = 'Le Tibre a débordé, inondant les quartiers bas de la ville.';
        impact = { militaire: 0, populaire: -7, senat: 0 };
        break;
      default:
        title = 'Événement mystérieux';
        description = 'Un événement étrange s\'est produit à Rome.';
        impact = { militaire: -2, populaire: -2, senat: -2 };
    }
    
    const newEvent: Omit<Evenement, 'id'> = {
      titre: title,
      description: description,
      type: type as any,
      impact,
      dateCreation: new Date(),
      statut: 'pending'
    };
    
    addEvent(newEvent);
    
    // Appliquer l'impact immédiatement
    updateEquilibre('senat', impact.senat);
    updateEquilibre('populaire', impact.populaire);
    updateEquilibre('militaire', impact.militaire);
  };
  
  return (
    <MaitreJeuContext.Provider value={{
      anneeActuelle,
      phaseActuelle,
      stabiliteSenat,
      stabilitePopulaire,
      stabiliteMilitaire,
      evenements,
      histoireEntries,
      politicalEvents,
      provinces,
      senateursJouables,
      senateursAssignes,
      updateEquilibre,
      addHistoryEntry,
      updateHistoryEntry,
      removeHistoryEntry,
      addEvent,
      updateEvent,
      removeEvent,
      addProvince,
      updateProvince,
      removeProvince,
      assignSenateurToPlayer,
      unassignSenateur,
      advancePhase,
      advanceYear,
      triggerRandomEvent
    }}>
      {children}
    </MaitreJeuContext.Provider>
  );
};

export const useMaitreJeu = () => {
  const context = useContext(MaitreJeuContext);
  if (context === undefined) {
    throw new Error('useMaitreJeu must be used within a MaitreJeuProvider');
  }
  return context;
};
