
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SenatComposition } from '@/components/maitrejeu/components/republique/SenatComposition';

// Importez d'autres composants ici au besoin

const Republique = () => {
  const { section } = useParams();
  const [activeTab, setActiveTab] = useState(section || 'senat');

  return (
    <Layout>
      <div className="container mx-auto py-6 px-4 max-w-7xl">
        <header className="mb-6">
          <h1 className="text-3xl font-bold font-cinzel mb-2">La République Romaine</h1>
          <p className="text-muted-foreground">
            Explorez les institutions romaines, consultez les lois en vigueur et suivez les magistratures actuelles.
          </p>
        </header>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-6 md:w-full w-full">
            <TabsTrigger value="senat">Sénat</TabsTrigger>
            <TabsTrigger value="magistratures">Magistratures</TabsTrigger>
            <TabsTrigger value="lois">Lois</TabsTrigger>
            <TabsTrigger value="justice">Justice</TabsTrigger>
            <TabsTrigger value="domaines">Terres Publiques</TabsTrigger>
            <TabsTrigger value="batiments">Bâtiments Publics</TabsTrigger>
          </TabsList>

          <TabsContent value="senat" className="space-y-6">
            <SenatComposition role="player" />
          </TabsContent>

          <TabsContent value="magistratures">
            <div className="grid grid-cols-1 gap-6">
              <div className="p-8 text-center border rounded-lg bg-muted/20">
                <h3 className="text-xl font-semibold mb-2">Magistratures en construction</h3>
                <p className="text-muted-foreground">
                  Cette section sera bientôt disponible. Vous pourrez consulter les magistratures actuelles,
                  leur rôle, et les élections à venir.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="lois">
            <div className="grid grid-cols-1 gap-6">
              <div className="p-8 text-center border rounded-lg bg-muted/20">
                <h3 className="text-xl font-semibold mb-2">Lois en construction</h3>
                <p className="text-muted-foreground">
                  Cette section sera bientôt disponible. Vous pourrez consulter les lois en vigueur,
                  les propositions législatives, et l'historique des votes.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="justice">
            <div className="grid grid-cols-1 gap-6">
              <div className="p-8 text-center border rounded-lg bg-muted/20">
                <h3 className="text-xl font-semibold mb-2">Justice en construction</h3>
                <p className="text-muted-foreground">
                  Cette section sera bientôt disponible. Vous pourrez consulter les procès en cours,
                  les verdicts récents, et les prochaines audiences.
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
            <div className="grid grid-cols-1 gap-6">
              <div className="p-8 text-center border rounded-lg bg-muted/20">
                <h3 className="text-xl font-semibold mb-2">Bâtiments publics en construction</h3>
                <p className="text-muted-foreground">
                  Cette section sera bientôt disponible. Vous pourrez consulter les bâtiments publics,
                  les projets de construction et les propositions d'amélioration.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Republique;
