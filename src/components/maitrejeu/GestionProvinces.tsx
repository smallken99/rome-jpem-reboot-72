
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Globe, Search, Swords, Plus, MapPin, Flag, Shield, User, AlertTriangle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatBox } from '@/components/ui-custom/StatBox';
import { AlertMessage } from '@/components/ui-custom/AlertMessage';
import { formatMoney } from '@/utils/formatUtils';

// Types
interface Province {
  id: string;
  name: string;
  location: string;
  governor: string | null;
  status: 'peaceful' | 'unrest' | 'rebellion' | 'war';
  wealth: number;
  taxRevenue: number;
  garrison: number;
  population: number;
}

interface MilitaryCampaign {
  id: string;
  name: string;
  location: string;
  commander: string | null;
  status: 'planned' | 'active' | 'completed' | 'failed';
  startYear: number;
  endYear?: number;
  casualties: number;
  enemiesKilled: number;
  resourceCost: number;
  victoryPoints: number;
}

// Données d'exemple
const mockProvinces: Province[] = [
  {
    id: "1",
    name: "Hispania Citerior",
    location: "Péninsule Ibérique",
    governor: "Quintus Sertorius",
    status: 'unrest',
    wealth: 4,
    taxRevenue: 120000,
    garrison: 5000,
    population: 2500000
  },
  {
    id: "2",
    name: "Gallia Cisalpina",
    location: "Nord de l'Italie",
    governor: "Gaius Flaminius",
    status: 'peaceful',
    wealth: 5,
    taxRevenue: 200000,
    garrison: 3000,
    population: 1800000
  },
  {
    id: "3",
    name: "Africa",
    location: "Nord de l'Afrique",
    governor: null,
    status: 'peaceful',
    wealth: 4,
    taxRevenue: 150000,
    garrison: 2000,
    population: 1200000
  },
  {
    id: "4",
    name: "Macedonia",
    location: "Balkans",
    governor: "Lucius Aemilius Paullus",
    status: 'war',
    wealth: 3,
    taxRevenue: 80000,
    garrison: 8000,
    population: 900000
  }
];

const mockCampaigns: MilitaryCampaign[] = [
  {
    id: "1",
    name: "Campagne contre les Lusitaniens",
    location: "Hispania Ulterior",
    commander: "Servius Sulpicius Galba",
    status: 'active',
    startYear: 631,
    casualties: 1200,
    enemiesKilled: 4500,
    resourceCost: 350000,
    victoryPoints: 150
  },
  {
    id: "2",
    name: "Pacification de la Macédoine",
    location: "Macedonia",
    commander: "Lucius Aemilius Paullus",
    status: 'active',
    startYear: 632,
    casualties: 800,
    enemiesKilled: 3200,
    resourceCost: 280000,
    victoryPoints: 120
  },
  {
    id: "3",
    name: "Annexion de Carthage",
    location: "Africa",
    commander: "Scipio Aemilianus",
    status: 'completed',
    startYear: 629,
    endYear: 631,
    casualties: 5000,
    enemiesKilled: 12000,
    resourceCost: 800000,
    victoryPoints: 500
  }
];

export const GestionProvinces: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('provinces');
  const [provinces, setProvinces] = useState<Province[]>(mockProvinces);
  const [campaigns, setCampaigns] = useState<MilitaryCampaign[]>(mockCampaigns);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const filteredProvinces = provinces.filter(province => 
    province.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    province.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (province.governor && province.governor.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredCampaigns = campaigns.filter(campaign => 
    campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    campaign.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (campaign.commander && campaign.commander.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getProvinceStatusBadge = (status: string) => {
    switch(status) {
      case 'peaceful':
        return <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Pacifiée</span>;
      case 'unrest':
        return <span className="px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-800">Agitée</span>;
      case 'rebellion':
        return <span className="px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800">Rébellion</span>;
      case 'war':
        return <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">Guerre</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  const getCampaignStatusBadge = (status: string) => {
    switch(status) {
      case 'planned':
        return <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">Planifiée</span>;
      case 'active':
        return <span className="px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-800">En cours</span>;
      case 'completed':
        return <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">Victorieuse</span>;
      case 'failed':
        return <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800">Échouée</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  const getWealthStars = (wealth: number) => {
    return Array(5).fill(0).map((_, index) => (
      <span key={index} className={`text-xs ${index < wealth ? 'text-amber-500' : 'text-gray-300'}`}>★</span>
    ));
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="provinces" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="provinces" className="flex items-center gap-1">
            <Globe className="h-4 w-4" />
            Provinces
          </TabsTrigger>
          <TabsTrigger value="campaigns" className="flex items-center gap-1">
            <Swords className="h-4 w-4" />
            Campagnes militaires
          </TabsTrigger>
        </TabsList>

        {/* Provinces */}
        <TabsContent value="provinces" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatBox
              title="Provinces contrôlées"
              value={provinces.length.toString()}
              description="Territoires romains"
              icon={<Globe className="h-6 w-6" />}
            />
            
            <StatBox
              title="Revenus provinciaux"
              value={formatMoney(provinces.reduce((sum, p) => sum + p.taxRevenue, 0), true)}
              description="Tributs annuels"
              icon={<Flag className="h-6 w-6" />}
            />
            
            <StatBox
              title="Troupes en garnison"
              value={provinces.reduce((sum, p) => sum + p.garrison, 0).toLocaleString()}
              description="Soldats déployés"
              icon={<Shield className="h-6 w-6" />}
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Rechercher une province..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <Button onClick={() => toast({ title: "Fonctionnalité simulée", description: "Ajout d'une nouvelle province" })}>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une province
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Province</TableHead>
                  <TableHead>Gouverneur</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Richesse</TableHead>
                  <TableHead>Tribut</TableHead>
                  <TableHead>Population</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProvinces.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      Aucune province trouvée avec ces critères.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProvinces.map((province) => (
                    <TableRow key={province.id}>
                      <TableCell>
                        <div className="font-medium">{province.name}</div>
                        <div className="text-xs text-muted-foreground">{province.location}</div>
                      </TableCell>
                      <TableCell>
                        {province.governor ? (
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span>{province.governor}</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-amber-500" />
                            <span className="text-amber-600">Vacant</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{getProvinceStatusBadge(province.status)}</TableCell>
                      <TableCell>
                        <div className="flex">
                          {getWealthStars(province.wealth)}
                        </div>
                      </TableCell>
                      <TableCell>{formatMoney(province.taxRevenue)}</TableCell>
                      <TableCell>{province.population.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8"
                            onClick={() => toast({ title: "Action simulée", description: "Affichage des détails de la province" })}
                          >
                            Détails
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8"
                            onClick={() => toast({ title: "Action simulée", description: "Nomination d'un gouverneur" })}
                          >
                            Assigner
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* Campagnes militaires */}
        <TabsContent value="campaigns" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatBox
              title="Campagnes actives"
              value={campaigns.filter(c => c.status === 'active').length.toString()}
              description="Conflits en cours"
              icon={<Swords className="h-6 w-6" />}
            />
            
            <StatBox
              title="Ressources investies"
              value={formatMoney(campaigns.reduce((sum, c) => sum + c.resourceCost, 0), true)}
              description="Coût total"
              icon={<Shield className="h-6 w-6" />}
            />
            
            <StatBox
              title="Victoires romaines"
              value={campaigns.filter(c => c.status === 'completed').length.toString()}
              description="Triomphes remportés"
              icon={<Flag className="h-6 w-6" />}
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Rechercher une campagne..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <Button onClick={() => toast({ title: "Fonctionnalité simulée", description: "Planification d'une nouvelle campagne" })}>
                <Swords className="h-4 w-4 mr-2" />
                Lancer une campagne
              </Button>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Campagne</TableHead>
                  <TableHead>Commandant</TableHead>
                  <TableHead>Année</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Pertes</TableHead>
                  <TableHead>Coût</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCampaigns.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      Aucune campagne trouvée avec ces critères.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCampaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell>
                        <div className="font-medium">{campaign.name}</div>
                        <div className="text-xs text-muted-foreground">{campaign.location}</div>
                      </TableCell>
                      <TableCell>
                        {campaign.commander ? (
                          campaign.commander
                        ) : (
                          <span className="text-amber-600">Non assigné</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {campaign.endYear ? 
                          `${campaign.startYear}-${campaign.endYear} AUC` : 
                          `${campaign.startYear} AUC`
                        }
                      </TableCell>
                      <TableCell>{getCampaignStatusBadge(campaign.status)}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>{campaign.casualties.toLocaleString()} Romains</span>
                          <span className="text-xs text-muted-foreground">
                            {campaign.enemiesKilled.toLocaleString()} ennemis
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{formatMoney(campaign.resourceCost)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8"
                            onClick={() => toast({ title: "Action simulée", description: "Affichage des détails de la campagne" })}
                          >
                            Détails
                          </Button>
                          {campaign.status === 'active' && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="h-8 text-green-600"
                              onClick={() => toast({ title: "Action simulée", description: "Clôture de la campagne" })}
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
            type="info"
            title="Gestion des campagnes"
            message="Les campagnes militaires offrent des opportunités de gloire aux sénateurs qui les commandent. Elles sont aussi source de butin et d'esclaves pour Rome."
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
