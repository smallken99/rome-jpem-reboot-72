
import React, { useState, useEffect, useMemo } from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGameTime } from '@/hooks/useGameTime';
import { LoiType, Loi } from '@/types/loi';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { CalendarIcon, ChevronDown, Filter, ArrowUpDown, Check, Edit, Trash2, Plus, XCircle } from 'lucide-react';
import { addDays } from 'date-fns';
import { toast } from 'sonner';
import { useMaitreJeu } from '@/components/maitrejeu/context';
import { useGameData } from '@/hooks/useGameData';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const initialLoi = {
  id: 'loi-001',
  titre: 'Loi agraire',
  description: 'Distribution des terres publiques aux citoyens',
  proposeur: 'Tribun de la plèbe',
  catégorie: 'social',
  date: { year: 450, season: 'spring' },
  état: 'proposed',
  importance: 'high',
  votesPositifs: 120,
  votesNégatifs: 80,
  type: 'political',
  effets: ['Réduction des inégalités', 'Augmentation de la popularité'],
};

export const GestionPolitique: React.FC = () => {
  const [activeTab, setActiveTab] = useState('lois');
  const [laws, setLaws] = useState([initialLoi]);
  const [isNewLawModalOpen, setIsNewLawModalOpen] = useState(false);
  const [newLaw, setNewLaw] = useState<Partial<Loi>>({});
  const { currentDate } = useGameTime();
  const { addLoi } = useMaitreJeu();
  const { lois } = useGameData();
  const [category, setCategory] = useState<string>('political');
  const [importance, setImportance] = useState<string>('medium');
  const [etat, setEtat] = useState<string>('proposed');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const handleOpenNewLawModal = () => {
    setIsNewLawModalOpen(true);
  };

  const handleCloseNewLawModal = () => {
    setIsNewLawModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewLaw(prev => ({ ...prev, [name]: value }));
  };

  const filteredLois = useMemo(() => {
    return lois.filter(loi => {
      const matchesSearch = loi.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            loi.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            loi.proposeur.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = !statusFilter || loi.état === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [lois, searchTerm, statusFilter]);

  const formatEtat = (etat: string) => {
    switch(etat) {
      case 'draft': return 'Brouillon';
      case 'proposed': return 'Proposée';
      case 'approved': return 'Approuvée';
      case 'rejected': return 'Rejetée';
      default: return etat;
    }
  };

  const getEtatBadgeVariant = (etat: string) => {
    switch(etat) {
      case 'draft': return 'secondary';
      case 'proposed': return 'warning';
      case 'approved': return 'success';
      case 'rejected': return 'destructive';
      default: return 'default';
    }
  };

  const handleNewLaw = () => {
    if (!newLaw.titre || !newLaw.description || !category || !importance || !etat || !selectedDate) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    // Utiliser LoiType comme type défini
    const type: LoiType = category === 'economic'
      ? 'economic'
      : category === 'military'
        ? 'military'
        : category === 'religious'
          ? 'religious'
          : category === 'social'
            ? 'social'
            : 'political';

    const newLoi = {
      id: `loi-${laws.length + 1}`,
      titre: newLaw.titre as string,
      description: newLaw.description as string,
      proposeur: newLaw.proposeur as string || 'Sénat',
      catégorie: category,
      date: { year: currentDate.year, season: currentDate.season },
      état: etat,
      importance: importance,
      votesPositifs: 0,
      votesNégatifs: 0,
      type: type,
      effets: [],
    };

    addLoi(newLoi);
    setLaws(prevLaws => [...prevLaws, newLoi]);
    setIsNewLawModalOpen(false);
    setNewLaw({});
    toast.success('Nouvelle loi ajoutée');
  };

  return (
    <Layout>
      <PageHeader
        title="Gestion Politique"
        subtitle="Proposer et gérer les lois de la République"
      />

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Input 
              placeholder="Rechercher une loi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-72 pl-8"
            />
            <Filter className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                {statusFilter ? `Statut: ${formatEtat(statusFilter)}` : 'Tous les statuts'}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                Tous les statuts
                {!statusFilter && <Check className="ml-2 h-4 w-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('draft')}>
                Brouillon
                {statusFilter === 'draft' && <Check className="ml-2 h-4 w-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('proposed')}>
                Proposée
                {statusFilter === 'proposed' && <Check className="ml-2 h-4 w-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('approved')}>
                Approuvée
                {statusFilter === 'approved' && <Check className="ml-2 h-4 w-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('rejected')}>
                Rejetée
                {statusFilter === 'rejected' && <Check className="ml-2 h-4 w-4" />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Button onClick={handleOpenNewLawModal} className="gap-2">
          <Plus className="h-4 w-4" />
          Proposer une nouvelle loi
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="lois">Lois en vigueur</TabsTrigger>
          <TabsTrigger value="propositions">Propositions</TabsTrigger>
          <TabsTrigger value="archives">Archives</TabsTrigger>
        </TabsList>

        <TabsContent value="lois">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredLois.filter(loi => loi.état === 'approved').map((law) => (
              <Card key={law.id} className="relative overflow-hidden">
                <Badge className="absolute top-4 right-4" variant={getEtatBadgeVariant(law.état)}>
                  {formatEtat(law.état)}
                </Badge>
                <CardHeader>
                  <CardTitle className="font-semibold">{law.titre}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    Proposé par: {law.proposeur} | Catégorie: {law.catégorie}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{law.description}</p>
                  {law.effets && law.effets.length > 0 && (
                    <>
                      <Separator className="my-3" />
                      <div className="mt-2">
                        <h4 className="text-xs font-medium mb-1">Effets:</h4>
                        <ul className="list-disc pl-5 text-xs space-y-1">
                          {law.effets.map((effet, index) => (
                            <li key={index}>{effet}</li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between text-xs text-muted-foreground">
                  <span>Date: {law.date.season} {law.date.year}</span>
                  <div className="flex items-center gap-2">
                    <span>Votes: {law.votesPositifs} pour / {law.votesNégatifs} contre</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
            {filteredLois.filter(loi => loi.état === 'approved').length === 0 && (
              <div className="col-span-2 flex flex-col items-center justify-center p-8 text-center">
                <XCircle className="h-12 w-12 text-muted-foreground/50 mb-2" />
                <h3 className="text-lg font-medium">Aucune loi en vigueur</h3>
                <p className="text-muted-foreground">Commencez par proposer des lois pour les faire adopter.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="propositions">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredLois.filter(loi => loi.état === 'proposed' || loi.état === 'draft').map((law) => (
              <Card key={law.id} className="relative overflow-hidden">
                <Badge className="absolute top-4 right-4" variant={getEtatBadgeVariant(law.état)}>
                  {formatEtat(law.état)}
                </Badge>
                <CardHeader>
                  <CardTitle className="font-semibold">{law.titre}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    Proposé par: {law.proposeur} | Catégorie: {law.catégorie}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{law.description}</p>
                  {law.effets && law.effets.length > 0 && (
                    <>
                      <Separator className="my-3" />
                      <div className="mt-2">
                        <h4 className="text-xs font-medium mb-1">Effets:</h4>
                        <ul className="list-disc pl-5 text-xs space-y-1">
                          {law.effets.map((effet, index) => (
                            <li key={index}>{effet}</li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between text-xs text-muted-foreground">
                  <span>Date: {law.date.season} {law.date.year}</span>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
            {filteredLois.filter(loi => loi.état === 'proposed' || loi.état === 'draft').length === 0 && (
              <div className="col-span-2 flex flex-col items-center justify-center p-8 text-center">
                <XCircle className="h-12 w-12 text-muted-foreground/50 mb-2" />
                <h3 className="text-lg font-medium">Aucune proposition en cours</h3>
                <p className="text-muted-foreground">Aucune loi n'est actuellement proposée ou en brouillon.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="archives">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredLois.filter(loi => loi.état === 'rejected').map((law) => (
              <Card key={law.id} className="relative overflow-hidden">
                <Badge className="absolute top-4 right-4" variant={getEtatBadgeVariant(law.état)}>
                  {formatEtat(law.état)}
                </Badge>
                <CardHeader>
                  <CardTitle className="font-semibold">{law.titre}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    Proposé par: {law.proposeur} | Catégorie: {law.catégorie}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{law.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between text-xs text-muted-foreground">
                  <span>Date: {law.date.season} {law.date.year}</span>
                  <div className="flex items-center gap-2">
                    <span>Votes: {law.votesPositifs} pour / {law.votesNégatifs} contre</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
            {filteredLois.filter(loi => loi.état === 'rejected').length === 0 && (
              <div className="col-span-2 flex flex-col items-center justify-center p-8 text-center">
                <XCircle className="h-12 w-12 text-muted-foreground/50 mb-2" />
                <h3 className="text-lg font-medium">Archives vides</h3>
                <p className="text-muted-foreground">Aucune loi rejetée n'est archivée pour le moment.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal pour ajouter une nouvelle loi */}
      {isNewLawModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Proposer une nouvelle loi</h2>

            <div className="space-y-4">
              <div>
                <Label htmlFor="titre">Titre</Label>
                <Input
                  type="text"
                  id="titre"
                  name="titre"
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  onChange={handleInputChange}
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor="proposeur">Proposeur</Label>
                <Input
                  type="text"
                  id="proposeur"
                  name="proposeur"
                  onChange={handleInputChange}
                  className="w-full"
                  defaultValue="Sénat"
                />
              </div>

              <div>
                <Label htmlFor="category">Catégorie</Label>
                <Select onValueChange={(value) => setCategory(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="political">Politique</SelectItem>
                    <SelectItem value="economic">Économique</SelectItem>
                    <SelectItem value="social">Social</SelectItem>
                    <SelectItem value="military">Militaire</SelectItem>
                    <SelectItem value="religious">Religieux</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="importance">Importance</Label>
                <Select onValueChange={(value) => setImportance(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sélectionner l'importance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Faible</SelectItem>
                    <SelectItem value="medium">Moyenne</SelectItem>
                    <SelectItem value="high">Élevée</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="etat">État</Label>
                <Select onValueChange={(value) => setEtat(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sélectionner l'état" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Brouillon</SelectItem>
                    <SelectItem value="proposed">Proposée</SelectItem>
                    <SelectItem value="approved">Approuvée</SelectItem>
                    <SelectItem value="rejected">Rejetée</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
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
                        date > addDays(new Date(), 0)
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="secondary" onClick={handleCloseNewLawModal}>Annuler</Button>
                <Button onClick={handleNewLaw}>Proposer</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};
