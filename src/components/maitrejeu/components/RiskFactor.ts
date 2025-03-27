
export interface RiskFactor {
  id: string;
  name: string;
  severity: string;
  description: string;
  level: number;
  type: string;
  impact: number;
  trend: 'up' | 'down' | 'stable';
}
