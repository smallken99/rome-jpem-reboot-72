
import React from 'react';
import { CalendarDays, Library, User, Home } from 'lucide-react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate, useLocation } from 'react-router-dom';
import { ActionButton } from '@/components/ui-custom/ActionButton';

export const TabsNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isTabActive = (path: string) => {
    return location.pathname.includes(path);
  };
  
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
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
      <TabsList className="w-full sm:w-auto justify-start bg-white border border-rome-gold/30">
        <TabsTrigger 
          value="current" 
          className={`data-[state=active]:bg-rome-gold/10 ${isTabActive('current') ? 'bg-rome-gold/10' : ''}`}
          onClick={() => handleTabChange('current')}
        >
          <CalendarDays className="h-4 w-4 mr-2" />
          Éducation en Cours
        </TabsTrigger>
        <TabsTrigger 
          value="paths" 
          className={`data-[state=active]:bg-rome-gold/10 ${isTabActive('paths') ? 'bg-rome-gold/10' : ''}`}
          onClick={() => handleTabChange('paths')}
        >
          <Library className="h-4 w-4 mr-2" />
          Parcours Disponibles
        </TabsTrigger>
        <TabsTrigger 
          value="preceptors" 
          className={`data-[state=active]:bg-rome-gold/10 ${isTabActive('preceptors') ? 'bg-rome-gold/10' : ''}`}
          onClick={() => handleTabChange('preceptors')}
        >
          <User className="h-4 w-4 mr-2" />
          Précepteurs
        </TabsTrigger>
      </TabsList>
      
      <ActionButton
        variant="outline"
        label="Retour à la famille"
        to="/famille"
        icon={<Home className="h-4 w-4" />}
      />
    </div>
  );
};
