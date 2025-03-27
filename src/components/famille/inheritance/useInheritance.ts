
import { useState, useEffect } from 'react';
import { Property } from '@/types/patrimoine';

export interface FamilyMember {
  id: string;
  nom: string;
  prenom: string;
  genre: 'male' | 'female';
  age: number;
  role?: string;
  traits?: string[];
  relation: 'self' | 'son' | 'daughter' | 'wife' | 'brother' | 'sister' | 'other';
  isAdult: boolean;
}

export const useInheritance = (familyId: string) => {
  const [selectedHeirId, setSelectedHeirId] = useState<string | null>(null);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  
  // Simuler le chargement des membres de la famille
  useEffect(() => {
    // Données fictives pour les membres de la famille
    const mockFamilyMembers: FamilyMember[] = [
      {
        id: 'fm-1',
        nom: 'Aurelius',
        prenom: 'Marcus',
        genre: 'male',
        age: 45,
        role: 'Pater Familias',
        relation: 'self',
        isAdult: true,
        traits: ['Éloquent', 'Pragmatique', 'Stoïque']
      },
      {
        id: 'fm-2',
        nom: 'Aurelius',
        prenom: 'Lucius',
        genre: 'male',
        age: 19,
        role: 'Fils aîné',
        relation: 'son',
        isAdult: true,
        traits: ['Ambitieux', 'Impulsif']
      },
      {
        id: 'fm-3',
        nom: 'Aurelius',
        prenom: 'Gaius',
        genre: 'male',
        age: 15,
        role: 'Fils cadet',
        relation: 'son',
        isAdult: false,
        traits: ['Intelligent', 'Réservé']
      },
      {
        id: 'fm-4',
        nom: 'Aurelia',
        prenom: 'Julia',
        genre: 'female',
        age: 17,
        role: 'Fille',
        relation: 'daughter',
        isAdult: false,
        traits: ['Cultivée', 'Pieuse']
      }
    ];
    
    setFamilyMembers(mockFamilyMembers);
    
    // Par défaut, le fils aîné est l'héritier désigné
    const eldestSon = mockFamilyMembers.find(member => 
      member.genre === 'male' && 
      member.relation === 'son' && 
      member.isAdult
    );
    
    if (eldestSon) {
      setSelectedHeirId(eldestSon.id);
    }
    
    // Données fictives pour les propriétés
    const mockProperties: Property[] = [
      {
        id: 'prop-1',
        name: 'Domus du Palatin',
        type: 'domus',
        location: 'Rome - Palatin',
        value: 150000,
        income: 0,
        maintenance: 3000,
        condition: 85,
        acquired: new Date().toISOString()
      },
      {
        id: 'prop-2',
        name: 'Villa Rustica',
        type: 'villa',
        location: 'Campanie',
        value: 200000,
        income: 12000,
        maintenance: 5000,
        condition: 90,
        acquired: new Date().toISOString()
      },
      {
        id: 'prop-3',
        name: 'Insula de la Via Sacra',
        type: 'insula',
        location: 'Rome - Forum',
        value: 80000,
        income: 6000,
        maintenance: 2000,
        condition: 75,
        acquired: new Date().toISOString()
      }
    ];
    
    setProperties(mockProperties);
  }, [familyId]);
  
  // Filtrer uniquement les héritiers potentiels (hommes adultes)
  const potentialHeirs = familyMembers.filter(member => 
    member.genre === 'male' && member.isAdult
  );
  
  // Fonction pour sélectionner un héritier
  const selectHeir = (heirId: string) => {
    const heir = familyMembers.find(member => member.id === heirId);
    
    if (heir && heir.genre === 'male' && heir.isAdult) {
      setSelectedHeirId(heirId);
      return true;
    }
    
    return false;
  };
  
  return {
    familyMembers,
    potentialHeirs,
    selectedHeirId,
    selectHeir,
    properties
  };
};
