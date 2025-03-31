import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useMaitreJeu } from '../../context';
import { ConstructionProject } from '../../types/batiments';
import { ECONOMIE_CATEGORIES, ECONOMIE_TYPES, ECONOMIE_SOURCE } from '@/components/maitrejeu/types/economie';
import { GameDate } from '@/components/maitrejeu/types/common';

export const ConstructionProjects = ({ currentYear, currentSeason }: { currentYear: number, currentSeason: string }) => {
  const { evenements } = useMaitreJeu();
  
  const constructionProjects: ConstructionProject[] = [
    {
      id: 'project-1',
      name: 'Nouveau Forum',
      location: 'Champ de Mars',
      description: 'Construction d\'un nouveau forum pour désengorger le centre-ville',
      estimatedCost: 500000,
      expectedCompletionYear: 725,
      approved: true,
      progress: 50
    },
    {
      id: 'project-2',
      name: 'Aqueduc de la Via Appia',
      location: 'Via Appia',
      description: 'Construction d\'un aqueduc pour alimenter les thermes',
      estimatedCost: 300000,
      expectedCompletionYear: 724,
      approved: false,
      progress: 20
    }
  ];
  
  const handleApproveProject = (projectId: string) => {
    console.log('Approve project', projectId);
  };
  
  const handleUpdateProgress = (projectId: string, progress: number) => {
    console.log('Update progress', projectId, progress);
  };
  
  const handleCreateEconomicRecord = (project: ConstructionProject) => {
    // Fix the enum values to use the correct types
    const economicRecord = {
      amount: project.estimatedCost,
      description: `Construction: ${project.name}`,
      category: ECONOMIE_CATEGORIES.CONSTRUCTION,
      type: ECONOMIE_TYPES.EXPENSE,
      date: { year: currentYear, season: currentSeason },
      source: ECONOMIE_SOURCE.GOVERNMENT,
      recurring: false,
      recurringInterval: 'special' as const
    };
    
    // Add the economic record
    // This would typically call a context function
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
