
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const FamilyTreeLegend: React.FC = () => {
  return (
    <Card className="mt-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Légende</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span className="text-sm">Hommes</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-pink-500 rounded"></div>
          <span className="text-sm">Femmes</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-green-500 rounded"></div>
          <span className="text-sm">Chef de famille</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-300 rounded"></div>
          <span className="text-sm">Décédé</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border border-dashed border-gray-600 rounded"></div>
          <span className="text-sm">Relation par mariage</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border border-gray-600 rounded"></div>
          <span className="text-sm">Relation de sang</span>
        </div>
      </CardContent>
    </Card>
  );
};
