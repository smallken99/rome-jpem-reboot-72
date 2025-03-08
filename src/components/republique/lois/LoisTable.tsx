import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, ThumbsUp, ThumbsDown } from 'lucide-react';
import { formatRomanDate } from '@/utils/formatUtils';
import { StatusBadge } from '../../batiments/components/StatusBadge';

export interface Law {
  id: string;
  title: string;
  proposedBy: string;
  proposedDate: {
    year: number;
    season: string;
    day: number;
  };
  status: string;
  category: string;
  votes?: {
    for: number;
    against: number;
  };
}

interface LoisTableProps {
  laws: Law[];
  onViewDetails?: (law: Law) => void;
  onVote?: (lawId: string, vote: 'for' | 'against') => void;
}

export const LoisTable: React.FC<LoisTableProps> = ({
  laws = [],
  onViewDetails,
  onVote
}) => {
  const canVoteOnLaw = (status: string) => {
    return status === 'pending' || status === 'voting';
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'approved':
        return 'approved';
      case 'rejected':
        return 'abandoned';
      case 'pending':
      case 'voting':
        return 'in_progress';
      default:
        return status;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Titre</TableHead>
            <TableHead>Proposée par</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Votes</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {laws.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                Aucune loi trouvée.
              </TableCell>
            </TableRow>
          ) : (
            laws.map((law) => (
              <TableRow key={law.id}>
                <TableCell className="font-medium">{law.title}</TableCell>
                <TableCell>{law.proposedBy}</TableCell>
                <TableCell>
                  {formatRomanDate(
                    law.proposedDate.year,
                    law.proposedDate.season,
                    law.proposedDate.day
                  )}
                </TableCell>
                <TableCell>
                  <StatusBadge status={getStatusLabel(law.status)} />
                </TableCell>
                <TableCell>
                  {law.votes ? (
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <ThumbsUp className="h-4 w-4 text-green-600 mr-1" />
                        <span>{law.votes.for}</span>
                      </div>
                      <div className="flex items-center">
                        <ThumbsDown className="h-4 w-4 text-red-600 mr-1" />
                        <span>{law.votes.against}</span>
                      </div>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">Pas de vote</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewDetails && onViewDetails(law)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    
                    {canVoteOnLaw(law.status) && onVote && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-green-300 bg-green-50"
                          onClick={() => onVote(law.id, 'for')}
                        >
                          <ThumbsUp className="h-4 w-4 text-green-600" />
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-300 bg-red-50"
                          onClick={() => onVote(law.id, 'against')}
                        >
                          <ThumbsDown className="h-4 w-4 text-red-600" />
                        </Button>
                      </>
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
