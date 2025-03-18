
import React from 'react';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Coins, 
  TrendingUp, 
  TrendingDown, 
  Landmark, 
  BarChart,
  PieChart,
  CreditCard, 
  ScrollText
} from 'lucide-react';
import { formatMoney } from '@/utils/formatUtils';
import { getTreasuryData, getPopulationData } from '@/data/db/republic';

export const TresorPublicPage: React.FC = () => {
  const treasuryData = getTreasuryData();
  const populationData = getPopulationData();
  
  return (
    <div className="space-y-6">
      <PageHeader
        title="Trésor Public"
        subtitle="Finances et ressources de la République"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <RomanCard>
          <RomanCard.Content className="flex items-center">
            <div className="p-2 mr-4 bg-amber-100 rounded-md">
              <Coins className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Balance Actuelle</div>
              <div className="text-2xl font-semibold">{formatMoney(treasuryData.balance)}</div>
            </div>
          </RomanCard.Content>
        </RomanCard>
        
        <RomanCard>
          <RomanCard.Content className="flex items-center">
            <div className="p-2 mr-4 bg-green-100 rounded-md">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Revenus Mensuels</div>
              <div className="text-2xl font-semibold">{formatMoney(treasuryData.monthlyIncome)}</div>
            </div>
          </RomanCard.Content>
        </RomanCard>
        
        <RomanCard>
          <RomanCard.Content className="flex items-center">
            <div className="p-2 mr-4 bg-red-100 rounded-md">
              <TrendingDown className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Dépenses Mensuelles</div>
              <div className="text-2xl font-semibold">{formatMoney(treasuryData.monthlyExpenses)}</div>
            </div>
          </RomanCard.Content>
        </RomanCard>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-white border border-rome-gold/30">
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="income">Revenus</TabsTrigger>
          <TabsTrigger value="expenses">Dépenses</TabsTrigger>
          <TabsTrigger value="loans">Prêts</TabsTrigger>
          <TabsTrigger value="reports">Rapports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RomanCard>
              <RomanCard.Header>
                <h3 className="font-cinzel text-lg">État des finances</h3>
              </RomanCard.Header>
              <RomanCard.Content>
                <dl className="space-y-4">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Année fiscale:</dt>
                    <dd className="font-medium">{treasuryData.fiscalYear}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Réserves:</dt>
                    <dd className="font-medium">{formatMoney(treasuryData.reserves)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Taux d'imposition moyen:</dt>
                    <dd className="font-medium">{treasuryData.taxRate}%</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Collecte des impôts (dernière période):</dt>
                    <dd className="font-medium">{formatMoney(treasuryData.taxCollection || 0)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Équilibre budgétaire:</dt>
                    <dd className={`font-medium ${treasuryData.monthlyIncome > treasuryData.monthlyExpenses ? 'text-green-600' : 'text-red-600'}`}>
                      {formatMoney(treasuryData.monthlyIncome - treasuryData.monthlyExpenses)} / mois
                    </dd>
                  </div>
                </dl>
              </RomanCard.Content>
            </RomanCard>
            
            <RomanCard>
              <RomanCard.Header>
                <h3 className="font-cinzel text-lg">Statistiques fiscales</h3>
              </RomanCard.Header>
              <RomanCard.Content>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Utilisation du budget</span>
                      <span className="text-sm text-muted-foreground">
                        {Math.round((treasuryData.monthlyExpenses / treasuryData.monthlyIncome) * 100)}%
                      </span>
                    </div>
                    <Progress 
                      value={(treasuryData.monthlyExpenses / treasuryData.monthlyIncome) * 100} 
                      className="h-2" 
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Réserves par rapport au budget annuel</span>
                      <span className="text-sm text-muted-foreground">
                        {Math.round((treasuryData.reserves / (treasuryData.monthlyExpenses * 12)) * 100)}%
                      </span>
                    </div>
                    <Progress 
                      value={(treasuryData.reserves / (treasuryData.monthlyExpenses * 12)) * 100} 
                      className="h-2" 
                    />
                  </div>
                  
                  <div className="pt-4">
                    <h4 className="text-sm font-medium mb-2">Revenu per capita</h4>
                    <div className="text-2xl font-semibold">
                      {formatMoney(Math.round((treasuryData.monthlyIncome * 12) / populationData.citizens))} <span className="text-sm text-muted-foreground">/ citoyen / an</span>
                    </div>
                  </div>
                </div>
              </RomanCard.Content>
            </RomanCard>
          </div>
        </TabsContent>
        
        <TabsContent value="income" className="space-y-4">
          <RomanCard>
            <RomanCard.Header>
              <h3 className="font-cinzel text-lg">Sources de revenus</h3>
            </RomanCard.Header>
            <RomanCard.Content>
              <p className="text-muted-foreground mb-4">
                Aperçu des revenus par type et province
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium mb-2">Revenus par type</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Tributum (Impôt direct)</span>
                        <span>{formatMoney(500000)}</span>
                      </div>
                      <Progress value={42} className="h-2 bg-muted mt-1" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Portorium (Droits de douane)</span>
                        <span>{formatMoney(300000)}</span>
                      </div>
                      <Progress value={25} className="h-2 bg-muted mt-1" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Vectigalia (Domaines publics)</span>
                        <span>{formatMoney(200000)}</span>
                      </div>
                      <Progress value={17} className="h-2 bg-muted mt-1" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Autres revenus</span>
                        <span>{formatMoney(200000)}</span>
                      </div>
                      <Progress value={17} className="h-2 bg-muted mt-1" />
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Revenus par province</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Italia</span>
                        <span>{formatMoney(400000)}</span>
                      </div>
                      <Progress value={33} className="h-2 bg-muted mt-1" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Hispania</span>
                        <span>{formatMoney(300000)}</span>
                      </div>
                      <Progress value={25} className="h-2 bg-muted mt-1" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Gallia</span>
                        <span>{formatMoney(250000)}</span>
                      </div>
                      <Progress value={21} className="h-2 bg-muted mt-1" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Autres provinces</span>
                        <span>{formatMoney(250000)}</span>
                      </div>
                      <Progress value={21} className="h-2 bg-muted mt-1" />
                    </div>
                  </div>
                </div>
              </div>
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
        
        <TabsContent value="expenses" className="space-y-4">
          <RomanCard>
            <RomanCard.Header>
              <h3 className="font-cinzel text-lg">Dépenses par catégorie</h3>
            </RomanCard.Header>
            <RomanCard.Content>
              <p className="text-muted-foreground mb-4">
                Répartition des dépenses de la République
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Armée</span>
                        <span>{formatMoney(500000)}</span>
                      </div>
                      <Progress value={48} className="h-2 bg-muted mt-1" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Administration</span>
                        <span>{formatMoney(200000)}</span>
                      </div>
                      <Progress value={19} className="h-2 bg-muted mt-1" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Bâtiments publics</span>
                        <span>{formatMoney(150000)}</span>
                      </div>
                      <Progress value={14} className="h-2 bg-muted mt-1" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Distributions publiques</span>
                        <span>{formatMoney(100000)}</span>
                      </div>
                      <Progress value={10} className="h-2 bg-muted mt-1" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Autres dépenses</span>
                        <span>{formatMoney(100000)}</span>
                      </div>
                      <Progress value={10} className="h-2 bg-muted mt-1" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <BarChart className="h-32 w-32 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mt-4">
                      Graphique détaillé des dépenses disponible dans les rapports financiers
                    </p>
                  </div>
                </div>
              </div>
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
        
        <TabsContent value="loans" className="space-y-4">
          <RomanCard>
            <RomanCard.Header className="flex justify-between items-center">
              <h3 className="font-cinzel text-lg">Prêts actifs</h3>
              <Button variant="outline" size="sm">
                <CreditCard className="mr-2 h-4 w-4" />
                Nouveau prêt
              </Button>
            </RomanCard.Header>
            <RomanCard.Content>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Créancier</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Taux d'intérêt</TableHead>
                      <TableHead>Date d'émission</TableHead>
                      <TableHead>Échéance</TableHead>
                      <TableHead className="text-right">Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {treasuryData.loans.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          Aucun prêt actif
                        </TableCell>
                      </TableRow>
                    ) : (
                      treasuryData.loans.map((loan) => (
                        <TableRow key={loan.id}>
                          <TableCell className="font-medium">{loan.creditor}</TableCell>
                          <TableCell>{formatMoney(loan.amount)}</TableCell>
                          <TableCell>{loan.interestRate}%</TableCell>
                          <TableCell>{loan.startDate}</TableCell>
                          <TableCell>{loan.dueDate}</TableCell>
                          <TableCell className="text-right">
                            {loan.paid ? (
                              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                                Remboursé
                              </span>
                            ) : (
                              <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-xs">
                                En cours
                              </span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-4">
          <RomanCard>
            <RomanCard.Header>
              <h3 className="font-cinzel text-lg">Rapports financiers</h3>
            </RomanCard.Header>
            <RomanCard.Content>
              <p className="text-muted-foreground mb-4">
                Consultez les rapports financiers détaillés
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="cursor-pointer hover:bg-muted/20 transition-colors">
                  <CardContent className="p-6 text-center">
                    <PieChart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <CardTitle className="text-md mb-2">Rapport trimestriel</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Résumé des finances du dernier trimestre
                    </p>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:bg-muted/20 transition-colors">
                  <CardContent className="p-6 text-center">
                    <BarChart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <CardTitle className="text-md mb-2">Rapport annuel</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      État financier complet de l'année
                    </p>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:bg-muted/20 transition-colors">
                  <CardContent className="p-6 text-center">
                    <ScrollText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <CardTitle className="text-md mb-2">Audit fiscal</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Vérification des finances publiques
                    </p>
                  </CardContent>
                </Card>
              </div>
            </RomanCard.Content>
          </RomanCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};
