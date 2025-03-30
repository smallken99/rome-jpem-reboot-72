
import React, { useState, useEffect, useMemo } from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGameTime } from '@/hooks/useGameTime';
import { LoiType, Loi } from '@/types/loi'; // Importation correcte
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
import { CalendarIcon } from 'lucide-react';
import { addDays } from 'date-fns';
import { toast } from 'sonner';
import { useMaitreJeu } from '@/components/maitrejeu/context'; // Chemin modifié pour utiliser le chemin absolu
import { useGameData } from '@/hooks/useGameData';

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

      <div className="mb-6">
        <Button onClick={handleOpenNewLawModal}>Proposer une nouvelle loi</Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="lois">Lois en vigueur</TabsTrigger>
          <TabsTrigger value="propositions">Propositions</TabsTrigger>
          <TabsTrigger value="archives">Archives</TabsTrigger>
        </TabsList>

        <TabsContent value="lois">
          <div>
            {lois.map((law) => (
              <div key={law.id} className="border rounded-md p-4 mb-4">
                <h3 className="font-semibold">{law.titre}</h3>
                <p className="text-sm">{law.description}</p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="propositions">
          <div>
            {/* Contenu pour les propositions de lois */}
          </div>
        </TabsContent>

        <TabsContent value="archives">
          <div>
            {/* Contenu pour les archives des lois */}
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
