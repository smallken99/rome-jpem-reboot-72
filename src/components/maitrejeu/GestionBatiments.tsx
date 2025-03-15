
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, Construction } from 'lucide-react';
import { GestionBatimentsPage } from '@/components/republique/batiments/GestionBatimentsPage';

export const GestionBatiments: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="flex items-center gap-2">
              <Building className="h-8 w-8 text-amber-600" />
              Gestion des Bâtiments
            </span>
          </h1>
          <p className="text-muted-foreground">
            Administration des infrastructures publiques et militaires de la République
          </p>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <GestionBatimentsPage />
        </CardContent>
      </Card>
    </div>
  );
};
