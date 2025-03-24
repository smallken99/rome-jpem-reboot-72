
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus, User, Users, Coins, CalendarClock, ArrowUpDown, FileText, Filter } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion } from 'framer-motion';

// Types nécessaires
interface Slave {
  id: string;
  name: string;
  type: 'domestic' | 'agricultural' | 'mining' | 'artisan' | 'gladiator';
  age: number;
  skills: string[];
  health: 'excellent' | 'good' | 'average' | 'poor' | 'bad';
  cost: number;
  maintenance: number;
  productivity: number;
  assigned: string | null;
  status: 'idle' | 'working' | 'sick' | 'injured' | 'recovering';
}

interface SlaveGroup {
  type: string;
  count: number;
  cost: number;
  maintenance: number;
  productivity: number;
}

// Données mockées pour la démo
const MOCK_SLAVES: Slave[] = [
  {
    id: '1', name: 'Demetrios', type: 'domestic', age: 25, 
    skills: ['cuisine', 'nettoyage'], health: 'good', cost: 2000, 
    maintenance: 100, productivity: 150, assigned: 'Domus Palatina', status: 'working'
  },
  {
    id: '2', name: 'Herakles', type: 'agricultural', age: 30, 
    skills: ['culture', 'élevage'], health: 'excellent', cost: 1800, 
    maintenance: 90, productivity: 200, assigned: 'Villa Toscana', status: 'working'
  },
  {
    id: '3', name: 'Xanthias', type: 'mining', age: 28, 
    skills: ['extraction', 'transport'], health: 'average', cost: 1500, 
    maintenance: 120, productivity: 180, assigned: 'Mine d\'Argentum', status: 'working'
  },
  {
    id: '4', name: 'Sophia', type: 'domestic', age: 22, 
    skills: ['textiles', 'service'], health: 'good', cost: 2200, 
    maintenance: 110, productivity: 160, assigned: 'Domus Palatina', status: 'working'
  },
  {
    id: '5', name: 'Titus', type: 'artisan', age: 35, 
    skills: ['poterie', 'sculpture'], health: 'good', cost: 2500, 
    maintenance: 130, productivity: 250, assigned: 'Atelier Urbain', status: 'working'
  },
  {
    id: '6', name: 'Nikos', type: 'agricultural', age: 27, 
    skills: ['irrigation', 'récolte'], health: 'average', cost: 1700, 
    maintenance: 85, productivity: 170, assigned: null, status: 'idle'
  },
  {
    id: '7', name: 'Valerius', type: 'mining', age: 31, 
    skills: ['extraction', 'fonte'], health: 'poor', cost: 1300, 
    maintenance: 150, productivity: 120, assigned: 'Mine d\'Argentum', status: 'sick'
  },
  {
    id: '8', name: 'Apollos', type: 'gladiator', age: 26, 
    skills: ['combat', 'spectacle'], health: 'excellent', cost: 3000, 
    maintenance: 200, productivity: 500, assigned: 'Ludus Magnus', status: 'working'
  },
  {
    id: '9', name: 'Lydia', type: 'domestic', age: 20, 
    skills: ['musique', 'divertissement'], health: 'good', cost: 2300, 
    maintenance: 120, productivity: 180, assigned: null, status: 'idle'
  },
  {
    id: '10', name: 'Milo', type: 'artisan', age: 40, 
    skills: ['forgeage', 'armes'], health: 'average', cost: 2600, 
    maintenance: 140, productivity: 230, assigned: 'Forge Militaire', status: 'working'
  },
  {
    id: '11', name: 'Theon', type: 'agricultural', age: 24, 
    skills: ['vignoble', 'pressurage'], health: 'good', cost: 1900, 
    maintenance: 95, productivity: 210, assigned: 'Villa Campania', status: 'working'
  },
  {
    id: '12', name: 'Kallisto', type: 'domestic', age: 19, 
    skills: ['service', 'lettres'], health: 'excellent', cost: 2400, 
    maintenance: 110, productivity: 160, assigned: 'Domus Palatina', status: 'working'
  }
];

export const SlavesOverview: React.FC = () => {
  const [activeTab, setActiveTab] = useState('apercu');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [assignmentFilter, setAssignmentFilter] = useState('all');
  const [selectedSlave, setSelectedSlave] = useState<Slave | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  
  // Filtrer les esclaves en fonction des critères
  const filteredSlaves = MOCK_SLAVES.filter(slave => {
    const matchesSearch = slave.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         slave.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = typeFilter === 'all' || slave.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || slave.status === statusFilter;
    const matchesAssignment = assignmentFilter === 'all' || 
                             (assignmentFilter === 'assigned' && slave.assigned) ||
                             (assignmentFilter === 'unassigned' && !slave.assigned);
    
    return matchesSearch && matchesType && matchesStatus && matchesAssignment;
  });
  
  // Calculer les statistiques globales
  const totalSlaves = MOCK_SLAVES.length;
  const totalMaintenance = MOCK_SLAVES.reduce((sum, slave) => sum + slave.maintenance, 0);
  const totalProductivity = MOCK_SLAVES.reduce((sum, slave) => sum + slave.productivity, 0);
  
  // Grouper par type pour l'aperçu
  const slaveTypes: SlaveGroup[] = Object.entries(
    MOCK_SLAVES.reduce((groups, slave) => {
      const type = slave.type;
      if (!groups[type]) {
        groups[type] = { 
          type, 
          count: 0, 
          cost: 0,
          maintenance: 0,
          productivity: 0
        };
      }
      groups[type].count++;
      groups[type].cost += slave.cost;
      groups[type].maintenance += slave.maintenance;
      groups[type].productivity += slave.productivity;
      return groups;
    }, {} as Record<string, SlaveGroup>)
  ).map(([_, group]) => group);
  
  // Calculer les ratios de rentabilité et d'efficacité
  const profitabilityRatio = totalProductivity / totalMaintenance;
  const assignedCount = MOCK_SLAVES.filter(slave => slave.assigned).length;
  const employmentRate = (assignedCount / totalSlaves) * 100;
  
  // Fonction pour traduire les types d'esclaves
  const translateType = (type: string): string => {
    const typeMap: Record<string, string> = {
      'domestic': 'Domestique',
      'agricultural': 'Agricole',
      'mining': 'Minier',
      'artisan': 'Artisan',
      'gladiator': 'Gladiateur'
    };
    return typeMap[type] || type;
  };
  
  // Fonction pour traduire les statuts
  const translateStatus = (status: string): string => {
    const statusMap: Record<string, string> = {
      'idle': 'Inactif',
      'working': 'Au travail',
      'sick': 'Malade',
      'injured': 'Blessé',
      'recovering': 'En convalescence'
    };
    return statusMap[status] || status;
  };
  
  // Fonction pour obtenir la couleur du badge en fonction du statut
  const getStatusColor = (status: string): string => {
    const statusColorMap: Record<string, string> = {
      'idle': 'slate',
      'working': 'green',
      'sick': 'amber',
      'injured': 'red',
      'recovering': 'blue'
    };
    return statusColorMap[status] || 'slate';
  };
  
  // Style des onglets avec animation
  const tabContentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Gestion des Esclaves</h2>
        <Button className="hover-scale">
          <UserPlus className="h-4 w-4 mr-2" />
          Acquérir des esclaves
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="apercu">Aperçu général</TabsTrigger>
              <TabsTrigger value="registre">Registre détaillé</TabsTrigger>
              <TabsTrigger value="assignation">Assignation</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        
        <CardContent>
          <TabsContent value="apercu" className="mt-0 space-y-6">
            <motion.div 
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-4 gap-4"
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-blue-100 p-3 rounded-full mb-2">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold">{totalSlaves}</div>
                    <div className="text-sm text-muted-foreground">Esclaves totaux</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-amber-100 p-3 rounded-full mb-2">
                      <Coins className="h-6 w-6 text-amber-600" />
                    </div>
                    <div className="text-2xl font-bold">{totalMaintenance} as</div>
                    <div className="text-sm text-muted-foreground">Coût d'entretien mensuel</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-green-100 p-3 rounded-full mb-2">
                      <CalendarClock className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold">{totalProductivity} as</div>
                    <div className="text-sm text-muted-foreground">Productivité mensuelle</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-purple-100 p-3 rounded-full mb-2">
                      <ArrowUpDown className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="text-2xl font-bold">{profitabilityRatio.toFixed(2)}x</div>
                    <div className="text-sm text-muted-foreground">Ratio de rentabilité</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div 
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
              className="bg-slate-50 p-4 rounded-lg"
            >
              <h3 className="font-medium mb-4">Répartition par type</h3>
              <div className="space-y-4">
                {slaveTypes.map((type, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-slate-500" />
                        <span className="capitalize">{translateType(type.type)}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {type.count} esclaves
                      </div>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5">
                      <div 
                        className="bg-primary h-2.5 rounded-full" 
                        style={{ width: `${(type.count / totalSlaves) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Coût: {type.cost} as</span>
                      <span>Entretien: {type.maintenance} as/mois</span>
                      <span>Production: {type.productivity} as/mois</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Statut des esclaves</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {['working', 'idle', 'sick', 'injured', 'recovering'].map(status => {
                      const count = MOCK_SLAVES.filter(slave => slave.status === status).length;
                      const percentage = ((count / totalSlaves) * 100).toFixed(1);
                      
                      return (
                        <div key={status} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={`bg-${getStatusColor(status)}-50 text-${getStatusColor(status)}-700 border-${getStatusColor(status)}-200`}>
                              {translateStatus(status)}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">{count} ({percentage}%)</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Assignation des esclaves</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <div className="text-2xl font-semibold">{employmentRate.toFixed(1)}%</div>
                      <div className="text-sm text-muted-foreground">Taux d'assignation</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-medium">{assignedCount}/{totalSlaves}</div>
                      <div className="text-sm text-muted-foreground">Esclaves assignés</div>
                    </div>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5 mb-4">
                    <div 
                      className="bg-primary h-2.5 rounded-full" 
                      style={{ width: `${employmentRate}%` }}
                    ></div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm">
                      <FileText className="h-4 w-4 inline mr-1 text-slate-500" />
                      <span className="text-muted-foreground">
                        {totalSlaves - assignedCount} esclaves non assignés disponibles pour de nouvelles tâches
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="registre" className="mt-0 space-y-4">
            <motion.div 
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-4 items-end"
            >
              <div className="space-y-2 flex-1">
                <Label htmlFor="search">Rechercher</Label>
                <div className="relative">
                  <Input
                    id="search"
                    placeholder="Rechercher par nom ou compétence..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                  <Filter className="h-4 w-4 absolute left-2.5 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="typeFilter">Type</Label>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger id="typeFilter">
                      <SelectValue placeholder="Tous les types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les types</SelectItem>
                      <SelectItem value="domestic">Domestiques</SelectItem>
                      <SelectItem value="agricultural">Agricoles</SelectItem>
                      <SelectItem value="mining">Miniers</SelectItem>
                      <SelectItem value="artisan">Artisans</SelectItem>
                      <SelectItem value="gladiator">Gladiateurs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="statusFilter">Statut</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger id="statusFilter">
                      <SelectValue placeholder="Tous les statuts" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      <SelectItem value="working">Au travail</SelectItem>
                      <SelectItem value="idle">Inactifs</SelectItem>
                      <SelectItem value="sick">Malades</SelectItem>
                      <SelectItem value="injured">Blessés</SelectItem>
                      <SelectItem value="recovering">En convalescence</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="assignmentFilter">Assignation</Label>
                  <Select value={assignmentFilter} onValueChange={setAssignmentFilter}>
                    <SelectTrigger id="assignmentFilter">
                      <SelectValue placeholder="Toutes les assignations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes</SelectItem>
                      <SelectItem value="assigned">Assignés</SelectItem>
                      <SelectItem value="unassigned">Non assignés</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              <Table>
                <TableCaption>Liste des esclaves - Total: {filteredSlaves.length}</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Âge</TableHead>
                    <TableHead>Compétences</TableHead>
                    <TableHead>Santé</TableHead>
                    <TableHead>Assigné à</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Coût/Mois</TableHead>
                    <TableHead className="text-right">Production</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSlaves.length > 0 ? (
                    filteredSlaves.map(slave => (
                      <TableRow key={slave.id} className="hover:bg-muted/30 cursor-pointer" onClick={() => {
                        setSelectedSlave(slave);
                        setIsDetailModalOpen(true);
                      }}>
                        <TableCell className="font-medium">{slave.name}</TableCell>
                        <TableCell>{translateType(slave.type)}</TableCell>
                        <TableCell>{slave.age} ans</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {slave.skills.map((skill, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{slave.health}</TableCell>
                        <TableCell>{slave.assigned || "—"}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`bg-${getStatusColor(slave.status)}-50 text-${getStatusColor(slave.status)}-700 border-${getStatusColor(slave.status)}-200`}>
                            {translateStatus(slave.status)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">{slave.maintenance} as</TableCell>
                        <TableCell className="text-right">{slave.productivity} as</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ArrowUpDown className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={10} className="text-center h-24 text-muted-foreground">
                        Aucun esclave ne correspond aux critères de recherche
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="assignation" className="mt-0 space-y-6">
            <motion.div
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              className="p-6 bg-white rounded-lg border"
            >
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="text-center space-y-2 mb-6">
                  <h3 className="text-xl font-semibold">Assignation des Esclaves</h3>
                  <p className="text-muted-foreground">
                    Assignez vos esclaves à différentes propriétés pour maximiser leur productivité
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="font-medium">Esclaves disponibles</div>
                    <div className="h-64 overflow-y-auto border rounded-md p-2">
                      {MOCK_SLAVES.filter(s => !s.assigned).map(slave => (
                        <div key={slave.id} className="flex items-center justify-between p-2 hover:bg-slate-50 rounded-md">
                          <div className="flex items-center space-x-2">
                            <User className="h-5 w-5 text-slate-500" />
                            <div>
                              <div className="font-medium">{slave.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {translateType(slave.type)} • {slave.age} ans
                              </div>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            Assigner
                          </Button>
                        </div>
                      ))}
                      {MOCK_SLAVES.filter(s => !s.assigned).length === 0 && (
                        <div className="p-4 text-center text-muted-foreground">
                          Tous les esclaves sont actuellement assignés
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="font-medium">Propriétés</div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 border rounded-md hover:bg-slate-50">
                        <div>
                          <div className="font-medium">Domus Palatina</div>
                          <div className="text-xs text-muted-foreground">
                            4 esclaves assignés • Capacité: 8
                          </div>
                        </div>
                        <Badge variant="outline">Urbaine</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-md hover:bg-slate-50">
                        <div>
                          <div className="font-medium">Villa Toscana</div>
                          <div className="text-xs text-muted-foreground">
                            2 esclaves assignés • Capacité: 15
                          </div>
                        </div>
                        <Badge variant="outline">Rurale</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-md hover:bg-slate-50">
                        <div>
                          <div className="font-medium">Mine d'Argentum</div>
                          <div className="text-xs text-muted-foreground">
                            3 esclaves assignés • Capacité: 20
                          </div>
                        </div>
                        <Badge variant="outline">Exploitation</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-md hover:bg-slate-50">
                        <div>
                          <div className="font-medium">Atelier Urbain</div>
                          <div className="text-xs text-muted-foreground">
                            1 esclave assigné • Capacité: 5
                          </div>
                        </div>
                        <Badge variant="outline">Commerce</Badge>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Assignations récentes</h4>
                      <p className="text-sm text-muted-foreground">Les 3 dernières modifications</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Historique complet
                    </Button>
                  </div>
                  
                  <div className="mt-2 space-y-2">
                    <div className="text-sm p-2 bg-slate-50 rounded">
                      <span className="font-medium">Herakles</span> assigné à <span className="font-medium">Villa Toscana</span> • Il y a 2 jours
                    </div>
                    <div className="text-sm p-2 bg-slate-50 rounded">
                      <span className="font-medium">Sophia</span> assignée à <span className="font-medium">Domus Palatina</span> • Il y a 5 jours
                    </div>
                    <div className="text-sm p-2 bg-slate-50 rounded">
                      <span className="font-medium">Valerius</span> assigné à <span className="font-medium">Mine d'Argentum</span> • Il y a 7 jours
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </CardContent>
      </Card>
    </div>
  );
};
