
import React from 'react';
import { FunctionCard } from '@/components/republique/ui/FunctionCard';
import { BookText, UserCheck, Building, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CenseurFunctions: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Link to="/republique/lois">
        <FunctionCard
          title="Révision des Lois"
          description="Révisez et proposez de nouvelles lois pour la République."
          icon={<BookText className="h-8 w-8" />}
          color="bg-amber-100"
          iconColor="text-amber-700"
        />
      </Link>
      
      <Link to="/republique/listes">
        <FunctionCard
          title="Listes Officielles"
          description="Gérez les listes des sénateurs et des chevaliers romains."
          icon={<UserCheck className="h-8 w-8" />}
          color="bg-indigo-100"
          iconColor="text-indigo-700"
        />
      </Link>
      
      <Link to="/republique/batiments">
        <FunctionCard
          title="Grands Travaux"
          description="Supervisez les grands projets de construction et d'urbanisme de Rome."
          icon={<Building className="h-8 w-8" />}
          color="bg-cyan-100"
          iconColor="text-cyan-700"
        />
      </Link>
      
      <Link to="/republique/moralite">
        <FunctionCard
          title="Censure Publique"
          description="Surveillez la moralité des citoyens et des magistrats de Rome."
          icon={<Shield className="h-8 w-8" />}
          color="bg-rose-100"
          iconColor="text-rose-700"
        />
      </Link>
    </div>
  );
};
