
import React, { useState } from 'react';
import { Character, CharacterStat } from '@/types/character';
import { CharacterStats } from './CharacterStats';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Crown, 
  ShieldX, 
  Camera, 
  Edit, 
  Check, 
  Scroll,
  GraduationCap,
  HeartPulse,
  User
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EducationSpecialties } from './education/components/EducationSpecialties';
import { cn } from '@/lib/utils';

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

interface CharacterSheetProps {
  character: Character;
  className?: string;
  compact?: boolean;
  onEditPortrait?: (characterId: string) => void;
  onNameChange?: (characterId: string, newName: string) => void;
  onClick?: () => void;
}

export const CharacterSheet: React.FC<CharacterSheetProps> = ({ 
  character, 
  className,
  compact = false,
  onEditPortrait,
  onNameChange,
  onClick
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameValue, setNameValue] = useState(character.name);
  
  // Check if character is female (for martial education restrictions)
  const isFemale = character.gender === 'female';
  
  // Convert statistics to array for the CharacterStats component
  const statsArray = [
    character.stats.popularity, 
    character.stats.oratory, 
    character.stats.piety, 
    character.stats.martialEducation
  ];

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  // Set fallback background color based on gender
  const getFallbackColor = () => {
    return isFemale ? 'bg-rome-terracotta/20' : 'bg-rome-navy/20';
  };

  // Get a random Roman portrait if no portrait is set
  const getRandomPortrait = () => {
    if (character.portrait) return character.portrait;
    
    const portraitList = isFemale ? romanPortraits.female : romanPortraits.male;
    // Use character id to get a consistent portrait
    const portraitIndex = parseInt(character.id.replace(/[^0-9]/g, '')) % portraitList.length;
    return portraitList[portraitIndex] || portraitList[0];
  };

  // Handle name save
  const handleSaveName = () => {
    if (nameValue.trim() && onNameChange) {
      onNameChange(character.id, nameValue.trim());
      setIsEditingName(false);
    }
  };

  // Handle keydown on name input
  const handleNameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveName();
    } else if (e.key === 'Escape') {
      setNameValue(character.name);
      setIsEditingName(false);
    }
  };

  // Define the card content based on whether it's compact or full
  if (compact) {
    return (
      <div 
        className={cn("hover:shadow-md transition-shadow cursor-pointer", className)}
        onClick={onClick}
      >
        <RomanCard>
          <RomanCard.Content className="p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 rounded-md">
                <AvatarImage src={getRandomPortrait()} alt={character.name} className="object-cover" />
                <AvatarFallback className={`${getFallbackColor()} text-lg font-cinzel`}>
                  {getInitials(character.name)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-cinzel text-base text-rome-navy font-medium truncate">{character.name}</h3>
                  {character.isPlayer && (
                    <Badge className="bg-rome-gold text-white border-none shrink-0">Principal</Badge>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {character.age} ans
                  </span>
                  
                  {character.title && (
                    <span className="flex items-center">
                      <Crown className="h-3 w-3 mr-1 text-rome-gold" />
                      {character.title}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-3 grid grid-cols-2 gap-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Popularité</span>
                <span className="font-medium">{typeof character.stats.popularity === 'number' 
                  ? character.stats.popularity 
                  : character.stats.popularity.value}/100</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Éloquence</span>
                <span className="font-medium">{typeof character.stats.oratory === 'number' 
                  ? character.stats.oratory 
                  : character.stats.oratory.value}/100</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Piété</span>
                <span className="font-medium">{typeof character.stats.piety === 'number' 
                  ? character.stats.piety 
                  : character.stats.piety.value}/100</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Éducation Martiale</span>
                <span className="font-medium">{isFemale ? "N/A" : (typeof character.stats.martialEducation === 'number' 
                  ? character.stats.martialEducation 
                  : character.stats.martialEducation.value)}/100</span>
              </div>
            </div>
          </RomanCard.Content>
        </RomanCard>
      </div>
    );
  }

  return (
    <RomanCard className={className}>
      <RomanCard.Header>
        <div className="flex justify-between items-center">
          {isEditingName ? (
            <div className="flex items-center gap-2">
              <Input
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
                onKeyDown={handleNameKeyDown}
                className="font-cinzel text-lg text-rome-navy"
                autoFocus
              />
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleSaveName}
                className="h-8 w-8"
              >
                <Check className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h3 className="font-cinzel text-lg text-rome-navy">{character.name}</h3>
              {onNameChange && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsEditingName(true)}
                  className="h-6 w-6 opacity-50 hover:opacity-100"
                >
                  <Edit className="h-3 w-3" />
                </Button>
              )}
            </div>
          )}
          {character.isPlayer && (
            <Badge className="bg-rome-gold text-white border-none">Personnage Principal</Badge>
          )}
        </div>
      </RomanCard.Header>
      <RomanCard.Content>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/3 relative">
            <div className="aspect-square rounded-md overflow-hidden mb-4 flex items-center justify-center relative group">
              <Avatar className="w-full h-full rounded-md">
                <AvatarImage src={getRandomPortrait()} alt={character.name} className="object-cover" />
                <AvatarFallback className={`${getFallbackColor()} text-4xl font-cinzel w-full h-full`}>
                  {getInitials(character.name)}
                </AvatarFallback>
              </Avatar>
              
              {onEditPortrait && (
                <Button 
                  variant="outline" 
                  size="icon"
                  className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/70 hover:bg-white"
                  onClick={() => onEditPortrait(character.id)}
                >
                  <Camera className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-rome-navy/70" />
                <span>{character.age} ans</span>
              </div>
              
              {character.title && (
                <div className="flex items-center gap-2 text-sm">
                  <Crown className="h-4 w-4 text-rome-gold" />
                  <span className="font-medium">{character.title}</span>
                </div>
              )}
              
              {character.role && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{character.role}</span>
                </div>
              )}
              
              {/* Health Status if available */}
              {character.health !== undefined && (
                <div className="flex items-center gap-2 text-sm">
                  <HeartPulse className={`h-4 w-4 ${character.health >= 75 ? 'text-green-500' : character.health >= 50 ? 'text-amber-500' : 'text-red-500'}`} />
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Santé</span>
                      <span>{character.health}%</span>
                    </div>
                    <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          character.health >= 75 ? 'bg-green-500' : 
                          character.health >= 50 ? 'bg-amber-500' : 
                          'bg-red-500'
                        }`} 
                        style={{ width: `${character.health}%` }}
                      />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Education Specialties Section */}
              <EducationSpecialties education={character.education} />
            </div>
          </div>
          
          <div className="w-full md:w-2/3">
            <h4 className="font-cinzel text-base mb-3">Caractéristiques</h4>
            
            {isFemale && (
              <div className="mb-3 text-xs bg-red-50 p-2 rounded text-red-700 flex items-center gap-1">
                <ShieldX className="h-3 w-3" />
                <span>Les femmes romaines n'ont pas accès à l'éducation militaire, mais bénéficient d'un bonus de piété.</span>
              </div>
            )}
            
            <CharacterStats stats={statsArray} isFemale={isFemale} />
            
            {/* Display Traits if available */}
            {character.traits && character.traits.length > 0 && (
              <div className="mt-4">
                <h4 className="font-cinzel text-base mb-2">Traits</h4>
                <div className="flex flex-wrap gap-1.5">
                  {character.traits.map((trait, idx) => (
                    <Badge key={idx} variant="outline" className="bg-gray-50">
                      {trait}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {/* Status information */}
            {character.status && (
              <div className="mt-4">
                <h4 className="font-cinzel text-base mb-2">Statut</h4>
                <Badge 
                  className={cn(
                    character.status === 'alive' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                    character.status === 'deceased' ? 'bg-gray-100 text-gray-800 hover:bg-gray-200' :
                    character.status === 'exiled' ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' :
                    'bg-blue-100 text-blue-800 hover:bg-blue-200'
                  )}
                >
                  {character.status === 'alive' && 'Vivant'}
                  {character.status === 'deceased' && 'Décédé'}
                  {character.status === 'exiled' && 'Exilé'}
                  {!['alive', 'deceased', 'exiled'].includes(character.status) && character.status}
                </Badge>
              </div>
            )}
          </div>
        </div>
      </RomanCard.Content>
    </RomanCard>
  );
};
