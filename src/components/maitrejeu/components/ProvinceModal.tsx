import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { formatDate } from '@/utils/formatUtils';
import { Province, ProvinceModalProps } from '../types/compatibilityAdapter';

interface ProvinceModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  province: Province;
  onSave: (province: Province) => void;
}

export const ProvinceModal: React.FC<ProvinceModalProps> = ({ open, setOpen, province, onSave }) => {
  const [editedProvince, setEditedProvince] = useState({ ...province });
  
  const handleSave = () => {
    onSave(editedProvince);
    setOpen(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier la province: {province.name}</DialogTitle>
          <DialogDescription>
            Effectuez les modifications nécessaires et enregistrez.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">Nom</label>
            <Input 
              id="name" 
              value={editedProvince.name} 
              onChange={(e) => setEditedProvince({ ...editedProvince, name: e.target.value })} 
              className="col-span-3" 
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="ruler" className="text-right">Gouverneur</label>
            <Input 
              id="ruler" 
              value={editedProvince.ruler} 
              onChange={(e) => setEditedProvince({ ...editedProvince, ruler: e.target.value })} 
              className="col-span-3" 
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="population" className="text-right">Population</label>
            <Input 
              type="number" 
              id="population" 
              value={editedProvince.population} 
              onChange={(e) => setEditedProvince({ ...editedProvince, population: parseInt(e.target.value) })} 
              className="col-span-3" 
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="wealth" className="text-right">Richesse</label>
            <Input 
              type="number" 
              id="wealth" 
              value={editedProvince.wealth} 
              onChange={(e) => setEditedProvince({ ...editedProvince, wealth: parseInt(e.target.value) })} 
              className="col-span-3" 
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="loyalty" className="text-right">Loyauté</label>
            <Input 
              type="number" 
              id="loyalty" 
              value={editedProvince.loyalty} 
              onChange={(e) => setEditedProvince({ ...editedProvince, loyalty: parseInt(e.target.value) })} 
              className="col-span-3" 
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="status" className="text-right">Statut</label>
            <Select value={editedProvince.status} onValueChange={(value) => setEditedProvince({ ...editedProvince, status: value })}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pacifiée">Pacifiée</SelectItem>
                <SelectItem value="instable">Instable</SelectItem>
                <SelectItem value="rebelle">Rebelle</SelectItem>
                <SelectItem value="conquise">Conquise</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="description" className="text-right">Description</label>
            <Textarea
              id="description"
              value={editedProvince.description}
              onChange={(e) => setEditedProvince({ ...editedProvince, description: e.target.value })}
              className="col-span-3"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
            Annuler
          </Button>
          <Button type="button" onClick={handleSave}>
            Enregistrer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
