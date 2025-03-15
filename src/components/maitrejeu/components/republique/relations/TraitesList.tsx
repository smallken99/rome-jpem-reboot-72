
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Traite } from './types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Edit, FileText } from 'lucide-react';

// Mock data for the Traites
const mockTraites: Traite[] = [
  {
    id: '1',
    title: 'Foedus Carthaginis',
    parties: ['Rome', 'Carthage'],
    type: 'peace',
    dateSignature: '5 Mai 704 AUC',
    dateExpiration: '5 Mai 714 AUC',
    status: 'active',
    clauses: [
      'Non-agression mutuelle pendant 10 ans',
      'Libre passage des navires marchands dans les eaux territoriales',
      'Carthage paiera un tribut annuel de 200 talents d\'argent'
    ],
    description: 'Traité de paix établi après la défaite carthaginoise',
    benefits: ['Sécurité en Méditerranée occidentale', 'Revenus de tribut'],
    obligations: ['Non-interférence dans les affaires internes de Carthage']
  },
  {
    id: '2',
    title: 'Foedus Aegypti',
    parties: ['Rome', 'Ptolemaic Egypt'],
    type: 'trade',
    dateSignature: '10 Juin 703 AUC',
    status: 'active',
    clauses: [
      'Tarifs préférentiels pour les marchands romains en Égypte',
      'Exportation garantie de grains égyptiens vers Rome',
      'Protection des marchands égyptiens dans les ports romains'
    ],
    description: 'Accord commercial avec l\'Égypte ptolémaïque',
    benefits: ['Approvisionnement en grain assuré', 'Nouveaux marchés pour les produits romains'],
    obligations: ['Protection des marchands égyptiens', 'Maintien des routes maritimes sûres']
  },
  {
    id: '3',
    title: 'Foedus Armeniae',
    parties: ['Rome', 'Armenia'],
    type: 'military',
    dateSignature: '20 Mars 702 AUC',
    dateExpiration: '20 Mars 712 AUC',
    status: 'violated',
    clauses: [
      'Assistance militaire mutuelle en cas d\'attaque parthe',
      'Échange d\'informations militaires',
      'Droit de passage pour les légions romaines'
    ],
    description: 'Alliance militaire contre la menace parthe',
    benefits: ['Tampon contre les Parthes', 'Extension de l\'influence romaine en Orient'],
    obligations: ['Aide militaire si l\'Arménie est attaquée']
  }
];

interface TraitesListProps {
  searchTerm: string;
  filters: any;
}

export const TraitesList: React.FC<TraitesListProps> = ({ 
  searchTerm, 
  filters
}) => {
  // Simple filtering logic
  const filteredTraites = mockTraites.filter(traite => {
    const matchesSearch = traite.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         traite.parties.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = !filters.status || traite.type === filters.status;
    const matchesActive = !filters.region || traite.status === filters.region;
    
    return matchesSearch && matchesType && matchesActive;
  });
  
  // Status badge style helper
  const getStatusBadge = (status: Traite['status']) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Actif</Badge>;
      case 'expired':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Expiré</Badge>;
      case 'violated':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Violé</Badge>;
      case 'canceled':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Annulé</Badge>;
    }
  };
  
  // Type badge style helper
  const getTypeBadge = (type: Traite['type']) => {
    switch(type) {
      case 'peace':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Paix</Badge>;
      case 'trade':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Commerce</Badge>;
      case 'military':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Militaire</Badge>;
      case 'tribute':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Tribut</Badge>;
      case 'other':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Autre</Badge>;
    }
  };

  return (
    <Card>
      {filteredTraites.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground">
          Aucun traité ne correspond à vos critères de recherche
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead>Parties</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Date de signature</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTraites.map(traite => (
              <TableRow key={traite.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{traite.title}</TableCell>
                <TableCell>{traite.parties.join(', ')}</TableCell>
                <TableCell>{getTypeBadge(traite.type)}</TableCell>
                <TableCell>{getStatusBadge(traite.status)}</TableCell>
                <TableCell>{traite.dateSignature}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <FileText className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  );
};
