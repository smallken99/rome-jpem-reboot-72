
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Building2, Leaf, Home, BadgeCent, TrendingUp, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PatrimoineOverview = ({ ruralProperties = 2, urbanProperties = 1, totalIncome = 12500, totalValue = 250000 }) => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Propriétés rurales</CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ruralProperties}</div>
            <p className="text-xs text-muted-foreground">
              Terres agricoles, fermes et domaines
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full" onClick={() => navigate('/proprietes/rural')}>
              Gérer
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Propriétés urbaines</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{urbanProperties}</div>
            <p className="text-xs text-muted-foreground">
              Domus, insulae et bâtiments commerciaux
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full" onClick={() => navigate('/proprietes/urban')}>
              Gérer
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Revenu annuel</CardTitle>
            <BadgeCent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalIncome.toLocaleString()} as</div>
            <p className="text-xs text-muted-foreground">
              Revenus provenant de vos propriétés
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full" onClick={() => navigate('/finances')}>
              Détails
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Valeur totale</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalValue.toLocaleString()} as</div>
            <p className="text-xs text-muted-foreground">
              Valeur estimée de vos propriétés
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="w-full" onClick={() => navigate('/patrimoine/evaluation')}>
              Évaluation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Résidence principale</CardTitle>
            <CardDescription>Votre domus familiale à Rome</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="rounded-md bg-slate-100 p-2">
                <Home className="h-8 w-8 text-slate-600" />
              </div>
              <div>
                <div className="font-semibold">Domus Corneliana</div>
                <div className="text-sm text-muted-foreground">Région du Palatin, Rome</div>
                <div className="mt-2 flex gap-2">
                  <Badge variant="outline">Luxueuse</Badge>
                  <Badge variant="outline">5 chambres</Badge>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => navigate('/proprietes/details/1')}>
              Voir les détails
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Esclaves & Personnel</CardTitle>
            <CardDescription>Serviteurs et travailleurs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="rounded-md bg-slate-100 p-2">
                <Users className="h-8 w-8 text-slate-600" />
              </div>
              <div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div>
                    <div className="text-sm font-medium">Esclaves domestiques</div>
                    <div className="text-2xl font-bold">16</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Esclaves agricoles</div>
                    <div className="text-2xl font-bold">42</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Affranchis</div>
                    <div className="text-2xl font-bold">4</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Coût annuel</div>
                    <div className="text-2xl font-bold">3200 as</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => navigate('/esclaves')}>
              Gérer le personnel
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
