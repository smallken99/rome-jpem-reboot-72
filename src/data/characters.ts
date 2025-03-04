
import { Character } from '@/types/character';

export const characters: Character[] = [
  {
    id: '1',
    name: 'Marcus Aurelius Cotta',
    age: 42,
    gender: 'male',
    title: 'Préteur',
    role: 'Chef de la Gens Aurelia',
    isPlayer: true,
    stats: {
      popularity: {
        name: 'Popularité',
        value: 72,
        maxValue: 100,
        icon: 'popularity',
        description: 'Influence auprès du peuple de Rome',
        color: 'gold'
      },
      oratory: {
        name: 'Éloquence',
        value: 85,
        maxValue: 100,
        icon: 'oratory',
        description: 'Capacité à convaincre et à s\'exprimer',
        color: 'terracotta'
      },
      piety: {
        name: 'Piété',
        value: 60,
        maxValue: 100,
        icon: 'piety',
        description: 'Dévotion envers les dieux romains',
        color: 'navy'
      },
      martialEducation: {
        name: 'Éducation Martiale',
        value: 68,
        maxValue: 100,
        icon: 'martialEducation',
        description: 'Formation militaire et stratégique',
        color: 'red'
      }
    }
  },
  {
    id: '2',
    name: 'Livia Aurelia',
    age: 38,
    gender: 'female',
    role: 'Épouse du Chef de la Gens',
    isPlayer: false,
    stats: {
      popularity: {
        name: 'Popularité',
        value: 65,
        maxValue: 100,
        icon: 'popularity',
        description: 'Influence dans la haute société romaine',
        color: 'gold'
      },
      oratory: {
        name: 'Éloquence',
        value: 78,
        maxValue: 100,
        icon: 'oratory',
        description: 'Art de la conversation et de la persuasion',
        color: 'terracotta'
      },
      piety: {
        name: 'Piété',
        value: 82,
        maxValue: 100,
        icon: 'piety',
        description: 'Respect des traditions religieuses',
        color: 'navy'
      },
      martialEducation: {
        name: 'Éducation Martiale',
        value: 30,
        maxValue: 100,
        icon: 'martialEducation',
        description: 'Connaissance de la stratégie militaire',
        color: 'red'
      }
    }
  },
  {
    id: '3',
    name: 'Titus Aurelius',
    age: 15,
    gender: 'male',
    role: 'Fils aîné et héritier',
    isPlayer: false,
    stats: {
      popularity: {
        name: 'Popularité',
        value: 40,
        maxValue: 100,
        icon: 'popularity',
        description: 'Reconnaissance parmi les jeunes patriciens',
        color: 'gold'
      },
      oratory: {
        name: 'Éloquence',
        value: 55,
        maxValue: 100,
        icon: 'oratory',
        description: 'Apprentissage de la rhétorique',
        color: 'terracotta'
      },
      piety: {
        name: 'Piété',
        value: 45,
        maxValue: 100,
        icon: 'piety',
        description: 'Participation aux rites religieux',
        color: 'navy'
      },
      martialEducation: {
        name: 'Éducation Martiale',
        value: 60,
        maxValue: 100,
        icon: 'martialEducation',
        description: 'Formation militaire en cours',
        color: 'red'
      }
    }
  }
];
