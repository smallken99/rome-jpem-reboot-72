
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Button } from '@/components/ui/button';
import { 
  Network, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  RotateCcw
} from 'lucide-react';

export const PatronageNetwork: React.FC = () => {
  return (
    <div className="space-y-6">
      <RomanCard className="overflow-hidden">
        <RomanCard.Header className="flex justify-between items-center">
          <h3 className="font-cinzel text-lg font-semibold flex items-center gap-2">
            <Network className="h-5 w-5 text-rome-terracotta" />
            Réseau de patronage et d'influence
          </h3>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>
        </RomanCard.Header>
        
        <RomanCard.Content className="p-0">
          <div className="aspect-[16/9] bg-rome-parchment/50 relative overflow-hidden">
            {/* This would be a network visualization in a real app */}
            <div className="absolute inset-0">
              {/* Central node - your family */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-16 h-16 rounded-full bg-rome-terracotta flex items-center justify-center text-white font-cinzel text-lg">
                  Vous
                </div>
              </div>
              
              {/* Client nodes with connections */}
              {[
                { x: '30%', y: '30%', name: 'Livia', size: 'w-12 h-12', color: 'bg-rome-navy' },
                { x: '70%', y: '35%', name: 'Marcus', size: 'w-12 h-12', color: 'bg-rome-navy' },
                { x: '20%', y: '65%', name: 'Aurelia', size: 'w-12 h-12', color: 'bg-rome-navy' },
                { x: '60%', y: '70%', name: 'Quintus', size: 'w-10 h-10', color: 'bg-rome-navy/80' },
                { x: '80%', y: '60%', name: 'Gaius', size: 'w-10 h-10', color: 'bg-rome-navy/80' },
                { x: '40%', y: '20%', name: 'Servius', size: 'w-8 h-8', color: 'bg-rome-navy/60' },
                { x: '35%', y: '80%', name: 'Julia', size: 'w-8 h-8', color: 'bg-rome-navy/60' },
                { x: '85%', y: '25%', name: 'Titus', size: 'w-8 h-8', color: 'bg-rome-navy/60' },
                { x: '75%', y: '80%', name: 'Cassius', size: 'w-8 h-8', color: 'bg-rome-navy/60' },
              ].map((client, index) => (
                <React.Fragment key={index}>
                  {/* Connection line */}
                  <div 
                    className="absolute top-1/2 left-1/2 border-t-2 border-dashed border-rome-gold/50 origin-top-left"
                    style={{ 
                      width: '100px',
                      transform: `rotate(${Math.random() * 360}deg) translateY(50px)` 
                    }}
                  />
                  
                  {/* Client node */}
                  <div 
                    className={`absolute rounded-full ${client.color} ${client.size} flex items-center justify-center text-white font-cinzel`}
                    style={{ top: client.y, left: client.x }}
                  >
                    {client.name.substring(0, 2)}
                  </div>
                </React.Fragment>
              ))}
              
              {/* Secondary connections */}
              {[...Array(12)].map((_, i) => (
                <div 
                  key={`connection-${i}`}
                  className="absolute border-t border-rome-gold/30 origin-top-left"
                  style={{ 
                    top: `${20 + Math.random() * 60}%`,
                    left: `${20 + Math.random() * 60}%`,
                    width: '60px',
                    transform: `rotate(${Math.random() * 360}deg)`
                  }}
                />
              ))}
            </div>
            
            <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm p-3 rounded-md border border-rome-gold/30 max-w-xs">
              <h4 className="font-cinzel text-sm font-semibold mb-1">Légende</h4>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rome-terracotta"></div>
                  <span>Votre famille</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rome-navy"></div>
                  <span>Clients majeurs</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rome-navy/60"></div>
                  <span>Clients mineurs</span>
                </div>
              </div>
            </div>
          </div>
        </RomanCard.Content>
      </RomanCard>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <RomanCard>
          <RomanCard.Header>
            <h3 className="font-cinzel text-base font-medium">Sphère politique</h3>
          </RomanCard.Header>
          <RomanCard.Content>
            <div className="text-sm text-muted-foreground">
              <p>12 clients avec influence au Sénat</p>
              <p className="mt-2 font-medium text-rome-navy">Capacité à influencer les votes: <span className="text-rome-terracotta">Moyenne</span></p>
            </div>
          </RomanCard.Content>
        </RomanCard>
        
        <RomanCard>
          <RomanCard.Header>
            <h3 className="font-cinzel text-base font-medium">Sphère économique</h3>
          </RomanCard.Header>
          <RomanCard.Content>
            <div className="text-sm text-muted-foreground">
              <p>18 clients avec activités commerciales</p>
              <p className="mt-2 font-medium text-rome-navy">Contrôle des ressources: <span className="text-rome-terracotta">Élevé</span></p>
            </div>
          </RomanCard.Content>
        </RomanCard>
        
        <RomanCard>
          <RomanCard.Header>
            <h3 className="font-cinzel text-base font-medium">Sphère militaire</h3>
          </RomanCard.Header>
          <RomanCard.Content>
            <div className="text-sm text-muted-foreground">
              <p>7 clients avec connections militaires</p>
              <p className="mt-2 font-medium text-rome-navy">Influence sur les légions: <span className="text-rome-terracotta">Faible</span></p>
            </div>
          </RomanCard.Content>
        </RomanCard>
      </div>
    </div>
  );
};
