
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';
import { TraitesList } from './TraitesList';
import { NationsList } from './NationsList';
import { AlliancesMilitaires } from './AlliancesMilitaires';

export const RelationsDiplomatiques: React.FC = () => {
  const [activeTab, setActiveTab] = useState('nations');
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Relations Diplomatiques</CardTitle>
        <CardDescription>
          Gérez les relations de Rome avec les nations étrangères, les alliances et les traités.
        </CardDescription>
        
        <div className="relative mt-4">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Rechercher par nom, région, type..."
            className="pl-8"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="nations">Nations</TabsTrigger>
            <TabsTrigger value="traites">Traités</TabsTrigger>
            <TabsTrigger value="alliances">Alliances</TabsTrigger>
          </TabsList>
          
          <TabsContent value="nations" className="mt-4">
            <NationsList searchTerm={searchTerm} />
          </TabsContent>
          
          <TabsContent value="traites" className="mt-4">
            <TraitesList searchTerm={searchTerm} />
          </TabsContent>
          
          <TabsContent value="alliances" className="mt-4">
            <AlliancesMilitaires searchTerm={searchTerm} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
