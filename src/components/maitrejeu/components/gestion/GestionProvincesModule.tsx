
import React, { useState } from 'react';
import { useMaitreJeu } from '../../context';
import { GestionContainer } from './GestionContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Edit, Trash, Star, Shield, Coins, Users, Flag, History, Map, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Province } from '../../types/province';
import { toast } from 'sonner';
import { GameDate } from '../../types/common';

export const GestionProvincesModule: React.FC = () => {
  const { provinces } = useMaitreJeu();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProvinces = provinces.filter(province => 
    province.nom.toLowerCase().includes(searchTerm.toLowerCase()) || 
    province.gouverneur?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProvince = () => {
    setSelectedProvince(null);
    setIsModalOpen(true);
  };

  const handleEditProvince = (province: Province) => {
    setSelectedProvince(province);
    setIsModalOpen(true);
  };

  const handleDeleteProvince = (provinceId: string) => {
    // Implémenter la suppression
    toast.success("Province supprimée avec succès");
  };

  // Fonction format de la date de conquête
  const formatConquestDate = (date?: GameDate) => {
    if (!date) return "Inconnue";
    return `${date.year} (${date.season})`;
  };

  // Fonction pour obtenir la couleur du statut
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pacifiée':
        return 'bg-green-100 text-green-800';
      case 'instable':
        return 'bg-amber-100 text-amber-800';
      case 'rebelle':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <GestionContainer
      title="Gestion des Provinces"
      description="Administrez les provinces de la République"
      onAddNew={handleAddProvince}
      addButtonLabel="Ajouter une province"
    >
      <div className="space-y-6">
        {/* Barre de recherche */}
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une province..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>

        {/* Liste des provinces */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProvinces.map(province => (
            <Card key={province.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{province.nom}</CardTitle>
                  <Badge className={getStatusColor(province.status || province.statut)}>
                    {province.status || province.statut}
                  </Badge>
                </div>
                <CardDescription>
                  {province.gouverneur ? `Gouvernée par ${province.gouverneur}` : "Sans gouverneur"}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground flex items-center">
                      <Map className="h-4 w-4 mr-1" />
                      Région:
                    </span>
                    <span className="font-medium">{province.région}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      Population:
                    </span>
                    <span className="font-medium">{province.population.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground flex items-center">
                      <Coins className="h-4 w-4 mr-1" />
                      Richesse:
                    </span>
                    <span className="font-medium">{province.richesse.toLocaleString()} As</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground flex items-center">
                      <History className="h-4 w-4 mr-1" />
                      Conquête:
                    </span>
                    <span className="font-medium">{formatConquestDate(province.dateConquete)}</span>
                  </div>
                </div>
              </CardContent>
              <div className="px-6 pt-0 pb-3">
                <div className="flex flex-wrap gap-1 mb-3">
                  {province.ressources.map((ressource, index) => (
                    <Badge key={index} variant="outline">{ressource}</Badge>
                  ))}
                </div>
                
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground text-center">Impôts</div>
                    <div className="text-center text-sm font-medium">
                      {province.tauxImposition ? `${province.tauxImposition}%` : 'N/A'}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground text-center">Garnison</div>
                    <div className="text-center text-sm font-medium">
                      {province.garnison || 'N/A'}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground text-center">Revenu</div>
                    <div className="text-center text-sm font-medium">
                      {province.revenuAnnuel.toLocaleString()}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground text-center">Mécontentement</div>
                    <div className="h-1.5 bg-gray-200 rounded">
                      <div 
                        className="h-full bg-red-500 rounded" 
                        style={{ width: `${province.mécontentement || 0}%` }}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground text-center">Romanisation</div>
                    <div className="h-1.5 bg-gray-200 rounded">
                      <div 
                        className="h-full bg-blue-500 rounded" 
                        style={{ width: `${province.romanisation || 0}%` }}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground text-center">Prospérité</div>
                    <div className="h-1.5 bg-gray-200 rounded">
                      <div 
                        className="h-full bg-green-500 rounded" 
                        style={{ width: `${province.prospérité || 0}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <CardFooter className="flex justify-between pt-0">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleEditProvince(province)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Éditer
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDeleteProvince(province.id)}
                >
                  <Trash className="h-4 w-4 mr-1" />
                  Supprimer
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {filteredProvinces.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aucune province ne correspond à votre recherche</p>
          </div>
        )}
      </div>
    </GestionContainer>
  );
};
