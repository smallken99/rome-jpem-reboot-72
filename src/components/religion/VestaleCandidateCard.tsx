
import React from 'react';
import { VestaleCandidate } from '@/types/vestale';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Flame, Shield, Book, Heart, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VestaleCandidateCardProps {
  candidate: VestaleCandidate;
}

export const VestaleCandidateCard: React.FC<VestaleCandidateCardProps> = ({ candidate }) => {
  const { firstName, lastName, stats, avatar } = candidate;
  
  return (
    <div className="border rounded-md p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        <Avatar className="h-10 w-10 border border-rome-gold/30">
          <AvatarImage src={avatar} alt={`${firstName} ${lastName}`} />
          <AvatarFallback>{firstName[0]}{lastName[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-cinzel font-medium">{firstName} {lastName}</h3>
          <p className="text-xs text-muted-foreground">Candidate Vestale</p>
        </div>
      </div>
      
      <div className="space-y-2 mb-3">
        <StatItem icon={<Flame className="h-3 w-3" />} name="Piété" value={stats.piety} />
        <StatItem icon={<Shield className="h-3 w-3" />} name="Discipline" value={stats.discipline} />
        <StatItem icon={<Book className="h-3 w-3" />} name="Intelligence" value={stats.intelligence} />
        <StatItem icon={<Heart className="h-3 w-3" />} name="Charisme" value={stats.charisma} />
      </div>
      
      <div className="flex justify-between items-center mt-4">
        <Button variant="outline" size="sm" className="text-xs">
          <Info className="h-3 w-3 mr-1" />
          Détails
        </Button>
        <Button size="sm" className="text-xs roman-btn">Proposer</Button>
      </div>
    </div>
  );
};

interface StatItemProps {
  icon: React.ReactNode;
  name: string;
  value: number;
}

export const StatItem: React.FC<StatItemProps> = ({ icon, name, value }) => {
  let color = "text-muted-foreground";
  if (value >= 80) color = "text-green-600";
  else if (value >= 60) color = "text-green-500";
  else if (value >= 40) color = "text-amber-500";
  else if (value < 30) color = "text-red-500";
  
  return (
    <div className="flex items-center justify-between text-xs">
      <div className="flex items-center gap-1">
        {icon}
        <span>{name}</span>
      </div>
      <span className={color}>{value}</span>
    </div>
  );
};
