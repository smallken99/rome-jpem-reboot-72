
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // État pour stocker notre valeur
  // Passe la fonction d'initialisation à useState pour que la logique ne s'exécute qu'une fois
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Récupère depuis localStorage
      const item = window.localStorage.getItem(key);
      // Parse JSON stocké ou retourne la valeur initiale
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // En cas d'erreur, retourne la valeur initiale
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Créé un hook de mise à jour pour localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permet à la valeur d'être une fonction pour suivre la même API que useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      
      // Sauvegarde l'état
      setStoredValue(valueToStore);
      
      // Sauvegarde dans localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // Une erreur plus explicite ici aiderait au débogage
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Synchroniser avec d'autres onglets potentiels
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(`Error parsing localStorage value:`, error);
        }
      }
    };

    // Écoute les changements
    window.addEventListener('storage', handleStorageChange);
    
    // Nettoyage
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue];
}
