
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

interface EquilibreStatusProps {
  status: 'stable' | 'instable' | 'critique';
  description: string;
}

export const EquilibreStatus: React.FC<EquilibreStatusProps> = ({ status, description }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'stable': return 'bg-green-50 border-green-200 text-green-700';
      case 'instable': return 'bg-amber-50 border-amber-200 text-amber-700';
      case 'critique': return 'bg-red-50 border-red-200 text-red-700';
      default: return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  return (
    <Card className={`${getStatusColor()} border`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <AlertCircle className="h-5 w-5" />
          État de la République: {status.charAt(0).toUpperCase() + status.slice(1)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
};
