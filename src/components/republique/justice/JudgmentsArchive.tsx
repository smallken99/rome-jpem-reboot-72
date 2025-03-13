
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Download, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const judgmentsData = [
  {
    id: '1',
    affaire: 'République vs. Quintus Ligarius',
    verdict: 'Acquitté',
    tribunal: 'Quaestio',
    preteur: 'M. Aurelius Cotta',
    accuse: 'Q. Ligarius',
    plaignant: 'République romaine',
    date: '10 Janvier 45 av. J.-C.',
  },
  {
    id: '2',
    affaire: 'Cassius vs. Dolabella',
    verdict: 'Condamné',
    tribunal: 'Centumvirs',
    preteur: 'M. Aurelius Cotta',
    accuse: 'P. Cornelius Dolabella',
    plaignant: 'C. Cassius Longinus',
    date: '15 Janvier 45 av. J.-C.',
  },
  {
    id: '3',
    affaire: 'Hortensius vs. Publius',
    verdict: 'Condamné',
    tribunal: 'Recuperatores',
    preteur: 'L. Licinius',
    accuse: 'P. Servilius',
    plaignant: 'Q. Hortensius Hortalus',
    date: '2 Février 45 av. J.-C.',
  },
  {
    id: '4',
    affaire: 'Metellus vs. Fabius',
    verdict: 'Acquitté',
    tribunal: 'Recuperatores',
    preteur: 'L. Licinius',
    accuse: 'M. Fabius',
    plaignant: 'Q. Caecilius Metellus',
    date: '12 Février 45 av. J.-C.',
  },
  {
    id: '5',
    affaire: 'République vs. Aulus Gabinius',
    verdict: 'Condamné',
    tribunal: 'Quaestio de repetundis',
    preteur: 'M. Aurelius Cotta',
    accuse: 'A. Gabinius',
    plaignant: 'Syriens',
    date: '1 Mars 45 av. J.-C.',
  }
];

export const JudgmentsArchive: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterVerdict, setFilterVerdict] = useState('');

  const getVerdictBadge = (verdict: string) => {
    switch (verdict) {
      case 'Acquitté':
        return <Badge variant="success">Acquitté</Badge>;
      case 'Condamné':
        return <Badge variant="destructive">Condamné</Badge>;
      default:
        return <Badge variant="outline">{verdict}</Badge>;
    }
  };

  const filteredData = judgmentsData.filter((judgment) => {
    const matchesSearch = 
      judgment.affaire.toLowerCase().includes(searchTerm.toLowerCase()) ||
      judgment.accuse.toLowerCase().includes(searchTerm.toLowerCase()) ||
      judgment.plaignant.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = !filterType || judgment.tribunal === filterType;
    const matchesVerdict = !filterVerdict || judgment.verdict === filterVerdict;
    
    return matchesSearch && matchesType && matchesVerdict;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
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
        
        <div className="flex gap-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tous les tribunaux" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tous les tribunaux</SelectItem>
              <SelectItem value="Quaestio">Quaestio</SelectItem>
              <SelectItem value="Centumvirs">Centumvirs</SelectItem>
              <SelectItem value="Recuperatores">Recuperatores</SelectItem>
              <SelectItem value="Quaestio de repetundis">Quaestio de repetundis</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filterVerdict} onValueChange={setFilterVerdict}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tous les verdicts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tous les verdicts</SelectItem>
              <SelectItem value="Acquitté">Acquitté</SelectItem>
              <SelectItem value="Condamné">Condamné</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="rounded-md border border-rome-gold/20">
        <Table>
          <TableHeader className="bg-muted/20">
            <TableRow>
              <TableHead className="font-cinzel">Affaire</TableHead>
              <TableHead className="font-cinzel">Date</TableHead>
              <TableHead className="font-cinzel">Tribunal</TableHead>
              <TableHead className="font-cinzel">Accusé</TableHead>
              <TableHead className="font-cinzel">Plaignant</TableHead>
              <TableHead className="font-cinzel">Verdict</TableHead>
              <TableHead className="font-cinzel text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((judgment) => (
              <TableRow key={judgment.id} className="hover:bg-muted/10">
                <TableCell className="font-medium">{judgment.affaire}</TableCell>
                <TableCell>{judgment.date}</TableCell>
                <TableCell>{judgment.tribunal}</TableCell>
                <TableCell>{judgment.accuse}</TableCell>
                <TableCell>{judgment.plaignant}</TableCell>
                <TableCell>
                  {getVerdictBadge(judgment.verdict)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="icon" variant="ghost">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Download className="h-4 w-4" />
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
