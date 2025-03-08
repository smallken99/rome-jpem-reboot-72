
import { generateRomanName } from './romanNames';
import { assignRandomTitle } from './titles';
import { v4 as uuidv4 } from 'uuid';
import { allSpecialties } from './specialties';

// Fonction pour déterminer la réputation du précepteur en fonction de sa qualité
export const getReputationFromQuality = (quality: number): "Excellent" | "Bon" | "Moyen" => {
  if (quality >= 8) return "Excellent";
  if (quality >= 5) return "Bon";
  return "Moyen";
};

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
export const generatePreceptor = (speciality?: string) => {
  const id = uuidv4();
  const actualSpeciality = speciality || allSpecialties[Math.floor(Math.random() * allSpecialties.length)];
  const quality = Math.floor(Math.random() * 10) + 1;
  const reputation = getReputationFromQuality(quality);
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
    background,
    childId: null  // Ajout de la propriété childId pour le suivi des assignations
  };
};

// Générer une liste de précepteurs par spécialité
export const generatePreceptors = () => {
  const result: Record<string, any[]> = {};
  
  // Générer 3-5 précepteurs pour chaque spécialité
  allSpecialties.forEach(speciality => {
    const count = Math.floor(Math.random() * 3) + 3;
    const typePreceptors = Array.from({ length: count }, () => generatePreceptor(speciality));
    result[speciality] = typePreceptors;
  });
  
  return result;
};

// Exporter les spécialités pour être utilisées ailleurs
export { allSpecialties as specialties } from './specialties';
export { specialties } from './specialties';
export { romanNamePrefixes, romanNameSuffixes } from './romanNames';
export { titles } from './titles';
