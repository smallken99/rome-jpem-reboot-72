
import { Character } from '@/types/character';

export const characters: Character[] = [
  {
    id: '1',
    name: 'Marcus Aurelius Cotta',
    firstName: 'Marcus',
    lastName: 'Aurelius Cotta',
    age: 42,
    gender: 'male',
    title: 'Préteur',
    role: 'Chef de la Gens Aurelia',
    marriageStatus: 'married',
    isPlayer: true,
    stats: {
      popularity: {
        name: 'Popularité',
        value: 144,
        maxValue: 200,
        icon: 'popularity',
        description: 'Influence auprès du peuple et des citoyens romains',
        color: 'gold'
      },
      oratory: {
        name: 'Éloquence',
        value: 170,
        maxValue: 200,
        icon: 'oratory',
        description: 'Art de la persuasion et capacité à s\'exprimer en public',
        color: 'terracotta'
      },
      piety: {
        name: 'Piété',
        value: 120,
        maxValue: 200,
        icon: 'piety',
        description: 'Respect et dévotion envers les dieux de Rome',
        color: 'navy'
      },
      martialEducation: {
        name: 'Éducation Martiale',
        value: 136,
        maxValue: 200,
        icon: 'martialEducation',
        description: 'Maîtrise des arts militaires et de la stratégie',
        color: 'red'
      }
    },
    education: {
      type: 'political',
      specialties: ['Rhétorique avancée', 'Droit romain', 'Tactique politique'],
      mentor: 'Consul Gaius Flaminius'
    }
  },
  {
    id: '2',
    name: 'Livia Aurelia',
    firstName: 'Livia',
    lastName: 'Aurelia',
    portrait: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    age: 38,
    gender: 'female',
    role: 'Épouse du Chef de la Gens',
    marriageStatus: 'married',
    isPlayer: false,
    stats: {
      popularity: {
        name: 'Popularité',
        value: 130,
        maxValue: 200,
        icon: 'popularity',
        description: 'Influence dans la haute société et les cercles patriciens',
        color: 'gold'
      },
      oratory: {
        name: 'Éloquence',
        value: 156,
        maxValue: 200,
        icon: 'oratory',
        description: 'Art de la conversation et habileté sociale',
        color: 'terracotta'
      },
      piety: {
        name: 'Piété',
        value: 164,
        maxValue: 200,
        icon: 'piety',
        description: 'Dévotion aux cultes et traditions religieuses romaines',
        color: 'navy'
      },
      martialEducation: {
        name: 'Éducation Martiale',
        value: 0,
        maxValue: 200,
        icon: 'martialEducation',
        description: 'Connaissance des stratégies militaires (non disponible)',
        color: 'red'
      }
    },
    education: {
      type: 'religious',
      specialties: ['Rites et cérémonies', 'Divination', 'Culte de Vesta'],
      mentor: 'Grande Vestale Claudia'
    }
  },
  {
    id: '3',
    name: 'Titus Aurelius',
    firstName: 'Titus',
    lastName: 'Aurelius',
    portrait: 'https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cm9tYW4lMjBtYW58ZW58MHwwfDB8fHww&auto=format&fit=crop&w=500&q=60',
    age: 15,
    gender: 'male',
    role: 'Fils aîné et héritier',
    marriageStatus: 'single',
    isPlayer: false,
    stats: {
      popularity: {
        name: 'Popularité',
        value: 80,
        maxValue: 200,
        icon: 'popularity',
        description: 'Reconnaissance parmi les jeunes patriciens romains',
        color: 'gold'
      },
      oratory: {
        name: 'Éloquence',
        value: 110,
        maxValue: 200,
        icon: 'oratory',
        description: 'Formation à l\'art oratoire et à la rhétorique',
        color: 'terracotta'
      },
      piety: {
        name: 'Piété',
        value: 90,
        maxValue: 200,
        icon: 'piety',
        description: 'Apprentissage et participation aux rites religieux',
        color: 'navy'
      },
      martialEducation: {
        name: 'Éducation Martiale',
        value: 120,
        maxValue: 200,
        icon: 'martialEducation',
        description: 'Entraînement aux armes et à la tactique militaire',
        color: 'red'
      }
    },
    education: {
      type: 'military',
      specialties: ['Combat à l\'épée', 'Tactique de bataille', 'Commandement de légion'],
      mentor: 'Centurion Flavius Aquila'
    }
  },
  {
    id: '4',
    name: 'Julia Aurelia',
    firstName: 'Julia',
    lastName: 'Aurelia',
    portrait: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW4lMjBwb3J0cmFpdHxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    age: 12,
    gender: 'female',
    role: 'Fille cadette',
    marriageStatus: 'single',
    isPlayer: false,
    stats: {
      popularity: {
        name: 'Popularité',
        value: 70,
        maxValue: 200,
        icon: 'popularity',
        description: 'Charme naturel et relations sociales naissantes',
        color: 'gold'
      },
      oratory: {
        name: 'Éloquence',
        value: 84,
        maxValue: 200,
        icon: 'oratory',
        description: 'Apprentissage de l\'art de la conversation',
        color: 'terracotta'
      },
      piety: {
        name: 'Piété',
        value: 130,
        maxValue: 200,
        icon: 'piety',
        description: 'Éducation religieuse et participation aux cultes féminins',
        color: 'navy'
      },
      martialEducation: {
        name: 'Éducation Martiale',
        value: 0,
        maxValue: 200,
        icon: 'martialEducation',
        description: 'Connaissance des stratégies militaires (non disponible)',
        color: 'red'
      }
    },
    education: {
      type: 'religious',
      specialties: ['Panthéon romain', 'Offrandes rituelles', 'Calendrier sacré'],
      mentor: 'Flamine Tullia Domitia'
    }
  }
];
