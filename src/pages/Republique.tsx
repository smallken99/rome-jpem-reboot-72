
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SenatComposition } from '@/components/maitrejeu/components/republique/SenatComposition';
import { MagistraturesList } from '@/components/maitrejeu/components/republique/MagistraturesList';
import { ProcessusLegislatif } from '@/components/maitrejeu/components/republique/ProcessusLegislatif';
import { SystemeJudiciaire } from '@/components/maitrejeu/components/republique/SystemeJudiciaire';
import { RelationsDiplomatiques } from '@/components/maitrejeu/components/republique/RelationsDiplomatiques';
import { GestionBatimentsPage } from '@/components/republique/batiments/GestionBatimentsPage';
import { FunctionCard } from '@/components/republique/ui/FunctionCard';
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
  const { section } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(section || 'senat');
  
  // Mettre à jour l'URL lorsque l'onglet change
  useEffect(() => {
    if (activeTab && activeTab !== section) {
      navigate(`/republique/${activeTab}`, { replace: true });
    }
  }, [activeTab, navigate, section]);

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

  return (
    <Layout>
      <div className="container mx-auto py-6 px-4 max-w-7xl">
        <header className="mb-6">
          <h1 className="text-3xl font-bold font-cinzel mb-2">La République Romaine</h1>
          <p className="text-muted-foreground">
            Explorez les institutions romaines, consultez les lois en vigueur et suivez les magistratures actuelles.
          </p>
        </header>

        {/* Vue d'ensemble des institutions si aucun onglet n'est sélectionné */}
        {!section && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {institutions.map((institution) => (
              <FunctionCard
                key={institution.tab}
                title={institution.title}
                description={institution.description}
                icon={institution.icon}
                color={institution.color}
                iconColor={institution.iconColor}
                onClick={() => setActiveTab(institution.tab)}
              />
            ))}
          </div>
        )}

        {/* Onglets détaillés */}
        {section && (
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
              <div className="grid grid-cols-1 gap-6">
                <div className="p-8 text-center border rounded-lg bg-muted/20">
                  <h3 className="text-xl font-semibold mb-2">Trésor Public en construction</h3>
                  <p className="text-muted-foreground">
                    Cette section sera bientôt disponible. Vous pourrez consulter les finances publiques,
                    les revenus et dépenses de la République.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="domaines">
              <div className="grid grid-cols-1 gap-6">
                <div className="p-8 text-center border rounded-lg bg-muted/20">
                  <h3 className="text-xl font-semibold mb-2">Terres publiques en construction</h3>
                  <p className="text-muted-foreground">
                    Cette section sera bientôt disponible. Vous pourrez consulter la répartition des terres publiques,
                    les concessions et les projets de développement.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="batiments">
              <GestionBatimentsPage />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </Layout>
  );
};

export default Republique;
