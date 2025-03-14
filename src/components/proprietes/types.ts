
import { GameDate } from '@/components/maitrejeu/types/common';

export interface ResourceTransaction {
  id?: string;
  resourceName: string;
  resourceId?: string;
  quantity: number;
  unit: string;
  type: 'achat' | 'vente' | 'transfert';
  date: Date | GameDate;
  price?: number;
  currency?: string;
  seller?: string;
  buyer?: string;
  notes?: string;
}
