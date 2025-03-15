
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Check, X, Calendar, ArrowRight } from 'lucide-react';
import { ConstructionProject, BuildingType } from '../../types/batiments';
import { formatCurrency } from '@/utils/currencyUtils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Season } from '@/components/maitrejeu/types/common';

interface ConstructionProjectsProps {
  currentYear: number;
  currentSeason: Season;
}

export const ConstructionProjects: React.FC<ConstructionProjectsProps> = ({
  currentYear,
  currentSeason
}) => {
  const [constructionProjects, setConstructionProjects] = React.useState<ConstructionProject[]>([
    {
      id: '1',
      buildingType: 'temple',
      name: 'Temple de Mercure',
      location: 'Mont Aventin',
      description: 'Nouveau temple dédié à Mercure pour favoriser le commerce',
      cost: 45000,
      estimatedCompletionDate: { year: currentYear + 1, season: 'Ver', phase: 'ECONOMY', day: 1 },
      startDate: { year: currentYear, season: 'Hiems', phase: 'ECONOMY', day: 15 },
      progress: 25,
      approved: true,
      sponsor: 'Marcus Licinius',
      workers: 120,
      expectedCompletionYear: currentYear + 1
    },
    {
      id: '2',
      buildingType: 'aqueduct',
      name: 'Aqueduc Tiberin',
      location: 'Via Tiburtina',
      description: 'Extension de l\'aqueduc pour approvisionner les nouveaux quartiers',
      cost: 120000,
      estimatedCompletionDate: { year: currentYear + 2, season: 'Aestas', phase: 'ECONOMY', day: 1 },
      startDate: { year: currentYear - 1, season: 'Autumnus', phase: 'ECONOMY', day: 15 },
      progress: 40,
      approved: true,
      sponsor: 'Sénat',
      workers: 300,
      expectedCompletionYear: currentYear + 2
    },
    {
      id: '3',
      buildingType: 'forum',
      name: 'Forum Augustum',
      location: 'Centre ville',
      description: 'Nouveau forum pour désengorger le Forum Romanum',
      cost: 200000,
      estimatedCompletionDate: { year: currentYear + 3, season: 'Ver', phase: 'ECONOMY', day: 1 },
      startDate: { year: currentYear, season: 'Ver', phase: 'ECONOMY', day: 1 },
      progress: 10,
      approved: false,
      sponsor: 'Magistrats plébéiens',
      workers: 500,
      expectedCompletionYear: currentYear + 3
    }
  ]);

  const formatType = (type: BuildingType) => {
    const typeMapping: Record<BuildingType, string> = {
      'temple': 'Temple',
      'basilica': 'Basilique',
      'forum': 'Forum',
      'market': 'Marché',
      'aqueduct': 'Aqueduc',
      'theater': 'Théâtre',
      'amphitheater': 'Amphithéâtre',
      'circus': 'Cirque',
      'bath': 'Thermes',
      'bridge': 'Pont',
      'villa': 'Villa',
      'road': 'Route',
      'port': 'Port',
      'warehouse': 'Entrepôt',
      'other': 'Autre'
    };
    return typeMapping[type] || type;
  };

  const formatSeason = (season: string): string => {
    switch (season) {
      case 'Ver':
        return 'Printemps';
      case 'Aestas':
        return 'Été';
      case 'Autumnus':
        return 'Automne';
      case 'Hiems':
        return 'Hiver';
      default:
        return season;
    }
  };

  const getTimeRemaining = (project: ConstructionProject) => {
    const endYear = project.estimatedCompletionDate.year;
    const endSeason = project.estimatedCompletionDate.season;
    
    const seasons = ['Ver', 'Aestas', 'Autumnus', 'Hiems'];
    const currentSeasonIndex = seasons.indexOf(currentSeason);
    const endSeasonIndex = seasons.indexOf(endSeason);
    
    const yearDiff = endYear - currentYear;
    
    if (yearDiff === 0) {
      // Même année
      const seasonDiff = endSeasonIndex - currentSeasonIndex;
      if (seasonDiff <= 0) return "Terminé";
      return `${seasonDiff} saison${seasonDiff > 1 ? 's' : ''}`;
    } else if (yearDiff > 0) {
      // Années futures
      const totalSeasons = yearDiff * 4 - currentSeasonIndex + endSeasonIndex;
      if (totalSeasons === 1) return "1 saison";
      if (totalSeasons < 4) return `${totalSeasons} saisons`;
      const years = Math.floor(totalSeasons / 4);
      const remainingSeasons = totalSeasons % 4;
      return `${years} an${years > 1 ? 's' : ''} ${remainingSeasons > 0 ? `et ${remainingSeasons} saison${remainingSeasons > 1 ? 's' : ''}` : ''}`;
    }
    
    return "Terminé";
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {constructionProjects.length === 0 ? (
          <Card>
            <CardContent className="py-10 text-center text-muted-foreground">
              Aucun projet de construction en cours
            </CardContent>
          </Card>
        ) : (
          constructionProjects.map((project) => (
            <Card key={project.id} className={!project.approved ? "border-amber-500/50" : ""}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {project.name}
                      {!project.approved && (
                        <Badge variant="outline" className="text-amber-500 border-amber-500">
                          En attente d'approbation
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription>
                      {formatType(project.buildingType)} - {project.location}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Progression: {project.progress}%</p>
                    <p className="text-sm text-muted-foreground">
                      Reste: {getTimeRemaining(project)}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Progress 
                  value={project.progress} 
                  className="h-2 mb-4" 
                  indicatorClassName={project.approved ? undefined : "bg-amber-500"}
                />
                
                <Accordion type="single" collapsible>
                  <AccordionItem value="details">
                    <AccordionTrigger className="text-sm py-2">Détails du projet</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Description:</p>
                          <p>{project.description}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Sponsors:</p>
                          <p>{project.sponsor}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Coût total:</p>
                          <p>{formatCurrency(project.cost)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Nombre de travailleurs:</p>
                          <p>{project.workers}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Date de début:</p>
                          <p>{formatSeason(project.startDate.season)} {project.startDate.year}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Date d'achèvement prévue:</p>
                          <p>{formatSeason(project.estimatedCompletionDate.season)} {project.estimatedCompletionDate.year}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-2 mt-4">
                        {!project.approved ? (
                          <>
                            <Button size="sm" variant="outline" className="text-green-500 border-green-500 hover:bg-green-500/10">
                              <Check className="h-3.5 w-3.5 mr-1.5" />
                              Approuver
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-500 border-red-500 hover:bg-red-500/10">
                              <X className="h-3.5 w-3.5 mr-1.5" />
                              Rejeter
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button size="sm" variant="outline">
                              <Calendar className="h-3.5 w-3.5 mr-1.5" />
                              Planification
                            </Button>
                            <Button size="sm" variant="outline">
                              <ArrowRight className="h-3.5 w-3.5 mr-1.5" />
                              Accélérer
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-3.5 w-3.5 mr-1.5" />
                              Éditer
                            </Button>
                          </>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
