
import React from 'react';
import { StatBox } from '@/components/ui-custom/StatBox';
import { 
  Users, 
  TrendingUp, 
  Scale, 
  Award, 
  Heart 
} from 'lucide-react';
import { RomanCard } from '@/components/ui-custom/RomanCard';

export const ClientStats: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatBox 
          title="Total Clients" 
          value="42" 
          description="Familles sous votre patronage" 
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
            <h3 className="font-cinzel text-lg font-semibold flex items-center gap-2">
              <Award className="h-5 w-5 text-rome-terracotta" />
              Clients les plus influents
            </h3>
          </RomanCard.Header>
          <RomanCard.Content>
            <div className="space-y-4">
              {[
                { name: 'Livia Metella', value: '92', subtitle: 'Influence sur le Sénat' },
                { name: 'Marcus Licinius', value: '87', subtitle: 'Réseau commercial' },
                { name: 'Aurelia Cotta', value: '79', subtitle: 'Propriétés terriennes' },
                { name: 'Quintus Servilius', value: '68', subtitle: 'Connections maritimes' },
                { name: 'Gaius Pompeius', value: '64', subtitle: 'Artisanat local' },
              ].map((client, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-rome-gold/20 last:border-0">
                  <div>
                    <h4 className="font-medium">{client.name}</h4>
                    <p className="text-sm text-muted-foreground">{client.subtitle}</p>
                  </div>
                  <div className="font-cinzel text-lg font-semibold text-rome-navy">{client.value}</div>
                </div>
              ))}
            </div>
          </RomanCard.Content>
        </RomanCard>
        
        <RomanCard>
          <RomanCard.Header>
            <h3 className="font-cinzel text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-rome-terracotta" />
              Répartition par profession
            </h3>
          </RomanCard.Header>
          <RomanCard.Content>
            <div className="h-64 relative">
              {/* Visualisation placeholder - this would be a chart in a real app */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="space-y-4 w-full max-w-md">
                  {[
                    { label: 'Marchands', value: 30, color: 'bg-rome-terracotta' },
                    { label: 'Artisans', value: 25, color: 'bg-rome-navy' },
                    { label: 'Propriétaires Terriens', value: 20, color: 'bg-rome-gold' },
                    { label: 'Armateurs', value: 15, color: 'bg-rome-leaf' },
                    { label: 'Autres', value: 10, color: 'bg-muted' },
                  ].map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{item.label}</span>
                        <span className="font-medium">{item.value}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${item.color}`} 
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </RomanCard.Content>
        </RomanCard>
      </div>
    </div>
  );
};
