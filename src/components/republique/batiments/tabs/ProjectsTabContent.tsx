
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ConstructionProject } from '../hooks/useBatimentsPublics';
import { Eye, ArrowRight, CheckCircle, Play } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProjectsTabContentProps {
  projects: ConstructionProject[];
  onViewDetails: (project: ConstructionProject) => void;
  onApprove: (projectId: string) => void;
  onAdvance: (projectId: string) => void;
}

export const ProjectsTabContent: React.FC<ProjectsTabContentProps> = ({
  projects,
  onViewDetails,
  onApprove,
  onAdvance
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
                          (statusFilter === 'approved' && project.approved) ||
                          (statusFilter === 'pending' && !project.approved);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="w-full md:w-1/3">
          <Input
            placeholder="Rechercher un projet..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-1/3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les projets</SelectItem>
              <SelectItem value="approved">Projets approuvés</SelectItem>
              <SelectItem value="pending">En attente d'approbation</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.map(project => (
          <Card key={project.id} className={`border-${project.approved ? 'green' : 'amber'}-200 hover:border-${project.approved ? 'green' : 'amber'}-300 transition-colors`}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-cinzel font-semibold">{project.name}</h3>
                <span className={`text-xs ${project.approved ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'} px-2 py-1 rounded-full`}>
                  {project.approved ? 'Approuvé' : 'En attente'}
                </span>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Progression:</span>
                  <span className="text-sm font-medium">{project.progress}%</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-blue-500"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex justify-between text-sm mb-2">
                <span>Location:</span>
                <span className="font-medium">{project.location}</span>
              </div>
              
              <div className="flex justify-between text-sm mb-4">
                <span>Coût estimé:</span>
                <span className="font-medium">{project.estimatedCost.toLocaleString()} As</span>
              </div>
              
              <div className="flex justify-between space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 gap-1"
                  onClick={() => onViewDetails(project)}
                >
                  <Eye className="h-4 w-4" />
                  <span>Détails</span>
                </Button>
                
                {project.approved ? (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 gap-1"
                    onClick={() => onAdvance(project.id)}
                  >
                    <Play className="h-4 w-4" />
                    <span>Avancer</span>
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 gap-1"
                    onClick={() => onApprove(project.id)}
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Approuver</span>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredProjects.length === 0 && (
          <div className="md:col-span-2 lg:col-span-3 text-center p-8 border border-dashed rounded-lg">
            <p className="text-muted-foreground">Aucun projet ne correspond à ces critères.</p>
          </div>
        )}
      </div>
    </div>
  );
};
