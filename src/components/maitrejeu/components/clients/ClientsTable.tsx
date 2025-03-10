
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Client } from '../../types/clients';
import { SenateurJouable } from '../../types';
import { ClientActions } from './ClientActions';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, AlertTriangle, ChevronsUpDown } from 'lucide-react';

interface ClientsTableProps {
  clients: Client[];
  senateurs: SenateurJouable[];
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
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'inactive':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'probation':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      default:
        return null;
    }
  };
  
  const getLoyaltyColor = (loyalty: string) => {
    switch (loyalty) {
      case 'faible':
        return 'bg-red-100 text-red-800';
      case 'moyenne':
        return 'bg-yellow-100 text-yellow-800';
      case 'forte':
        return 'bg-green-100 text-green-800';
      case 'totale':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const formatType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ');
  };
  
  return (
    <Table className="border">
      <TableHeader className="bg-muted/50">
        <TableRow>
          <TableHead>Nom</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Lieu</TableHead>
          <TableHead>Loyauté</TableHead>
          <TableHead>Niveau</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead>Assigné à</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.length === 0 && (
          <TableRow>
            <TableCell colSpan={8} className="text-center h-24 text-muted-foreground">
              Aucun client trouvé
            </TableCell>
          </TableRow>
        )}
        
        {clients.map((client) => (
          <TableRow key={client.id}>
            <TableCell className="font-medium">{client.name}</TableCell>
            <TableCell>
              <div className="flex flex-col">
                <span>{formatType(client.type)}</span>
                <span className="text-xs text-muted-foreground">{client.subType}</span>
              </div>
            </TableCell>
            <TableCell>{client.location}</TableCell>
            <TableCell>
              <Badge variant="outline" className={`${getLoyaltyColor(client.loyalty)}`}>
                {client.loyalty.charAt(0).toUpperCase() + client.loyalty.slice(1)}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex items-center">
                <span className="font-medium">{client.relationshipLevel}</span>
                <span className="text-xs text-muted-foreground ml-1">/ 10</span>
              </div>
            </TableCell>
            <TableCell>{getStatusIcon(client.activeStatus)}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex justify-between items-center h-8 py-1 px-2 w-full">
                    <span className="truncate max-w-[120px]">
                      {client.assignedToSenateurId 
                        ? senateurs.find(s => s.id === client.assignedToSenateurId)?.nom || 'Inconnu'
                        : 'Non assigné'}
                    </span>
                    <ChevronsUpDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onAssign(client.id, null)}>
                    Non assigné
                  </DropdownMenuItem>
                  {senateurs.map(senateur => (
                    <DropdownMenuItem 
                      key={senateur.id}
                      onClick={() => onAssign(client.id, senateur.id)}
                    >
                      {senateur.prenom} {senateur.nom}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
            <TableCell className="text-right">
              <ClientActions 
                client={client}
                onEdit={() => onEdit(client)}
                onAdvancedEdit={() => onAdvancedEdit(client)}
                onManageCompetences={() => onManageCompetences(client)}
                onStatusChange={(status) => onStatusChange(client.id, status)}
                onDelete={() => onDelete(client.id)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
