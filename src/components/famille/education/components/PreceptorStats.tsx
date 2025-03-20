
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Preceptor } from '../types/educationTypes';

interface PreceptorStatsProps {
  preceptor: Preceptor;
}

export const PreceptorStats: React.FC<PreceptorStatsProps> = ({ preceptor }) => {
  // Valeurs par défaut ou dérivées si non fournies
  const quality = preceptor.quality || 70;
  const expertise = preceptor.expertise || preceptor.skill || quality;
  const teachingStyle = preceptor.teachingStyle || (quality > 80 ? 'Exigeant' : quality > 60 ? 'Équilibré' : 'Indulgent');
  const description = preceptor.description || preceptor.background || `Un précepteur spécialisé en ${preceptor.specialty || preceptor.speciality}.`;
  
  // Calculer les compétences spécifiques
  const disciplineScore = Math.min(100, quality + (Math.random() * 20 - 10));
  const knowledgeScore = Math.min(100, expertise + (Math.random() * 10));
  const pedagogyScore = Math.min(100, quality - 5 + (Math.random() * 20));
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-lg mb-2">À propos</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium mb-2">Informations</h4>
          <dl className="space-y-2">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Spécialité</dt>
              <dd className="font-medium">{preceptor.specialty || preceptor.speciality}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Style d'enseignement</dt>
              <dd className="font-medium">{teachingStyle}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Coût annuel</dt>
              <dd className="font-medium">{preceptor.price || preceptor.cost} as</dd>
            </div>
            {preceptor.specialties && preceptor.specialties.length > 0 && (
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Domaines d'expertise</dt>
                <dd className="font-medium text-right">{preceptor.specialties.join(', ')}</dd>
              </div>
            )}
          </dl>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">Compétences</h4>
          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Connaissance</span>
                <span>{Math.round(knowledgeScore)}%</span>
              </div>
              <Progress value={knowledgeScore} className="h-2" />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Discipline</span>
                <span>{Math.round(disciplineScore)}%</span>
              </div>
              <Progress value={disciplineScore} className="h-2" />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Pédagogie</span>
                <span>{Math.round(pedagogyScore)}%</span>
              </div>
              <Progress value={pedagogyScore} className="h-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
