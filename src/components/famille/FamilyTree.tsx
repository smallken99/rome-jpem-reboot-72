
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Character } from '@/types/character';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { CalendarDays, Crown, GitBranch, Heart, Users } from 'lucide-react';
import { TimePanel } from '@/components/time/TimePanel';

interface FamilyTreeProps {
  characters?: Character[];
}

export const FamilyTree: React.FC<FamilyTreeProps> = ({ characters = [] }) => {
  // Filter characters by their roles
  const getFamilyMembers = () => {
    const paterFamilias = characters.find(char => 
      char.isPlayer || 
      char.role?.toLowerCase().includes('chef') || 
      char.role?.toLowerCase().includes('pater')
    );
    
    const materFamilias = characters.find(char => 
      char.gender === 'female' && 
      (char.role?.toLowerCase().includes('épouse') || 
       char.role?.toLowerCase().includes('mater'))
    );
    
    const children = characters.filter(char => 
      (char.age < 18 || char.role?.toLowerCase().includes('fils') || char.role?.toLowerCase().includes('fille')) &&
      char.id !== paterFamilias?.id &&
      char.id !== materFamilias?.id
    );
    
    return {
      paterFamilias,
      materFamilias,
      children
    };
  };
  
  const { paterFamilias, materFamilias, children } = getFamilyMembers();
  
  return (
    <div className="family-tree-container">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <div className="p-4 mb-4 bg-rome-parchment/30 rounded-md">
            <p className="italic text-muted-foreground text-sm">
              L'arbre généalogique représente les liens entre les membres de votre famille. 
              Les relations familiales sont essentielles dans la société romaine et déterminent votre statut social.
            </p>
          </div>
          
          <div className="family-tree-visualization relative mt-8">
            <div className="flex flex-col items-center">
              {/* First generation - Pater and Mater */}
              <div className="flex justify-center gap-4 mb-12 relative">
                {paterFamilias && <FamilyMember member={paterFamilias} role="Pater Familias" />}
                
                {/* Marriage connector */}
                {paterFamilias && materFamilias && (
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="w-24 h-px bg-rome-gold/50"></div>
                    <Heart className="h-4 w-4 text-rome-gold/70" />
                    <div className="w-24 h-px bg-rome-gold/50"></div>
                  </div>
                )}
                
                {materFamilias && <FamilyMember member={materFamilias} role="Mater Familias" />}
              </div>
              
              {/* Vertical line to children */}
              {(paterFamilias || materFamilias) && children.length > 0 && (
                <div className="flex flex-col items-center mb-4">
                  <div className="w-px h-6 bg-rome-gold/50"></div>
                  <GitBranch className="h-5 w-5 text-rome-gold/70 rotate-180 mb-2" />
                </div>
              )}
              
              {/* Second generation - Children */}
              {children.length > 0 && (
                <div className="flex flex-wrap justify-center gap-4">
                  {children.map((child) => (
                    <FamilyMember 
                      key={child.id} 
                      member={child} 
                      role={child.gender === 'male' ? 'Filius' : 'Filia'} 
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-6 p-4 roman-card">
            <h4 className="font-cinzel text-base mb-2">Légende</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rome-terracotta"></div>
                <span>Pater Familias</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rome-gold"></div>
                <span>Mater Familias</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rome-navy"></div>
                <span>Enfants</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-3 w-3 text-rome-gold" />
                <span>Mariage</span>
              </div>
              <div className="flex items-center gap-2">
                <GitBranch className="h-3 w-3 text-muted-foreground" />
                <span>Descendance</span>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <TimePanel />
          
          <div className="mt-4 p-4 bg-rome-parchment/20 rounded-md">
            <h4 className="font-cinzel text-base mb-2 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Informations Familiales
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-muted-foreground">Membres:</span>
                <span className="font-medium">{characters.length}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-muted-foreground">Génération actuelle:</span>
                <span className="font-medium">2</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-muted-foreground">Alliances matrimoniales:</span>
                <span className="font-medium">1</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

interface FamilyMemberProps {
  member: Character;
  role: string;
}

const FamilyMember: React.FC<FamilyMemberProps> = ({ member, role }) => {
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
