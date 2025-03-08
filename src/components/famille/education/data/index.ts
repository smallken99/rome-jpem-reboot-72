
import { PreceptorsByType, Preceptor } from '../types/educationTypes';
import { generateRomanName } from './romanNames';
import { assignRandomTitle } from './titles';
import { v4 as uuidv4 } from 'uuid';

// Liste des spécialités possibles pour les précepteurs
const specialties = [
  'Rhétorique', 'Droit romain', 'Philosophie stoïcienne', 'Tactique militaire', 'Art oratoire',
  'Stratégie militaire', 'Rituel religieux', 'Augure', 'Divination', 'Commerce maritime',
  'Négociation marchande', 'Diplomatie', 'Histoire romaine', 'Mathématiques', 'Astronomie',
  'Poésie', 'Littérature grecque', 'Médecine', 'Ingénierie militaire', 'Architecture'
];

// Générer un background aléatoire pour un précepteur
const generateBackground = (speciality: string, quality: number): string => {
  const backgrounds = [
    `Formé dans les meilleures écoles d'Athènes, ce précepteur a enseigné à de nombreux jeunes patriciens.`,
    `Ancien esclave grec affranchi pour ses connaissances exceptionnelles.`,
    `Vétéran de l'armée romaine reconverti dans l'enseignement.`,
    `Issu d'une famille de lettrés étrusques, il a étudié à Rome et en Grèce.`,
    `Ancien magistrat qui a décidé de transmettre son savoir après une longue carrière.`,
    `Philosophe errant qui a voyagé dans tout le monde méditerranéen avant de s'installer à Rome.`,
    `Fils d'un célèbre orateur, il a appris aux côtés des plus grands maîtres de l'éloquence.`
  ];

  // Ajouter des éléments spécifiques selon la qualité
  const qualityAdditions = [
    `Ses méthodes sont rudimentaires mais efficaces.`,
    `Il manque parfois de patience avec les élèves les moins doués.`,
    `Reconnu pour sa pédagogie adaptée à chaque élève.`,
    `Sa réputation d'excellence est connue dans toute la République.`,
    `On dit que même les Sénateurs viennent lui demander conseil.`
  ];

  const qualityIndex = Math.min(Math.floor(quality / 2), qualityAdditions.length - 1);
  
  return `${backgrounds[Math.floor(Math.random() * backgrounds.length)]} ${qualityAdditions[qualityIndex]} Spécialisé en ${speciality}.`;
};

// Générer un précepteur aléatoire
const generatePreceptor = (speciality?: string): Preceptor => {
  const id = uuidv4();
  const actualSpeciality = speciality || specialties[Math.floor(Math.random() * specialties.length)];
  const quality = Math.floor(Math.random() * 10) + 1;
  const reputation = Math.floor(quality * 0.8 * 10);
  const cost = 50 + (quality * 25) + (Math.floor(Math.random() * 50));
  const name = generateRomanName();
  const title = assignRandomTitle(actualSpeciality);
  const background = generateBackground(actualSpeciality, quality);
  
  return {
    id,
    name: `${title} ${name}`,
    speciality: actualSpeciality,
    reputation,
    quality,
    cost,
    available: Math.random() > 0.3, // 70% des précepteurs sont disponibles
    background
  };
};

// Générer une liste de précepteurs par spécialité
export const generatePreceptors = (): Record<string, Preceptor[]> => {
  const result: Record<string, Preceptor[]> = {};
  
  // Générer 3-5 précepteurs pour chaque spécialité
  specialties.forEach(speciality => {
    const count = Math.floor(Math.random() * 3) + 3;
    const typePreceptors = Array.from({ length: count }, () => generatePreceptor(speciality));
    result[speciality] = typePreceptors;
  });
  
  return result;
};
