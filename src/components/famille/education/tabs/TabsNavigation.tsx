
import React from 'react';
import { CalendarDays, Library, User } from 'lucide-react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';

export const TabsNavigation: React.FC = () => {
  return (
    <TabsList className="w-full justify-start bg-white border border-rome-gold/30 mb-6">
      <TabsTrigger value="current" className="data-[state=active]:bg-rome-gold/10">
        <CalendarDays className="h-4 w-4 mr-2" />
        Éducation en Cours
      </TabsTrigger>
      <TabsTrigger value="paths" className="data-[state=active]:bg-rome-gold/10">
        <Library className="h-4 w-4 mr-2" />
        Parcours Disponibles
      </TabsTrigger>
      <TabsTrigger value="preceptors" className="data-[state=active]:bg-rome-gold/10">
        <User className="h-4 w-4 mr-2" />
        Précepteurs
      </TabsTrigger>
    </TabsList>
  );
};
