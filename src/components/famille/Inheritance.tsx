
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Scroll, Users, Coins } from 'lucide-react';
import { InheritanceChart } from './inheritance/InheritanceChart';
import { HeirsTable } from './inheritance/HeirsTable';
import { ActionButton } from '@/components/ui-custom/ActionButton';

// Mock data for inheritance
const inheritanceData = {
  totalValue: 250000,
  distribution: [
    { name: 'Marcus (fils aîné)', value: 40, amount: 100000 },
    { name: 'Lucius (fils cadet)', value: 20, amount: 50000 },
    { name: 'Julia (fille)', value: 15, amount: 37500 },
    { name: 'Temples', value: 10, amount: 25000 },
    { name: 'Famille élargie', value: 10, amount: 25000 },
    { name: 'Affranchis', value: 5, amount: 12500 },
  ]
};

export const Inheritance: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  
  return (
    <div className="inheritance">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-cinzel mb-1">Testament et Héritage</h3>
          <p className="text-sm text-muted-foreground">
            Déterminez comment votre patrimoine sera transmis à vos héritiers
          </p>
        </div>
        
        <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
          <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-800 rounded">
            <Coins className="h-4 w-4" />
            <span className="font-medium">{inheritanceData.totalValue.toLocaleString()} As de patrimoine</span>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-800 rounded">
            <Users className="h-4 w-4" />
            <span className="font-medium">{inheritanceData.distribution.length} bénéficiaires</span>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 roman-btn-outline"
            onClick={() => setIsEditMode(!isEditMode)}
          >
            <Scroll className="h-4 w-4" />
            {isEditMode ? 'Annuler les modifications' : 'Modifier le testament'}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Distribution du patrimoine</CardTitle>
          </CardHeader>
          <CardContent>
            <InheritanceChart data={inheritanceData.distribution} />
            
            {isEditMode && (
              <div className="flex justify-end mt-4">
                <ActionButton
                  label="Enregistrer les modifications"
                  onClick={() => setIsEditMode(false)}
                />
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Liste des héritiers</CardTitle>
          </CardHeader>
          <CardContent>
            <HeirsTable 
              heirs={inheritanceData.distribution} 
              editMode={isEditMode} 
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
