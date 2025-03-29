import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus, Save, Edit, Trash2, ArrowDown, ArrowUp } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { v4 as uuid } from 'uuid';
import {
  Equilibre,
  HistoriqueEntry,
  RiskFactor,
  PoliticalBalanceCardProps,
  SocialStabilityCardProps,
  EconomicStabilityCardProps
} from '@/components/maitrejeu/types/equilibre';
import { useGameTime } from '@/hooks/useGameTime';
import { gameDateToString } from './components/lois/utils/dateConverter';
import { DatePicker } from '@/components/ui/date-picker';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { RiskFactorLevel } from './types/equilibre';
import { gameDateToDate } from './components/lois/utils/dateConverter';

const initialEquilibreState: Equilibre = {
  id: uuid(),
  political: {
    populares: 50,
    optimates: 50,
    moderates: 50,
  },
  social: {
    patriciens: 50,
    plebeiens: 50,
  },
  economy: 50,
  stability: 50,
  historique: []
};

const initialRiskFactors: RiskFactor[] = [
  {
    id: "1",
    name: "Corruption",
    level: "medium",
    type: "economic",
    description: "La corruption gangrène l'économie romaine.",
    threat: 60
  },
  {
    id: "2",
    name: "Tensions sociales",
    level: "high",
    type: "social",
    description: "Les inégalités sociales provoquent des tensions.",
    threat: 75
  },
  {
    id: "3",
    name: "Instabilité politique",
    level: "medium", 
    type: "political",
    description: "Les luttes de pouvoir fragilisent la République.",
    threat: 50
  },
  {
    id: "4",
    name: "Menace militaire",
    level: "low",
    type: "military",
    description: "Les frontières sont menacées par des peuples barbares.",
    threat: 30
  }
];

export const GestionEquilibre = () => {
  const [equilibre, setEquilibre] = useState<Equilibre>(initialEquilibreState);
  const [historicalEvents, setHistoricalEvents] = useState<HistoriqueEntry[]>([]);
  const [newEvent, setNewEvent] = useState<Omit<HistoriqueEntry, 'date'>>({ event: '', impact: {} });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [riskFactors, setRiskFactors] = useState<RiskFactor[]>(initialRiskFactors);
  const [newRiskFactor, setNewRiskFactor] = useState<Omit<RiskFactor, 'threat'>>();
  const [editingRiskFactorId, setEditingRiskFactorId] = useState<string | null>(null);
  const [editedRiskFactor, setEditedRiskFactor] = useState<RiskFactor | null>(null);
  const { toast } = useToast();
  const { year, season } = useGameTime();

  useEffect(() => {
    // Load data from local storage or an API here
    // For now, we'll use the initial state
  }, []);

  const handlePoliticalUpdate = (populares: number, optimates: number, moderates: number) => {
    setEquilibre(prev => ({
      ...prev,
      political: { populares, optimates, moderates }
    }));
  };

  const handleSocialUpdate = (patriciens: number, plebeiens: number) => {
    setEquilibre(prev => ({
      ...prev,
      social: { patriciens, plebeiens }
    }));
  };

  const handleEconomicUpdate = (economy: number) => {
    setEquilibre(prev => ({
      ...prev,
      economy
    }));
  };

  const handleAddEvent = () => {
    if (!selectedDate || !newEvent.event) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une date et entrer un événement.",
      });
      return;
    }

    const newHistoricalEvent: HistoriqueEntry = {
      date: selectedDate,
      event: newEvent.event,
      impact: newEvent.impact
    };

    setHistoricalEvents(prev => [...prev, newHistoricalEvent]);
    setNewEvent({ event: '', impact: {} });
    setSelectedDate(undefined);
    toast({
      title: "Succès",
      description: "Événement ajouté avec succès.",
    });
  };

  const handleDeleteEvent = (index: number) => {
    setHistoricalEvents(prev => {
      const newEvents = [...prev];
      newEvents.splice(index, 1);
      return newEvents;
    });
    toast({
      title: "Succès",
      description: "Événement supprimé avec succès.",
    });
  };

  const handleAddRiskFactor = () => {
    if (!newRiskFactor?.name || !newRiskFactor?.type || !newRiskFactor?.description) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs du facteur de risque.",
      });
      return;
    }

    const newRiskFactorWithThreat: RiskFactor = {
      ...newRiskFactor,
      threat: 50 // Default threat level
    };

    setRiskFactors(prev => [...prev, newRiskFactorWithThreat]);
    setNewRiskFactor(undefined);
    toast({
      title: "Succès",
      description: "Facteur de risque ajouté avec succès.",
    });
  };

  const handleEditRiskFactor = (riskFactor: RiskFactor) => {
    setEditingRiskFactorId(riskFactor.id);
    setEditedRiskFactor({ ...riskFactor });
  };

  const handleCancelEditRiskFactor = () => {
    setEditingRiskFactorId(null);
    setEditedRiskFactor(null);
  };

  const handleUpdateRiskFactor = () => {
    if (!editedRiskFactor) return;

    setRiskFactors(prev =>
      prev.map(rf => (rf.id === editedRiskFactor.id ? editedRiskFactor : rf))
    );
    setEditingRiskFactorId(null);
    setEditedRiskFactor(null);
    toast({
      title: "Succès",
      description: "Facteur de risque mis à jour avec succès.",
    });
  };

  const handleDeleteRiskFactor = (riskFactorId: string) => {
    setRiskFactors(prev => prev.filter(rf => rf.id !== riskFactorId));
    toast({
      title: "Succès",
      description: "Facteur de risque supprimé avec succès.",
    });
  };

  const sortedEvents = [...historicalEvents].sort((a, b) => {
    // Use our date conversion utility instead of direct Date constructor
    const dateA = typeof a.date === 'string' ? new Date() : 
      typeof a.date === 'object' && 'year' in a.date ? 
      gameDateToDate(a.date) : new Date();
    
    const dateB = typeof b.date === 'string' ? new Date() : 
      typeof b.date === 'object' && 'year' in b.date ? 
      gameDateToDate(b.date) : new Date();
    
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Gestion de l'Équilibre</h1>
      <p className="text-muted-foreground">
        Surveillez et ajustez les différents aspects de l'équilibre de Rome
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Équilibre Politique</CardTitle>
            <CardDescription>
              Gérez l'influence des différentes factions politiques
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PoliticalBalanceCard
              populares={equilibre.political?.populaires || 50}
              optimates={equilibre.political?.optimates || 50}
              moderates={equilibre.political?.moderates || 50}
              onUpdate={handlePoliticalUpdate}
              equilibre={equilibre}
            />
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Stabilité Sociale</CardTitle>
            <CardDescription>
              Surveillez les tensions entre les différentes classes sociales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SocialStabilityCard
              patriciens={equilibre.social?.patriciens || 50}
              plebeiens={equilibre.social?.plebeiens || 50}
              onUpdate={handleSocialUpdate}
              equilibre={equilibre}
            />
          </CardContent>
        </Card>

        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Stabilité Économique</CardTitle>
            <CardDescription>
              Ajustez les paramètres économiques pour assurer la prospérité
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EconomicStabilityCard
              economy={equilibre.economy || 50}
              onUpdate={handleEconomicUpdate}
              equilibre={equilibre}
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Facteurs de Risque</CardTitle>
            <CardDescription>
              Identifiez et gérez les menaces potentielles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {riskFactors.map(riskFactor => (
                  <div key={riskFactor.id} className="border rounded-md p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-medium">{riskFactor.name}</h3>
                        <p className="text-sm text-muted-foreground">{riskFactor.description}</p>
                        <Badge variant="secondary">{riskFactor.type}</Badge>
                        <Badge>{riskFactor.level}</Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditRiskFactor(riskFactor)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteRiskFactor(riskFactor.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
          <CardHeader>
            <CardTitle>Ajouter un facteur de risque</CardTitle>
            <CardDescription>
              Ajouter un facteur de risque
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="name">Nom</Label>
                <Input
                  type="text"
                  id="name"
                  value={newRiskFactor?.name || ""}
                  onChange={(e) => setNewRiskFactor(prev => ({ ...prev, name: e.target.value }))}
                  className="col-span-2"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="type">Type</Label>
                <Select onValueChange={(value) => setNewRiskFactor(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger className="col-span-2">
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="political">Politique</SelectItem>
                    <SelectItem value="economic">Économique</SelectItem>
                    <SelectItem value="social">Social</SelectItem>
                    <SelectItem value="military">Militaire</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newRiskFactor?.description || ""}
                  onChange={(e) => setNewRiskFactor(prev => ({ ...prev, description: e.target.value }))}
                  className="col-span-2"
                />
              </div>
              <Button onClick={handleAddRiskFactor}>Ajouter</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Événements Historiques</CardTitle>
            <CardDescription>
              Enregistrez les événements marquants de l'histoire de Rome
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      {selectedDate ? (
                        format(selectedDate, "PPP")
                      ) : (
                        <span>Choisir une date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="event">Événement</Label>
                <Textarea
                  id="event"
                  value={newEvent.event}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, event: e.target.value }))}
                  className="col-span-2"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="impact">Impact Politique</Label>
                <Input
                  type="number"
                  id="impact"
                  value={newEvent.impact.political || 0}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, impact: { ...prev.impact, political: Number(e.target.value) } }))}
                  className="col-span-2"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="impact">Impact Social</Label>
                <Input
                  type="number"
                  id="impact"
                  value={newEvent.impact.social || 0}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, impact: { ...prev.impact, social: Number(e.target.value) } }))}
                  className="col-span-2"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="impact">Impact Économique</Label>
                <Input
                  type="number"
                  id="impact"
                  value={newEvent.impact.economic || 0}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, impact: { ...prev.impact, economic: Number(e.target.value) } }))}
                  className="col-span-2"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="impact">Impact Stabilité</Label>
                <Input
                  type="number"
                  id="impact"
                  value={newEvent.impact.stability || 0}
                  onChange={(e) => setNewEvent(prev => ({ ...prev, impact: { ...prev.impact, stability: Number(e.target.value) } }))}
                  className="col-span-2"
                />
              </div>
              <Button onClick={handleAddEvent}>Ajouter</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Chronologie des Événements</CardTitle>
          <CardDescription>
            Visualisez l'évolution de Rome à travers les événements historiques
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {sortedEvents.map((event, index) => (
                <div key={index} className="border rounded-md p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium">{event.event}</h3>
                      <p className="text-sm text-muted-foreground">
                        {typeof event.date === 'string' 
                          ? event.date 
                          : event.date instanceof Date 
                            ? event.date.toLocaleDateString()
                            : gameDateToString(event.date)
                        }
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteEvent(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};
