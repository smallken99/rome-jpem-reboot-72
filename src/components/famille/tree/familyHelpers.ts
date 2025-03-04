
import { Character } from '@/types/character';

export const getFamilyMembers = (characters: Character[]) => {
  const paterFamilias = characters.find(char => 
    char.isPlayer || 
    char.role?.toLowerCase().includes('chef') || 
    char.role?.toLowerCase().includes('pater')
  );
  
  const materFamilias = characters.find(char => 
    char.gender === 'female' && 
    (char.role?.toLowerCase().includes('épouse') || 
     char.role?.toLowerCase().includes('mater'))
  );
  
  const children = characters.filter(char => 
    (char.age < 18 || char.role?.toLowerCase().includes('fils') || char.role?.toLowerCase().includes('fille')) &&
    char.id !== paterFamilias?.id &&
    char.id !== materFamilias?.id
  );
  
  return {
    paterFamilias,
    materFamilias,
    children
  };
};
