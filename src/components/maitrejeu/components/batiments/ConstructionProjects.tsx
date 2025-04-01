
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useMaitreJeu } from '../../context';
import { ConstructionProject, BuildingType } from '../../types/batiments';
import { GameDate } from '../../types/common';

export const ConstructionProjects = ({ currentYear, currentSeason }: { currentYear: number, currentSeason: string }) => {
  const { evenements } = useMaitreJeu();
  
  // Create complete construction projects with all required properties
  const constructionProjects: ConstructionProject[] = [
    {
      id: 'project-1',
      name: 'Nouveau Forum',
      type: 'forum' as BuildingType,
      location: 'Champ de Mars',
      cost: 500000,
      progress: 50,
      startDate: { year: currentYear - 1, season: 'Ver' },
      estimatedEndDate: { year: currentYear + 1, season: 'Aes' },
      status: 'in_progress',
      workers: 200,
      description: 'Construction d\'un nouveau forum pour désengorger le centre-ville',
      estimatedCost: 500000,
      expectedCompletionYear: currentYear + 1,
      approved: true
    },
    {
      id: 'project-2',
      name: 'Aqueduc de la Via Appia',
      type: 'aqueduct' as BuildingType,
      location: 'Via Appia',
      cost: 300000,
      progress: 20,
      startDate: { year: currentYear, season: 'Ver' },
      estimatedEndDate: { year: currentYear + 2, season: 'Aut' },
      status: 'planning',
      workers: 150,
      description: 'Construction d\'un aqueduc pour alimenter les thermes',
      estimatedCost: 300000,
      expectedCompletionYear: currentYear + 2,
      approved: false
    }
  ];
  
  const handleApproveProject = (projectId: string) => {
    console.log('Approve project', projectId);
  };
  
  const handleUpdateProgress = (projectId: string, progress: number) => {
    console.log('Update progress', projectId, progress);
  };
  
  const handleCreateEconomicRecord = (project: ConstructionProject) => {
    // Create an economic record for the project
    const economicRecord = {
      amount: project.estimatedCost,
      description: `Construction: ${project.name}`,
      date: { year: currentYear, season: currentSeason } as GameDate,
      recurring: false
    };
    
    // Log the economic record (in a real app, you would add this to your state)
    console.log('Creating economic record for project', economicRecord);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Projets de Construction</CardTitle>
        <CardDescription>
          Suivez l'avancement des projets de construction en cours
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableCaption>Liste des projets de construction</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Localisation</TableHead>
              <TableHead>Coût estimé</TableHead>
              <TableHead>Année de fin prévue</TableHead>
              <TableHead>Avancement</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {constructionProjects.map(project => (
              <TableRow key={project.id}>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.location}</TableCell>
                <TableCell>{project.estimatedCost}</TableCell>
                <TableCell>{project.expectedCompletionYear}</TableCell>
                <TableCell>{project.progress}%</TableCell>
                <TableCell>
                  <Button variant="secondary" size="sm" onClick={() => handleApproveProject(project.id)}>
                    Approuver
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleUpdateProgress(project.id, project.progress + 10)}>
                    Mettre à jour
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleCreateEconomicRecord(project)}>
                    Enregistrer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
