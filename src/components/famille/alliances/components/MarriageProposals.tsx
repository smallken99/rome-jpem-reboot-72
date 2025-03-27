
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { pendingAlliances } from '@/data/alliances';
import { toast } from '@/components/ui-custom/toast';

export const MarriageProposals: React.FC = () => {
  const handleAcceptProposal = (id: string) => {
    toast.success("Proposition d'alliance acceptée");
  };
  
  const handleRejectProposal = (id: string) => {
    toast.info("Proposition d'alliance rejetée");
  };
  
  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h3 className="text-lg font-medium">Propositions d'Alliances Matrimoniales</h3>
        <p className="text-sm text-gray-500">
          Examinez et répondez aux propositions faites par d'autres familles
        </p>
      </div>
      
      {pendingAlliances.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {pendingAlliances.map(proposal => (
            <Card key={proposal.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base">Famille {proposal.family}</CardTitle>
                  <Badge variant="outline">En attente</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Proposition reçue en {proposal.established}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Bénéfices proposés:</h4>
                    <ul className="space-y-1 text-sm">
                      {proposal.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span>•</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <Button 
                      onClick={() => handleAcceptProposal(proposal.id)}
                    >
                      Accepter
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handleRejectProposal(proposal.id)}
                    >
                      Rejeter
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">
              Aucune proposition d'alliance en attente
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Les autres familles pourront vous contacter avec des propositions d'alliance matrimoniale
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
