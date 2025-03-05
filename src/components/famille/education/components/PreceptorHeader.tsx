
import React from 'react';
import { User } from 'lucide-react';
import { CardHeader } from '@/components/ui/card';
import { PreceptorQualityStars } from './PreceptorQualityStars';
import { Preceptor } from '../hooks/usePreceptorDetail';

interface PreceptorHeaderProps {
  preceptor: Preceptor;
}

export const PreceptorHeader: React.FC<PreceptorHeaderProps> = ({ preceptor }) => {
  return (
    <CardHeader className="pb-2 border-b border-rome-gold/20">
      <div className="flex justify-between items-center">
        <div className="font-cinzel text-xl flex items-center gap-2">
          <User className="h-5 w-5 text-rome-navy" />
          <span>{preceptor.name}</span>
        </div>
        <PreceptorQualityStars quality={preceptor.quality} />
      </div>
    </CardHeader>
  );
};
