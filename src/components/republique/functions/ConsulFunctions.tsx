
import React from 'react';
import { FunctionCard } from '@/components/republique/ui/FunctionCard';
import { Globe, Swords, HandshakeIcon, FileSpreadsheet } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ConsulFunctions: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Link to="/republique/politique">
        <FunctionCard
          title="Politique Intérieure"
          description="Dirigez la politique intérieure de Rome et prenez des décisions importantes."
          icon={<FileSpreadsheet className="h-8 w-8" />}
          color="bg-purple-100"
          iconColor="text-purple-700"
        />
      </Link>
      
      <Link to="/republique/politique-etrangere">
        <FunctionCard
          title="Politique Étrangère"
          description="Gérez les relations diplomatiques avec les autres peuples et nations."
          icon={<Globe className="h-8 w-8" />}
          color="bg-blue-100"
          iconColor="text-blue-700"
        />
      </Link>
      
      <Link to="/republique/armee">
        <FunctionCard
          title="Commandement Militaire"
          description="Exercez le commandement suprême des légions romaines en campagne."
          icon={<Swords className="h-8 w-8" />}
          color="bg-red-100"
          iconColor="text-red-700"
        />
      </Link>
      
      <Link to="/republique/alliances">
        <FunctionCard
          title="Alliances et Traités"
          description="Négociez et établissez des alliances et des traités avec d'autres peuples."
          icon={<HandshakeIcon className="h-8 w-8" />}
          color="bg-emerald-100"
          iconColor="text-emerald-700"
        />
      </Link>
    </div>
  );
};
