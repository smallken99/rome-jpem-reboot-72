
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useMaitreJeu } from './context/MaitreJeuContext';
import { ClientModal } from './components/ClientModal';
import { AdvancedClientModal } from './components/AdvancedClientModal';
import { ClientCompetenceManager } from './components/ClientCompetenceManager';
import { ClientFilter, ClientSort, Client } from './types/clients';
import { 
  Search, 
  Plus, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Link, 
  Star,
  Shield, 
  UserCheck,
  Filter,
  RefreshCw
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export const GestionClients = () => {
  const { 
    clients, 
    senateurs,
    addClient, 
    updateClient, 
    deleteClient, 
    assignClientToSenateur,
    filterClients,
    sortClients,
    changeClientStatus
  } = useMaitreJeu();
  
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isAdvancedModalOpen, setIsAdvancedModalOpen] = useState(false);
  const [isCompetenceManagerOpen, setIsCompetenceManagerOpen] = useState(false);
  const [currentClientFilter, setCurrentClientFilter] = useState<ClientFilter>({});
  const [currentSort, setCurrentSort] = useState<ClientSort>({ field: 'name', direction: 'asc' });
  
  // Filtrage et tri des clients
  const filteredClients = sortClients(
    filterClients(clients, { ...currentClientFilter, searchTerm }), 
    currentSort
  );
  
  // Fonction pour ouvrir le modal d'édition
  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    setIsClientModalOpen(true);
  };
  
  // Fonction pour ouvrir le modal avancé
  const handleAdvancedEdit = (client: Client) => {
    setSelectedClient(client);
    setIsAdvancedModalOpen(true);
  };
  
  // Fonction pour ouvrir le gestionnaire de compétences
  const handleCompetenceManager = (client: Client) => {
    setSelectedClient(client);
    setIsCompetenceManagerOpen(true);
  };
  
  // Fonction pour supprimer un client
  const handleDeleteClient = (id: string) => {
    deleteClient(id);
    toast({
      title: "Client supprimé",
      description: "Le client a été supprimé avec succès",
      variant: "default"
    });
  };
  
  // Fonction pour changer le statut d'un client
  const handleStatusChange = (id: string, status: 'active' | 'inactive' | 'probation') => {
    changeClientStatus(id, status);
    toast({
      title: "Statut modifié",
      description: `Le statut du client a été changé en "${status}"`,
      variant: "default"
    });
  };
  
  // Fonction pour assigner un client à un sénateur
  const handleAssignment = (clientId: string, senateurId: string | null) => {
    assignClientToSenateur(clientId, senateurId);
    toast({
      title: senateurId ? "Client assigné" : "Client non assigné",
      description: senateurId 
        ? `Le client a été assigné au sénateur ${senateurs.find(s => s.id === senateurId)?.nom || senateurId}` 
        : "Le client n'est plus assigné à un sénateur",
      variant: "default"
    });
  };
  
  // Fonction pour sauvegarder un client (ajout ou mise à jour)
  const handleSaveClient = (clientData: Client | Omit<Client, 'id'>) => {
    if ('id' in clientData) {
      updateClient(clientData.id, clientData);
      toast({
        title: "Client mis à jour",
        description: `Les informations de ${clientData.name} ont été mises à jour`,
        variant: "default"
      });
    } else {
      const id = addClient(clientData);
      toast({
        title: "Client ajouté",
        description: `${clientData.name} a été ajouté à la liste des clients`,
        variant: "default"
      });
    }
    setIsClientModalOpen(false);
    setIsAdvancedModalOpen(false);
  };
  
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un client..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setCurrentClientFilter({})}>
                Réinitialiser les filtres
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setCurrentClientFilter(prev => ({ ...prev, type: 'artisan_commercant' }))}>
                Artisans & Commerçants
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCurrentClientFilter(prev => ({ ...prev, type: 'politicien' }))}>
                Politiciens
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCurrentClientFilter(prev => ({ ...prev, type: 'religieux' }))}>
                Religieux
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCurrentClientFilter(prev => ({ ...prev, type: 'proprietaire' }))}>
                Propriétaires Terriens
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCurrentClientFilter(prev => ({ ...prev, type: 'pegre' }))}>
                Pègre
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setCurrentClientFilter(prev => ({ ...prev, assignedOnly: true }))}>
                Seulement les assignés
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCurrentClientFilter(prev => ({ ...prev, loyalty: 'forte' }))}>
                Loyauté forte
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => {
              setCurrentSort(prev => ({
                field: prev.field,
                direction: prev.direction === 'asc' ? 'desc' : 'asc'
              }));
            }}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={() => {
            setSelectedClient(null);
            setIsClientModalOpen(true);
          }}>
            <Plus className="h-4 w-4 mr-1" />
            Ajouter un client
          </Button>
          <Button 
            variant="outline" 
            onClick={() => {
              setSelectedClient(null);
              setIsAdvancedModalOpen(true);
            }}
          >
            <Star className="h-4 w-4 mr-1" />
            Mode avancé
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Liste des clients</CardTitle>
          <CardDescription>
            Gérez tous les clients et leurs relations avec les sénateurs.
            {currentClientFilter.type && (
              <Badge variant="outline" className="ml-2">
                Filtre: {currentClientFilter.type}
              </Badge>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                {filteredClients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-4">
                      Aucun client trouvé
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredClients.map(client => (
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
                            onValueChange={(value) => handleAssignment(client.id, value || null)}
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
                            onValueChange={(value) => handleAssignment(client.id, value || null)}
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
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0" title="Actions">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEditClient(client)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAdvancedEdit(client)}>
                              <Star className="mr-2 h-4 w-4" />
                              Édition avancée
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleCompetenceManager(client)}>
                              <Shield className="mr-2 h-4 w-4" />
                              Gérer les compétences
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleStatusChange(client.id, 'active')}>
                              <UserCheck className="mr-2 h-4 w-4" />
                              Marquer comme actif
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(client.id, 'inactive')}>
                              <UserCheck className="mr-2 h-4 w-4" />
                              Marquer comme inactif
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleDeleteClient(client.id)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
      
      {/* Modal de création/édition de client standard */}
      <ClientModal
        isOpen={isClientModalOpen}
        onClose={() => setIsClientModalOpen(false)}
        onSave={handleSaveClient}
        client={selectedClient}
      />
      
      {/* Modal avancé de création/édition de client */}
      <AdvancedClientModal
        isOpen={isAdvancedModalOpen}
        onClose={() => setIsAdvancedModalOpen(false)}
        onSave={handleSaveClient}
        client={selectedClient}
      />
      
      {/* Gestionnaire de compétences */}
      <Dialog open={isCompetenceManagerOpen} onOpenChange={setIsCompetenceManagerOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedClient && (
            <ClientCompetenceManager
              client={selectedClient}
              onClose={() => setIsCompetenceManagerOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
