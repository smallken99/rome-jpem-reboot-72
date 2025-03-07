
import React, { useState } from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, FileText, Eye, Pencil } from 'lucide-react';
import { toast } from 'sonner';

export const AttributionTerres: React.FC = () => {
  const [attributionDialogOpen, setAttributionDialogOpen] = useState(false);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedAttribution, setSelectedAttribution] = useState<number | null>(null);

  const attributionsData = [
    { 
      id: 1,
      beneficiaire: "Marcus Tullius Cicero", 
      statut: "Sénateur", 
      domaine: "Terres du Latium", 
      superficie: "500 jugera",
      dateAttribution: "Id. Jan.",
      duree: "10 ans",
      loyer: "5,000 As/an"
    },
    { 
      id: 2,
      beneficiaire: "Colonie de Capua", 
      statut: "Colonie romaine", 
      domaine: "Plaines de Campanie", 
      superficie: "2,000 jugera",
      dateAttribution: "III Kal. Mar.",
      duree: "Perpétuelle",
      loyer: "Exempté"
    },
    { 
      id: 3,
      beneficiaire: "Quintus Servilius Caepio", 
      statut: "Chevalier", 
      domaine: "Collines d'Étrurie", 
      superficie: "600 jugera",
      dateAttribution: "V Id. Apr.",
      duree: "15 ans",
      loyer: "6,500 As/an"
    },
    { 
      id: 4,
      beneficiaire: "Veterans de la IXe Légion", 
      statut: "Vétérans", 
      domaine: "Terres de Sicile", 
      superficie: "1,200 jugera",
      dateAttribution: "X Kal. Jun.",
      duree: "Perpétuelle",
      loyer: "Exempté"
    },
    { 
      id: 5,
      beneficiaire: "Lucius Calpurnius Piso", 
      statut: "Sénateur", 
      domaine: "Pâturages de Lucanie", 
      superficie: "800 jugera",
      dateAttribution: "XII Kal. Sep.",
      duree: "8 ans",
      loyer: "4,200 As/an"
    },
  ];

  const getStatutBadge = (statut: string) => {
    switch (statut) {
      case 'Sénateur':
        return <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-700">Sénateur</span>;
      case 'Chevalier':
        return <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">Chevalier</span>;
      case 'Colonie romaine':
        return <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">Colonie</span>;
      case 'Vétérans':
        return <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-700">Vétérans</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">{statut}</span>;
    }
  };

  const handleAddAttribution = () => {
    setAttributionDialogOpen(true);
  };

  const handleViewDetails = (id: number) => {
    setSelectedAttribution(id);
    setDetailsDialogOpen(true);
  };

  const handleSaveAttribution = () => {
    toast.success("Nouvelle attribution de terres enregistrée");
    setAttributionDialogOpen(false);
  };

  const getSelectedAttribution = () => {
    return attributionsData.find(attr => attr.id === selectedAttribution);
  };

  return (
    <RomanCard>
      <RomanCard.Header>
        <div className="flex justify-between items-center">
          <h2 className="font-cinzel text-lg">Attributions de Terres</h2>
          <Button 
            variant="outline" 
            size="sm" 
            className="roman-btn-outline"
            onClick={handleAddAttribution}
          >
            <Plus className="h-4 w-4 mr-1" />
            Nouvelle
          </Button>
        </div>
      </RomanCard.Header>
      <RomanCard.Content>
        <p className="text-muted-foreground mb-6">
          Consultez les attributions de terres publiques aux citoyens, colonies et vétérans.
        </p>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-rome-gold/10 text-left">
                <th className="p-4 font-cinzel font-semibold">Bénéficiaire</th>
                <th className="p-4 font-cinzel font-semibold">Statut</th>
                <th className="p-4 font-cinzel font-semibold">Domaine</th>
                <th className="p-4 font-cinzel font-semibold">Superficie</th>
                <th className="p-4 font-cinzel font-semibold">Date d'attribution</th>
                <th className="p-4 font-cinzel font-semibold">Durée</th>
                <th className="p-4 font-cinzel font-semibold">Loyer annuel</th>
                <th className="p-4 font-cinzel font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {attributionsData.map((attribution, index) => (
                <tr 
                  key={attribution.id} 
                  className={index % 2 === 0 ? 'bg-white' : 'bg-rome-marble/30'}
                >
                  <td className="p-4 font-cinzel">{attribution.beneficiaire}</td>
                  <td className="p-4">{getStatutBadge(attribution.statut)}</td>
                  <td className="p-4">{attribution.domaine}</td>
                  <td className="p-4">{attribution.superficie}</td>
                  <td className="p-4 font-cinzel text-sm">{attribution.dateAttribution}</td>
                  <td className="p-4">{attribution.duree}</td>
                  <td className="p-4">{attribution.loyer}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-xs h-8 w-8 p-0"
                        onClick={() => handleViewDetails(attribution.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-xs h-8 w-8 p-0"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </RomanCard.Content>
      
      {/* Dialog pour nouvelle attribution */}
      <Dialog open={attributionDialogOpen} onOpenChange={setAttributionDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Nouvelle attribution de terres</DialogTitle>
            <DialogDescription>
              Attribuez une partie de l'ager publicus à un citoyen ou une entité.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="beneficiaire" className="text-right">
                Bénéficiaire
              </Label>
              <Input
                id="beneficiaire"
                placeholder="Nom du bénéficiaire"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="statut" className="text-right">
                Statut
              </Label>
              <Select defaultValue="Citoyen">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sénateur">Sénateur</SelectItem>
                  <SelectItem value="Chevalier">Chevalier</SelectItem>
                  <SelectItem value="Citoyen">Citoyen</SelectItem>
                  <SelectItem value="Colonie romaine">Colonie romaine</SelectItem>
                  <SelectItem value="Vétérans">Vétérans</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="domaine" className="text-right">
                Domaine
              </Label>
              <Select defaultValue="terres_latium">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner un domaine" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="terres_latium">Terres du Latium</SelectItem>
                  <SelectItem value="plaines_campanie">Plaines de Campanie</SelectItem>
                  <SelectItem value="collines_etrurie">Collines d'Étrurie</SelectItem>
                  <SelectItem value="paturages_lucanie">Pâturages de Lucanie</SelectItem>
                  <SelectItem value="terres_sicile">Terres de Sicile</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="superficie" className="text-right">
                Superficie
              </Label>
              <Input
                id="superficie"
                placeholder="ex: 500 jugera"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duree" className="text-right">
                Durée
              </Label>
              <Select defaultValue="10_ans">
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner une durée" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5_ans">5 ans</SelectItem>
                  <SelectItem value="10_ans">10 ans</SelectItem>
                  <SelectItem value="15_ans">15 ans</SelectItem>
                  <SelectItem value="vie">Durée de vie</SelectItem>
                  <SelectItem value="perpetuelle">Perpétuelle</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="loyer" className="text-right">
                Loyer annuel
              </Label>
              <Input
                id="loyer"
                placeholder="ex: 5,000 As/an"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="justification" className="text-right">
                Justification
              </Label>
              <Textarea
                id="justification"
                placeholder="Raisons de cette attribution..."
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAttributionDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleSaveAttribution}>
              Attribuer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialog pour détails d'attribution */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Détails de l'attribution</DialogTitle>
            <DialogDescription>
              Consultez les informations complètes sur cette attribution de terres.
            </DialogDescription>
          </DialogHeader>
          {selectedAttribution && (
            <div className="space-y-4 py-4">
              {(() => {
                const attr = getSelectedAttribution();
                if (!attr) return null;
                
                return (
                  <>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="font-medium text-right">Bénéficiaire:</div>
                      <div className="col-span-2">{attr.beneficiaire}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="font-medium text-right">Statut:</div>
                      <div className="col-span-2">{getStatutBadge(attr.statut)}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="font-medium text-right">Domaine:</div>
                      <div className="col-span-2">{attr.domaine}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="font-medium text-right">Superficie:</div>
                      <div className="col-span-2">{attr.superficie}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="font-medium text-right">Date d'attribution:</div>
                      <div className="col-span-2 font-cinzel">{attr.dateAttribution}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="font-medium text-right">Durée:</div>
                      <div className="col-span-2">{attr.duree}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="font-medium text-right">Loyer annuel:</div>
                      <div className="col-span-2">{attr.loyer}</div>
                    </div>
                    
                    <div className="bg-muted/20 p-3 rounded-md mt-4">
                      <h4 className="font-cinzel text-sm font-medium mb-2">Acte d'attribution</h4>
                      <p className="text-xs text-muted-foreground">
                        Attribution approuvée par le Sénat et enregistrée dans les tablettes
                        publiques par Gaius Octavius, questeur, sous le consulat de Marcus 
                        Tullius Cicero et Gaius Antonius Hybrida.
                      </p>
                    </div>
                  </>
                );
              })()}
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setDetailsDialogOpen(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </RomanCard>
  );
};
