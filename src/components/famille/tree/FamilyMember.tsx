
import React from 'react';
import { Character } from '@/types/character';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { CalendarDays, Crown } from 'lucide-react';

interface FamilyMemberProps {
  member: Character;
  role: string;
}

export const FamilyMember: React.FC<FamilyMemberProps> = ({ member, role }) => {
  const getRoleColor = (role: string) => {
    switch(role) {
      case 'Pater Familias':
        return 'bg-rome-terracotta';
      case 'Mater Familias':
        return 'bg-rome-gold';
      case 'Filius':
      case 'Filia':
        return 'bg-rome-navy';
      default:
        return 'bg-muted';
    }
  };
  
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <div className="roman-card hover:shadow-md transition-all duration-300 w-44 p-3 relative">
      <div className={`absolute top-2 right-2 w-3 h-3 rounded-full ${getRoleColor(role)}`}></div>
      
      <div className="flex flex-col items-center">
        <Avatar className="w-16 h-16 mb-2">
          {member.portrait ? (
            <AvatarImage src={member.portrait} alt={member.name} className="object-cover" />
          ) : (
            <AvatarFallback className="bg-muted text-xl font-cinzel">
              {getInitials(member.name)}
            </AvatarFallback>
          )}
        </Avatar>
        
        <h3 className="font-cinzel text-center text-sm">{member.name}</h3>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-xs text-muted-foreground">{role}</span>
          <span className="text-xs mx-1">•</span>
          <span className="text-xs flex items-center gap-1">
            <CalendarDays className="h-3 w-3 text-muted-foreground" />
            {member.age}
          </span>
        </div>
        
        {member.title && (
          <div className="mt-2 text-xs flex items-center gap-1 bg-muted/30 px-2 py-1 rounded-full">
            <Crown className="h-3 w-3 text-rome-gold" />
            <span>{member.title}</span>
          </div>
        )}
      </div>
    </div>
  );
};
