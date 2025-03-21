
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AddNationModalProps } from '../types';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export const AddNationModal: React.FC<AddNationModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    region: '',
    status: 'neutral',
    population: 100000,
    description: '',
    leader: '',
    leaderTitle: '',
    militaryStrength: 50,
    diplomaticInfluence: 50,
    tradeValue: 50,
    lastContact: '',
    leaders: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: Number(value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error("Le nom de la nation est requis");
      return;
    }
    
    if (!formData.region.trim()) {
      toast.error("La région est requise");
      return;
    }
    
    if (onSave) {
      onSave(formData);
    }
    
    toast.success(`Nation "${formData.name}" ajoutée avec succès`);
    onClose();
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Ajouter une nouvelle nation</DialogTitle>
          <DialogDescription>
            Saisissez les informations pour ajouter une nouvelle nation.
          </DialogDescription>
        </DialogHeader>
        
        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-4"
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom</Label>
              <Input 
                id="name" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="region">Région</Label>
              <Input 
                id="region" 
                value={formData.region}
                onChange={handleChange}
                required 
              />
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <Select 
                value={formData.status}
                onValueChange={(value) => handleSelectChange('status', value)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ally">Allié</SelectItem>
                  <SelectItem value="enemy">Ennemi</SelectItem>
                  <SelectItem value="neutral">Neutre</SelectItem>
                  <SelectItem value="tributary">Tributaire</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="population">Population</Label>
              <Input 
                id="population" 
                type="number" 
                value={formData.population}
                onChange={handleNumberChange}
                required 
              />
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              rows={3}
              value={formData.description}
              onChange={handleChange}
            />
          </motion.div>
          
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="leader">Dirigeant</Label>
              <Input 
                id="leader" 
                value={formData.leader}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="leaderTitle">Titre du dirigeant</Label>
              <Input 
                id="leaderTitle" 
                value={formData.leaderTitle}
                onChange={handleChange}
                required 
              />
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="militaryStrength">Force militaire (1-100)</Label>
              <Input 
                id="militaryStrength" 
                type="number" 
                min="1" 
                max="100"
                value={formData.militaryStrength}
                onChange={handleNumberChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="diplomaticInfluence">Influence (1-100)</Label>
              <Input 
                id="diplomaticInfluence" 
                type="number" 
                min="1" 
                max="100"
                value={formData.diplomaticInfluence}
                onChange={handleNumberChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tradeValue">Commerce (1-100)</Label>
              <Input 
                id="tradeValue" 
                type="number" 
                min="1" 
                max="100"
                value={formData.tradeValue}
                onChange={handleNumberChange}
              />
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-2">
            <Label htmlFor="lastContact">Dernier contact</Label>
            <Input 
              id="lastContact" 
              value={formData.lastContact}
              onChange={handleChange}
            />
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-2">
            <Label htmlFor="leaders">Dirigeants historiques (séparés par des virgules)</Label>
            <Input 
              id="leaders" 
              value={formData.leaders}
              onChange={handleChange}
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={onClose}>
                Annuler
              </Button>
              <Button type="submit">Enregistrer</Button>
            </DialogFooter>
          </motion.div>
        </motion.form>
      </DialogContent>
    </Dialog>
  );
};
