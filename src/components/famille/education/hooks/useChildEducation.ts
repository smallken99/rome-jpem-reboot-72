
import { useEffect, useState } from 'react';
import { Child } from '../types/educationTypes';
import { useEducation } from '../context/EducationContext';
import { educationPaths } from '../data/index';

export const useChildEducation = (childId: string) => {
  const { children } = useEducation();
  const [child, setChild] = useState<Child | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (Array.isArray(children) && children.length > 0) {
      const foundChild = children.find(c => c.id === childId);
      setChild(foundChild || null);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [children, childId]);
  
  const educationPath = child?.currentEducation?.type 
    ? educationPaths.find(path => path.type === child.currentEducation.type)
    : null;
  
  return {
    child,
    loading,
    educationPath
  };
};
