
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, Gavel, Bookmark, Scale, Search, FileText } from 'lucide-react';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

export const SystemeJudiciaire: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('proces');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Système Judiciaire</CardTitle>
        <CardDescription>
          Gestion des procès, jugements et tribunaux
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
                placeholder="Rechercher..."
                className="pl-8 px-3 py-2 border rounded-md w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <ActionButton 
              variant="default"
              label="Nouveau procès"
              icon={<Plus className="h-4 w-4" />}
              onClick={() => console.log('Nouveau procès')}
            />
          </div>
        </div>

        {/* Onglets */}
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="mb-6">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="proces">Procès en cours</TabsTrigger>
            <TabsTrigger value="verdicts">Verdicts récents</TabsTrigger>
            <TabsTrigger value="tribunaux">Tribunaux</TabsTrigger>
          </TabsList>
          
          <TabsContent value="proces" className="pt-6">
            <ProcesEnCours searchTerm={searchTerm} />
          </TabsContent>
          
          <TabsContent value="verdicts" className="pt-6">
            <VerdictsRecents searchTerm={searchTerm} />
          </TabsContent>
          
          <TabsContent value="tribunaux" className="pt-6">
            <Tribunaux searchTerm={searchTerm} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

// Composant pour les procès en cours
const ProcesEnCours: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  // Données fictives
  const proces = [
    { 
      id: '1', 
      titre: 'République c. Marcus Claudius', 
      accusation: 'Extorsion',
      tribunal: 'Tribunal des Repetundae',
      juge: 'Préteur Lucius Cassius',
      dateDebut: '05/10/230 av. J.-C.', 
      avancement: 65,
      phase: 'Témoignages' 
    },
    { 
      id: '2', 
      titre: 'Gaius Sempronius c. Julius Marius', 
      accusation: 'Dette impayée',
      tribunal: 'Tribunal Civil',
      juge: 'Préteur Urbain',
      dateDebut: '23/09/230 av. J.-C.', 
      avancement: 30,
      phase: 'Présentation des preuves' 
    }
  ];

  // Filtrer les procès selon le terme de recherche
  const filteredProces = proces.filter(proces => 
    proces.titre.toLowerCase().includes(searchTerm.toLowerCase()) || 
    proces.accusation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proces.tribunal.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proces.juge.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {filteredProces.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          Aucun procès en cours ne correspond à vos critères
        </div>
      ) : (
        filteredProces.map(proces => (
          <div key={proces.id} className="flex flex-col p-6 border rounded-lg hover:bg-muted/20">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-amber-100">
                  <Gavel className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-medium">{proces.titre}</h3>
                  <p className="text-sm text-muted-foreground">
                    <Badge variant="outline" className="mr-2 bg-red-50 text-red-800">
                      {proces.accusation}
                    </Badge>
                    Début: {proces.dateDebut}
                  </p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-xs text-muted-foreground">{proces.tribunal}</span>
                    <span className="text-xs text-muted-foreground">Juge: {proces.juge}</span>
                  </div>
                </div>
              </div>
              <div>
                <Button variant="default" size="sm">Gérer</Button>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">Avancement: {proces.phase}</span>
                <span className="text-sm font-medium">{proces.avancement}%</span>
              </div>
              <Progress value={proces.avancement} className="h-2" />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

// Composant pour les verdicts récents
const VerdictsRecents: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  // Données fictives
  const verdicts = [
    { 
      id: '1', 
      titre: 'République c. Publius Terentius', 
      accusation: 'Détournement de fonds publics',
      resultat: 'Coupable',
      peine: 'Exil et confiscation des biens',
      tribunal: 'Tribunal des Repetundae',
      date: '01/10/230 av. J.-C.'
    },
    { 
      id: '2', 
      titre: 'Marcus Antonius c. Quintus Sertorius', 
      accusation: 'Calomnie',
      resultat: 'Non-coupable',
      peine: 'Aucune',
      tribunal: 'Tribunal des Iniuria',
      date: '28/09/230 av. J.-C.'
    }
  ];

  // Filtrer les verdicts selon le terme de recherche
  const filteredVerdicts = verdicts.filter(verdict => 
    verdict.titre.toLowerCase().includes(searchTerm.toLowerCase()) || 
    verdict.accusation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    verdict.tribunal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {filteredVerdicts.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          Aucun verdict ne correspond à vos critères
        </div>
      ) : (
        filteredVerdicts.map(verdict => (
          <div key={verdict.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/20">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full bg-purple-100">
                <Scale className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium">{verdict.titre}</h3>
                <p className="text-sm">
                  <Badge variant="outline" className="mr-2 bg-red-50 text-red-800">
                    {verdict.accusation}
                  </Badge>
                  {verdict.date}
                </p>
                <div className="mt-2 flex gap-2">
                  <Badge 
                    variant="outline" 
                    className={
                      verdict.resultat === 'Coupable' 
                        ? 'bg-red-100 text-red-800 border-red-200' 
                        : 'bg-green-100 text-green-800 border-green-200'
                    }
                  >
                    {verdict.resultat}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{verdict.peine}</span>
                </div>
              </div>
            </div>
            <div>
              <Button variant="outline" size="sm">Détails</Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

// Composant pour les tribunaux
const Tribunaux: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  // Données fictives
  const tribunaux = [
    { 
      id: '1', 
      nom: 'Tribunal des Repetundae', 
      type: 'Permanent',
      competence: 'Extorsion par des magistrats',
      president: 'Préteur Lucius Cassius',
      membresJury: 32,
      procesEnCours: 3
    },
    { 
      id: '2', 
      nom: 'Tribunal Civil', 
      type: 'Permanent',
      competence: 'Litiges civils entre citoyens',
      president: 'Préteur Urbain',
      membresJury: 0,
      procesEnCours: 8
    },
    { 
      id: '3', 
      nom: 'Tribunal des Iniuria', 
      type: 'Permanent',
      competence: 'Insultes, diffamation, coups et blessures',
      president: 'Préteur Peregrinus',
      membresJury: 15,
      procesEnCours: 1
    }
  ];

  // Filtrer les tribunaux selon le terme de recherche
  const filteredTribunaux = tribunaux.filter(tribunal => 
    tribunal.nom.toLowerCase().includes(searchTerm.toLowerCase()) || 
    tribunal.competence.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tribunal.president.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {filteredTribunaux.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          Aucun tribunal ne correspond à vos critères
        </div>
      ) : (
        filteredTribunaux.map(tribunal => (
          <div key={tribunal.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/20">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-full bg-blue-100">
                <Bookmark className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">{tribunal.nom}</h3>
                <div className="flex items-center gap-4 mt-1">
                  <Badge variant="outline" className="bg-gray-100 text-gray-800">
                    {tribunal.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground">Président: {tribunal.president}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{tribunal.competence}</p>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center">
                    <Gavel className="h-4 w-4 text-amber-500 mr-1" />
                    <span className="text-xs">{tribunal.procesEnCours} procès en cours</span>
                  </div>
                  {tribunal.membresJury > 0 && (
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-blue-500 mr-1" />
                      <span className="text-xs">{tribunal.membresJury} membres du jury</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Membres</Button>
              <Button variant="default" size="sm">Procès</Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
