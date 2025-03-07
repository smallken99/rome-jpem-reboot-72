
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Eye, 
  ArrowRight, 
  Check, 
  X, 
  HelpCircle, 
  ShieldAlert,
  Building,
  Scale,
  Users,
  Sword,
  CircleDollarSign,
  Landmark
} from 'lucide-react';
import { Loi, LoiStatus, LoiCategory } from './hooks/useLoisManagement';

interface LoisTableProps {
  lois: Loi[];
  onViewLoi?: (loi: Loi) => void;
  onAdvanceLoi?: (loiId: string) => void;
  onVetoLoi?: (loiId: string) => void;
  isEditable?: boolean;
}

export const LoisTable: React.FC<LoisTableProps> = ({
  lois,
  onViewLoi,
  onAdvanceLoi,
  onVetoLoi,
  isEditable = false
}) => {
  // Obtenir l'icône pour une catégorie de loi
  const getCategoryIcon = (category: LoiCategory) => {
    switch(category) {
      case 'politique': return <Building className="h-4 w-4" />;
      case 'judiciaire': return <Scale className="h-4 w-4" />;
      case 'sociale': return <Users className="h-4 w-4" />;
      case 'militaire': return <Sword className="h-4 w-4" />;
      case 'economique': return <CircleDollarSign className="h-4 w-4" />;
      case 'religieuse': return <Landmark className="h-4 w-4" />;
      default: return <HelpCircle className="h-4 w-4" />;
    }
  };

  // Obtenir le badge pour un statut de loi
  const getStatusBadge = (status: LoiStatus) => {
    switch(status) {
      case 'proposed':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Proposée</Badge>;
      case 'debate':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">En débat</Badge>;
      case 'voting':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">En vote</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Approuvée</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejetée</Badge>;
      case 'vetoed':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Veto</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Nom</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Proposée par</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lois.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                Aucune loi trouvée.
              </TableCell>
            </TableRow>
          ) : (
            lois.map((loi) => (
              <TableRow key={loi.id}>
                <TableCell className="font-medium">{loi.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {getCategoryIcon(loi.category)}
                    <span className="capitalize">{loi.category}</span>
                  </div>
                </TableCell>
                <TableCell>{loi.proposedBy}</TableCell>
                <TableCell>{loi.proposedDate}</TableCell>
                <TableCell>{getStatusBadge(loi.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onViewLoi && onViewLoi(loi)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    
                    {isEditable && loi.status !== 'approved' && loi.status !== 'rejected' && loi.status !== 'vetoed' && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => onAdvanceLoi && onAdvanceLoi(loi.id)}
                          disabled={loi.status === 'approved' || loi.status === 'rejected' || loi.status === 'vetoed'}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => onVetoLoi && onVetoLoi(loi.id)}
                          disabled={loi.status === 'approved' || loi.status === 'rejected' || loi.status === 'vetoed'}
                        >
                          <ShieldAlert className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    
                    {loi.status === 'voting' && (
                      <div className="flex gap-1">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 bg-green-50 hover:bg-green-100"
                          title="Voter pour"
                        >
                          <Check className="h-4 w-4 text-green-600" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 bg-red-50 hover:bg-red-100"
                          title="Voter contre"
                        >
                          <X className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
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
