
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SenatComposition } from '@/components/maitrejeu/components/republique/SenatComposition';
import { MagistraturesList } from '@/components/maitrejeu/components/republique/MagistraturesList';
import { ProcessusLegislatif } from '@/components/maitrejeu/components/republique/ProcessusLegislatif';
import { SystemeJudiciaire } from '@/components/maitrejeu/components/republique/SystemeJudiciaire';
import { RelationsDiplomatiques } from '@/components/maitrejeu/components/republique/RelationsDiplomatiques';
import { GestionBatimentsPage } from '@/components/republique/batiments/GestionBatimentsPage';
import { FunctionCard } from '@/components/republique/ui/FunctionCard';
import { AgerPublicusPage } from '@/components/republique/ager/AgerPublicusPage';
import { ConsulBureau } from '@/components/republique/bureaux/consul/ConsulBureau';
import { PreteurBureau } from '@/components/republique/bureaux/preteur/PreteurBureau';
import { EdileBureau } from '@/components/republique/bureaux/edile/EdileBureau';
import { QuesteurBureau } from '@/components/republique/bureaux/questeur/QuesteurBureau';
import { CenseurBureau } from '@/components/republique/bureaux/censeur/CenseurBureau';
import { RepubliqueMain } from '@/components/republique/pages/RepubliqueMain';
import { BatimentsPage } from '@/components/republique/pages/BatimentsPage';
import { TresorPublicPage } from '@/components/republique/pages/TresorPublicPage';

import { 
  Building, 
  Landmark, 
  Gavel, 
  Scale, 
  Globe, 
  Scroll, 
  Coins, 
  Map, 
  Users
} from 'lucide-react';

const Republique = () => {
  const { section, bureauId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(section || 'senat');
  
  // Mettre à jour l'URL lorsque l'onglet change
  useEffect(() => {
    if (activeTab && activeTab !== section) {
      navigate(`/republique/${activeTab}`, { replace: true });
    }
  }, [activeTab, navigate, section]);

  // Si nous sommes sur une route de bureau ou une autre route spécifique, rendre directement le contenu
  if (bureauId) {
    return (
      <Layout>
        <div className="container mx-auto py-6 px-4 max-w-7xl">
          {bureauId === 'consul' && <ConsulBureau />}
          {bureauId === 'preteur' && <PreteurBureau />}
          {bureauId === 'edile' && <EdileBureau />}
          {bureauId === 'questeur' && <QuesteurBureau />}
          {bureauId === 'censeur' && <CenseurBureau />}
        </div>
      </Layout>
    );
  }

  // Fonctions des institutions
  const institutions = [
    {
      title: "Sénat",
      description: "Assemblée des patriciens et dirigeants de la République",
      icon: <Users className="h-6 w-6" />,
      color: "bg-blue-100",
      iconColor: "text-blue-700",
      tab: "senat"
    },
    {
      title: "Magistratures",
      description: "Postes officiels et élections de la République",
      icon: <Landmark className="h-6 w-6" />,
      color: "bg-amber-100",
      iconColor: "text-amber-700",
      tab: "magistratures"
    },
    {
      title: "Lois",
      description: "Législation en vigueur et propositions de loi",
      icon: <Scroll className="h-6 w-6" />,
      color: "bg-purple-100",
      iconColor: "text-purple-700",
      tab: "lois"
    },
    {
      title: "Justice",
      description: "Tribunaux, procès et jugements",
      icon: <Scale className="h-6 w-6" />,
      color: "bg-red-100",
      iconColor: "text-red-700",
      tab: "justice"
    },
    {
      title: "Diplomatie",
      description: "Relations avec les autres peuples et nations",
      icon: <Globe className="h-6 w-6" />,
      color: "bg-green-100",
      iconColor: "text-green-700",
      tab: "diplomatie"
    },
    {
      title: "Trésor Public",
      description: "Finances publiques de la République",
      icon: <Coins className="h-6 w-6" />,
      color: "bg-yellow-100",
      iconColor: "text-yellow-700",
      tab: "tresor"
    },
    {
      title: "Terres Publiques",
      description: "Domaines appartenant à la République",
      icon: <Map className="h-6 w-6" />,
      color: "bg-emerald-100",
      iconColor: "text-emerald-700",
      tab: "domaines"
    },
    {
      title: "Bâtiments Publics",
      description: "Infrastructure de Rome et des provinces",
      icon: <Building className="h-6 w-6" />,
      color: "bg-indigo-100",
      iconColor: "text-indigo-700",
      tab: "batiments"
    }
  ];

  // Utiliser les Routes pour les contenus principaux
  return (
    <Layout>
      <div className="container mx-auto py-6 px-4 max-w-7xl">
        <Routes>
          <Route index element={
            <>
              <header className="mb-6">
                <h1 className="text-3xl font-bold font-cinzel mb-2">La République Romaine</h1>
                <p className="text-muted-foreground">
                  Explorez les institutions romaines, consultez les lois en vigueur et suivez les magistratures actuelles.
                </p>
              </header>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {institutions.map((institution) => (
                  <FunctionCard
                    key={institution.tab}
                    title={institution.title}
                    description={institution.description}
                    icon={institution.icon}
                    color={institution.color}
                    iconColor={institution.iconColor}
                    onClick={() => navigate(`/republique/${institution.tab}`)}
                  />
                ))}
              </div>
            </>
          } />
          
          <Route path="bureaux/*" element={<RepubliqueMain />} />
          <Route path="ager/*" element={<AgerPublicusPage />} />
          <Route path="batiments/*" element={<BatimentsPage />} />
          
          <Route path=":section" element={
            <>
              <header className="mb-6">
                <h1 className="text-3xl font-bold font-cinzel mb-2">La République Romaine</h1>
                <p className="text-muted-foreground">
                  Explorez les institutions romaines, consultez les lois en vigueur et suivez les magistratures actuelles.
                </p>
              </header>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList className="grid grid-cols-4 md:grid-cols-8 md:w-full w-full overflow-x-auto">
                  <TabsTrigger value="senat">Sénat</TabsTrigger>
                  <TabsTrigger value="magistratures">Magistratures</TabsTrigger>
                  <TabsTrigger value="lois">Lois</TabsTrigger>
                  <TabsTrigger value="justice">Justice</TabsTrigger>
                  <TabsTrigger value="diplomatie">Diplomatie</TabsTrigger>
                  <TabsTrigger value="tresor">Trésor</TabsTrigger>
                  <TabsTrigger value="domaines">Terres Publiques</TabsTrigger>
                  <TabsTrigger value="batiments">Bâtiments Publics</TabsTrigger>
                </TabsList>

                <TabsContent value="senat" className="space-y-6">
                  <SenatComposition role="player" />
                </TabsContent>

                <TabsContent value="magistratures">
                  <MagistraturesList />
                </TabsContent>

                <TabsContent value="lois">
                  <ProcessusLegislatif />
                </TabsContent>

                <TabsContent value="justice">
                  <SystemeJudiciaire />
                </TabsContent>

                <TabsContent value="diplomatie">
                  <RelationsDiplomatiques />
                </TabsContent>

                <TabsContent value="tresor">
                  <TresorPublicPage />
                </TabsContent>

                <TabsContent value="domaines">
                  <AgerPublicusPage />
                </TabsContent>

                <TabsContent value="batiments">
                  <BatimentsPage />
                </TabsContent>
              </Tabs>
            </>
          } />
        </Routes>
      </div>
    </Layout>
  );
};

export default Republique;
