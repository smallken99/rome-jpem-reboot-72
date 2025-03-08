
import React from 'react';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { Landmark, Info, Calendar, User, CircleDollarSign } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// Types pour les temples
interface Temple {
  id: string;
  name: string;
  deity: string;
  location: string;
  founded: string;
  condition: number;
  mainPriest: string;
  annualOfferings: number;
  lastRestoration: string;
  pieteBonus: number;
}

export const TemplesPage: React.FC = () => {
  // Données mockées des temples
  const temples: Temple[] = [
    {
      id: "temple-1",
      name: "Temple de Jupiter Capitolin",
      deity: "Jupiter",
      location: "Colline du Capitole",
      founded: "509 AUC",
      condition: 85,
      mainPriest: "Marcus Aemilius Lepidus",
      annualOfferings: 50000,
      lastRestoration: "698 AUC",
      pieteBonus: 15
    },
    {
      id: "temple-2",
      name: "Temple de Junon",
      deity: "Junon",
      location: "Forum Romain",
      founded: "392 AUC",
      condition: 92,
      mainPriest: "Gaius Claudius",
      annualOfferings: 35000,
      lastRestoration: "700 AUC",
      pieteBonus: 12
    },
    {
      id: "temple-3",
      name: "Temple de Vesta",
      deity: "Vesta",
      location: "Forum Romain",
      founded: "549 AUC",
      condition: 98,
      mainPriest: "Grande Vestale Licinia",
      annualOfferings: 45000,
      lastRestoration: "702 AUC",
      pieteBonus: 18
    },
    {
      id: "temple-4",
      name: "Temple de Mars",
      deity: "Mars",
      location: "Champ de Mars",
      founded: "388 AUC",
      condition: 75,
      mainPriest: "Publius Cornelius",
      annualOfferings: 40000,
      lastRestoration: "695 AUC",
      pieteBonus: 10
    },
    {
      id: "temple-5",
      name: "Temple de Cérès",
      deity: "Cérès",
      location: "Aventin",
      founded: "493 AUC",
      condition: 80,
      mainPriest: "Lucius Calpurnius",
      annualOfferings: 30000,
      lastRestoration: "697 AUC",
      pieteBonus: 8
    }
  ];

  // Fonction pour afficher l'état de conservation du temple
  const getConditionBadge = (condition: number) => {
    if (condition >= 90) {
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Excellent</Badge>;
    } else if (condition >= 75) {
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Bon</Badge>;
    } else if (condition >= 50) {
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Moyen</Badge>;
    } else {
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Mauvais</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Temples de Rome" subtitle="Édifices sacrés de la République" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {temples.slice(0, 3).map(temple => (
          <RomanCard key={temple.id} className="bg-white hover:shadow-md transition-shadow">
            <RomanCard.Header className="bg-gradient-to-r from-rome-gold/10 via-rome-gold/5 to-transparent">
              <div className="flex items-center gap-2">
                <Landmark className="w-5 h-5 text-rome-gold" />
                <h3 className="font-cinzel text-lg">{temple.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{temple.deity}</p>
            </RomanCard.Header>
            <RomanCard.Content className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">État de conservation</div>
                <div>{getConditionBadge(temple.condition)}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-muted-foreground"/>
                  <span>Fondé en {temple.founded}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4 text-muted-foreground"/>
                  <span>Prêtre: {temple.mainPriest.split(' ')[0]}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CircleDollarSign className="w-4 h-4 text-muted-foreground"/>
                  <span>{temple.annualOfferings.toLocaleString()} as/an</span>
                </div>
                <div className="flex items-center gap-1">
                  <Info className="w-4 h-4 text-muted-foreground"/>
                  <span>+{temple.pieteBonus} piété</span>
                </div>
              </div>
              
              <Separator className="my-2 border-rome-gold/20" />
              
              <ActionButton 
                icon={<Info className="h-4 w-4" />}
                label="Détails"
                variant="outline"
                to={`/religion/temples/${temple.id}`}
              />
            </RomanCard.Content>
          </RomanCard>
        ))}
      </div>
      
      <RomanCard>
        <RomanCard.Header>
          <h3 className="font-cinzel text-lg">Liste des temples de Rome</h3>
        </RomanCard.Header>
        <RomanCard.Content>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Divinité</TableHead>
                <TableHead>Localisation</TableHead>
                <TableHead>État</TableHead>
                <TableHead>Grand Prêtre</TableHead>
                <TableHead>Offrandes</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {temples.map(temple => (
                <TableRow key={temple.id}>
                  <TableCell className="font-medium">{temple.name}</TableCell>
                  <TableCell>{temple.deity}</TableCell>
                  <TableCell>{temple.location}</TableCell>
                  <TableCell>{getConditionBadge(temple.condition)}</TableCell>
                  <TableCell>{temple.mainPriest}</TableCell>
                  <TableCell>{temple.annualOfferings.toLocaleString()} as</TableCell>
                  <TableCell>
                    <ActionButton 
                      icon={<Info className="h-4 w-4" />}
                      label="Détails"
                      variant="outline"
                      size="sm"
                      to={`/religion/temples/${temple.id}`}
                    />
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
