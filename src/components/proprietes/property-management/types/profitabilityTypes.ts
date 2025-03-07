
// Types pour le module de rentabilité
export interface BuildingData {
  name: string;
  revenus: number;
  depenses: number;
  icon: React.ReactNode;
}

export interface RevenueSource {
  name: string;
  value: number;
  color: string;
}

export interface ProfitableProperty {
  name: string;
  type: string;
  revenue: number;
  expenses: number;
  roi: number;
  trend: 'up' | 'down' | 'neutral';
}

export interface ProfitabilityState {
  activeView: 'yearly' | 'monthly';
  setActiveView: (view: 'yearly' | 'monthly') => void;
}
