
import React, { useState } from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Gavel, Scroll, Scale, User, ArrowRight, Calendar, Clock, AlertCircle, Filter, PlusCircle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { 
  getAllCases, 
  getCasesByStatus, 
  getCasesByType, 
  getAllEdicts,
  getActiveEdicts,
  LegalCase,
  LegalEdict
} from '@/data/db/justice';

export const PreteurFunctions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  
  // Récupérer toutes les affaires
  const allCases = getAllCases();
  
  // Filtrer les affaires
  const filteredCases = allCases.filter(c => {
    // Filtre de recherche
    const matchesSearch = 
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.plaintiff.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.defendant.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filtre par statut
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    
    // Filtre par type
    const matchesType = typeFilter === 'all' || c.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });
  
  // Récupérer les édits actifs
  const activeEdicts = getActiveEdicts();
  
  // Récupérer les affaires par priorité
  const urgentCases = allCases.filter(c => c.priority === 'urgent' && c.status !== 'closed');
  const highPriorityCases = allCases.filter(c => c.priority === 'high' && c.status !== 'closed');
  
  // Fonction pour obtenir la couleur de badge selon le statut
  const getStatusBadge = (status: LegalCase['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">En attente</Badge>;
      case 'in_progress':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">En cours</Badge>;
      case 'decided':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Jugé</Badge>;
      case 'appealed':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">En appel</Badge>;
      case 'closed':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Clos</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };
  
  // Fonction pour obtenir la couleur de badge selon le type
  const getTypeBadge = (type: LegalCase['type']) => {
    switch (type) {
      case 'civil':
        return <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Civil</Badge>;
      case 'criminal':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Criminel</Badge>;
      case 'administrative':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Administratif</Badge>;
      case 'religious':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Religieux</Badge>;
      default:
        return <Badge variant="outline">Autre</Badge>;
    }
  };
  
  // Fonction pour obtenir la couleur de badge selon la priorité
  const getPriorityBadge = (priority: LegalCase['priority']) => {
    switch (priority) {
      case 'urgent':
        return <Badge className="bg-red-100 text-red-800">Urgent</Badge>;
      case 'high':
        return <Badge className="bg-amber-100 text-amber-800">Prioritaire</Badge>;
      case 'medium':
        return <Badge className="bg-blue-100 text-blue-800">Normal</Badge>;
      case 'low':
        return <Badge className="bg-gray-100 text-gray-800">Faible</Badge>;
      default:
        return <Badge>Inconnu</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Dashboard du Préteur */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <RomanCard className="bg-white hover:shadow-md transition-shadow">
          <RomanCard.Header className="bg-gradient-to-r from-rome-navy/10 via-rome-navy/5 to-transparent">
            <div className="flex items-center gap-2">
              <Gavel className="w-5 h-5 text-rome-navy" />
              <h3 className="font-cinzel text-lg">Affaires en cours</h3>
            </div>
          </RomanCard.Header>
          <RomanCard.Content>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">En attente</span>
                <span className="font-semibold">{getCasesByStatus('pending').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">En instruction</span>
                <span className="font-semibold">{getCasesByStatus('in_progress').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Jugées</span>
                <span className="font-semibold">{getCasesByStatus('decided').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">En appel</span>
                <span className="font-semibold">{getCasesByStatus('appealed').length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Closes</span>
                <span className="font-semibold">{getCasesByStatus('closed').length}</span>
              </div>
            </div>
            
            <Separator className="my-4 border-rome-navy/20" />
            
            <ActionButton 
              icon={<ArrowRight className="h-4 w-4" />}
              label="Voir toutes les affaires"
              variant="outline"
              to="/republique/justice/affaires"
              className="w-full"
            />
          </RomanCard.Content>
        </RomanCard>
        
        <RomanCard className="bg-white hover:shadow-md transition-shadow">
          <RomanCard.Header className="bg-gradient-to-r from-rome-gold/10 via-rome-gold/5 to-transparent">
            <div className="flex items-center gap-2">
              <Scroll className="w-5 h-5 text-rome-gold" />
              <h3 className="font-cinzel text-lg">Édits en vigueur</h3>
            </div>
          </RomanCard.Header>
          <RomanCard.Content>
            <div className="space-y-3">
              {activeEdicts.slice(0, 3).map(edict => (
                <div key={edict.id} className="p-2 border rounded-md text-sm hover:bg-muted/20 transition-colors">
                  <div className="font-medium">{edict.title}</div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{edict.issuedDate}</span>
                    <span>{edict.category === 'civil' ? 'Droit civil' : 
                           edict.category === 'criminal' ? 'Droit pénal' : 
                           edict.category === 'administrative' ? 'Administratif' : 'Religieux'}
                    </span>
                  </div>
                </div>
              ))}
              
              {activeEdicts.length > 3 && (
                <div className="text-sm text-muted-foreground text-center mt-2">
                  + {activeEdicts.length - 3} autres édits actifs
                </div>
              )}
            </div>
            
            <Separator className="my-4 border-rome-gold/20" />
            
            <div className="flex gap-2">
              <ActionButton 
                icon={<ArrowRight className="h-4 w-4" />}
                label="Tous les édits"
                variant="outline"
                to="/republique/justice/edits"
                className="flex-1"
              />
              <ActionButton 
                icon={<PlusCircle className="h-4 w-4" />}
                label="Nouvel édit"
                variant="default"
                to="/republique/justice/edits/nouveau"
                className="flex-1"
              />
            </div>
          </RomanCard.Content>
        </RomanCard>
        
        <RomanCard className="bg-white hover:shadow-md transition-shadow">
          <RomanCard.Header className="bg-gradient-to-r from-rome-terracotta/10 via-rome-terracotta/5 to-transparent">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rome-terracotta" />
              <h3 className="font-cinzel text-lg">Affaires urgentes</h3>
            </div>
          </RomanCard.Header>
          <RomanCard.Content>
            <div className="space-y-3">
              {urgentCases.slice(0, 2).map(urgentCase => (
                <div key={urgentCase.id} className="p-2 border border-red-200 rounded-md text-sm bg-red-50 hover:bg-red-100 transition-colors">
                  <div className="font-medium">{urgentCase.title}</div>
                  <div className="flex justify-between items-center text-xs mt-1">
                    <span className="text-muted-foreground">{getTypeBadge(urgentCase.type)}</span>
                    <span className="text-muted-foreground">{getStatusBadge(urgentCase.status)}</span>
                  </div>
                </div>
              ))}
              
              {highPriorityCases.slice(0, 2).map(highCase => (
                <div key={highCase.id} className="p-2 border border-amber-200 rounded-md text-sm bg-amber-50 hover:bg-amber-100 transition-colors">
                  <div className="font-medium">{highCase.title}</div>
                  <div className="flex justify-between items-center text-xs mt-1">
                    <span className="text-muted-foreground">{getTypeBadge(highCase.type)}</span>
                    <span className="text-muted-foreground">{getStatusBadge(highCase.status)}</span>
                  </div>
                </div>
              ))}
              
              {urgentCases.length === 0 && highPriorityCases.length === 0 && (
                <div className="text-center p-4 text-muted-foreground">
                  Aucune affaire urgente à traiter
                </div>
              )}
            </div>
            
            <Separator className="my-4 border-rome-terracotta/20" />
            
            <ActionButton 
              icon={<Scale className="h-4 w-4" />}
              label="Audiences prioritaires"
              variant="default"
              to="/republique/justice/audiences-prioritaires"
              className="w-full"
            />
          </RomanCard.Content>
        </RomanCard>
      </div>
      
      {/* Fonctions principales */}
      <Tabs defaultValue="affaires" className="w-full">
        <TabsList className="w-full bg-white border border-rome-gold/30">
          <TabsTrigger value="affaires" className="flex items-center gap-1">
            <Gavel className="h-4 w-4" />
            <span>Affaires judiciaires</span>
          </TabsTrigger>
          <TabsTrigger value="edits" className="flex items-center gap-1">
            <Scroll className="h-4 w-4" />
            <span>Édits prétoriens</span>
          </TabsTrigger>
          <TabsTrigger value="audiences" className="flex items-center gap-1">
            <Scale className="h-4 w-4" />
            <span>Audiences</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="affaires" className="mt-4 space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 bg-white rounded-md border">
            <div className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher une affaire..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" title="Options de filtrage">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="in_progress">En cours</SelectItem>
                  <SelectItem value="decided">Jugé</SelectItem>
                  <SelectItem value="appealed">En appel</SelectItem>
                  <SelectItem value="closed">Clos</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="civil">Civil</SelectItem>
                  <SelectItem value="criminal">Criminel</SelectItem>
                  <SelectItem value="administrative">Administratif</SelectItem>
                  <SelectItem value="religious">Religieux</SelectItem>
                </SelectContent>
              </Select>
              
              <ActionButton 
                icon={<PlusCircle className="h-4 w-4" />}
                label="Nouvelle affaire"
                variant="default"
                to="/republique/justice/affaires/nouvelle"
              />
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Parties</TableHead>
                <TableHead>Date de dépôt</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Priorité</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCases.slice(0, 5).map(legalCase => (
                <TableRow key={legalCase.id}>
                  <TableCell className="font-medium">{legalCase.title}</TableCell>
                  <TableCell>{getTypeBadge(legalCase.type)}</TableCell>
                  <TableCell>
                    <div className="flex flex-col text-sm">
                      <span>{legalCase.plaintiff}</span>
                      <span className="text-muted-foreground">c. {legalCase.defendant}</span>
                    </div>
                  </TableCell>
                  <TableCell>{legalCase.filingDate}</TableCell>
                  <TableCell>{getStatusBadge(legalCase.status)}</TableCell>
                  <TableCell>{getPriorityBadge(legalCase.priority)}</TableCell>
                  <TableCell>
                    <ActionButton 
                      icon={<ArrowRight className="h-4 w-4" />}
                      label="Détails"
                      variant="outline"
                      size="sm"
                      to={`/republique/justice/affaires/${legalCase.id}`}
                    />
                  </TableCell>
                </TableRow>
              ))}
              
              {filteredCases.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                    Aucune affaire ne correspond aux critères de recherche
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          
          {filteredCases.length > 5 && (
            <div className="flex justify-center mt-4">
              <ActionButton 
                icon={<ArrowRight className="h-4 w-4" />}
                label={`Voir les ${filteredCases.length - 5} autres affaires`}
                variant="outline"
                to="/republique/justice/affaires"
              />
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="edits" className="mt-4 space-y-4">
          <div className="flex justify-between items-center p-4 bg-white rounded-md border">
            <h3 className="font-cinzel text-lg">Édits prétoriens en vigueur</h3>
            <ActionButton 
              icon={<PlusCircle className="h-4 w-4" />}
              label="Nouvel édit"
              variant="default"
              to="/republique/justice/edits/nouveau"
            />
          </div>
          
          <div className="space-y-4">
            {activeEdicts.map(edict => (
              <RomanCard key={edict.id} className="bg-white hover:shadow-md transition-shadow">
                <RomanCard.Header className="bg-gradient-to-r from-rome-gold/10 via-rome-gold/5 to-transparent">
                  <div className="flex items-center gap-2">
                    <Scroll className="w-5 h-5 text-rome-gold" />
                    <h3 className="font-cinzel text-lg">{edict.title}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {edict.category === 'civil' ? 'Droit civil' : 
                       edict.category === 'criminal' ? 'Droit pénal' : 
                       edict.category === 'administrative' ? 'Administratif' : 'Religieux'}
                    </Badge>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {edict.issuedDate}
                    </span>
                  </div>
                </RomanCard.Header>
                <RomanCard.Content className="space-y-4">
                  <p className="text-sm">{edict.content.substring(0, 200)}...</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {edict.issuedBy}
                    </div>
                    
                    <ActionButton 
                      icon={<ArrowRight className="h-4 w-4" />}
                      label="Consulter"
                      variant="outline"
                      size="sm"
                      to={`/republique/justice/edits/${edict.id}`}
                    />
                  </div>
                </RomanCard.Content>
              </RomanCard>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="audiences" className="mt-4 space-y-4">
          <div className="flex justify-between items-center p-4 bg-white rounded-md border">
            <h3 className="font-cinzel text-lg">Audiences à venir</h3>
            <ActionButton 
              icon={<Calendar className="h-4 w-4" />}
              label="Calendrier complet"
              variant="outline"
              to="/republique/justice/audiences/calendrier"
            />
          </div>
          
          <div className="space-y-4">
            {/* Liste des audiences à venir */}
            {allCases
              .filter(c => c.hearingDate && c.status !== 'closed' && c.status !== 'decided')
              .slice(0, 3)
              .map(hearing => (
                <RomanCard key={hearing.id} className="bg-white hover:shadow-md transition-shadow">
                  <RomanCard.Header className="bg-gradient-to-r from-rome-navy/10 via-rome-navy/5 to-transparent">
                    <div className="flex items-center gap-2">
                      <Scale className="w-5 h-5 text-rome-navy" />
                      <h3 className="font-cinzel text-lg">Audience: {hearing.title}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{hearing.hearingDate}</span>
                    </div>
                  </RomanCard.Header>
                  <RomanCard.Content className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">Type d'affaire</div>
                      <div>{getTypeBadge(hearing.type)}</div>
                    </div>
                    
                    <Separator className="my-2" />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-muted-foreground">Demandeur</div>
                        <div className="font-medium">{hearing.plaintiff}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Défendeur</div>
                        <div className="font-medium">{hearing.defendant}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Durée estimée: 2 heures</span>
                      </div>
                      
                      <ActionButton 
                        icon={<Gavel className="h-4 w-4" />}
                        label="Préparer"
                        variant="default"
                        size="sm"
                        to={`/republique/justice/audiences/${hearing.id}`}
                      />
                    </div>
                  </RomanCard.Content>
                </RomanCard>
            ))}
            
            {allCases.filter(c => c.hearingDate && c.status !== 'closed' && c.status !== 'decided').length === 0 && (
              <div className="text-center py-8 text-muted-foreground bg-white rounded-md border">
                Aucune audience n'est actuellement programmée
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
