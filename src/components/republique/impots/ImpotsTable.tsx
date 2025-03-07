
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Edit, Percent } from 'lucide-react';

// Types pour les impôts
interface Impot {
  id: string;
  nom: string;
  description: string;
  taux: string;
  revenu: string;
  contribuables: string;
  statut: 'actif' | 'suspendu' | 'proposé';
}

export const ImpotsTable: React.FC = () => {
  // Données mockées des impôts
  const impots: Impot[] = [
    {
      id: "1",
      nom: "Tributum",
      description: "Impôt direct sur les citoyens romains",
      taux: "1% de la fortune",
      revenu: "250,000 As",
      contribuables: "Citoyens",
      statut: "actif"
    },
    {
      id: "2",
      nom: "Portorium",
      description: "Droits de douane sur les marchandises importées",
      taux: "2-5%",
      revenu: "180,000 As",
      contribuables: "Marchands",
      statut: "actif"
    },
    {
      id: "3",
      nom: "Scriptura",
      description: "Taxe sur l'utilisation des pâturages publics",
      taux: "Par tête de bétail",
      revenu: "95,000 As",
      contribuables: "Éleveurs",
      statut: "actif"
    },
    {
      id: "4",
      nom: "Vicesima libertatis",
      description: "Taxe sur l'affranchissement des esclaves",
      taux: "5% de la valeur",
      revenu: "120,000 As",
      contribuables: "Propriétaires d'esclaves",
      statut: "actif"
    },
    {
      id: "5",
      nom: "Tributum soli",
      description: "Impôt foncier sur les terres provinciales",
      taux: "10% production",
      revenu: "205,000 As",
      contribuables: "Provinciaux",
      statut: "actif"
    }
  ];

  const getStatutBadge = (statut: string) => {
    switch (statut) {
      case 'actif':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Actif</Badge>;
      case 'suspendu':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Suspendu</Badge>;
      case 'proposé':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Proposé</Badge>;
      default:
        return <Badge>{statut}</Badge>;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold">Types d'Impôts</h3>
          <p className="text-sm text-muted-foreground">Gérez les différentes taxes de la République</p>
        </div>
        <Button variant="outline" className="roman-btn-outline">
          <Percent className="h-4 w-4 mr-2" />
          Modifier les Taux
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-cinzel">Nom</TableHead>
              <TableHead className="font-cinzel">Description</TableHead>
              <TableHead className="font-cinzel">
                <div className="flex items-center">
                  Taux
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="font-cinzel">
                <div className="flex items-center">
                  Revenu Annuel
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="font-cinzel">Contribuables</TableHead>
              <TableHead className="font-cinzel">Statut</TableHead>
              <TableHead className="font-cinzel">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {impots.map((impot) => (
              <TableRow key={impot.id}>
                <TableCell className="font-medium">{impot.nom}</TableCell>
                <TableCell>{impot.description}</TableCell>
                <TableCell>{impot.taux}</TableCell>
                <TableCell>{impot.revenu}</TableCell>
                <TableCell>{impot.contribuables}</TableCell>
                <TableCell>{getStatutBadge(impot.statut)}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
