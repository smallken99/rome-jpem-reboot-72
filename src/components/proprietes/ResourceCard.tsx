
import React from 'react';
import { TrendingUp, TrendingDown, Minus, MapPin } from 'lucide-react';

interface ResourceCardProps {
  name: string;
  production: string;
  location: string;
  value: string;
  trend: 'up' | 'down' | 'neutral' | 'hausse' | 'baisse' | 'stable';
}

export const ResourceCard: React.FC<ResourceCardProps> = ({
  name,
  production,
  location,
  value,
  trend
}) => {
  // Convert French trends to their English counterparts
  const normalizedTrend = () => {
    switch (trend) {
      case 'hausse': return 'up';
      case 'baisse': return 'down';
      case 'stable': return 'neutral';
      default: return trend;
    }
  };

  const getTrendIcon = () => {
    switch (normalizedTrend()) {
      case 'up':
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-5 w-5 text-red-500" />;
      case 'neutral':
        return <Minus className="h-5 w-5 text-gray-500" />;
      default:
        return <Minus className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTrendColor = () => {
    switch (normalizedTrend()) {
      case 'up':
        return 'text-green-500';
      case 'down':
        return 'text-red-500';
      case 'neutral':
        return 'text-gray-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="rounded-md overflow-hidden border border-rome-gold/30 hover:border-rome-gold transition-all bg-white/90 p-4">
      <div className="flex justify-between items-start">
        <h3 className="font-cinzel text-lg font-semibold text-rome-navy">{name}</h3>
        <div className={getTrendColor()}>{getTrendIcon()}</div>
      </div>
      
      <div className="flex items-center text-sm text-muted-foreground mt-1 mb-3">
        <MapPin className="h-3 w-3 mr-1" /> 
        {location}
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Production:</span>
          <span className="font-bold">{production}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Valeur:</span>
          <span className="font-bold">{value}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Tendance:</span>
          <span className={`font-bold ${getTrendColor()}`}>
            {trend.charAt(0).toUpperCase() + trend.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
};
