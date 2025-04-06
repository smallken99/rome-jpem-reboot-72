
import { Preceptor, EducationType } from '../types/educationTypes';
import { v4 as uuidv4 } from 'uuid';

// Liste des précepteurs disponibles
export const preceptorsList: Preceptor[] = [
  {
    id: uuidv4(),
    name: "Marcus Tulius",
    specialty: "rhetoric",
    specialties: ["Éloquence", "Débat politique", "Composition littéraire"],
    expertise: 8,
    experience: 15,
    cost: 5000,
    price: 5000,
    available: true,
    skill: 8,
    quality: 4,
    description: "Ancien orateur du forum, réputé pour ses talents d'éloquence.",
    status: "available",
    traits: ["Éloquent", "Patient", "Méthodique"],
    background: "A enseigné aux fils de plusieurs familles patriciennes",
    reputation: 85
  },
  {
    id: uuidv4(),
    name: "Gaius Hostius",
    specialty: "military",
    specialties: ["Tactique militaire", "Commandement", "Combat à l'épée"],
    expertise: 9,
    experience: 20,
    cost: 7000,
    price: 7000,
    available: true,
    skill: 9,
    quality: 5,
    description: "Ancien centurion ayant servi sous plusieurs généraux célèbres.",
    status: "available",
    traits: ["Discipliné", "Rigoureux", "Intransigeant"],
    background: "A formé de nombreux jeunes nobles à l'art militaire",
    reputation: 90
  },
  {
    id: uuidv4(),
    name: "Publius Demetrius",
    specialty: "political",
    specialties: ["Droit romain", "Administration provinciale", "Négociation"],
    expertise: 7,
    experience: 12,
    cost: 6000,
    price: 6000,
    available: true,
    skill: 7,
    quality: 4,
    description: "Ancien conseiller sénatorial spécialisé dans les affaires politiques.",
    status: "available",
    traits: ["Avisé", "Diplomate", "Calculateur"],
    background: "A servi comme conseiller auprès de plusieurs consuls",
    reputation: 80
  },
  {
    id: uuidv4(),
    name: "Titus Clodius",
    specialty: "religious",
    specialties: ["Rites et cérémonies", "Divination", "Droit sacré"],
    expertise: 8,
    experience: 18,
    cost: 5500,
    price: 5500,
    available: true,
    skill: 8,
    quality: 4,
    description: "Ancien augure reconverti dans l'enseignement religieux.",
    status: "available",
    traits: ["Pieux", "Rigoureux", "Mystérieux"],
    background: "A servi comme assistant auprès du Pontifex Maximus",
    reputation: 85
  },
  {
    id: uuidv4(),
    name: "Lucius Cornelius",
    specialty: "philosophical",
    specialties: ["Philosophie stoïcienne", "Éthique", "Logique"],
    expertise: 9,
    experience: 25,
    cost: 8000,
    price: 8000,
    available: true,
    skill: 9,
    quality: 5,
    description: "Philosophe stoïcien de grande renommée.",
    status: "available",
    traits: ["Sage", "Réfléchi", "Exigeant"],
    background: "A étudié à Athènes et enseigné dans plusieurs grandes familles",
    reputation: 95
  },
  {
    id: uuidv4(),
    name: "Aulus Flaminius",
    specialty: "academic",
    specialties: ["Mathématiques", "Histoire", "Astronomie"],
    expertise: 7,
    experience: 14,
    cost: 5000,
    price: 5000,
    available: true,
    skill: 7,
    quality: 4,
    description: "Homme de lettres et de sciences avec une formation complète.",
    status: "available",
    traits: ["Curieux", "Méthodique", "Érudit"],
    background: "A géré une école pour jeunes patriciens pendant plusieurs années",
    reputation: 80
  }
];

// Fonction pour récupérer tous les précepteurs
export function getAllPreceptors(): Preceptor[] {
  return preceptorsList;
}

// Fonction pour récupérer un précepteur par son ID
export function getPreceptorById(id: string): Preceptor | undefined {
  return preceptorsList.find(p => p.id === id);
}

// Fonction pour récupérer les précepteurs par type d'éducation
export function getPreceptorsForType(type: EducationType): Preceptor[] {
  return preceptorsList.filter(p => 
    p.specialty === type || 
    p.speciality === type || 
    p.specialization === type
  );
}
