
import { GameDate } from './common';

export interface SenateurJouable {
  id: string;
  nom: string;
  prenom: string;
  gens: string;
  name?: string; // For compatibility with /types/character
  gender: 'male' | 'female';
  age: number;
  actif: boolean;
  faction: string;
  clientele: number;
  influence: number;
  prestige: number;
  richesse: number;
  fonction?: string;
  magistrature?: string;
  appartenance?: string;
  playerId?: string;
  allies: string[];
  ennemis: string[];
  competences?: Record<string, number>;
  attributes?: Record<string, number>;
  background?: string;
  famille?: string;
  dateNaissance?: GameDate;
  dateMort?: GameDate;
  portrait?: string;
  notes?: string;
  
  // Additional attributes for compatibility
  popularite?: number;
  militaire?: number;
  piete?: number;
  eloquence?: number;
  joueur?: boolean;
  statut?: string;
  roles?: string[];
  diplomatie?: Record<string, any>;
}

// Converter function to ensure a senateur object has all required properties
export function normalizeSenateurJouable(senateur: Partial<SenateurJouable>): SenateurJouable {
  return {
    id: senateur.id || `sen-${Date.now()}`,
    nom: senateur.nom || '',
    prenom: senateur.prenom || '',
    gens: senateur.gens || '',
    name: senateur.name || `${senateur.prenom || ''} ${senateur.nom || ''}`,
    gender: senateur.gender || 'male',
    age: senateur.age || 30,
    actif: senateur.actif !== undefined ? senateur.actif : true,
    faction: senateur.faction || 'Inconnue',
    clientele: senateur.clientele || 0,
    influence: senateur.influence || 0,
    prestige: senateur.prestige || 0,
    richesse: senateur.richesse || 0,
    fonction: senateur.fonction,
    magistrature: senateur.magistrature,
    appartenance: senateur.appartenance,
    playerId: senateur.playerId,
    allies: senateur.allies || [],
    ennemis: senateur.ennemis || [],
    competences: senateur.competences || {},
    attributes: senateur.attributes || {},
    background: senateur.background,
    famille: senateur.famille || 'Inconnue',
    dateNaissance: senateur.dateNaissance,
    dateMort: senateur.dateMort,
    portrait: senateur.portrait,
    notes: senateur.notes,
    popularite: senateur.popularite || 0,
    militaire: senateur.militaire || 0,
    piete: senateur.piete || 0,
    eloquence: senateur.eloquence || 0,
    joueur: senateur.joueur || false,
    statut: senateur.statut || 'actif',
    roles: senateur.roles || [],
    diplomatie: senateur.diplomatie || {}
  };
}
