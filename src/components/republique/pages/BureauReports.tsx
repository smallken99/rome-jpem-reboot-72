
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { 
  PieChart, 
  BarChart, 
  BookOpen, 
  FileText, 
  HandshakeIcon, 
  Presentation 
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ReportCardProps {
  title: string;
  description: string;
  date: string;
  icon: React.ReactNode;
  status: 'positive' | 'negative' | 'neutral' | 'urgent';
}

const ReportCard: React.FC<ReportCardProps> = ({ title, description, date, icon, status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'positive':
        return 'bg-green-50 border-green-200';
      case 'negative':
        return 'bg-red-50 border-red-200';
      case 'urgent':
        return 'bg-amber-50 border-amber-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className={`border rounded-md p-4 ${getStatusStyles()}`}>
      <div className="flex items-start gap-3">
        <div className="mt-1">{icon}</div>
        <div className="flex-1">
          <h3 className="font-medium text-lg">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
          <div className="text-xs text-muted-foreground mt-2">{date}</div>
        </div>
      </div>
    </div>
  );
};

export const BureauReports: React.FC<{ magistratureId: string }> = ({ magistratureId }) => {
  return (
    <Tabs defaultValue="rapports" className="w-full">
      <TabsList className="w-full mb-6">
        <TabsTrigger value="rapports">Rapports</TabsTrigger>
        <TabsTrigger value="statistiques">Statistiques</TabsTrigger>
        <TabsTrigger value="decisions">Décisions en attente</TabsTrigger>
      </TabsList>

      <TabsContent value="rapports">
        <RomanCard>
          <RomanCard.Header>
            <h3 className="font-cinzel">Rapports Récents</h3>
          </RomanCard.Header>
          <RomanCard.Content>
            <div className="space-y-4">
              {magistratureId === 'preteur' && (
                <>
                  <ReportCard
                    title="Affaire criminelle majeure"
                    description="Le sénateur Lucius Aemilius est accusé de corruption. L'affaire vous a été transmise pour jugement."
                    date="Il y a 3 jours"
                    icon={<FileText className="h-5 w-5 text-amber-600" />}
                    status="urgent"
                  />
                  <ReportCard
                    title="Recueil des lois mis à jour"
                    description="L'édition actualisée du recueil des lois romaines a été complétée par les scribes."
                    date="Il y a 5 jours"
                    icon={<BookOpen className="h-5 w-5 text-blue-600" />}
                    status="positive"
                  />
                </>
              )}
              
              {magistratureId === 'consul' && (
                <>
                  <ReportCard
                    title="Rencontre diplomatique"
                    description="Les ambassadeurs carthaginois demandent une audience pour discuter des termes du traité commercial."
                    date="Hier"
                    icon={<HandshakeIcon className="h-5 w-5 text-amber-600" />}
                    status="urgent"
                  />
                  <ReportCard
                    title="Rapport militaire des frontières"
                    description="Situation calme sur toutes les frontières. Les légions sont bien positionnées."
                    date="Il y a 2 jours"
                    icon={<FileText className="h-5 w-5 text-green-600" />}
                    status="positive"
                  />
                </>
              )}
              
              {magistratureId === 'edile' && (
                <>
                  <ReportCard
                    title="Problème d'approvisionnement en grain"
                    description="Le prix du grain a augmenté de 15% à cause de retards dans les livraisons d'Égypte."
                    date="Aujourd'hui"
                    icon={<Presentation className="h-5 w-5 text-red-600" />}
                    status="negative"
                  />
                  <ReportCard
                    title="Inspection des aqueducs terminée"
                    description="L'inspection révèle que l'aqueduc Appien nécessite des réparations mineures."
                    date="Il y a 4 jours"
                    icon={<FileText className="h-5 w-5 text-blue-600" />}
                    status="neutral"
                  />
                </>
              )}
              
              {magistratureId === 'questeur' && (
                <>
                  <ReportCard
                    title="Revenus fiscaux en hausse"
                    description="Les revenus fiscaux de la province d'Hispanie ont augmenté de 8% ce trimestre."
                    date="Il y a 2 jours"
                    icon={<BarChart className="h-5 w-5 text-green-600" />}
                    status="positive"
                  />
                  <ReportCard
                    title="Audit des dépenses publiques"
                    description="L'audit révèle des irrégularités dans les dépenses du projet de construction du nouveau forum."
                    date="Il y a 7 jours"
                    icon={<PieChart className="h-5 w-5 text-amber-600" />}
                    status="urgent"
                  />
                </>
              )}
              
              {magistratureId === 'censeur' && (
                <>
                  <ReportCard
                    title="Révision du registre des citoyens"
                    description="Le nouveau recensement indique une augmentation de 3% du nombre de citoyens."
                    date="Il y a 1 jour"
                    icon={<FileText className="h-5 w-5 text-blue-600" />}
                    status="neutral"
                  />
                  <ReportCard
                    title="Cas de moralité publique"
                    description="Plusieurs sénateurs ont été signalés pour comportement indigne. Une enquête est recommandée."
                    date="Il y a 6 jours"
                    icon={<FileText className="h-5 w-5 text-red-600" />}
                    status="negative"
                  />
                </>
              )}
            </div>
          </RomanCard.Content>
        </RomanCard>
      </TabsContent>

      <TabsContent value="statistiques">
        <RomanCard>
          <RomanCard.Header>
            <h3 className="font-cinzel">Statistiques de votre Magistrature</h3>
          </RomanCard.Header>
          <RomanCard.Content>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-lg">Performances</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Efficacité</span>
                      <span className="text-sm text-muted-foreground">76%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '76%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Soutien Sénatorial</span>
                      <span className="text-sm text-muted-foreground">62%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '62%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-muted-foreground">Soutien Populaire</span>
                      <span className="text-sm text-muted-foreground">84%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '84%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-lg mb-4">Activité Récente</h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm border-b pb-2">
                    <span>Décisions prises</span>
                    <span className="font-medium">27</span>
                  </div>
                  <div className="flex justify-between text-sm border-b pb-2">
                    <span>Rapports émis</span>
                    <span className="font-medium">14</span>
                  </div>
                  <div className="flex justify-between text-sm border-b pb-2">
                    <span>Réunions tenues</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Jours restants</span>
                    <span className="font-medium">127</span>
                  </div>
                </div>
              </div>
            </div>
          </RomanCard.Content>
        </RomanCard>
      </TabsContent>

      <TabsContent value="decisions">
        <RomanCard>
          <RomanCard.Header>
            <h3 className="font-cinzel">Décisions en Attente</h3>
          </RomanCard.Header>
          <RomanCard.Content>
            <div className="space-y-4">
              {magistratureId === 'preteur' && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Vous avez 3 affaires juridiques en attente de jugement.</p>
                  <p className="mt-2">
                    <a href="#" className="text-blue-600 hover:underline">Consulter les dossiers</a>
                  </p>
                </div>
              )}
              
              {magistratureId === 'consul' && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Vous avez 2 propositions diplomatiques à examiner.</p>
                  <p className="mt-2">
                    <a href="#" className="text-blue-600 hover:underline">Consulter les propositions</a>
                  </p>
                </div>
              )}
              
              {(magistratureId === 'edile' || magistratureId === 'questeur' || magistratureId === 'censeur') && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Aucune décision urgente n'est en attente actuellement.</p>
                </div>
              )}
            </div>
          </RomanCard.Content>
        </RomanCard>
      </TabsContent>
    </Tabs>
  );
};
