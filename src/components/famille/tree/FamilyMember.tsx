
import React from 'react';
import { Character } from '@/types/character';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { CalendarDays, Crown } from 'lucide-react';

// Roman-style portraits for characters
const romanPortraits = {
  male: [
    "https://images.unsplash.com/photo-1610216705422-caa3fcb6d158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cm9tYW4lMjBtYW58ZW58MHwwfDB8fHww&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1620522849897-ff3758435af6?auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?auto=format&fit=crop&w=500&q=60"
  ],
  female: [
    "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d29tYW4lMjBwb3J0cmFpdHxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=500&q=60"
  ]
};

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
  
  // Get a roman portrait based on gender
  const getRomanPortrait = () => {
    const isFemale = member.gender === 'female';
    const portraitList = isFemale ? romanPortraits.female : romanPortraits.male;
    // Use member id to get a consistent portrait
    const portraitIndex = parseInt(member.id.replace(/[^0-9]/g, '')) % portraitList.length;
    return portraitList[portraitIndex] || portraitList[0];
  };
  
  return (
    <div className="roman-card hover:shadow-md transition-all duration-300 w-44 p-3 relative">
      <div className={`absolute top-2 right-2 w-3 h-3 rounded-full ${getRoleColor(role)}`}></div>
      
      <div className="flex flex-col items-center">
        <Avatar className="w-16 h-16 mb-2">
          <AvatarImage src={member.portrait || getRomanPortrait()} alt={member.name} className="object-cover" />
          <AvatarFallback className="bg-muted text-xl font-cinzel">
            {getInitials(member.name)}
          </AvatarFallback>
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
