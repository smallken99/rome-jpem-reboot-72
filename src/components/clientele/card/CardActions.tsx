
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export const CardActions: React.FC = () => {
  return (
    <div className="flex items-center justify-end mt-5 pt-4 border-t border-rome-gold/20">
      <Button variant="outline" className="roman-btn-outline text-xs gap-1 py-1 h-8">
        Détails
        <ChevronRight className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
};
