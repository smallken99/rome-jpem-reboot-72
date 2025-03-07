
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { Search, UserPlus, Trash2, Edit, RotateCw, Eye } from 'lucide-react';
import { Character, CharacterStats } from '@/types/character';
import { AlertMessage } from '@/components/ui-custom/AlertMessage';

// Données d'exemple
const mockSenators = [
  { 
    id: "1", 
    name: "Marcus Tullius Cicero", 
    age: 45, 
    gender: "male" as const, 
    title: "Senator", 
    role: "Orator",
    isPlayer: true,
    stats: {
      popularity: { name: "Popularité", value: 85, maxValue: 100, icon: "popularity", description: "Influence auprès du peuple", color: "bg-amber-500" },
      oratory: { name: "Éloquence", value: 95, maxValue: 100, icon: "oratory", description: "Capacité à convaincre", color: "bg-blue-500" },
      piety: { name: "Piété", value: 70, maxValue: 100, icon: "piety", description: "Respect des traditions", color: "bg-teal-500" },
      martialEducation: { name: "Éducation Martiale", value: 40, maxValue: 100, icon: "martialEducation", description: "Compétences militaires", color: "bg-red-500" },
    }
  },
  { 
    id: "2", 
    name: "Gaius Julius Caesar", 
    age: 40, 
    gender: "male" as const, 
    title: "Senator", 
    role: "Military Leader",
    isPlayer: true,
    stats: {
      popularity: { name: "Popularité", value: 90, maxValue: 100, icon: "popularity", description: "Influence auprès du peuple", color: "bg-amber-500" },
      oratory: { name: "Éloquence", value: 80, maxValue: 100, icon: "oratory", description: "Capacité à convaincre", color: "bg-blue-500" },
      piety: { name: "Piété", value: 65, maxValue: 100, icon: "piety", description: "Respect des traditions", color: "bg-teal-500" },
      martialEducation: { name: "Éducation Martiale", value: 95, maxValue: 100, icon: "martialEducation", description: "Compétences militaires", color: "bg-red-500" },
    }
  },
  { 
    id: "3", 
    name: "Marcus Porcius Cato", 
    age: 52, 
    gender: "male" as const, 
    title: "Senator", 
    role: "Traditionalist",
    isPlayer: false,
    stats: {
      popularity: { name: "Popularité", value: 60, maxValue: 100, icon: "popularity", description: "Influence auprès du peuple", color: "bg-amber-500" },
      oratory: { name: "Éloquence", value: 75, maxValue: 100, icon: "oratory", description: "Capacité à convaincre", color: "bg-blue-500" },
      piety: { name: "Piété", value: 95, maxValue: 100, icon: "piety", description: "Respect des traditions", color: "bg-teal-500" },
      martialEducation: { name: "Éducation Martiale", value: 55, maxValue: 100, icon: "martialEducation", description: "Compétences militaires", color: "bg-red-500" },
    }
  },
];

export const GestionSenateurs: React.FC = () => {
  const [senators, setSenators] = useState<Character[]>(mockSenators);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const { toast } = useToast();

  const filteredSenators = senators.filter(senator => 
    senator.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddSenator = () => {
    // Simuler l'ajout d'un sénateur
    toast({
      title: "Sénateur ajouté",
      description: "Le nouveau sénateur a été créé avec succès",
    });
    setShowAddForm(false);
  };

  const handleDeleteSenator = (id: string) => {
    // Simuler la suppression
    setSenators(senators.filter(senator => senator.id !== id));
    toast({
      title: "Sénateur supprimé",
      description: "Le sénateur a été retiré du jeu",
    });
  };

  const handlePromoteSenator = (id: string) => {
    toast({
      title: "Promotion effectuée",
      description: "Le sénateur a été promu au rang supérieur",
    });
  };

  return (
    <div className="space-y-6">
      {/* Statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-md border border-rome-gold/30 shadow-sm">
          <div className="text-sm text-muted-foreground mb-1">Sénateurs actifs</div>
          <div className="text-2xl font-cinzel font-semibold text-rome-navy">{mockSenators.length}</div>
          <div className="text-xs text-muted-foreground mt-1">+2 ce mois-ci</div>
        </div>
        
        <div className="bg-white p-4 rounded-md border border-rome-gold/30 shadow-sm">
          <div className="text-sm text-muted-foreground mb-1">Joueurs</div>
          <div className="text-2xl font-cinzel font-semibold text-rome-navy">
            {mockSenators.filter(s => s.isPlayer).length}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Sur {mockSenators.length} sénateurs</div>
        </div>
        
        <div className="bg-white p-4 rounded-md border border-rome-gold/30 shadow-sm">
          <div className="text-sm text-muted-foreground mb-1">Familles influentes</div>
          <div className="text-2xl font-cinzel font-semibold text-rome-navy">3</div>
          <div className="text-xs text-muted-foreground mt-1">Avec pouvoir politique</div>
        </div>
        
        <div className="bg-white p-4 rounded-md border border-rome-gold/30 shadow-sm">
          <div className="text-sm text-muted-foreground mb-1">Âge moyen</div>
          <div className="text-2xl font-cinzel font-semibold text-rome-navy">
            {Math.round(senators.reduce((acc, s) => acc + s.age, 0) / senators.length)}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Des sénateurs actifs</div>
        </div>
      </div>

      {/* Filtres et actions */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Rechercher un sénateur..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <RotateCw className="h-4 w-4" />
          </Button>
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            <UserPlus className="h-4 w-4 mr-2" />
            Ajouter un sénateur
          </Button>
        </div>
      </div>

      {/* Formulaire d'ajout */}
      {showAddForm && (
        <div className="bg-muted/20 p-4 rounded-md border border-muted">
          <h3 className="font-medium mb-3">Nouveau Sénateur</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <Input id="name" placeholder="ex: Lucius Cornelius Sulla" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Âge</Label>
              <Input id="age" type="number" defaultValue={35} min={25} max={70} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Titre</Label>
              <Select defaultValue="senator">
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un titre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="senator">Sénateur</SelectItem>
                  <SelectItem value="quaestor">Questeur</SelectItem>
                  <SelectItem value="aedile">Édile</SelectItem>
                  <SelectItem value="praetor">Préteur</SelectItem>
                  <SelectItem value="consul">Consul</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="isPlayer">Type</Label>
              <Select defaultValue="npc">
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="player">Joueur</SelectItem>
                  <SelectItem value="npc">PNJ</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="pt-2 border-t flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setShowAddForm(false)}>Annuler</Button>
            <Button onClick={handleAddSenator}>Créer le sénateur</Button>
          </div>
        </div>
      )}

      {/* Liste des sénateurs */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Nom</TableHead>
              <TableHead>Âge</TableHead>
              <TableHead>Titre / Rôle</TableHead>
              <TableHead>Popularité</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSenators.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  Aucun sénateur trouvé avec ces critères.
                </TableCell>
              </TableRow>
            ) : (
              filteredSenators.map((senator) => (
                <TableRow key={senator.id}>
                  <TableCell className="font-medium">{senator.name}</TableCell>
                  <TableCell>{senator.age} ans</TableCell>
                  <TableCell>
                    <div className="font-medium">{senator.title}</div>
                    <div className="text-xs text-muted-foreground">{senator.role}</div>
                  </TableCell>
                  <TableCell>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-amber-500" 
                        style={{ width: `${senator.stats.popularity.value}%` }}
                      ></div>
                    </div>
                    <div className="text-xs mt-1">{senator.stats.popularity.value}/100</div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      senator.isPlayer 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {senator.isPlayer ? 'Joueur' : 'PNJ'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" title="Voir détails">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Modifier">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                        onClick={() => handleDeleteSenator(senator.id)}
                        title="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
        title="Guide du Maître du Jeu"
        message="En tant que MJ, vous pouvez créer des sénateurs qui seront joués par l'IA, ou réserver des sénateurs pour de futurs joueurs."
      />
    </div>
  );
};
