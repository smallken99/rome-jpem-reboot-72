
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ConstructionProject } from '@/components/maitrejeu/types/batiments';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatCurrency, formatDate } from '@/utils/formatUtils';
import { Check, X, AlertTriangle, Calendar, Hammer, FileText } from 'lucide-react';
import { useBatimentsManagement } from '@/components/maitrejeu/hooks/useBatimentsManagement';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GameDate } from '@/components/maitrejeu/types/common';

interface ConstructionProjectsProps {
  currentYear: number;
  currentSeason: string;
}

export const ConstructionProjects: React.FC<ConstructionProjectsProps> = ({ 
  currentYear, 
  currentSeason 
}) => {
  const { constructionProjects, updateConstructionProgress, approveConstructionProject } = useBatimentsManagement();
  const [currentTab, setCurrentTab] = useState('active');
  
  // Filtrer les projets en fonction de l'onglet
  const activeProjects = constructionProjects.filter(
    project => project.approved && project.progress < 100
  );
  
  const pendingProjects = constructionProjects.filter(
    project => !project.approved
  );
  
  const completedProjects = constructionProjects.filter(
    project => project.approved && project.progress >= 100
  );
  
  // Fonction pour vérifier si un projet est en retard
  const isProjectDelayed = (project: ConstructionProject): boolean => {
    // Comparer la date actuelle avec la date d'achèvement estimée
    if (project.estimatedCompletionDate.year < currentYear) {
      return true;
    }
    
    if (project.estimatedCompletionDate.year === currentYear &&
        seasonToNumber(project.estimatedCompletionDate.season) < seasonToNumber(currentSeason)) {
      return true;
    }
    
    return false;
  };
  
  // Convertir une saison en nombre pour la comparaison
  const seasonToNumber = (season: string): number => {
    const seasons = { 'SPRING': 0, 'SUMMER': 1, 'FALL': 2, 'WINTER': 3 };
    return seasons[season as keyof typeof seasons] || 0;
  };
  
  // Fonction pour mettre à jour manuellement le progrès d'un projet
  const handleUpdateProgress = (id: string, newProgress: number) => {
    if (newProgress >= 0 && newProgress <= 100) {
      updateConstructionProgress(id, newProgress);
    }
  };
  
  // Fonction pour approuver un projet
  const handleApproveProject = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir approuver ce projet de construction ?')) {
      approveConstructionProject(id);
    }
  };
  
  // Fonction pour afficher le temps restant
  const getRemainingTime = (endDate: GameDate): string => {
    const remainingYears = endDate.year - currentYear;
    
    if (remainingYears > 1) {
      return `${remainingYears} ans`;
    } else if (remainingYears === 1) {
      const currentSeasonNumber = seasonToNumber(currentSeason);
      const endSeasonNumber = seasonToNumber(endDate.season);
      const remainingSeasons = endSeasonNumber - currentSeasonNumber;
      
      if (remainingSeasons <= 0) {
        return `${remainingSeasons + 4} saisons`;
      } else {
        return `${remainingSeasons} saisons`;
      }
    } else {
      const currentSeasonNumber = seasonToNumber(currentSeason);
      const endSeasonNumber = seasonToNumber(endDate.season);
      const remainingSeasons = endSeasonNumber - currentSeasonNumber;
      
      if (remainingSeasons < 0) {
        return "En retard";
      } else if (remainingSeasons === 0) {
        return "Cette saison";
      } else {
        return `${remainingSeasons} saisons`;
      }
    }
  };
  
  return (
    <div className="space-y-4">
      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="active">
            En cours <Badge variant="outline" className="ml-2">{activeProjects.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="pending">
            En attente <Badge variant="outline" className="ml-2">{pendingProjects.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="completed">
            Terminés <Badge variant="outline" className="ml-2">{completedProjects.length}</Badge>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="mt-4">
          <ScrollArea className="h-[400px]">
            <div className="space-y-4 pr-4">
              {activeProjects.length > 0 ? (
                activeProjects.map((project) => (
                  <Card key={project.id} className={isProjectDelayed(project) ? "border-amber-400" : ""}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <Badge variant={isProjectDelayed(project) ? "outline" : "secondary"}>
                          {isProjectDelayed(project) ? (
                            <span className="flex items-center text-amber-500">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              En retard
                            </span>
                          ) : (
                            <span>En cours</span>
                          )}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progrès:</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                        
                        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                          <div>
                            <dt className="text-muted-foreground">Emplacement:</dt>
                            <dd>{project.location}</dd>
                          </div>
                          <div>
                            <dt className="text-muted-foreground">Type:</dt>
                            <dd className="capitalize">{project.buildingType}</dd>
                          </div>
                          <div>
                            <dt className="text-muted-foreground">Date de début:</dt>
                            <dd>{formatDate(project.startDate)}</dd>
                          </div>
                          <div>
                            <dt className="text-muted-foreground">Fin estimée:</dt>
                            <dd className={isProjectDelayed(project) ? "text-amber-500" : ""}>
                              {formatDate(project.estimatedCompletionDate)}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-muted-foreground">Coût:</dt>
                            <dd>{formatCurrency(project.cost)}</dd>
                          </div>
                          <div>
                            <dt className="text-muted-foreground">Travailleurs:</dt>
                            <dd>{project.workers}</dd>
                          </div>
                        </dl>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>Reste: {getRemainingTime(project.estimatedCompletionDate)}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleUpdateProgress(project.id, project.progress + 10)}>
                              <Hammer className="h-4 w-4 mr-1" />
                              Mise à jour
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8 bg-muted/20 rounded-lg border border-dashed">
                  <Hammer className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">
                    Aucun projet de construction en cours
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="pending" className="mt-4">
          <ScrollArea className="h-[400px]">
            <div className="space-y-4 pr-4">
              {pendingProjects.length > 0 ? (
                pendingProjects.map((project) => (
                  <Card key={project.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <Badge variant="outline">En attente d'approbation</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-4">
                        <div>
                          <dt className="text-muted-foreground">Emplacement:</dt>
                          <dd>{project.location}</dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground">Type:</dt>
                          <dd className="capitalize">{project.buildingType}</dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground">Coût estimé:</dt>
                          <dd>{formatCurrency(project.cost)}</dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground">Achèvement estimé:</dt>
                          <dd>{project.expectedCompletionYear} AUC</dd>
                        </div>
                        <div className="col-span-2">
                          <dt className="text-muted-foreground">Sponsor:</dt>
                          <dd>{project.sponsor}</dd>
                        </div>
                      </dl>
                      
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleApproveProject(project.id)}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Approuver
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                        >
                          <X className="h-4 w-4 mr-1" />
                          Rejeter
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8 bg-muted/20 rounded-lg border border-dashed">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">
                    Aucun projet en attente d'approbation
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-4">
          <ScrollArea className="h-[400px]">
            <div className="space-y-4 pr-4">
              {completedProjects.length > 0 ? (
                completedProjects.map((project) => (
                  <Card key={project.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <Badge variant="success">Terminé</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <div>
                          <dt className="text-muted-foreground">Emplacement:</dt>
                          <dd>{project.location}</dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground">Type:</dt>
                          <dd className="capitalize">{project.buildingType}</dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground">Date de début:</dt>
                          <dd>{formatDate(project.startDate)}</dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground">Date d'achèvement:</dt>
                          <dd>{formatDate(project.estimatedCompletionDate)}</dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground">Coût final:</dt>
                          <dd>{formatCurrency(project.cost)}</dd>
                        </div>
                        <div>
                          <dt className="text-muted-foreground">Sponsor:</dt>
                          <dd>{project.sponsor}</dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8 bg-muted/20 rounded-lg border border-dashed">
                  <Check className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">
                    Aucun projet terminé
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConstructionProjects;
