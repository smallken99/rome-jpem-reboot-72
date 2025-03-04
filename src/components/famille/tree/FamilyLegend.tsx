
import React from 'react';
import { Heart, GitBranch } from 'lucide-react';

export const FamilyLegend: React.FC = () => {
  return (
    <div className="mt-6 p-4 roman-card">
      <h4 className="font-cinzel text-base mb-2">Légende</h4>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rome-terracotta"></div>
          <span>Pater Familias</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rome-gold"></div>
          <span>Mater Familias</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rome-navy"></div>
          <span>Enfants</span>
        </div>
        <div className="flex items-center gap-2">
          <Heart className="h-3 w-3 text-rome-gold" />
          <span>Mariage</span>
        </div>
        <div className="flex items-center gap-2">
          <GitBranch className="h-3 w-3 text-muted-foreground" />
          <span>Descendance</span>
        </div>
      </div>
    </div>
  );
};
