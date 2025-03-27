
import { Preceptor, EducationType } from '../types/educationTypes';
import { romanNames } from './romanNames';

// Base de données des précepteurs par type d'éducation
const preceptors: Record<string, Preceptor[]> = {
  military: [
    {
      id: 'mil1',
      name: 'Titus Caesonius',
      specialty: 'military',
      price: 2500,
      experience: 12,
      quality: 8,
      description: 'Ancien centurion avec une vaste expérience des campagnes militaires en Gaule.'
    },
    {
      id: 'mil2',
      name: 'Marcus Velius',
      specialty: 'military',
      price: 1800,
      experience: 8,
      quality: 6,
      description: 'Spécialiste en tactiques de combat rapproché et en entraînement à la gladiature.'
    },
    {
      id: 'mil3',
      name: 'Gaius Hostilius',
      specialty: 'military',
      price: 1200,
      experience: 5,
      quality: 4,
      description: 'Jeune officier, excellent formateur pour les exercices militaires de base.'
    }
  ],
  
  rhetoric: [
    {
      id: 'rhet1',
      name: 'Quintus Porcius',
      specialty: 'rhetoric',
      price: 3000,
      experience: 15,
      quality: 9,
      description: 'Ancien consul et orateur renommé, ses élèves brillent au Sénat.'
    },
    {
      id: 'rhet2',
      name: 'Lucius Munatius',
      specialty: 'rhetoric',
      price: 2200,
      experience: 10,
      quality: 7,
      description: 'Avocat célèbre au Forum, maître de l\'art oratoire et des plaidoiries.'
    },
    {
      id: 'rhet3',
      name: 'Sextus Vitellius',
      specialty: 'rhetoric',
      price: 1500,
      experience: 6,
      quality: 5,
      description: 'Enseignant de rhétorique grecque et latine, bon pour les débutants.'
    }
  ],
  
  religious: [
    {
      id: 'rel1',
      name: 'Publius Valerius',
      specialty: 'religious',
      price: 2800,
      experience: 18,
      quality: 8,
      description: 'Ancien augure, expert en divination et interprétation des présages.'
    },
    {
      id: 'rel2',
      name: 'Manius Acilius',
      specialty: 'religious',
      price: 2000,
      experience: 12,
      quality: 7,
      description: 'Prêtre de Jupiter, connaisseur des rites et cérémonies traditionnels.'
    },
    {
      id: 'rel3',
      name: 'Cornelia Metella',
      specialty: 'religious',
      price: 3500,
      experience: 25,
      quality: 9,
      description: 'Ancienne Vestale, rare préceptrice pour les jeunes filles destinées aux ordres religieux.'
    }
  ],
  
  academic: [
    {
      id: 'acad1',
      name: 'Servius Sulpicius',
      specialty: 'academic',
      price: 2500,
      experience: 20,
      quality: 8,
      description: 'Érudit, a étudié à Athènes, spécialiste en philosophie et mathématiques.'
    },
    {
      id: 'acad2',
      name: 'Aulus Postumius',
      specialty: 'academic',
      price: 1800,
      experience: 14,
      quality: 6,
      description: 'Historien et grammairien, auteur de plusieurs traités pédagogiques.'
    },
    {
      id: 'acad3',
      name: 'Tiberius Claudius',
      specialty: 'academic',
      price: 2200,
      experience: 15,
      quality: 7,
      description: 'Expert en littérature grecque et latine, ancien bibliothécaire.'
    }
  ],
  
  political: [
    {
      id: 'pol1',
      name: 'Gnaeus Pompeius',
      specialty: 'political',
      price: 3200,
      experience: 22,
      quality: 9,
      description: 'Ancien sénateur, maître des intrigues politiques et du cursus honorum.'
    },
    {
      id: 'pol2',
      name: 'Decimus Junius',
      specialty: 'political',
      price: 2600,
      experience: 16,
      quality: 7,
      description: 'Expert en droit public et en administration provinciale.'
    },
    {
      id: 'pol3',
      name: 'Appius Claudius',
      specialty: 'political',
      price: 1900,
      experience: 10,
      quality: 6,
      description: 'Spécialiste des relations entre patriciens et plébéiens, bon négociateur.'
    }
  ]
};

// Fonction pour obtenir les précepteurs d'un type spécifique
export const getPreceptorsForType = (type: string): Preceptor[] => {
  if (type === 'none') return [];
  return preceptors[type] || [];
};

// Fonction pour obtenir un précepteur spécifique par ID
export const getPreceptorById = (id: string): Preceptor | undefined => {
  for (const type in preceptors) {
    const found = preceptors[type].find(p => p.id === id);
    if (found) return found;
  }
  return undefined;
};

// Fonction pour obtenir tous les précepteurs
export const getAllPreceptors = (): Preceptor[] => {
  return Object.values(preceptors).flat();
};
