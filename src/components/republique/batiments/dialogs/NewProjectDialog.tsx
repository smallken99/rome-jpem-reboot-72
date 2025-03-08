
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface NewProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateProject: (project: any) => void;
}

export const NewProjectDialog: React.FC<NewProjectDialogProps> = ({
  open,
  onOpenChange,
  onCreateProject,
}) => {
  const [newProject, setNewProject] = useState({
    name: '',
    location: '',
    estimatedCost: 200000,
    duration: 2,
    buildingTypeId: 'forum',
    benefits: []
  });

  const handleCreateProject = () => {
    if (!newProject.name || !newProject.location) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }
    
    const project = {
      ...newProject,
      benefits: ['Améliore le prestige de Rome', 'Offre des services aux citoyens'],
      sponsors: ['Sénat romain']
    };
    
    onCreateProject(project);
    onOpenChange(false);
    
    // Reset form
    setNewProject({
      name: '',
      location: '',
      estimatedCost: 200000,
      duration: 2,
      buildingTypeId: 'forum',
      benefits: []
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nouveau projet de construction</DialogTitle>
          <DialogDescription>
            Proposez un nouveau projet de construction publique pour la République.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="project-name" className="text-right">
              Nom
            </Label>
            <Input
              id="project-name"
              value={newProject.name}
              onChange={(e) => setNewProject({...newProject, name: e.target.value})}
              className="col-span-3"
              placeholder="Ex: Temple de Mars"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="project-location" className="text-right">
              Emplacement
            </Label>
            <Input
              id="project-location"
              value={newProject.location}
              onChange={(e) => setNewProject({...newProject, location: e.target.value})}
              className="col-span-3"
              placeholder="Ex: Forum Romanum"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="project-cost" className="text-right">
              Coût estimé
            </Label>
            <Input
              id="project-cost"
              type="number"
              value={newProject.estimatedCost}
              onChange={(e) => setNewProject({...newProject, estimatedCost: parseInt(e.target.value)})}
              className="col-span-3"
              min={50000}
              step={10000}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="project-duration" className="text-right">
              Durée (années)
            </Label>
            <Input
              id="project-duration"
              type="number"
              value={newProject.duration}
              onChange={(e) => setNewProject({...newProject, duration: parseInt(e.target.value)})}
              className="col-span-3"
              min={1}
              max={10}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="project-type" className="text-right">
              Type
            </Label>
            <select
              id="project-type"
              value={newProject.buildingTypeId}
              onChange={(e) => setNewProject({...newProject, buildingTypeId: e.target.value})}
              className="col-span-3 border rounded-md p-2"
            >
              <option value="forum">Forum</option>
              <option value="temple">Temple</option>
              <option value="basilica">Basilique</option>
              <option value="aqueduct">Aqueduc</option>
              <option value="theatre">Théâtre</option>
              <option value="circus">Cirque</option>
              <option value="baths">Thermes</option>
            </select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={handleCreateProject}>
            Proposer le projet
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
