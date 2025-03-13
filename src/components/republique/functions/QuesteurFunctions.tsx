
import React from 'react';
import { FunctionCard } from '@/components/republique/ui/FunctionCard';
import { Coins, Calculator, ScrollText, Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';

export const QuesteurFunctions: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Link to="/republique/tresor">
        <FunctionCard
          title="Trésor Public"
          description="Gérez les finances publiques et supervisez le trésor de la République."
          icon={<Coins className="h-8 w-8" />}
          color="bg-amber-100"
          iconColor="text-amber-700"
        />
      </Link>
      
      <Link to="/republique/impots">
        <FunctionCard
          title="Perception d'Impôts"
          description="Supervisez la collecte des impôts dans Rome et les provinces."
          icon={<Calculator className="h-8 w-8" />}
          color="bg-green-100"
          iconColor="text-green-700"
        />
      </Link>
      
      <Link to="/republique/registres">
        <FunctionCard
          title="Registres Financiers"
          description="Consultez et mettez à jour les registres financiers de l'État."
          icon={<ScrollText className="h-8 w-8" />}
          color="bg-blue-100"
          iconColor="text-blue-700"
        />
      </Link>
      
      <Link to="/republique/domaines">
        <FunctionCard
          title="Domaines Publics"
          description="Gérez les propriétés et domaines appartenant à la République."
          icon={<Landmark className="h-8 w-8" />}
          color="bg-purple-100"
          iconColor="text-purple-700"
        />
      </Link>
    </div>
  );
};
