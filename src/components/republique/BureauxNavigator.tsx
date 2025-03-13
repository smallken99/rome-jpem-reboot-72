
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { magistracies } from '@/data/magistracies';

export const BureauxNavigator: React.FC<{ currentBureau?: string }> = ({ currentBureau }) => {
  const navigate = useNavigate();
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
      {magistracies.map(magistrate => {
        const MagIcon = magistrate.icon;
        const isActive = currentBureau === magistrate.id;
        
        return (
          <Button
            key={magistrate.id}
            variant={isActive ? "default" : "outline"}
            className={`flex items-center gap-2 ${isActive ? "" : "border-rome-gold/30 hover:border-rome-gold/60"}`}
            onClick={() => navigate(`/republique/bureaux/${magistrate.id}`)}
          >
            <div className={`p-1 rounded-full ${magistrate.iconBgColor}`}>
              <MagIcon className={`h-4 w-4 ${magistrate.iconColor}`} />
            </div>
            <span className="text-sm">{magistrate.name}</span>
          </Button>
        );
      })}
    </div>
  );
};
