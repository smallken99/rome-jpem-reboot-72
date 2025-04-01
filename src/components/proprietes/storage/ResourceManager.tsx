
import React, { useState } from 'react';
import { Resource, ResourceType } from '../types/resourceTypes';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Package, Plus, FileText, TrendingUp, Search, Filter, Edit, Trash2, ArrowLeftRight } from 'lucide-react';
import { StorageStats } from './StorageStats';
import { formatCurrency } from '@/utils/formatters';

interface ResourceManagerProps {
  resources: Resource[];
  storageCapacity: number;
  onAddResource?: (resource: Omit<Resource, 'id'>) => void;
  onUpdateResource?: (id: string, updates: Partial<Resource>) => void;
  onDeleteResource?: (id: string) => void;
  onTransferResource?: (id: string, quantity: number, destination: string) => void;
}

export const ResourceManager: React.FC<ResourceManagerProps> = ({
  resources,
  storageCapacity,
  onAddResource,
  onUpdateResource,
  onDeleteResource,
  onTransferResource
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isTransferDialogOpen, setIsTransferDialogOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  
  // État du formulaire d'ajout/modification
  const [formData, setFormData] = useState<Omit<Resource, 'id'>>({
    name: '',
    type: ResourceType.OTHER,
    quantity: 0,
    unit: 'unité',
    value: 0,
    description: ''
  });
  
  // État du formulaire de transfert
  const [transferData, setTransferData] = useState({
    quantity: 0,
    destination: ''
  });
  
  // Calculer les statistiques
  const usedCapacity = resources.reduce((total, resource) => total + resource.quantity, 0);
  const totalValue = resources.reduce((total, resource) => total + (resource.value * resource.quantity), 0);
  
  // Filtrer les ressources
  const filteredResources = resources.filter(resource => {
    if (searchTerm && !resource.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    if (typeFilter !== 'all' && resource.type !== typeFilter) {
      return false;
    }
    
    return true;
  });
  
  // Trier les ressources
  const sortedResources = [...filteredResources].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'quantity':
        return b.quantity - a.quantity;
      case 'value':
        return (b.value * b.quantity) - (a.value * a.quantity);
      case 'type':
        return String(a.type).localeCompare(String(b.type));
      default:
        return 0;
    }
  });
  
  // Ouvrir le dialogue d'ajout
  const handleOpenAddDialog = () => {
    setFormData({
      name: '',
      type: ResourceType.OTHER,
      quantity: 0,
      unit: 'unité',
      value: 0,
      description: ''
    });
    setIsAddDialogOpen(true);
  };
  
  // Ouvrir le dialogue de modification
  const handleOpenEditDialog = (resource: Resource) => {
    setSelectedResource(resource);
    setFormData({
      name: resource.name,
      type: resource.type as ResourceType,
      quantity: resource.quantity,
      unit: resource.unit,
      value: resource.value,
      description: resource.description || ''
    });
    setIsEditDialogOpen(true);
  };
  
  // Ouvrir le dialogue de transfert
  const handleOpenTransferDialog = (resource: Resource) => {
    setSelectedResource(resource);
    setTransferData({
      quantity: Math.min(10, resource.quantity),
      destination: ''
    });
    setIsTransferDialogOpen(true);
  };
  
  // Soumettre le formulaire d'ajout
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAddResource) {
      onAddResource(formData);
      setIsAddDialogOpen(false);
    }
  };
  
  // Soumettre le formulaire de modification
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateResource && selectedResource) {
      onUpdateResource(selectedResource.id, formData);
      setIsEditDialogOpen(false);
    }
  };
  
  // Soumettre le formulaire de transfert
  const handleTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onTransferResource && selectedResource) {
      onTransferResource(
        selectedResource.id, 
        transferData.quantity, 
        transferData.destination
      );
      setIsTransferDialogOpen(false);
    }
  };
  
  // Supprimer une ressource
  const handleDelete = (id: string) => {
    if (onDeleteResource && window.confirm('Êtes-vous sûr de vouloir supprimer cette ressource ?')) {
      onDeleteResource(id);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Package className="h-6 w-6" />
            Gestion des Ressources
          </h2>
          <p className="text-muted-foreground mt-1">
            Gérez les ressources stockées dans vos entrepôts
          </p>
        </div>
        
        {onAddResource && (
          <Button onClick={handleOpenAddDialog} className="h-10">
            <Plus className="mr-2 h-4 w-4" />
            Ajouter une ressource
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Inventaire des ressources
                </CardTitle>
                
                <div className="flex gap-2">
                  <div className="relative w-full md:w-auto">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full md:w-64 pl-8"
                    />
                  </div>
                  
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Filtrer par type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les types</SelectItem>
                      {Object.values(ResourceType).map((type) => (
                        <SelectItem key={type} value={type}>
                          {type.replace('_', ' ')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Trier par" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Nom</SelectItem>
                      <SelectItem value="quantity">Quantité</SelectItem>
                      <SelectItem value="value">Valeur</SelectItem>
                      <SelectItem value="type">Type</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Quantité</TableHead>
                    <TableHead>Valeur unitaire</TableHead>
                    <TableHead>Valeur totale</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedResources.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        Aucune ressource trouvée
                      </TableCell>
                    </TableRow>
                  ) : (
                    sortedResources.map((resource) => (
                      <TableRow key={resource.id}>
                        <TableCell className="font-medium">{resource.name}</TableCell>
                        <TableCell className="capitalize">
                          {String(resource.type).replace('_', ' ').toLowerCase()}
                        </TableCell>
                        <TableCell>{resource.quantity} {resource.unit}</TableCell>
                        <TableCell>{formatCurrency(resource.value)}</TableCell>
                        <TableCell>{formatCurrency(resource.value * resource.quantity)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {onUpdateResource && (
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleOpenEditDialog(resource)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            )}
                            
                            {onTransferResource && (
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleOpenTransferDialog(resource)}
                              >
                                <ArrowLeftRight className="h-4 w-4" />
                              </Button>
                            )}
                            
                            {onDeleteResource && (
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleDelete(resource.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <StorageStats 
            totalCapacity={storageCapacity}
            usedCapacity={usedCapacity}
            resourceCount={resources.length}
            totalValue={totalValue}
          />
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Analyse des ressources
              </CardTitle>
              <CardDescription>
                Répartition de vos ressources par type
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Ici vous pourriez ajouter un graphique pour afficher la répartition */}
              <div className="space-y-3">
                {Object.values(ResourceType).map(type => {
                  const resourcesOfType = resources.filter(r => r.type === type);
                  const typeTotal = resourcesOfType.reduce((sum, r) => sum + (r.value * r.quantity), 0);
                  const typePercentage = resources.length > 0 ? (resourcesOfType.length / resources.length) * 100 : 0;
                  
                  return (
                    <div key={type} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="capitalize">{type.replace('_', ' ').toLowerCase()}</span>
                        <span>{resourcesOfType.length} ({Math.round(typePercentage)}%)</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary" 
                          style={{ width: `${typePercentage}%` }}
                        />
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Valeur: {formatCurrency(typeTotal)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Dialog d'ajout de ressource */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ajouter une ressource</DialogTitle>
            <DialogDescription>
              Ajoutez une ressource à votre inventaire
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleAddSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nom
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select
                  value={formData.type.toString()}
                  onValueChange={(value) => setFormData({ ...formData, type: value as ResourceType })}
                >
                  <SelectTrigger id="type" className="col-span-3">
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(ResourceType).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type.replace('_', ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">
                  Quantité
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  min={0}
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                  required
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="unit" className="text-right">
                  Unité
                </Label>
                <Input
                  id="unit"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  required
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="value" className="text-right">
                  Valeur unitaire
                </Label>
                <Input
                  id="value"
                  type="number"
                  min={0}
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                  required
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="submit">Ajouter</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Dialog de modification de ressource */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modifier une ressource</DialogTitle>
            <DialogDescription>
              Modifiez les détails de la ressource
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleEditSubmit}>
            <div className="grid gap-4 py-4">
              {/* Mêmes champs que pour l'ajout */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Nom
                </Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-type" className="text-right">
                  Type
                </Label>
                <Select
                  value={formData.type.toString()}
                  onValueChange={(value) => setFormData({ ...formData, type: value as ResourceType })}
                >
                  <SelectTrigger id="edit-type" className="col-span-3">
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(ResourceType).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type.replace('_', ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-quantity" className="text-right">
                  Quantité
                </Label>
                <Input
                  id="edit-quantity"
                  type="number"
                  min={0}
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                  required
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-unit" className="text-right">
                  Unité
                </Label>
                <Input
                  id="edit-unit"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  required
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-value" className="text-right">
                  Valeur unitaire
                </Label>
                <Input
                  id="edit-value"
                  type="number"
                  min={0}
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                  required
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">
                  Description
                </Label>
                <Input
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="submit">Enregistrer</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Dialog de transfert de ressource */}
      <Dialog open={isTransferDialogOpen} onOpenChange={setIsTransferDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transfert de ressource</DialogTitle>
            <DialogDescription>
              Transférer {selectedResource?.name} vers un autre emplacement
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleTransferSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="transfer-quantity" className="text-right">
                  Quantité
                </Label>
                <Input
                  id="transfer-quantity"
                  type="number"
                  min={1}
                  max={selectedResource?.quantity || 0}
                  value={transferData.quantity}
                  onChange={(e) => setTransferData({ ...transferData, quantity: Number(e.target.value) })}
                  required
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="transfer-destination" className="text-right">
                  Destination
                </Label>
                <Input
                  id="transfer-destination"
                  value={transferData.destination}
                  onChange={(e) => setTransferData({ ...transferData, destination: e.target.value })}
                  required
                  className="col-span-3"
                  placeholder="Entrepôt ou destination"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="submit">Transférer</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
