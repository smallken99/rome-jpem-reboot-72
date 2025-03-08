
import React from 'react';
import { FunctionCard } from '@/components/republique/ui/FunctionCard';
import { Coins, Map, Receipt, LineChart, LandPlot, Calculator, Archive, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

export const QuesteurFunctions: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Link to="/republique/tresor">
        <FunctionCard
          title="Trésor Public"
          description="Gérez les finances de l'État, consultez les revenus et dépenses, et ajustez le budget."
          icon={<Coins className="h-8 w-8" />}
          color="bg-rome-gold/10"
          iconColor="text-rome-gold"
        />
      </Link>
      
      <Link to="/republique/impots">
        <FunctionCard
          title="Gestion des Impôts"
          description="Supervisez la collecte des impôts, fixez les taux et approuvez les exemptions fiscales."
          icon={<Receipt className="h-8 w-8" />}
          color="bg-emerald-100"
          iconColor="text-emerald-600"
        />
      </Link>
      
      <Link to="/republique/domaines">
        <FunctionCard
          title="Terres Publiques"
          description="Attribuez les terres de l'ager publicus aux citoyens et aux colonies romaines."
          icon={<Map className="h-8 w-8" />}
          color="bg-amber-100"
          iconColor="text-amber-600"
        />
      </Link>
      
      <Link to="/republique/ager">
        <FunctionCard
          title="Ager Publicus"
          description="Gérez l'attribution des terres agricoles aux citoyens et vétérans romains."
          icon={<LandPlot className="h-8 w-8" />}
          color="bg-lime-100"
          iconColor="text-lime-600"
        />
      </Link>
      
      <Link to="/republique/depenses">
        <FunctionCard
          title="Dépenses Militaires"
          description="Suivez et approuvez les dépenses militaires et administratives de la République."
          icon={<LineChart className="h-8 w-8" />}
          color="bg-blue-100"
          iconColor="text-blue-600"
        />
      </Link>
      
      <Link to="/republique/rapports-financiers">
        <FunctionCard
          title="Rapports Financiers"
          description="Préparez des rapports financiers pour le Sénat et les magistrats."
          icon={<Archive className="h-8 w-8" />}
          color="bg-purple-100"
          iconColor="text-purple-600"
        />
      </Link>
      
      <Link to="/republique/audit">
        <FunctionCard
          title="Audit des Comptes"
          description="Examinez les comptes des provinces et des magistrats pour garantir leur intégrité."
          icon={<Calculator className="h-8 w-8" />}
          color="bg-rose-100"
          iconColor="text-rose-600"
        />
      </Link>
      
      <Link to="/republique/registres-financiers">
        <FunctionCard
          title="Registres Financiers"
          description="Consultez l'historique des transactions et l'évolution des finances publiques."
          icon={<Database className="h-8 w-8" />}
          color="bg-cyan-100"
          iconColor="text-cyan-600"
        />
      </Link>
    </div>
  );
};
