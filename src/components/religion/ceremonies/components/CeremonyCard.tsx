
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Ceremony } from '../types';
import { getCeremonyTypeBadge, getNextCelebrationStatus } from '../utils/ceremonyUtils';
import { Calendar, Users, CircleDollarSign, Flame } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { Scroll } from 'lucide-react';

interface CeremonyCardProps {
  ceremony: Ceremony;
}

export const CeremonyCard: React.FC<CeremonyCardProps> = ({ ceremony }) => {
  return (
    <RomanCard className="bg-white hover:shadow-md transition-shadow">
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
  );
};
