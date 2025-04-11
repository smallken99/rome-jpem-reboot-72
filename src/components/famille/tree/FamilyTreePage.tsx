
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FamilyTree } from '../FamilyTree';
import { useCharacters } from '../hooks/useCharacters';
import { characters as defaultCharacters } from '@/data/characters';
import { ZoomIn, ZoomOut, Save, Share, Download } from 'lucide-react';
import { FamilyTreeControls } from './FamilyTreeControls';
import { FamilyTreeLegend } from './FamilyTreeLegend';

export const FamilyTreePage = () => {
  const { localCharacters } = useCharacters();
  const [zoom, setZoom] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'default' | 'compact' | 'detailed'>('default');
  
  // Use local characters if available, otherwise use default
  const characters = localCharacters.length > 0 ? localCharacters : defaultCharacters;
  
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 2));
  };
  
  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.5));
  };
  
  const handleExport = () => {
    console.log("Exporting family tree...");
    // Implementation would depend on a library choice
  };
  
  return (
    <Layout>
      <PageHeader
        title="Arbre Généalogique Familial"
        subtitle="Visualisez les liens de votre lignée romaine et leur histoire"
      />
      
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Arbre Généalogique</CardTitle>
            <FamilyTreeControls
              onZoomIn={handleZoomIn}
              onZoomOut={handleZoomOut}
              onExport={handleExport}
              zoom={zoom}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }} className="transition-transform">
            <FamilyTree 
              characters={characters} 
            />
          </div>
        </CardContent>
      </Card>
      
      <FamilyTreeLegend />
    </Layout>
  );
};

export default FamilyTreePage;
