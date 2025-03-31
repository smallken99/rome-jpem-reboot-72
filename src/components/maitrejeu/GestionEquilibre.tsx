
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useMaitreJeu } from './context/MaitreJeuContext';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { EquilibreOverview } from './components/equilibre/EquilibreOverview';
import { RecentEventsTable } from './components/equilibre/RecentEventsTable';
import { Risk } from './types/equilibre';
import { formatAnyDate, isGameDate } from './types/common';

export const GestionEquilibre: React.FC = () => {
  const { equilibre, updateEquilibre, updateFactionBalance } = useMaitreJeu();
  
  const [localEquilibre, setLocalEquilibre] = useState({
    populaires: equilibre.political.populaires,
    optimates: equilibre.political.optimates,
    moderates: equilibre.political.moderates,
    patriciens: equilibre.social.patriciens,
    plébéiens: equilibre.social.plébéiens,
    economie: equilibre.economie,
    stability: equilibre.stability,
    armée: equilibre.armée,
    loyauté: equilibre.loyauté,
    morale: equilibre.morale,
    religion: equilibre.religion,
    facteurJuridique: equilibre.facteurJuridique,
  });
  
  const [activeSlider, setActiveSlider] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [politicalDialog, setPoliticalDialog] = useState(false);
  const [socialDialog, setSocialDialog] = useState(false);
  const [economicDialog, setEconomicDialog] = useState(false);
  const [otherDialog, setOtherDialog] = useState(false);
  const [newRiskDialog, setNewRiskDialog] = useState(false);
  
  // States for new risk
  const [newRisk, setNewRisk] = useState<Partial<Risk>>({
    type: 'political',
    name: '',
    description: '',
    severity: 5,
    active: true,
    impact: {}
  });
  
  // Political pie chart data
  const politicalData = [
    { name: 'Populares', value: localEquilibre.populaires, color: '#ef4444' },
    { name: 'Optimates', value: localEquilibre.optimates, color: '#3b82f6' },
    { name: 'Modérés', value: localEquilibre.moderates, color: '#84cc16' }
  ];
  
  // Social pie chart data
  const socialData = [
    { name: 'Patriciens', value: localEquilibre.patriciens, color: '#8b5cf6' },
    { name: 'Plébéiens', value: localEquilibre.plébéiens, color: '#f59e0b' }
  ];
  
  // Stability factors data for bar chart
  const stabilityFactors = [
    { name: 'Économie', value: localEquilibre.economie, color: '#f59e0b' },
    { name: 'Stabilité', value: localEquilibre.stability, color: '#3b82f6' },
    { name: 'Armée', value: localEquilibre.armée, color: '#ef4444' },
    { name: 'Loyauté', value: localEquilibre.loyauté, color: '#84cc16' },
    { name: 'Morale', value: localEquilibre.morale, color: '#8b5cf6' },
    { name: 'Religion', value: localEquilibre.religion, color: '#ec4899' },
    { name: 'Juridique', value: localEquilibre.facteurJuridique, color: '#0ea5e9' }
  ];
  
  // Handle updating political balance
  const handleUpdatePolitical = () => {
    updateFactionBalance(
      localEquilibre.populaires,
      localEquilibre.optimates,
      localEquilibre.moderates
    );
    setPoliticalDialog(false);
  };
  
  // Handle updating social balance
  const handleUpdateSocial = (values: { plebeiens: number; patriciens: number; esclaves: number; cohesion: number; }) => {
    // Convert parameter to match expected format
    const adaptedValues = {
      patriciens: values.patriciens,
      plébéiens: values.plebeiens // Match the expected property name
    };
    
    updateEquilibre({
      social: {
        patriciens: adaptedValues.patriciens,
        plébéiens: adaptedValues.plébéiens
      },
      patriciens: adaptedValues.patriciens,
      plébéiens: adaptedValues.plébéiens
    });
    setSocialDialog(false);
  };
  
  // Handle updating economic factors
  const handleUpdateEconomic = (values: { stabilite: number; croissance: number; commerce: number; agriculture: number; }) => {
    // Convert complex value to simple number for economie
    const economieValue = Math.round((values.stabilite + values.croissance + values.commerce + values.agriculture) / 4);
    
    updateEquilibre({
      economie: economieValue,
      economy: economieValue,
      économie: economieValue,
      economicStability: economieValue
    });
    setEconomicDialog(false);
  };
  
  // Handle updating other stability factors
  const handleUpdateOther = () => {
    updateEquilibre({
      stability: localEquilibre.stability,
      armée: localEquilibre.armée,
      loyauté: localEquilibre.loyauté,
      morale: localEquilibre.morale,
      religion: localEquilibre.religion,
      facteurJuridique: localEquilibre.facteurJuridique
    });
    setOtherDialog(false);
  };
  
  // Handle adding a new risk
  const handleAddRisk = () => {
    const risk: Risk = {
      id: Math.random().toString(36).substring(2, 11),
      type: newRisk.type as RiskType,
      name: newRisk.name || '',
      description: newRisk.description || '',
      severity: newRisk.severity || 5,
      createdAt: new Date().toISOString(),
      active: newRisk.active || true,
      impact: newRisk.impact || {}
    };
    
    updateEquilibre({
      risques: [...equilibre.risques, risk]
    });
    
    setNewRisk({
      type: 'political',
      name: '',
      description: '',
      severity: 5,
      active: true,
      impact: {}
    });
    setNewRiskDialog(false);
  };
  
  // Function to handle slider changes
  const handleSliderChange = (key: string, value: number[]) => {
    setLocalEquilibre(prev => ({
      ...prev,
      [key]: value[0]
    }));
  };
  
  // Function to format date for display
  const formatDate = (date: Date | { year: number, season: string }) => {
    if (isGameDate(date)) {
      return formatAnyDate(date);
    } else if (date instanceof Date) {
      return date.toLocaleString();
    }
    return String(date);
  };
  
  return (
    <div className="space-y-6 p-6">
      <header>
        <h2 className="text-3xl font-bold tracking-tight">Équilibre de la République</h2>
        <p className="text-muted-foreground">
          Gérez l'équilibre politique, social et économique de la République Romaine.
        </p>
      </header>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Aperçu général</TabsTrigger>
          <TabsTrigger value="political">Politique</TabsTrigger>
          <TabsTrigger value="stability">Stabilité</TabsTrigger>
          <TabsTrigger value="risks">Risques</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <EquilibreOverview equilibre={equilibre} />
        </TabsContent>
        
        <TabsContent value="political">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Équilibre politique</CardTitle>
                  <Dialog open={politicalDialog} onOpenChange={setPoliticalDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">Modifier</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Équilibre des factions politiques</DialogTitle>
                        <DialogDescription>
                          Ajustez la répartition des pouvoirs entre les factions. Le total doit être égal à 100%.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="populaires">Populares ({localEquilibre.populaires}%)</Label>
                          <Slider
                            id="populaires"
                            min={0}
                            max={100}
                            step={1}
                            value={[localEquilibre.populaires]}
                            onValueChange={(value) => handleSliderChange('populaires', value)}
                            className="[&_[role=slider]]:bg-red-500"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="optimates">Optimates ({localEquilibre.optimates}%)</Label>
                          <Slider
                            id="optimates"
                            min={0}
                            max={100}
                            step={1}
                            value={[localEquilibre.optimates]}
                            onValueChange={(value) => handleSliderChange('optimates', value)}
                            className="[&_[role=slider]]:bg-blue-500"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="moderates">Modérés ({localEquilibre.moderates}%)</Label>
                          <Slider
                            id="moderates"
                            min={0}
                            max={100}
                            step={1}
                            value={[localEquilibre.moderates]}
                            onValueChange={(value) => handleSliderChange('moderates', value)}
                            className="[&_[role=slider]]:bg-green-500"
                          />
                        </div>
                        <div className="mt-2 text-sm text-right">
                          Total: {localEquilibre.populaires + localEquilibre.optimates + localEquilibre.moderates}%
                          {(localEquilibre.populaires + localEquilibre.optimates + localEquilibre.moderates) !== 100 && (
                            <span className="text-red-500 ml-2">Le total doit être égal à 100%</span>
                          )}
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setPoliticalDialog(false)}
                        >
                          Annuler
                        </Button>
                        <Button
                          onClick={handleUpdatePolitical}
                          disabled={(localEquilibre.populaires + localEquilibre.optimates + localEquilibre.moderates) !== 100}
                        >
                          Sauvegarder
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={politicalData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {politicalData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Équilibre social</CardTitle>
                  <Dialog open={socialDialog} onOpenChange={setSocialDialog}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">Modifier</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Équilibre social</DialogTitle>
                        <DialogDescription>
                          Ajustez la répartition entre classes sociales. 
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="patriciens">Patriciens ({localEquilibre.patriciens}%)</Label>
                          <Slider
                            id="patriciens"
                            min={0}
                            max={100}
                            step={1}
                            value={[localEquilibre.patriciens]}
                            onValueChange={(value) => handleSliderChange('patriciens', value)}
                            className="[&_[role=slider]]:bg-purple-500"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="plébéiens">Plébéiens ({localEquilibre.plébéiens}%)</Label>
                          <Slider
                            id="plébéiens"
                            min={0}
                            max={100}
                            step={1}
                            value={[localEquilibre.plébéiens]}
                            onValueChange={(value) => handleSliderChange('plébéiens', value)}
                            className="[&_[role=slider]]:bg-amber-500"
                          />
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setSocialDialog(false)}
                        >
                          Annuler
                        </Button>
                        <Button
                          onClick={() => handleUpdateSocial({
                            patriciens: localEquilibre.patriciens,
                            plebeiens: localEquilibre.plébéiens,
                            esclaves: 0, // Default value
                            cohesion: 0  // Default value
                          })}
                        >
                          Sauvegarder
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={socialData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {socialData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Économie</CardTitle>
                <Dialog open={economicDialog} onOpenChange={setEconomicDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">Modifier</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Facteurs économiques</DialogTitle>
                      <DialogDescription>
                        Ajustez les différents facteurs qui influencent l'économie romaine.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="economie">Stabilité économique ({localEquilibre.economie})</Label>
                        <Slider
                          id="economie"
                          min={0}
                          max={100}
                          step={1}
                          value={[localEquilibre.economie]}
                          onValueChange={(value) => handleSliderChange('economie', value)}
                          className="[&_[role=slider]]:bg-amber-500"
                        />
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setEconomicDialog(false)}
                      >
                        Annuler
                      </Button>
                      <Button
                        onClick={() => handleUpdateEconomic({ 
                          stabilite: localEquilibre.economie, 
                          croissance: localEquilibre.economie, 
                          commerce: localEquilibre.economie, 
                          agriculture: localEquilibre.economie 
                        })}
                      >
                        Sauvegarder
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center items-center text-center h-24">
                <div>
                  <h3 className="text-6xl font-bold">{localEquilibre.economie}</h3>
                  <p className="text-muted-foreground mt-2">Indice économique</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6">
            <RecentEventsTable events={equilibre.historique.slice(0, 5)} />
          </div>
        </TabsContent>
        
        <TabsContent value="stability">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Facteurs de stabilité</CardTitle>
                <Dialog open={otherDialog} onOpenChange={setOtherDialog}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">Modifier</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Facteurs de stabilité</DialogTitle>
                      <DialogDescription>
                        Ajustez les divers facteurs qui influencent la stabilité de la République.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid gap-4 py-4 md:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="stability">Stabilité générale ({localEquilibre.stability})</Label>
                        <Slider
                          id="stability"
                          min={0}
                          max={100}
                          step={1}
                          value={[localEquilibre.stability]}
                          onValueChange={(value) => handleSliderChange('stability', value)}
                          className="[&_[role=slider]]:bg-blue-500"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="armée">Force militaire ({localEquilibre.armée})</Label>
                        <Slider
                          id="armée"
                          min={0}
                          max={100}
                          step={1}
                          value={[localEquilibre.armée]}
                          onValueChange={(value) => handleSliderChange('armée', value)}
                          className="[&_[role=slider]]:bg-red-500"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="loyauté">Loyauté du peuple ({localEquilibre.loyauté})</Label>
                        <Slider
                          id="loyauté"
                          min={0}
                          max={100}
                          step={1}
                          value={[localEquilibre.loyauté]}
                          onValueChange={(value) => handleSliderChange('loyauté', value)}
                          className="[&_[role=slider]]:bg-green-500"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="morale">Morale publique ({localEquilibre.morale})</Label>
                        <Slider
                          id="morale"
                          min={0}
                          max={100}
                          step={1}
                          value={[localEquilibre.morale]}
                          onValueChange={(value) => handleSliderChange('morale', value)}
                          className="[&_[role=slider]]:bg-purple-500"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="religion">Piété et religion ({localEquilibre.religion})</Label>
                        <Slider
                          id="religion"
                          min={0}
                          max={100}
                          step={1}
                          value={[localEquilibre.religion]}
                          onValueChange={(value) => handleSliderChange('religion', value)}
                          className="[&_[role=slider]]:bg-pink-500"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="facteurJuridique">Cadre juridique ({localEquilibre.facteurJuridique})</Label>
                        <Slider
                          id="facteurJuridique"
                          min={0}
                          max={100}
                          step={1}
                          value={[localEquilibre.facteurJuridique]}
                          onValueChange={(value) => handleSliderChange('facteurJuridique', value)}
                          className="[&_[role=slider]]:bg-sky-500"
                        />
                      </div>
                    </div>
                    
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setOtherDialog(false)}
                      >
                        Annuler
                      </Button>
                      <Button
                        onClick={handleUpdateOther}
                      >
                        Sauvegarder
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={stabilityFactors}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip formatter={(value) => `${value}/100`} />
                  <Legend />
                  <Bar dataKey="value" name="Valeur" radius={[0, 10, 10, 0]}>
                    {stabilityFactors.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="risks">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Risques actuels</h3>
            <Dialog open={newRiskDialog} onOpenChange={setNewRiskDialog}>
              <DialogTrigger asChild>
                <Button>Ajouter un risque</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Ajouter un nouveau risque</DialogTitle>
                  <DialogDescription>
                    Définissez un nouveau facteur de risque pour la République.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="risk-type">Type de risque</Label>
                    <select
                      id="risk-type"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={newRisk.type}
                      onChange={(e) => setNewRisk({ ...newRisk, type: e.target.value as RiskType })}
                    >
                      <option value="political">Politique</option>
                      <option value="economic">Économique</option>
                      <option value="military">Militaire</option>
                      <option value="social">Social</option>
                      <option value="religious">Religieux</option>
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="risk-name">Nom du risque</Label>
                    <Input
                      id="risk-name"
                      value={newRisk.name || ''}
                      onChange={(e) => setNewRisk({ ...newRisk, name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="risk-description">Description</Label>
                    <Textarea
                      id="risk-description"
                      value={newRisk.description || ''}
                      onChange={(e) => setNewRisk({ ...newRisk, description: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="risk-severity">Sévérité ({newRisk.severity || 5}/10)</Label>
                    <Slider
                      id="risk-severity"
                      min={1}
                      max={10}
                      step={1}
                      value={[newRisk.severity || 5]}
                      onValueChange={(value) => setNewRisk({ ...newRisk, severity: value[0] })}
                      className="[&_[role=slider]]:bg-red-500"
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setNewRiskDialog(false)}>
                    Annuler
                  </Button>
                  <Button onClick={handleAddRisk}>
                    Ajouter
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          {equilibre.risques.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-muted-foreground">Aucun risque actif pour le moment.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {equilibre.risques.map((risk) => (
                <Card key={risk.id} className={`border-l-4 ${
                  risk.severity >= 8 ? 'border-l-red-500' :
                  risk.severity >= 5 ? 'border-l-amber-500' :
                  'border-l-blue-500'
                }`}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{risk.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {risk.type.charAt(0).toUpperCase() + risk.type.slice(1)} • Sévérité: {risk.severity}/10
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Modifier</Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => updateEquilibre({
                            risques: equilibre.risques.filter(r => r.id !== risk.id)
                          })}
                        >
                          Supprimer
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{risk.description}</p>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Ajouté le {formatDate(new Date(risk.createdAt))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          <h3 className="text-xl font-semibold mt-8 mb-4">Historique d'équilibre</h3>
          <Card>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Date</th>
                    <th className="text-left p-3">Événement</th>
                    <th className="text-left p-3">Modifications</th>
                  </tr>
                </thead>
                <tbody>
                  {equilibre.historique.map((entry, index) => (
                    <tr key={index} className="border-b hover:bg-secondary/5">
                      <td className="p-3">{entry.date}</td>
                      <td className="p-3">{entry.event || '-'}</td>
                      <td className="p-3">
                        {Object.entries(entry.values).map(([key, value]) => (
                          <div key={key} className="text-sm">
                            {key}: {value > 0 ? `+${value}` : value}
                          </div>
                        ))}
                      </td>
                    </tr>
                  ))}
                  {equilibre.historique.length === 0 && (
                    <tr>
                      <td colSpan={3} className="p-4 text-center text-muted-foreground">
                        Aucune entrée historique disponible.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
