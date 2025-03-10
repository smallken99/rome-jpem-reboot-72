
/**
 * Ce fichier est un aide-mémoire pour corriger l'erreur de type dans ClientFilters.tsx
 * 
 * Voici l'erreur à corriger:
 * error TS2322: Type 'number | unique symbol | "charAt" ... is not assignable to type '"" | keyof Client'.
 * 
 * Solution : Ajouter un type casting sur la valeur passée à onSortChange
 * 
 * Exemple:
 * 
 * - Avant:
 * onValueChange={(value) => onSortChange({ ...sort, field: value })}
 * 
 * - Après:
 * onValueChange={(value) => onSortChange({ ...sort, field: value as "" | keyof Client })}
 * 
 * Cela permet de s'assurer que le champ 'field' du tri reçoit un type valide
 * qui correspond à une clé de l'interface Client ou une chaîne vide.
 */

// Ce fichier est juste un aide-mémoire et n'a pas besoin d'être importé.
// Veuillez appliquer la correction manuellement dans ClientFilters.tsx.
