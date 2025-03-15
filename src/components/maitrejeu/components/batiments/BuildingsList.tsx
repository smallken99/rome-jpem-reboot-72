
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit, Trash2, Eye } from 'lucide-react';
import { ConditionBadge } from './ConditionBadge';

// Données factices pour la démonstration
const mockBuildings = [
  {
    id: '1',
    name: 'Temple de Jupiter',
    type: 'temple',
    location: 'Forum Romanum',
    condition: 'excellent',
    constructionYear: 705,
    maintenanceCost: 5000,
    isPublic: true
  },
  {
    id: '2',
    name: 'Thermes de Caracalla',
    type: 'thermes',
    location: 'Via Appia',
    condition: 'bon',
    constructionYear: 700,
    maintenanceCost: 3000,
    isPublic: true
  },
  {
    id: '3',
    name: 'Aqueduc Claudien',
    type: 'aqueduc',
    location: 'Suburra',
    condition: 'moyen',
    constructionYear: 695,
    maintenanceCost: 2000,
    isPublic: true
  },
  {
    id: '4',
    name: 'Entrepôt du Port',
    type: 'entrepot',
    location: 'Ostie',
    condition: 'mauvais',
    constructionYear: 685,
    maintenanceCost: 1500,
    isPublic: true
  },
  {
    id: '5',
    name: 'Amphithéâtre',
    type: 'amphitheatre',
    location: 'Champ de Mars',
    condition: 'critique',
    constructionYear: 680,
    maintenanceCost: 8000,
    isPublic: true
  }
];

interface BuildingsListProps {
  onEdit: (id: string) => void;
}

export const BuildingsList: React.FC<BuildingsListProps> = ({ onEdit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [conditionFilter, setConditionFilter] = useState('all');

  const filteredBuildings = mockBuildings.filter(building => {
    if (searchTerm && !building.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
                     !building.location.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    if (typeFilter !== 'all' && building.type !== typeFilter) {
      return false;
    }
    
    if (conditionFilter !== 'all' && building.condition !== conditionFilter) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Input
          placeholder="Rechercher un bâtiment..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        
        <div className="flex gap-2">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type de bâtiment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="temple">Temples</SelectItem>
              <SelectItem value="thermes">Thermes</SelectItem>
              <SelectItem value="aqueduc">Aqueducs</SelectItem>
              <SelectItem value="entrepot">Entrepôts</SelectItem>
              <SelectItem value="amphitheatre">Amphithéâtres</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={conditionFilter} onValueChange={setConditionFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="État" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les états</SelectItem>
              <SelectItem value="excellent">Excellent</SelectItem>
              <SelectItem value="bon">Bon</SelectItem>
              <SelectItem value="moyen">Moyen</SelectItem>
              <SelectItem value="mauvais">Mauvais</SelectItem>
              <SelectItem value="critique">Critique</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Localisation</TableHead>
              <TableHead>État</TableHead>
              <TableHead>Année de construction</TableHead>
              <TableHead>Coût d'entretien</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBuildings.map((building) => (
              <TableRow key={building.id}>
                <TableCell className="font-medium">{building.name}</TableCell>
                <TableCell className="capitalize">{building.type}</TableCell>
                <TableCell>{building.location}</TableCell>
                <TableCell>
                  <ConditionBadge condition={building.condition as any} />
                </TableCell>
                <TableCell>{building.constructionYear} AUC</TableCell>
                <TableCell>{building.maintenanceCost} deniers</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon" onClick={() => onEdit(building.id)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
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
