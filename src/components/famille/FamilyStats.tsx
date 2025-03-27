
import React from 'react';
import { 
  Users, 
  UserCircle, 
  Coins,
  Trophy,
  Calendar
} from 'lucide-react';

interface FamilyStatsProps {
  membersCount: number;
  adultsCount: number;
  childrenCount: number;
  familyFunds?: number;
  familyPrestige?: number;
  familyAge?: number;
}

export const FamilyStats: React.FC<FamilyStatsProps> = ({
  membersCount,
  adultsCount,
  childrenCount,
  familyFunds = 0,
  familyPrestige = 0,
  familyAge = 0
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div className="flex items-center space-x-2">
        <Users className="h-5 w-5 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium">Membres</p>
          <p className="text-2xl">{membersCount}</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <UserCircle className="h-5 w-5 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium">Adultes</p>
          <p className="text-2xl">{adultsCount}</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Users className="h-5 w-5 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium">Enfants</p>
          <p className="text-2xl">{childrenCount}</p>
        </div>
      </div>
      
      {familyFunds > 0 && (
        <div className="flex items-center space-x-2">
          <Coins className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Fortune</p>
            <p className="text-2xl">{familyFunds.toLocaleString()} <span className="text-sm">as</span></p>
          </div>
        </div>
      )}
      
      {familyPrestige > 0 && (
        <div className="flex items-center space-x-2">
          <Trophy className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Prestige</p>
            <p className="text-2xl">{familyPrestige}</p>
          </div>
        </div>
      )}
      
      {familyAge > 0 && (
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm font-medium">Âge de la famille</p>
            <p className="text-2xl">{familyAge} <span className="text-sm">ans</span></p>
          </div>
        </div>
      )}
    </div>
  );
};
