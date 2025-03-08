// Mise à jour des imports pour GestionPolitique
import { useContext, useState } from 'react';
import { MaitreJeuContext } from './context/MaitreJeuContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { PlusCircle } from 'lucide-react';
import { LoisTable } from './components/LoisTable';
import { ElectionPlanner } from './components/ElectionPlanner';
import { PartisGraph } from './components/PartisGraph';

export const GestionPolitique = () => {
  const { 
    equilibre, 
    updateFactionBalance, 
    lois, 
    addLoi, 
    voteLoi, 
    senateurs, 
    scheduleElection 
  } = useContext(MaitreJeuContext);
  
  const [populaires, setPopulaires] = useState(equilibre.populaires || 35);
  const [optimates, setOptimates] = useState(equilibre.optimates || 40);
  const [moderates, setModerates] = useState(equilibre.moderates || 25);
  
  const [showNewLawModal, setShowNewLawModal] = useState(false);
  const [newLawTitle, setNewLawTitle] = useState('');
  const [newLawDescription, setNewLawDescription] = useState('');
  const [newLawCategory, setNewLawCategory] = useState('');
  const [newLawImportance, setNewLawImportance] = useState<'majeure' | 'mineure' | 'normale'>('normale');
  
  const handleSaveFactionBalance = () => {
    updateFactionBalance(populaires, optimates, moderates);
  };
  
  const handleCreateLaw = () => {
    addLoi({
      titre: newLawTitle,
      description: newLawDescription,
      proposeur: 'Sénat',
      catégorie: newLawCategory,
      date: {
        year: 1,
        season: 'SPRING'
      },
      état: 'proposée',
      importance: newLawImportance,
      votesPositifs: 0,
      votesNégatifs: 0,
      votesAbstention: 0,
      effets: {}
    });
    setShowNewLawModal(false);
  };
  
  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Équilibre des factions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="mb-2">
                    <Label>Populares: {populaires}%</Label>
                    <Slider 
                      value={[populaires]}
                      onValueChange={(value) => setPopulaires(value[0])}
                      max={100}
                      step={1}
                      className="w-64"
                    />
                  </div>
                  <div className="mb-2">
                    <Label>Optimates: {optimates}%</Label>
                    <Slider 
                      value={[optimates]}
                      onValueChange={(value) => setOptimates(value[0])}
                      max={100}
                      step={1}
                      className="w-64"
                    />
                  </div>
                  <div className="mb-2">
                    <Label>Modérés: {moderates}%</Label>
                    <Slider 
                      value={[moderates]}
                      onValueChange={(value) => setModerates(value[0])}
                      max={100}
                      step={1}
                      className="w-64"
                    />
                  </div>
                  
                  <div className="mt-4">
                    <Button onClick={handleSaveFactionBalance}>
                      Mettre à jour l'équilibre
                    </Button>
                  </div>
                </div>
                
                <PartisGraph 
                  factions={[
                    { name: 'Populares', value: populaires, color: '#ef4444' },
                    { name: 'Optimates', value: optimates, color: '#3b82f6' },
                    { name: 'Moderates', value: moderates, color: '#a855f7' },
                  ]}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Nouvelles lois</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setShowNewLawModal(true)}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Proposer une nouvelle loi
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Prochaines élections</CardTitle>
            </CardHeader>
            <CardContent>
              <ElectionPlanner 
                senateurs={senateurs}
                onScheduleElection={scheduleElection}
              />
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Lois en vigueur</CardTitle>
            </CardHeader>
            <CardContent>
              <LoisTable lois={lois} onVote={voteLoi} />
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Dialog open={showNewLawModal} onOpenChange={setShowNewLawModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Proposer une nouvelle loi</DialogTitle>
            <DialogDescription>
              Remplissez le formulaire ci-dessous pour proposer une nouvelle loi au sénat.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Titre
              </Label>
              <Input 
                id="title" 
                value={newLawTitle} 
                onChange={(e) => setNewLawTitle(e.target.value)} 
                className="col-span-3" 
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={newLawDescription}
                onChange={(e) => setNewLawDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Catégorie
              </Label>
              <Input
                id="category"
                value={newLawCategory}
                onChange={(e) => setNewLawCategory(e.target.value)}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="importance" className="text-right">
                Importance
              </Label>
              <Select onValueChange={(value) => setNewLawImportance(value as 'majeure' | 'mineure' | 'normale')}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Sélectionner l'importance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="majeure">Majeure</SelectItem>
                  <SelectItem value="normale">Normale</SelectItem>
                  <SelectItem value="mineure">Mineure</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="secondary" onClick={() => setShowNewLawModal(false)}>
              Annuler
            </Button>
            <Button onClick={handleCreateLaw}>Proposer la loi</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
