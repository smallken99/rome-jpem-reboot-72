
import React from 'react';
import { 
  Gavel, Scroll, Book, Shield, Users, 
  Landmark, Award, Flag, File, Coins, 
  Scale, Building, Swords, Hammer, 
  BookOpenCheck, Map, Receipt, 
  LineChart, LandPlot, Calculator,
  Archive, Database 
} from 'lucide-react';

export const MagistrateIcons = {
  // Magistratures
  questeur: Coins,
  edile: Building,
  preteur: Gavel,
  consul: Swords,
  censeur: BookOpenCheck,
  pontife: Shield,
  tribun: Users,
  
  // Fonctions du questeur
  tresor: Coins,
  impots: Receipt,
  domaines: Map,
  ager: LandPlot,
  depenses: LineChart,
  
  // Fonctions génériques
  default: Landmark,
  law: Scale,
  archive: Archive,
  database: Database,
  calculator: Calculator,
  
  // Fonctions qu'on peut réutiliser
  getDynamicIcon: (iconName: string) => {
    const iconKey = iconName.toLowerCase() as keyof typeof MagistrateIcons;
    if (typeof MagistrateIcons[iconKey] === 'function') {
      return MagistrateIcons[iconKey];
    }
    return MagistrateIcons.default;
  }
};

export interface MagistrateIconProps {
  name: string;
  className?: string;
}

export const MagistrateIcon: React.FC<MagistrateIconProps> = ({ name, className = "h-6 w-6" }) => {
  const IconComponent = MagistrateIcons.getDynamicIcon(name);
  return <IconComponent className={className} />;
};
