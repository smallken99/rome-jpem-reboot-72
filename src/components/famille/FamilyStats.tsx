
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, User, Baby, Heart } from 'lucide-react';

interface FamilyStatsProps {
  membersCount: number;
  adultsCount: number;
  childrenCount: number;
  healthStatus?: 'good' | 'fair' | 'poor';
}

export const FamilyStats: React.FC<FamilyStatsProps> = ({
  membersCount,
  adultsCount,
  childrenCount,
  healthStatus = 'good'
}) => {
  // Determine the health color
  const getHealthColor = () => {
    switch (healthStatus) {
      case 'good': return 'text-green-500';
      case 'fair': return 'text-amber-500';
      case 'poor': return 'text-red-500';
      default: return 'text-green-500';
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4 flex flex-col items-center justify-center space-y-2">
          <Users className="h-8 w-8 text-blue-500" />
          <h3 className="font-medium">Membres</h3>
          <p className="text-2xl font-bold">{membersCount}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex flex-col items-center justify-center space-y-2">
          <User className="h-8 w-8 text-indigo-500" />
          <h3 className="font-medium">Adultes</h3>
          <p className="text-2xl font-bold">{adultsCount}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex flex-col items-center justify-center space-y-2">
          <Baby className="h-8 w-8 text-pink-500" />
          <h3 className="font-medium">Enfants</h3>
          <p className="text-2xl font-bold">{childrenCount}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex flex-col items-center justify-center space-y-2">
          <Heart className={`h-8 w-8 ${getHealthColor()}`} />
          <h3 className="font-medium">Santé Familiale</h3>
          <p className={`text-lg font-bold ${getHealthColor()}`}>
            {healthStatus === 'good' ? 'Bonne' : healthStatus === 'fair' ? 'Moyenne' : 'Préoccupante'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
