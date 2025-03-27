
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alliance, AllianceType, AllianceStatus } from '@/types/alliance';
import { Badge } from '@/components/ui/badge';

interface AlliancesCardProps {
  alliances: Alliance[];
}

export const AlliancesCard: React.FC<AlliancesCardProps> = ({ alliances }) => {
  const activeAlliances = alliances.filter(a => a.status === 'active' || a.status === 'pending');
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Alliances</CardTitle>
      </CardHeader>
      <CardContent>
        {activeAlliances.length === 0 ? (
          <p className="text-muted-foreground">Aucune alliance active</p>
        ) : (
          <ul className="space-y-2">
            {activeAlliances.map((alliance) => (
              <li key={alliance.id} className="flex justify-between items-center">
                <span>{alliance.name || `Alliance ${alliance.id.slice(0, 6)}`}</span>
                <Badge>{alliance.type as AllianceType}</Badge>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};
