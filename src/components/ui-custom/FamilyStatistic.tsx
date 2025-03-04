
import React from 'react';

interface FamilyStatisticProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconBgColor: string;
  iconColor: string;
}

export const FamilyStatistic: React.FC<FamilyStatisticProps> = ({ 
  icon, 
  title, 
  description, 
  iconBgColor, 
  iconColor 
}) => {
  return (
    <div className="flex items-start gap-4 p-4 transition-all duration-300 hover:bg-rome-gold/5 rounded-md">
      <div className={`${iconBgColor} rounded-full p-3`}>
        <div className={`${iconColor}`}>{icon}</div>
      </div>
      <div>
        <h4 className="font-cinzel text-lg font-semibold">{title}</h4>
        <p className="text-muted-foreground text-sm mt-1">{description}</p>
      </div>
    </div>
  );
};
