
import React from 'react';
import { BookOpen, Coins } from 'lucide-react';
import { useEducation } from '../context/EducationContext';
import { formatCurrency } from '@/utils/currencyUtils';

export const EducationHeader: React.FC = () => {
  const { children, preceptors } = useEducation();
  
  // Calculate total costs
  const hiredPreceptors = preceptors.filter(p => p.available === false);
  const totalCost = hiredPreceptors.reduce((total, p) => total + (p.cost || 0), 0);
  
  // Children in education
  const educatedChildren = children.filter(child => child.educationType !== 'none');
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
      <div>
        <h1 className="text-3xl font-bold mb-1">
          <BookOpen className="inline-block h-8 w-8 mr-2 -mt-1" />
          Éducation des Enfants
        </h1>
        <p className="text-muted-foreground">
          Formez la prochaine génération pour perpétuer l'héritage familial
        </p>
      </div>
      
      <div className="flex gap-4 mt-4 md:mt-0">
        <div className="bg-green-50 text-green-700 border border-green-200 rounded-md px-3 py-2 flex flex-col items-center">
          <span className="text-sm font-medium">Enfants en formation</span>
          <span className="text-2xl font-bold">{educatedChildren.length}</span>
        </div>
        
        <div className="bg-amber-50 text-amber-700 border border-amber-200 rounded-md px-3 py-2 flex flex-col items-center">
          <span className="text-sm font-medium">Coût annuel</span>
          <div className="flex items-center gap-1">
            <Coins className="h-4 w-4" />
            <span className="text-xl font-bold">{formatCurrency(totalCost)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
