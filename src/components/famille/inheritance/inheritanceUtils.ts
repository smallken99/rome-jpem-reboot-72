import { Character } from '@/types/character';

export const getEligibleHeirs = (
  character: Character | undefined,
  characters: Character[]
): Character[] => {
  if (!character) return [];
  
  const heirs: Character[] = [];
  
  // 1. D'abord les fils par ordre d'âge (primogéniture)
  const sons = characters.filter(c => 
    c.gender === 'male' && 
    c.relation?.includes('Fils') && 
    c.status !== 'deceased'
  ).sort((a, b) => b.age - a.age);
  
  heirs.push(...sons);
  
  // 2. Ensuite les frères
  const brothers = characters.filter(c => 
    c.gender === 'male' && 
    c.relation?.includes('Frère') && 
    c.status !== 'deceased'
  ).sort((a, b) => b.age - a.age);
  
  heirs.push(...brothers);
  
  // 3. Puis les neveux (fils des frères)
  const nephews = characters.filter(c => 
    c.gender === 'male' && 
    c.relation?.includes('Neveu') && 
    c.status !== 'deceased'
  ).sort((a, b) => b.age - a.age);
  
  heirs.push(...nephews);
  
  // 4. Finalement, les cousins masculins
  const cousins = characters.filter(c => 
    c.gender === 'male' && 
    c.relation?.includes('Cousin') && 
    c.status !== 'deceased'
  ).sort((a, b) => b.age - a.age);
  
  heirs.push(...cousins);
  
  return heirs;
};

export const getInheritanceRules = (): string[] => {
  return [
    "Les fils héritent avant les filles, par ordre d'âge",
    "À défaut de fils, les frères héritent",
    "À défaut de frères, les neveux héritent",
    "À défaut de neveux, les cousins héritent",
    "Les femmes peuvent hériter si aucun héritier masculin n'est disponible",
    "Le chef de famille peut désigner un héritier spécifique dans son testament"
  ];
};

export const getInheritedProperties = (character: Character): string[] => {
  // Dans une implémentation réelle, cette fonction récupérerait
  // les propriétés et biens que le personnage laisserait en héritage
  return [
    "Villa sur le Palatin",
    "Terres agricoles en Campanie",
    "Domaine viticole près de Baïes",
    "Collection de statues grecques",
    "Participation dans une compagnie commerciale"
  ];
};

export const calculateInheritanceTax = (character: Character): number => {
  // Dans une implémentation réelle, ce calcul serait basé
  // sur la valeur des biens du personnage
  return 5000;
};
