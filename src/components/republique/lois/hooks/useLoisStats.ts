
import { useState, useEffect } from 'react';

interface LoisStatsData {
  activeLaws: {
    count: number;
    trend: 'up' | 'down' | 'neutral';
    trendValue: string;
    info?: string;
  };
  proposals: {
    count: number;
    trend: 'up' | 'down' | 'neutral';
    trendValue: string;
    info?: string;
  };
  lawRespect: {
    value: string;
    trend: 'up' | 'down' | 'neutral';
    trendValue: string;
    info?: string;
  };
  censures: {
    count: number;
    trend: 'up' | 'down' | 'neutral';
    trendValue: string;
    info?: string;
  };
  edicts: {
    count: number;
    trend: 'up' | 'down' | 'neutral';
    trendValue: string;
    info?: string;
  };
}

export const useLoisStats = () => {
  const [stats, setStats] = useState<LoisStatsData>({
    activeLaws: {
      count: 42,
      trend: 'up',
      trendValue: '+3',
      info: '5 nouvelles'
    },
    proposals: {
      count: 7,
      trend: 'up',
      trendValue: '+2',
      info: 'Urgent'
    },
    lawRespect: {
      value: 'Élevé',
      trend: 'up',
      trendValue: '+7%',
      info: 'Stable'
    },
    censures: {
      count: 4,
      trend: 'down',
      trendValue: '-1',
      info: 'Récent: Tribunat'
    },
    edicts: {
      count: 12,
      trend: 'up',
      trendValue: '+2',
      info: '3 contentieux'
    }
  });

  // Ici, on pourrait ajouter une logique pour charger les données depuis une API
  // useEffect(() => {
  //   const fetchStats = async () => {
  //     // Appel API pour récupérer les statistiques des lois
  //   };
  //   
  //   fetchStats();
  // }, []);

  return { stats };
};
