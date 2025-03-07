
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  Eye, 
  Hammer, 
  AlertTriangle, 
  CheckCircle2, 
  Banknote, 
  Building, 
  Clock,
  Check
} from 'lucide-react';
import { PublicBuilding, ConstructionProject } from './hooks/useBatimentsPublics';
import { formatMoney } from '@/utils/formatUtils';

interface BatimentsTableProps {
  buildings?: PublicBuilding[];
  projects?: ConstructionProject[];
  type: 'buildings' | 'projects';
  onViewDetails?: (item: PublicBuilding | ConstructionProject) => void;
  onMaintain?: (buildingId: string) => void;
  onApprove?: (projectId: string) => void;
  onAdvance?: (projectId: string) => void;
}

export const BatimentsTable: React.FC<BatimentsTableProps> = ({
  buildings = [],
  projects = [],
  type,
  onViewDetails,
  onMaintain,
  onApprove,
  onAdvance
}) => {
  const getConditionColor = (condition: number) => {
    if (condition >= 80) return 'bg-green-500';
    if (condition >= 50) return 'bg-yellow-500';
    if (condition >= 30) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Terminé</Badge>;
      case 'in_progress':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">En construction</Badge>;
      case 'damaged':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Endommagé</Badge>;
      case 'abandoned':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Abandonné</Badge>;
      case 'planned':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Planifié</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  if (type === 'buildings') {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Nom</TableHead>
              <TableHead>Emplacement</TableHead>
              <TableHead>Construction</TableHead>
              <TableHead>État</TableHead>
              <TableHead>Entretien</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {buildings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Aucun bâtiment public trouvé.
                </TableCell>
              </TableRow>
            ) : (
              buildings.map((building) => (
                <TableRow key={building.id}>
                  <TableCell className="font-medium">{building.name}</TableCell>
                  <TableCell>{building.location}</TableCell>
                  <TableCell>{building.constructionYear} AUC</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {getStatusBadge(building.constructionStatus)}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="w-full">
                              <Progress 
                                value={building.condition} 
                                className="h-2"
                                indicatorClassName={getConditionColor(building.condition)}
                              />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>État: {building.condition}%</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Banknote className="h-4 w-4 text-muted-foreground" />
                      <span>{formatMoney(building.maintenanceCost)}/an</span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Niveau: {building.maintenanceLevel === 'minimal' ? 'Minimal' : 
                              building.maintenanceLevel === 'standard' ? 'Standard' : 'Excellent'}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onViewDetails && onViewDetails(building)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onMaintain && onMaintain(building.id)}
                        className={building.condition < 50 ? "border-orange-300 bg-orange-50" : ""}
                      >
                        <Hammer className={`h-4 w-4 ${building.condition < 50 ? "text-orange-600" : ""}`} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    );
  }
  
  // Projects table
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
