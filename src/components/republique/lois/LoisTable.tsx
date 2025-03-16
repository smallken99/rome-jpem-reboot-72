
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, FileText, CheckCircle, Vote } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loi, useLois } from './hooks/useLois';
import { toast } from 'sonner';

interface LoisTableProps {
  onViewDetails: (loi: Loi) => void;
  onVote?: (loi: Loi) => void;
  onPromulguer?: (loi: Loi) => void;
}

export const LoisTable: React.FC<LoisTableProps> = ({ 
  onViewDetails, 
  onVote, 
  onPromulguer 
}) => {
  const { lois, categories, isLoading, voterLoi, promulguerLoi } = useLois();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  
  // Filtrer les lois
  const filteredLois = lois.filter(loi => {
    const matchesSearch = loi.titre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        loi.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        loi.auteur.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || loi.categorieId === categoryFilter;
    const matchesStatus = statusFilter === 'all' || loi.statut === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  // Fonction pour obtenir le badge de statut
  const getStatusBadge = (statut: Loi['statut']) => {
    switch(statut) {
      case 'proposée':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Proposée</Badge>;
      case 'en_débat':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">En débat</Badge>;
      case 'votée':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Votée</Badge>;
      case 'rejetée':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejetée</Badge>;
      case 'promulguée':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Promulguée</Badge>;
      default:
        return null;
    }
  };
  
  // Trouver le nom de la catégorie à partir de son ID
  const getCategoryName = (categorieId: string) => {
    const category = categories.find(cat => cat.id === categorieId);
    return category ? category.nom : 'Inconnu';
  };

  // Gérer le vote direct depuis la table
  const handleVoteDirect = (loi: Loi, vote: 'pour' | 'contre' | 'abstention') => {
    if (voterLoi) {
      voterLoi(loi.id, {
        pour: vote === 'pour' ? 120 : 10,
        contre: vote === 'contre' ? 120 : 10,
        abstention: vote === 'abstention' ? 80 : 10
      });
      toast.success(`Vote "${vote}" enregistré pour "${loi.titre}"`);
    }
  };

  // Gérer la promulgation directe depuis la table
  const handlePromulguerDirect = (loi: Loi) => {
    if (promulguerLoi) {
      promulguerLoi(loi.id);
      toast.success(`La loi "${loi.titre}" a été promulguée`);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/3">
          <Input
            placeholder="Rechercher une loi..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="w-full md:w-1/3">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les catégories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.id}>{category.nom}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-1/3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="proposée">Proposée</SelectItem>
              <SelectItem value="en_débat">En débat</SelectItem>
              <SelectItem value="votée">Votée</SelectItem>
              <SelectItem value="rejetée">Rejetée</SelectItem>
              <SelectItem value="promulguée">Promulguée</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredLois.length === 0 ? (
        <div className="text-center p-8 border border-dashed rounded-lg">
          <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground">Aucune loi ne correspond à ces critères.</p>
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Auteur</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLois.map((loi) => (
                <TableRow key={loi.id}>
                  <TableCell className="font-medium">{loi.titre}</TableCell>
                  <TableCell>{loi.auteur}</TableCell>
                  <TableCell>{getCategoryName(loi.categorieId)}</TableCell>
                  <TableCell>{getStatusBadge(loi.statut)}</TableCell>
                  <TableCell>{loi.dateVote || loi.dateProposition}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => onViewDetails(loi)}
                        title="Voir les détails"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      
                      {(loi.statut === 'proposée' || loi.statut === 'en_débat') && (
                        <div className="flex">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleVoteDirect(loi, 'pour')}
                            title="Voter pour"
                            className="text-green-600"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => onVote && onVote(loi)}
                            title="Options de vote"
                          >
                            <Vote className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                      
                      {loi.statut === 'votée' && (
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handlePromulguerDirect(loi)}
                          title="Promulguer"
                          className="text-purple-600"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
