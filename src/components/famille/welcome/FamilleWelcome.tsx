
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Book,
  Building,
  Calendar,
  Crown,
  GraduationCap,
  Heart,
  Scroll,
  User,
  Users,
  CoinIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMaitreJeu } from '@/components/maitrejeu/context';
import { usePatrimoine } from '@/hooks/usePatrimoine';
import { formatCurrency } from '@/lib/utils';

export const FamilleWelcome: React.FC = () => {
  const { membres, familles } = useMaitreJeu();
  const { properties, balance } = usePatrimoine();
  
  // Utilisation d'un ID de famille fictif pour le moment - à remplacer par le contexte utilisateur
  const CURRENT_FAMILLE_ID = "famille-1";
  
  // Filtrer les membres de la famille actuelle
  const familleMembers = membres.filter(m => m.familleId === CURRENT_FAMILLE_ID);
  const famille = familles.find(f => f.id === CURRENT_FAMILLE_ID);
  
  return (
    <div className="space-y-8">
      <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-100">
        <h2 className="text-2xl font-cinzel font-bold text-rome-navy mb-3">
          Bonjour, {familleMembers.length > 0 
            ? `${familleMembers[0].prenom} ${familleMembers[0].nom}` 
            : "Marcus Tullius Cicero"
          }
        </h2>
        <p className="text-muted-foreground mb-4">
          Bienvenue dans la gestion de votre famille. C'est ici que vous pourrez gérer votre lignée, 
          établir des alliances avec d'autres familles et garantir la pérennité de votre nom à Rome.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <Link to="/famille/arbre-genealogique">
              <Users className="mr-2 h-4 w-4" />
              Voir l'arbre généalogique
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/famille/education">
              <GraduationCap className="mr-2 h-4 w-4" />
              Éducation des enfants
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-3 rounded-full">
            <CoinIcon className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-blue-600 font-medium">Patrimoine Familial</p>
            <p className="text-2xl font-bold text-blue-800">{formatCurrency(balance)}</p>
          </div>
        </div>
        
        <div className="h-12 w-px bg-blue-200 hidden md:block"></div>
        
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-3 rounded-full">
            <Building className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-blue-600 font-medium">Propriétés</p>
            <p className="text-2xl font-bold text-blue-800">{properties.length}</p>
          </div>
        </div>
        
        <div className="h-12 w-px bg-blue-200 hidden md:block"></div>
        
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-3 rounded-full">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-blue-600 font-medium">Membres</p>
            <p className="text-2xl font-bold text-blue-800">{familleMembers.length || 8}</p>
          </div>
        </div>
        
        <div className="ml-auto hidden md:flex">
          <Button variant="outline" className="bg-white" asChild>
            <Link to="/famille/heritage">
              Gérer le patrimoine
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg font-cinzel">
              <Users className="mr-2 h-5 w-5 text-rome-red" />
              Arbre Généalogique
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm text-muted-foreground mb-2">
              Consultez et développez votre lignée familiale en visualisant tous les membres de votre famille.
            </p>
            <ul className="text-sm space-y-1 mb-4">
              <li className="flex items-center gap-1">
                <User className="h-4 w-4 text-blue-500" />
                <span>{familleMembers.length || 8} membres dans votre famille</span>
              </li>
              <li className="flex items-center gap-1">
                <Crown className="h-4 w-4 text-amber-500" />
                <span>Lignée remontant à 3 générations</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="default" size="sm" className="w-full" asChild>
              <Link to="/famille/arbre-genealogique">Accéder</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg font-cinzel">
              <Heart className="mr-2 h-5 w-5 text-rome-red" />
              Alliances Matrimoniales
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm text-muted-foreground mb-2">
              Établissez des alliances stratégiques avec d'autres familles romaines pour renforcer votre influence.
            </p>
            <ul className="text-sm space-y-1 mb-4">
              <li className="flex items-center gap-1">
                <Building className="h-4 w-4 text-purple-500" />
                <span>{famille?.alliances?.length || 3} alliances actuelles</span>
              </li>
              <li className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-green-500" />
                <span>2 propositions d'alliance en attente</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="default" size="sm" className="w-full" asChild>
              <Link to="/famille/alliances">Accéder</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg font-cinzel">
              <GraduationCap className="mr-2 h-5 w-5 text-rome-red" />
              Éducation des Enfants
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm text-muted-foreground mb-2">
              Formez la prochaine génération selon vos ambitions pour leur avenir et celui de la famille.
            </p>
            <ul className="text-sm space-y-1 mb-4">
              <li className="flex items-center gap-1">
                <Book className="h-4 w-4 text-blue-500" />
                <span>{familleMembers.filter(m => m.age < 16).length || 3} enfants en âge d'éducation</span>
              </li>
              <li className="flex items-center gap-1">
                <User className="h-4 w-4 text-amber-500" />
                <span>2 précepteurs employés</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="default" size="sm" className="w-full" asChild>
              <Link to="/famille/education">Accéder</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg font-cinzel">
              <Crown className="mr-2 h-5 w-5 text-rome-red" />
              Héritage et Succession
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm text-muted-foreground mb-2">
              Planifiez l'avenir de votre famille en organisant la transmission de vos biens et de votre nom.
            </p>
            <ul className="text-sm space-y-1 mb-4">
              <li className="flex items-center gap-1">
                <User className="h-4 w-4 text-green-500" />
                <span>
                  {famille?.chefId 
                    ? `${membres.find(m => m.id === famille.chefId)?.prenom} désigné comme héritier` 
                    : "Héritier à désigner"
                  }
                </span>
              </li>
              <li className="flex items-center gap-1">
                <Scroll className="h-4 w-4 text-amber-500" />
                <span>Testament mis à jour il y a 2 mois</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="default" size="sm" className="w-full" asChild>
              <Link to="/famille/heritage">Accéder</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg font-cinzel">
              <Scroll className="mr-2 h-5 w-5 text-rome-red" />
              Documents Familiaux
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm text-muted-foreground mb-2">
              Consultez les archives familiales, les contrats et les documents importants de votre gens.
            </p>
            <ul className="text-sm space-y-1 mb-4">
              <li className="flex items-center gap-1">
                <Book className="h-4 w-4 text-blue-500" />
                <span>12 documents archivés</span>
              </li>
              <li className="flex items-center gap-1">
                <Calendar className="h-4 w-4 text-purple-500" />
                <span>Histoire familiale consultable</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="default" size="sm" className="w-full" asChild>
              <Link to="/famille/documents">Accéder</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
