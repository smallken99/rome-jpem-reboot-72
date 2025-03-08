
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Eye, CheckCircle2, Building } from 'lucide-react';
import { ConstructionProject } from '../hooks/useBatimentsPublics';
import { formatMoney } from '@/utils/formatUtils';
import { Clock } from 'lucide-react';

interface ProjectsTableProps {
  projects: ConstructionProject[];
  onViewDetails?: (project: ConstructionProject) => void;
  onApprove?: (projectId: string) => void;
  onAdvance?: (projectId: string) => void;
}

export const ProjectsTable: React.FC<ProjectsTableProps> = ({
  projects = [],
  onViewDetails,
  onApprove,
  onAdvance
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Projet</TableHead>
            <TableHead>Emplacement</TableHead>
            <TableHead>Coût estimé</TableHead>
            <TableHead>Durée</TableHead>
            <TableHead>Progression</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                Aucun projet de construction en cours.
              </TableCell>
            </TableRow>
          ) : (
            projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {project.name}
                    {!project.approved && (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        En attente
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>{project.location}</TableCell>
                <TableCell>{formatMoney(project.estimatedCost)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{project.duration} {project.duration > 1 ? 'années' : 'année'}</span>
                  </div>
                  {project.startedYear && (
                    <div className="text-xs text-muted-foreground mt-1">
                      Début: {project.startedYear} AUC
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>{project.progress}%</span>
                      {project.expectedCompletionYear && (
                        <span>Fin prévue: {project.expectedCompletionYear} AUC</span>
                      )}
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onViewDetails && onViewDetails(project)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    
                    {!project.approved ? (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onApprove && onApprove(project.id)}
                        className="border-green-300 bg-green-50"
                      >
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onAdvance && onAdvance(project.id)}
                        disabled={project.progress >= 100}
                      >
                        <Building className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
