
import { useState, useCallback } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  rank: string;
  wealth: number;
  reputation: number;
  slaves: number;
  availableSlaves: number;
  reputation_populaires: number;
  reputation_optimates: number;
  reputation_plebs: number;
}

export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile>({
    id: 'user-1',
    name: 'Marcus Aurelius',
    rank: 'Sénateur',
    wealth: 150000,
    reputation: 65,
    slaves: 50,
    availableSlaves: 20,
    reputation_populaires: 45,
    reputation_optimates: 70,
    reputation_plebs: 55
  });
  
  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  }, []);
  
  const updateWealth = useCallback((amount: number) => {
    setProfile(prev => ({ ...prev, wealth: prev.wealth + amount }));
    return profile.wealth + amount;
  }, [profile.wealth]);
  
  const updateReputation = useCallback((faction: 'populaires' | 'optimates' | 'plebs', amount: number) => {
    setProfile(prev => {
      const key = `reputation_${faction}` as keyof UserProfile;
      const currentValue = prev[key] as number;
      const newValue = Math.max(0, Math.min(100, currentValue + amount));
      
      return { ...prev, [key]: newValue };
    });
  }, []);
  
  const updateSlaves = useCallback((amount: number) => {
    setProfile(prev => ({
      ...prev,
      slaves: Math.max(0, prev.slaves + amount),
      availableSlaves: Math.max(0, prev.availableSlaves + amount)
    }));
  }, []);
  
  const assignSlaves = useCallback((count: number): boolean => {
    if (count <= 0) return false;
    if (count > profile.availableSlaves) return false;
    
    setProfile(prev => ({
      ...prev,
      availableSlaves: prev.availableSlaves - count
    }));
    
    return true;
  }, [profile.availableSlaves]);
  
  const releaseSlaves = useCallback((count: number): boolean => {
    if (count <= 0) return false;
    if (count > (profile.slaves - profile.availableSlaves)) return false;
    
    setProfile(prev => ({
      ...prev,
      availableSlaves: prev.availableSlaves + count
    }));
    
    return true;
  }, [profile.slaves, profile.availableSlaves]);
  
  return {
    profile,
    updateProfile,
    updateWealth,
    updateReputation,
    updateSlaves,
    assignSlaves,
    releaseSlaves
  };
};
