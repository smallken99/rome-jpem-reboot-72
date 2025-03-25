
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { getRepublicData, currentRepublicData } from '@/data/republic/republicData';
import { RepublicEquilibre, PoliticalFaction, Election, Province, RepublicStatistics } from '@/types/republic';
import { v4 as uuidv4 } from 'uuid';

export const useRepublicData = () => {
  const [republicData, setRepublicData] = useState(() => getRepublicData());
  const [equiplibre, setEquilibre] = useState<RepublicEquilibre>({
    populares: 33,
    populaires: 33, // Pour compatibilité
    optimates: 45,
    moderates: 22,
    armée: 70,
    économie: 65,
    morale: 60,
    loyauté: 75,
    patriciens: 80,
    plébéiens: 45,
    population: 750000 // Ajout du champ population requis
  });
  
  const [elections, setElections] = useState<Election[]>([
    {
      id: '1',
      magistrature: 'CONSUL',
      year: 705,
      season: 'SUMMER',
      status: 'scheduled'
    },
    {
      id: '2',
      magistrature: 'PRETEUR',
      year: 705,
      season: 'AUTUMN',
      status: 'scheduled'
    }
  ]);

  // Fonctions pour gérer l'équilibre politique
  const updateFactionBalance = useCallback((populaires: number, optimates: number, moderates: number) => {
    setEquilibre(prev => ({
      ...prev,
      populaires,
      populares: populaires, // Mettre à jour les deux pour la compatibilité
      optimates,
      moderates
    }));
  }, []);

  const updateRepublicFactor = useCallback((factor: keyof RepublicEquilibre, value: number) => {
    setEquilibre(prev => ({
      ...prev,
      [factor]: value
    }));
  }, []);

  // Fonctions pour gérer les élections
  const scheduleElection = useCallback((magistrature: string, year: number, season: string): string => {
    const newElection: Election = {
      id: uuidv4(),
      magistrature,
      year,
      annee: year, // Pour compatibilité
      season,
      saison: season, // Pour compatibilité
      status: 'scheduled'
    };
    
    setElections(prev => [...prev, newElection]);
    toast.success(`Élection pour ${magistrature} programmée pour ${season} ${year}`);
    return newElection.id;
  }, []);

  const updateElectionStatus = useCallback((electionId: string, status: Election['status']) => {
    setElections(prev => 
      prev.map(election => 
        election.id === electionId 
          ? { ...election, status } 
          : election
      )
    );
  }, []);

  const cancelElection = useCallback((electionId: string) => {
    updateElectionStatus(electionId, 'cancelled');
    toast.success('L\'élection a été annulée');
  }, [updateElectionStatus]);

  const completeElection = useCallback((electionId: string, winner: string) => {
    setElections(prev => 
      prev.map(election => 
        election.id === electionId 
          ? { ...election, status: 'completed', winner } 
          : election
      )
    );
    toast.success(`Élection terminée. ${winner} a été élu.`);
  }, []);

  // Fonctions pour gérer les provinces
  const updateProvince = useCallback((provinceId: string, updates: Partial<Province>) => {
    setRepublicData(prev => {
      const updatedProvinces = prev.territories.provinces.map(province => 
        province.id === provinceId 
          ? { ...province, ...updates } 
          : province
      );
      
      return {
        ...prev,
        territories: {
          ...prev.territories,
          provinces: updatedProvinces
        }
      };
    });
  }, []);

  const addProvince = useCallback((province: Omit<Province, 'id'>): string => {
    const newProvince: Province = {
      ...province,
      id: uuidv4()
    };
    
    setRepublicData(prev => ({
      ...prev,
      territories: {
        ...prev.territories,
        provinces: [...prev.territories.provinces, newProvince]
      }
    }));
    
    toast.success(`Province ${province.name} ajoutée`);
    return newProvince.id;
  }, []);

  // Fonction pour obtenir les statistiques de la république
  const getRepublicStatistics = useCallback((): RepublicStatistics => {
    return {
      population: {
        total: republicData.population.total,
        patricians: republicData.population.patricians,
        plebeians: republicData.population.plebeians,
        slaves: republicData.population.slaves,
        growth: republicData.population.growth,
        satisfaction: republicData.population.satisfaction
      },
      economy: {
        treasury: republicData.treasury.balance,
        annualRevenue: republicData.treasury.annualRevenue,
        annualExpenses: republicData.treasury.annualExpenses,
        taxRate: 5, // Valeur par défaut
        inflation: 2 // Valeur par défaut
      },
      military: {
        legions: republicData.military.legions,
        totalSoldiers: republicData.military.totalSoldiers,
        readiness: republicData.military.readiness,
        morale: republicData.military.morale
      },
      politics: {
        senateApproval: republicData.politics.senateApproval,
        plebsApproval: republicData.politics.plebsApproval,
        patricianApproval: republicData.politics.patricianApproval,
        politicalStability: republicData.politics.politicalStability
      }
    };
  }, [republicData]);

  // Fonction pour obtenir les données des factions politiques pour les graphiques
  const getPoliticalFactions = useCallback((): PoliticalFaction[] => {
    return republicData.politics.factions.map(faction => ({
      ...faction,
      color: faction.alignment === 'optimates' 
        ? '#3b82f6' 
        : faction.alignment === 'populares'
          ? '#ef4444'
          : '#84cc16'
    }));
  }, [republicData]);

  return {
    republicData,
    updateFactionBalance,
    updateRepublicFactor,
    equiplibre,
    elections,
    scheduleElection,
    updateElectionStatus,
    cancelElection,
    completeElection,
    updateProvince,
    addProvince,
    getRepublicStatistics,
    getPoliticalFactions
  };
};
