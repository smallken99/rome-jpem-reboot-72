
import { GameDate } from '@/utils/types/gameDate';

export interface Province {
  id: string;
  nom: string;               // Nom de la province
  status: string;            // Statut de la province (pacifiée, instable, rebelle)
  statut?: string;           // Alias pour status pour compatibilité
  gouverneur?: string;       // Gouverneur actuel
  région: string;            // Région géographique
  population: number;        // Population totale
  richesse: number;          // Richesse générale
  ressources: string[];      // Ressources disponibles
  resources?: string[];      // Alias pour ressources
  mécontentement?: number;   // Niveau de mécontentement (0-100)
  romanisation?: number;     // Niveau de romanisation (0-100)
  prospérité?: number;       // Niveau de prospérité économique (0-100)
  stabilité?: number;        // Niveau de stabilité politique (0-100)
  dateConquete?: GameDate;   // Date de conquête
  tauxImposition?: number;   // Taux d'imposition appliqué
  garnison?: number;         // Taille de la garnison
  revenuAnnuel: number;      // Revenu annuel généré
  
  // Propriétés additionnelles
  capital?: string;          // Capitale de la province
  villes?: string[];         // Principales villes
  religion?: string;         // Religion dominante
  description?: string;      // Description textuelle
  dateAnnexion?: GameDate;   // Date d'annexion
  dateFormation?: GameDate;  // Date de formation
  cultures?: string[];       // Cultures présentes
  strategieImportance?: number; // Importance stratégique (0-100)
  distance?: number;         // Distance de Rome
}
