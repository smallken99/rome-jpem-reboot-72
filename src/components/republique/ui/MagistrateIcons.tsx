
import React from 'react';
import { 
  Coins, 
  Building, 
  Gavel, 
  Award, 
  Scale, // Correction de Scales en Scale
  Users,
  Shield,
  Scroll,
  Flag
} from 'lucide-react';

export const MagistrateIcons = {
  Questeur: Coins,
  Edile: Building,
  Preteur: Gavel,
  Consul: Flag,
  Censeur: Scale, // Correction de Scales en Scale
};

export const FunctionIcons = {
  Finance: Coins,
  Justice: Gavel,
  Security: Shield,
  Administration: Building,
  Politique: Award,
  Lois: Scroll,
  Population: Users
};
