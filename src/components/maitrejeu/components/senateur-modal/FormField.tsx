
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FormFieldProps {
  label: string;
  id: string;
  name: string;
  value: string | number;
  type?: string;
  min?: string;
  max?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  name,
  value,
  type = 'text',
  min,
  max,
  onChange,
  readOnly
}) => {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor={id} className="text-right">{label}</Label>
      <Input
        id={id}
        name={name}
        type={type}
        value={value}
        min={min}
        max={max}
        onChange={onChange}
        readOnly={readOnly}
        className="col-span-3"
      />
    </div>
  );
};
