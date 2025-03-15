
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Resource, ResourceType } from '../data/types';
import { Search, Plus, Filter, ArrowUpDown } from 'lucide-react';

interface ResourcesListProps {
  resources: Resource[];
  resourceTypes: ResourceType[];
}

export const ResourcesList: React.FC<ResourcesListProps> = ({ resources, resourceTypes }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  // Extraire toutes les catégories uniques
  const allCategories = Array.from(
    new Set(resources.map(resource => resource.category))
  );
  
  // Filtrer les ressources
  const filteredResources = resources.filter(resource => {
    // Filtre de recherche
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtre de catégorie
    const matchesCategory = categoryFilter === 'all' || resource.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <CardTitle>Ressources stockées</CardTitle>
          <Button size="sm" className="gap-1">
            <Plus className="h-4 w-4" />
            <span>Ajouter une ressource</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher une ressource..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-36 gap-1">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes</SelectItem>
                {allCategories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon" className="h-10 w-10">
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {filteredResources.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted/50">
                  <th className="text-left p-3 font-medium">Ressource</th>
                  <th className="text-left p-3 font-medium">Quantité</th>
                  <th className="text-left p-3 font-medium">Valeur</th>
                  <th className="text-left p-3 font-medium">Catégorie</th>
                  <th className="text-left p-3 font-medium">Emplacement</th>
                  <th className="text-left p-3 font-medium">Dernière MAJ</th>
                  <th className="text-right p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredResources.map(resource => (
                  <tr key={resource.id} className="border-b hover:bg-muted/20">
                    <td className="p-3 font-medium">{resource.name}</td>
                    <td className="p-3">{resource.quantity} {resource.unit}</td>
                    <td className="p-3">{resource.value.toLocaleString()} As</td>
                    <td className="p-3">{resource.category}</td>
                    <td className="p-3">{resource.location}</td>
                    <td className="p-3">{resource.lastUpdated}</td>
                    <td className="p-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">Modifier</Button>
                        <Button variant="outline" size="sm">Utiliser</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="font-medium bg-muted/30">
                  <td className="p-3">Total</td>
                  <td className="p-3"></td>
                  <td className="p-3">
                    {filteredResources.reduce((sum, r) => sum + r.value, 0).toLocaleString()} As
                  </td>
                  <td colSpan={4}></td>
                </tr>
              </tfoot>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            Aucune ressource trouvée avec les filtres actuels
          </div>
        )}
      </CardContent>
    </Card>
  );
};
