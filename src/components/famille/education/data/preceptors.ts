
import { Preceptor, EducationType } from '../types/educationTypes';

const preceptors: Preceptor[] = [
  {
    id: 'prec-1',
    name: 'Lucius Calpurnius',
    specialty: 'Stratégie Militaire',
    description: 'Ancien centurion primipile de la VIIe légion, expert en tactiques de combat.',
    specialization: 'military',
    expertise: 85,
    experience: 15,
    price: 12000,
    traits: ['Discipliné', 'Exigeant', 'Respecté'],
    skills: ['Tactique de formation en testudo', 'Siège', 'Armement légionnaire']
  },
  {
    id: 'prec-2',
    name: 'Marcus Tullius',
    specialty: 'Éloquence et Rhétorique',
    description: 'Orateur réputé ayant étudié en Grèce, maître de la rhétorique.',
    specialization: 'rhetoric',
    expertise: 90,
    experience: 12,
    price: 14000,
    traits: ['Charismatique', 'Cultivé', 'Patient'],
    skills: ['Construction de discours', 'Art de la persuasion', 'Débat']
  },
  {
    id: 'prec-3',
    name: 'Aulus Postumius',
    specialty: 'Politique Romaine',
    description: 'Ancien questeur et conseiller sénatorial, expert en intrigues politiques.',
    specialization: 'political',
    expertise: 88,
    experience: 20,
    price: 15000,
    traits: ['Rusé', 'Méthodique', 'Ambitieux'],
    skills: ['Négociation politique', 'Droit romain', 'Histoire des institutions']
  },
  {
    id: 'prec-4',
    name: 'Titus Domitius',
    specialty: 'Rituel et Religion',
    description: 'Ancien flamine, spécialiste des rites religieux romains.',
    specialization: 'religious',
    expertise: 82,
    experience: 18,
    price: 13000,
    traits: ['Pieux', 'Austère', 'Rigoureux'],
    skills: ['Sacrifices rituels', 'Divination', 'Calendrier religieux']
  },
  {
    id: 'prec-5',
    name: 'Publius Valerius',
    specialty: 'Philosophie Grecque',
    description: 'Philosophe ayant étudié avec les plus grands maîtres d\'Athènes.',
    specialization: 'philosophical',
    expertise: 95,
    experience: 25,
    price: 16000,
    traits: ['Sage', 'Calme', 'Profond'],
    skills: ['Pensée stoïcienne', 'Dialectique', 'Logique aristotélicienne']
  },
  {
    id: 'prec-6',
    name: 'Gaius Sempronius',
    specialty: 'Administration et Finance',
    description: 'Ancien censeur et administrateur provincial.',
    specialization: 'administrative',
    expertise: 87,
    experience: 22,
    price: 14500,
    traits: ['Organisé', 'Méticuleux', 'Autoritaire'],
    skills: ['Gestion fiscale', 'Administration provinciale', 'Logistique']
  },
  {
    id: 'prec-7',
    name: 'Cornelia Metella',
    specialty: 'Éducation Patricienne',
    description: 'Issue d\'une grande famille, experte dans l\'art de vivre romain.',
    specialization: 'rhetoric',
    expertise: 84,
    experience: 10,
    price: 12000,
    traits: ['Élégante', 'Stricte', 'Cultivée'],
    skills: ['Comportement en société', 'Culture littéraire', 'Traditions romaines']
  },
  {
    id: 'prec-8',
    name: 'Gnaeus Aemilius',
    specialty: 'Commandement Militaire',
    description: 'Ancien légat, expert en stratégie et commandement de légion.',
    specialization: 'military',
    expertise: 92,
    experience: 28,
    price: 18000,
    traits: ['Leadership', 'Courageux', 'Stratège'],
    skills: ['Commandement de légion', 'Planification de campagne', 'Cavalerie']
  }
];

export const getAllPreceptors = (): Preceptor[] => {
  return preceptors;
};

export const getPreceptorById = (id: string): Preceptor | undefined => {
  return preceptors.find(p => p.id === id);
};

export const getPreceptorsForType = (type: string): Preceptor[] => {
  return preceptors.filter(p => p.specialization === type);
};
