
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Eye, Edit } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

// Types pour les exemptions
interface Exemption {
  id: string;
  beneficiaire: string;
  statut: string;
  typeImpot: string;
  raison: string;
  duree: string;
  dateAttribution: string;
}

export const ExemptionsTable: React.FC = () => {
  const [exemptionDialogOpen, setExemptionDialogOpen] = useState(false);
  const [selectedExemption, setSelectedExemption] = useState<Exemption | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Données mockées des exemptions
  const [exemptions, setExemptions] = useState<Exemption[]>([
    {
      id: "1",
      beneficiaire: "Marcus Tullius Cicero",
      statut: "Sénateur",
      typeImpot: "Tributum",
      raison: "Services rendus à la République",
      duree: "5 ans",
      dateAttribution: "Kal. Jan. 45 av. J.-C."
    },
    {
      id: "2",
      beneficiaire: "Colonie de Capua",
      statut: "Colonie",
      typeImpot: "Portorium",
      raison: "Encouragement au commerce local",
      duree: "3 ans",
      dateAttribution: "Id. Mar. 45 av. J.-C."
    },
    {
      id: "3",
      beneficiaire: "Quintus Servilius Caepio",
      statut: "Chevalier",
      typeImpot: "Scriptura",
      raison: "Financement de travaux publics",
      duree: "2 ans",
      dateAttribution: "V Kal. Apr. 45 av. J.-C."
    }
  ]);

  const getStatutBadge = (statut: string) => {
    switch (statut) {
      case 'Sénateur':
        return <Badge className="bg-purple-100 text-purple-800 border-purple-200">Sénateur</Badge>;
      case 'Chevalier':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Chevalier</Badge>;
      case 'Colonie':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Colonie</Badge>;
      case 'Citoyen':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Citoyen</Badge>;
      default:
        return <Badge>{statut}</Badge>;
    }
  };

  const handleAddExemption = () => {
    setSelectedExemption(null);
    setExemptionDialogOpen(true);
  };

  const handleEditExemption = (exemption: Exemption) => {
    setSelectedExemption(exemption);
    setExemptionDialogOpen(true);
  };

  const handleDeleteExemption = (exemption: Exemption) => {
    setSelectedExemption(exemption);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedExemption) {
      setExemptions(prev => prev.filter(e => e.id !== selectedExemption.id));
      toast.success(`Exemption pour ${selectedExemption.beneficiaire} révoquée avec succès`);
      setDeleteDialogOpen(false);
    }
  };

  const handleSaveExemption = () => {
    if (selectedExemption) {
      // Edition d'une exemption existante
      setExemptions(prev => prev.map(e => e.id === selectedExemption.id ? selectedExemption : e));
      toast.success(`Exemption pour ${selectedExemption.beneficiaire} modifiée avec succès`);
    } else {
      // Ajout d'une nouvelle exemption
      const newExemption: Exemption = {
        id: String(Math.floor(Math.random() * 1000)),
        beneficiaire: "Nouveau bénéficiaire",
        statut: "Citoyen",
        typeImpot: "Tributum",
        raison: "Service à la République",
        duree: "1 an",
        dateAttribution: "Kal. Jun. 45 av. J.-C."
      };
      setExemptions(prev => [...prev, newExemption]);
      toast.success(`Nouvelle exemption fiscale accordée`);
    }
    setExemptionDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold">Exemptions Accordées</h3>
          <p className="text-sm text-muted-foreground">Exonérations fiscales actuellement en vigueur</p>
        </div>
        <Button 
          variant="outline" 
          className="roman-btn-outline"
          onClick={handleAddExemption}
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle exemption
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-cinzel">Bénéficiaire</TableHead>
              <TableHead className="font-cinzel">Statut</TableHead>
              <TableHead className="font-cinzel">Type d'Impôt</TableHead>
              <TableHead className="font-cinzel">Raison</TableHead>
              <TableHead className="font-cinzel">Durée</TableHead>
              <TableHead className="font-cinzel">Attribution</TableHead>
              <TableHead className="font-cinzel">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {exemptions.map((exemption) => (
              <TableRow key={exemption.id}>
                <TableCell className="font-medium">{exemption.beneficiaire}</TableCell>
                <TableCell>{getStatutBadge(exemption.statut)}</TableCell>
                <TableCell>{exemption.typeImpot}</TableCell>
                <TableCell>{exemption.raison}</TableCell>
                <TableCell>{exemption.duree}</TableCell>
                <TableCell>{exemption.dateAttribution}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEditExemption(exemption)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteExemption(exemption)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Dialog pour ajouter/modifier une exemption */}
      <Dialog open={exemptionDialogOpen} onOpenChange={setExemptionDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{selectedExemption ? 'Modifier une exemption' : 'Ajouter une exemption'}</DialogTitle>
            <DialogDescription>
              {selectedExemption 
                ? "Modifiez les détails de l'exemption fiscale." 
                : "Accordez une nouvelle exemption fiscale à un citoyen ou une entité."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="beneficiaire" className="text-right">
                Bénéficiaire
              </Label>
              <Input
                id="beneficiaire"
                defaultValue={selectedExemption?.beneficiaire || ""}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="statut" className="text-right">
                Statut
              </Label>
              <Select defaultValue={selectedExemption?.statut || "Citoyen"}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sénateur">Sénateur</SelectItem>
                  <SelectItem value="Chevalier">Chevalier</SelectItem>
                  <SelectItem value="Citoyen">Citoyen</SelectItem>
                  <SelectItem value="Colonie">Colonie</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="typeImpot" className="text-right">
                Type d'impôt
              </Label>
              <Select defaultValue={selectedExemption?.typeImpot || "Tributum"}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner un impôt" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tributum">Tributum</SelectItem>
                  <SelectItem value="Portorium">Portorium</SelectItem>
                  <SelectItem value="Scriptura">Scriptura</SelectItem>
                  <SelectItem value="Vicesima libertatis">Vicesima libertatis</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="raison" className="text-right">
                Raison
              </Label>
              <Input
                id="raison"
                defaultValue={selectedExemption?.raison || ""}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duree" className="text-right">
                Durée
              </Label>
              <Input
                id="duree"
                defaultValue={selectedExemption?.duree || "1 an"}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setExemptionDialogOpen(false)}>Annuler</Button>
            <Button onClick={handleSaveExemption}>
              {selectedExemption ? 'Enregistrer' : 'Ajouter'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialog de confirmation de suppression */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmer la révocation</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir révoquer l'exemption accordée à {selectedExemption?.beneficiaire} ?
              Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Révoquer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
