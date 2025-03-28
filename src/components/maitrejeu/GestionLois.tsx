import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { LoiCreationDialog } from './components/lois/LoiCreationDialog';
import { LoiDetailDialog } from './components/lois/LoiDetailDialog';
import { useMaitreJeu } from './context/MaitreJeuContext';
import { LoiTimeline } from './components/lois/LoiTimeline';
import { formatDate } from '@/utils/dateUtils';
import { Loi } from './types/lois';

export const GestionLois = () => {
  const { lois, setLois } = useMaitreJeu();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showLoiModal, setShowLoiModal] = useState(false);
  const [selectedLoi, setSelectedLoi] = useState<Loi | null>(null);
  const [showLoiDetail, setShowLoiDetail] = useState(false);
  
  // Filtre les lois en fonction des critères de recherche et des filtres
  const filteredLois = lois.filter(loi => {
    const searchMatch = loi.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        loi.description.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = categoryFilter ? loi.catégorie === categoryFilter : true;
    const statusMatch = statusFilter ? loi.état === statusFilter : true;
    
    return searchMatch && categoryMatch && statusMatch;
  });
  
  // Récupère les 5 lois les plus récentes
  const recentLois = [...lois]
    .sort((a, b) => new Date(b.date.year, b.date.season).getTime() - new Date(a.date.year, a.date.season).getTime())
    .slice(0, 5);
  
  // Ouvre le modal de détails de la loi
  const handleOpenLoiDetail = (loi: Loi) => {
    setSelectedLoi(loi);
    setShowLoiDetail(true);
  };
  
  // Ferme le modal de détails de la loi
  const handleCloseLoiDetail = () => {
    setSelectedLoi(null);
    setShowLoiDetail(false);
  };
  
  // Ouvre le modal d'édition de la loi
  const handleEditLoi = (loi: Loi) => {
    setSelectedLoi(loi);
    setShowLoiModal(true);
  };
  
  // Supprime une loi
  const handleDeleteLoi = (id: string) => {
    setLois(lois.filter(loi => loi.id !== id));
  };
  
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Gestion des Lois</h1>
          <p className="text-muted-foreground">
            Gérez les lois et décrets de la République Romaine
          </p>
        </div>
        <Button onClick={() => setShowLoiModal(true)}>
          Ajouter une loi
        </Button>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une loi..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Select onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrer par catégorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Toutes les catégories</SelectItem>
            <SelectItem value="politique">Politique</SelectItem>
            <SelectItem value="sociale">Sociale</SelectItem>
            <SelectItem value="économique">Économique</SelectItem>
            <SelectItem value="militaire">Militaire</SelectItem>
          </SelectContent>
        </Select>
        
        <Select onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrer par statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Tous les statuts</SelectItem>
            <SelectItem value="proposed">Proposée</SelectItem>
            <SelectItem value="debated">En débat</SelectItem>
            <SelectItem value="voted">Votée</SelectItem>
            <SelectItem value="implemented">Implémentée</SelectItem>
            <SelectItem value="rejected">Rejetée</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Lois et Décrets</CardTitle>
              <CardDescription>
                Liste des lois en vigueur et des décrets proposés
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="divide-y divide-border">
                  {filteredLois.map(loi => (
                    <div key={loi.id} className="py-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{loi.titre}</h3>
                        <p className="text-sm text-muted-foreground">
                          {loi.description.substring(0, 100)}...
                        </p>
                        <div className="mt-2 flex items-center space-x-2">
                          <span className="text-xs font-medium">Catégorie:</span>
                          <span className="text-xs text-muted-foreground">{loi.catégorie}</span>
                          <span className="text-xs font-medium">Statut:</span>
                          <span className="text-xs text-muted-foreground">{loi.état}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleOpenLoiDetail(loi)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditLoi(loi)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteLoi(loi.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Chronologie des lois</CardTitle>
              <CardDescription>Les dernières lois votées</CardDescription>
            </CardHeader>
            <CardContent>
              {recentLois.length > 0 ? (
                <LoiTimeline lois={recentLois} />
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  Aucune loi récente à afficher
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      <LoiCreationDialog
        isOpen={showLoiModal}
        onClose={() => setShowLoiModal(false)}
        loi={selectedLoi}
      />
      
      <LoiDetailDialog
        isOpen={showLoiDetail}
        onClose={handleCloseLoiDetail}
        loi={selectedLoi}
        onEdit={handleEditLoi}
      />
    </div>
  );
};
