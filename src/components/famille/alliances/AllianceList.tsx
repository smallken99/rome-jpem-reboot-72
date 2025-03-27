
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { FamilyAlliance, pendingAlliances } from '@/data/alliances';
import { toast } from '@/components/ui-custom/toast';
import { Alliance } from '@/types/alliance';

interface AllianceListProps {
  alliances: FamilyAlliance[];
  showOnlyActive?: boolean;
}

export const AllianceList: React.FC<AllianceListProps> = ({ 
  alliances,
  showOnlyActive = false 
}) => {
  const [selectedAlliance, setSelectedAlliance] = useState<FamilyAlliance | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  
  const handleViewAlliance = (alliance: FamilyAlliance) => {
    setSelectedAlliance(alliance);
    setShowDialog(true);
  };
  
  const handleBreakAlliance = () => {
    if (!selectedAlliance) return;
    
    toast.success(`L'alliance avec la famille ${selectedAlliance.family} a été rompue.`);
    setShowDialog(false);
  };
  
  // Adapter les FamilyAlliance en Alliance pour compatibilité avec le type
  const adaptedAlliances: Alliance[] = alliances.map(a => ({
    id: a.id,
    name: a.family,
    type: a.type as any,
    established: a.established,
    status: a.status as any,
    benefits: a.benefits,
    members: a.members
  }));
  
  const adaptedPending: Alliance[] = pendingAlliances.map(a => ({
    id: a.id,
    name: a.family,
    type: a.type as any,
    established: a.established,
    status: a.status as any,
    benefits: a.benefits,
    members: a.members
  }));
  
  const activeAlliances = adaptedAlliances.filter(a => a.status === 'active');
  
  if (showOnlyActive) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Alliances Actives</h3>
        
        {activeAlliances.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeAlliances.map(alliance => (
              <Card key={alliance.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base">{alliance.name}</CardTitle>
                    <Badge>{alliance.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    Établie en {alliance.established}
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full"
                    onClick={() => handleViewAlliance(alliances.find(a => a.id === alliance.id)!)}
                  >
                    Voir les détails
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              <p>Aucune alliance active</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => toast.info("Cette fonctionnalité sera disponible prochainement")}
              >
                Établir une nouvelle alliance
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }
  
  return (
    <div className="alliance-list">
      <Tabs defaultValue="active">
        <TabsList className="mb-4">
          <TabsTrigger value="active">Actives ({activeAlliances.length})</TabsTrigger>
          <TabsTrigger value="pending">En Attente ({adaptedPending.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          {activeAlliances.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeAlliances.map(alliance => (
                <Card key={alliance.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base">{alliance.name}</CardTitle>
                      <Badge>{alliance.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      Établie en {alliance.established}
                    </p>
                    <div className="space-y-1">
                      <h4 className="text-xs font-medium">Bénéfices:</h4>
                      <ul className="text-xs space-y-1">
                        {alliance.benefits.map((benefit, index) => (
                          <li key={index}>• {benefit}</li>
                        ))}
                      </ul>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="w-full mt-4"
                      onClick={() => handleViewAlliance(alliances.find(a => a.id === alliance.id)!)}
                    >
                      Gérer cette alliance
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                <p>Aucune alliance active</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="pending">
          {adaptedPending.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {adaptedPending.map(alliance => (
                <Card key={alliance.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-base">{alliance.name}</CardTitle>
                      <Badge variant="outline">En attente</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      Proposée en {alliance.established}
                    </p>
                    <div className="space-y-1">
                      <h4 className="text-xs font-medium">Bénéfices potentiels:</h4>
                      <ul className="text-xs space-y-1">
                        {alliance.benefits.map((benefit, index) => (
                          <li key={index}>• {benefit}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => toast.success("Alliance acceptée")}
                      >
                        Accepter
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toast.info("Alliance rejetée")}
                      >
                        Rejeter
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                <p>Aucune proposition d'alliance en attente</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
      
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Alliance avec {selectedAlliance?.family}
            </DialogTitle>
            <DialogDescription>
              Établie en {selectedAlliance?.established}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <h3 className="text-sm font-medium">Type d'alliance:</h3>
            <p>{selectedAlliance?.type}</p>
            
            <h3 className="text-sm font-medium mt-4">Bénéfices:</h3>
            <ul className="space-y-1 mt-1">
              {selectedAlliance?.benefits.map((benefit, index) => (
                <li key={index}>• {benefit}</li>
              ))}
            </ul>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Fermer
            </Button>
            <Button variant="destructive" onClick={handleBreakAlliance}>
              Rompre l'alliance
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
