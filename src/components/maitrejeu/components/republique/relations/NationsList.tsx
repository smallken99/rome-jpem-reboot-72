
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Globe, Sword, Users, ChevronsUpDown } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Nation } from './types';
import { NationModal } from './modals/NationModal';

interface NationsListProps {
  nations: Nation[];
  isEditable: boolean;
}

export const NationsList: React.FC<NationsListProps> = ({ nations, isEditable }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNation, setSelectedNation] = useState<Nation | null>(null);
  
  const handleAddNation = () => {
    setSelectedNation(null);
    setIsModalOpen(true);
  };
  
  const handleEditNation = (nation: Nation) => {
    setSelectedNation(nation);
    setIsModalOpen(true);
  };
  
  const handleDeleteNation = (nationId: string) => {
    console.log('Deleting nation:', nationId);
    // Implement deletion logic
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ally':
        return <Badge className="bg-green-100 text-green-800">Allié</Badge>;
      case 'enemy':
        return <Badge className="bg-red-100 text-red-800">Ennemi</Badge>;
      case 'neutral':
        return <Badge className="bg-blue-100 text-blue-800">Neutre</Badge>;
      case 'tributary':
        return <Badge className="bg-amber-100 text-amber-800">Tributaire</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  return (
    <div className="space-y-4">
      {isEditable && (
        <div className="flex justify-end mb-4">
          <Button onClick={handleAddNation} className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Ajouter une nation
          </Button>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {nations.map((nation) => (
          <Card key={nation.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{nation.name}</CardTitle>
                {getStatusBadge(nation.status)}
              </div>
              <CardDescription className="flex items-center gap-1">
                <Globe className="h-3 w-3" /> {nation.region}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pb-4">
              <div className="space-y-3">
                <div className="text-sm">{nation.description}</div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-1">
                    <Sword className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Force:</span>
                    <span className="text-xs font-medium">{nation.militaryStrength}/10</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <ChevronsUpDown className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Influence:</span>
                    <span className="text-xs font-medium">{nation.diplomaticInfluence}/10</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Population:</span>
                    <span className="text-xs font-medium">{(nation.population / 1000).toFixed(0)}k</span>
                  </div>
                </div>
                
                {isEditable && (
                  <div className="flex justify-end gap-2 mt-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditNation(nation)}>
                      <Edit className="h-3 w-3 mr-1" /> Éditer
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600" onClick={() => handleDeleteNation(nation.id)}>
                      <Trash2 className="h-3 w-3 mr-1" /> Supprimer
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {nations.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>Aucune nation trouvée</p>
        </div>
      )}
      
      <NationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        nation={selectedNation} 
      />
    </div>
  );
};
