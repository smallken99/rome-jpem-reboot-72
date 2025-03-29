
export interface Slave {
  id: string;
  name: string;
  gender: string;
  age: number;
  skills: string[];
  level: number;
  price: number;
  health: number;
  origin: string;
  assignment?: string;
  buildingId?: string;
}

export interface SlaveAssignment {
  buildingId: string;
  buildingName: string;
  count: number;
  efficiency: number;
}
