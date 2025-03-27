
import React from 'react';
import { useEducation } from '../context/EducationContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const EducationInfoBox: React.FC = () => {
  const { children } = useEducation();
  
  // Calculate education statistics
  const totalChildren = children.length;
  const educatingCount = children.filter(c => c.educationType !== 'none').length;
  const educatingPercentage = totalChildren > 0 ? Math.round((educatingCount / totalChildren) * 100) : 0;
  
  // Calculate age distribution
  const youngChildren = children.filter(c => c.age < 7).length;
  const middleChildren = children.filter(c => c.age >= 7 && c.age < 14).length;
  const olderChildren = children.filter(c => c.age >= 14).length;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Éducation Familiale</CardTitle>
        <CardDescription>
          Vue d'ensemble de l'éducation des enfants
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-1">Enfants en éducation</h3>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${educatingPercentage}%` }}
                ></div>
              </div>
              <span className="ml-2 text-sm">{educatingCount} / {totalChildren}</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-1">Répartition par âge</h3>
            <div className="grid grid-cols-3 gap-1 text-center">
              <div>
                <div className="bg-green-100 rounded p-2">
                  <span className="block text-lg font-semibold">{youngChildren}</span>
                  <span className="text-xs text-muted-foreground">0-6 ans</span>
                </div>
              </div>
              <div>
                <div className="bg-blue-100 rounded p-2">
                  <span className="block text-lg font-semibold">{middleChildren}</span>
                  <span className="text-xs text-muted-foreground">7-13 ans</span>
                </div>
              </div>
              <div>
                <div className="bg-purple-100 rounded p-2">
                  <span className="block text-lg font-semibold">{olderChildren}</span>
                  <span className="text-xs text-muted-foreground">14+ ans</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground pt-2">
            <p>L'éducation romaine commence généralement à 7 ans.</p>
            <p>Les enfants de plus de 14 ans devraient recevoir une éducation spécialisée.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
