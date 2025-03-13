
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Crown, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Heir {
  id: string;
  name: string;
  role: string;
  gender: 'male' | 'female';
  age: number;
}

interface HeirCardProps {
  heir: Heir;
  isSelected: boolean;
  onSelect: (heirId: string) => void;
}

export const HeirCard: React.FC<HeirCardProps> = ({ heir, isSelected, onSelect }) => {
  return (
    <div 
      className={`flex items-center justify-between p-4 border rounded-md transition-all ${
        isSelected ? 'border-amber-500 bg-amber-50' : 'border-gray-200'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full ${isSelected ? 'bg-amber-100' : 'bg-slate-100'}`}>
          <User className={`h-5 w-5 ${isSelected ? 'text-amber-600' : 'text-slate-600'}`} />
        </div>
        <div>
          <div className="font-medium">{heir.name}</div>
          <div className="text-sm text-muted-foreground flex items-center gap-1">
            <span>{heir.role}</span>
            <span className="mx-1">•</span>
            <span>{heir.age} ans</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {isSelected ? (
          <Badge 
            variant="default"
            className="px-2 py-1 bg-amber-500 hover:bg-amber-500 flex items-center gap-1"
          >
            <Crown className="h-3 w-3" />
            <span>Héritier Principal</span>
          </Badge>
        ) : (
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1"
            onClick={() => onSelect(heir.id)}
          >
            <CheckCircle2 className="h-4 w-4" />
            Désigner Héritier
          </Button>
        )}
        
        <Button variant="ghost" size="sm" asChild>
          <Link to={`/famille/heritage/heir/${heir.id}`}>
            Détails
          </Link>
        </Button>
      </div>
    </div>
  );
};
