
export interface LandParcel {
  id: string;
  name: string;
  location: string;
  size: number;
  type: 'cultivable' | 'pastoral' | 'forest' | 'wetland' | 'rocky';
  status: 'available' | 'allocated' | 'disputed' | 'protected';
  value: number;
  allocation?: {
    familyId?: string;
    familyName?: string;
    since?: string;
    until?: string;
  };
  coordinates?: {
    x: number;
    y: number;
  };
  resources?: {
    fertility?: number;
    water?: number;
    minerals?: number;
  };
  description?: string;
}
