
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useMaitreJeu } from '../../context';
import { Users, UserRoundCog, Filter } from 'lucide-react';

export const StatsSenateurTab: React.FC = () => {
  const { senateurs } = useMaitreJeu();
  
  // Calcul des statistiques
  const totalSenateurs = senateurs.length;
  const jouables = senateurs.filter(s => s.status === 'jouable').length;
  const pnj = senateurs.filter(s => s.status === 'pnj').length;
  const inactifs = senateurs.filter(s => s.status === 'inactif').length;
  
  const factions = {
    populares: senateurs.filter(s => s.faction === 'populares').length,
    optimates: senateurs.filter(s => s.faction === 'optimates').length,
    moderate: senateurs.filter(s => s.faction === 'moderate').length
  };
  
  // Liste des sénateurs triée par influence
  const senateursTries = [...senateurs].sort((a, b) => b.influence - a.influence).slice(0, 5);
  
  // Âge moyen
  const ageTotal = senateurs.reduce((sum, s) => sum + (s.age || 30), 0);
  const ageMoyen = Math.round(ageTotal / (totalSenateurs || 1));
  
  // Influence moyenne
  const influenceTotal = senateurs.reduce((sum, s) => sum + s.influence, 0);
  const influenceMoyenne = Math.round(influenceTotal / (totalSenateurs || 1));
  
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Analyse du Sénat</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total des sénateurs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSenateurs}</div>
            <div className="text-xs text-muted-foreground">Membres du Sénat</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Âge moyen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ageMoyen} ans</div>
            <div className="text-xs text-muted-foreground">Sénateurs romains</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Influence moyenne</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{influenceMoyenne}</div>
            <div className="text-xs text-muted-foreground">Points d'influence</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Statuts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm">
              <span>Jouables:</span>
              <span className="font-medium">{jouables}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>PNJ:</span>
              <span className="font-medium">{pnj}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Inactifs:</span>
              <span className="font-medium">{inactifs}</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" /> Répartition des factions
            </CardTitle>
            <CardDescription>
              Affiliations politiques au Sénat
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-blue-50 border border-blue-100 rounded-md">
                <span className="font-medium text-blue-700">Populares</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{factions.populares}</span>
                  <span className="text-xs text-muted-foreground">
                    ({Math.round((factions.populares / totalSenateurs) * 100)}%)
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-2 bg-red-50 border border-red-100 rounded-md">
                <span className="font-medium text-red-700">Optimates</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{factions.optimates}</span>
                  <span className="text-xs text-muted-foreground">
                    ({Math.round((factions.optimates / totalSenateurs) * 100)}%)
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-2 bg-green-50 border border-green-100 rounded-md">
                <span className="font-medium text-green-700">Modérés</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{factions.moderate}</span>
                  <span className="text-xs text-muted-foreground">
                    ({Math.round((factions.moderate / totalSenateurs) * 100)}%)
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserRoundCog className="h-5 w-5" /> Sénateurs influents
            </CardTitle>
            <CardDescription>
              Classement par influence
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Faction</TableHead>
                  <TableHead className="text-right">Influence</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {senateursTries.map((senateur) => (
                  <TableRow key={senateur.id}>
                    <TableCell className="font-medium">
                      {senateur.prenom} {senateur.nom}
                    </TableCell>
                    <TableCell>{senateur.faction}</TableCell>
                    <TableCell className="text-right">{senateur.influence}</TableCell>
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
