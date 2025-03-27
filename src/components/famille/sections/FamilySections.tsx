
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FamilyTree } from '../FamilyTree';
import { MarriageAlliances } from '../MarriageAlliances';
import { Education } from '../Education';
import { Inheritance } from '../Inheritance';
import { useCharacters } from '../hooks/useCharacters';
import { Character } from '@/types/character';

export const FamilySections: React.FC = () => {
  const navigate = useNavigate();
  const { localCharacters, handleChildBirth, handleNameChange, updateCharacter } = useCharacters();
  
  // Adaptateur pour le callback d'onChildBirth
  const handleOnChildBirth = (parentIds?: string[]) => {
    return handleChildBirth(parentIds);
  };
  
  return (
    <div className="space-y-10">
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Arbre Généalogique</CardTitle>
            <CardDescription>Visualisez les liens familiaux et l'histoire de votre lignée</CardDescription>
          </CardHeader>
          <CardContent>
            <FamilyTree characters={localCharacters} />
          </CardContent>
          <CardFooter>
            <Button variant="secondary" className="w-full" onClick={() => navigate('/famille/tree')}>
              Voir en détail <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
      </section>
      
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Alliances Matrimoniales</CardTitle>
            <CardDescription>Établissez des liens avec d'autres familles de Rome</CardDescription>
          </CardHeader>
          <CardContent>
            <MarriageAlliances 
              characters={localCharacters}
              onChildBirth={handleOnChildBirth}
            />
          </CardContent>
          <CardFooter>
            <Button variant="secondary" className="w-full" onClick={() => navigate('/famille/alliances')}>
              Gérer les alliances <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
      </section>
      
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Éducation</CardTitle>
            <CardDescription>Formez la prochaine génération selon vos valeurs</CardDescription>
          </CardHeader>
          <CardContent>
            <Education 
              characters={localCharacters}
              onNameChange={handleNameChange}
              onCharacterUpdate={updateCharacter}
            />
          </CardContent>
          <CardFooter>
            <Button variant="secondary" className="w-full" onClick={() => navigate('/famille/education')}>
              Gérer l'éducation <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
      </section>
      
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Héritage</CardTitle>
            <CardDescription>Planifiez votre succession et l'avenir de votre lignée</CardDescription>
          </CardHeader>
          <CardContent>
            <Inheritance />
          </CardContent>
          <CardFooter>
            <Button variant="secondary" className="w-full" onClick={() => navigate('/famille/inheritance')}>
              Gérer l'héritage <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
};
