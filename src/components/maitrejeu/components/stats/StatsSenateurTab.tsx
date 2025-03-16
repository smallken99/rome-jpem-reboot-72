import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMaitreJeu } from '../../context';
import { PieChart, BarChart } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export const StatsSenateurTab: React.FC = () => {
  const { senateurs } = useMaitreJeu();
  
  // Calcul des statistiques
  const senateurCount = senateurs.length;
  const activeSenateurCount = senateurs.filter(s => s.statut === 'Patricien').length;
  const inactiveSenateurCount = senateurs.filter(s => s.statut === 'Plébéien').length;
  const playerSenateurCount = senateurs.filter(s => s.joueur).length;
  
  const populares = senateurs.filter(s => s.appartenance === 'Populares').length;
  const optimates = senateurs.filter(s => s.appartenance === 'Optimates').length;
  const neutral = senateurs.filter(s => s.appartenance === 'Neutral').length;
  
  const renderSenateurTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nom</TableHead>
          <TableHead>Âge</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead>Fonction</TableHead>
          <TableHead>Tendance</TableHead>
          <TableHead>Influence</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {senateurs.map(senateur => (
          <TableRow key={senateur.id}>
            <TableCell>{senateur.prenom} {senateur.nom}</TableCell>
            <TableCell>{senateur.age}</TableCell>
            <TableCell>{senateur.statut}</TableCell>
            <TableCell>{senateur.fonction}</TableCell>
            <TableCell>{senateur.appartenance}</TableCell>
            <TableCell>{senateur.influence}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Statistiques des Sénateurs Romains</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Nombre de Sénateurs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{senateurCount}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sénateurs Actifs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSenateurCount}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sénateurs Inactifs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inactiveSenateurCount}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sénateurs Joueurs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{playerSenateurCount}</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Répartition Politique</CardTitle>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <PieChart className="h-16 w-16 mx-auto mb-4 opacity-20" />
              <p>Populares: {populares}</p>
              <p>Optimates: {optimates}</p>
              <p>Neutres: {neutral}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Liste des Sénateurs</CardTitle>
          </CardHeader>
          <CardContent className="h-64 overflow-auto">
            {renderSenateurTable()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
