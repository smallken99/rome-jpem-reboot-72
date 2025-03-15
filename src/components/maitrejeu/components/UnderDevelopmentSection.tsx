
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Construction, Wrench } from 'lucide-react';

interface UnderDevelopmentSectionProps {
  title: string;
  description?: string;
}

export const UnderDevelopmentSection: React.FC<UnderDevelopmentSectionProps> = ({ 
  title,
  description = "Cette section est actuellement en cours de développement et sera disponible prochainement."
}) => {
  return (
    <Card className="border-amber-300">
      <CardHeader className="border-b border-amber-200 bg-amber-50 pb-3">
        <CardTitle className="text-lg font-semibold flex items-center text-amber-800">
          <Construction className="mr-2 h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center justify-center text-center p-6">
          <div className="bg-amber-100 p-4 rounded-full mb-4">
            <Wrench className="h-12 w-12 text-amber-500" />
          </div>
          
          <h3 className="text-xl font-semibold mb-2">Section en développement</h3>
          
          <p className="text-muted-foreground max-w-md mb-4">
            {description}
          </p>
          
          <div className="flex items-center text-sm bg-amber-50 border border-amber-200 rounded-md px-3 py-2 text-amber-700">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Des mises à jour régulières étendront les fonctionnalités disponibles.
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
