
import React from 'react';
import { FunctionCard } from '@/components/republique/ui/FunctionCard';
import { Shield, Users, Search, Building } from 'lucide-react';
import { Link } from 'react-router-dom';

export const EdileFunctions: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Link to="/republique/securite">
        <FunctionCard
          title="Ordre Public"
          description="Maintenez l'ordre dans les rues de Rome et gérez les incidents urbains."
          icon={<Shield className="h-8 w-8" />}
          color="bg-red-100"
          iconColor="text-red-600"
        />
      </Link>
      
      <Link to="/republique/milice">
        <FunctionCard
          title="Milice Urbaine"
          description="Organisez les forces de la milice urbaine pour protéger la population."
          icon={<Users className="h-8 w-8" />}
          color="bg-indigo-100"
          iconColor="text-indigo-600"
        />
      </Link>
      
      <Link to="/republique/enquetes">
        <FunctionCard
          title="Enquêtes Criminelles"
          description="Lancez et suivez des enquêtes sur les crimes et la corruption à Rome."
          icon={<Search className="h-8 w-8" />}
          color="bg-purple-100"
          iconColor="text-purple-600"
        />
      </Link>
      
      <Link to="/republique/infrastructures">
        <FunctionCard
          title="Infrastructures"
          description="Supervisez les marchés et l'entretien des infrastructures publiques."
          icon={<Building className="h-8 w-8" />}
          color="bg-cyan-100"
          iconColor="text-cyan-600"
        />
      </Link>
    </div>
  );
};
