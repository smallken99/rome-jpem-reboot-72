
import React from 'react';

export const FamilyLegend: React.FC = () => {
  return (
    <div className="mt-6 bg-white border rounded-lg p-4">
      <h3 className="font-medium text-sm mb-3">Légende</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-amber-50 border border-amber-300 mr-2"></div>
          <span>Pater Familias</span>
        </div>
        
        <div className="flex items-center">
          <div className="w-4 h-4 bg-pink-50 border border-pink-200 mr-2"></div>
          <span>Membres féminins</span>
        </div>
        
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-50 border border-blue-200 mr-2"></div>
          <span>Membres masculins</span>
        </div>
        
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-200 border border-gray-400 mr-2"></div>
          <span>Membres décédés</span>
        </div>
      </div>
    </div>
  );
};
