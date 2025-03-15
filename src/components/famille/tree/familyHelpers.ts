
import { Character } from '@/types/character';

export interface FamilyMembers {
  paterFamilias?: Character;
  materFamilias?: Character;
  children: Character[];
  otherRelatives: Character[];
}

export const getFamilyMembers = (characters: Character[]): FamilyMembers => {
  if (!characters || !Array.isArray(characters) || characters.length === 0) {
    return { 
      children: [],
      otherRelatives: []
    };
  }

  // Trouver le pater familias (chef de famille masculin)
  const paterFamilias = characters.find(
    char => char.gender === 'male' && 
    (char.role === 'pater familias' || char.role === 'Chef de la Gens' || 
     char.role === 'Chef de famille' || char.role === 'Chef de la Gens Aurelia')
  );

  // Trouver la mater familias (épouse principale)
  const materFamilias = characters.find(
    char => char.gender === 'female' && 
    (char.role === 'mater familias' || char.role === 'Épouse du Chef de la Gens' || 
     char.role === 'Matrone' || char.role === 'Épouse du Chef')
  );

  // Identifier les enfants (fils et filles)
  const children = characters.filter(
    char => char.role === 'son' || char.role === 'daughter' || 
    char.role === 'filius' || char.role === 'filia' || 
    char.role === 'Fils aîné et héritier' || char.role === 'Fille cadette' ||
    char.role === 'Fils' || char.role === 'Fille'
  );

  // Autres membres de la famille
  const otherRelatives = characters.filter(
    char => 
      char !== paterFamilias && 
      char !== materFamilias && 
      !children.includes(char)
  );

  return {
    paterFamilias,
    materFamilias,
    children,
    otherRelatives
  };
};

// Fonction pour calculer l'âge d'un personnage
export const calculateAge = (birthYear: number, currentYear: number): number => {
  return currentYear - birthYear;
};

// Fonction pour obtenir le statut marital
export const getMaritalStatus = (character: Character): string => {
  if (!character.marriageStatus) return 'Inconnu';
  
  switch(character.marriageStatus.toLowerCase()) {
    case 'married':
      return 'Marié(e)';
    case 'widowed':
      return 'Veuf/Veuve';
    case 'divorced':
      return 'Divorcé(e)';
    case 'single':
      return 'Célibataire';
    case 'betrothed':
      return 'Fiancé(e)';
    default:
      return character.marriageStatus;
  }
};
