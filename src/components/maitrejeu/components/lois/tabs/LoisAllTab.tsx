
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Filter, Search } from "lucide-react";
import { Loi } from '@/components/maitrejeu/types/lois';
import { formatAnyGameDate } from '../utils/dateHelpers';
import { extractLoiDateInfo, gameDateToDate } from '../utils/dateConverter';

interface LoisAllTabProps {
  lois: Loi[];
  onViewLoi: (loi?: Loi) => void;
  formatSeason: (season: string) => string;
}

export const LoisAllTab: React.FC<LoisAllTabProps> = ({
  lois,
  onViewLoi,
  formatSeason
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  // Filter lois based on search term and selected status
  const filteredLois = lois.filter(loi => {
    const matchesSearch = searchTerm === '' || 
      loi.titre?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      loi.proposeur?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = selectedStatus === null || 
      loi.état?.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Sort lois by date, most recent first
  const sortedLois = [...filteredLois].sort((a, b) => {
    if (a.date && b.date) {
      try {
        const dateA = typeof a.date === 'string' ? new Date(a.date) : gameDateToDate(a.date);
        const dateB = typeof b.date === 'string' ? new Date(b.date) : gameDateToDate(b.date);
        return dateB.getTime() - dateA.getTime();
      } catch (error) {
        return 0;
      }
    }
    return 0;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une loi..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Statut</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSelectedStatus(null)}>
              Tous
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedStatus('proposée')}>
              Proposée
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedStatus('active')}>
              Active
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedStatus('rejected')}>
              Rejetée
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Loi</TableHead>
              <TableHead>Auteur</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedLois.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Aucune loi trouvée.
                </TableCell>
              </TableRow>
            ) : (
              sortedLois.map((loi) => {
                const dateInfo = extractLoiDateInfo(loi);
                
                return (
                  <TableRow key={loi.id}>
                    <TableCell className="font-medium">{loi.titre}</TableCell>
                    <TableCell>{loi.proposeur}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{loi.catégorie || loi.type}</Badge>
                    </TableCell>
                    <TableCell>
                      {formatAnyGameDate(loi.date)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          loi.état === 'active' || loi.état === 'promulguée'
                            ? 'bg-green-100 text-green-800'
                            : loi.état === 'rejected' || loi.état === 'rejetée'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'
                        }
                      >
                        {loi.état}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onViewLoi(loi)}
                      >
                        Voir détails
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
