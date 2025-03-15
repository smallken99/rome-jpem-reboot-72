
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Traite } from './types';
import { TraiteModal } from './modals/TraiteModal';
import { FileText, Calendar, Users, ExternalLink, MapPin } from 'lucide-react';

interface TraitesListProps {
  traites: Traite[];
  searchTerm: string;
  filters: {
    status?: string;
    dateFrom?: string;
    dateTo?: string;
  };
  isEditable: boolean;
}

const TraitesList: React.FC<TraitesListProps> = ({ traites, searchTerm, filters, isEditable }) => {
  const [selectedTraite, setSelectedTraite] = useState<Traite | null>(null);
  const [isTraiteModalOpen, setIsTraiteModalOpen] = useState(false);

  const filteredTraites = traites.filter(traite => {
    const matchesSearch = searchTerm === '' || 
      traite.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      traite.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !filters.status || traite.status === filters.status;
    
    // If needed, add more filters for date ranges, etc.
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Actif</Badge>;
      case 'draft':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-500">Brouillon</Badge>;
      case 'expired':
        return <Badge variant="secondary">Expiré</Badge>;
      case 'revoked':
        return <Badge variant="destructive">Révoqué</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'commercial':
        return <Badge variant="outline" className="border-blue-500 text-blue-500">Commercial</Badge>;
      case 'peace':
        return <Badge variant="outline" className="border-green-500 text-green-500">Paix</Badge>;
      case 'military':
        return <Badge variant="outline" className="border-red-500 text-red-500">Militaire</Badge>;
      case 'tribute':
        return <Badge variant="outline" className="border-purple-500 text-purple-500">Tribut</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const handleTraiteClick = (traite: Traite) => {
    setSelectedTraite(traite);
    setIsTraiteModalOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTraites.length === 0 ? (
          <div className="col-span-full text-center p-8 bg-muted/20 rounded-lg">
            <p className="text-muted-foreground">Aucun traité trouvé.</p>
          </div>
        ) : (
          filteredTraites.map(traite => (
            <Card 
              key={traite.id} 
              className="cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => handleTraiteClick(traite)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg font-cinzel">{traite.name}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(traite.dateSignature).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col gap-1 items-end">
                    {getStatusBadge(traite.status)}
                    {getTypeBadge(traite.type)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-24">
                  <p className="text-sm text-muted-foreground">{traite.description}</p>
                </ScrollArea>
                <div className="mt-3 flex items-center text-xs text-muted-foreground">
                  <Users className="h-3 w-3 mr-1" />
                  <span>Parties: {traite.parties.join(', ')}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <div className="text-xs text-muted-foreground flex items-center">
                  <FileText className="h-3 w-3 mr-1" />
                  <span>{traite.clauses.length} clauses</span>
                </div>
                <Button variant="ghost" size="sm" className="p-0 h-auto">
                  <ExternalLink className="h-4 w-4" />
                  <span className="sr-only">Voir les détails</span>
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      {selectedTraite && (
        <TraiteModal
          open={isTraiteModalOpen}
          onOpenChange={setIsTraiteModalOpen}
          traite={selectedTraite}
          isEditable={isEditable}
          onSave={(updatedTraite) => {
            console.log('Saving updated traite:', updatedTraite);
            setIsTraiteModalOpen(false);
          }}
        />
      )}
    </>
  );
};

export default TraitesList;
