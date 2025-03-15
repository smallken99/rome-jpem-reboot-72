
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProcessusLegislatif } from './processus-legislatif/ProcessusLegislatif';
import { RelationsDiplomatiques } from './relations/RelationsDiplomatiques';

export interface RepubliqueStructureProps {
  magistratureId?: string;
}

export const RepubliqueStructure: React.FC<RepubliqueStructureProps> = ({ 
  magistratureId 
}) => {
  const [activeTab, setActiveTab] = useState('processus-legislatif');
  
  // Determine which tabs to show based on magistratureId
  const showLegislativeProcess = !magistratureId || ['consul', 'preteur', 'censeur'].includes(magistratureId);
  const showForeignRelations = !magistratureId || ['consul'].includes(magistratureId);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Structure de la République</CardTitle>
        <CardDescription>
          Administrez les institutions et le processus législatif de la République
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            {showLegislativeProcess && (
              <TabsTrigger value="processus-legislatif">Processus Législatif</TabsTrigger>
            )}
            {showForeignRelations && (
              <TabsTrigger value="relations-diplomatiques">Relations Diplomatiques</TabsTrigger>
            )}
          </TabsList>
          
          {showLegislativeProcess && (
            <TabsContent value="processus-legislatif" className="pt-4">
              <ProcessusLegislatif />
            </TabsContent>
          )}
          
          {showForeignRelations && (
            <TabsContent value="relations-diplomatiques" className="pt-4">
              <RelationsDiplomatiques />
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
};
