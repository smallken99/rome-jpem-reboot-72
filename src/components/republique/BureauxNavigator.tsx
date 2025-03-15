
import React from 'react';
import { NavLink } from 'react-router-dom';
import { magistracies } from '@/data/magistracies';

interface BureauxNavigatorProps {
  currentBureau?: string;
}

export const BureauxNavigator: React.FC<BureauxNavigatorProps> = ({ currentBureau }) => {
  return (
    <div className="flex overflow-x-auto space-x-2 py-2 pb-4">
      {magistracies.map(magistracy => (
        <NavLink
          key={magistracy.id}
          to={`/republique/bureaux/${magistracy.id}`}
          className={({ isActive }) => 
            `px-4 py-2 rounded-md whitespace-nowrap transition-colors duration-200 ${
              isActive || currentBureau === magistracy.id
                ? 'bg-rome-gold/20 text-rome-navy font-medium'
                : 'bg-white hover:bg-muted/50 text-muted-foreground'
            }`
          }
        >
          <div className="flex items-center gap-2">
            {React.createElement(magistracy.icon, { className: 'h-4 w-4' })}
            <span>{magistracy.name}</span>
          </div>
        </NavLink>
      ))}
    </div>
  );
};
