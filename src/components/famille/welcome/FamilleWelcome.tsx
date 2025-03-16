
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { formatRomanDate } from '@/utils/formatUtils';
import { 
  BookOpen, 
  GraduationCap, 
  UserRound, 
  Heart,
  Coins
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const FamilleWelcome: React.FC = () => {
  // Données de démonstration
  const userData = {
    name: "Marcus Tullius Cicero",
    familyHead: "Marcus Tullius",
    matron: "Terentia",
    childrenCount: 3,
    alliances: 2,
    wealth: 125000,
    date: new Date()
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Bienvenue, {userData.name}</h1>
      <p className="text-muted-foreground">
        Gérez votre famille, vos alliances et votre héritage pour assurer la pérennité de votre nom dans la Rome antique.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 flex flex-col items-center text-center">
          <UserRound className="h-10 w-10 text-rome-red mb-2" />
          <h3 className="font-bold text-lg">Pater Familias</h3>
          <p className="text-sm text-muted-foreground">{userData.familyHead}</p>
          <Button variant="link" asChild>
            <Link to="/famille/arbre">Voir l'arbre familial</Link>
          </Button>
        </Card>
        
        <Card className="p-4 flex flex-col items-center text-center">
          <Heart className="h-10 w-10 text-rome-red mb-2" />
          <h3 className="font-bold text-lg">Matrone</h3>
          <p className="text-sm text-muted-foreground">{userData.matron}</p>
          <Button variant="link" asChild>
            <Link to="/famille/mariage">Gérer le mariage</Link>
          </Button>
        </Card>
        
        <Card className="p-4 flex flex-col items-center text-center">
          <GraduationCap className="h-10 w-10 text-rome-red mb-2" />
          <h3 className="font-bold text-lg">Éducation</h3>
          <p className="text-sm text-muted-foreground">{userData.childrenCount} enfants</p>
          <Button variant="link" asChild>
            <Link to="/famille/education">Gérer l'éducation</Link>
          </Button>
        </Card>
        
        <Card className="p-4 flex flex-col items-center text-center">
          <Coins className="h-10 w-10 text-rome-red mb-2" />
          <h3 className="font-bold text-lg">Dot & Héritage</h3>
          <p className="text-sm text-muted-foreground">{userData.wealth.toLocaleString()} As</p>
          <Button variant="link" asChild>
            <Link to="/famille/heritage">Gérer l'héritage</Link>
          </Button>
        </Card>
      </div>
      
      <div className="text-center mt-8">
        <p className="text-muted-foreground">{formatRomanDate(userData.date)}</p>
        <Button className="mt-4" size="lg" asChild>
          <Link to="/famille/arbre">
            <BookOpen className="mr-2 h-5 w-5" />
            Consulter l'arbre généalogique
          </Link>
        </Button>
      </div>
    </div>
  );
};
