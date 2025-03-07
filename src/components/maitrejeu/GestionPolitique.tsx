
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Search, Plus, AlertTriangle, Bookmark, ListPlus, Gavel, Scroll, FilePlus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertMessage } from '@/components/ui-custom/AlertMessage';
import { formatRomanDate } from '@/utils/formatUtils';

// Types pour les événements et lois
type EventType = 'crisis' | 'natural' | 'political' | 'religious' | 'military';
type LawType = 'economic' | 'political' | 'religious' | 'military' | 'social';

interface GameEvent {
  id: string;
  title: string;
  description: string;
  type: EventType;
  severity: 1 | 2 | 3 | 4 | 5;
  year: number;
  season: string;
  status: 'active' | 'scheduled' | 'completed';
  effects: string[];
}

interface GameLaw {
  id: string;
  name: string;
  proposedBy: string;
  description: string;
  type: LawType;
  impact: 1 | 2 | 3 | 4 | 5;
  year: number;
  season: string;
  status: 'proposed' | 'approved' | 'rejected' | 'scheduled';
  supportNeeded: number;
  currentSupport: number;
}

// Données d'exemple
const mockEvents: GameEvent[] = [
  {
    id: "1",
    title: "Invasion des Gaules",
    description: "Des tribus gauloises menacent la frontière nord",
    type: "military",
    severity: 4,
    year: 632,
    season: "Printemps",
    status: "active",
    effects: ["Mobilisation militaire", "Levée d'impôts spéciaux", "Instabilité politique"]
  },
  {
    id: "2",
    title: "Mauvaise récolte",
    description: "Les récoltes ont été mauvaises dans plusieurs provinces",
    type: "natural",
    severity: 3,
    year: 632,
    season: "Été",
    status: "scheduled",
    effects: ["Prix des céréales augmenté", "Mécontentement populaire", "Risque de famine"]
  },
  {
    id: "3",
    title: "Scandale au Sénat",
    description: "Un consul a été accusé de corruption",
    type: "political",
    severity: 2,
    year: 631,
    season: "Hiver",
    status: "completed",
    effects: ["Confiance diminuée envers les magistrats", "Procès public", "Opportunité pour les réformateurs"]
  }
];

const mockLaws: GameLaw[] = [
  {
    id: "1",
    name: "Lex Agraria",
    proposedBy: "Tiberius Gracchus",
    description: "Redistribution des terres publiques aux citoyens sans terre",
    type: "economic",
    impact: 5,
    year: 632,
    season: "Printemps",
    status: "proposed",
    supportNeeded: 60,
    currentSupport: 45
  },
  {
    id: "2",
    name: "Lex Militaris",
    proposedBy: "Gaius Marius",
    description: "Réforme de l'armée romaine pour permettre l'enrôlement des prolétaires",
    type: "military",
    impact: 4,
    year: 632,
    season: "Été",
    status: "scheduled",
    supportNeeded: 55,
    currentSupport: 40
  },
  {
    id: "3",
    name: "Lex Judiciaria",
    proposedBy: "Marcus Livius Drusus",
    description: "Transfert des tribunaux de l'ordre équestre au Sénat",
    type: "political",
    impact: 3,
    year: 631,
    season: "Automne",
    status: "approved",
    supportNeeded: 50,
    currentSupport: 65
  }
];

export const GestionPolitique: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('evenements');
  const [events, setEvents] = useState<GameEvent[]>(mockEvents);
  const [laws, setLaws] = useState<GameLaw[]>(mockLaws);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showAddLaw, setShowAddLaw] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredLaws = laws.filter(law => 
    law.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    law.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddEvent = () => {
    toast({
      title: "Événement ajouté",
      description: "L'événement a été programmé avec succès",
    });
    setShowAddEvent(false);
  };

  const handleAddLaw = () => {
    toast({
      title: "Loi proposée",
      description: "La nouvelle loi a été soumise au Sénat",
    });
    setShowAddLaw(false);
  };

  const getEventTypeLabel = (type: EventType): string => {
    switch(type) {
      case 'crisis': return 'Crise';
      case 'natural': return 'Naturel';
      case 'political': return 'Politique';
      case 'religious': return 'Religieux';
      case 'military': return 'Militaire';
      default: return type;
    }
  };

  const getEventTypeClass = (type: EventType): string => {
    switch(type) {
      case 'crisis': return 'bg-red-100 text-red-800';
      case 'natural': return 'bg-green-100 text-green-800';
      case 'political': return 'bg-blue-100 text-blue-800';
      case 'religious': return 'bg-purple-100 text-purple-800';
      case 'military': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLawTypeLabel = (type: LawType): string => {
    switch(type) {
      case 'economic': return 'Économique';
      case 'political': return 'Politique';
      case 'religious': return 'Religieuse';
      case 'military': return 'Militaire';
      case 'social': return 'Sociale';
      default: return type;
    }
  };

  const getLawTypeClass = (type: LawType): string => {
    switch(type) {
      case 'economic': return 'bg-emerald-100 text-emerald-800';
      case 'political': return 'bg-blue-100 text-blue-800';
      case 'religious': return 'bg-purple-100 text-purple-800';
      case 'military': return 'bg-amber-100 text-amber-800';
      case 'social': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLawStatusLabel = (status: string): string => {
    switch(status) {
      case 'proposed': return 'Proposée';
      case 'approved': return 'Approuvée';
      case 'rejected': return 'Rejetée';
      case 'scheduled': return 'Planifiée';
      default: return status;
    }
  };

  const getLawStatusClass = (status: string): string => {
    switch(status) {
      case 'proposed': return 'bg-blue-100 text-blue-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'scheduled': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="evenements" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="evenements" className="flex items-center gap-1">
            <AlertTriangle className="h-4 w-4" />
            Événements & Crises
          </TabsTrigger>
          <TabsTrigger value="lois" className="flex items-center gap-1">
            <Scroll className="h-4 w-4" />
            Lois & Édits
          </TabsTrigger>
        </TabsList>

        {/* Événements & Crises */}
        <TabsContent value="evenements" className="space-y-4 pt-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Rechercher un événement..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <Button onClick={() => setShowAddEvent(!showAddEvent)}>
                <Plus className="h-4 w-4 mr-2" />
                Nouvel événement
              </Button>
            </div>
          </div>

          {showAddEvent && (
            <div className="bg-muted/20 p-4 rounded-md border border-muted">
              <h3 className="font-medium mb-3">Créer un événement</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="event-title">Titre</Label>
                  <Input id="event-title" placeholder="ex: Invasion des Gaules" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event-type">Type</Label>
                  <Select defaultValue="political">
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="crisis">Crise</SelectItem>
                      <SelectItem value="natural">Naturel</SelectItem>
                      <SelectItem value="political">Politique</SelectItem>
                      <SelectItem value="religious">Religieux</SelectItem>
                      <SelectItem value="military">Militaire</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event-severity">Sévérité (1-5)</Label>
                  <Select defaultValue="3">
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner la sévérité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 - Mineure</SelectItem>
                      <SelectItem value="2">2 - Modérée</SelectItem>
                      <SelectItem value="3">3 - Significative</SelectItem>
                      <SelectItem value="4">4 - Grave</SelectItem>
                      <SelectItem value="5">5 - Critique</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event-status">Statut</Label>
                  <Select defaultValue="scheduled">
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Actif immédiatement</SelectItem>
                      <SelectItem value="scheduled">Planifié</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="event-description">Description</Label>
                  <Textarea 
                    id="event-description" 
                    placeholder="Décrivez l'événement en détail..."
                    className="min-h-[100px]"
                  />
                </div>
              </div>

              <div className="pt-2 border-t flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setShowAddEvent(false)}>Annuler</Button>
                <Button onClick={handleAddEvent}>Créer l'événement</Button>
              </div>
            </div>
          )}

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Événement</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Sévérité</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Aucun événement trouvé avec ces critères.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>
                        <div className="font-medium">{event.title}</div>
                        <div className="text-xs text-muted-foreground line-clamp-1">{event.description}</div>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${getEventTypeClass(event.type)}`}>
                          {getEventTypeLabel(event.type)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div 
                              key={i}
                              className={`w-2 h-4 mx-0.5 rounded-sm ${i < event.severity ? 'bg-amber-500' : 'bg-gray-200'}`}
                            />
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        {formatRomanDate(event.year, event.season, 1)}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          event.status === 'active' ? 'bg-red-100 text-red-800' :
                          event.status === 'scheduled' ? 'bg-amber-100 text-amber-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {event.status === 'active' ? 'Actif' :
                           event.status === 'scheduled' ? 'Planifié' : 'Terminé'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8"
                            onClick={() => toast({ title: "Action simulée", description: "Édition de l'événement" })}
                          >
                            Modifier
                          </Button>
                          {event.status === 'scheduled' && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-8 text-amber-600"
                              onClick={() => toast({ title: "Action simulée", description: "Activation de l'événement" })}
                            >
                              Activer
                            </Button>
                          )}
                          {event.status === 'active' && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-8 text-green-600"
                              onClick={() => toast({ title: "Action simulée", description: "Clôture de l'événement" })}
                            >
                              Terminer
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <AlertMessage
            type="warning"
            title="Impact sur le jeu"
            message="Les événements influencent directement l'équilibre du jeu. Utilisez-les avec parcimonie."
          />
        </TabsContent>

        {/* Lois & Édits */}
        <TabsContent value="lois" className="space-y-4 pt-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Rechercher une loi..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <Button onClick={() => setShowAddLaw(!showAddLaw)}>
                <Gavel className="h-4 w-4 mr-2" />
                Proposer une loi
              </Button>
            </div>
          </div>

          {showAddLaw && (
            <div className="bg-muted/20 p-4 rounded-md border border-muted">
              <h3 className="font-medium mb-3">Proposer une loi</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="law-name">Nom de la loi</Label>
                  <Input id="law-name" placeholder="ex: Lex Agraria" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="law-proposer">Proposée par</Label>
                  <Input id="law-proposer" placeholder="ex: Tiberius Gracchus" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="law-type">Type</Label>
                  <Select defaultValue="economic">
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="economic">Économique</SelectItem>
                      <SelectItem value="political">Politique</SelectItem>
                      <SelectItem value="religious">Religieuse</SelectItem>
                      <SelectItem value="military">Militaire</SelectItem>
                      <SelectItem value="social">Sociale</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="law-impact">Impact (1-5)</Label>
                  <Select defaultValue="3">
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner l'impact" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 - Mineur</SelectItem>
                      <SelectItem value="2">2 - Modéré</SelectItem>
                      <SelectItem value="3">3 - Significatif</SelectItem>
                      <SelectItem value="4">4 - Important</SelectItem>
                      <SelectItem value="5">5 - Transformatif</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="law-description">Description</Label>
                  <Textarea 
                    id="law-description" 
                    placeholder="Décrivez les effets et objectifs de la loi..."
                    className="min-h-[100px]"
                  />
                </div>
              </div>

              <div className="pt-2 border-t flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setShowAddLaw(false)}>Annuler</Button>
                <Button onClick={handleAddLaw}>Proposer la loi</Button>
              </div>
            </div>
          )}

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Loi</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Proposée par</TableHead>
                  <TableHead>Support</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLaws.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Aucune loi trouvée avec ces critères.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLaws.map((law) => (
                    <TableRow key={law.id}>
                      <TableCell>
                        <div className="font-medium">{law.name}</div>
                        <div className="text-xs text-muted-foreground line-clamp-1">{law.description}</div>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${getLawTypeClass(law.type)}`}>
                          {getLawTypeLabel(law.type)}
                        </span>
                      </TableCell>
                      <TableCell>{law.proposedBy}</TableCell>
                      <TableCell>
                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${law.currentSupport >= law.supportNeeded ? 'bg-green-500' : 'bg-amber-500'}`}
                            style={{ width: `${(law.currentSupport / law.supportNeeded) * 100}%` }}
                          ></div>
                        </div>
                        <div className="text-xs mt-1">
                          {law.currentSupport}/{law.supportNeeded} voix
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${getLawStatusClass(law.status)}`}>
                          {getLawStatusLabel(law.status)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8"
                            onClick={() => toast({ title: "Action simulée", description: "Édition de la loi" })}
                          >
                            Modifier
                          </Button>
                          {(law.status === 'proposed' || law.status === 'scheduled') && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-8 text-green-600"
                              onClick={() => toast({ title: "Action simulée", description: "Approbation de la loi" })}
                            >
                              Approuver
                            </Button>
                          )}
                          {law.status === 'proposed' && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-8 text-red-600"
                              onClick={() => toast({ title: "Action simulée", description: "Rejet de la loi" })}
                            >
                              Rejeter
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <AlertMessage
            type="info"
            title="Processus législatif"
            message="Les lois doivent être approuvées par le Sénat. Vous pouvez influencer le nombre de votes nécessaires et les soutiens actuels."
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
