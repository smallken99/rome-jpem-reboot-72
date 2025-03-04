
// Fonction pour calculer la valeur de la dot en fonction de l'âge et d'autres facteurs
export const calculateDowryValue = (heir: {
  age: number;
  gender: 'male' | 'female';
  role?: string;
}) => {
  // Base value for dowry calculation
  const baseValue = 100000; // 100,000 As as base value
  
  // Age factor - younger brides/grooms have higher dowry potential
  const ageFactor = Math.max(0.5, 1 - (heir.age - 12) * 0.05);
  
  // Role bonus - certain roles (like being the first daughter) increase dowry
  const roleBonus = heir.role?.toLowerCase().includes('aîné') ? 1.5 : 1.2;
  
  // Calculate final value
  const dowryValue = Math.round(baseValue * ageFactor * roleBonus);
  
  // Format with Roman numerals for large values
  return `${(dowryValue / 1000).toFixed(0)}K As`;
};
