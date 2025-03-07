
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatBox } from '@/components/ui-custom/StatBox';
import { Heart, Calendar, UserCheck, Trophy, Flame } from 'lucide-react';
import { useCharacters } from '@/components/famille/hooks/useCharacters';
import { VestaleCandidate } from '@/components/religion/VestaleCandidate';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from "sonner";

const Religion = () => {
  const { localCharacters } = useCharacters();
  const [selectedDeity, setSelectedDeity] = useState<string | null>(null);
  
  // Filtrer les jeunes femmes non mariées éligibles pour devenir vestales
  const eligibleVestales = localCharacters.filter(char => 
    char.gender === 'female' && 
    char.age >= 6 && 
    char.age <= 10 && 
    !char.spouse
  );

  // Liste des flamines (prêtres attachés à une divinité spécifique)
  // Normalement ces données viendraient d'une API ou d'un contexte
  const flamines = [
    { id: '1', name: 'Marcus Tullius', deity: 'Jupiter', isPlayer: false },
    { id: '2', name: 'Lucius Cornelius', deity: 'Mars', isPlayer: true },
    { id: '3', name: 'Gaius Aurelius', deity: 'Apollon', isPlayer: false }
  ];
  
  // Grand prêtre (Pontifex Maximus)
  const grandPretre = { 
    name: 'Quintus Caecilius Metellus', 
    title: 'Pontifex Maximus',
    isClient: true
  };

  // Dieux principaux avec leur description et statut de faveur
  const dieuxPrincipaux = [
    {
      nom: "Jupiter",
      description: "Dieu du ciel et de la foudre, divinité suprême du panthéon romain.",
      faveur: "Neutre",
      flamine: flamines.find(f => f.deity === 'Jupiter')?.name || 'Vacant'
    },
    {
      nom: "Junon",
      description: "Déesse du mariage et de la maternité, protectrice des femmes.",
      faveur: "Favorable",
      flamine: flamines.find(f => f.deity === 'Junon')?.name || 'Vacant'
    },
    {
      nom: "Minerve",
      description: "Déesse de la sagesse, des arts et de la stratégie militaire.",
      faveur: "Favorable",
      flamine: flamines.find(f => f.deity === 'Minerve')?.name || 'Vacant'
    },
    {
      nom: "Mars",
      description: "Dieu de la guerre, protecteur de Rome et de ses légions.",
      faveur: "Neutre",
      flamine: flamines.find(f => f.deity === 'Mars')?.name || 'Vacant'
    },
    {
      nom: "Vénus",
      description: "Déesse de l'amour, de la beauté et de la fertilité.",
      faveur: "Défavorable",
      flamine: flamines.find(f => f.deity === 'Vénus')?.name || 'Vacant'
    },
    {
      nom: "Apollon",
      description: "Dieu des arts, de la musique, de la poésie et de la médecine.",
      faveur: "Neutre",
      flamine: flamines.find(f => f.deity === 'Apollon')?.name || 'Vacant'
    }
  ];

  // Fonction pour proposer une candidate vestale
  const proposeVestale = (characterId: string) => {
    // Dans une vraie application, cela enverrait une requête au backend
    toast.success("Votre candidate a été proposée au collège des vestales", {
      description: "Vous recevrez une réponse dans les prochains jours",
    });
  };

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
          <TabsTrigger value="vestales" className="data-[state=active]:bg-white">Vestales</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dieux" className="pt-4">
          <RomanCard className="mb-4">
            <RomanCard.Header>
              <div className="flex justify-between items-center">
                <h3 className="font-cinzel text-lg text-rome-navy">Grand Prêtre de Rome</h3>
                <span className="text-sm bg-rome-gold/10 px-2 py-1 rounded-full">
                  {grandPretre.title}
                </span>
              </div>
            </RomanCard.Header>
            <RomanCard.Content>
              <div className="flex items-center gap-3">
                <div className="bg-rome-navy/10 rounded-full p-2">
                  <Flame className="h-5 w-5 text-rome-gold" />
                </div>
                <div>
                  <p className="font-cinzel">{grandPretre.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {grandPretre.isClient ? "Client de votre famille" : "Indépendant"}
                  </p>
                </div>
              </div>
            </RomanCard.Content>
          </RomanCard>

          <RomanCard className="mb-6">
            <RomanCard.Header>
              <h3 className="font-cinzel text-lg text-rome-navy">Dieux Principaux</h3>
            </RomanCard.Header>
            <RomanCard.Content>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dieuxPrincipaux.map((dieu) => (
                  <div key={dieu.nom} className="border border-rome-gold/30 rounded-md p-4 bg-white hover:border-rome-gold/60 transition-all">
                    <h4 className="font-cinzel text-lg mb-2">{dieu.nom}</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      {dieu.description}
                    </p>
                    <div className="flex items-center gap-2 mb-3">
                      <Flame className="h-4 w-4 text-rome-gold" />
                      <span className="text-sm">Flamine: {dieu.flamine}</span>
                    </div>
                    <div className="flex justify-between mt-auto">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        dieu.faveur === "Favorable" 
                          ? "bg-green-100 text-green-800" 
                          : dieu.faveur === "Défavorable" 
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                      }`}>
                        Faveur: {dieu.faveur}
                      </span>
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

        <TabsContent value="vestales" className="pt-4">
          <RomanCard>
            <RomanCard.Header>
              <h3 className="font-cinzel text-lg text-rome-navy">Vierges Vestales</h3>
            </RomanCard.Header>
            <RomanCard.Content>
              <div className="mb-6">
                <p className="mb-4">
                  Devenir vestale est l'un des plus grands honneurs pour une jeune romaine. Les vestales sont choisies entre l'âge de 6 et 10 ans et servent la déesse pendant 30 ans.
                </p>
                <div className="bg-rome-parchment/70 border border-rome-gold/20 rounded p-3 mb-4">
                  <h4 className="font-cinzel font-medium mb-2">Avantages pour la famille</h4>
                  <ul className="list-disc list-inside text-sm space-y-1">
                    <li>Prestige considérable pour toute la famille</li>
                    <li>Influence religieuse importante</li>
                    <li>Privilèges juridiques et sociaux exceptionnels</li>
                    <li>Faveur des dieux</li>
                  </ul>
                </div>
              </div>

              {eligibleVestales.length > 0 ? (
                <div>
                  <h4 className="font-cinzel text-base mb-3">Candidates potentielles</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {eligibleVestales.map(candidate => (
                      <VestaleCandidate 
                        key={candidate.id}
                        candidate={candidate}
                        onPropose={proposeVestale}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 border border-dashed border-rome-gold/30 rounded-md">
                  <p className="text-muted-foreground">
                    Aucune jeune fille de votre famille n'est actuellement éligible pour devenir vestale.
                  </p>
                  <p className="text-sm mt-2">
                    Les candidates doivent avoir entre 6 et 10 ans et ne pas être mariées.
                  </p>
                </div>
              )}
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Religion;
