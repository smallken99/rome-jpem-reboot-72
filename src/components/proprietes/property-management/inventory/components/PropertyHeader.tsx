
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PropertyHeaderProps {
  propertyName: string;
  propertyId: string;
}

export const PropertyHeader: React.FC<PropertyHeaderProps> = ({ propertyName, propertyId }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Inventaire: {propertyName}</h1>
        <p className="text-muted-foreground">Gestion des ressources et stocks de votre propriété</p>
      </div>
      <Button variant="outline" onClick={() => navigate(`/patrimoine/proprietes/${propertyId}`)}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Retour aux détails
      </Button>
    </div>
  );
};
