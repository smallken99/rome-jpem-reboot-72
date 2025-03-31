
import React, { useState } from 'react';
import { useMaitreJeu } from '../../context/MaitreJeuContext';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Edit, Trash, Search, Plus } from 'lucide-react';
import { GestionContainer } from './GestionContainer';
import { Province } from '../../types/provinces';
import { formatGameDate } from '../../types/common';

export const GestionProvincesModule: React.FC = () => {
  const { provinces, updateProvince } = useMaitreJeu();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  
  // Filtrer les provinces en fonction du terme de recherche
  const filteredProvinces = provinces.filter(province => {
    const nom = province.nom || province.name || '';
    const gouverneur = province.gouverneur || province.governor || '';
    
    return (
      nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gouverneur.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  
  // Filtrer les provinces en fonction de l'onglet actif
  const provincesByTab = (tab: string) => {
    switch (tab) {
      case 'pacifiees':
        return filteredProvinces.filter(p => p.status === 'Pacifiée' || p.status === 'Pacified');
      case 'troublees':
        return filteredProvinces.filter(p => p.status === 'Troublée' || p.status === 'Troubled');
      case 'rebelles':
        return filteredProvinces.filter(p => p.status === 'Rebelle' || p.status === 'Rebellious');
      default:
        return filteredProvinces;
    }
  };
  
  const handleAddProvince = () => {
    setSelectedProvince(null);
    setShowForm(true);
  };
  
  const handleEditProvince = (province: Province) => {
    setSelectedProvince(province);
    setShowForm(true);
  };
  
  const handleSelectProvince = (province: Province) => {
    setSelectedProvince(province);
  };
  
  // Function to render the province card
  const ProvinceCard = ({ province }: { province: Province }) => (
    <Card 
      className={`mb-4 cursor-pointer hover:bg-accent/10 ${
        selectedProvince?.id === province.id ? 'border-primary' : ''
      }`}
      onClick={() => handleSelectProvince(province)}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold flex items-center">
              <MapPin className="h-4 w-4 mr-1 inline-block" />
              {province.nom || province.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              Gouverneur: {province.gouverneur || province.governor || 'Non assigné'}
            </p>
            <p className="text-sm mt-1">
              Status: <span className={`font-medium ${
                (province.status === 'Pacifiée' || province.status === 'Pacified') ? 'text-green-600' :
                (province.status === 'Troublée' || province.status === 'Troubled') ? 'text-amber-600' :
                'text-red-600'
              }`}>{province.status}</span>
            </p>
            <p className="text-sm">
              Population: {province.population?.toLocaleString() || 'Inconnue'}
            </p>
            <p className="text-sm">
              Revenu annuel: {province.revenue?.toLocaleString() || 'Inconnu'} as
            </p>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleEditProvince(province);
              }}
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
  
  return (
    <GestionContainer
      title="Gestion des Provinces"
      description="Administrez les territoires de la République Romaine"
      onAddNew={handleAddProvince}
      addButtonLabel="Ajouter une province"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1">
          <div className="mb-4 flex items-center">
            <Search className="h-4 w-4 mr-2 text-muted-foreground" />
            <Input
              placeholder="Rechercher une province..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="all">Toutes</TabsTrigger>
              <TabsTrigger value="pacifiees">Pacifiées</TabsTrigger>
              <TabsTrigger value="troublees">Troublées</TabsTrigger>
              <TabsTrigger value="rebelles">Rebelles</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {provincesByTab(activeTab).length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Aucune province trouvée
            </div>
          ) : (
            <div className="space-y-2 max-h-[calc(100vh-16rem)] overflow-y-auto pr-2">
              {provincesByTab(activeTab).map(province => (
                <ProvinceCard key={province.id} province={province} />
              ))}
            </div>
          )}
        </div>
        
        <div className="col-span-2">
          {selectedProvince ? (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  {selectedProvince.nom || selectedProvince.name}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold mb-2">Informations générales</h3>
                    <p className="text-sm mb-1">
                      <span className="font-medium">Gouverneur:</span> {selectedProvince.gouverneur || selectedProvince.governor || 'Non assigné'}
                    </p>
                    <p className="text-sm mb-1">
                      <span className="font-medium">Population:</span> {selectedProvince.population?.toLocaleString() || 'Inconnue'}
                    </p>
                    <p className="text-sm mb-1">
                      <span className="font-medium">Statut:</span> {selectedProvince.status}
                    </p>
                    <p className="text-sm mb-1">
                      <span className="font-medium">Région:</span> {selectedProvince.region || 'Non spécifiée'}
                    </p>
                    <p className="text-sm mb-1">
                      <span className="font-medium">Conquise en:</span> {selectedProvince.conqueredDate 
                        ? formatGameDate(selectedProvince.conqueredDate)
                        : 'Date inconnue'
                      }
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">Économie</h3>
                    <p className="text-sm mb-1">
                      <span className="font-medium">Revenu annuel:</span> {selectedProvince.revenue?.toLocaleString() || '0'} as
                    </p>
                    <p className="text-sm mb-1">
                      <span className="font-medium">Taux d'imposition:</span> {selectedProvince.taxRate || '5'}%
                    </p>
                    <p className="text-sm mb-1">
                      <span className="font-medium">Ressources principales:</span> {selectedProvince.ressources?.join(', ') || 'Aucune'}
                    </p>
                    <p className="text-sm mb-1">
                      <span className="font-medium">Garnison:</span> {selectedProvince.garrison?.toLocaleString() || '0'} soldats
                    </p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Stabilité</h3>
                  <div className="flex flex-wrap gap-3">
                    <div className="bg-accent/30 rounded px-3 py-1 text-sm">
                      Loyauté: {selectedProvince.loyalty || '50'}/100
                    </div>
                    <div className="bg-accent/30 rounded px-3 py-1 text-sm">
                      Dissidence: {selectedProvince.unrest || '0'}/100
                    </div>
                    <div className="bg-accent/30 rounded px-3 py-1 text-sm">
                      Romanisation: {selectedProvince.romanization || '0'}/100
                    </div>
                    <div className="bg-accent/30 rounded px-3 py-1 text-sm">
                      Prospérité: {selectedProvince.prosperity || '50'}/100
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedProvince.description || 'Aucune description disponible.'}
                  </p>
                </div>
                
                <div className="flex justify-end mt-6 space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => handleEditProvince(selectedProvince)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Modifier
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center p-8">
                <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">Aucune province sélectionnée</h3>
                <p className="text-muted-foreground mt-1">
                  Sélectionnez une province dans la liste ou ajoutez-en une nouvelle
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={handleAddProvince}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Nouvelle province
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </GestionContainer>
  );
};
