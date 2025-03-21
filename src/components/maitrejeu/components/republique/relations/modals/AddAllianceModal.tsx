
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AddAllianceModalProps } from '../types';
import { Nation } from '../types';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export const AddAllianceModal: React.FC<AddAllianceModalProps> = ({ isOpen, onClose, nations, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'defensive',
    status: 'active',
    dateCreation: '',
    duration: 10,
    nationId: '',
    description: '',
    militarySupport: 5000,
    economicBenefits: '',
    commitments: ''
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
      toast.error("Le nom de l'alliance est requis");
      return;
    }
    
    if (!formData.nationId) {
      toast.error("Veuillez sélectionner une nation membre");
      return;
    }
    
    if (onSave) {
      onSave(formData);
    }
    
    toast.success(`Alliance "${formData.name}" créée avec succès`);
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
          <DialogTitle>Créer une nouvelle alliance</DialogTitle>
          <DialogDescription>
            Saisissez les informations pour créer une nouvelle alliance militaire.
          </DialogDescription>
        </DialogHeader>
        
        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-4"
          variants={formVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="space-y-2">
            <Label htmlFor="name">Nom de l'alliance</Label>
            <Input 
              id="name" 
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </motion.div>
          
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select 
                value={formData.type}
                onValueChange={(value) => handleSelectChange('type', value)}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="defensive">Défensive</SelectItem>
                  <SelectItem value="offensive">Offensive</SelectItem>
                  <SelectItem value="full">Complète</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="expired">Expirée</SelectItem>
                  <SelectItem value="dissolved">Dissoute</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dateCreation">Date de création</Label>
              <Input 
                id="dateCreation" 
                value={formData.dateCreation}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration">Durée (années)</Label>
              <Input 
                id="duration" 
                type="number"
                min="1"
                value={formData.duration}
                onChange={handleNumberChange}
                required
              />
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-2">
            <Label htmlFor="nationId">Nation membre</Label>
            <Select
              value={formData.nationId}
              onValueChange={(value) => handleSelectChange('nationId', value)}
            >
              <SelectTrigger id="nationId">
                <SelectValue placeholder="Sélectionnez une nation" />
              </SelectTrigger>
              <SelectContent>
                {nations.map((nation: Nation) => (
                  <SelectItem key={nation.id} value={nation.id}>
                    {nation.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
          
          <motion.div variants={itemVariants} className="space-y-2">
            <Label htmlFor="militarySupport">Force militaire totale</Label>
            <Input 
              id="militarySupport" 
              type="number"
              min="0"
              value={formData.militarySupport}
              onChange={handleNumberChange}
              required
            />
          </motion.div>
          
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="economicBenefits">Avantages économiques</Label>
              <Textarea 
                id="economicBenefits" 
                rows={2}
                value={formData.economicBenefits}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="commitments">Engagements</Label>
              <Textarea 
                id="commitments" 
                rows={2}
                value={formData.commitments}
                onChange={handleChange}
              />
            </div>
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
