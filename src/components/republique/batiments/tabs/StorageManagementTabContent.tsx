
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { StatBox } from '@/components/ui-custom/StatBox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Warehouse, Package, Scale, ArrowUpRight, ArrowDownRight } from 'lucide-react';

// Données fictives - à remplacer par des données réelles
const storedResources = [
  { id: 1, name: 'Blé', amount: 12500, unit: 'modii', value: 250000, origin: 'Sicile', lastUpdate: '3 jours' },
  { id: 2, name: 'Huile d\'olive', amount: 5800, unit: 'amphorae', value: 174000, origin: 'Espagne', lastUpdate: '5 jours' },
  { id: 3, name: 'Vin', amount: 4200, unit: 'amphorae', value: 210000, origin: 'Gaule', lastUpdate: '1 jour' },
  { id: 4, name: 'Sel', amount: 3600, unit: 'livres', value: 36000, origin: 'Ostie', lastUpdate: '10 jours' },
  { id: 5, name: 'Marbre', amount: 850, unit: 'blocs', value: 425000, origin: 'Grèce', lastUpdate: '15 jours' },
  { id: 6, name: 'Bois', amount: 7300, unit: 'poutres', value: 146000, origin: 'Germanie', lastUpdate: '8 jours' },
];

const storageLocations = [
  { id: 1, name: 'Horrea Galbae', capacity: 30000, used: 18500, type: 'Céréales', status: 'Bon état' },
  { id: 2, name: 'Entrepôts d\'Ostie', capacity: 25000, used: 12300, type: 'Mixte', status: 'Excellent' },
  { id: 3, name: 'Caves du Capitole', capacity: 15000, used: 9800, type: 'Vin et Huile', status: 'Moyen' },
  { id: 4, name: 'Arsenaux de la République', capacity: 10000, used: 4200, type: 'Matériaux', status: 'Bon état' },
];

export const StorageManagementTabContent: React.FC = () => {
  const totalCapacity = storageLocations.reduce((sum, location) => sum + location.capacity, 0);
  const totalUsed = storageLocations.reduce((sum, location) => sum + location.used, 0);
  const usagePercentage = Math.round((totalUsed / totalCapacity) * 100);
  
  const totalValue = storedResources.reduce((sum, resource) => sum + resource.value, 0);
  
  const formatMoney = (amount: number) => {
    return `${amount.toLocaleString()} As`;
  };
  
  const getUsageColor = (percentage: number) => {
    if (percentage < 50) return 'bg-green-500';
    if (percentage < 75) return 'bg-yellow-500';
    if (percentage < 90) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <RomanCard>
      <RomanCard.Header>
        <div className="flex items-center gap-2">
          <Warehouse className="h-5 w-5 text-rome-navy" />
          <h2 className="font-cinzel text-lg">Gestion des Stockages</h2>
        </div>
      </RomanCard.Header>
      <RomanCard.Content>
        <p className="text-muted-foreground mb-6">
          Gérez les entrepôts et greniers publics ainsi que leur contenu.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatBox 
            title="Capacité totale"
            value={`${totalCapacity.toLocaleString()} unités`}
            description="Tous entrepôts confondus"
            icon={<Warehouse className="h-5 w-5" />}
          />
          <StatBox 
            title="Espace utilisé"
            value={`${totalUsed.toLocaleString()} unités`}
            description={`${usagePercentage}% de la capacité totale`}
            icon={<Package className="h-5 w-5" />}
          />
          <StatBox 
            title="Valeur des marchandises"
            value={formatMoney(totalValue)}
            description="Valeur marchande estimée"
            icon={<Scale className="h-5 w-5" />}
            trend="up"
            trendValue="+8%"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-3">Lieux de stockage</h3>
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Entrepôt</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Capacité</TableHead>
                    <TableHead>Utilisation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {storageLocations.map((location) => {
                    const usagePercent = Math.round((location.used / location.capacity) * 100);
                    
                    return (
                      <TableRow key={location.id}>
                        <TableCell className="font-medium">{location.name}</TableCell>
                        <TableCell>{location.type}</TableCell>
                        <TableCell>{location.capacity.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span>{location.used.toLocaleString()}</span>
                              <span>{usagePercent}%</span>
                            </div>
                            <Progress 
                              value={usagePercent} 
                              className={`h-2 ${getUsageColor(usagePercent)}`}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Marchandises stockées</h3>
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Marchandise</TableHead>
                    <TableHead>Quantité</TableHead>
                    <TableHead>Valeur</TableHead>
                    <TableHead>Tendance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {storedResources.map((resource) => {
                    // Générer aléatoirement une tendance
                    const trends = [
                      { value: 'up', icon: <ArrowUpRight className="h-3 w-3 text-green-500" />, label: 'Hausse' },
                      { value: 'down', icon: <ArrowDownRight className="h-3 w-3 text-rose-500" />, label: 'Baisse' },
                      { value: 'stable', icon: null, label: 'Stable' }
                    ];
                    const trend = trends[Math.floor(Math.random() * trends.length)];
                    
                    return (
                      <TableRow key={resource.id}>
                        <TableCell className="font-medium">
                          <div className="flex flex-col">
                            {resource.name}
                            <span className="text-xs text-muted-foreground">{resource.origin}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {resource.amount.toLocaleString()} {resource.unit}
                        </TableCell>
                        <TableCell>{formatMoney(resource.value)}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={`flex items-center gap-1 ${trend.value === 'up' ? 'text-green-600 border-green-300' : 
                                      trend.value === 'down' ? 'text-rose-600 border-rose-300' : 'text-slate-600 border-slate-300'}`}
                          >
                            {trend.icon}
                            {trend.label}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </RomanCard.Content>
    </RomanCard>
  );
};
