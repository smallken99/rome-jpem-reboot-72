
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface CheckboxGroupProps {
  options: string[];
  selectedOptions: string[];
  onChange: (selectedOptions: string[]) => void;
  className?: string;
  maxSelections?: number;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  selectedOptions,
  onChange,
  className,
  maxSelections = 3
}) => {
  const handleCheckboxChange = (option: string, checked: boolean) => {
    if (checked) {
      // If we're at the max selections and trying to add more, prevent it
      if (maxSelections && selectedOptions.length >= maxSelections) {
        // Replace the oldest selection with the new one
        const newSelections = [...selectedOptions.slice(1), option];
        onChange(newSelections);
        return;
      }
      onChange([...selectedOptions, option]);
    } else {
      onChange(selectedOptions.filter(item => item !== option));
    }
  };
  
  return (
    <div className={cn("space-y-2", className)}>
      {options.map((option) => (
        <div key={option} className="flex items-center space-x-2">
          <Checkbox 
            id={`checkbox-${option}`}
            checked={selectedOptions.includes(option)}
            onCheckedChange={(checked) => 
              handleCheckboxChange(option, checked as boolean)
            }
          />
          <Label 
            htmlFor={`checkbox-${option}`}
            className="text-sm font-normal cursor-pointer"
          >
            {option}
          </Label>
        </div>
      ))}
      
      {maxSelections && (
        <p className="text-xs text-muted-foreground mt-1">
          Maximum {maxSelections} spécialités. {selectedOptions.length}/{maxSelections} sélectionnées.
        </p>
      )}
    </div>
  );
};

export default CheckboxGroup;
