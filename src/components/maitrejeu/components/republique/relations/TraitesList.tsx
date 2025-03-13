
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Traite } from './types';
import { traitesMock } from './data';
import { MoreHorizontal, Edit, Trash, Eye } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { AlertMessage } from '@/components/ui-custom/AlertMessage';

interface TraitesListProps {
  searchTerm?: string;
}

export const TraitesList: React.FC<TraitesListProps> = ({ searchTerm = '' }) => {
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedTraite, setSelectedTraite] = useState<Traite | null>(null);
  
  // Filter traites based on searchTerm if provided
  const filteredTraites = searchTerm
    ? traitesMock.filter(traite => 
        traite.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        traite.parties.some(party => party.toLowerCase().includes(searchTerm.toLowerCase())) ||
        traite.type.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : traitesMock;
    
  const handleViewTraite = (traite: Traite) => {
    setSelectedTraite(traite);
    setIsViewOpen(true);
  };
  
  const handleEditTraite = (traite: Traite) => {
    console.log("Éditer traité:", traite.titre);
    // Implémentation à venir
  };
  
  const handleDeletePrompt = (traite: Traite) => {
    setSelectedTraite(traite);
    setIsDeleteConfirmOpen(true);
  };
  
  const handleDeleteConfirm = () => {
    if (selectedTraite) {
      console.log("Supprimer traité:", selectedTraite.titre);
      // Implémentation à venir
      setIsDeleteConfirmOpen(false);
    }
  };
    
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Parties</TableHead>
            <TableHead>Ratification</TableHead>
            <TableHead>Expiration</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTraites.map(traite => (
            <TableRow key={traite.id}>
              <TableCell className="font-medium">{traite.titre}</TableCell>
              <TableCell>{traite.type}</TableCell>
              <TableCell>{traite.parties.join(', ')}</TableCell>
              <TableCell>{traite.dateSignature}</TableCell>
              <TableCell>{traite.duree || 'Indéterminée'}</TableCell>
              <TableCell>
                <Badge className={
                  traite.statut === "Actif" ? "bg-green-500" : 
                  traite.statut === "Expiré" ? "bg-gray-500" : 
                  traite.statut === "En négociation" ? "bg-yellow-500" : 
                  "bg-red-500"
                }>
                  {traite.statut}
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
                    <DropdownMenuItem onClick={() => handleViewTraite(traite)}>
                      <Eye className="mr-2 h-4 w-4" /> Voir détails
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEditTraite(traite)}>
                      <Edit className="mr-2 h-4 w-4" /> Modifier
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleDeletePrompt(traite)}
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
      
      {/* Modal détails du traité */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedTraite?.titre}</DialogTitle>
            <DialogDescription>Signé en {selectedTraite?.dateSignature}</DialogDescription>
          </DialogHeader>
          
          {selectedTraite && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm mb-1">Type</h4>
                  <p>{selectedTraite.type}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Statut</h4>
                  <Badge className={
                    selectedTraite.statut === "Actif" ? "bg-green-500" : 
                    selectedTraite.statut === "Expiré" ? "bg-gray-500" : 
                    selectedTraite.statut === "En négociation" ? "bg-yellow-500" : 
                    "bg-red-500"
                  }>
                    {selectedTraite.statut}
                  </Badge>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Parties</h4>
                  <p>{selectedTraite.parties.join(', ')}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Durée</h4>
                  <p>{selectedTraite.duree || 'Indéterminée'}</p>
                </div>
              </div>
              
              {selectedTraite.termes && (
                <div>
                  <h4 className="font-semibold text-sm mb-1">Termes du traité</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedTraite.termes.map((terme, idx) => (
                      <li key={idx}>{terme}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {selectedTraite.bénéfices && (
                <div>
                  <h4 className="font-semibold text-sm mb-1">Bénéfices</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {selectedTraite.bénéfices.économiques && (
                      <div>
                        <p className="text-sm font-medium">Économiques</p>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                          <div 
                            className="bg-yellow-400 h-2.5 rounded-full"
                            style={{ width: `${selectedTraite.bénéfices.économiques * 10}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    {selectedTraite.bénéfices.militaires && (
                      <div>
                        <p className="text-sm font-medium">Militaires</p>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                          <div 
                            className="bg-red-500 h-2.5 rounded-full"
                            style={{ width: `${selectedTraite.bénéfices.militaires * 10}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    {selectedTraite.bénéfices.politiques && (
                      <div>
                        <p className="text-sm font-medium">Politiques</p>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                          <div 
                            className="bg-blue-500 h-2.5 rounded-full"
                            style={{ width: `${selectedTraite.bénéfices.politiques * 10}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
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
              Êtes-vous sûr de vouloir supprimer ce traité? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <AlertMessage 
              type="warning" 
              title="Attention" 
              message="La suppression de ce traité pourrait affecter les relations diplomatiques de Rome."
            />
            
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
