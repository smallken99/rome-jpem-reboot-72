
import React from 'react';
import { useMaitreJeu } from './context/MaitreJeuContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, BarChart, FileText, Plus, Settings } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

import { EquilibreBarChart } from './components/EquilibreBarChart';
import { EvenementsList } from './components/EvenementsList';
import { CreateEvenementForm } from './components/CreateEvenementForm';

export const GestionEquilibre: React.FC = () => {
  const { equilibre } = useMaitreJeu();
  const { toast } = useToast();
  
  const getEquilibreStatus = (): { status: string; color: string; icon: React.ReactNode } => {
    // Calculer le score moyen d'équilibre
    const values = Object.values(equilibre);
    const average = values.reduce((sum, val) => sum + val, 0) / values.length;
    
    if (average >= 70) {
      return { 
        status: 'Excellent', 
        color: 'text-green-500', 
        icon: <BarChart className="h-5 w-5 text-green-500" /> 
      };
    }
    if (average >= 50) {
      return { 
        status: 'Stable', 
        color: 'text-amber-500', 
        icon: <BarChart className="h-5 w-5 text-amber-500" /> 
      };
    }
    if (average >= 30) {
      return { 
        status: 'Instable', 
        color: 'text-orange-500', 
        icon: <AlertTriangle className="h-5 w-5 text-orange-500" /> 
      };
    }
    return { 
      status: 'Critique', 
      color: 'text-red-500', 
      icon: <AlertTriangle className="h-5 w-5 text-red-500" /> 
    };
  };
  
  const equilibreStatus = getEquilibreStatus();
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div className="flex items-center gap-2">
          {equilibreStatus.icon}
          <div>
            <h3 className="text-lg font-medium">État de la République</h3>
            <p className={`text-sm ${equilibreStatus.color}`}>
              {equilibreStatus.status}
            </p>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="apercu" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="apercu" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            Aperçu
          </TabsTrigger>
          <TabsTrigger value="evenements" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Événements
          </TabsTrigger>
          <TabsTrigger value="creer" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Créer
          </TabsTrigger>
          <TabsTrigger value="parametres" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Paramètres
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="apercu">
          <EquilibreBarChart />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Prédiction Socio-Politique</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {equilibre.plebeiens > 30 ? 'Stable' : 'Tensions'}
                </div>
                <p className="text-sm text-muted-foreground">
                  Basé sur la satisfaction des plébéiens ({equilibre.plebeiens}%)
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Sécurité Militaire</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {equilibre.armée > 50 ? 'Forte' : 'Vulnérable'}
                </div>
                <p className="text-sm text-muted-foreground">
                  Basé sur la force de l'armée ({equilibre.armée}%)
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Santé Économique</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {equilibre.économie > 40 ? 'Prospère' : 'En difficulté'}
                </div>
                <p className="text-sm text-muted-foreground">
                  Basé sur l'indice économique ({equilibre.économie}%)
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="evenements">
          <EvenementsList />
        </TabsContent>
        
        <TabsContent value="creer">
          <CreateEvenementForm />
        </TabsContent>
        
        <TabsContent value="parametres">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Paramètres d'Équilibre</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Ajustez manuellement les valeurs d'équilibre pour simuler différents scénarios.
              </p>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Cette fonctionnalité est en cours de développement</p>
                <p className="text-sm text-muted-foreground">
                  Utilisez la section "Créer un événement" pour modifier l'équilibre de la République.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
