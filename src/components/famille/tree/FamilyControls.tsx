
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, GraduationCap, HeartHandshake, Scroll } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FamilyControlsProps {
  onAddMember?: () => void;
}

export const FamilyControls: React.FC<FamilyControlsProps> = ({ onAddMember }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <Button 
        variant="outline" 
        className="flex items-center gap-2"
        onClick={onAddMember}
      >
        <PlusCircle className="h-4 w-4" />
        Ajouter un membre
      </Button>
      
      <Button 
        variant="outline" 
        className="flex items-center gap-2"
        onClick={() => navigate('/famille/education')}
      >
        <GraduationCap className="h-4 w-4" />
        Éducation
      </Button>
      
      <Button 
        variant="outline" 
        className="flex items-center gap-2"
        onClick={() => navigate('/famille/alliances')}
      >
        <HeartHandshake className="h-4 w-4" />
        Alliances
      </Button>
      
      <Button 
        variant="outline" 
        className="flex items-center gap-2"
        onClick={() => navigate('/famille/inheritance')}
      >
        <Scroll className="h-4 w-4" />
        Héritage
      </Button>
    </div>
  );
};
