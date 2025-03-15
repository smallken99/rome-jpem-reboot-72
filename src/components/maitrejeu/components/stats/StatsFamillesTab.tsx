
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useMaitreJeu } from '../../context';
import { Users2, UserRoundCheck } from 'lucide-react';

export const StatsFamillesTab: React.FC = () => {
  const { familles, membres, alliances } = useMaitreJeu();
  
  // Statistiques des familles
  const totalFamilles = familles.length;
  const totalMembres = membres.length;
  const totalAlliances = alliances.length;
  
  // Ratio homme/femme
  const hommes = membres.filter(m => m.sexe === 'H').length;
  const femmes = membres.filter(m => m.sexe === 'F').length;
  const ratioHommesFemmes = hommes / femmes || 1;
  
  // Familles par prestige
  const famillesPrestige = [...familles].sort((a, b) => b.prestige - a.prestige).slice(0, 5);
  
  // Statuts
  const patriciens = familles.filter(f => f.statut === 'patricienne').length;
  const plebeiens = familles.filter(f => f.statut === 'plébéienne').length;
  
  // Calcul de l'âge moyen
  const membresAvecAge = membres.filter(m => m.age);
  const ageMoyen = membresAvecAge.length > 0
    ? Math.round(membresAvecAge.reduce((sum, m) => sum + (m.age || 0), 0) / membresAvecAge.length)
    : 30;
  
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Statistiques familiales</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total des familles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFamilles}</div>
            <div className="text-xs text-muted-foreground">Familles enregistrées</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total des membres</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMembres}</div>
            <div className="text-xs text-muted-foreground">Membres de familles</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Alliances</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAlliances}</div>
            <div className="text-xs text-muted-foreground">Pactes entre familles</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Âge moyen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ageMoyen} ans</div>
            <div className="text-xs text-muted-foreground">Membres de familles</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users2 className="h-5 w-5" /> Statuts et compositions
            </CardTitle>
            <CardDescription>
              Répartition sociale des familles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <h4 className="font-medium mb-2">Statut social</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-amber-50 border border-amber-100 p-3 rounded-md">
                    <div className="text-lg font-bold text-amber-800">{patriciens}</div>
                    <div className="text-xs text-muted-foreground">Familles patriciennes</div>
                  </div>
                  <div className="bg-blue-50 border border-blue-100 p-3 rounded-md">
                    <div className="text-lg font-bold text-blue-800">{plebeiens}</div>
                    <div className="text-xs text-muted-foreground">Familles plébéiennes</div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-muted/30 rounded-lg">
                <h4 className="font-medium mb-2">Composition</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-sky-50 border border-sky-100 p-3 rounded-md">
                    <div className="text-lg font-bold text-sky-800">{hommes}</div>
                    <div className="text-xs text-muted-foreground">Hommes</div>
                  </div>
                  <div className="bg-pink-50 border border-pink-100 p-3 rounded-md">
                    <div className="text-lg font-bold text-pink-800">{femmes}</div>
                    <div className="text-xs text-muted-foreground">Femmes</div>
                  </div>
                </div>
                <div className="mt-2 text-xs text-muted-foreground text-center">
                  Ratio H/F: {ratioHommesFemmes.toFixed(2)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserRoundCheck className="h-5 w-5" /> Familles prestigieuses
            </CardTitle>
            <CardDescription>
              Classement par prestige
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Famille</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Prestige</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {famillesPrestige.map((famille) => (
                  <TableRow key={famille.id}>
                    <TableCell className="font-medium">
                      {famille.nom}
                    </TableCell>
                    <TableCell>{famille.statut}</TableCell>
                    <TableCell className="text-right">{famille.prestige}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
