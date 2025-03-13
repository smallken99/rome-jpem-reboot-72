import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Shield, MoreHorizontal, Edit, Trash, Eye, Users, SwordIcon } from 'lucide-react';
import { Alliance } from './types';
import { alliancesMock } from './data';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface AlliancesMilitairesProps {
  searchTerm?: string;
  filters?: {
    status: string;
    region: string;
    dateFrom: string;
    dateTo: string;
  };
}

export const AlliancesMilitaires: React.FC<AlliancesMilitairesProps> = ({ 
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
  const [selectedAlliance, setSelectedAlliance] = useState<Alliance | null>(null);
  
  // Filter alliances based on searchTerm and filters
  const filteredAlliances = alliancesMock.filter(alliance => {
    // Search filter
    const matchesSearch = searchTerm === '' || 
      alliance.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alliance.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alliance.membres.some(member => member.toLowerCase().includes(searchTerm.toLowerCase()));
      
    // Status filter
    const matchesStatus = !filters.status || alliance.statut === filters.status;
    
    // Region filter - Not applicable for alliances unless we have region data for each alliance
    const matchesRegion = !filters.region || true; // Placeholder
    
    // Date filters
    const matchesDateFrom = !filters.dateFrom || 
      (alliance.dateFormation && alliance.dateFormation >= filters.dateFrom);
      
    const matchesDateTo = !filters.dateTo || 
      (alliance.dateFormation && alliance.dateFormation <= filters.dateTo);
    
    return matchesSearch && matchesStatus && matchesRegion && matchesDateFrom && matchesDateTo;
  });
  
  const handleViewAlliance = (alliance: Alliance) => {
    setSelectedAlliance(alliance);
    setIsViewOpen(true);
  };
  
  const handleEditAlliance = (alliance: Alliance) => {
    console.log("Éditer alliance:", alliance.nom);
    // Implémentation à venir
  };
  
  const handleDeletePrompt = (alliance: Alliance) => {
    setSelectedAlliance(alliance);
    setIsDeleteConfirmOpen(true);
  };
  
  const handleDeleteConfirm = () => {
    if (selectedAlliance) {
      console.log("Supprimer alliance:", selectedAlliance.nom);
      // Implémentation à venir
      setIsDeleteConfirmOpen(false);
    }
  };
  
  const getStatusColor = (status: string): string => {
    switch(status) {
      case "Actif": return "bg-green-500";
      case "Inactif": return "bg-yellow-500";
      case "Dissous": return "bg-gray-500";
      default: return "bg-gray-400";
    }
  };
    
  return (
    <>
      <Card className="w-full mt-6">
        <CardHeader className="flex flex-row items-center gap-2">
          <Shield className="h-5 w-5" />
          <CardTitle>Alliances Militaires</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredAlliances.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Aucune alliance ne correspond aux critères de recherche ou aux filtres appliqués.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Membres</TableHead>
                  <TableHead>Formation</TableHead>
                  <TableHead>Forces</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAlliances.map(alliance => (
                  <TableRow key={alliance.id}>
                    <TableCell className="font-medium">{alliance.nom}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{alliance.type}</Badge>
                    </TableCell>
                    <TableCell>{alliance.membres.join(', ')}</TableCell>
                    <TableCell>{alliance.dateFormation}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{alliance.forces?.legions || 0} légions</span>
                        <span className="text-xs text-muted-foreground">{alliance.forces?.auxiliaires || 0} auxiliaires</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(alliance.statut)}>
                        {alliance.statut}
                      </Badge>
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
                          <DropdownMenuItem onClick={() => handleViewAlliance(alliance)}>
                            <Eye className="mr-2 h-4 w-4" /> Voir détails
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditAlliance(alliance)}>
                            <Edit className="mr-2 h-4 w-4" /> Modifier
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Users className="mr-2 h-4 w-4" /> Gérer membres
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <SwordIcon className="mr-2 h-4 w-4" /> Opérations militaires
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDeletePrompt(alliance)}
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
        </CardContent>
      </Card>
      
      {/* Modal détails de l'alliance */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedAlliance?.nom}</DialogTitle>
            <DialogDescription>
              Alliance formée en {selectedAlliance?.dateFormation}
            </DialogDescription>
          </DialogHeader>
          
          {selectedAlliance && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm mb-1">Type d'alliance</h4>
                  <Badge variant="outline">{selectedAlliance.type}</Badge>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Statut</h4>
                  <Badge className={getStatusColor(selectedAlliance.statut)}>
                    {selectedAlliance.statut}
                  </Badge>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Commandement</h4>
                  <p>{selectedAlliance.commandement || "Non spécifié"}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Forces combinées</h4>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <SwordIcon className="h-4 w-4 mr-1" />
                      <span>{selectedAlliance.forces?.legions || 0} légions</span>
                    </div>
                    <div>
                      <span>{selectedAlliance.forces?.auxiliaires || 0} auxiliaires</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-sm mb-1">Membres de l'alliance</h4>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {selectedAlliance.membres.map((membre, idx) => (
                    <div key={idx} className="flex items-center">
                      <Shield className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{membre}</span>
                      {membre === "Rome" && <span className="ml-1 text-xs text-muted-foreground">(Leader)</span>}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsViewOpen(false)}>
                  Fermer
                </Button>
                <Button onClick={() => {
                  setIsViewOpen(false);
                  handleEditAlliance(selectedAlliance);
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
              Êtes-vous sûr de vouloir supprimer cette alliance? Cette action est irréversible.
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
