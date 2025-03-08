
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FactionSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

export const FactionSelector: React.FC<FactionSelectorProps> = ({
  value,
  onValueChange
}) => {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="appartenance" className="text-right">Faction</Label>
      <Select 
        value={value || 'Neutral'} 
        onValueChange={onValueChange}
      >
        <SelectTrigger className="col-span-3">
          <SelectValue placeholder="Faction politique" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Optimates">Optimates</SelectItem>
          <SelectItem value="Populares">Populares</SelectItem>
          <SelectItem value="Neutral">Neutre</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
