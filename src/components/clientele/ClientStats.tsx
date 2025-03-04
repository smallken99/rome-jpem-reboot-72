
import React from 'react';
import { StatBox } from '@/components/ui-custom/StatBox';
import { 
  Users, 
  TrendingUp, 
  Scale, 
  Heart 
} from 'lucide-react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { generateClients } from './ClientUtils';

export const ClientStats: React.FC = () => {
  // Générer les clients une fois pour avoir des statistiques cohérentes
  const clients = generateClients();
  
  // Calculer les statistiques
  const totalClients = clients.length;
  const clientTypes = clients.reduce((acc, client) => {
    acc[client.type] = (acc[client.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Trouver les clients les plus influents (basé sur la somme des influences)
  const influentialClients = [...clients]
    .map(client => ({ 
      ...client, 
      totalInfluence: client.influences.political + client.influences.popular + client.influences.religious 
    }))
    .sort((a, b) => b.totalInfluence - a.totalInfluence)
    .slice(0, 5);
    
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatBox 
          title="Total Clients" 
          value={totalClients.toString()} 
          description="Plébéiens sous votre patronage" 
          icon={<Users className="text-rome-terracotta" />} 
        />
        
        <StatBox 
          title="Influence" 
          value="68%" 
          description="Croissance ce mois" 
          icon={<TrendingUp className="text-rome-terracotta" />} 
          trend="up"
          trendValue="12%"
        />
        
        <StatBox 
          title="Faveurs" 
          value="16" 
          description="Faveurs disponibles" 
          icon={<Scale className="text-rome-terracotta" />} 
        />
        
        <StatBox 
          title="Loyauté" 
          value="Haute" 
          description="Moyenne générale" 
          icon={<Heart className="text-rome-terracotta" />} 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RomanCard>
          <RomanCard.Header>
            <h3 className="font-cinzel text-lg font-semibold">
              Clients les plus influents
            </h3>
          </RomanCard.Header>
          <RomanCard.Content>
            <div className="space-y-4">
              {influentialClients.map((client, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-rome-gold/20 last:border-0">
                  <div>
                    <h4 className="font-medium">{client.name}</h4>
                    <p className="text-sm text-muted-foreground">{client.subType} - {client.location}</p>
                  </div>
                  <div className="font-cinzel text-lg font-semibold text-rome-navy">{client.totalInfluence}</div>
                </div>
              ))}
            </div>
          </RomanCard.Content>
        </RomanCard>
        
        <RomanCard>
          <RomanCard.Header>
            <h3 className="font-cinzel text-lg font-semibold">
              Répartition par profession
            </h3>
          </RomanCard.Header>
          <RomanCard.Content>
            <div className="h-64 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="space-y-4 w-full max-w-md">
                  {Object.entries(clientTypes).map(([type, count], index) => {
                    const percentage = Math.round((count / totalClients) * 100);
                    let label = "";
                    let color = "";
                    
                    switch(type) {
                      case 'artisan_commercant':
                        label = "Artisans & Commerçants";
                        color = "bg-blue-600";
                        break;
                      case 'politicien':
                        label = "Politiciens";
                        color = "bg-purple-600";
                        break;
                      case 'religieux':
                        label = "Religieux";
                        color = "bg-amber-600";
                        break;
                      case 'proprietaire':
                        label = "Propriétaires";
                        color = "bg-green-600";
                        break;
                      case 'pegre':
                        label = "Pègre";
                        color = "bg-red-600";
                        break;
                      default:
                        label = "Autres";
                        color = "bg-gray-600";
                    }
                    
                    return (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{label}</span>
                          <span className="font-medium">{percentage}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div className={`h-full ${color}`} style={{ width: `${percentage}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </RomanCard.Content>
        </RomanCard>
      </div>
    </div>
  );
};
