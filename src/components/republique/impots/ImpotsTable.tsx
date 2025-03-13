
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Eye } from 'lucide-react';

const impostsData = [
  {
    id: '1',
    nom: 'Tributum',
    categorie: 'Direct',
    taux: '1% du patrimoine',
    revenuEstime: 450000,
    peuples: 'Citoyens romains',
    statut: 'Actif'
  },
  {
    id: '2',
    nom: 'Portorium',
    categorie: 'Indirect',
    taux: '2.5% des marchandises',
    revenuEstime: 220000,
    peuples: 'Tous',
    statut: 'Actif'
  },
  {
    id: '3',
    nom: 'Vectigal',
    categorie: 'Foncier',
    taux: 'Variable',
    revenuEstime: 180000,
    peuples: 'Occupants des terres publiques',
    statut: 'Actif'
  },
  {
    id: '4',
    nom: 'Scriptura',
    categorie: 'Usage',
    taux: 'Par tête de bétail',
    revenuEstime: 90000,
    peuples: 'Éleveurs',
    statut: 'Suspendu'
  },
  {
    id: '5',
    nom: 'Vicesima libertatis',
    categorie: 'Spécial',
    taux: '5% de la valeur',
    revenuEstime: 55000,
    peuples: 'Affranchisseurs',
    statut: 'Actif'
  }
];

export const ImpotsTable: React.FC = () => {
  return (
    <div className="rounded-md border border-rome-gold/20">
      <Table>
        <TableHeader className="bg-muted/20">
          <TableRow>
            <TableHead className="font-cinzel">Nom</TableHead>
            <TableHead className="font-cinzel">Catégorie</TableHead>
            <TableHead className="font-cinzel">Taux</TableHead>
            <TableHead className="font-cinzel">Revenu Estimé</TableHead>
            <TableHead className="font-cinzel">Peuples Concernés</TableHead>
            <TableHead className="font-cinzel">Statut</TableHead>
            <TableHead className="font-cinzel text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {impostsData.map((impot) => (
            <TableRow key={impot.id} className="hover:bg-muted/10">
              <TableCell className="font-medium">{impot.nom}</TableCell>
              <TableCell>{impot.categorie}</TableCell>
              <TableCell>{impot.taux}</TableCell>
              <TableCell>{impot.revenuEstime.toLocaleString()} As</TableCell>
              <TableCell>{impot.peuples}</TableCell>
              <TableCell>
                <Badge 
                  variant={impot.statut === 'Actif' ? 'success' : 'outline'}
                  className={impot.statut === 'Actif' ? undefined : 'text-gray-500'}
                >
                  {impot.statut}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button size="icon" variant="ghost">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <Edit className="h-4 w-4" />
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
