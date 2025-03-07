
import React from 'react';
import { FunctionCard } from '@/components/republique/ui/FunctionCard';
import { Gavel, ScrollText, Scale, Flag } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PreteurFunctions: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Link to="/republique/justice">
        <FunctionCard
          title="Tribunaux"
          description="Supervisez les tribunaux et les jugements légaux de la République."
          icon={<Gavel className="h-8 w-8" />}
          color="bg-rome-navy/10"
          iconColor="text-rome-navy"
        />
      </Link>
      
      <Link to="/republique/proces-civils">
        <FunctionCard
          title="Procès Civils"
          description="Gérez les litiges entre citoyens romains selon le droit civil."
          icon={<ScrollText className="h-8 w-8" />}
          color="bg-orange-100"
          iconColor="text-orange-600"
        />
      </Link>
      
      <Link to="/republique/proces-criminels">
        <FunctionCard
          title="Procès Criminels"
          description="Présidez les procès criminels graves impliquant des citoyens romains."
          icon={<Scale className="h-8 w-8" />}
          color="bg-rose-100"
          iconColor="text-rose-600"
        />
      </Link>
      
      <Link to="/republique/commandement">
        <FunctionCard
          title="Commandement Militaire"
          description="Prenez le commandement d'une légion en l'absence des consuls."
          icon={<Flag className="h-8 w-8" />}
          color="bg-rome-terracotta/10"
          iconColor="text-rome-terracotta"
        />
      </Link>
    </div>
  );
};
