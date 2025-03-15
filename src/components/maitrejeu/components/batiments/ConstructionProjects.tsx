
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckIcon, Calendar, User, Coins, HardHat } from 'lucide-react';
import { useBatimentsManagement } from '../../hooks/useBatimentsManagement';
import { formatDate } from '@/utils/formatUtils';
import { formatCurrency } from '@/utils/formatUtils';
import { GameDate, Season } from '../../types/common';
import { UnderDevelopmentSection } from '../UnderDevelopmentSection';

interface ConstructionProjectsProps {
  currentYear: number;
  currentSeason: Season;
}

export const ConstructionProjects: React.FC<ConstructionProjectsProps> = ({
  currentYear,
  currentSeason
}) => {
  const { constructionProjects, approveProject, updateProjectProgress } = useBatimentsManagement();
  
  if (constructionProjects.length === 0) {
    return (
      <UnderDevelopmentSection
        title="Projets de construction"
        description="Aucun projet de construction en cours. Utilisez le bouton 'Nouveau projet' pour en créer un."
      />
    );
  }
  
  const getRemainingTime = (project: { estimatedCompletionDate: GameDate, progress: number }) => {
    if (project.progress >= 100) return "Terminé";
    
    const currentDate = { year: currentYear, season: currentSeason };
    const estimatedDate = project.estimatedCompletionDate;
    
    if (estimatedDate.year < currentDate.year) return "En retard";
    if (estimatedDate.year > currentDate.year) {
      const yearsRemaining = estimatedDate.year - currentDate.year;
      return yearsRemaining > 1 ? `${yearsRemaining} ans` : "1 an";
    }
    
    // Même année, comparer les saisons
    const seasons = ["SPRING", "SUMMER", "AUTUMN", "WINTER"];
    const currentSeasonIndex = seasons.indexOf(currentSeason.toString());
    const estimatedSeasonIndex = seasons.indexOf(estimatedDate.season.toString());
    
    if (estimatedSeasonIndex < currentSeasonIndex) return "En retard";
    if (estimatedSeasonIndex === currentSeasonIndex) return "Cette saison";
    
    const seasonsRemaining = estimatedSeasonIndex - currentSeasonIndex;
    return seasonsRemaining === 1 ? "Saison prochaine" : `${seasonsRemaining} saisons`;
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Projets de construction actifs</h3>
        <Button size="sm">Nouveau projet</Button>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {constructionProjects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-base font-semibold">{project.name}</CardTitle>
                  <CardDescription>{project.location}</CardDescription>
                </div>
                <Badge variant={project.approved ? "default" : "outline"}>
                  {project.approved ? "Approuvé" : "En attente"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progression</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center">
                  <Coins className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{formatCurrency(project.cost)}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{formatDate(project.estimatedCompletionDate)}</span>
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{project.sponsor}</span>
                </div>
                <div className="flex items-center">
                  <HardHat className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{project.workers} ouvriers</span>
                </div>
              </div>
              
              <div className="text-sm">
                <span className="text-muted-foreground">Temps restant: </span>
                <span className="font-medium">{getRemainingTime(project)}</span>
              </div>
              
              <div className="flex justify-between">
                {!project.approved ? (
                  <Button 
                    className="w-full flex items-center gap-2"
                    onClick={() => approveProject(project.id)}
                  >
                    <CheckIcon className="h-4 w-4" />
                    Approuver
                  </Button>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => updateProjectProgress(project.id, Math.min(100, project.progress + 10))}
                    >
                      Mettre à jour
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 ml-2"
                      onClick={() => updateProjectProgress(project.id, 100)}
                    >
                      Terminer
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
