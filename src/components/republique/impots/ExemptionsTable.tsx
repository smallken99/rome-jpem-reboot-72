
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Trash2, Plus } from 'lucide-react';

const exemptionsData = [
  {
    id: '1',
    beneficiaire: 'Colonie de Transalpine',
    motif: 'Aide militaire',
    duree: '5 ans',
    dateDebut: '46 av. J.-C.',
    dateFin: '41 av. J.-C.',
    montant: 45000,
    statut: 'Actif'
  },
  {
    id: '2',
    beneficiaire: 'Marcus Tullius Cicero',
    motif: 'Services rendus à la République',
    duree: '3 ans',
    dateDebut: '47 av. J.-C.',
    dateFin: '44 av. J.-C.',
    montant: 12000,
    statut: 'Actif'
  },
  {
    id: '3',
    beneficiaire: 'Marchands de Gadès',
    motif: 'Développement commercial',
    duree: '2 ans',
    dateDebut: '47 av. J.-C.',
    dateFin: '45 av. J.-C.',
    montant: 25000,
    statut: 'Expiré'
  },
  {
    id: '4',
    beneficiaire: 'Colonie d\'Alexandria',
    motif: 'Reconstruction après conflit',
    duree: '4 ans',
    dateDebut: '45 av. J.-C.',
    dateFin: '41 av. J.-C.',
    montant: 60000,
    statut: 'Actif'
  }
];

export const ExemptionsTable: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-4">
        <Button size="sm" className="flex items-center gap-1">
          <Plus className="h-4 w-4" />
          <span>Nouvelle exemption</span>
        </Button>
      </div>
      
      <div className="rounded-md border border-rome-gold/20">
        <Table>
          <TableHeader className="bg-muted/20">
            <TableRow>
              <TableHead className="font-cinzel">Bénéficiaire</TableHead>
              <TableHead className="font-cinzel">Motif</TableHead>
              <TableHead className="font-cinzel">Durée</TableHead>
              <TableHead className="font-cinzel">Montant</TableHead>
              <TableHead className="font-cinzel">État</TableHead>
              <TableHead className="font-cinzel text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exemptionsData.map((exemption) => (
              <TableRow key={exemption.id} className="hover:bg-muted/10">
                <TableCell className="font-medium">{exemption.beneficiaire}</TableCell>
                <TableCell>{exemption.motif}</TableCell>
                <TableCell>
                  {exemption.duree}<br/>
                  <span className="text-xs text-muted-foreground">
                    {exemption.dateDebut} → {exemption.dateFin}
                  </span>
                </TableCell>
                <TableCell>{exemption.montant.toLocaleString()} As</TableCell>
                <TableCell>
                  <Badge 
                    variant={exemption.statut === 'Actif' ? 'success' : 'outline'}
                    className={exemption.statut === 'Actif' ? undefined : 'text-gray-500'}
                  >
                    {exemption.statut}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="icon" variant="ghost">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
