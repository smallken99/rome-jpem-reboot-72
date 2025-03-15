
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alliance } from './types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Shield } from 'lucide-react';

// Mock data for the Alliances
const mockAlliances: Alliance[] = [
  {
    id: '1',
    name: 'Ligue Latine',
    members: ['Rome', 'Latium', 'Campanie'],
    type: 'full',
    dateCreation: '12 Avril 700 AUC',
    duration: 25,
    status: 'active',
    militarySupport: 5000,
    economicBenefits: ['Accès aux marchés', 'Tarifs douaniers préférentiels'],
    commitments: ['Assistance militaire mutuelle', 'Partage du butin de guerre'],
    description: 'Alliance historique entre Rome et les peuples latins'
  },
  {
    id: '2',
    name: 'Pacte Hellénique',
    members: ['Rome', 'Athènes', 'Sparte', 'Corinthe'],
    type: 'defensive',
    dateCreation: '3 Mai 702 AUC',
    duration: 10,
    status: 'active',
    militarySupport: 3000,
    economicBenefits: ['Libre-échange des biens culturels', 'Protection des philosophes'],
    commitments: ['Défense contre les invasions macédoniennes', 'Maintien de la paix en mer Égée'],
    description: 'Alliance défensive avec les cités-États grecques'
  },
  {
    id: '3',
    name: 'Coalition Anti-Parthe',
    members: ['Rome', 'Armenia', 'Pontus', 'Cappadocia'],
    type: 'offensive',
    dateCreation: '28 Juin 703 AUC',
    duration: 5,
    status: 'expired',
    militarySupport: 8000,
    economicBenefits: ['Partage des ressources des territoires conquis', 'Ouverture des routes commerciales'],
    commitments: ['Campagnes militaires coordonnées', 'Partage des frais de guerre'],
    description: 'Alliance offensive contre l\'Empire parthe'
  }
];

interface AlliancesMilitairesProps {
  searchTerm: string;
  filters: any;
}

export const AlliancesMilitaires: React.FC<AlliancesMilitairesProps> = ({ 
  searchTerm, 
  filters
}) => {
  // Simple filtering logic
  const filteredAlliances = mockAlliances.filter(alliance => {
    const matchesSearch = alliance.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         alliance.members.some(m => m.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = !filters.status || alliance.type === filters.status;
    const matchesStatus = !filters.region || alliance.status === filters.region;
    
    return matchesSearch && matchesType && matchesStatus;
  });
  
  // Status badge style helper
  const getStatusBadge = (status: Alliance['status']) => {
    switch(status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>;
      case 'expired':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Expirée</Badge>;
      case 'dissolved':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Dissoute</Badge>;
    }
  };
  
  // Type badge style helper
  const getTypeBadge = (type: Alliance['type']) => {
    switch(type) {
      case 'defensive':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Défensive</Badge>;
      case 'offensive':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Offensive</Badge>;
      case 'full':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Complète</Badge>;
    }
  };

  return (
    <Card>
      {filteredAlliances.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground">
          Aucune alliance ne correspond à vos critères de recherche
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Membres</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Force Militaire</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAlliances.map(alliance => (
              <TableRow key={alliance.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">{alliance.name}</TableCell>
                <TableCell>{alliance.members.join(', ')}</TableCell>
                <TableCell>{getTypeBadge(alliance.type)}</TableCell>
                <TableCell>{getStatusBadge(alliance.status)}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-rome-navy" />
                    <span>{alliance.militarySupport} hommes</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
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
