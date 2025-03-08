
import React from 'react';
import { ScrollText, UserX, Scale, Book, ClipboardCheck } from 'lucide-react';
import { StatItem } from './StatItem';
import { useLoisStats } from './hooks/useLoisStats';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { InfoCircledIcon } from '@radix-ui/react-icons';

export const LoisStats: React.FC = () => {
  const { stats } = useLoisStats();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-rome-navy">Statistiques Légales</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center text-muted-foreground text-sm">
                <InfoCircledIcon className="h-4 w-4 mr-1" />
                <span>Mise à jour quotidienne</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Ces statistiques sont mises à jour chaque jour au lever du soleil.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatItem 
          title="Lois Actives"
          value={stats.activeLaws.count.toString()}
          icon={<ScrollText className="w-5 h-5" />}
          trend={stats.activeLaws.trend}
          trendValue={stats.activeLaws.trendValue}
          description="Total"
          additionalInfo={stats.activeLaws.info}
        />
        
        <StatItem 
          title="Propositions"
          value={stats.proposals.count.toString()}
          icon={<ClipboardCheck className="w-5 h-5" />}
          trend={stats.proposals.trend}
          trendValue={stats.proposals.trendValue}
          description="En attente"
          additionalInfo={stats.proposals.info}
        />
        
        <StatItem 
          title="Respect des Lois"
          value={stats.lawRespect.value}
          icon={<Scale className="w-5 h-5" />}
          trend={stats.lawRespect.trend}
          trendValue={stats.lawRespect.trendValue}
          description="Général"
          additionalInfo={stats.lawRespect.info}
        />
        
        <StatItem 
          title="Censures"
          value={stats.censures.count.toString()}
          icon={<UserX className="w-5 h-5" />}
          trend={stats.censures.trend}
          trendValue={stats.censures.trendValue}
          description="Trimestre actuel"
          additionalInfo={stats.censures.info}
        />
        
        <StatItem 
          title="Édits Censoriaux"
          value={stats.edicts.count.toString()}
          icon={<Book className="w-5 h-5" />}
          trend={stats.edicts.trend}
          trendValue={stats.edicts.trendValue}
          description="Actifs"
          additionalInfo={stats.edicts.info}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <div className="bg-white p-4 rounded-md border border-rome-gold/30 shadow-sm">
          <h4 className="font-medium text-sm text-rome-navy mb-2">Répartition des Lois</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs">Constitutionnelles</span>
              <div className="w-2/3">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-rome-gold" style={{ width: '35%' }}></div>
                </div>
              </div>
              <span className="text-xs font-medium">35%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs">Commerciales</span>
              <div className="w-2/3">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-rome-terracotta" style={{ width: '25%' }}></div>
                </div>
              </div>
              <span className="text-xs font-medium">25%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs">Religieuses</span>
              <div className="w-2/3">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-rome-navy" style={{ width: '20%' }}></div>
                </div>
              </div>
              <span className="text-xs font-medium">20%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs">Militaires</span>
              <div className="w-2/3">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500" style={{ width: '12%' }}></div>
                </div>
              </div>
              <span className="text-xs font-medium">12%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs">Autres</span>
              <div className="w-2/3">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gray-500" style={{ width: '8%' }}></div>
                </div>
              </div>
              <span className="text-xs font-medium">8%</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-md border border-rome-gold/30 shadow-sm">
          <h4 className="font-medium text-sm text-rome-navy mb-2">Activité Législative</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span>Nouvelles lois (mensuel)</span>
              <span className="font-medium text-green-600">+5</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span>Lois abrogées (mensuel)</span>
              <span className="font-medium text-red-600">-2</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span>Amendements (mensuel)</span>
              <span className="font-medium">8</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span>Vetos consulaires</span>
              <span className="font-medium">1</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span>Propositions rejetées</span>
              <span className="font-medium">3</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-md border border-rome-gold/30 shadow-sm">
          <h4 className="font-medium text-sm text-rome-navy mb-2">Impact des Lois</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span>Stabilité politique</span>
              <div className="flex items-center">
                <span className="mr-1">Forte</span>
                <div className="flex">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-2 h-2 bg-green-500 rounded-full mr-0.5"></div>
                  ))}
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span>Popularité du Sénat</span>
              <div className="flex items-center">
                <span className="mr-1">Moyenne</span>
                <div className="flex">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-2 h-2 bg-yellow-500 rounded-full mr-0.5"></div>
                  ))}
                  {[1, 2].map((i) => (
                    <div key={i} className="w-2 h-2 bg-gray-300 rounded-full mr-0.5"></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span>Efficacité administrative</span>
              <div className="flex items-center">
                <span className="mr-1">Élevée</span>
                <div className="flex">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-2 h-2 bg-green-500 rounded-full mr-0.5"></div>
                  ))}
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span>Prospérité économique</span>
              <div className="flex items-center">
                <span className="mr-1">Élevée</span>
                <div className="flex">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-2 h-2 bg-green-500 rounded-full mr-0.5"></div>
                  ))}
                  <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
