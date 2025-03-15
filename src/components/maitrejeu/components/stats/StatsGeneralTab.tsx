
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMaitreJeu } from '../../context';
import { 
  BarChart3, 
  Users, 
  Building, 
  CandlestickChart,
  Landmark,
  ScrollText,
  Calendar
} from 'lucide-react';

export const StatsGeneralTab: React.FC = () => {
  const { 
    senateurs, 
    familles, 
    lois, 
    histoireEntries, 
    clients, 
    currentDate
  } = useMaitreJeu();

  // Calcul de statistiques générales
  const totalSenateurs = senateurs.length;
  const totalFamilles = familles.length;
  const totalLois = lois.length;
  const totalClients = clients.length;
  const actifsClients = clients.filter(c => c.statut === 'active').length;
  const totalHistoire = histoireEntries.length;
  const currentYear = currentDate.year;

  // Statistiques pour le graphique (simulées)
  const stats = [
    { title: "Sénateurs", value: totalSenateurs, icon: <Users className="h-4 w-4" /> },
    { title: "Familles", value: totalFamilles, icon: <Landmark className="h-4 w-4" /> },
    { title: "Lois", value: totalLois, icon: <ScrollText className="h-4 w-4" /> },
    { title: "Clients", value: totalClients, icon: <Users className="h-4 w-4" /> },
    { title: "Clients Actifs", value: actifsClients, icon: <CandlestickChart className="h-4 w-4" /> },
    { title: "Événements historiques", value: totalHistoire, icon: <Calendar className="h-4 w-4" /> }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Vue d'ensemble de Rome - An {currentYear} AUC</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Évolution globale</CardTitle>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-20" />
            <p>Les données d'évolution seront disponibles lorsque plus d'années se seront écoulées.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
