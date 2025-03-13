
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, GraduationCap, Users } from 'lucide-react';

export const TabsNavigation: React.FC = () => {
  return (
    <TabsList className="grid grid-cols-3 mb-4">
      <TabsTrigger value="current" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-800">
        <BookOpen className="h-4 w-4 mr-2" />
        Éducation en cours
      </TabsTrigger>
      <TabsTrigger value="paths" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-800">
        <GraduationCap className="h-4 w-4 mr-2" />
        Parcours éducatifs
      </TabsTrigger>
      <TabsTrigger value="preceptors" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-800">
        <Users className="h-4 w-4 mr-2" />
        Précepteurs
      </TabsTrigger>
    </TabsList>
  );
};
