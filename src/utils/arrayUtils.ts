
/**
 * Utility functions for working with arrays and collections
 */

/**
 * Ensures a value is an array. If it's not, returns an empty array.
 * This is useful for handling properties that might be empty objects or undefined
 * but need to be treated as arrays.
 */
export function ensureArray<T>(value: any): T[] {
  if (Array.isArray(value)) {
    return value;
  }
  return [];
}

/**
 * Safely adds an item to an array, ensuring the array exists first
 */
export function addToArray<T>(array: T[] | undefined | {}, item: T): T[] {
  const safeArray = ensureArray<T>(array);
  return [...safeArray, item];
}

/**
 * Creates a new array with the specified element removed
 */
export function removeFromArray<T>(array: T[], itemToRemove: T, compareFn?: (a: T, b: T) => boolean): T[] {
  if (!array || !Array.isArray(array)) return [];
  
  if (compareFn) {
    return array.filter(item => !compareFn(item, itemToRemove));
  }
  
  return array.filter(item => item !== itemToRemove);
}

/**
 * Updates an item in an array by creating a new array with the updated item
 */
export function updateInArray<T>(
  array: T[], 
  predicate: (item: T) => boolean, 
  updater: (item: T) => T
): T[] {
  if (!array || !Array.isArray(array)) return [];
  
  return array.map(item => 
    predicate(item) ? updater(item) : item
  );
}
