
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { BuildingType, BuildingStatus, BuildingCreationData, PublicBuildingModalProps, BuildingOwner } from '../../types/batiments';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const PublicBuildingModal: React.FC<PublicBuildingModalProps> = ({
  isOpen,
  onClose,
  onSave,
  building
}) => {
  const [buildingName, setBuildingName] = useState(building?.name || '');
  const [buildingType, setBuildingType] = useState<BuildingType>(building?.type || 'temple');
  const [location, setLocation] = useState(building?.location || '');
  const [buildingStatus, setBuildingStatus] = useState<BuildingStatus>(building?.status || 'good');
  const [constructionYear, setConstructionYear] = useState(building?.constructionYear?.toString() || '');
  const [description, setDescription] = useState(building?.description || '');
  const [cost, setCost] = useState(building?.cost?.toString() || '');
  const [maintenanceCost, setMaintenanceCost] = useState(building?.maintenanceCost?.toString() || '');
  const [revenue, setRevenue] = useState(building?.revenue?.toString() || '');
  const [capacity, setCapacity] = useState(building?.capacity?.toString() || '');
  const [owner, setOwner] = useState<BuildingOwner>(building?.owner || 'république');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const buildingData: BuildingCreationData = {
      name: buildingName,
      type: buildingType,
      location,
      status: buildingStatus,
      constructionYear: parseInt(constructionYear),
      description,
      cost: parseInt(cost),
      maintenanceCost: parseInt(maintenanceCost),
      revenue: parseInt(revenue),
      capacity: parseInt(capacity),
      owner: owner as BuildingOwner
    };
    
    onSave(buildingData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nouveau Bâtiment Public</DialogTitle>
          <DialogDescription>
            Ajouter un nouveau bâtiment public à la République.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nom
            </Label>
            <Input type="text" id="name" value={buildingName} onChange={(e) => setBuildingName(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <Select onValueChange={(value: BuildingType) => setBuildingType(value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Sélectionner un type" defaultValue={buildingType} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="temple">Temple</SelectItem>
                <SelectItem value="basilica">Basilique</SelectItem>
                <SelectItem value="forum">Forum</SelectItem>
                <SelectItem value="market">Marché</SelectItem>
                <SelectItem value="aqueduct">Aqueduc</SelectItem>
                <SelectItem value="theater">Théâtre</SelectItem>
                <SelectItem value="amphitheater">Amphithéâtre</SelectItem>
                <SelectItem value="circus">Cirque</SelectItem>
                <SelectItem value="bath">Thermes</SelectItem>
                <SelectItem value="bridge">Pont</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
                <SelectItem value="road">Route</SelectItem>
                <SelectItem value="port">Port</SelectItem>
                <SelectItem value="warehouse">Entrepôt</SelectItem>
                <SelectItem value="other">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">
              Localisation
            </Label>
            <Input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Statut
            </Label>
            <Select onValueChange={(value: BuildingStatus) => setBuildingStatus(value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Sélectionner un statut" defaultValue={buildingStatus} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="excellent">Excellent</SelectItem>
                <SelectItem value="good">Bon</SelectItem>
                <SelectItem value="average">Moyen</SelectItem>
                <SelectItem value="damaged">Endommagé</SelectItem>
                <SelectItem value="poor">Mauvais</SelectItem>
                <SelectItem value="ruined">Ruine</SelectItem>
                <SelectItem value="under_construction">En construction</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="constructionYear" className="text-right">
              Année de construction
            </Label>
            <Input type="number" id="constructionYear" value={constructionYear} onChange={(e) => setConstructionYear(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="description" className="text-right mt-2">
              Description
            </Label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3 rounded-md border border-input bg-background px-3 py-2 shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cost" className="text-right">
              Coût
            </Label>
            <Input type="number" id="cost" value={cost} onChange={(e) => setCost(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="maintenanceCost" className="text-right">
              Coût de maintenance
            </Label>
            <Input type="number" id="maintenanceCost" value={maintenanceCost} onChange={(e) => setMaintenanceCost(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="revenue" className="text-right">
              Revenu
            </Label>
            <Input type="number" id="revenue" value={revenue} onChange={(e) => setRevenue(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="capacity" className="text-right">
              Capacité
            </Label>
            <Input type="number" id="capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="owner" className="text-right">
              Propriétaire
            </Label>
            <Select onValueChange={(value: BuildingOwner) => setOwner(value)} value={owner}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Sélectionner un propriétaire" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="république">République</SelectItem>
                <SelectItem value="private">Privé</SelectItem>
                <SelectItem value="temple">Temple</SelectItem>
                <SelectItem value="military">Militaire</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </form>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Sauvegarder</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PublicBuildingModal;
