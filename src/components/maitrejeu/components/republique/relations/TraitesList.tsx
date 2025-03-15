
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, CalendarDays, ScrollText } from 'lucide-react';
import { Traite } from './types';
import { TraiteModal } from './modals/TraiteModal';

interface TraitesListProps {
  traites: Traite[];
  isEditable: boolean;
}

export const TraitesList: React.FC<TraitesListProps> = ({ traites, isEditable }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTraite, setSelectedTraite] = useState<Traite | null>(null);
  
  const handleAddTraite = () => {
    setSelectedTraite(null);
    setIsModalOpen(true);
  };
  
  const handleEditTraite = (traite: Traite) => {
    setSelectedTraite(traite);
    setIsModalOpen(true);
  };
  
  const handleDeleteTraite = (traiteId: string) => {
    console.log('Deleting traite:', traiteId);
    // Implement deletion logic
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Actif</Badge>;
      case 'expired':
        return <Badge className="bg-gray-100 text-gray-800">Expiré</Badge>;
      case 'violated':
        return <Badge className="bg-red-100 text-red-800">Violé</Badge>;
      case 'canceled':
        return <Badge className="bg-amber-100 text-amber-800">Annulé</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'peace':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700">Paix</Badge>;
      case 'trade':
        return <Badge variant="outline" className="bg-green-50 text-green-700">Commerce</Badge>;
      case 'military':
        return <Badge variant="outline" className="bg-red-50 text-red-700">Militaire</Badge>;
      case 'tribute':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700">Tribut</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };
  
  return (
    <div className="space-y-4">
      {isEditable && (
        <div className="flex justify-end mb-4">
          <Button onClick={handleAddTraite} className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Ajouter un traité
          </Button>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {traites.map((traite) => (
          <Card key={traite.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{traite.title}</CardTitle>
                {getStatusBadge(traite.status)}
              </div>
              <CardDescription className="flex flex-wrap gap-2 items-center mt-1">
                <div className="flex items-center gap-1">
                  <CalendarDays className="h-3 w-3" /> {traite.dateSignature}
                </div>
                {getTypeBadge(traite.type)}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pb-4">
              <div className="space-y-3">
                <div className="text-sm">{traite.description}</div>
                
                <div>
                  <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                    <ScrollText className="h-3 w-3" /> Parties signataires:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {traite.parties.map((party, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-50">
                        {party}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {isEditable && (
                  <div className="flex justify-end gap-2 mt-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditTraite(traite)}>
                      <Edit className="h-3 w-3 mr-1" /> Éditer
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600" onClick={() => handleDeleteTraite(traite.id)}>
                      <Trash2 className="h-3 w-3 mr-1" /> Supprimer
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {traites.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>Aucun traité trouvé</p>
        </div>
      )}
      
      <TraiteModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        traite={selectedTraite} 
      />
    </div>
  );
};
