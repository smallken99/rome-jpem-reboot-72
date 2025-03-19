
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Preceptor } from '../types/educationTypes';

interface PreceptorSelectorProps {
  preceptors: Preceptor[];
  selectedPreceptorId: string | null;
  onSelectPreceptor: (preceptorId: string) => void;
  onHirePreceptor: (preceptorId: string) => void;
}

export const PreceptorSelector: React.FC<PreceptorSelectorProps> = ({
  preceptors,
  selectedPreceptorId,
  onSelectPreceptor,
  onHirePreceptor,
}) => {
  if (preceptors.length === 0) {
    return (
      <div className="p-4 text-center border rounded-md bg-slate-50">
        <p className="text-slate-500">Aucun précepteur disponible pour ce type d'éducation.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Choisir un précepteur</h3>
      <div className="grid grid-cols-1 gap-4">
        {preceptors.map((preceptor) => (
          <Card
            key={preceptor.id}
            className={`cursor-pointer hover:border-blue-400 transition-colors ${
              selectedPreceptorId === preceptor.id ? 'border-blue-500' : ''
            }`}
            onClick={() => onSelectPreceptor(preceptor.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{preceptor.name}</h4>
                  <p className="text-sm text-slate-500">
                    Spécialité: {preceptor.specialty}
                  </p>
                  <div className="flex items-center mt-1">
                    <span className="text-sm text-amber-600">Qualité: </span>
                    <div className="flex ml-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <svg
                          key={index}
                          className={`h-4 w-4 ${
                            index < (preceptor.quality || 0) / 20
                              ? 'text-amber-500'
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm mt-1">
                    <span className="font-medium">{preceptor.price} as</span> par an
                  </p>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onHirePreceptor(preceptor.id);
                  }}
                >
                  Engager
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
