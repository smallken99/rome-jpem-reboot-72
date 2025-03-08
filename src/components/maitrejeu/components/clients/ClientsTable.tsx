
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Shield } from 'lucide-react';
import { Client } from '../../types/clients';
import { ClientActions } from './ClientActions';

interface ClientsTableProps {
  clients: Client[];
  senateurs: any[];
  onEdit: (client: Client) => void;
  onAdvancedEdit: (client: Client) => void;
  onManageCompetences: (client: Client) => void;
  onStatusChange: (id: string, status: 'active' | 'inactive' | 'probation') => void;
  onDelete: (id: string) => void;
  onAssign: (clientId: string, senateurId: string | null) => void;
}

export const ClientsTable: React.FC<ClientsTableProps> = ({
  clients,
  senateurs,
  onEdit,
  onAdvancedEdit,
  onManageCompetences,
  onStatusChange,
  onDelete,
  onAssign
}) => {
  // Fonction pour générer le badge de type de client
  const getTypeBadge = (type: string) => {
    const typeColors: Record<string, string> = {
      'artisan_commercant': 'bg-blue-100 text-blue-800',
      'politicien': 'bg-purple-100 text-purple-800',
      'religieux': 'bg-amber-100 text-amber-800',
      'proprietaire': 'bg-green-100 text-green-800',
      'pegre': 'bg-rose-100 text-rose-800'
    };
    
    const typeLabels: Record<string, string> = {
      'artisan_commercant': 'Artisan/Commerçant',
      'politicien': 'Politicien',
      'religieux': 'Religieux',
      'proprietaire': 'Propriétaire',
      'pegre': 'Pègre'
    };
    
    return (
      <Badge variant="outline" className={typeColors[type] || 'bg-gray-100 text-gray-800'}>
        {typeLabels[type] || type}
      </Badge>
    );
  };
  
  // Fonction pour générer le badge de loyauté
  const getLoyaltyBadge = (loyalty: string) => {
    const loyaltyColors: Record<string, string> = {
      'faible': 'bg-red-100 text-red-800',
      'moyenne': 'bg-amber-100 text-amber-800',
      'forte': 'bg-green-100 text-green-800'
    };
    
    return (
      <Badge variant="outline" className={loyaltyColors[loyalty] || 'bg-gray-100 text-gray-800'}>
        {loyalty}
      </Badge>
    );
  };
  
  // Fonction pour obtenir le badge de statut
  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      'active': 'bg-green-100 text-green-800',
      'inactive': 'bg-gray-100 text-gray-800',
      'probation': 'bg-amber-100 text-amber-800'
    };
    
    const statusLabels: Record<string, string> = {
      'active': 'Actif',
      'inactive': 'Inactif',
      'probation': 'Probation'
    };
    
    return (
      <Badge variant="outline" className={statusColors[status] || 'bg-gray-100 text-gray-800'}>
        {statusLabels[status] || status}
      </Badge>
    );
  };

  return (
    <ScrollArea className="h-[500px]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Localisation</TableHead>
            <TableHead>Loyauté</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Influence</TableHead>
            <TableHead>Assigné à</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-4">
                Aucun client trouvé
              </TableCell>
            </TableRow>
          ) : (
            clients.map(client => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell>{getTypeBadge(client.type)}</TableCell>
                <TableCell>{client.location}</TableCell>
                <TableCell>{getLoyaltyBadge(client.loyalty)}</TableCell>
                <TableCell>
                  {client.activeStatus ? getStatusBadge(client.activeStatus) : getStatusBadge('active')}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4 text-blue-500" />
                    <span>
                      {client.influences.political + client.influences.popular + client.influences.religious}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  {client.assignedToSenateurId ? (
                    <Select 
                      value={client.assignedToSenateurId} 
                      onValueChange={(value) => onAssign(client.id, value || null)}
                    >
                      <SelectTrigger className="w-32 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Non assigné</SelectItem>
                        {senateurs.map(senateur => (
                          <SelectItem key={senateur.id} value={senateur.id}>
                            {senateur.nom}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Select 
                      value="" 
                      onValueChange={(value) => onAssign(client.id, value || null)}
                    >
                      <SelectTrigger className="w-32 h-8">
                        <SelectValue placeholder="Non assigné" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Non assigné</SelectItem>
                        {senateurs.map(senateur => (
                          <SelectItem key={senateur.id} value={senateur.id}>
                            {senateur.nom}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <ClientActions 
                    client={client}
                    onEdit={onEdit}
                    onAdvancedEdit={onAdvancedEdit}
                    onManageCompetences={onManageCompetences}
                    onStatusChange={onStatusChange}
                    onDelete={onDelete}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};
