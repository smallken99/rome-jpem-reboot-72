
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RomanCard } from './RomanCard';

export interface RelatedFeature {
  title: string;
  description: string;
  path: string;
  icon?: React.ReactNode;
}

interface RelatedFeaturesProps {
  title?: string;
  features: RelatedFeature[];
  className?: string;
}

export const RelatedFeatures: React.FC<RelatedFeaturesProps> = ({
  title = "Fonctionnalités liées",
  features,
  className
}) => {
  return (
    <RomanCard className={cn("mt-6", className)}>
      <RomanCard.Header>
        <h3 className="font-cinzel text-lg">{title}</h3>
      </RomanCard.Header>
      <RomanCard.Content>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <Link 
              key={index} 
              to={feature.path}
              className="block p-4 border border-rome-gold/30 rounded-md hover:bg-rome-gold/5 transition-colors"
            >
              <div className="flex items-start gap-3">
                {feature.icon && <div className="mt-1">{feature.icon}</div>}
                <div className="flex-1">
                  <h4 className="font-medium text-rome-navy">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                  <div className="flex items-center gap-1 text-rome-terracotta text-sm mt-2">
                    <span>Accéder</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </RomanCard.Content>
    </RomanCard>
  );
};
