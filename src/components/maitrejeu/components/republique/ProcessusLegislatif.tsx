
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Vote, History, Search } from 'lucide-react';
import { ActionButton } from '@/components/ui-custom/ActionButton';

export const ProcessusLegislatif: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('projets');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processus Législatif</CardTitle>
        <CardDescription>
          Gérez les propositions de loi et le processus de vote
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Filtres et recherche */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher une loi..."
                className="pl-8 px-3 py-2 border rounded-md w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <ActionButton 
              variant="default"
              label="Nouvelle proposition"
              icon={<Plus className="h-4 w-4" />}
              onClick={() => console.log('Nouvelle proposition')}
            />
          </div>
        </div>

        {/* Onglets */}
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="mb-6">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="projets">Projets de loi</TabsTrigger>
            <TabsTrigger value="votes">Votes en cours</TabsTrigger>
            <TabsTrigger value="historique">Historique</TabsTrigger>
          </TabsList>
          
          <TabsContent value="projets" className="pt-6">
            <ProjetsDeLoi searchTerm={searchTerm} />
          </TabsContent>
          
          <TabsContent value="votes" className="pt-6">
            <VotesEnCours searchTerm={searchTerm} />
          </TabsContent>
          
          <TabsContent value="historique" className="pt-6">
            <HistoriqueLois searchTerm={searchTerm} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

// Composant pour les projets de loi
const ProjetsDeLoi: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  // Données fictives
  const projets = [
    { id: '1', titre: 'Lex Agraria', auteur: 'Gaius Gracchus', date: '05/06/230 av. J.-C.', statut: 'En rédaction' },
    { id: '2', titre: 'Lex de Maiestate', auteur: 'Julius Caesar', date: '12/08/230 av. J.-C.', statut: 'En examen' },
    { id: '3', titre: 'Lex Frumentaria', auteur: 'Marcus Aurelius', date: '23/09/230 av. J.-C.', statut: 'Prêt pour vote' }
  ];

  // Filtrer les projets selon le terme de recherche
  const filteredProjets = projets.filter(projet => 
    projet.titre.toLowerCase().includes(searchTerm.toLowerCase()) || 
    projet.auteur.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {filteredProjets.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          Aucun projet de loi ne correspond à vos critères
        </div>
      ) : (
        filteredProjets.map(projet => (
          <div key={projet.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/20">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full bg-amber-100">
                <FileText className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-medium">{projet.titre}</h3>
                <p className="text-sm text-muted-foreground">Proposé par {projet.auteur} le {projet.date}</p>
                <div className="mt-1">
                  <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                    {projet.statut}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Modifier</Button>
              <Button variant="default" size="sm">
                {projet.statut === 'Prêt pour vote' ? 'Soumettre au vote' : 'Voir détails'}
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

// Composant pour les votes en cours
const VotesEnCours: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  // Données fictives
  const votes = [
    { 
      id: '1', 
      titre: 'Lex Militaris', 
      auteur: 'Lucius Quinctius Cincinnatus', 
      dateDebut: '01/10/230 av. J.-C.', 
      dateFin: '08/10/230 av. J.-C.',
      pour: 65,
      contre: 35,
      abstention: 10
    },
    { 
      id: '2', 
      titre: 'Lex Justitiae', 
      auteur: 'Cicero', 
      dateDebut: '03/10/230 av. J.-C.', 
      dateFin: '10/10/230 av. J.-C.',
      pour: 45,
      contre: 55,
      abstention: 5
    }
  ];

  // Filtrer les votes selon le terme de recherche
  const filteredVotes = votes.filter(vote => 
    vote.titre.toLowerCase().includes(searchTerm.toLowerCase()) || 
    vote.auteur.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {filteredVotes.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          Aucun vote en cours ne correspond à vos critères
        </div>
      ) : (
        filteredVotes.map(vote => (
          <div key={vote.id} className="flex flex-col p-4 border rounded-lg hover:bg-muted/20">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-green-100">
                  <Vote className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">{vote.titre}</h3>
                  <p className="text-sm text-muted-foreground">
                    Proposé par {vote.auteur} • Vote du {vote.dateDebut} au {vote.dateFin}
                  </p>
                </div>
              </div>
              <div>
                <Button variant="default" size="sm">Gérer le vote</Button>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="text-center p-2 bg-green-50 rounded-md">
                <div className="text-lg font-bold text-green-600">{vote.pour}</div>
                <div className="text-xs text-muted-foreground">Pour</div>
              </div>
              <div className="text-center p-2 bg-red-50 rounded-md">
                <div className="text-lg font-bold text-red-600">{vote.contre}</div>
                <div className="text-xs text-muted-foreground">Contre</div>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded-md">
                <div className="text-lg font-bold text-gray-600">{vote.abstention}</div>
                <div className="text-xs text-muted-foreground">Abstention</div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

// Composant pour l'historique des lois
const HistoriqueLois: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  // Données fictives
  const lois = [
    { id: '1', titre: 'Lex Porcia', auteur: "Cato l'Ancien", date: '12/03/230 av. J.-C.', resultat: 'Adoptée', votes: '95/15/5' },
    { id: '2', titre: 'Lex Publilia', auteur: 'Publilius Philo', date: '05/04/230 av. J.-C.', resultat: 'Rejetée', votes: '35/75/5' },
    { id: '3', titre: 'Lex Hortensia', auteur: 'Quintus Hortensius', date: '27/06/230 av. J.-C.', resultat: 'Adoptée', votes: '85/25/5' }
  ];

  // Filtrer les lois selon le terme de recherche
  const filteredLois = lois.filter(loi => 
    loi.titre.toLowerCase().includes(searchTerm.toLowerCase()) || 
    loi.auteur.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {filteredLois.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          Aucune loi dans l'historique ne correspond à vos critères
        </div>
      ) : (
        filteredLois.map(loi => (
          <div key={loi.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/20">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full bg-purple-100">
                <History className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium">{loi.titre}</h3>
                <p className="text-sm text-muted-foreground">Proposé par {loi.auteur} le {loi.date}</p>
                <div className="mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    loi.resultat === 'Adoptée' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {loi.resultat} ({loi.votes})
                  </span>
                </div>
              </div>
            </div>
            <div>
              <Button variant="outline" size="sm">Consulter</Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
