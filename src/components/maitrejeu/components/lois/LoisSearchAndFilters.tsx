
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Filter, Search } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileCheck, FileX, History, ScrollText } from 'lucide-react';

interface LoisSearchAndFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  activeTab: string;
  onTabChange: (value: string) => void;
}

export const LoisSearchAndFilters: React.FC<LoisSearchAndFiltersProps> = ({
  searchTerm,
  onSearchChange,
  activeTab,
  onTabChange
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Rechercher une loi..." 
            className="pl-8"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-4">
        <TabsList>
          <TabsTrigger value="actives" className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            <span>Lois Actives</span>
          </TabsTrigger>
          <TabsTrigger value="proposees" className="flex items-center gap-2">
            <ScrollText className="h-4 w-4" />
            <span>Lois Proposées</span>
          </TabsTrigger>
          <TabsTrigger value="rejetees" className="flex items-center gap-2">
            <FileX className="h-4 w-4" />
            <span>Lois Rejetées</span>
          </TabsTrigger>
          <TabsTrigger value="historique" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            <span>Historique</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
