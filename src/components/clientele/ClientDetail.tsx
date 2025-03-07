
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { ArrowLeft, Edit, Trash2, Star, MessageSquare, Calendar, Map, History } from 'lucide-react';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { generateClients } from '../clientele/ClientUtils';
import { ClientInfluences } from '@/components/clientele/card/ClientInfluences';
import { Client } from '@/components/clientele/ClientCard';

const ClientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [client, setClient] = useState<Client | null>(null);
  
  // Récupérer les données du client
  useEffect(() => {
    if (id) {
      const clients = generateClients();
      const foundClient = clients.find(c => c.id === Number(id));
      
      if (foundClient) {
        setClient(foundClient);
      } else {
        toast.error("Client non trouvé");
        navigate('/clientele');
      }
    }
  }, [id, navigate]);
  
  if (!client) {
    return (
      <Layout>
        <div className="p-8 text-center">
          <p>Chargement des informations du client...</p>
        </div>
      </Layout>
    );
  }
  
  const handleDelete = () => {
    toast.error("Fonctionnalité de suppression non implémentée");
  };
  
  const handleGrantFavor = () => {
    setIsLoading(true);
    // Simuler un chargement
    setTimeout(() => {
      toast.success("Faveur accordée avec succès");
      setIsLoading(false);
    }, 1000);
  };
  
  const handleSendMessage = () => {
    toast.success("Redirection vers la messagerie");
    navigate('/messages');
  };
  
  const handleMeeting = () => {
    toast.success("Rencontre planifiée");
  };
  
  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <PageHeader 
          title={`${client.name}`}
          subtitle={`Informations complètes et gestion de la relation client #${id}`}
        />
        
        <div className="flex gap-2">
          <ActionButton 
            variant="outline" 
            label="Retour" 
            to="/clientele"
            icon={<ArrowLeft className="h-4 w-4" />}
          />
          <ActionButton 
            variant="outline" 
            label="Modifier"
            icon={<Edit className="h-4 w-4" />}
          />
          <ActionButton 
            variant="destructive" 
            label="Supprimer"
            icon={<Trash2 className="h-4 w-4" />}
            onClick={handleDelete}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2">
          <Card className="mb-6 border-rome-gold/30">
            <CardHeader className="pb-2">
              <CardTitle className="font-cinzel">Informations Personnelles</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="profil">
                <TabsList className="w-full justify-start border border-rome-gold/30 bg-white mb-4">
                  <TabsTrigger value="profil">Profil</TabsTrigger>
                  <TabsTrigger value="influence">Influence</TabsTrigger>
                  <TabsTrigger value="historique">Historique</TabsTrigger>
                </TabsList>
                
                <TabsContent value="profil" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="border rounded p-3">
                      <div className="text-sm font-medium mb-1">Type</div>
                      <div>{client.subType}</div>
                    </div>
                    <div className="border rounded p-3">
                      <div className="text-sm font-medium mb-1">Profession</div>
                      <div>{client.subType}</div>
                    </div>
                    <div className="border rounded p-3">
                      <div className="text-sm font-medium mb-1">Location</div>
                      <div className="flex items-center gap-1">
                        <Map className="h-4 w-4 text-muted-foreground" />
                        <span>{client.location}</span>
                      </div>
                    </div>
                    <div className="border rounded p-3">
                      <div className="text-sm font-medium mb-1">Client depuis</div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>2 ans</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="influence" className="space-y-4">
                  <div className="p-4 border rounded">
                    <h3 className="font-medium mb-3">Niveau d'influence et sphères d'impact</h3>
                    <ClientInfluences influences={client.influences} />
                  </div>
                </TabsContent>
                
                <TabsContent value="historique" className="space-y-4">
                  <div className="flex items-start gap-2 border-l-2 border-rome-gold/30 pl-4 py-2">
                    <History className="h-5 w-5 text-rome-gold shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">Faveur accordée</div>
                      <div className="text-sm text-muted-foreground">Il y a 3 mois</div>
                      <div className="text-sm mt-1">Intervention auprès d'un magistrat pour réduire une amende</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2 border-l-2 border-rome-gold/30 pl-4 py-2">
                    <MessageSquare className="h-5 w-5 text-rome-gold shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">Message envoyé</div>
                      <div className="text-sm text-muted-foreground">Il y a 6 mois</div>
                      <div className="text-sm mt-1">Invitation à un banquet familial</div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div className="col-span-1">
          {/* Actions */}
          <Card className="mb-6 border-rome-gold/30">
            <CardHeader className="pb-2">
              <CardTitle className="font-cinzel">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ActionButton 
                className="roman-btn w-full"
                label="Accorder une Faveur"
                icon={<Star className="h-4 w-4" />}
                onClick={handleGrantFavor}
                disabled={isLoading}
              />
              <ActionButton 
                className="roman-btn w-full"
                label="Envoyer un Message"
                icon={<MessageSquare className="h-4 w-4" />}
                onClick={handleSendMessage}
              />
              <ActionButton 
                className="roman-btn w-full"
                label="Organiser une Rencontre"
                icon={<Calendar className="h-4 w-4" />}
                onClick={handleMeeting}
              />
            </CardContent>
          </Card>
          
          {/* Métriques - Only showing Loyalty */}
          <Card className="border-rome-gold/30">
            <CardHeader className="pb-2">
              <CardTitle className="font-cinzel">Relation Client</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mt-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Loyauté</span>
                    <span className="font-medium">{client.loyalty}</span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    {/* Dynamically set width based on loyalty level */}
                    <div 
                      className={`h-full rounded-full ${getLoyaltyColor(client.loyalty)}`} 
                      style={{ width: getLoyaltyPercentage(client.loyalty) }}
                    ></div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    La loyauté reflète la fidélité du client et sa disposition à vous soutenir
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

// Helper function to determine loyalty bar color based on loyalty level
const getLoyaltyColor = (loyalty: string): string => {
  switch (loyalty) {
    case 'Très Haute': return 'bg-green-500';
    case 'Haute': return 'bg-emerald-500';
    case 'Moyenne': return 'bg-amber-500';
    case 'Basse': return 'bg-orange-500';
    case 'Très Basse': return 'bg-red-500';
    default: return 'bg-gray-500';
  }
};

// Helper function to determine loyalty percentage based on loyalty level
const getLoyaltyPercentage = (loyalty: string): string => {
  switch (loyalty) {
    case 'Très Haute': return '90%';
    case 'Haute': return '75%';
    case 'Moyenne': return '50%';
    case 'Basse': return '30%';
    case 'Très Basse': return '15%';
    default: return '0%';
  }
};

export default ClientDetail;
