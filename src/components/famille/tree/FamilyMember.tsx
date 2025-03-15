
import React from 'react';
import { Character } from '@/types/character';
import { 
  Crown, 
  User, 
  Shield, 
  GraduationCap,
  Scroll
} from 'lucide-react';

interface FamilyMemberProps {
  character: Character;
  roleLabel?: string;
  primary?: boolean;
}

export const FamilyMember: React.FC<FamilyMemberProps> = ({ 
  character, 
  roleLabel, 
  primary = false 
}) => {
  // Get display name with fallback
  const getDisplayName = () => {
    if (character.firstName && character.lastName) {
      return `${character.firstName} ${character.lastName}`;
    }
    return character.name;
  };

  // Détermine l'icône selon le rôle
  const getRoleIcon = () => {
    const role = roleLabel?.toLowerCase() || '';
    
    if (role.includes('pater') || role.includes('chef')) {
      return <Crown className="h-4 w-4 text-amber-600" />;
    }
    if (role.includes('mater') || role.includes('épouse')) {
      return <Crown className="h-4 w-4 text-amber-600" />;
    }
    if (role.includes('héritier')) {
      return <Shield className="h-4 w-4 text-blue-600" />;
    }
    if (role.includes('fils') || role.includes('fille')) {
      return <User className="h-4 w-4 text-emerald-600" />;
    }
    
    return <User className="h-4 w-4 text-gray-600" />;
  };
  
  // Détermine la couleur de bordure selon le rôle
  const getBorderClass = () => {
    if (primary) {
      return 'border-amber-600';
    }
    
    const role = roleLabel?.toLowerCase() || '';
    
    if (role.includes('héritier')) {
      return 'border-blue-600';
    }
    
    return character.gender === 'male' ? 'border-emerald-600' : 'border-purple-600';
  };
  
  return (
    <div className={`family-member p-3 rounded-lg border-2 ${getBorderClass()} bg-white shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex flex-col items-center gap-2">
        <div className="relative">
          {character.portrait ? (
            <img 
              src={character.portrait} 
              alt={getDisplayName()} 
              className="w-16 h-16 rounded-full object-cover border-2 border-amber-100"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center border-2 border-amber-100">
              <User className="h-8 w-8 text-gray-400" />
            </div>
          )}
          
          {character.isPlayer && (
            <div className="absolute -top-1 -right-1 bg-amber-500 text-white p-1 rounded-full">
              <User className="h-3 w-3" />
            </div>
          )}
        </div>
        
        <div className="text-center">
          <h3 className="font-cinzel font-bold text-sm text-gray-900">
            {getDisplayName()}
          </h3>
          
          <div className="flex items-center justify-center gap-1 mt-1">
            {getRoleIcon()}
            <span className="text-xs text-gray-600">{roleLabel || character.role || "Membre"}</span>
          </div>
          
          <div className="text-xs text-gray-500 mt-1">
            {character.age} ans
          </div>
          
          {character.title && (
            <div className="flex items-center justify-center gap-1 mt-1">
              <Scroll className="h-3 w-3 text-rome-terracotta" />
              <span className="text-xs italic text-rome-terracotta">{character.title}</span>
            </div>
          )}
          
          {character.education?.type && (
            <div className="flex items-center justify-center gap-1 mt-1">
              <GraduationCap className="h-3 w-3 text-blue-600" />
              <span className="text-xs text-blue-600">{character.education.type}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
