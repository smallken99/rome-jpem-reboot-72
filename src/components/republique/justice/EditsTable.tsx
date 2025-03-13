
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2 } from 'lucide-react';

const editsData = [
  {
    id: '1',
    titre: 'Édit sur la transmission des héritages',
    promulgation: '1 Janvier 45 av. J.-C.',
    preteur: 'M. Aurelius Cotta',
    domaine: 'Succession',
    statut: 'En vigueur'
  },
  {
    id: '2',
    titre: 'Édit sur la procédure des contrats verbaux',
    promulgation: '15 Février 45 av. J.-C.',
    preteur: 'M. Aurelius Cotta',
    domaine: 'Commercial',
    statut: 'En vigueur'
  },
  {
    id: '3',
    titre: 'Édit sur la possession des biens',
    promulgation: '1 Mars 45 av. J.-C.',
    preteur: 'M. Aurelius Cotta',
    domaine: 'Propriété',
    statut: 'En vigueur'
  },
  {
    id: '4',
    titre: 'Édit sur les délais de prescription',
    promulgation: '12 Avril 45 av. J.-C.',
    preteur: 'M. Aurelius Cotta',
    domaine: 'Procédure',
    statut: 'En révision'
  },
  {
    id: '5',
    titre: 'Édit sur la protection des mineurs',
    promulgation: '20 Avril 45 av. J.-C.',
    preteur: 'M. Aurelius Cotta',
    domaine: 'Tutelle',
    statut: 'Brouillon'
  }
];

export const EditsTable: React.FC = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'En vigueur':
        return <Badge variant="success">En vigueur</Badge>;
      case 'En révision':
        return <Badge variant="secondary">En révision</Badge>;
      case 'Brouillon':
        return <Badge variant="outline">Brouillon</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="rounded-md border border-rome-gold/20">
      <Table>
        <TableHeader className="bg-muted/20">
          <TableRow>
            <TableHead className="font-cinzel">Titre</TableHead>
            <TableHead className="font-cinzel">Promulgation</TableHead>
            <TableHead className="font-cinzel">Préteur</TableHead>
            <TableHead className="font-cinzel">Domaine</TableHead>
            <TableHead className="font-cinzel">Statut</TableHead>
            <TableHead className="font-cinzel text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {editsData.map((edict) => (
            <TableRow key={edict.id} className="hover:bg-muted/10">
              <TableCell className="font-medium">{edict.titre}</TableCell>
              <TableCell>{edict.promulgation}</TableCell>
              <TableCell>{edict.preteur}</TableCell>
              <TableCell>{edict.domaine}</TableCell>
              <TableCell>
                {getStatusBadge(edict.statut)}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button size="icon" variant="ghost">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <Edit className="h-4 w-4" />
                  </Button>
                  {edict.statut === 'Brouillon' && (
                    <Button size="icon" variant="ghost" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
