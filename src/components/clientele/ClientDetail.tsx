
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, UserPlus, Trash2, Star, Users, Building, MapPin } from 'lucide-react';
import { Client } from './ClientCard';
import { ClientTypeBadge } from './card/ClientTypeBadge';
import { LoyaltyBadge } from './card/LoyaltyBadge';
import { ClientInfluences } from './card/ClientInfluences';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RomanCard } from '@/components/ui-custom/RomanCard';

// Import utility function to generate clients
import { generateClients } from './ClientUtils';

const ClientDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const clients = generateClients();
  const client = clients.find(c => c.id === Number(id)) || clients[0];
  
  const handleGoBack = () => {
    navigate('/clientele');
  };
  
  return (
    <Layout>
      <PageHeader 
        title={client.name} 
        subtitle={`Client plébéien - ${client.subType}`}
        actions={
          <Button variant="outline" onClick={handleGoBack} className="roman-btn-outline gap-1">
            <ArrowLeft className="h-4 w-4" />
            Retour à la liste
          </Button>
        }
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-1">
          <RomanCard className="h-full">
            <RomanCard.Header>
              <div className="flex items-center gap-2">
                <ClientTypeBadge type={client.type} />
                <h3 className="font-cinzel text-lg font-semibold text-rome-navy">{client.name}</h3>
              </div>
              <div className="mt-2">
                <LoyaltyBadge loyalty={client.loyalty} />
              </div>
            </RomanCard.Header>
            <RomanCard.Content>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm text-muted-foreground mb-1">Type de Client</h4>
                  <p className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {client.subType}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm text-muted-foreground mb-1">Lieu de résidence</h4>
                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {client.location}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm text-muted-foreground mb-1">Influence</h4>
                  <ClientInfluences influences={client.influences} />
                </div>
              </div>
              
              <div className="mt-6 flex flex-col gap-2">
                <Button className="roman-btn w-full gap-1">
                  <Star className="h-4 w-4" />
                  Accorder une faveur
                </Button>
                <Button variant="outline" className="roman-btn-outline w-full gap-1">
                  <Edit className="h-4 w-4" />
                  Modifier
                </Button>
                <Button variant="destructive" className="w-full gap-1">
                  <Trash2 className="h-4 w-4" />
                  Supprimer
                </Button>
              </div>
            </RomanCard.Content>
          </RomanCard>
        </div>
        
        <div className="lg:col-span-2">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="bg-rome-parchment border border-rome-gold/30 mb-6">
              <TabsTrigger value="details" className="font-cinzel">Détails</TabsTrigger>
              <TabsTrigger value="interactions" className="font-cinzel">Interactions</TabsTrigger>
              <TabsTrigger value="faveurs" className="font-cinzel">Faveurs</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="space-y-6">
              <RomanCard>
                <RomanCard.Header>
                  <h3 className="font-cinzel">Informations Détaillées</h3>
                </RomanCard.Header>
                <RomanCard.Content>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm text-muted-foreground mb-1">Métier et Occupation</h4>
                      <p className="text-sm">
                        {client.subType} basé dans le quartier de {client.location}. 
                        Exerce son influence principalement auprès des commerçants du quartier.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm text-muted-foreground mb-1">Relations</h4>
                      <p className="text-sm">
                        Client rattaché à votre famille depuis 3 ans. 
                        A montré sa loyauté lors des dernières élections consulaires.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm text-muted-foreground mb-1">Historique</h4>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Rallié à votre cause en 225 av. J.C.</li>
                        <li>A reçu une faveur financière en 223 av. J.C.</li>
                        <li>A contribué à votre campagne électorale en 222 av. J.C.</li>
                      </ul>
                    </div>
                  </div>
                </RomanCard.Content>
              </RomanCard>
              
              <RomanCard>
                <RomanCard.Header>
                  <h3 className="font-cinzel">Réseau d'Influence</h3>
                </RomanCard.Header>
                <RomanCard.Content>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm text-muted-foreground mb-1">Influencé par</h4>
                      <p className="text-sm">
                        • Votre famille (relation principale)
                        <br />
                        • Marcus Tullius, négociant de vin (relation secondaire)
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm text-muted-foreground mb-1">Influence sur</h4>
                      <p className="text-sm">
                        • 5 artisans de son quartier
                        <br />
                        • Association des commerçants de {client.location}
                      </p>
                    </div>
                  </div>
                </RomanCard.Content>
              </RomanCard>
            </TabsContent>
            
            <TabsContent value="interactions" className="space-y-6">
              <RomanCard>
                <RomanCard.Header>
                  <h3 className="font-cinzel">Interactions Récentes</h3>
                </RomanCard.Header>
                <RomanCard.Content>
                  <div className="space-y-4">
                    <div className="border-b border-rome-gold/20 pb-3">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Invitation au banquet familial</h4>
                        <span className="text-sm text-muted-foreground">Ides de Mars</span>
                      </div>
                      <p className="text-sm mt-1">
                        A été invité au banquet pour célébrer les victoires militaires de votre famille.
                        A apporté un cadeau de qualité.
                      </p>
                    </div>
                    
                    <div className="border-b border-rome-gold/20 pb-3">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Demande de soutien commercial</h4>
                        <span className="text-sm text-muted-foreground">Calendes d'Avril</span>
                      </div>
                      <p className="text-sm mt-1">
                        A sollicité votre soutien pour l'importation de marchandises spéciales.
                        Proposition d'intéressement sur les bénéfices.
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between">
                        <h4 className="font-medium">Appel à témoignage</h4>
                        <span className="text-sm text-muted-foreground">Nones de Mai</span>
                      </div>
                      <p className="text-sm mt-1">
                        A témoigné en faveur de votre famille lors d'un litige commercial.
                        Témoignage déterminant pour la résolution du conflit.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Button variant="outline" className="roman-btn-outline w-full gap-1">
                      <UserPlus className="h-4 w-4" />
                      Nouvelle interaction
                    </Button>
                  </div>
                </RomanCard.Content>
              </RomanCard>
            </TabsContent>
            
            <TabsContent value="faveurs" className="space-y-6">
              <RomanCard>
                <RomanCard.Header>
                  <h3 className="font-cinzel">Faveurs Accordées</h3>
                </RomanCard.Header>
                <RomanCard.Content>
                  <div className="space-y-4">
                    <div className="border-b border-rome-gold/20 pb-3">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Prêt sans intérêt</h4>
                        <span className="text-sm text-muted-foreground">223 av. J.C.</span>
                      </div>
                      <p className="text-sm mt-1">
                        Prêt de 5,000 As pour l'extension de son commerce.
                        Remboursé intégralement.
                      </p>
                      <div className="flex items-center gap-1 mt-2">
                        <span className="text-xs text-muted-foreground">Impact sur loyauté:</span>
                        <span className="text-xs text-green-600 font-medium">+15%</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between">
                        <h4 className="font-medium">Intercession juridique</h4>
                        <span className="text-sm text-muted-foreground">220 av. J.C.</span>
                      </div>
                      <p className="text-sm mt-1">
                        Intervention auprès du préteur pour résoudre un litige commercial.
                        Résultat favorable.
                      </p>
                      <div className="flex items-center gap-1 mt-2">
                        <span className="text-xs text-muted-foreground">Impact sur loyauté:</span>
                        <span className="text-xs text-green-600 font-medium">+25%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Button className="roman-btn w-full gap-1">
                      <Star className="h-4 w-4" />
                      Accorder une nouvelle faveur
                    </Button>
                  </div>
                </RomanCard.Content>
              </RomanCard>
              
              <RomanCard>
                <RomanCard.Header>
                  <h3 className="font-cinzel">Faveurs Demandées</h3>
                </RomanCard.Header>
                <RomanCard.Content>
                  <div className="border p-4 rounded-md bg-rome-marble/10 text-center">
                    <p className="text-sm text-muted-foreground">
                      Aucune faveur en attente de la part de ce client
                    </p>
                  </div>
                </RomanCard.Content>
              </RomanCard>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ClientDetail;
