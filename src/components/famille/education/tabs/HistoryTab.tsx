
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Check, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useEducation } from '../context/EducationContext';

export const HistoryTab: React.FC = () => {
  const { children } = useEducation();
  
  // Enfants qui ont terminé au moins une éducation
  const completedEducation = children.filter(child => child.progress === 100);
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Historique des Éducations</h2>
      
      {completedEducation.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Enfant</TableHead>
              <TableHead>Type d'éducation</TableHead>
              <TableHead>Spécialités acquises</TableHead>
              <TableHead>Précepteur</TableHead>
              <TableHead>Âge de fin</TableHead>
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {completedEducation.map(child => (
              <TableRow key={child.id}>
                <TableCell className="font-medium">{child.name}</TableCell>
                <TableCell>{child.educationType}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {child.specialties?.map(specialty => (
                      <Badge key={specialty} variant="outline" className="capitalize">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{child.mentor}</TableCell>
                <TableCell>{child.age}</TableCell>
                <TableCell>
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    <Check className="h-3 w-3 mr-1" />
                    Terminée
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Aucune éducation n'a encore été terminée.
          </p>
        </div>
      )}
    </div>
  );
};
