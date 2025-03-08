
import React, { useState } from 'react';
import { useMaitreJeu } from './context/MaitreJeuContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ClientModal } from './components/ClientModal';
import { Client, ClientCreationData } from './types/clients';
import { useToast } from '@/components/ui/use-toast';
import { PlusCircle, Search, UserPlus, Edit, Trash } from 'lucide-react';

export const GestionClients: React.FC = () => {
  const { clients, addClient, updateClient, deleteClient, senateurs, assignClientToSenateur } = useMaitreJeu();
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  
  // Filtrer les clients
  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          client.subType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          client.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType ? client.type === selectedType : true;
    
    return matchesSearch && matchesType;
  });
  
  // Ouvrir le modal pour ajouter un client
  const handleAddClient = () => {
    setSelectedClient(null);
    setIsModalOpen(true);
  };
  
  // Ouvrir le modal pour modifier un client
  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };
  
  // Supprimer un client
  const handleDeleteClient = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      deleteClient(id);
      toast({
        title: 'Client supprimé',
        description: 'Le client a été supprimé avec succès.',
      });
    }
  };
  
  // Gérer la sauvegarde d'un client
  const handleSaveClient = (clientData: ClientCreationData | Client) => {
    if ('id' in clientData) {
      // Modification
      updateClient(clientData.id, clientData);
      toast({
        title: 'Client mis à jour',
        description: 'Les informations du client ont été mises à jour avec succès.',
      });
    } else {
      // Création
      const id = addClient(clientData);
      toast({
        title: 'Client ajouté',
        description: 'Le nouveau client a été ajouté avec succès.',
      });
    }
    setIsModalOpen(false);
  };
  
  // Assigner un client à un sénateur
  const handleAssignToSenateur = (clientId: string, senateurId: string) => {
    assignClientToSenateur(clientId, senateurId === 'none' ? null : senateurId);
    toast({
      title: 'Client assigné',
      description: senateurId === 'none' 
        ? 'Le client a été dissocié du sénateur.' 
        : 'Le client a été assigné au sénateur avec succès.',
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex gap-4 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un client..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button onClick={handleAddClient} className="whitespace-nowrap">
            <UserPlus className="h-4 w-4 mr-2" />
            Ajouter un Client
          </Button>
        </div>
        
        <div className="w-full sm:w-auto">
          <Select value={selectedType || ''} onValueChange={(value) => setSelectedType(value || null)}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Tous les types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tous les types</SelectItem>
              <SelectItem value="artisan_commercant">Artisan & Commerçant</SelectItem>
              <SelectItem value="politicien">Politicien</SelectItem>
              <SelectItem value="religieux">Religieux</SelectItem>
              <SelectItem value="proprietaire">Propriétaire Terrien</SelectItem>
              <SelectItem value="pegre">Pègre</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Réseau de Clientèle</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Spécialité</TableHead>
                <TableHead>Quartier</TableHead>
                <TableHead>Loyauté</TableHead>
                <TableHead>Assigné à</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    Aucun client trouvé
                  </TableCell>
                </TableRow>
              ) : (
                filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>
                      {client.type === 'artisan_commercant' && 'Artisan & Commerçant'}
                      {client.type === 'politicien' && 'Politicien'}
                      {client.type === 'religieux' && 'Religieux'}
                      {client.type === 'proprietaire' && 'Propriétaire Terrien'}
                      {client.type === 'pegre' && 'Pègre'}
                    </TableCell>
                    <TableCell>{client.subType}</TableCell>
                    <TableCell>{client.location}</TableCell>
                    <TableCell>
                      <span 
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          client.loyalty === 'faible' ? 'bg-red-100 text-red-800' :
                          client.loyalty === 'moyenne' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}
                      >
                        {client.loyalty === 'faible' ? 'Faible' : 
                         client.loyalty === 'moyenne' ? 'Moyenne' : 'Forte'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Select 
                        value={client.assignedToSenateurId || 'none'} 
                        onValueChange={(value) => handleAssignToSenateur(client.id, value)}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Non assigné" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">Non assigné</SelectItem>
                          {senateurs.map((senateur) => (
                            <SelectItem key={senateur.id} value={senateur.id}>
                              {senateur.prenom} {senateur.nom}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEditClient(client)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700" onClick={() => handleDeleteClient(client.id)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {isModalOpen && (
        <ClientModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveClient}
          client={selectedClient}
        />
      )}
    </div>
  );
};
