
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Construction, CalendarClock, CheckCircle } from 'lucide-react';

interface UnderDevelopmentSectionProps {
  title: string;
  description: string;
  estimatedRelease: string;
  features: string[];
}

export const UnderDevelopmentSection: React.FC<UnderDevelopmentSectionProps> = ({
  title,
  description,
  estimatedRelease,
  features
}) => {
  return (
    <div className="flex flex-col items-center py-12">
      <Construction className="h-16 w-16 text-amber-500 mb-4" />
      
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-muted-foreground max-w-lg mx-auto">{description}</p>
        
        <Badge variant="outline" className="mt-4">
          <CalendarClock className="h-3 w-3 mr-1" />
          {estimatedRelease}
        </Badge>
      </div>
      
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-lg">
            Fonctionnalités à venir
          </CardTitle>
          <CardDescription>
            Cette section est actuellement en développement et offrira bientôt les fonctionnalités suivantes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          
          <div className="flex items-center gap-2 mt-6 p-3 bg-amber-50 text-amber-800 rounded-md">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            <p className="text-sm">
              Nous travaillons activement sur ces fonctionnalités pour les rendre disponibles dans les meilleurs délais.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
