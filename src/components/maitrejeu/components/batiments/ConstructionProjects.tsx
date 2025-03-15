
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  Construction, 
  Calendar, 
  TrendingUp, 
  Coins
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useState } from 'react';
import { ConstructionProject } from '@/components/republique/batiments/types/buildingTypes';

interface ConstructionProjectsProps {
  projects: ConstructionProject[];
  balance: number;
  onAdvance: (projectId: string, amount: number) => void;
}

export const ConstructionProjects: React.FC<ConstructionProjectsProps> = ({ 
  projects, 
  balance,
  onAdvance
}) => {
  const [selectedProgress, setSelectedProgress] = useState<Record<string, number>>({});
  
  const handleProgressChange = (projectId: string, value: string) => {
    setSelectedProgress({
      ...selectedProgress,
      [projectId]: parseInt(value)
    });
  };
  
  const handleAdvance = (projectId: string) => {
    const progressAmount = selectedProgress[projectId] || 10;
    onAdvance(projectId, progressAmount);
  };
  
  // Calculate a baseline cost for advancing a project
  const getAdvanceCost = (project: ConstructionProject, progressAmount: number) => {
    const totalCost = project.estimatedCost;
    const remainingCost = totalCost * 0.7; // Assuming 30% was paid upfront
    const costPerProgressPoint = remainingCost / (100 - project.progress);
    return Math.round(costPerProgressPoint * progressAmount);
  };
  
  return (
    <Card>
      <CardContent className="p-6">
        {projects.length === 0 ? (
          <div className="text-center py-10">
            <Construction className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">Aucun projet de construction en cours</p>
            <p className="text-xs text-muted-foreground mt-1">Commencez un nouveau projet pour le voir apparaître ici</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Projet</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Progression</TableHead>
                <TableHead>Coût Estimé</TableHead>
                <TableHead>Échéance</TableHead>
                <TableHead>Avancer</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => {
                const progressToAdvance = selectedProgress[project.id] || 10;
                const costToAdvance = getAdvanceCost(project, progressToAdvance);
                return (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <Construction className="h-4 w-4 mr-2 text-amber-600" />
                        {project.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{project.buildingTypeId}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-amber-500"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground mt-1 block">
                        {project.progress}% terminé
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Coins className="h-4 w-4 mr-1.5 text-muted-foreground" />
                        {project.estimatedCost.toLocaleString()} As
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1.5 text-muted-foreground" />
                        {project.expectedCompletionYear || "Inconnue"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Select
                          value={String(selectedProgress[project.id] || 10)}
                          onValueChange={(value) => handleProgressChange(project.id, value)}
                        >
                          <SelectTrigger className="w-20">
                            <SelectValue placeholder="10%" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">5%</SelectItem>
                            <SelectItem value="10">10%</SelectItem>
                            <SelectItem value="15">15%</SelectItem>
                            <SelectItem value="25">25%</SelectItem>
                            <SelectItem value="50">50%</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleAdvance(project.id)}
                          disabled={balance < costToAdvance || project.progress >= 100}
                          className="whitespace-nowrap"
                        >
                          <TrendingUp className="h-3.5 w-3.5 mr-1.5" />
                          Avancer ({costToAdvance.toLocaleString()} As)
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};
