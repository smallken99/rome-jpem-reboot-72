
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NotFoundProps {
  title?: string;
  description?: string;
  backLink?: string;
  backText?: string;
}

export const NotFound: React.FC<NotFoundProps> = ({
  title = "Page non trouvée",
  description = "La ressource que vous recherchez n'existe pas ou a été déplacée.",
  backLink = "/",
  backText = "Retour à l'accueil"
}) => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    if (backLink) {
      navigate(backLink);
    } else {
      window.history.back();
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="mx-auto bg-muted w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle size={32} className="text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground">
          <p>Vérifiez l'URL ou naviguez vers une autre section.</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleBack}>{backText}</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
