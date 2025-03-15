
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Users, CalendarDays, Shield } from 'lucide-react';
import { Alliance } from './types';
import { AllianceModal } from './modals/AllianceModal';

interface AlliancesMilitairesProps {
  alliances: Alliance[];
  isEditable: boolean;
}

export const AlliancesMilitaires: React.FC<AlliancesMilitairesProps> = ({ 
  alliances, 
  isEditable 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAlliance, setSelectedAlliance] = useState<Alliance | null>(null);
  
  const handleAddAlliance = () => {
    setSelectedAlliance(null);
    setIsModalOpen(true);
  };
  
  const handleEditAlliance = (alliance: Alliance) => {
    setSelectedAlliance(alliance);
    setIsModalOpen(true);
  };
  
  const handleDeleteAlliance = (allianceId: string) => {
    console.log('Deleting alliance:', allianceId);
    // Implement deletion logic
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'expired':
        return <Badge className="bg-gray-100 text-gray-800">Expirée</Badge>;
      case 'dissolved':
        return <Badge className="bg-red-100 text-red-800">Dissoute</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'defensive':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700">Défensive</Badge>;
      case 'offensive':
        return <Badge variant="outline" className="bg-red-50 text-red-700">Offensive</Badge>;
      case 'full':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700">Complète</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };
  
  return (
    <div className="space-y-4">
      {isEditable && (
        <div className="flex justify-end mb-4">
          <Button onClick={handleAddAlliance} className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Ajouter une alliance
          </Button>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {alliances.map((alliance) => (
          <Card key={alliance.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{alliance.name}</CardTitle>
                {getStatusBadge(alliance.status)}
              </div>
              <CardDescription className="flex flex-wrap gap-2 items-center mt-1">
                <div className="flex items-center gap-1">
                  <CalendarDays className="h-3 w-3" /> {alliance.dateCreation}
                </div>
                {getTypeBadge(alliance.type)}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pb-4">
              <div className="space-y-3">
                <div className="text-sm">{alliance.description}</div>
                
                <div>
                  <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                    <Users className="h-3 w-3" /> Membres:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {alliance.members.map((member, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-50">
                        {member}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-1 text-xs">
                  <Shield className="h-3 w-3 text-muted-foreground" />
                  <span className="text-muted-foreground">Force militaire:</span>
                  <span className="font-medium">{alliance.militarySupport.toLocaleString()} combattants</span>
                </div>
                
                {isEditable && (
                  <div className="flex justify-end gap-2 mt-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditAlliance(alliance)}>
                      <Edit className="h-3 w-3 mr-1" /> Éditer
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600" onClick={() => handleDeleteAlliance(alliance.id)}>
                      <Trash2 className="h-3 w-3 mr-1" /> Supprimer
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {alliances.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p>Aucune alliance trouvée</p>
        </div>
      )}
      
      <AllianceModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        alliance={selectedAlliance} 
      />
    </div>
  );
};
