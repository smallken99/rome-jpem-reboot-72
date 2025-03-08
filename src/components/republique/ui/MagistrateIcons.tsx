
import React from 'react';
import { 
  Coins, 
  Scales, 
  Shield, 
  LandPlot, 
  ScrollText, 
  Building,
  BookOpen,
  BadgeDollarSign,
  Gavel,
  Crown,
  StarIcon 
} from 'lucide-react';

type MagistrateIconProps = {
  magistrate: string;
  size?: number;
  className?: string;
};

export const MagistrateIcon: React.FC<MagistrateIconProps> = ({ 
  magistrate, 
  size = 24, 
  className = "" 
}) => {
  // Map des icônes par magistrature
  const iconMap: Record<string, React.ReactNode> = {
    questeur: <Coins size={size} className={className} />,
    consul: <Crown size={size} className={className} />,
    censeur: <ScrollText size={size} className={className} />,
    preteur: <Scales size={size} className={className} />,
    edile: <Building size={size} className={className} />,
    tribun: <Shield size={size} className={className} />,
    augure: <StarIcon size={size} className={className} />,
    pontife: <BookOpen size={size} className={className} />,
    fiscal: <BadgeDollarSign size={size} className={className} />,
    juge: <Gavel size={size} className={className} />,
    agraire: <LandPlot size={size} className={className} />
  };

  // Retourne l'icône appropriée ou une icône par défaut
  return (
    <>
      {iconMap[magistrate.toLowerCase()] || <Coins size={size} className={className} />}
    </>
  );
};
