
import React from 'react';
import { Button } from '@/components/ui/button';
import { InfoCircle } from 'lucide-react';

export const FamilyTreeIntro: React.FC = () => {
  return (
    <div className="bg-stone-100 border border-stone-200 rounded-lg p-4 mb-6">
      <div className="flex items-start space-x-3">
        <InfoCircle className="h-5 w-5 text-stone-600 mt-0.5" />
        <div>
          <h3 className="font-medium text-lg mb-1">Arbre Généalogique Familial</h3>
          <p className="text-sm text-stone-600 mb-3">
            Visualisez votre lignée familiale et assurez la continuité de votre nom.
            L'arbre généalogique montre vos relations familiales directes et trace la succession potentielle.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-1">Importance de la Lignée</h4>
              <p className="text-stone-600">
                Dans la Rome antique, la perpétuation du nom familial est essentielle. 
                Assurez-vous d'avoir des héritiers mâles pour préserver votre lignée.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Succession &amp; Héritage</h4>
              <p className="text-stone-600">
                Selon la tradition romaine, le fils aîné hérite généralement des titres et 
                responsabilités du pater familias. Planifiez votre succession avec soin.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
