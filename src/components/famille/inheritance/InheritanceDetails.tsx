
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInheritance } from './useInheritance';
import { usePatrimoine } from '@/hooks/usePatrimoine';
import { useBuildingManagement } from '@/components/proprietes/hooks/useBuildingManagement';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { formatCurrency } from '@/utils/currencyUtils';
import { ArrowLeft, Building, Coins, Scroll, User, Crown, Users } from 'lucide-react';
import { RomanCard } from '@/components/ui-custom/RomanCard';

interface InheritanceDetailsProps {
  heirId: string;
}

export const InheritanceDetails: React.FC<InheritanceDetailsProps> = ({ heirId }) => {
  const navigate = useNavigate();
  const { potentialHeirs, properties, selectedHeirId } = useInheritance();
  const { buildings } = useBuildingManagement();
  const { balance } = usePatrimoine();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [propertyInheritance, setPropertyInheritance] = useState<Record<string, number>>({});
  const [moneyDistribution, setMoneyDistribution] = useState<Record<string, number>>({});
  
  // Find the current heir
  const heir = potentialHeirs.find(h => h.id === heirId) || potentialHeirs.find(h => h.id === selectedHeirId);
  
  // Calculate total patrimony
  const totalPropertyValue = properties.reduce((sum, property) => sum + property.value, 0);
  const totalBuildingValue = buildings.reduce((sum, building) => sum + 10000, 0); // Simplified example
  const totalPatrimoine = balance + totalPropertyValue + totalBuildingValue;
  
  // Setup initial inheritance distributions when heir changes
  useEffect(() => {
    if (!heir) return;
    
    const otherHeirs = potentialHeirs.filter(h => h.id !== heir.id);
    
    // Default property distribution: main heir gets 75%
    const initialPropertyDistribution: Record<string, number> = {};
    initialPropertyDistribution[heir.id] = 75;
    
    // Distribute the remaining 25% among other heirs
    const restShare = otherHeirs.length > 0 ? 25 / otherHeirs.length : 0;
    otherHeirs.forEach(otherHeir => {
      initialPropertyDistribution[otherHeir.id] = restShare;
    });
    
    setPropertyInheritance(initialPropertyDistribution);
    
    // Similar distribution for money
    const initialMoneyDistribution: Record<string, number> = {};
    initialMoneyDistribution[heir.id] = 60;
    
    const moneyRestShare = otherHeirs.length > 0 ? 40 / otherHeirs.length : 0;
    otherHeirs.forEach(otherHeir => {
      initialMoneyDistribution[otherHeir.id] = moneyRestShare;
    });
    
    setMoneyDistribution(initialMoneyDistribution);
    
  }, [heir, potentialHeirs]);
  
  if (!heir) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl mb-4">Héritier non trouvé</h3>
        <Button onClick={() => navigate('/famille/heritage')}>
          Retourner à la gestion de l'héritage
        </Button>
      </div>
    );
  }
  
  // Handle property distribution change
  const handlePropertyDistributionChange = (heirId: string, newValue: number) => {
    // Update the selected heir's share
    const updatedDistribution = { ...propertyInheritance, [heirId]: newValue };
    
    // Calculate total of all shares
    const total = Object.values(updatedDistribution).reduce((sum, value) => sum + value, 0);
    
    // If total is not 100, adjust other heirs proportionally
    if (total !== 100) {
      const difference = 100 - total;
      const otherHeirs = Object.keys(updatedDistribution).filter(id => id !== heirId);
      
      if (otherHeirs.length > 0) {
        // Distribute the difference proportionally among other heirs
        const totalOtherShares = otherHeirs.reduce((sum, id) => sum + updatedDistribution[id], 0);
        
        if (totalOtherShares > 0) {
          otherHeirs.forEach(id => {
            const proportion = updatedDistribution[id] / totalOtherShares;
            updatedDistribution[id] += difference * proportion;
          });
        } else {
          // If other heirs have 0, distribute equally
          const equalShare = difference / otherHeirs.length;
          otherHeirs.forEach(id => {
            updatedDistribution[id] += equalShare;
          });
        }
      }
    }
    
    // Round values to 1 decimal place
    Object.keys(updatedDistribution).forEach(id => {
      updatedDistribution[id] = Math.round(updatedDistribution[id] * 10) / 10;
    });
    
    setPropertyInheritance(updatedDistribution);
  };
  
  // Handle money distribution change (similar logic)
  const handleMoneyDistributionChange = (heirId: string, newValue: number) => {
    // Similar implementation as property distribution
    const updatedDistribution = { ...moneyDistribution, [heirId]: newValue };
    const total = Object.values(updatedDistribution).reduce((sum, value) => sum + value, 0);
    
    if (total !== 100) {
      const difference = 100 - total;
      const otherHeirs = Object.keys(updatedDistribution).filter(id => id !== heirId);
      
      if (otherHeirs.length > 0) {
        const totalOtherShares = otherHeirs.reduce((sum, id) => sum + updatedDistribution[id], 0);
        
        if (totalOtherShares > 0) {
          otherHeirs.forEach(id => {
            const proportion = updatedDistribution[id] / totalOtherShares;
            updatedDistribution[id] += difference * proportion;
          });
        } else {
          const equalShare = difference / otherHeirs.length;
          otherHeirs.forEach(id => {
            updatedDistribution[id] += equalShare;
          });
        }
      }
    }
    
    Object.keys(updatedDistribution).forEach(id => {
      updatedDistribution[id] = Math.round(updatedDistribution[id] * 10) / 10;
    });
    
    setMoneyDistribution(updatedDistribution);
  };
  
  return (
    <div className="space-y-6">
      <Button 
        variant="outline" 
        onClick={() => navigate('/famille/heritage')}
        className="mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Retour
      </Button>
      
      <RomanCard>
        <RomanCard.Header>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
              <Crown className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <h2 className="text-2xl font-cinzel">{heir.prenom} {heir.nom}</h2>
              <p className="text-muted-foreground">{heir.role || "Membre de la famille"}, {heir.age} ans</p>
            </div>
          </div>
        </RomanCard.Header>
      </RomanCard>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Coins className="mr-2 h-5 w-5 text-rome-gold" />
              Valeur Totale
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalPatrimoine)}</div>
            <p className="text-sm text-muted-foreground mt-1">Patrimoine à répartir</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Building className="mr-2 h-5 w-5 text-emerald-600" />
              Propriétés
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{properties.length + buildings.length}</div>
            <p className="text-sm text-muted-foreground mt-1">Biens immobiliers</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Users className="mr-2 h-5 w-5 text-blue-600" />
              Héritiers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{potentialHeirs.length}</div>
            <p className="text-sm text-muted-foreground mt-1">Membres de la famille</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Aperçu</TabsTrigger>
          <TabsTrigger value="properties">Propriétés</TabsTrigger>
          <TabsTrigger value="finances">Finances</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Aperçu de la succession</CardTitle>
              <CardDescription>
                Répartition des biens entre les membres de la famille
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-cinzel mb-4">Héritier Principal</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-amber-50 p-4 border border-amber-200 rounded-md">
                      <div className="flex items-center gap-3 mb-3">
                        <User className="h-5 w-5 text-amber-600" />
                        <h4 className="font-medium">{heir.prenom} {heir.nom}</h4>
                      </div>
                      <p className="text-sm mb-3">
                        L'héritier principal recevra le nom de famille, les titres politiques et les responsabilités familiales.
                      </p>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm">
                            <span>Part des propriétés:</span>
                            <span className="font-medium">{propertyInheritance[heir.id] || 0}%</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm">
                            <span>Part des finances:</span>
                            <span className="font-medium">{moneyDistribution[heir.id] || 0}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 p-4 rounded-md">
                      <h4 className="font-medium mb-3">Valeur héritée estimée</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">Propriétés:</span>
                          <span className="font-medium">
                            {formatCurrency((totalPropertyValue + totalBuildingValue) * (propertyInheritance[heir.id] || 0) / 100)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Liquidités:</span>
                          <span className="font-medium">
                            {formatCurrency(balance * (moneyDistribution[heir.id] || 0) / 100)}
                          </span>
                        </div>
                        <div className="flex justify-between pt-2 border-t">
                          <span className="font-medium">Total:</span>
                          <span className="font-bold">
                            {formatCurrency(
                              (totalPropertyValue + totalBuildingValue) * (propertyInheritance[heir.id] || 0) / 100 +
                              balance * (moneyDistribution[heir.id] || 0) / 100
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-cinzel mb-4">Autres Héritiers</h3>
                  <div className="space-y-4">
                    {potentialHeirs
                      .filter(h => h.id !== heir.id)
                      .map(otherHeir => (
                        <div key={otherHeir.id} className="p-4 border border-gray-200 rounded-md">
                          <div className="flex justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <User className="h-5 w-5 text-gray-500" />
                              <h4 className="font-medium">{otherHeir.prenom} {otherHeir.nom}</h4>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {otherHeir.age} ans
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <div className="flex justify-between text-sm">
                                <span>Part des propriétés:</span>
                                <span className="font-medium">{propertyInheritance[otherHeir.id] || 0}%</span>
                              </div>
                              <div className="flex justify-between text-sm mt-1">
                                <span>Part des finances:</span>
                                <span className="font-medium">{moneyDistribution[otherHeir.id] || 0}%</span>
                              </div>
                            </div>
                            
                            <div>
                              <div className="flex justify-between text-sm">
                                <span>Valeur totale héritée:</span>
                                <span className="font-medium">
                                  {formatCurrency(
                                    (totalPropertyValue + totalBuildingValue) * (propertyInheritance[otherHeir.id] || 0) / 100 +
                                    balance * (moneyDistribution[otherHeir.id] || 0) / 100
                                  )}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="properties" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Distribution des Propriétés</CardTitle>
              <CardDescription>
                Ajustez la répartition des propriétés entre les héritiers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {potentialHeirs.map(currentHeir => (
                  <div key={currentHeir.id} className="p-4 border border-gray-200 rounded-md">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        currentHeir.id === heir.id ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {currentHeir.id === heir.id ? <Crown className="h-4 w-4" /> : <User className="h-4 w-4" />}
                      </div>
                      <div>
                        <h4 className="font-medium">{currentHeir.prenom} {currentHeir.nom}</h4>
                        <p className="text-sm text-muted-foreground">
                          {currentHeir.id === heir.id ? 'Héritier principal' : 'Héritier secondaire'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mb-2">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Pourcentage des propriétés:</span>
                        <span className="font-medium">{propertyInheritance[currentHeir.id] || 0}%</span>
                      </div>
                      
                      <Slider
                        value={[propertyInheritance[currentHeir.id] || 0]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={(value) => handlePropertyDistributionChange(currentHeir.id, value[0])}
                        className="my-4"
                      />
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span>Valeur estimée:</span>
                      <span className="font-medium">
                        {formatCurrency((totalPropertyValue + totalBuildingValue) * (propertyInheritance[currentHeir.id] || 0) / 100)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="finances" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Distribution des Finances</CardTitle>
              <CardDescription>
                Ajustez la répartition des liquidités entre les héritiers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <Coins className="h-5 w-5 text-blue-600" />
                  <h3 className="font-medium">Liquidités totales: {formatCurrency(balance)}</h3>
                </div>
                <p className="text-sm">
                  Ces fonds seront distribués selon les pourcentages définis ci-dessous.
                </p>
              </div>
              
              <div className="space-y-6">
                {potentialHeirs.map(currentHeir => (
                  <div key={currentHeir.id} className="p-4 border border-gray-200 rounded-md">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        currentHeir.id === heir.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                      }`}>
                        <User className="h-4 w-4" />
                      </div>
                      <h4 className="font-medium">{currentHeir.prenom} {currentHeir.nom}</h4>
                    </div>
                    
                    <div className="mb-2">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Pourcentage des finances:</span>
                        <span className="font-medium">{moneyDistribution[currentHeir.id] || 0}%</span>
                      </div>
                      
                      <Slider
                        value={[moneyDistribution[currentHeir.id] || 0]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={(value) => handleMoneyDistributionChange(currentHeir.id, value[0])}
                        className="my-4"
                      />
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span>Montant:</span>
                      <span className="font-medium">
                        {formatCurrency(balance * (moneyDistribution[currentHeir.id] || 0) / 100)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end gap-4">
        <Button variant="outline" onClick={() => navigate('/famille/heritage')}>
          Annuler
        </Button>
        <Button className="bg-rome-gold hover:bg-rome-gold/90">
          <Scroll className="h-4 w-4 mr-2" />
          Finaliser le testament
        </Button>
      </div>
    </div>
  );
};
