
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Calendar, Book } from 'lucide-react';
import { Loi } from './types';
import { useMaitreJeu } from './context';
import { MagistratureTypes } from './types/index';
import { Season } from './types/common';
import { v4 as uuidv4 } from 'uuid';

export const GestionPolitique = () => {
  const { lois, addLoi, currentYear, currentSeason, scheduleElection } = useMaitreJeu();
  const [selectedTab, setSelectedTab] = useState('lois');
  const [showAddLoi, setShowAddLoi] = useState(false);
  const [newLoi, setNewLoi] = useState<Omit<Loi, 'id' | 'date' | 'état' | 'votesPositifs' | 'votesNégatifs' | 'votesAbstention' | 'effets'>>({
    titre: '',
    description: '',
    proposeur: '',
    catégorie: 'politique',
    importance: 'normale'
  });
  
  const handleAddLoi = () => {
    if (!newLoi.titre || !newLoi.description) return;
    
    // Ajouter ID à la nouvelle loi
    const loiWithId = {
      ...newLoi,
      id: uuidv4(), // Utiliser UUID pour générer un ID unique
      date: { year: currentYear, season: currentSeason },
      état: "proposée" as const,
      votesPositifs: 0,
      votesNégatifs: 0,
      votesAbstention: 0,
      effets: {}
    };
    
    addLoi(loiWithId);
    setNewLoi({
      titre: '',
      description: '',
      proposeur: '',
      catégorie: 'politique',
      importance: 'normale'
    });
    setShowAddLoi(false);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: keyof Omit<Loi, 'id' | 'date' | 'état' | 'votesPositifs' | 'votesNégatifs' | 'votesAbstention' | 'effets'>) => {
    setNewLoi({ ...newLoi, [field]: e.target.value });
  };
  
  const handleSelectChange = (value: string, field: keyof Omit<Loi, 'id' | 'date' | 'état' | 'votesPositifs' | 'votesNégatifs' | 'votesAbstention' | 'effets'>) => {
    setNewLoi({ ...newLoi, [field]: value });
  };
  
  // Remplacer la fonction handleScheduleElection par une version compatible
  const handleScheduleElection = (magistrature: MagistratureType, year: number, season: Season) => {
    scheduleElection(magistrature, year, season);
  };
  
  return (
    <div className="p-4">
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="lois">Gestion des Lois</TabsTrigger>
          <TabsTrigger value="élections">Planification des Élections</TabsTrigger>
        </TabsList>
        
        <TabsContent value="lois">
          <Card>
            <CardHeader>
              <CardTitle>Lois en vigueur</CardTitle>
              <CardDescription>Liste des lois actuellement en discussion au Sénat.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-none pl-0">
                {lois.map(loi => (
                  <li key={loi.id} className="py-2 border-b border-gray-200 last:border-b-0">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{loi.titre}</h3>
                        <p className="text-sm text-gray-500">{loi.description}</p>
                      </div>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">
                          <Book className="h-4 w-4 mr-2" />
                          Voir détails
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              
              <Button variant="secondary" className="mt-4" onClick={() => setShowAddLoi(true)}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Proposer une nouvelle loi
              </Button>
            </CardContent>
          </Card>
          
          {showAddLoi && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
              <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3 text-center">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Proposer une nouvelle loi</h3>
                  <div className="mt-2">
                    <Input
                      placeholder="Titre de la loi"
                      value={newLoi.titre}
                      onChange={(e) => handleInputChange(e, 'titre')}
                      className="mb-2"
                    />
                    <Input
                      placeholder="Proposeur"
                      value={newLoi.proposeur}
                      onChange={(e) => handleInputChange(e, 'proposeur')}
                      className="mb-2"
                    />
                    <Select onValueChange={(value) => handleSelectChange(value, 'catégorie')}>
                      <SelectTrigger className="w-full mb-2">
                        <SelectValue placeholder="Catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="politique">Politique</SelectItem>
                        <SelectItem value="social">Social</SelectItem>
                        <SelectItem value="économique">Économique</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select onValueChange={(value) => handleSelectChange(value, 'importance')}>
                      <SelectTrigger className="w-full mb-2">
                        <SelectValue placeholder="Importance" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="majeure">Majeure</SelectItem>
                        <SelectItem value="mineure">Mineure</SelectItem>
                        <SelectItem value="normale">Normale</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Description"
                      value={newLoi.description}
                      onChange={(e) => handleInputChange(e, 'description')}
                      className="mb-2"
                    />
                  </div>
                  <div className="items-center px-4 py-3">
                    <Button variant="secondary" onClick={handleAddLoi} className="mr-2">
                      Proposer
                    </Button>
                    <Button variant="ghost" onClick={() => setShowAddLoi(false)}>
                      Annuler
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="élections">
          <Card>
            <CardHeader>
              <CardTitle>Planification des élections</CardTitle>
              <CardDescription>Sélectionnez une magistrature et une date pour planifier une élection.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Magistrature" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consul">Consul</SelectItem>
                      <SelectItem value="préteur">Préteur</SelectItem>
                      <SelectItem value="édile">Édile</SelectItem>
                      <SelectItem value="questeur">Questeur</SelectItem>
                      <SelectItem value="censeur">Censeur</SelectItem>
                      <SelectItem value="tribun">Tribun</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Input type="number" placeholder="Année" />
                </div>
              </div>
              <Button variant="secondary" className="mt-4">
                <Calendar className="h-4 w-4 mr-2" />
                Planifier l'élection
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
