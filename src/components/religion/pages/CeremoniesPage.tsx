
import React from 'react';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { Calendar, Users, CircleDollarSign, Scroll, Flame, Info } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

// Types pour les cérémonies
interface Ceremony {
  id: string;
  name: string;
  type: 'festival' | 'sacrifice' | 'procession' | 'jeux' | 'rituel';
  date: string;
  deity: string;
  prestige: number;
  attendance: number;
  cost: number;
  description: string;
  pieteBonus: number;
  populariteBonus: number;
  nextCelebration: number; // jours avant prochaine célébration
}

export const CeremoniesPage: React.FC = () => {
  // Données mockées des cérémonies
  const ceremonies: Ceremony[] = [
    {
      id: "ceremony-1",
      name: "Lupercalia",
      type: "festival",
      date: "15 Février",
      deity: "Faunus",
      prestige: 85,
      attendance: 25000,
      cost: 35000,
      description: "Festival de purification et de fertilité avec des prêtres parcourant la ville.",
      pieteBonus: 12,
      populariteBonus: 15,
      nextCelebration: 0
    },
    {
      id: "ceremony-2",
      name: "Saturnalia",
      type: "festival",
      date: "17-23 Décembre",
      deity: "Saturne",
      prestige: 95,
      attendance: 100000,
      cost: 95000,
      description: "Festival populaire avec des banquets, des cadeaux et l'inversion temporaire des rôles sociaux.",
      pieteBonus: 10,
      populariteBonus: 25,
      nextCelebration: 180
    },
    {
      id: "ceremony-3",
      name: "Jeux Floraux",
      type: "jeux",
      date: "28 Avril - 3 Mai",
      deity: "Flore",
      prestige: 80,
      attendance: 40000,
      cost: 65000,
      description: "Jeux en l'honneur de la déesse Flore, déesse des fleurs et du printemps.",
      pieteBonus: 8,
      populariteBonus: 18,
      nextCelebration: 60
    },
    {
      id: "ceremony-4",
      name: "Sacrifice à Mars",
      type: "sacrifice",
      date: "1 Mars",
      deity: "Mars",
      prestige: 75,
      attendance: 15000,
      cost: 25000,
      description: "Sacrifice annuel dédié à Mars pour assurer le succès militaire de Rome.",
      pieteBonus: 15,
      populariteBonus: 5,
      nextCelebration: 30
    },
    {
      id: "ceremony-5",
      name: "Procession des Vestales",
      type: "procession",
      date: "9 Juin",
      deity: "Vesta",
      prestige: 90,
      attendance: 35000,
      cost: 40000,
      description: "Procession solennelle des Vestales à travers le Forum Romain.",
      pieteBonus: 20,
      populariteBonus: 10,
      nextCelebration: 90
    }
  ];

  // Fonction pour afficher le type de cérémonie
  const getCeremonyTypeBadge = (type: string) => {
    switch(type) {
      case 'festival':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Festival</Badge>;
      case 'sacrifice':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Sacrifice</Badge>;
      case 'procession':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Procession</Badge>;
      case 'jeux':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Jeux</Badge>;
      case 'rituel':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Rituel</Badge>;
      default:
        return <Badge variant="outline">Autre</Badge>;
    }
  };

  // Calcul du nombre de jours avant la prochaine cérémonie
  const getNextCelebrationStatus = (days: number) => {
    if (days === 0) {
      return <Badge className="bg-green-100 text-green-800">Aujourd'hui</Badge>;
    } else if (days <= 30) {
      return <Badge className="bg-amber-100 text-amber-800">Dans {days} jours</Badge>;
    } else {
      return <span className="text-muted-foreground">Dans {days} jours</span>;
    }
  };

  // Trier les cérémonies par proximité
  const sortedCeremonies = [...ceremonies].sort((a, b) => a.nextCelebration - b.nextCelebration);

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Cérémonies religieuses" subtitle="Rites et célébrations de Rome" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sortedCeremonies.slice(0, 3).map(ceremony => (
          <RomanCard key={ceremony.id} className="bg-white hover:shadow-md transition-shadow">
            <RomanCard.Header className="bg-gradient-to-r from-rome-terracotta/10 via-rome-terracotta/5 to-transparent">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-rome-terracotta" />
                <h3 className="font-cinzel text-lg">{ceremony.name}</h3>
              </div>
              <div className="flex items-center gap-2">
                {getCeremonyTypeBadge(ceremony.type)}
                {getNextCelebrationStatus(ceremony.nextCelebration)}
              </div>
            </RomanCard.Header>
            <RomanCard.Content className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">Divinité</div>
                <div className="font-medium">{ceremony.deity}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-muted-foreground"/>
                  <span>{ceremony.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-muted-foreground"/>
                  <span>{ceremony.attendance.toLocaleString()} participants</span>
                </div>
                <div className="flex items-center gap-1">
                  <CircleDollarSign className="w-4 h-4 text-muted-foreground"/>
                  <span>{ceremony.cost.toLocaleString()} as</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">Prestige</span>
                  <Progress value={ceremony.prestige} className="h-2 mt-1" />
                </div>
              </div>
              
              <Separator className="my-2 border-rome-terracotta/20" />
              
              <div className="flex justify-between">
                <div className="text-xs text-green-600">+{ceremony.pieteBonus} piété</div>
                <div className="text-xs text-blue-600">+{ceremony.populariteBonus} popularité</div>
              </div>
              
              <ActionButton 
                icon={<Scroll className="h-4 w-4" />}
                label="Préparer la cérémonie"
                variant="default"
                to={`/religion/ceremonies/${ceremony.id}`}
              />
            </RomanCard.Content>
          </RomanCard>
        ))}
      </div>
      
      <RomanCard>
        <RomanCard.Header>
          <h3 className="font-cinzel text-lg">Calendrier des cérémonies</h3>
        </RomanCard.Header>
        <RomanCard.Content>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Divinité</TableHead>
                <TableHead>Coût</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Prochaine célébration</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedCeremonies.map(ceremony => (
                <TableRow key={ceremony.id}>
                  <TableCell className="font-medium">{ceremony.name}</TableCell>
                  <TableCell>{getCeremonyTypeBadge(ceremony.type)}</TableCell>
                  <TableCell>{ceremony.date}</TableCell>
                  <TableCell>{ceremony.deity}</TableCell>
                  <TableCell>{ceremony.cost.toLocaleString()} as</TableCell>
                  <TableCell>{ceremony.attendance.toLocaleString()}</TableCell>
                  <TableCell>{getNextCelebrationStatus(ceremony.nextCelebration)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <ActionButton 
                        icon={<Info className="h-4 w-4" />}
                        label="Détails"
                        variant="outline"
                        size="sm"
                        to={`/religion/ceremonies/${ceremony.id}`}
                      />
                      {ceremony.nextCelebration <= 30 && (
                        <ActionButton 
                          icon={<Scroll className="h-4 w-4" />}
                          label="Préparer"
                          variant="default"
                          size="sm"
                          to={`/religion/ceremonies/${ceremony.id}/prepare`}
                        />
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </RomanCard.Content>
      </RomanCard>
    </div>
  );
};
