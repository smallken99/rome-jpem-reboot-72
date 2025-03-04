
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
    portrait: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
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
        description: 'Respect des traditions religieuses (les femmes ont un bonus naturel)',
        color: 'navy'
      },
      martialEducation: {
        name: 'Éducation Martiale',
        value: 0,
        maxValue: 100,
        icon: 'martialEducation',
        description: 'Connaissance de la stratégie militaire (non disponible pour les femmes)',
        color: 'red'
      }
    }
  },
  {
    id: '3',
    name: 'Titus Aurelius',
    portrait: 'https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cm9tYW4lMjBtYW58ZW58MHwwfDB8fHww&auto=format&fit=crop&w=500&q=60',
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
  },
  {
    id: '4',
    name: 'Julia Aurelia',
    portrait: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW4lMjBwb3J0cmFpdHxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    age: 12,
    gender: 'female',
    role: 'Fille cadette',
    isPlayer: false,
    stats: {
      popularity: {
        name: 'Popularité',
        value: 35,
        maxValue: 100,
        icon: 'popularity',
        description: 'Charme naturel et relations sociales',
        color: 'gold'
      },
      oratory: {
        name: 'Éloquence',
        value: 42,
        maxValue: 100,
        icon: 'oratory',
        description: 'Éducation à l\'art de la conversation',
        color: 'terracotta'
      },
      piety: {
        name: 'Piété',
        value: 65,
        maxValue: 100,
        icon: 'piety',
        description: 'Dévotion aux cultes féminins romains',
        color: 'navy'
      },
      martialEducation: {
        name: 'Éducation Martiale',
        value: 0,
        maxValue: 100,
        icon: 'martialEducation',
        description: 'Connaissance de la stratégie militaire (non disponible pour les femmes)',
        color: 'red'
      }
    }
  }
];
