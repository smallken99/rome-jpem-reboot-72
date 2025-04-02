
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useStorageInventory } from '../hooks/useStorageInventory';
import { ResourceItem } from '../types/resource';
import ResourceList from './ResourceList';
import StorageStats from './StorageStats';
import ResourceAddDialog from './ResourceAddDialog';

const ResourceManager: React.FC = () => {
  const [isAddResourceDialogOpen, setIsAddResourceDialogOpen] = useState(false);
  const { resources, stats, addResource, removeResource, updateResource } = useStorageInventory();
  
  const handleAddResource = (resource: Omit<ResourceItem, 'id'>) => {
    addResource(resource);
    setIsAddResourceDialogOpen(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestion des Ressources</h2>
        <Button onClick={() => setIsAddResourceDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une ressource
        </Button>
      </div>
      
      <StorageStats stats={stats} />
      
      <Card>
        <CardHeader>
          <CardTitle>Inventaire des Ressources</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">Toutes</TabsTrigger>
              <TabsTrigger value="food">Nourriture</TabsTrigger>
              <TabsTrigger value="materials">Matériaux</TabsTrigger>
              <TabsTrigger value="luxury">Luxe</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <ResourceList 
                resources={resources} 
                onDelete={removeResource} 
                onUpdate={updateResource}
              />
            </TabsContent>
            
            <TabsContent value="food">
              <ResourceList 
                resources={resources.filter(r => r.category === 'food')} 
                onDelete={removeResource} 
                onUpdate={updateResource}
              />
            </TabsContent>
            
            <TabsContent value="materials">
              <ResourceList 
                resources={resources.filter(r => r.category === 'material')} 
                onDelete={removeResource} 
                onUpdate={updateResource}
              />
            </TabsContent>
            
            <TabsContent value="luxury">
              <ResourceList 
                resources={resources.filter(r => r.category === 'luxury')} 
                onDelete={removeResource} 
                onUpdate={updateResource}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <ResourceAddDialog 
        open={isAddResourceDialogOpen}
        onOpenChange={setIsAddResourceDialogOpen}
        onAddResource={handleAddResource}
      />
    </div>
  );
};

export default ResourceManager;
