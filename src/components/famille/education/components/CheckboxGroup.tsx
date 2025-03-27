
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface CheckboxGroupProps {
  options: string[];
  selectedOptions: string[];
  onChange: (selectedOptions: string[]) => void;
  label?: string;
  className?: string;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  selectedOptions,
  onChange,
  label,
  className
}) => {
  const handleCheckboxChange = (option: string) => {
    if (selectedOptions.includes(option)) {
      onChange(selectedOptions.filter(item => item !== option));
    } else {
      onChange([...selectedOptions, option]);
    }
  };

  return (
    <div className={className}>
      {label && <div className="text-sm font-medium mb-2">{label}</div>}
      <div className="space-y-2">
        {options.map(option => (
          <div key={option} className="flex items-center space-x-2">
            <Checkbox
              id={`option-${option}`}
              checked={selectedOptions.includes(option)}
              onCheckedChange={() => handleCheckboxChange(option)}
            />
            <Label
              htmlFor={`option-${option}`}
              className="text-sm font-normal cursor-pointer"
            >
              {option}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckboxGroup;
