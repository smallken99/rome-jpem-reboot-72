
import React, { useState } from 'react';
import { PatrimoineOverviewStats } from './PatrimoineOverviewStats';
import { PropertiesTable } from './PropertiesTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Download, RefreshCw, AreaChart, Clock, PieChart } from 'lucide-react';
import { usePatrimoine } from '@/hooks/usePatrimoine';
import { formatCurrency } from '@/utils/currencyUtils';
import { useGameTime } from '@/hooks/useGameTime';
import { ResourcesTable } from '@/components/economie/ResourcesTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

export const PatrimoineOverview: React.FC = () => {
  const { balance, getPropertyStats } = usePatrimoine();
  const { formatDate, advanceTime } = useGameTime();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('properties');
  
  const handleRefresh = () => {
    toast({
      title: "Données actualisées",
      description: "Les informations de votre patrimoine ont été mises à jour.",
    });
  };
  
  const handleAdvanceTime = () => {
    advanceTime(1);
    toast({
      title: "Temps avancé",
      description: `Nous sommes maintenant au ${formatDate()}.`,
    });
  };
  
  const handleAddProperty = () => {
    navigate('/patrimoine/proprietes/ajouter');
  };
  
  const handleGenerateReport = () => {
    toast({
      title: "Rapport généré",
      description: "Le rapport détaillé de votre patrimoine est prêt à être consulté.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-cinzel mb-1">Mon Patrimoine</h2>
          <p className="text-muted-foreground">
            Vue d'ensemble de vos possessions et finances - {formatDate()}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="font-semibold text-lg">
            Solde: {formatCurrency(balance)}
          </span>
          <Button variant="outline" size="sm" className="gap-1" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4" />
            <span>Actualiser</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-1" onClick={handleAdvanceTime}>
            <Clock className="h-4 w-4" />
            <span>Avancer le temps</span>
          </Button>
        </div>
      </div>
      
      <PatrimoineOverviewStats />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
        <TabsList>
          <TabsTrigger value="properties">Propriétés</TabsTrigger>
          <TabsTrigger value="resources">Ressources</TabsTrigger>
          <TabsTrigger value="analytics">Analyses</TabsTrigger>
        </TabsList>
        
        <TabsContent value="properties" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Mes Propriétés</CardTitle>
              <Button className="flex items-center gap-1" onClick={handleAddProperty}>
                <Plus className="h-4 w-4" />
                <span>Nouvelle Propriété</span>
              </Button>
            </CardHeader>
            <CardContent>
              <PropertiesTable />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="resources" className="space-y-6">
          <ResourcesTable />
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenus et Dépenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <AreaChart className="h-8 w-8 mr-2 text-muted-foreground/50" />
                    <div className="text-center">
                      <p>Graphique des revenus et dépenses mensuels</p>
                      <Button variant="outline" size="sm" className="mt-4" onClick={handleGenerateReport}>
                        <Download className="h-4 w-4 mr-2" />
                        Générer un rapport
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border rounded-md">
                      <h3 className="text-sm text-muted-foreground">Revenu mensuel</h3>
                      <p className="text-xl font-semibold text-green-600">{formatCurrency(48000)}</p>
                    </div>
                    <div className="p-4 border rounded-md">
                      <h3 className="text-sm text-muted-foreground">Dépenses mensuelles</h3>
                      <p className="text-xl font-semibold text-rose-600">{formatCurrency(32500)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Répartition du Patrimoine</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <PieChart className="h-8 w-8 mr-2 text-muted-foreground/50" />
                    <div className="text-center">
                      <p>Graphique de répartition des types de possessions</p>
                      <Button variant="outline" size="sm" className="mt-4" onClick={handleGenerateReport}>
                        <Download className="h-4 w-4 mr-2" />
                        Générer un rapport
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border rounded-md">
                      <h3 className="text-sm text-muted-foreground">Valeur totale</h3>
                      <p className="text-xl font-semibold">{formatCurrency(1420000)}</p>
                    </div>
                    <div className="p-4 border rounded-md">
                      <h3 className="text-sm text-muted-foreground">Croissance annuelle</h3>
                      <p className="text-xl font-semibold text-green-600">+8.3%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
