
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Pencil, Save, X } from 'lucide-react';

interface Heir {
  name: string;
  value: number;
  amount: number;
}

interface HeirsTableProps {
  heirs: Heir[];
  editMode?: boolean;
  onUpdateHeir?: (index: number, newValue: number) => void;
}

export const HeirsTable: React.FC<HeirsTableProps> = ({ 
  heirs, 
  editMode = false,
  onUpdateHeir
}) => {
  const [editValues, setEditValues] = React.useState<number[]>(heirs.map(h => h.value));
  
  const handleChange = (index: number, value: string) => {
    const newValue = parseInt(value);
    if (isNaN(newValue) || newValue < 0 || newValue > 100) return;
    
    const newValues = [...editValues];
    newValues[index] = newValue;
    setEditValues(newValues);
  };
  
  const handleSave = (index: number) => {
    if (onUpdateHeir) {
      onUpdateHeir(index, editValues[index]);
    }
  };
  
  return (
    <div className="space-y-2">
      {heirs.map((heir, index) => (
        <div key={index} className="py-2 border-b last:border-0">
          <div className="flex justify-between items-center">
            <span className="font-medium">{heir.name}</span>
            {editMode ? (
              <div className="flex items-center space-x-1">
                <Input
                  type="number"
                  value={editValues[index]}
                  onChange={(e) => handleChange(index, e.target.value)}
                  className="w-16 h-8 text-center"
                  min={0}
                  max={100}
                />
                <span className="ml-1 text-muted-foreground text-sm">%</span>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleSave(index)}>
                  <Save className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center">
                <span className="font-semibold">{heir.value}%</span>
                <span className="ml-2 text-muted-foreground text-sm">
                  ({heir.amount.toLocaleString()} As)
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
      
      {!editMode && (
        <div className="mt-4 pt-2 border-t">
          <div className="flex justify-between items-center">
            <span className="font-medium">Valeur totale:</span>
            <span className="font-semibold">
              {heirs.reduce((sum, heir) => sum + heir.amount, 0).toLocaleString()} As
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
