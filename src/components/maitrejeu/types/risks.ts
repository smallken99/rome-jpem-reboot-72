
import { RiskType } from './equilibre';

export interface Risk {
  id: string;
  type: RiskType;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  probability: number;
  impact: number;
  createdAt: Date;
  active: boolean;
}

export interface RiskCreationData {
  type: RiskType;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  probability?: number;
  impact?: number;
}
