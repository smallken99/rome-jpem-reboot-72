
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatMoney } from '@/utils/formatUtils';
import { toast } from 'sonner';
import { ArrowLeft, Building, Coins, Scroll, User } from 'lucide-react';

// Sample data for an heir
const heirData = {
  "heir1": { id: "heir1", name: "Marcus Tullius", role: "Fils aîné", gender: "male", age: 18 },
  "heir2": { id: "heir2", name: "Lucius Tullius", role: "Fils cadet", gender: "male", age: 16 },
  "heir3": { id: "heir3", name: "Gnaeus Tullius", role: "Neveu", gender: "male", age: 22 },
};

// Sample data for estate distribution
const estateItems = [
  { id: '1', name: 'Villa Tusculana', type: 'propriété', value: 120000, assigned: false },
  { id: '2', name: 'Terres agricoles en Campanie', type: 'propriété', value: 85000, assigned: false },
  { id: '3', name: 'Domus sur le Palatin', type: 'propriété', value: 200000, assigned: false },
  { id: '4', name: 'Revenus commerciaux', type: 'actif', value: 30000, assigned: false },
  { id: '5', name: 'Esclaves domestiques', type: 'autre', value: 45000, assigned: false },
];

interface InheritanceDetailsProps {
  heirId: string;
}

export const InheritanceDetails: React.FC<InheritanceDetailsProps> = ({ heirId }) => {
  const navigate = useNavigate();
  const [heir, setHeir] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('properties');
  const [assignedItems, setAssignedItems] = useState<string[]>([]);
  
  // Load heir data
  useEffect(() => {
    const foundHeir = heirData[heirId as keyof typeof heirData];
    if (foundHeir) {
      setHeir(foundHeir);
    } else {
      toast.error("Héritier non trouvé");
      navigate('/famille/heritage');
    }
  }, [heirId, navigate]);
  
  const toggleAssignment = (itemId: string) => {
    setAssignedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId) 
        : [...prev, itemId]
    );
  };
  
  const handleSaveInheritance = () => {
    if (assignedItems.length === 0) {
      toast.error("Vous devez assigner au moins un élément à l'héritier");
      return;
    }
    
    const totalValue = estateItems
      .filter(item => assignedItems.includes(item.id))
      .reduce((sum, item) => sum + item.value, 0);
    
    toast.success(`Succession configurée pour ${heir?.name} avec des biens d'une valeur de ${formatMoney(totalValue)}`);
    navigate('/famille/heritage');
  };
  
  if (!heir) {
    return (
      <div className="p-4 text-center">
        <p>Chargement des informations...</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <Button 
        variant="outline" 
        className="flex items-center gap-2" 
        onClick={() => navigate('/famille/heritage')}
      >
        <ArrowLeft className="h-4 w-4" />
        Retour à la liste des héritiers
      </Button>
      
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-500" />
                Détails de l'Héritier - {heir.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {heir.role}, {heir.age} ans
              </p>
            </div>
            <Button onClick={handleSaveInheritance}>Confirmer la Succession</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full mb-4">
              <TabsTrigger value="properties" className="flex-1">
                <Building className="h-4 w-4 mr-2" />
                Propriétés
              </TabsTrigger>
              <TabsTrigger value="money" className="flex-1">
                <Coins className="h-4 w-4 mr-2" />
                Finances
              </TabsTrigger>
              <TabsTrigger value="titles" className="flex-1">
                <Scroll className="h-4 w-4 mr-2" />
                Titres et Positions
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="properties">
              <div className="space-y-4">
                <p className="text-sm">
                  Sélectionnez les propriétés et biens qui seront transmis à {heir.name} lors de votre succession.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {estateItems.map(item => (
                    <div 
                      key={item.id}
                      className={`p-3 border rounded-md cursor-pointer transition-all ${
                        assignedItems.includes(item.id) 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => toggleAssignment(item.id)}
                    >
                      <div className="flex justify-between">
                        <div className="font-medium">{item.name}</div>
                        <div>{formatMoney(item.value)}</div>
                      </div>
                      <div className="text-sm text-muted-foreground capitalize">{item.type}</div>
                    </div>
                  ))}
                </div>
                
                <div className="p-3 bg-blue-50 text-blue-800 rounded-md mt-4">
                  <div className="font-medium">Valeur totale des biens assignés:</div>
                  <div className="text-xl">
                    {formatMoney(
                      estateItems
                        .filter(item => assignedItems.includes(item.id))
                        .reduce((sum, item) => sum + item.value, 0)
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="money">
              <div className="space-y-4">
                <p className="text-sm">
                  Configurez les aspects financiers de la succession, comme les rentes et les dotations.
                </p>
                
                <div className="bg-muted p-4 text-center rounded-md">
                  Fonctionnalité à venir dans une prochaine mise à jour.
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="titles">
              <div className="space-y-4">
                <p className="text-sm">
                  Définissez quels titres, positions et responsabilités seront transmis à votre héritier.
                </p>
                
                <div className="bg-muted p-4 text-center rounded-md">
                  Fonctionnalité à venir dans une prochaine mise à jour.
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
