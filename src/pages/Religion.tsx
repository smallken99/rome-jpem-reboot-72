
import React from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatBox } from '@/components/ui-custom/StatBox';
import { Heart, Calendar, UserCheck, Trophy } from 'lucide-react';

const Religion = () => {
  return (
    <Layout>
      <PageHeader 
        title="Religion" 
        subtitle="Honorez les dieux et maintenez la pax deorum" 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatBox 
          title="Piété Familiale" 
          value="72/100" 
          description="Faveur divine stable"
          icon={<Heart className="h-6 w-6" />}
          trend="neutral"
          trendValue="0"
        />
        <StatBox 
          title="Cérémonies" 
          value="3" 
          description="Cérémonies ce mois-ci"
          icon={<Calendar className="h-6 w-6" />}
        />
        <StatBox 
          title="Prêtres familiaux" 
          value="2" 
          description="Membres avec rôles religieux"
          icon={<UserCheck className="h-6 w-6" />}
        />
        <StatBox 
          title="Prestige religieux" 
          value="Élevé" 
          description="Respecté dans les cercles religieux"
          icon={<Trophy className="h-6 w-6" />}
          trend="up"
          trendValue="+5%"
        />
      </div>

      <Tabs defaultValue="dieux" className="mb-8">
        <TabsList className="border border-rome-gold/30 bg-rome-parchment">
          <TabsTrigger value="dieux" className="data-[state=active]:bg-white">Panthéon</TabsTrigger>
          <TabsTrigger value="cultes" className="data-[state=active]:bg-white">Cultes Familiaux</TabsTrigger>
          <TabsTrigger value="divination" className="data-[state=active]:bg-white">Divination</TabsTrigger>
          <TabsTrigger value="calendrier" className="data-[state=active]:bg-white">Calendrier Religieux</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dieux" className="pt-4">
          <RomanCard className="mb-6">
            <RomanCard.Header>
              <h3 className="font-cinzel text-lg text-rome-navy">Dieux Principaux</h3>
            </RomanCard.Header>
            <RomanCard.Content>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {["Jupiter", "Junon", "Minerve", "Mars", "Vénus", "Apollon"].map((dieu) => (
                  <div key={dieu} className="border border-rome-gold/30 rounded-md p-4 bg-white hover:border-rome-gold/60 transition-all">
                    <h4 className="font-cinzel text-lg mb-2">{dieu}</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Description de {dieu} et son importance dans le panthéon romain.
                    </p>
                    <div className="flex justify-between mt-auto">
                      <span className="text-xs bg-rome-parchment px-2 py-1 rounded-full">Faveur: Neutre</span>
                      <Button variant="outline" className="text-xs roman-btn-outline">Honorer</Button>
                    </div>
                  </div>
                ))}
              </div>
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
        
        <TabsContent value="cultes" className="pt-4">
          <RomanCard>
            <RomanCard.Header>
              <h3 className="font-cinzel text-lg text-rome-navy">Lares et Pénates</h3>
            </RomanCard.Header>
            <RomanCard.Content>
              <p className="text-muted-foreground mb-4">
                Votre famille honore ses ancêtres et les esprits protecteurs de votre domus.
              </p>
              
              <div className="border border-rome-gold/30 rounded-md p-4 bg-rome-parchment/50 mb-4">
                <h4 className="font-cinzel font-medium mb-2">Laraire familial</h4>
                <p className="text-sm">
                  Le laraire de votre domus principale est bien entretenu et les offrandes quotidiennes sont faites régulièrement, assurant la protection des lares.
                </p>
                <div className="mt-3 flex justify-end">
                  <Button variant="outline" className="text-xs roman-btn-outline">Faire une offrande</Button>
                </div>
              </div>
              
              <div className="border border-rome-gold/30 rounded-md p-4 bg-rome-parchment/50">
                <h4 className="font-cinzel font-medium mb-2">Culte des ancêtres</h4>
                <p className="text-sm">
                  Les masques de cire des ancêtres sont honorés et exposés lors des occasions importantes, maintenant les liens avec les générations passées.
                </p>
                <div className="mt-3 flex justify-end">
                  <Button variant="outline" className="text-xs roman-btn-outline">Commémorer un ancêtre</Button>
                </div>
              </div>
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
        
        <TabsContent value="divination" className="pt-4">
          <RomanCard>
            <RomanCard.Header>
              <h3 className="font-cinzel text-lg text-rome-navy">Augures et Présages</h3>
            </RomanCard.Header>
            <RomanCard.Content>
              <p className="italic text-center mb-6">
                "Consulter les signes divins avant toute décision importante est la marque d'un vrai Romain pieux."
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-rome-gold/30 rounded-md p-4 bg-white hover:border-rome-gold/60 transition-all">
                  <h4 className="font-cinzel font-medium mb-2">Auspices</h4>
                  <p className="text-sm mb-3">
                    Consulter le vol des oiseaux pour déterminer si une action a la faveur des dieux.
                  </p>
                  <Button className="w-full bg-rome-navy hover:bg-rome-navy/90">Consulter un augure</Button>
                </div>
                
                <div className="border border-rome-gold/30 rounded-md p-4 bg-white hover:border-rome-gold/60 transition-all">
                  <h4 className="font-cinzel font-medium mb-2">Haruspicine</h4>
                  <p className="text-sm mb-3">
                    Examiner les entrailles d'animaux sacrifiés pour prédire l'avenir ou déterminer la volonté divine.
                  </p>
                  <Button className="w-full bg-rome-navy hover:bg-rome-navy/90">Consulter un haruspice</Button>
                </div>
              </div>
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
        
        <TabsContent value="calendrier" className="pt-4">
          <RomanCard>
            <RomanCard.Header>
              <h3 className="font-cinzel text-lg text-rome-navy">Fêtes et Célébrations</h3>
            </RomanCard.Header>
            <RomanCard.Content>
              <div className="space-y-4">
                {[
                  { nom: "Saturnales", date: "17-23 Décembre", dieu: "Saturne", importance: "Majeure" },
                  { nom: "Lupercales", date: "15 Février", dieu: "Faunus", importance: "Importante" },
                  { nom: "Vestalia", date: "7-15 Juin", dieu: "Vesta", importance: "Importante" },
                  { nom: "Parentalia", date: "13-21 Février", dieu: "Mânes", importance: "Significative" },
                ].map((fete) => (
                  <div key={fete.nom} className="border border-rome-gold/30 rounded-md p-4 bg-white hover:border-rome-gold/60 transition-all">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-cinzel font-medium">{fete.nom}</h4>
                        <p className="text-xs text-muted-foreground">En l'honneur de {fete.dieu}</p>
                      </div>
                      <span className="bg-rome-gold/10 px-2 py-1 rounded-full text-xs font-medium">
                        {fete.date}
                      </span>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        fete.importance === "Majeure" 
                          ? "bg-red-100 text-red-800" 
                          : fete.importance === "Importante" 
                            ? "bg-amber-100 text-amber-800"
                            : "bg-blue-100 text-blue-800"
                      }`}>
                        {fete.importance}
                      </span>
                      <Button variant="outline" className="text-xs roman-btn-outline">Détails</Button>
                    </div>
                  </div>
                ))}
              </div>
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Religion;
