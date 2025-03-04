
import React from 'react';
import { CalendarDays, Library, User } from 'lucide-react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';

export const TabsNavigation: React.FC = () => {
  const navigate = useNavigate();
  
  const handleTabChange = (value: string) => {
    switch (value) {
      case 'current':
        navigate('/famille/education/current');
        break;
      case 'paths':
        navigate('/famille/education/paths');
        break;
      case 'preceptors':
        navigate('/famille/education/preceptors');
        break;
      default:
        break;
    }
  };
  
  return (
    <TabsList className="w-full justify-start bg-white border border-rome-gold/30 mb-6">
      <TabsTrigger 
        value="current" 
        className="data-[state=active]:bg-rome-gold/10"
        onClick={() => handleTabChange('current')}
      >
        <CalendarDays className="h-4 w-4 mr-2" />
        Éducation en Cours
      </TabsTrigger>
      <TabsTrigger 
        value="paths" 
        className="data-[state=active]:bg-rome-gold/10"
        onClick={() => handleTabChange('paths')}
      >
        <Library className="h-4 w-4 mr-2" />
        Parcours Disponibles
      </TabsTrigger>
      <TabsTrigger 
        value="preceptors" 
        className="data-[state=active]:bg-rome-gold/10"
        onClick={() => handleTabChange('preceptors')}
      >
        <User className="h-4 w-4 mr-2" />
        Précepteurs
      </TabsTrigger>
    </TabsList>
  );
};
