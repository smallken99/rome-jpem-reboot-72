
import React, { useState } from 'react';
import { useMaitreJeu } from '../../context';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Handshake, Trash2, Edit, Users } from 'lucide-react';
import { FamilleInfo, FamilleAlliance, MembreFamille } from '../../types';
import { AllianceModal } from './AllianceModal';

interface FamilleAlliancesProps {
  alliances: FamilleAlliance[];
  familleId: string;
  familles: FamilleInfo[];
  membres: MembreFamille[];
}

export const FamilleAlliances: React.FC<FamilleAlliancesProps> = ({
  alliances,
  familleId,
  familles,
  membres
}) => {
  const { getAlliancesByFamille, getFamille, updateAlliance } = useMaitreJeu();
  const [allianceToDelete, setAllianceToDelete] = useState<string | null>(null);
  const [allianceToEdit, setAllianceToEdit] = useState<FamilleAlliance | null>(null);
  const [showAllianceModal, setShowAllianceModal] = useState(false);
  
  const handleDelete = (id: string) => {
    setAllianceToDelete(id);
  };
  
  const confirmDelete = () => {
    if (allianceToDelete) {
      updateAlliance(allianceToDelete, { statut: 'rompue' });
      setAllianceToDelete(null);
    }
  };
  
  const handleEdit = (alliance: FamilleAlliance) => {
    setAllianceToEdit(alliance);
    setShowAllianceModal(true);
  };
  
  // Obtenir le nom d'une famille depuis son ID
  const getFamilleNom = (id: string) => {
    const famille = getFamille(id);
    return famille ? famille.nom : 'Famille inconnue';
  };
  
  // Obtenir le nom de l'autre famille dans l'alliance
  const getOtherFamilleId = (alliance: FamilleAlliance) => {
    return alliance.famille1Id === familleId ? alliance.famille2Id : alliance.famille1Id;
  };
  
  const getOtherFamilleNom = (alliance: FamilleAlliance) => {
    return getFamilleNom(getOtherFamilleId(alliance));
  };
  
  // Obtenir la liste des membres impliqués dans une alliance
  const getMembresInAlliance = (alliance: FamilleAlliance) => {
    return membres.filter(m => alliance.membres.includes(m.id));
  };
  
  return (
    <div>
      {alliances.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Aucune alliance n'a été établie</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => setShowAllianceModal(true)}
          >
            <Handshake className="h-4 w-4 mr-2" />
            Créer une alliance
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {alliances.map(alliance => (
            <Card key={alliance.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  <div className="p-4 flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold">
                        Alliance avec {getOtherFamilleNom(alliance)}
                      </h3>
                      <Badge variant={
                        alliance.statut === 'active' ? 'default' : 
                        alliance.statut === 'en négociation' ? 'outline' : 
                        alliance.statut === 'inactive' ? 'secondary' : 'destructive'
                      }>
                        {alliance.statut.charAt(0).toUpperCase() + alliance.statut.slice(1)}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Type:</p>
                        <p className="text-sm">{alliance.type.charAt(0).toUpperCase() + alliance.type.slice(1)}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium">Date:</p>
                        <p className="text-sm">{alliance.dateDebut} {alliance.dateFin ? `- ${alliance.dateFin}` : ''}</p>
                      </div>
                      
                      <div className="col-span-2">
                        <p className="text-sm font-medium">Termes:</p>
                        <p className="text-sm">{alliance.termes}</p>
                      </div>
                      
                      <div className="col-span-2">
                        <p className="text-sm font-medium">Bénéfices:</p>
                        <ul className="list-disc list-inside text-sm">
                          {alliance.benefices.map((benefit, idx) => (
                            <li key={idx}>{benefit}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="col-span-2">
                        <p className="text-sm font-medium">Membres impliqués:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {getMembresInAlliance(alliance).map(membre => (
                            <Badge key={membre.id} variant="outline" className="text-xs">
                              {membre.prenom} {membre.nom}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted p-4 flex flex-row sm:flex-col justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full"
                      onClick={() => handleEdit(alliance)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Modifier
                    </Button>
                    
                    {alliance.statut !== 'rompue' && (
                      <Button 
                        variant="destructive" 
                        size="sm"
                        className="w-full"
                        onClick={() => handleDelete(alliance.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Rompre
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      <AlertDialog open={!!allianceToDelete} onOpenChange={() => setAllianceToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Rompre cette alliance ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action marquera l'alliance comme rompue. 
              Cela pourrait affecter les relations entre les familles.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              Rompre l'alliance
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <AllianceModal
        isOpen={showAllianceModal}
        onClose={() => {
          setShowAllianceModal(false);
          setAllianceToEdit(null);
        }}
        familles={familles}
        membres={membres}
        initialFamilleId={familleId}
        editAlliance={allianceToEdit}
      />
    </div>
  );
};
