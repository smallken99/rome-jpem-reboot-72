
import { Character } from '@/types/character';

export const getFamilyMembers = (characters: Character[]) => {
  // Extraire le pater familias (chef de famille)
  const paterFamilias = characters.find(c => c.isHeadOfFamily && c.gender === 'male') || 
                         characters.find(c => c.gender === 'male' && c.relation.includes('Pater'));
  
  // Extraire la mater familias (épouse du chef de famille)
  const materFamilias = characters.find(c => c.gender === 'female' && 
    (c.relation.includes('Épouse') || c.relation.includes('Mater')));
  
  // Extraire les enfants
  const children = characters.filter(c => 
    c.relation.includes('Fils') || 
    c.relation.includes('Fille')
  );
  
  return { paterFamilias, materFamilias, children };
};

export const sortChildrenByAge = (children: Character[]): Character[] => {
  return [...children].sort((a, b) => b.age - a.age);
};

export const getFamilyLineage = (characters: Character[]): string => {
  const paterFamilias = characters.find(c => c.isHeadOfFamily);
  if (!paterFamilias) return "Famille inconnue";
  
  const familyName = paterFamilias.name.split(' ')[1] || paterFamilias.name;
  return `Gens ${familyName}`;
};

export const findHeir = (characters: Character[]): Character | null => {
  const { paterFamilias, children } = getFamilyMembers(characters);
  
  if (!paterFamilias) return null;
  
  // Fils par ordre d'âge
  const sons = sortChildrenByAge(
    children.filter(c => c.gender === 'male' && c.status === 'alive')
  );
  
  if (sons.length > 0) {
    return sons[0]; // Le fils aîné
  }
  
  // Si pas de fils, chercher les frères
  const brothers = characters.filter(c => 
    c.gender === 'male' && 
    c.relation.includes('Frère') && 
    c.status === 'alive'
  );
  
  if (brothers.length > 0) {
    return brothers.sort((a, b) => b.age - a.age)[0]; // Le frère aîné
  }
  
  return null;
};
