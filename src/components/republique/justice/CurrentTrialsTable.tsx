
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Gavel } from 'lucide-react';

const trialsData = [
  {
    id: '1',
    affaire: 'Cicero vs. Clodius',
    type: 'Civil',
    tribunal: 'Centumvirs',
    preteur: 'M. Aurelius Cotta',
    accuse: 'P. Clodius Pulcher',
    plaignant: 'M. Tullius Cicero',
    dateDebut: '14 Mars 45 av. J.-C.',
    statut: 'En audience'
  },
  {
    id: '2',
    affaire: 'République vs. Catilina',
    type: 'Criminel',
    tribunal: 'Quaestio',
    preteur: 'M. Aurelius Cotta',
    accuse: 'L. Sergius Catilina',
    plaignant: 'République romaine',
    dateDebut: '28 Avril 45 av. J.-C.',
    statut: 'En délibération'
  },
  {
    id: '3',
    affaire: 'Pompeius vs. Crasus',
    type: 'Commercial',
    tribunal: 'Recuperatores',
    preteur: 'L. Licinius',
    accuse: 'M. Licinius Crassus',
    plaignant: 'Cn. Pompeius Magnus',
    dateDebut: '5 Mai 45 av. J.-C.',
    statut: 'Témoignages'
  },
  {
    id: '4',
    affaire: 'Antonius vs. Metellus',
    type: 'Propriété',
    tribunal: 'Centumvirs',
    preteur: 'L. Licinius',
    accuse: 'Q. Caecilius Metellus',
    plaignant: 'M. Antonius',
    dateDebut: '10 Mai 45 av. J.-C.',
    statut: 'En attente'
  },
  {
    id: '5',
    affaire: 'République vs. Verres',
    type: 'Extorsion',
    tribunal: 'Quaestio de repetundis',
    preteur: 'M. Aurelius Cotta',
    accuse: 'C. Verres',
    plaignant: 'Siciliens',
    dateDebut: '12 Mai 45 av. J.-C.',
    statut: 'Témoignages'
  }
];

export const CurrentTrialsTable: React.FC = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'En audience':
        return <Badge variant="success">En audience</Badge>;
      case 'En délibération':
        return <Badge variant="default">En délibération</Badge>;
      case 'Témoignages':
        return <Badge variant="secondary">Témoignages</Badge>;
      case 'En attente':
        return <Badge variant="outline">En attente</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="rounded-md border border-rome-gold/20">
      <Table>
        <TableHeader className="bg-muted/20">
          <TableRow>
            <TableHead className="font-cinzel">Affaire</TableHead>
            <TableHead className="font-cinzel">Type</TableHead>
            <TableHead className="font-cinzel">Tribunal</TableHead>
            <TableHead className="font-cinzel">Accusé</TableHead>
            <TableHead className="font-cinzel">Plaignant</TableHead>
            <TableHead className="font-cinzel">Date</TableHead>
            <TableHead className="font-cinzel">Statut</TableHead>
            <TableHead className="font-cinzel text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trialsData.map((trial) => (
            <TableRow key={trial.id} className="hover:bg-muted/10">
              <TableCell className="font-medium">{trial.affaire}</TableCell>
              <TableCell>{trial.type}</TableCell>
              <TableCell>{trial.tribunal}</TableCell>
              <TableCell>{trial.accuse}</TableCell>
              <TableCell>{trial.plaignant}</TableCell>
              <TableCell>{trial.dateDebut}</TableCell>
              <TableCell>
                {getStatusBadge(trial.statut)}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button size="icon" variant="ghost">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <Gavel className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
