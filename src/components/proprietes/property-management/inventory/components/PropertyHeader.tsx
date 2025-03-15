
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Warehouse } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PropertyHeaderProps {
  propertyName: string;
  propertyId: string;
}

export const PropertyHeader: React.FC<PropertyHeaderProps> = ({ propertyName, propertyId }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          asChild
          className="h-8 w-8"
        >
          <Link to={`/patrimoine/proprietes/${propertyId}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-xl font-cinzel font-bold flex items-center gap-2">
            <Warehouse className="h-5 w-5 text-rome-terracotta" />
            Inventaire
          </h1>
          <p className="text-muted-foreground text-sm">
            {propertyName}
          </p>
        </div>
      </div>
      
      <Button variant="outline" size="sm" className="gap-1">
        <Download className="h-4 w-4" />
        <span>Exporter l'inventaire</span>
      </Button>
    </div>
  );
};
