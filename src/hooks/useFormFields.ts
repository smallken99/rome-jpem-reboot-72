
import { useState } from 'react';

/**
 * A generic hook for managing form field values and updates
 */
export function useFormFields<T>(initialState: T) {
  const [fields, setFields] = useState<T>(initialState);
  
  const updateField = <K extends keyof T>(field: K, value: T[K]) => {
    setFields(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  return {
    fields,
    updateField,
    setFields
  };
}
