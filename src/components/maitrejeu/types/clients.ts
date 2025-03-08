
import { ClientType, ClientInfluence } from '@/components/clientele/ClientCard';

export interface Client {
  id: string;
  name: string;
  type: ClientType;
  subType: string;
  location: string;
  loyalty: string;
  influences: ClientInfluence;
  assignedToSenateurId?: string;
}

export type ClientCreationData = Omit<Client, 'id'>;
