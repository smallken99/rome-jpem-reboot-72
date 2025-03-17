
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useEducation } from '../context/EducationContext';
import { Lightbulb, Loader2 } from 'lucide-react';

export const EducationInfoBox: React.FC = () => {
  const { isLoading } = useEducation();
  
  if (isLoading) {
    return (
      <Card className="mb-6">
        <CardContent className="p-4 flex items-center justify-center">
          <Loader2 className="h-5 w-5 animate-spin mr-2 text-muted-foreground" />
          <span className="text-muted-foreground">Chargement des informations...</span>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex gap-3 items-start">
          <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5" />
          <div>
            <p className="text-sm">
              L'éducation des enfants est essentielle pour l'avenir de votre famille. Choisissez judicieusement
              le type d'éducation selon le rôle que vous envisagez pour votre enfant.
            </p>
            <ul className="text-sm mt-2 space-y-1">
              <li><span className="font-medium">Éducation Militaire</span> - Pour les fils destinés à la carrière militaire</li>
              <li><span className="font-medium">Éducation Rhétorique</span> - Pour ceux qui se destinent à la politique</li>
              <li><span className="font-medium">Éducation Religieuse</span> - Pour garantir la faveur des dieux</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
