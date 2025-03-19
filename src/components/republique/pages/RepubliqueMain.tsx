
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RepublicStats } from '@/components/republique/statistiques/RepublicStats';
import { FunctionCard } from '@/components/republique/ui/FunctionCard';
import { useNavigate } from 'react-router-dom';
import { 
  Building, 
  Landmark, 
  Gavel, 
  Scale, 
  Globe, 
  Scroll, 
  Coins, 
  Map
} from 'lucide-react';

export const RepubliqueMain: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState('statistiques');
  
  // Fonctions des bureaux
  const bureaux = [
    {
      title: "Bureau du Consul",
      description: "Diriger la République et présider le Sénat",
      icon: <Landmark className="h-6 w-6" />,
      color: "bg-blue-100",
      iconColor: "text-blue-700",
      route: "/republique/bureaux/consul"
    },
    {
      title: "Bureau du Préteur",
      description: "Administrer la justice et représenter les consuls",
      icon: <Scale className="h-6 w-6" />,
      color: "bg-emerald-100",
      iconColor: "text-emerald-700",
      route: "/republique/bureaux/preteur"
    },
    {
      title: "Bureau de l'Édile",
      description: "Superviser l'infrastructure et les services publics",
      icon: <Building className="h-6 w-6" />,
      color: "bg-amber-100",
      iconColor: "text-amber-700",
      route: "/republique/bureaux/edile"
    },
    {
      title: "Bureau du Questeur",
      description: "Gérer les finances publiques et collecter les impôts",
      icon: <Coins className="h-6 w-6" />,
      color: "bg-yellow-100",
      iconColor: "text-yellow-700",
      route: "/republique/bureaux/questeur"
    },
    {
      title: "Bureau du Censeur",
      description: "Surveiller la moralité et recenser la population",
      icon: <Scroll className="h-6 w-6" />,
      color: "bg-purple-100",
      iconColor: "text-purple-700",
      route: "/republique/bureaux/censeur"
    }
  ];
  
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold font-cinzel mb-2">Administration de la République</h1>
        <p className="text-muted-foreground">
          Gérez les affaires publiques selon votre fonction et consultez l'état de la République.
        </p>
      </header>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="statistiques">Statistiques</TabsTrigger>
          <TabsTrigger value="bureaux">Bureaux des Magistrats</TabsTrigger>
        </TabsList>
        
        <TabsContent value="statistiques" className="mt-6">
          <RepublicStats />
        </TabsContent>
        
        <TabsContent value="bureaux" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Bureaux des Magistrats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {bureaux.map((bureau, index) => (
                  <FunctionCard
                    key={index}
                    title={bureau.title}
                    description={bureau.description}
                    icon={bureau.icon}
                    color={bureau.color}
                    iconColor={bureau.iconColor}
                    onClick={() => navigate(bureau.route)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
