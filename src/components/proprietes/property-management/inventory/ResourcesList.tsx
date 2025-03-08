
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResourceItem } from './ResourceItem';
import { PropertyResource } from './data/types';

interface ResourcesListProps {
  resources: PropertyResource[];
  resourceTypes: string[];
  resourceTypeFilter: string;
  setResourceTypeFilter: (type: string) => void;
}

export const ResourcesList: React.FC<ResourcesListProps> = ({
  resources,
  resourceTypes,
  resourceTypeFilter,
  setResourceTypeFilter
}) => {
  const filteredResources = resourceTypeFilter === 'all' 
    ? resources 
    : resources.filter(resource => resource.type === resourceTypeFilter);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Ressources disponibles</CardTitle>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Filtrer par type:</span>
          <select 
            className="border border-input px-3 py-1 rounded text-sm"
            value={resourceTypeFilter}
            onChange={(e) => setResourceTypeFilter(e.target.value)}
          >
            <option value="all">Tous</option>
            {resourceTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">
          Gérez vos stocks de ressources, matières premières et marchandises.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredResources.length > 0 ? (
            filteredResources.map(resource => (
              <ResourceItem 
                key={resource.id}
                name={resource.name}
                type={resource.type}
                quantity={resource.quantity}
                unit={resource.unit}
                value={resource.value}
                trend={resource.trend}
                trendPercentage={resource.trendPercentage}
              />
            ))
          ) : (
            <div className="col-span-2 text-center p-8">
              <p className="text-muted-foreground">Aucune ressource trouvée</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
