
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, UserPlus, History } from 'lucide-react';

const MAGISTRATURES_DATA = [
  {
    id: '1',
    nom: 'Consul',
    titulaires: [
      { id: 's1', nom: 'Gaius Julius Caesar', faction: 'populares' },
      { id: 's2', nom: 'Marcus Calpurnius Bibulus', faction: 'optimates' },
    ],
    pouvoir: 'Imperium Maius',
    duree: '1 an',
    statut: 'actif'
  },
  {
    id: '2',
    nom: 'Préteur',
    titulaires: [
      { id: 's3', nom: 'Quintus Caecilius Metellus', faction: 'optimates' },
      { id: 's4', nom: 'Publius Cornelius Lentulus', faction: 'optimates' },
      { id: 's5', nom: 'Lucius Roscius Fabatus', faction: 'populares' },
      { id: 's6', nom: 'Gnaeus Tremellius Scrofa', faction: 'modérés' },
    ],
    pouvoir: 'Imperium',
    duree: '1 an',
    statut: 'actif'
  },
  {
    id: '3',
    nom: 'Édile',
    titulaires: [
      { id: 's7', nom: 'Marcus Aemilius Scaurus', faction: 'optimates' },
      { id: 's8', nom: 'Publius Plautius Hypsaeus', faction: 'populares' },
      { id: 's9', nom: 'Gaius Scribonius Curio', faction: 'modérés' },
      { id: 's10', nom: 'Lucius Vinicius', faction: 'populares' },
    ],
    pouvoir: 'Ius Edicendi',
    duree: '1 an',
    statut: 'actif'
  },
  {
    id: '4',
    nom: 'Tribun de la Plèbe',
    titulaires: [
      { id: 's11', nom: 'Publius Servilius Rullus', faction: 'populares' },
      { id: 's12', nom: 'Gaius Manilius', faction: 'populares' },
      { id: 's13', nom: 'Lucius Caecilius Rufus', faction: 'optimates' },
      { id: 's14', nom: 'Titus Ampius Balbus', faction: 'populares' },
      { id: 's15', nom: 'Gaius Helvius Cinna', faction: 'populares' },
      { id: 's16', nom: 'Quintus Ancharius', faction: 'optimates' },
      { id: 's17', nom: 'Publius Sestius', faction: 'modérés' },
      { id: 's18', nom: 'Gaius Lucilius Hirrus', faction: 'optimates' },
      { id: 's19', nom: 'Marcus Juventius Laterensis', faction: 'modérés' },
      { id: 's20', nom: 'Lucius Caesetius Flavus', faction: 'populares' },
    ],
    pouvoir: 'Intercessio',
    duree: '1 an',
    statut: 'actif'
  },
  {
    id: '5',
    nom: 'Questeur',
    titulaires: [
      { id: 's21', nom: 'Marcus Tullius Cicero Minor', faction: 'optimates' },
      { id: 's22', nom: 'Decimus Junius Silanus', faction: 'optimates' },
      { id: 's23', nom: 'Gnaeus Plancius', faction: 'modérés' },
      { id: 's24', nom: 'Publius Licinius Crassus', faction: 'populares' },
      { id: 's25', nom: 'Lucius Antistius Vetus', faction: 'modérés' },
      { id: 's26', nom: 'Gaius Curio', faction: 'populares' },
      { id: 's27', nom: 'Marcus Nonius Sufenas', faction: 'optimates' },
      { id: 's28', nom: 'Lucius Minucius Basilus', faction: 'optimates' },
    ],
    pouvoir: 'Administration financière',
    duree: '1 an',
    statut: 'actif'
  },
  {
    id: '6',
    nom: 'Censeur',
    titulaires: [
      { id: 's29', nom: 'Appius Claudius Pulcher', faction: 'optimates' },
      { id: 's30', nom: 'Lucius Calpurnius Piso', faction: 'modérés' },
    ],
    pouvoir: 'Regimen Morum',
    duree: '5 ans',
    statut: 'inactif',
    notes: 'La dernière censure remonte à 3 ans'
  },
  {
    id: '7',
    nom: 'Dictateur',
    titulaires: [],
    pouvoir: 'Imperium Summum',
    duree: '6 mois',
    statut: 'inactif',
    notes: 'Nommé uniquement en cas d\'urgence extrême'
  }
];

export const MagistraturesList: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Liste des magistrats en fonction</h3>
          <p className="text-sm text-muted-foreground">Organisation politique de la République</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <History className="h-4 w-4 mr-2" />
            Historique
          </Button>
          <Button size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            Nommer
          </Button>
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Magistrature</TableHead>
            <TableHead>Titulaires</TableHead>
            <TableHead>Pouvoirs</TableHead>
            <TableHead>Mandat</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {MAGISTRATURES_DATA.map(magistrature => (
            <TableRow key={magistrature.id}>
              <TableCell className="font-medium">{magistrature.nom}</TableCell>
              <TableCell>
                <div className="space-y-1">
                  {magistrature.titulaires.length > 0 ? (
                    magistrature.titulaires.map(titulaire => (
                      <div key={titulaire.id} className="flex items-center">
                        <span>{titulaire.nom}</span>
                        <Badge className="ml-2" variant={
                          titulaire.faction === 'optimates' ? 'default' :
                          titulaire.faction === 'populares' ? 'destructive' :
                          'secondary'
                        }>
                          {titulaire.faction}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <span className="text-muted-foreground italic">Aucun titulaire</span>
                  )}
                </div>
              </TableCell>
              <TableCell>{magistrature.pouvoir}</TableCell>
              <TableCell>{magistrature.duree}</TableCell>
              <TableCell>
                <Badge variant={magistrature.statut === 'actif' ? 'outline' : 'secondary'}>
                  {magistrature.statut === 'actif' ? 'En fonction' : 'Inactif'}
                </Badge>
                {magistrature.notes && (
                  <div className="text-xs text-muted-foreground mt-1">
                    {magistrature.notes}
                  </div>
                )}
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
