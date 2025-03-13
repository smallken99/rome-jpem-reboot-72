import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Nation } from './types';
import { nationsMock } from './data';
import { MoreHorizontal, Edit, Trash, Eye, Shield, Building, Map } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface NationsListProps {
  searchTerm?: string;
  filters?: {
    status: string;
    region: string;
    dateFrom: string;
    dateTo: string;
  };
}

export const NationsList: React.FC<NationsListProps> = ({ 
  searchTerm = '',
  filters = {
    status: '',
    region: '',
    dateFrom: '',
    dateTo: ''
  }
}) => {
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedNation, setSelectedNation] = useState<Nation | null>(null);
  
  // Filter nations based on searchTerm and filters
  const filteredNations = nationsMock.filter(nation => {
    // Search filter
    const matchesSearch = searchTerm === '' || 
      nation.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nation.région.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nation.gouvernement.toLowerCase().includes(searchTerm.toLowerCase());
      
    // Status filter
    const matchesStatus = !filters.status || nation.statut === filters.status;
    
    // Region filter
    const matchesRegion = !filters.region || nation.région === filters.region;
    
    // Date filters - assuming dateDernierTraité is in a format like "200 av. J.-C."
    // For demonstration, we'll do a simple string comparison
    const matchesDateFrom = !filters.dateFrom || 
      (nation.dateDernierTraité && nation.dateDernierTraité >= filters.dateFrom);
      
    const matchesDateTo = !filters.dateTo || 
      (nation.dateDernierTraité && nation.dateDernierTraité <= filters.dateTo);
    
    return matchesSearch && matchesStatus && matchesRegion && matchesDateFrom && matchesDateTo;
  });
    
  const handleViewNation = (nation: Nation) => {
    setSelectedNation(nation);
    setIsViewOpen(true);
  };
  
  const handleEditNation = (nation: Nation) => {
    console.log("Éditer nation:", nation.nom);
    // Implémentation à venir
  };
  
  const handleDeletePrompt = (nation: Nation) => {
    setSelectedNation(nation);
    setIsDeleteConfirmOpen(true);
  };
  
  const handleDeleteConfirm = () => {
    if (selectedNation) {
      console.log("Supprimer nation:", selectedNation.nom);
      // Implémentation à venir
      setIsDeleteConfirmOpen(false);
    }
  };
    
  const getStatusColor = (status: string): string => {
    switch(status) {
      case "Allié": return "bg-green-500";
      case "Neutre": return "bg-gray-500";
      case "Ennemi": return "bg-red-500";
      case "Soumis": return "bg-blue-500";
      default: return "bg-gray-400";
    }
  };
    
  return (
    <>
      {filteredNations.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          Aucune nation ne correspond aux critères de recherche ou aux filtres appliqués.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Région</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Puissance</TableHead>
              <TableHead>Richesse</TableHead>
              <TableHead>Relation</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredNations.map(nation => (
              <TableRow key={nation.id}>
                <TableCell className="font-medium">{nation.nom}</TableCell>
                <TableCell>{nation.région}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(nation.statut)}>
                    {nation.statut}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-red-600 h-2.5 rounded-full"
                      style={{ width: `${nation.puissanceMilitaire * 10}%` }}
                    ></div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-yellow-400 h-2.5 rounded-full"
                      style={{ width: `${nation.richesse * 10}%` }}
                    ></div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        nation.relationAvecRome > 6 ? "bg-green-500" : 
                        nation.relationAvecRome > 3 ? "bg-yellow-400" : 
                        "bg-red-600"
                      }`}
                      style={{ width: `${nation.relationAvecRome * 10}%` }}
                    ></div>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Ouvrir menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewNation(nation)}>
                        <Eye className="mr-2 h-4 w-4" /> Voir détails
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditNation(nation)}>
                        <Edit className="mr-2 h-4 w-4" /> Modifier
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Shield className="mr-2 h-4 w-4" /> Gérer relations
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Building className="mr-2 h-4 w-4" /> Ambassade
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Map className="mr-2 h-4 w-4" /> Voir sur carte
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => handleDeletePrompt(nation)}
                        className="text-red-600 hover:text-red-800 focus:text-red-800"
                      >
                        <Trash className="mr-2 h-4 w-4" /> Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      
      {/* Modal détails de la nation */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedNation?.nom}</DialogTitle>
            <DialogDescription>
              {selectedNation?.région} • {selectedNation?.capitale}
            </DialogDescription>
          </DialogHeader>
          
          {selectedNation && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm mb-1">Statut diplomatique</h4>
                  <Badge className={getStatusColor(selectedNation.statut)}>
                    {selectedNation.statut}
                  </Badge>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Type de gouvernement</h4>
                  <p>{selectedNation.gouvernement}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Dernier traité</h4>
                  <p>{selectedNation.dateDernierTraité}</p>
                </div>
              </div>
              
              <div className="space-y-3 mt-2">
                <div>
                  <div className="flex justify-between mb-1">
                    <h4 className="font-semibold text-sm">Puissance militaire</h4>
                    <span>{selectedNation.puissanceMilitaire}/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-red-600 h-2.5 rounded-full"
                      style={{ width: `${selectedNation.puissanceMilitaire * 10}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <h4 className="font-semibold text-sm">Richesse</h4>
                    <span>{selectedNation.richesse}/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-yellow-400 h-2.5 rounded-full"
                      style={{ width: `${selectedNation.richesse * 10}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <h4 className="font-semibold text-sm">Relation avec Rome</h4>
                    <span>{selectedNation.relationAvecRome}/10</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        selectedNation.relationAvecRome > 6 ? "bg-green-500" : 
                        selectedNation.relationAvecRome > 3 ? "bg-yellow-400" : 
                        "bg-red-600"
                      }`}
                      style={{ width: `${selectedNation.relationAvecRome * 10}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-sm mb-1">Notes</h4>
                <p className="text-sm text-gray-600">{selectedNation.notes}</p>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsViewOpen(false)}>
                  Fermer
                </Button>
                <Button onClick={() => {
                  setIsViewOpen(false);
                  handleEditNation(selectedNation);
                }}>
                  <Edit className="mr-2 h-4 w-4" /> Modifier
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Modal confirmation suppression */}
      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer cette nation? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsDeleteConfirmOpen(false)}>
                Annuler
              </Button>
              <Button variant="destructive" onClick={handleDeleteConfirm}>
                Supprimer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
