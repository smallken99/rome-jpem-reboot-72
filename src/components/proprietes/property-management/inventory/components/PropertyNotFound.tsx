
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PropertyNotFound: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="p-6">
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Propriété non trouvée</h2>
            <p className="text-muted-foreground mb-4">
              La propriété que vous recherchez n'existe pas.
            </p>
            <Button onClick={() => navigate('/patrimoine/proprietes')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux propriétés
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
