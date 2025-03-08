
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Ceremony } from '../types';
import { getCeremonyTypeBadge, getNextCelebrationStatus } from '../utils/ceremonyUtils';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { Info, Scroll } from 'lucide-react';

interface CeremonyTableProps {
  ceremonies: Ceremony[];
}

export const CeremonyTable: React.FC<CeremonyTableProps> = ({ ceremonies }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nom</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Divinité</TableHead>
          <TableHead>Coût</TableHead>
          <TableHead>Participants</TableHead>
          <TableHead>Prochaine célébration</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ceremonies.map(ceremony => (
          <TableRow key={ceremony.id}>
            <TableCell className="font-medium">{ceremony.name}</TableCell>
            <TableCell>{getCeremonyTypeBadge(ceremony.type)}</TableCell>
            <TableCell>{ceremony.date}</TableCell>
            <TableCell>{ceremony.deity}</TableCell>
            <TableCell>{ceremony.cost.toLocaleString()} as</TableCell>
            <TableCell>{ceremony.attendance.toLocaleString()}</TableCell>
            <TableCell>{getNextCelebrationStatus(ceremony.nextCelebration)}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <ActionButton 
                  icon={<Info className="h-4 w-4" />}
                  label="Détails"
                  variant="outline"
                  size="sm"
                  to={`/religion/ceremonies/${ceremony.id}`}
                />
                {ceremony.nextCelebration <= 30 && (
                  <ActionButton 
                    icon={<Scroll className="h-4 w-4" />}
                    label="Préparer"
                    variant="default"
                    size="sm"
                    to={`/religion/ceremonies/${ceremony.id}/prepare`}
                  />
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
