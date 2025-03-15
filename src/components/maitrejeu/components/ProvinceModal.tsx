
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Province } from '../types/provinces';

export interface ProvinceModalProps {
  province: Province;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedProvince: Province) => void;
}

export const ProvinceModal: React.FC<ProvinceModalProps> = ({
  province,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Province>({ ...province });

  useEffect(() => {
    setFormData({ ...province });
  }, [province]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {province.id ? 'Modifier la Province' : 'Nouvelle Province'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="nom" className="text-sm font-medium">
                Nom
              </label>
              <Input
                id="nom"
                name="nom"
                value={formData.nom || ''}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="région" className="text-sm font-medium">
                Région
              </label>
              <Input
                id="région"
                name="région"
                value={formData.région || ''}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="gouverneur" className="text-sm font-medium">
                Gouverneur
              </label>
              <Input
                id="gouverneur"
                name="gouverneur"
                value={formData.gouverneur || ''}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="status" className="text-sm font-medium">
                Statut
              </label>
              <select
                id="status"
                name="status"
                value={formData.status || ''}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="Pacifiée">Pacifiée</option>
                <option value="Instable">Instable</option>
                <option value="En guerre">En guerre</option>
                <option value="Rebelle">Rebelle</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="ressource" className="text-sm font-medium">
                Ressource Principale
              </label>
              <Input
                id="ressource"
                name="ressource"
                value={formData.ressource || ''}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="population" className="text-sm font-medium">
                Population
              </label>
              <Input
                id="population"
                name="population"
                type="number"
                value={formData.population || 0}
                onChange={handleChange}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">Enregistrer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
