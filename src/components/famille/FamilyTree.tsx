
import React from 'react';
import { Separator } from '@/components/ui/separator';

// Sample family data
const familyMembers = [
  { 
    id: '1', 
    name: 'Marcus Tullius', 
    role: 'Pater Familias', 
    age: 52, 
    status: 'alive',
    spouse: 'Livia Augusta',
    image: '/images/placeholder.svg'
  },
  { 
    id: '2', 
    name: 'Livia Augusta', 
    role: 'Mater Familias', 
    age: 45, 
    status: 'alive',
    spouse: 'Marcus Tullius',
    image: '/images/placeholder.svg'
  },
  { 
    id: '3', 
    name: 'Gaius Tullius', 
    role: 'Filius', 
    age: 25, 
    status: 'alive',
    spouse: 'Cornelia Minor',
    image: '/images/placeholder.svg'
  },
  { 
    id: '4', 
    name: 'Cornelia Minor', 
    role: 'Nurus', 
    age: 22, 
    status: 'alive',
    spouse: 'Gaius Tullius',
    image: '/images/placeholder.svg'
  },
  { 
    id: '5', 
    name: 'Julia Tullia', 
    role: 'Filia', 
    age: 18, 
    status: 'alive',
    spouse: null,
    image: '/images/placeholder.svg'
  },
  { 
    id: '6', 
    name: 'Titus Tullius', 
    role: 'Filius', 
    age: 15, 
    status: 'alive',
    spouse: null,
    image: '/images/placeholder.svg'
  },
];

export const FamilyTree: React.FC = () => {
  return (
    <div className="family-tree-container">
      <div className="p-4 mb-4 bg-rome-parchment/50 rounded-md">
        <p className="italic text-muted-foreground">
          L'arbre généalogique représente les liens entre les membres de votre famille. 
          Cliquez sur un membre pour afficher plus de détails ou interagir avec lui.
        </p>
      </div>
      
      <div className="family-tree-visualization relative">
        <div className="flex flex-col items-center">
          {/* First generation - Pater and Mater */}
          <div className="flex justify-center gap-4 mb-8">
            {familyMembers.slice(0, 2).map(member => (
              <FamilyMember key={member.id} member={member} />
            ))}
          </div>
          
          {/* Marriage line */}
          <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-24 h-px bg-rome-gold/50"></div>
          
          {/* Vertical line to children */}
          <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-px h-8 bg-rome-gold/50"></div>
          
          {/* Second generation - Children */}
          <div className="flex justify-center gap-4 mt-8">
            {familyMembers.slice(2).map(member => (
              <FamilyMember key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 roman-card">
        <h4 className="font-cinzel text-lg mb-2">Légende</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
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
            <div className="w-3 h-3 rounded-full bg-muted"></div>
            <span>Époux/Épouses</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border border-dashed border-muted rounded-full"></div>
            <span>Décédé</span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface FamilyMemberProps {
  member: {
    id: string;
    name: string;
    role: string;
    age: number;
    status: string;
    spouse: string | null;
    image: string;
  };
}

const FamilyMember: React.FC<FamilyMemberProps> = ({ member }) => {
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
  
  return (
    <div className={`roman-card hover:shadow-md transition-all duration-300 w-48 p-3 relative ${member.status !== 'alive' ? 'opacity-70' : ''}`}>
      <div className={`absolute top-3 right-3 w-3 h-3 rounded-full ${getRoleColor(member.role)}`}></div>
      
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-muted mb-2 overflow-hidden">
          <img 
            src={member.image} 
            alt={member.name} 
            className="w-full h-full object-cover" 
          />
        </div>
        
        <h3 className="font-cinzel text-center">{member.name}</h3>
        <p className="text-sm text-muted-foreground">{member.role} • {member.age} ans</p>
        
        {member.spouse && (
          <div className="mt-2 text-xs">
            <span className="text-muted-foreground">Marié(e) à </span>
            <span className="font-medium">{member.spouse}</span>
          </div>
        )}
        
        <button className="mt-3 text-xs text-rome-terracotta hover:underline">
          Détails
        </button>
      </div>
    </div>
  );
};
