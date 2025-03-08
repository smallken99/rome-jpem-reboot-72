
import React from 'react';
import { Magistrate } from '@/data/magistracies';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface MagistratureBureauProps {
  magistrate: Magistrate;
  children: React.ReactNode;
}

export const MagistratureBureau: React.FC<MagistratureBureauProps> = ({ 
  magistrate,
  children
}) => {
  const MagistrateIcon = magistrate.icon;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${magistrate.iconBgColor}`}>
            <MagistrateIcon className={`h-6 w-6 ${magistrate.iconColor}`} />
          </div>
          <div>
            <h2 className="font-cinzel text-xl">{magistrate.name}</h2>
            <p className="text-muted-foreground text-sm">Bureau d'administration</p>
          </div>
        </div>
        
        <Badge variant="outline" className="bg-rome-gold/10 text-rome-navy border-rome-gold/30">
          Marcus Aurelius Cotta
        </Badge>
      </div>
      
      <RomanCard>
        <RomanCard.Header>
          <h3 className="font-cinzel">Responsabilités & Pouvoirs</h3>
        </RomanCard.Header>
        <RomanCard.Content>
          <div className="space-y-4">
            <p className="italic text-muted-foreground">{magistrate.description}</p>
            
            <Separator className="my-4 border-rome-gold/30" />
            
            {magistrate.responsibilities && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {magistrate.responsibilities.map((responsibility, index) => (
                  <Card key={index} className="p-3 text-sm bg-white hover:bg-muted/20 transition-colors">
                    {responsibility}
                  </Card>
                ))}
              </div>
            )}
          </div>
        </RomanCard.Content>
      </RomanCard>
      
      <Tabs defaultValue="gestion" className="w-full">
        <TabsList className="w-full bg-white border border-rome-gold/30">
          <TabsTrigger value="gestion">Gestion</TabsTrigger>
          <TabsTrigger value="rapports">Rapports</TabsTrigger>
          <TabsTrigger value="decisions">Décisions</TabsTrigger>
        </TabsList>
        <TabsContent value="gestion" className="mt-4">
          {children}
        </TabsContent>
        <TabsContent value="rapports" className="mt-4">
          <RomanCard>
            <RomanCard.Header>
              <h3 className="font-cinzel">Rapports du Bureau</h3>
            </RomanCard.Header>
            <RomanCard.Content>
              <p className="text-muted-foreground">
                Les rapports concernant votre magistrature seront affichés ici.
              </p>
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
        <TabsContent value="decisions" className="mt-4">
          <RomanCard>
            <RomanCard.Header>
              <h3 className="font-cinzel">Décisions en attente</h3>
            </RomanCard.Header>
            <RomanCard.Content>
              <p className="text-muted-foreground">
                Les décisions nécessitant votre attention en tant que {magistrate.name.toLowerCase()} seront affichées ici.
              </p>
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};
