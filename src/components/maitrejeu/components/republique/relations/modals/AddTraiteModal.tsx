
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AddTraiteModalProps } from '../types';
import { Nation } from '../types';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export const AddTraiteModal: React.FC<AddTraiteModalProps> = ({ isOpen, onClose, nations, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'commercial',
    status: 'active',
    dateCreation: '',
    dateExpiration: '',
    nationId: '',
    description: '',
    terms: '',
    benefits: '',
    obligations: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error("Le nom du traité est requis");
      return;
    }
    
    if (!formData.nationId) {
      toast.error("Veuillez sélectionner une nation");
      return;
    }
    
    if (onSave) {
      onSave(formData);
    }
    
    toast.success(`Traité "${formData.name}" créé avec succès`);
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
          <DialogTitle>Ajouter un nouveau traité</DialogTitle>
          <DialogDescription>
            Saisissez les informations pour créer un nouveau traité diplomatique.
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
            <Label htmlFor="name">Nom du traité</Label>
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
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="peace">Paix</SelectItem>
                  <SelectItem value="military">Militaire</SelectItem>
                  <SelectItem value="territorial">Territorial</SelectItem>
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
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="draft">Brouillon</SelectItem>
                  <SelectItem value="expired">Expiré</SelectItem>
                  <SelectItem value="revoked">Révoqué</SelectItem>
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
              <Label htmlFor="dateExpiration">Date d'expiration</Label>
              <Input 
                id="dateExpiration"
                value={formData.dateExpiration}
                onChange={handleChange}
              />
            </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-2">
            <Label htmlFor="nationId">Nation impliquée</Label>
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
            <Label htmlFor="terms">Termes (séparés par des virgules)</Label>
            <Textarea 
              id="terms" 
              rows={2}
              value={formData.terms}
              onChange={handleChange}
            />
          </motion.div>
          
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="benefits">Avantages (séparés par des virgules)</Label>
              <Textarea 
                id="benefits" 
                rows={2}
                value={formData.benefits}
                onChange={handleChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="obligations">Obligations (séparées par des virgules)</Label>
              <Textarea 
                id="obligations" 
                rows={2}
                value={formData.obligations}
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
