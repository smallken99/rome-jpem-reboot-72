
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';
import { toast } from '@/components/ui-custom/toast';

// Exemple de propositions - à remplacer par des données réelles
const proposals = [
  {
    id: '1',
    family: 'Cornelii',
    offer: 'Mariage entre votre fils Marcus Claudius et Cornelia',
    dowry: 75000,
    status: 'pending',
    date: 'An 755, Ver'
  },
  {
    id: '2',
    family: 'Julii',
    offer: 'Mariage entre votre fille Julia Claudia et Gaius Julius',
    dowry: 65000,
    status: 'pending',
    date: 'An 755, Aestas'
  }
];

export const MarriageProposals: React.FC = () => {
  const handleAccept = (id: string) => {
    toast.success("Proposition acceptée. Un nouveau lien familial a été créé.");
  };
  
  const handleReject = (id: string) => {
    toast.info("Proposition refusée. La famille en sera informée.");
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h3 className="text-lg font-medium">Propositions Reçues</h3>
        <p className="text-sm text-gray-500">
          Propositions d'alliance matrimoniale reçues d'autres familles
        </p>
      </div>
      
      {proposals.length > 0 ? (
        <div className="space-y-4">
          {proposals.map(proposal => (
            <Card key={proposal.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-lg">{proposal.family}</h4>
                    <p className="text-sm text-gray-500 mb-2">{proposal.date}</p>
                    <p className="mb-2">{proposal.offer}</p>
                    <p className="text-sm">
                      <span className="font-medium">Dot proposée:</span> {proposal.dowry} As
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-amber-100 text-amber-800 hover:bg-amber-100"
                  >
                    En attente
                  </Badge>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-end space-x-3">
                  <Button 
                    variant="outline" 
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleReject(proposal.id)}
                  >
                    <X className="mr-1 h-4 w-4" />
                    Refuser
                  </Button>
                  <Button 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => handleAccept(proposal.id)}
                  >
                    <Check className="mr-1 h-4 w-4" />
                    Accepter
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center text-gray-500 italic">
            Aucune proposition d'alliance en attente
          </CardContent>
        </Card>
      )}
      
      <div className="mt-8 mb-4">
        <h3 className="text-lg font-medium">Propositions Envoyées</h3>
        <p className="text-sm text-gray-500">
          Vos propositions d'alliance en attente de réponse
        </p>
      </div>
      
      <Card>
        <CardContent className="p-6 text-center text-gray-500 italic">
          Aucune proposition envoyée en attente de réponse
        </CardContent>
      </Card>
    </div>
  );
};
