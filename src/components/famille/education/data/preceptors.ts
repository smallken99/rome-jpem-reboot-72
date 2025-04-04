
import { Preceptor, EducationType } from '../types/educationTypes';
import { v4 as uuidv4 } from 'uuid';

export const preceptors: Preceptor[] = [
  {
    id: uuidv4(),
    name: "Marcus Aurelius",
    specialty: "philosophical",
    speciality: "philosophical",
    specialties: ["Stoïcisme", "Éthique", "Logique"],
    expertise: 90,
    experience: 20,
    cost: 5000,
    price: 5000,
    available: true,
    skill: 90,
    quality: 5,
    description: "Philosophe stoïcien renommé",
    status: "available"
  },
  {
    id: uuidv4(),
    name: "Quintus Horatius",
    specialty: "rhetoric",
    speciality: "rhetoric",
    specialties: ["Poésie", "Rhétorique", "Grammaire"],
    expertise: 85,
    experience: 15,
    cost: 4000,
    price: 4000,
    available: true,
    skill: 85,
    quality: 4,
    description: "Poète et orateur talentueux",
    status: "available"
  },
  {
    id: uuidv4(),
    name: "Gaius Scipio",
    specialty: "military",
    speciality: "military",
    specialties: ["Tactique", "Stratégie", "Combat"],
    expertise: 95,
    experience: 25,
    cost: 6000,
    price: 6000,
    available: true,
    skill: 95,
    quality: 5,
    description: "Ancien général des légions romaines",
    status: "available"
  },
  {
    id: uuidv4(),
    name: "Lucius Seneca",
    specialty: "political",
    speciality: "political",
    specialties: ["Diplomatie", "Gouvernance", "Droit"],
    expertise: 88,
    experience: 22,
    cost: 5500,
    price: 5500,
    available: true,
    skill: 88,
    quality: 4,
    description: "Ancien conseiller impérial et diplomate",
    status: "available"
  },
  {
    id: uuidv4(),
    name: "Publius Marius",
    specialty: "religious",
    speciality: "religious",
    specialties: ["Rituels", "Divination", "Théologie"],
    expertise: 80,
    experience: 18,
    cost: 4800,
    price: 4800,
    available: true,
    skill: 80,
    quality: 4,
    description: "Ancien grand prêtre de Jupiter",
    status: "available"
  },
  {
    id: uuidv4(),
    name: "Titus Livius",
    specialty: "academic",
    speciality: "academic",
    specialties: ["Histoire", "Géographie", "Mathématiques"],
    expertise: 92,
    experience: 30,
    cost: 5800,
    price: 5800,
    available: true,
    skill: 92,
    quality: 5,
    description: "Historien et académicien respecté",
    status: "available"
  },
  {
    id: uuidv4(),
    name: "Claudius Ptolemaeus",
    specialty: "academic",
    speciality: "academic",
    specialties: ["Astronomie", "Mathématiques", "Géographie"],
    expertise: 93,
    experience: 35,
    cost: 6500,
    price: 6500,
    available: true,
    skill: 93,
    quality: 5,
    description: "Savant alexandrin aux multiples talents",
    status: "available"
  },
  {
    id: uuidv4(),
    name: "Julia Domna",
    specialty: "philosophical",
    speciality: "philosophical",
    specialties: ["Néoplatonisme", "Éthique", "Métaphysique"],
    expertise: 87,
    experience: 15,
    cost: 5200,
    price: 5200,
    available: true,
    skill: 87,
    quality: 4,
    description: "Philosophe et intellectuelle respectée",
    status: "available"
  }
];

// Export a function to get preceptors by type
export const getPreceptorsByType = (type: EducationType): Preceptor[] => {
  return preceptors.filter(preceptor => 
    preceptor.specialty === type || preceptor.speciality === type
  );
};
