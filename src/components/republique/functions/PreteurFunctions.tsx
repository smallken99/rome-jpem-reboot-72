
import React from 'react';
import { FunctionCard } from '@/components/republique/ui/FunctionCard';
import { Gavel, Scale, FileText, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PreteurFunctions: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Link to="/republique/tribunaux">
        <FunctionCard
          title="Tribunaux"
          description="Présidez les tribunaux et administrez la justice civile et criminelle."
          icon={<Gavel className="h-8 w-8" />}
          color="bg-blue-100"
          iconColor="text-blue-700"
        />
      </Link>
      
      <Link to="/republique/proces">
        <FunctionCard
          title="Procès en Cours"
          description="Suivez et jugez les procès en cours dans les tribunaux romains."
          icon={<Scale className="h-8 w-8" />}
          color="bg-purple-100"
          iconColor="text-purple-700"
        />
      </Link>
      
      <Link to="/republique/edits">
        <FunctionCard
          title="Édits Prétoriens"
          description="Promulguez des édits pour préciser l'application des lois."
          icon={<FileText className="h-8 w-8" />}
          color="bg-amber-100"
          iconColor="text-amber-700"
        />
      </Link>
      
      <Link to="/republique/etrangeres">
        <FunctionCard
          title="Affaires Étrangères"
          description="Gérez les relations juridiques avec les non-citoyens et les provinces."
          icon={<Globe className="h-8 w-8" />}
          color="bg-emerald-100"
          iconColor="text-emerald-700"
        />
      </Link>
    </div>
  );
};
