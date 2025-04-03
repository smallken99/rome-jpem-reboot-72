
import React from 'react';
import { Character } from '@/types/character';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollText, User, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface InheritanceDetailsProps {
  character: Character;
  heirs: Character[];
}

export const InheritanceDetails: React.FC<InheritanceDetailsProps> = ({ 
  character, 
  heirs 
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ScrollText className="h-5 w-5 text-primary" />
              Testament
            </CardTitle>
            <CardDescription>
              Dernières volontés et dispositions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {character.testamentaryWishes ? (
              <div className="prose prose-sm max-w-none">
                <p>{character.testamentaryWishes}</p>
              </div>
            ) : (
              <div className="text-muted-foreground italic">
                <p>Aucune disposition testamentaire n'a été rédigée.</p>
                <p className="mt-2">
                  Rédigez vos dernières volontés pour assurer la transmission de votre patrimoine
                  et de vos titres selon vos souhaits.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Testateur
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={character.portrait} alt={character.name} />
                <AvatarFallback>{character.name?.charAt(0) || 'P'}</AvatarFallback>
              </Avatar>
              <h3 className="text-lg font-semibold">{character.name}</h3>
              <p className="text-sm text-muted-foreground">{character.age} ans</p>
              <Badge className="mt-2">Chef de famille</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Héritiers potentiels
          </CardTitle>
          <CardDescription>
            Par ordre de priorité dans la succession
          </CardDescription>
        </CardHeader>
        <CardContent>
          {heirs.length > 0 ? (
            <div className="space-y-4">
              {heirs.map((heir, index) => (
                <div 
                  key={heir.id} 
                  className="flex items-center p-3 border rounded-md bg-muted/20"
                >
                  <div className="font-bold text-xl mr-4 text-muted-foreground">
                    {index + 1}
                  </div>
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage src={heir.portrait} alt={heir.name} />
                    <AvatarFallback>{heir.name?.charAt(0) || '?'}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{heir.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {heir.relation} • {heir.age} ans
                    </p>
                  </div>
                  {index === 0 && (
                    <Badge className="ml-auto bg-amber-500">Héritier principal</Badge>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-6 text-muted-foreground">
              <p>Aucun héritier potentiel trouvé</p>
              <p className="text-sm mt-2">
                Ajoutez des membres à votre famille pour désigner des héritiers
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
