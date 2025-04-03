
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Character } from '@/types/character';
import { toast } from 'sonner';

// Exemple de données initiales pour démonstration
const initialCharacters: Character[] = [
  {
    id: 'char-1',
    name: 'Marcus Aurelius',
    firstName: 'Marcus',
    lastName: 'Aurelius',
    gender: 'male',
    age: 45,
    isPlayer: true,
    isHeadOfFamily: true,
    relation: 'Pater Familias',
    status: 'alive',
    stats: {
      popularity: { value: 65, maxValue: 100, name: 'Popularité', icon: 'users', description: 'Votre réputation auprès du peuple', color: 'blue' },
      oratory: { value: 70, maxValue: 100, name: 'Éloquence', icon: 'message-square', description: 'Votre capacité à convaincre', color: 'amber' },
      piety: { value: 60, maxValue: 100, name: 'Piété', icon: 'shrine', description: 'Votre dévotion aux dieux', color: 'purple' },
      martialEducation: { value: 55, maxValue: 100, name: 'Art militaire', icon: 'sword', description: 'Votre expertise militaire', color: 'red' }
    },
    childrenIds: ['char-3', 'char-4', 'char-5'],
    spouseId: 'char-2'
  },
  {
    id: 'char-2',
    name: 'Faustina Minor',
    firstName: 'Faustina',
    lastName: 'Minor',
    gender: 'female',
    age: 40,
    relation: 'Mater Familias',
    status: 'alive',
    stats: {
      popularity: { value: 50, maxValue: 100, name: 'Popularité', icon: 'users', description: 'Votre réputation auprès du peuple', color: 'blue' },
      oratory: { value: 60, maxValue: 100, name: 'Éloquence', icon: 'message-square', description: 'Votre capacité à convaincre', color: 'amber' },
      piety: { value: 75, maxValue: 100, name: 'Piété', icon: 'shrine', description: 'Votre dévotion aux dieux', color: 'purple' },
      martialEducation: { value: 20, maxValue: 100, name: 'Art militaire', icon: 'sword', description: 'Votre expertise militaire', color: 'red' }
    },
    childrenIds: ['char-3', 'char-4', 'char-5'],
    spouseId: 'char-1'
  },
  {
    id: 'char-3',
    name: 'Commodus Aurelius',
    firstName: 'Commodus',
    lastName: 'Aurelius',
    gender: 'male',
    age: 18,
    relation: 'Fils',
    status: 'alive',
    parentIds: ['char-1', 'char-2'],
    stats: {
      popularity: { value: 40, maxValue: 100, name: 'Popularité', icon: 'users', description: 'Votre réputation auprès du peuple', color: 'blue' },
      oratory: { value: 45, maxValue: 100, name: 'Éloquence', icon: 'message-square', description: 'Votre capacité à convaincre', color: 'amber' },
      piety: { value: 30, maxValue: 100, name: 'Piété', icon: 'shrine', description: 'Votre dévotion aux dieux', color: 'purple' },
      martialEducation: { value: 60, maxValue: 100, name: 'Art militaire', icon: 'sword', description: 'Votre expertise militaire', color: 'red' }
    },
    education: {
      type: 'military',
      specialties: ['Tactique de combat', 'Commandement'],
      mentor: 'Maximus Decimus',
      completed: true,
      completedAt: '745 AUC'
    }
  },
  {
    id: 'char-4',
    name: 'Lucilla Aurelia',
    firstName: 'Lucilla',
    lastName: 'Aurelia',
    gender: 'female',
    age: 16,
    relation: 'Fille',
    status: 'alive',
    parentIds: ['char-1', 'char-2'],
    stats: {
      popularity: { value: 45, maxValue: 100, name: 'Popularité', icon: 'users', description: 'Votre réputation auprès du peuple', color: 'blue' },
      oratory: { value: 65, maxValue: 100, name: 'Éloquence', icon: 'message-square', description: 'Votre capacité à convaincre', color: 'amber' },
      piety: { value: 70, maxValue: 100, name: 'Piété', icon: 'shrine', description: 'Votre dévotion aux dieux', color: 'purple' },
      martialEducation: { value: 15, maxValue: 100, name: 'Art militaire', icon: 'sword', description: 'Votre expertise militaire', color: 'red' }
    }
  },
  {
    id: 'char-5',
    name: 'Annius Aurelius',
    firstName: 'Annius',
    lastName: 'Aurelius',
    gender: 'male',
    age: 12,
    relation: 'Fils',
    status: 'alive',
    parentIds: ['char-1', 'char-2'],
    stats: {
      popularity: { value: 20, maxValue: 100, name: 'Popularité', icon: 'users', description: 'Votre réputation auprès du peuple', color: 'blue' },
      oratory: { value: 25, maxValue: 100, name: 'Éloquence', icon: 'message-square', description: 'Votre capacité à convaincre', color: 'amber' },
      piety: { value: 30, maxValue: 100, name: 'Piété', icon: 'shrine', description: 'Votre dévotion aux dieux', color: 'purple' },
      martialEducation: { value: 30, maxValue: 100, name: 'Art militaire', icon: 'sword', description: 'Votre expertise militaire', color: 'red' }
    },
    currentEducation: {
      type: 'military',
      mentor: 'Maximus Decimus',
      mentorId: 'prec-1',
      progress: 33,
      skills: ['Discipline légionnaire'],
      yearsCompleted: 1,
      totalYears: 3,
      statBonus: 0
    }
  }
];

export const useCharacters = () => {
  const [localCharacters, setLocalCharacters] = useState<Character[]>(initialCharacters);
  
  // Une fonction pour ajouter un nouveau personnage
  const addCharacter = (characterData: Partial<Character>) => {
    const newCharacter: Character = {
      id: uuidv4(),
      name: characterData.name || `${characterData.firstName || ''} ${characterData.lastName || ''}`.trim(),
      firstName: characterData.firstName || '',
      lastName: characterData.lastName || '',
      gender: characterData.gender || 'male',
      age: characterData.age || 0,
      status: characterData.status || 'alive',
      isPlayer: characterData.isPlayer || false,
      isHeadOfFamily: characterData.isHeadOfFamily || false,
      stats: characterData.stats || {
        popularity: { value: 10, maxValue: 100, name: 'Popularité', icon: 'users', description: '', color: 'blue' },
        oratory: { value: 10, maxValue: 100, name: 'Éloquence', icon: 'message-square', description: '', color: 'amber' },
        piety: { value: 10, maxValue: 100, name: 'Piété', icon: 'shrine', description: '', color: 'purple' },
        martialEducation: { value: 10, maxValue: 100, name: 'Art militaire', icon: 'sword', description: '', color: 'red' }
      },
      relation: characterData.relation || '',
      parentIds: characterData.parentIds || [],
      childrenIds: characterData.childrenIds || [],
      spouseId: characterData.spouseId,
      education: characterData.education,
      currentEducation: characterData.currentEducation,
      portrait: characterData.portrait
    };
    
    setLocalCharacters(prev => [...prev, newCharacter]);
    
    // Mettre à jour les relations parent-enfant si nécessaire
    if (newCharacter.parentIds && newCharacter.parentIds.length > 0) {
      setLocalCharacters(prev => prev.map(char => {
        if (newCharacter.parentIds?.includes(char.id)) {
          return {
            ...char,
            childrenIds: [...(char.childrenIds || []), newCharacter.id]
          };
        }
        return char;
      }));
    }
    
    return newCharacter;
  };
  
  // Une fonction pour mettre à jour un personnage existant
  const updateCharacter = (characterId: string, updates: Partial<Character>) => {
    setLocalCharacters(prev => prev.map(char => {
      if (char.id === characterId) {
        return { ...char, ...updates };
      }
      return char;
    }));
  };
  
  // Une fonction pour supprimer un personnage
  const removeCharacter = (characterId: string) => {
    setLocalCharacters(prev => prev.filter(char => char.id !== characterId));
    
    // Mettre à jour les relations
    setLocalCharacters(prev => prev.map(char => {
      const updates: Partial<Character> = {};
      
      // Supprimer des enfants
      if (char.childrenIds?.includes(characterId)) {
        updates.childrenIds = char.childrenIds.filter(id => id !== characterId);
      }
      
      // Supprimer des parents
      if (char.parentIds?.includes(characterId)) {
        updates.parentIds = char.parentIds.filter(id => id !== characterId);
      }
      
      // Supprimer des conjoints
      if (char.spouseId === characterId) {
        updates.spouseId = undefined;
      }
      
      return { ...char, ...updates };
    }));
  };
  
  // Gérer les naissances d'enfants
  const handleChildBirth = (parentIds?: string[]) => {
    if (!parentIds || parentIds.length < 2) {
      toast.error("Information des parents insuffisante pour créer un enfant");
      return;
    }
    
    const father = localCharacters.find(c => c.id === parentIds[0] && c.gender === 'male');
    const mother = localCharacters.find(c => c.id === parentIds[1] && c.gender === 'female');
    
    if (!father || !mother) {
      toast.error("Parents non trouvés ou genre incorrect");
      return;
    }
    
    // Déterminer aléatoirement le genre de l'enfant
    const gender = Math.random() > 0.5 ? 'male' : 'female';
    
    // Création du nouvel enfant
    const newChild: Partial<Character> = {
      firstName: gender === 'male' ? "Novus" : "Nova", // Noms temporaires
      lastName: father.lastName,
      name: `${gender === 'male' ? "Novus" : "Nova"} ${father.lastName}`,
      gender,
      age: 0,
      relation: gender === 'male' ? 'Fils' : 'Fille',
      parentIds: [father.id, mother.id],
      status: 'alive'
    };
    
    const child = addCharacter(newChild);
    
    toast.success(`Un nouvel enfant est né: ${child.name}`);
    return child;
  };
  
  return {
    localCharacters,
    addCharacter,
    updateCharacter,
    removeCharacter,
    handleChildBirth
  };
};
