
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Edit, Percent, Plus, Settings } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';

// Types pour les impôts
interface Impot {
  id: string;
  nom: string;
  description: string;
  taux: string;
  revenu: string;
  contribuables: string;
  statut: 'actif' | 'suspendu' | 'proposé';
}

export const ImpotsTable: React.FC = () => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [tauDialogOpen, setTauxDialogOpen] = useState(false);
  const [selectedImpot, setSelectedImpot] = useState<Impot | null>(null);
  const [newTaxDialogOpen, setNewTaxDialogOpen] = useState(false);
  
  // Données mockées des impôts
  const [impots, setImpots] = useState<Impot[]>([
    {
      id: "1",
      nom: "Tributum",
      description: "Impôt direct sur les citoyens romains",
      taux: "1% de la fortune",
      revenu: "250,000 As",
      contribuables: "Citoyens",
      statut: "actif"
    },
    {
      id: "2",
      nom: "Portorium",
      description: "Droits de douane sur les marchandises importées",
      taux: "2-5%",
      revenu: "180,000 As",
      contribuables: "Marchands",
      statut: "actif"
    },
    {
      id: "3",
      nom: "Scriptura",
      description: "Taxe sur l'utilisation des pâturages publics",
      taux: "Par tête de bétail",
      revenu: "95,000 As",
      contribuables: "Éleveurs",
      statut: "actif"
    },
    {
      id: "4",
      nom: "Vicesima libertatis",
      description: "Taxe sur l'affranchissement des esclaves",
      taux: "5% de la valeur",
      revenu: "120,000 As",
      contribuables: "Propriétaires d'esclaves",
      statut: "actif"
    },
    {
      id: "5",
      nom: "Tributum soli",
      description: "Impôt foncier sur les terres provinciales",
      taux: "10% production",
      revenu: "205,000 As",
      contribuables: "Provinciaux",
      statut: "actif"
    }
  ]);

  const getStatutBadge = (statut: string) => {
    switch (statut) {
      case 'actif':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Actif</Badge>;
      case 'suspendu':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Suspendu</Badge>;
      case 'proposé':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Proposé</Badge>;
      default:
        return <Badge>{statut}</Badge>;
    }
  };

  const handleEditImpot = (impot: Impot) => {
    setSelectedImpot(impot);
    setEditDialogOpen(true);
  };

  const handleOpenTauxDialog = () => {
    setTauxDialogOpen(true);
  };

  const handleAddNewTax = () => {
    setNewTaxDialogOpen(true);
  };

  const handleSaveImpot = () => {
    if (selectedImpot) {
      setImpots(prev => prev.map(imp => imp.id === selectedImpot.id ? selectedImpot : imp));
      toast.success(`Impôt ${selectedImpot.nom} mis à jour avec succès`);
    }
    setEditDialogOpen(false);
  };

  const handleSaveTaux = () => {
    toast.success("Taux d'imposition mis à jour avec succès");
    setTauxDialogOpen(false);
  };

  const handleAddTax = () => {
    const newTax: Impot = {
      id: String(Math.floor(Math.random() * 1000)),
      nom: "Nouveau tribut",
      description: "Description du nouvel impôt",
      taux: "À déterminer",
      revenu: "Estimation en cours",
      contribuables: "À déterminer",
      statut: "proposé"
    };

    setImpots(prev => [...prev, newTax]);
    toast.success("Nouvel impôt proposé avec succès");
    setNewTaxDialogOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-semibold">Types d'Impôts</h3>
          <p className="text-sm text-muted-foreground">Gérez les différentes taxes de la République</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="roman-btn-outline" onClick={handleOpenTauxDialog}>
            <Percent className="h-4 w-4 mr-2" />
            Modifier les Taux
          </Button>
          <Button variant="outline" className="roman-btn-outline" onClick={handleAddNewTax}>
            <Plus className="h-4 w-4 mr-2" />
            Nouvel Impôt
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-cinzel">Nom</TableHead>
              <TableHead className="font-cinzel">Description</TableHead>
              <TableHead className="font-cinzel">
                <div className="flex items-center">
                  Taux
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="font-cinzel">
                <div className="flex items-center">
                  Revenu Annuel
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="font-cinzel">Contribuables</TableHead>
              <TableHead className="font-cinzel">Statut</TableHead>
              <TableHead className="font-cinzel">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {impots.map((impot) => (
              <TableRow key={impot.id}>
                <TableCell className="font-medium">{impot.nom}</TableCell>
                <TableCell>{impot.description}</TableCell>
                <TableCell>{impot.taux}</TableCell>
                <TableCell>{impot.revenu}</TableCell>
                <TableCell>{impot.contribuables}</TableCell>
                <TableCell>{getStatutBadge(impot.statut)}</TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEditImpot(impot)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Dialog d'édition d'un impôt */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Modifier l'impôt</DialogTitle>
            <DialogDescription>
              Modifiez les détails de l'impôt {selectedImpot?.nom}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nom" className="text-right">
                Nom
              </Label>
              <Input
                id="nom"
                value={selectedImpot?.nom || ""}
                onChange={(e) => selectedImpot && setSelectedImpot({...selectedImpot, nom: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={selectedImpot?.description || ""}
                onChange={(e) => selectedImpot && setSelectedImpot({...selectedImpot, description: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="taux" className="text-right">
                Taux
              </Label>
              <Input
                id="taux"
                value={selectedImpot?.taux || ""}
                onChange={(e) => selectedImpot && setSelectedImpot({...selectedImpot, taux: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="contribuables" className="text-right">
                Contribuables
              </Label>
              <Input
                id="contribuables"
                value={selectedImpot?.contribuables || ""}
                onChange={(e) => selectedImpot && setSelectedImpot({...selectedImpot, contribuables: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="statut" className="text-right">
                Statut
              </Label>
              <Select 
                value={selectedImpot?.statut}
                onValueChange={(value) => selectedImpot && setSelectedImpot({...selectedImpot, statut: value as 'actif' | 'suspendu' | 'proposé'})}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="actif">Actif</SelectItem>
                  <SelectItem value="suspendu">Suspendu</SelectItem>
                  <SelectItem value="proposé">Proposé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Annuler</Button>
            <Button onClick={handleSaveImpot}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de gestion des taux d'imposition */}
      <Dialog open={tauDialogOpen} onOpenChange={setTauxDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Gestion des taux d'imposition</DialogTitle>
            <DialogDescription>
              Ajustez les taux d'imposition pour équilibrer les finances de la République.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {impots.map(impot => (
              <div key={impot.id} className="space-y-2">
                <div className="flex justify-between">
                  <Label>{impot.nom}</Label>
                  <span className="text-sm font-medium">{impot.taux}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm">-</span>
                  <Slider defaultValue={[3]} max={10} step={1} className="flex-1" />
                  <span className="text-sm">+</span>
                </div>
                <p className="text-xs text-muted-foreground">Revenu estimé: {impot.revenu}</p>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTauxDialogOpen(false)}>Annuler</Button>
            <Button onClick={handleSaveTaux}>Appliquer les changements</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog d'ajout d'un nouvel impôt */}
      <Dialog open={newTaxDialogOpen} onOpenChange={setNewTaxDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Proposer un nouvel impôt</DialogTitle>
            <DialogDescription>
              Créez une nouvelle source de revenus pour la République.
              Cette proposition devra être approuvée par le Sénat.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newTaxName" className="text-right">
                Nom
              </Label>
              <Input
                id="newTaxName"
                placeholder="Nom de l'impôt"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newTaxDesc" className="text-right">
                Description
              </Label>
              <Textarea
                id="newTaxDesc"
                placeholder="Description et justification"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newTaxRate" className="text-right">
                Taux proposé
              </Label>
              <Input
                id="newTaxRate"
                placeholder="ex: 2%, fixe, etc."
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newTaxPayers" className="text-right">
                Contribuables
              </Label>
              <Input
                id="newTaxPayers"
                placeholder="Qui paiera cet impôt?"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewTaxDialogOpen(false)}>Annuler</Button>
            <Button onClick={handleAddTax}>Proposer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
