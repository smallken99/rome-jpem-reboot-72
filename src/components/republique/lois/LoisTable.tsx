import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, FileText, MoreHorizontal, Plus, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// Types pour les lois
interface Loi {
  id: string;
  titre: string;
  description: string;
  dateAdoption: string;
  status: 'active' | 'proposed' | 'rejected' | 'amended';
}

export const LoisTable = () => {
  const [lois, setLois] = useState<Loi[]>([
    {
      id: "1",
      titre: "Lex Hortensia",
      description: "Les plébiscites votés par le concile de la plèbe ont force de loi pour tous les citoyens.",
      dateAdoption: "287 av. J.-C.",
      status: "active"
    },
    {
      id: "2",
      titre: "Lex Valeria Horatia",
      description: "Rétablit le droit d'appel au peuple contre les décisions des magistrats.",
      dateAdoption: "449 av. J.-C.",
      status: "active"
    },
    {
      id: "3",
      titre: "Lex Canuleia",
      description: "Autorise le mariage entre patriciens et plébéiens.",
      dateAdoption: "445 av. J.-C.",
      status: "active"
    },
    {
      id: "4",
      titre: "Lex Licinia Sextia",
      description: "Limite la quantité de terres publiques qu'un individu peut posséder.",
      dateAdoption: "367 av. J.-C.",
      status: "amended"
    },
    {
      id: "5",
      titre: "Nouvelle Loi Agraire",
      description: "Proposition de redistribution des terres publiques aux citoyens nécessiteux.",
      dateAdoption: "En discussion",
      status: "proposed"
    }
  ]);
  
  // Fonction pour obtenir le badge de statut
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>;
      case 'proposed':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Proposée</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Rejetée</Badge>;
      case 'amended':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Amendée</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold">Lois de la République</h3>
          <p className="text-sm text-muted-foreground">Gérez les lois et décrets en vigueur</p>
        </div>
        <Button variant="outline" className="roman-btn-outline">
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle Loi
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-cinzel">Titre</TableHead>
              <TableHead className="font-cinzel">Description</TableHead>
              <TableHead className="font-cinzel">Date d'Adoption</TableHead>
              <TableHead className="font-cinzel">Statut</TableHead>
              <TableHead className="text-right font-cinzel">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lois.map((loi) => (
              <TableRow key={loi.id}>
                <TableCell className="font-medium">{loi.titre}</TableCell>
                <TableCell>{loi.description}</TableCell>
                <TableCell>{loi.dateAdoption}</TableCell>
                <TableCell>{getStatusBadge(loi.status)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Ouvrir le menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <FileText className="h-4 w-4 mr-2" />
                        Voir le texte
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Modifier
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
