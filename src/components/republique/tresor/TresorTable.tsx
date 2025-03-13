
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { format } from 'date-fns';

// Données des transactions
const transactionsData = [
  {
    id: '1',
    date: new Date(45, 4, 10),
    description: 'Paiement des légions d\'Hispanie',
    beneficiaire: 'Légats militaires',
    montant: -250000,
    type: 'militaire',
    statut: 'Complété'
  },
  {
    id: '2',
    date: new Date(45, 4, 12),
    description: 'Impôts de la province de Sicile',
    beneficiaire: 'Trésor public',
    montant: 180000,
    type: 'impôt',
    statut: 'Complété'
  },
  {
    id: '3',
    date: new Date(45, 4, 15),
    description: 'Construction du temple de Jupiter',
    beneficiaire: 'Collège des pontifes',
    montant: -75000,
    type: 'religieux',
    statut: 'Complété'
  },
  {
    id: '4',
    date: new Date(45, 4, 18),
    description: 'Droits de douane du port d\'Ostie',
    beneficiaire: 'Trésor public',
    montant: 95000,
    type: 'commerce',
    statut: 'Complété'
  },
  {
    id: '5',
    date: new Date(45, 4, 20),
    description: 'Entretien des aqueducs',
    beneficiaire: 'Service des eaux',
    montant: -42000,
    type: 'infrastructure',
    statut: 'En cours'
  },
  {
    id: '6',
    date: new Date(45, 4, 25),
    description: 'Vente de terres publiques',
    beneficiaire: 'Trésor public',
    montant: 125000,
    type: 'foncier',
    statut: 'Complété'
  },
  {
    id: '7',
    date: new Date(45, 4, 28),
    description: 'Jeux publics au Circus Maximus',
    beneficiaire: 'Édiles',
    montant: -85000,
    type: 'loisir',
    statut: 'En cours'
  }
];

export const TresorTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const formatDate = (date: Date | string) => {
    if (typeof date === 'string') {
      return date;
    }
    return format(date, 'dd MMMM, yyyy');
  };

  const filteredData = transactionsData.filter((transaction) => 
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.beneficiaire.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex gap-4 mb-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Rechercher..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Button 
          variant="outline" 
          size="icon"
          className="roman-btn-outline"
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="rounded-md border border-rome-gold/20">
        <Table>
          <TableHeader className="bg-muted/20">
            <TableRow>
              <TableHead className="font-cinzel">Date</TableHead>
              <TableHead className="font-cinzel">Description</TableHead>
              <TableHead className="font-cinzel">Bénéficiaire</TableHead>
              <TableHead className="font-cinzel">Type</TableHead>
              <TableHead className="font-cinzel text-right">Montant</TableHead>
              <TableHead className="font-cinzel">Statut</TableHead>
              <TableHead className="font-cinzel text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((transaction) => (
              <TableRow key={transaction.id} className="hover:bg-muted/10">
                <TableCell>{formatDate(transaction.date)}</TableCell>
                <TableCell className="font-medium">{transaction.description}</TableCell>
                <TableCell>{transaction.beneficiaire}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {transaction.type}
                  </Badge>
                </TableCell>
                <TableCell className={`text-right font-medium ${transaction.montant > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {transaction.montant > 0 ? '+' : ''}{transaction.montant.toLocaleString()} As
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={transaction.statut === 'Complété' ? 'success' : 'secondary'}
                  >
                    {transaction.statut}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button size="icon" variant="ghost">
                    <Eye className="h-4 w-4" />
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
