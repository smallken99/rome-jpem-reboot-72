
import { useState, useEffect } from 'react';
import { LandParcel } from '../types';

// Sample data for mockup purposes
const mockParcels: LandParcel[] = [
  {
    id: "1",
    name: "Campus Martius",
    location: "Rome",
    size: 1200,
    type: "cultivable",
    status: "protected",
    value: 120000,
    coordinates: { x: 150, y: 120 },
    resources: { fertility: 8, water: 9, minerals: 2 },
    description: "Terres sacrées dédiées à Mars, utilisées principalement pour les cérémonies religieuses et l'entraînement militaire."
  },
  {
    id: "2", 
    name: "Ager Latinus",
    location: "Latium",
    size: 5000,
    type: "cultivable",
    status: "allocated",
    value: 450000,
    allocation: {
      familyId: "fam-12",
      familyName: "Claudii",
      since: "603 AUC",
      until: "613 AUC"
    },
    coordinates: { x: 200, y: 150 },
    resources: { fertility: 7, water: 6, minerals: 3 },
    description: "Vastes terres fertiles idéales pour la culture du blé et des oliviers."
  },
  {
    id: "3",
    name: "Saltus Vescinus",
    location: "Campanie",
    size: 3000,
    type: "pastoral",
    status: "allocated",
    value: 250000,
    allocation: {
      familyId: "fam-7",
      familyName: "Cornelii",
      since: "601 AUC"
    },
    coordinates: { x: 250, y: 180 },
    resources: { fertility: 6, water: 8, minerals: 1 },
    description: "Pâturages de haute qualité, parfaits pour l'élevage de moutons et de bétail."
  },
  {
    id: "4",
    name: "Sylva Ciminia",
    location: "Étrurie",
    size: 4000,
    type: "forest",
    status: "available",
    value: 300000,
    coordinates: { x: 180, y: 100 },
    resources: { fertility: 5, water: 7, minerals: 4 },
    description: "Forêt dense riche en bois de construction et en gibier."
  },
  {
    id: "5",
    name: "Colles Albani",
    location: "Latium",
    size: 2500,
    type: "rocky",
    status: "available",
    value: 100000,
    coordinates: { x: 190, y: 140 },
    resources: { fertility: 2, water: 4, minerals: 8 },
    description: "Terrain rocheux contenant des gisements de pierre de qualité pour la construction."
  },
  {
    id: "6",
    name: "Lacus Trasimenus",
    location: "Ombrie",
    size: 1800,
    type: "wetland",
    status: "disputed",
    value: 150000,
    coordinates: { x: 220, y: 90 },
    resources: { fertility: 4, water: 10, minerals: 1 },
    description: "Zone humide riche en poissons et en roseaux, son attribution est contestée par plusieurs familles."
  }
];

export const useAgerPublicus = () => {
  const [landParcels, setLandParcels] = useState<LandParcel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchLandParcels = async () => {
      try {
        // Simulate API call
        setIsLoading(true);
        
        // In a real app, this would be an API call
        // const response = await fetch('/api/ager-publicus');
        // const data = await response.json();
        
        // For now, use mock data
        setTimeout(() => {
          setLandParcels(mockParcels);
          setIsLoading(false);
        }, 800);
      } catch (err) {
        console.error('Error fetching land parcels:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch land parcels'));
        setIsLoading(false);
      }
    };

    fetchLandParcels();
  }, []);

  return { landParcels, isLoading, error };
};
