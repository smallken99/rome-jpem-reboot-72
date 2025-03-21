
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UnderDevelopmentSection } from '@/components/maitrejeu/components/UnderDevelopmentSection';
import { Button } from '@/components/ui/button';
import { UserPlus, User, Users, Coins, CalendarClock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export const SlaveManagementTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState('apercu');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data pour l'exemple
  const slaveCount = 12;
  const totalMaintenance = 1200;
  const totalProductivity = 2400;
  
  const slaveTypes = [
    { type: 'domestiques', count: 5, cost: 500 },
    { type: 'agricoles', count: 4, cost: 400 },
    { type: 'miniers', count: 2, cost: 200 },
    { type: 'artisans', count: 1, cost: 100 }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Gestion des Esclaves</h2>
        <Button className="hover-scale">
          <UserPlus className="h-4 w-4 mr-2" />
          Acquérir des esclaves
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="apercu">Aperçu général</TabsTrigger>
              <TabsTrigger value="assignation">Assignation</TabsTrigger>
              <TabsTrigger value="marche">Marché aux esclaves</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        
        <CardContent>
          <TabsContent value="apercu" className="mt-0 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-blue-100 p-3 rounded-full mb-2">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold">{slaveCount}</div>
                    <div className="text-sm text-muted-foreground">Esclaves totaux</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-amber-100 p-3 rounded-full mb-2">
                      <Coins className="h-6 w-6 text-amber-600" />
                    </div>
                    <div className="text-2xl font-bold">{totalMaintenance} as</div>
                    <div className="text-sm text-muted-foreground">Coût d'entretien mensuel</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-green-100 p-3 rounded-full mb-2">
                      <CalendarClock className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold">{totalProductivity} as</div>
                    <div className="text-sm text-muted-foreground">Productivité mensuelle</div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Répartition par type</h3>
              <div className="space-y-2">
                {slaveTypes.map((type, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2 text-slate-500" />
                      <span className="capitalize">{type.type}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {type.count} ({type.cost} as)
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="assignation" className="mt-0">
            <UnderDevelopmentSection 
              title="Assignation des esclaves" 
              description="Cette fonctionnalité vous permettra bientôt d'assigner vos esclaves à différentes propriétés et activités pour maximiser leur productivité."
              estimatedRelease="Prochaine mise à jour"
              features={[
                "Assignation par compétence",
                "Gestion de groupes de travail",
                "Suivi de la productivité",
                "Rotation des affectations"
              ]}
            />
          </TabsContent>
          
          <TabsContent value="marche" className="mt-0">
            <UnderDevelopmentSection 
              title="Marché aux esclaves" 
              description="Achetez, vendez et négociez des esclaves dans les différents marchés de Rome et des provinces."
              estimatedRelease="Dans deux mises à jour"
              features={[
                "Achats groupés avec réductions",
                "Ventes aux enchères",
                "Formation et spécialisation",
                "Affranchissements"
              ]}
            />
          </TabsContent>
        </CardContent>
      </Card>
    </div>
  );
};
