
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';

interface NewProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateProject: (projectData: any) => void;
}

export const NewProjectDialog: React.FC<NewProjectDialogProps> = ({
  open,
  onOpenChange,
  onCreateProject
}) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    buildingTypeId: '',
    estimatedCost: 100000,
    duration: 2,
    benefits: [''],
    sponsors: []
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSliderChange = (name: string, value: number[]) => {
    setFormData(prev => ({ ...prev, [name]: value[0] }));
  };
  
  const handleBenefitChange = (index: number, value: string) => {
    const updatedBenefits = [...formData.benefits];
    updatedBenefits[index] = value;
    setFormData(prev => ({ ...prev, benefits: updatedBenefits }));
  };
  
  const addBenefit = () => {
    setFormData(prev => ({ ...prev, benefits: [...prev.benefits, ''] }));
  };
  
  const removeBenefit = (index: number) => {
    const updatedBenefits = formData.benefits.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, benefits: updatedBenefits }));
  };
  
  const handleSubmit = () => {
    // Validation
    if (!formData.name || !formData.location || !formData.buildingTypeId) {
      toast.error("Tous les champs obligatoires doivent être remplis");
      return;
    }
    
    // Filter out empty benefits
    const filteredBenefits = formData.benefits.filter(benefit => benefit.trim() !== '');
    
    if (filteredBenefits.length === 0) {
      toast.error("Vous devez spécifier au moins un bénéfice");
      return;
    }
    
    const projectData = {
      ...formData,
      benefits: filteredBenefits
    };
    
    onCreateProject(projectData);
    onOpenChange(false);
    
    // Reset form
    setFormData({
      name: '',
      location: '',
      buildingTypeId: '',
      estimatedCost: 100000,
      duration: 2,
      benefits: [''],
      sponsors: []
    });
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-cinzel">Nouveau projet de construction</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom du bâtiment</Label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                placeholder="ex: Temple de Minerve"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Localisation</Label>
              <Input 
                id="location" 
                name="location" 
                value={formData.location} 
                onChange={handleInputChange} 
                placeholder="ex: Forum Romain"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="buildingType">Type de bâtiment</Label>
              <Select 
                value={formData.buildingTypeId} 
                onValueChange={(value) => handleSelectChange('buildingTypeId', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="temple">Temple</SelectItem>
                  <SelectItem value="basilica">Basilique</SelectItem>
                  <SelectItem value="forum">Forum</SelectItem>
                  <SelectItem value="thermae">Thermes</SelectItem>
                  <SelectItem value="amphitheatre">Amphithéâtre</SelectItem>
                  <SelectItem value="aqueduct">Aqueduc</SelectItem>
                  <SelectItem value="theater">Théâtre</SelectItem>
                  <SelectItem value="warehouse">Entrepôt</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Coût estimé: {formData.estimatedCost.toLocaleString()} As</Label>
              <Slider 
                value={[formData.estimatedCost]} 
                min={50000} 
                max={1000000} 
                step={10000} 
                onValueChange={(value) => handleSliderChange('estimatedCost', value)} 
              />
            </div>
            
            <div className="space-y-2">
              <Label>Durée de construction: {formData.duration} {formData.duration > 1 ? 'années' : 'année'}</Label>
              <Slider 
                value={[formData.duration]} 
                min={1} 
                max={10} 
                step={1} 
                onValueChange={(value) => handleSliderChange('duration', value)} 
              />
            </div>
            
            <div className="space-y-2">
              <Label>Bénéfices</Label>
              {formData.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input 
                    value={benefit} 
                    onChange={(e) => handleBenefitChange(index, e.target.value)} 
                    placeholder="ex: Améliore le prestige de Rome"
                  />
                  {formData.benefits.length > 1 && (
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeBenefit(index)}
                    >
                      -
                    </Button>
                  )}
                </div>
              ))}
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={addBenefit}
              >
                Ajouter un bénéfice
              </Button>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button>
          <Button onClick={handleSubmit}>Créer le projet</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
