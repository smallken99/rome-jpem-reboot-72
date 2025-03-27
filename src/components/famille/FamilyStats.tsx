
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, UserPlus, UserMinus } from 'lucide-react';

interface FamilyStatsProps {
  membersCount: number;
  adultsCount: number;
  childrenCount: number;
}

export const FamilyStats: React.FC<FamilyStatsProps> = ({
  membersCount,
  adultsCount,
  childrenCount
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-3">
            <Users className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Membres</p>
              <p className="text-2xl font-bold">{membersCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-3">
            <Users className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm text-muted-foreground">Adultes</p>
              <p className="text-2xl font-bold">{adultsCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-3">
            <UserPlus className="h-5 w-5 text-rose-500" />
            <div>
              <p className="text-sm text-muted-foreground">Enfants</p>
              <p className="text-2xl font-bold">{childrenCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
