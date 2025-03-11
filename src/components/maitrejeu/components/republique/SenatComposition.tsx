
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Info, Search, UserPlus } from 'lucide-react';
import { SenateurInfluenceBar } from './SenateurInfluenceBar';
import { SenateurStatusBadge } from './SenateurStatusBadge';

interface Senateur {
  id: string;
  nom: string;
  famille: string;
  age: number;
  statut: string;
  estPatricien: boolean;
  dateNaissance: string;
  influence: number;
  faction: string;
  magistrature: string | null;
}

export const SenatComposition: React.FC<{ role: 'mj' | 'player' }> = ({ role }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'patriciens' | 'plebeiens'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Données fictives des sénateurs
  const senateurs: Senateur[] = [
    { 
      id: '1', nom: 'Marcus Valerius Maximus', famille: 'Valeria', age: 45, statut: 'Actif', 
      estPatricien: true, dateNaissance: '275 av. J.-C.', influence: 75, faction: 'Optimates', 
      magistrature: 'Consul' 
    },
    { 
      id: '2', nom: 'Gaius Flaminius', famille: 'Flaminia', age: 42, statut: 'Actif', 
      estPatricien: false, dateNaissance: '278 av. J.-C.', influence: 60, faction: 'Populares', 
      magistrature: 'Préteur' 
    },
    { 
      id: '3', nom: 'Quintus Fabius Maximus', famille: 'Fabia', age: 57, statut: 'Actif', 
      estPatricien: true, dateNaissance: '263 av. J.-C.', influence: 90, faction: 'Optimates', 
      magistrature: null 
    },
    { 
      id: '4', nom: 'Tiberius Sempronius Gracchus', famille: 'Sempronia', age: 38, statut: 'Actif', 
      estPatricien: false, dateNaissance: '282 av. J.-C.', influence: 50, faction: 'Populares', 
      magistrature: 'Édile' 
    },
    { 
      id: '5', nom: 'Lucius Aemilius Paullus', famille: 'Aemilia', age: 52, statut: 'Actif', 
      estPatricien: true, dateNaissance: '268 av. J.-C.', influence: 85, faction: 'Optimates', 
      magistrature: null 
    }
  ];

  const filteredSenateurs = senateurs
    .filter(s => 
      s.nom.toLowerCase().includes(searchTerm.toLowerCase()) || 
      s.famille.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(s => {
      if (activeTab === 'patriciens') return s.estPatricien;
      if (activeTab === 'plebeiens') return !s.estPatricien;
      return true;
    });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">Composition du Sénat</CardTitle>
        {role === 'mj' && (
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-1"
          >
            <UserPlus className="h-4 w-4" /> Ajouter un sénateur
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher un sénateur..."
              className="pl-8 px-3 py-2 border rounded-md w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full sm:w-auto">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="patriciens">Patriciens</TabsTrigger>
              <TabsTrigger value="plebeiens">Plébéiens</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {filteredSenateurs.map(senateur => (
            <RomanCard key={senateur.id}>
              <RomanCard.Header>
                <div className="flex justify-between items-start">
                  <div>
                    <RomanCard.Title>{senateur.nom}</RomanCard.Title>
                    <RomanCard.Description>
                      Famille {senateur.famille} • {senateur.age} ans
                    </RomanCard.Description>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={`${senateur.estPatricien ? 'bg-purple-100 text-purple-800' : 'bg-emerald-100 text-emerald-800'}`}>
                      {senateur.estPatricien ? 'Patricien' : 'Plébéien'}
                    </Badge>
                    <SenateurStatusBadge status={senateur.statut} />
                  </div>
                </div>
              </RomanCard.Header>
              <RomanCard.Content>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Faction:</span>
                    <span className="font-medium">{senateur.faction}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Né en:</span>
                    <span className="font-medium">{senateur.dateNaissance}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Magistrature:</span>
                    <span className="font-medium">{senateur.magistrature || 'Aucune'}</span>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-muted-foreground">Influence:</span>
                      <span className="font-medium">{senateur.influence}/100</span>
                    </div>
                    <SenateurInfluenceBar influence={senateur.influence} />
                  </div>
                </div>
              </RomanCard.Content>
              <RomanCard.Footer>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Info className="h-4 w-4" /> Détails
                  </Button>
                  {role === 'mj' && (
                    <Button variant="default" size="sm">
                      Gérer
                    </Button>
                  )}
                </div>
              </RomanCard.Footer>
            </RomanCard>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
