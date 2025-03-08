
import React from 'react';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { User, Calendar, Feather, Eye, Star, Clock, BarChart, PlusCircle, ScrollText } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Types pour les augures
interface Augure {
  id: string;
  name: string;
  role: string;
  specialite: 'oiseaux' | 'foudre' | 'entrailles' | 'astres' | 'présages';
  experience: number;
  date_entree: string;
  famille: string;
  statut: 'disponible' | 'occupé' | 'indisponible';
}

interface Prediction {
  id: string;
  date: string;
  augure_id: string;
  augure_name: string;
  sujet: string;
  methode: string;
  resultat: 'favorable' | 'défavorable' | 'ambigu';
  consequence: string;
  fiabilite: number;
}

export const AuguresPage: React.FC = () => {
  // Données mockées des augures
  const augures: Augure[] = [
    {
      id: "augure-1",
      name: "Lucius Cornelius",
      role: "Augure en chef",
      specialite: "oiseaux",
      experience: 15,
      date_entree: "690 AUC",
      famille: "Cornelii",
      statut: "disponible"
    },
    {
      id: "augure-2",
      name: "Marcus Valerius",
      role: "Augure",
      specialite: "foudre",
      experience: 8,
      date_entree: "697 AUC",
      famille: "Valerii",
      statut: "occupé"
    },
    {
      id: "augure-3",
      name: "Gaius Claudius",
      role: "Augure",
      specialite: "entrailles",
      experience: 12,
      date_entree: "693 AUC",
      famille: "Claudii",
      statut: "disponible"
    },
    {
      id: "augure-4",
      name: "Quintus Fabius",
      role: "Augure assistant",
      specialite: "astres",
      experience: 5,
      date_entree: "700 AUC",
      famille: "Fabii",
      statut: "indisponible"
    },
    {
      id: "augure-5",
      name: "Publius Licinius",
      role: "Augure novice",
      specialite: "présages",
      experience: 3,
      date_entree: "702 AUC",
      famille: "Licinii",
      statut: "disponible"
    }
  ];

  // Données mockées des prédictions
  const predictions: Prediction[] = [
    {
      id: "pred-1",
      date: "12 Janvier 705 AUC",
      augure_id: "augure-1",
      augure_name: "Lucius Cornelius",
      sujet: "Expédition militaire en Gaule",
      methode: "Vol d'oiseaux",
      resultat: "favorable",
      consequence: "L'expédition devrait connaître un grand succès.",
      fiabilite: 85
    },
    {
      id: "pred-2",
      date: "5 Février 705 AUC",
      augure_id: "augure-2",
      augure_name: "Marcus Valerius",
      sujet: "Élection des magistrats",
      methode: "Observation de la foudre",
      resultat: "ambigu",
      consequence: "Résultats électoraux incertains, possibles tensions.",
      fiabilite: 60
    },
    {
      id: "pred-3",
      date: "20 Février 705 AUC",
      augure_id: "augure-3",
      augure_name: "Gaius Claudius",
      sujet: "Construction du nouveau temple",
      methode: "Examen des entrailles",
      resultat: "favorable",
      consequence: "Le temple sera achevé sans incident et sera bien accueilli.",
      fiabilite: 75
    },
    {
      id: "pred-4",
      date: "3 Mars 705 AUC",
      augure_id: "augure-4",
      augure_name: "Quintus Fabius",
      sujet: "Récoltes de l'année",
      methode: "Observation des astres",
      resultat: "défavorable",
      consequence: "Risque de mauvaises récoltes, des mesures préventives sont recommandées.",
      fiabilite: 70
    }
  ];

  // Fonction pour afficher le statut d'un augure
  const getAugureStatusBadge = (statut: string) => {
    switch(statut) {
      case 'disponible':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Disponible</Badge>;
      case 'occupé':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Occupé</Badge>;
      case 'indisponible':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Indisponible</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  // Fonction pour afficher la spécialité d'un augure
  const getAugureSpecialiteBadge = (specialite: string) => {
    switch(specialite) {
      case 'oiseaux':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Vol d'oiseaux</Badge>;
      case 'foudre':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Foudre</Badge>;
      case 'entrailles':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Entrailles</Badge>;
      case 'astres':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Astres</Badge>;
      case 'présages':
        return <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Présages</Badge>;
      default:
        return <Badge variant="outline">Autre</Badge>;
    }
  };

  // Fonction pour afficher le résultat d'une prédiction
  const getPredictionResultBadge = (resultat: string) => {
    switch(resultat) {
      case 'favorable':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Favorable</Badge>;
      case 'défavorable':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Défavorable</Badge>;
      case 'ambigu':
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Ambigu</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Collège des Augures" subtitle="Interprètes des signes divins" />
      
      <Tabs defaultValue="augures" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="augures">Augures</TabsTrigger>
          <TabsTrigger value="predictions">Prédictions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="augures" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {augures.filter(a => a.statut === 'disponible').slice(0, 3).map(augure => (
              <RomanCard key={augure.id} className="bg-white hover:shadow-md transition-shadow">
                <RomanCard.Header className="bg-gradient-to-r from-rome-navy/10 via-rome-navy/5 to-transparent">
                  <div className="flex items-center gap-2">
                    <Feather className="w-5 h-5 text-rome-navy" />
                    <h3 className="font-cinzel text-lg">{augure.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{augure.role}</p>
                </RomanCard.Header>
                <RomanCard.Content className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">Spécialité</div>
                    <div>{getAugureSpecialiteBadge(augure.specialite)}</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-muted-foreground"/>
                      <span>{augure.experience} ans d'expérience</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-muted-foreground"/>
                      <span>Depuis {augure.date_entree}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4 text-muted-foreground"/>
                      <span>Famille {augure.famille}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4 text-muted-foreground"/>
                      <span>{getAugureStatusBadge(augure.statut)}</span>
                    </div>
                  </div>
                  
                  <Separator className="my-2 border-rome-navy/20" />
                  
                  <ActionButton 
                    icon={<ScrollText className="h-4 w-4" />}
                    label="Consulter"
                    variant="default"
                    to={`/religion/augures/${augure.id}/consulter`}
                  />
                </RomanCard.Content>
              </RomanCard>
            ))}
          </div>
          
          <RomanCard>
            <RomanCard.Header>
              <div className="flex justify-between items-center">
                <h3 className="font-cinzel text-lg">Membres du Collège des Augures</h3>
                <ActionButton 
                  icon={<PlusCircle className="h-4 w-4" />}
                  label="Ajouter un augure"
                  variant="outline"
                  to="/religion/augures/ajouter"
                />
              </div>
            </RomanCard.Header>
            <RomanCard.Content>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Rôle</TableHead>
                    <TableHead>Spécialité</TableHead>
                    <TableHead>Expérience</TableHead>
                    <TableHead>Famille</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {augures.map(augure => (
                    <TableRow key={augure.id}>
                      <TableCell className="font-medium">{augure.name}</TableCell>
                      <TableCell>{augure.role}</TableCell>
                      <TableCell>{getAugureSpecialiteBadge(augure.specialite)}</TableCell>
                      <TableCell>{augure.experience} ans</TableCell>
                      <TableCell>{augure.famille}</TableCell>
                      <TableCell>{getAugureStatusBadge(augure.statut)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <ActionButton 
                            icon={<Eye className="h-4 w-4" />}
                            label="Détails"
                            variant="outline"
                            size="sm"
                            to={`/religion/augures/${augure.id}`}
                          />
                          {augure.statut === 'disponible' && (
                            <ActionButton 
                              icon={<ScrollText className="h-4 w-4" />}
                              label="Consulter"
                              variant="default"
                              size="sm"
                              to={`/religion/augures/${augure.id}/consulter`}
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
        </TabsContent>
        
        <TabsContent value="predictions" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {predictions.slice(0, 2).map(prediction => (
              <RomanCard key={prediction.id} className="bg-white hover:shadow-md transition-shadow">
                <RomanCard.Header className="bg-gradient-to-r from-rome-navy/10 via-rome-navy/5 to-transparent">
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-rome-navy" />
                    <h3 className="font-cinzel text-lg">{prediction.sujet}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{prediction.date}</span>
                  </div>
                </RomanCard.Header>
                <RomanCard.Content className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">Résultat</div>
                    <div>{getPredictionResultBadge(prediction.resultat)}</div>
                  </div>
                  
                  <p className="text-sm italic">{prediction.consequence}</p>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Feather className="w-4 h-4 text-muted-foreground"/>
                      <span>Par {prediction.augure_name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ScrollText className="w-4 h-4 text-muted-foreground"/>
                      <span>Méthode: {prediction.methode}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BarChart className="w-4 h-4 text-muted-foreground"/>
                      <span>Fiabilité: {prediction.fiabilite}%</span>
                    </div>
                  </div>
                  
                  <Separator className="my-2 border-rome-navy/20" />
                  
                  <div className="flex justify-end gap-2">
                    <div className="flex items-center">
                      {Array.from({ length: Math.floor(prediction.fiabilite / 20) }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-rome-gold text-rome-gold" />
                      ))}
                      {Array.from({ length: 5 - Math.floor(prediction.fiabilite / 20) }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-gray-300" />
                      ))}
                    </div>
                  </div>
                </RomanCard.Content>
              </RomanCard>
            ))}
          </div>
          
          <RomanCard>
            <RomanCard.Header>
              <div className="flex justify-between items-center">
                <h3 className="font-cinzel text-lg">Registre des prédictions</h3>
                <ActionButton 
                  icon={<PlusCircle className="h-4 w-4" />}
                  label="Demander une divination"
                  variant="default"
                  to="/religion/augures/nouvelle-divination"
                />
              </div>
            </RomanCard.Header>
            <RomanCard.Content>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Sujet</TableHead>
                    <TableHead>Augure</TableHead>
                    <TableHead>Méthode</TableHead>
                    <TableHead>Résultat</TableHead>
                    <TableHead>Fiabilité</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {predictions.map(prediction => (
                    <TableRow key={prediction.id}>
                      <TableCell>{prediction.date}</TableCell>
                      <TableCell className="font-medium">{prediction.sujet}</TableCell>
                      <TableCell>{prediction.augure_name}</TableCell>
                      <TableCell>{prediction.methode}</TableCell>
                      <TableCell>{getPredictionResultBadge(prediction.resultat)}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className="mr-2">{prediction.fiabilite}%</span>
                          <div className="flex items-center">
                            {Array.from({ length: Math.floor(prediction.fiabilite / 20) }).map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-rome-gold text-rome-gold" />
                            ))}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <ActionButton 
                          icon={<Eye className="h-4 w-4" />}
                          label="Détails"
                          variant="outline"
                          size="sm"
                          to={`/religion/augures/predictions/${prediction.id}`}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};
