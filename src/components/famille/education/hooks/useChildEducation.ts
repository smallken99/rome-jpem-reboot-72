
import { useState, useEffect } from 'react';
import { Child, EducationRecord, Preceptor, EducationFormData } from '../types/educationTypes';
import { toast } from 'sonner';

// Données mockées
const mockChildren: Record<string, Child> = {
  "child1": {
    id: "child1",
    name: "Marcus Julianus",
    gender: "male",
    age: 12,
    status: "child",
    skills: {
      rhetoric: 2,
      politics: 1,
      strategy: 3,
      diplomacy: 2,
      combat: 4,
      leadership: 3,
      riding: 4,
      tactics: 2
    },
    traits: ["Intelligent", "Ambitieux", "Têtu"]
  },
  "child2": {
    id: "child2",
    name: "Livia Julia",
    gender: "female",
    age: 14,
    status: "child",
    skills: {
      rhetoric: 4,
      politics: 3,
      strategy: 1,
      diplomacy: 4,
      combat: 1,
      leadership: 2,
      riding: 2,
      tactics: 1
    },
    traits: ["Éloquente", "Charmante", "Prudente"]
  }
};

const mockEducations: Record<string, EducationRecord> = {
  "edu1": {
    id: "edu1",
    childId: "child1",
    pathType: "military",
    preceptorId: "preceptor1",
    startYear: 745,
    currentYear: 2,
    totalYears: 10,
    status: "in_progress",
    skills: {
      combat: 4,
      leadership: 3,
      tactics: 2,
      riding: 3
    },
    specialties: ["Combat au glaive"]
  }
};

const mockPreceptors: Preceptor[] = [
  {
    id: "preceptor1",
    name: "Gaius Marius",
    specialty: "military",
    quality: 4,
    cost: 2000,
    available: true,
    skills: ["Combat", "Tactique", "Histoire militaire"],
    background: "Ancien centurion des légions"
  },
  {
    id: "preceptor2",
    name: "Marcus Tullius",
    specialty: "rhetoric",
    quality: 5,
    cost: 2500,
    available: true,
    skills: ["Éloquence", "Philosophie", "Grec ancien"],
    background: "Orateur renommé du forum"
  },
  {
    id: "preceptor3",
    name: "Lucius Flamen",
    specialty: "religious",
    quality: 3,
    cost: 1800,
    available: true,
    skills: ["Rituels", "Auspices", "Traditions"],
    background: "Ancien assistant d'un pontife"
  }
];

export const useChildEducation = (childId: string) => {
  const [child, setChild] = useState<Child | null>(null);
  const [education, setEducation] = useState<EducationRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler une requête API
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Attendre pour simuler un chargement
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Récupérer l'enfant
        const foundChild = mockChildren[childId];
        if (foundChild) {
          setChild(foundChild);
          
          // Trouver l'éducation associée
          const foundEducation = Object.values(mockEducations).find(
            edu => edu.childId === childId
          );
          
          if (foundEducation) {
            setEducation(foundEducation);
          }
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        toast.error("Erreur lors du chargement des données");
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [childId]);
  
  const updateEducation = (educationId: string, updates: Partial<EducationRecord>) => {
    setEducation(prev => {
      if (!prev || prev.id !== educationId) return prev;
      return { ...prev, ...updates };
    });
    
    toast.success("Éducation mise à jour avec succès");
  };
  
  const advanceEducation = (educationId: string) => {
    setEducation(prev => {
      if (!prev || prev.id !== educationId) return prev;
      
      // Avancer d'une année
      const newYear = prev.currentYear + 1;
      const isComplete = newYear >= prev.totalYears;
      
      // Générer des progrès aléatoires pour les compétences
      const updatedSkills = { ...prev.skills };
      Object.keys(updatedSkills).forEach(skill => {
        // Ajouter entre 0 et 2 points par an selon la qualité du précepteur
        const preceptor = mockPreceptors.find(p => p.id === prev.preceptorId);
        const qualityBonus = (preceptor?.quality || 3) / 5; // 0.6 à 1.0
        const increase = Math.floor(Math.random() * 3 * qualityBonus);
        
        updatedSkills[skill] = Math.min((updatedSkills[skill] || 0) + increase, 10);
      });
      
      // Possibilité d'acquérir une nouvelle spécialité
      let updatedSpecialties = [...prev.specialties];
      if (Math.random() > 0.7 && newYear > 2) {
        // Exemple basique, en réalité vous auriez une liste basée sur le type d'éducation
        const potentialSpecialties = [
          "Commandement de cavalerie",
          "Stratégie défensive",
          "Entraînement des recrues",
          "Navigation",
          "Siège"
        ];
        
        const newSpecialty = potentialSpecialties[Math.floor(Math.random() * potentialSpecialties.length)];
        if (!updatedSpecialties.includes(newSpecialty)) {
          updatedSpecialties.push(newSpecialty);
        }
      }
      
      const result = {
        ...prev,
        currentYear: newYear,
        status: isComplete ? "completed" : "in_progress",
        skills: updatedSkills,
        specialties: updatedSpecialties
      };
      
      if (isComplete) {
        toast.success("L'éducation est terminée avec succès!");
      } else {
        toast.success(`Année ${newYear} terminée.`);
      }
      
      return result;
    });
  };
  
  const cancelEducation = (educationId: string) => {
    setEducation(prev => {
      if (!prev || prev.id !== educationId) return prev;
      
      toast.info("Éducation abandonnée");
      
      return {
        ...prev,
        status: "canceled"
      };
    });
  };
  
  const completeEducation = (educationId: string) => {
    setEducation(prev => {
      if (!prev || prev.id !== educationId) return prev;
      
      toast.success("Éducation terminée avec succès!");
      
      return {
        ...prev,
        status: "completed"
      };
    });
  };
  
  const startNewEducation = (formData: EducationFormData) => {
    const newEducation: EducationRecord = {
      id: `edu${Date.now()}`,
      ...formData
    };
    
    setEducation(newEducation);
    toast.success("Nouvelle éducation commencée");
  };
  
  return {
    child,
    education,
    loading,
    preceptors: mockPreceptors,
    updateEducation,
    advanceEducation,
    cancelEducation,
    completeEducation,
    startNewEducation
  };
};
