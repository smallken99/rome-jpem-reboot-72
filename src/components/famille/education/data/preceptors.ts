
import { Preceptor } from '../types/educationTypes';
import { v4 as uuidv4 } from 'uuid';

const preceptorsList: Preceptor[] = [
  {
    id: uuidv4(),
    name: 'Marcus Fabius Quintilianus',
    specialization: 'political',
    skill: 85,
    cost: 5000,
    background: 'Ancien rhéteur et avocat renommé',
    traits: ['Eloquent', 'Patient', 'Méthodique'],
    status: 'available'
  },
  {
    id: uuidv4(),
    name: 'Gaius Musonius Rufus',
    specialization: 'philosophical',
    skill: 90,
    cost: 6000,
    background: 'Philosophe stoïcien respecté',
    traits: ['Sage', 'Rigoureux', 'Inspirant'],
    status: 'available'
  },
  {
    id: uuidv4(),
    name: 'Titus Livius Patavinus',
    specialization: 'political',
    skill: 80,
    cost: 4500,
    background: 'Historien et analyste politique',
    traits: ['Érudit', 'Observateur', 'Analytique'],
    status: 'available'
  },
  {
    id: uuidv4(),
    name: 'Publius Valerius',
    specialization: 'military',
    skill: 88,
    cost: 5500,
    background: 'Ancien centurion de la Legio IX Hispana',
    traits: ['Discipliné', 'Exigeant', 'Courageux'],
    status: 'available'
  },
  {
    id: uuidv4(),
    name: 'Lucius Annaeus Cornutus',
    specialization: 'philosophical',
    skill: 82,
    cost: 4800,
    background: 'Philosophe stoïcien et grammairien',
    traits: ['Réfléchi', 'Calme', 'Profond'],
    status: 'available'
  },
  {
    id: uuidv4(),
    name: 'Julia Balbilla',
    specialization: 'artistic',
    skill: 83,
    cost: 4200,
    background: 'Poétesse et artiste reconnue',
    traits: ['Créative', 'Sensible', 'Expressive'],
    status: 'available'
  },
  {
    id: uuidv4(),
    name: 'Vestal Claudia',
    specialization: 'religious',
    skill: 95,
    cost: 7000,
    background: 'Ancienne Grande Vestale',
    traits: ['Pieuse', 'Respectueuse', 'Pure'],
    status: 'available'
  }
];

export const getAllPreceptors = (): Preceptor[] => {
  return preceptorsList;
};

export const getPreceptorById = (id: string): Preceptor | undefined => {
  return preceptorsList.find(p => p.id === id);
};

export const getPreceptorsForType = (type: string): Preceptor[] => {
  return preceptorsList.filter(p => p.specialization === type);
};
