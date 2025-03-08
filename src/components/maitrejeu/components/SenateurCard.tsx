
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye } from 'lucide-react';
import { SenateurJouable, SenateurCardProps } from '../types/senateurs';

const SenateurCard: React.FC<SenateurCardProps> = ({ senateur, onViewSenateur }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-slate-50 pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{senateur.nom}</h3>
            <p className="text-sm text-muted-foreground">{senateur.famille}</p>
          </div>
          {senateur.stats && (
            <Badge variant={senateur.stats.eloquence > 3 ? "default" : "outline"} className="ml-2">
              Éloquence: {senateur.stats.eloquence}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-2">
          {senateur.faction && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Faction:</span>
              <span>{senateur.faction}</span>
            </div>
          )}
          {senateur.fonctionActuelle && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Fonction:</span>
              <span>{senateur.fonctionActuelle}</span>
            </div>
          )}
          {senateur.magistrature && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Magistrature:</span>
              <span>{senateur.magistrature}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-3 bg-slate-50">
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full"
          onClick={() => onViewSenateur(senateur.id)}
        >
          <Eye className="h-4 w-4 mr-2" />
          Voir les détails
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SenateurCard;
