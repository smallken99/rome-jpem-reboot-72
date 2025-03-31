
import React from 'react';
import { Slider } from '@/components/ui/slider';

interface ClientInfluenceSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  color: 'blue' | 'green' | 'amber' | 'purple' | 'red';
  min?: number;
  max?: number;
}

export const ClientInfluenceSlider: React.FC<ClientInfluenceSliderProps> = ({
  label,
  value,
  onChange,
  color,
  min = 0,
  max = 10
}) => {
  const getColorClass = () => {
    switch (color) {
      case 'blue':
        return 'bg-blue-500';
      case 'green':
        return 'bg-green-500';
      case 'amber':
        return 'bg-amber-500';
      case 'purple':
        return 'bg-purple-500';
      case 'red':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  };

  const getLevelDescription = (val: number) => {
    const percentage = (val - min) / (max - min) * 100;
    
    if (percentage <= 20) return 'Très faible';
    if (percentage <= 40) return 'Faible';
    if (percentage <= 60) return 'Moyen';
    if (percentage <= 80) return 'Élevé';
    return 'Très élevé';
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{label}</span>
        <div className="flex items-center gap-2">
          <div className={`h-3 w-3 rounded-full ${getColorClass()}`}></div>
          <span className="text-sm font-medium">{value} - {getLevelDescription(value)}</span>
        </div>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={1}
        onValueChange={(values) => onChange(values[0])}
        className="cursor-pointer"
      />
    </div>
  );
};
