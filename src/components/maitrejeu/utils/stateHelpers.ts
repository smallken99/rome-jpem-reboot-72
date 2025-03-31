
/**
 * Helper function to safely update state with function updates.
 * This is useful for cases where TypeScript expects a direct value
 * but React's setState accepts a function that receives the previous state.
 * 
 * @param updater Function that receives previous state and returns new state
 * @returns A function that TypeScript will treat as returning the new state type
 */
export function createSafeStateUpdater<T>(updater: (prev: T) => T): T {
  // This is a runtime no-op, but helps TypeScript understand
  // that the function returns the same type as the input
  return updater as unknown as T;
}

/**
 * Helper to cast any value to any other type safely
 * Use with caution - only when you're sure the types are compatible
 */
export function castAs<T>(value: any): T {
  return value as T;
}
