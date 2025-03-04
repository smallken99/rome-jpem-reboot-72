
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { FamilyStatistic } from '@/components/ui-custom/FamilyStatistic';
import { Landmark, Users, Shield, Flag } from 'lucide-react';

// Define type for political party
export interface PoliticalParty {
  name: string;
  description: string;
  icon: React.ReactNode;
  iconBgColor: string;
  iconColor: string;
  active: boolean;
}

// Define the political parties data
export const politicalParties: PoliticalParty[] = [
  {
    name: "Optimates",
    description: "La Gens Aurelia est une famille traditionaliste et influente dans la faction des Optimates, défendant les intérêts de l'aristocratie romaine et s'opposant aux réformes populaires.",
    icon: <Landmark className="h-6 w-6" />,
    iconBgColor: "bg-rome-navy/10",
    iconColor: "text-rome-navy",
    active: true
  },
  {
    name: "Populares",
    description: "Les Populares prônent des réformes en faveur des plébéiens et cherchent à limiter l'influence du Sénat au profit des assemblées populaires.",
    icon: <Users className="h-6 w-6" />,
    iconBgColor: "bg-rome-terracotta/10",
    iconColor: "text-rome-terracotta",
    active: false
  },
  {
    name: "Modéré",
    description: "Les Modérés cherchent l'équilibre entre traditions aristocratiques et réformes progressistes, privilégiant le consensus et la stabilité politique.",
    icon: <Shield className="h-6 w-6" />,
    iconBgColor: "bg-rome-gold/10",
    iconColor: "text-rome-gold/90",
    active: false
  },
  {
    name: "Non Alignés",
    description: "Sans affiliation politique claire, ils votent selon leurs intérêts personnels ou familiaux plutôt que de suivre une idéologie spécifique.",
    icon: <Flag className="h-6 w-6" />,
    iconBgColor: "bg-gray-200",
    iconColor: "text-gray-600",
    active: false
  }
];

export const PoliticalPartyCard: React.FC = () => {
  // Find the active party
  const activeParty = politicalParties.find(party => party.active) || politicalParties[0];
  
  return (
    <RomanCard className="bg-white/90 backdrop-blur-sm border border-rome-gold/30 hover:border-rome-gold/50 transition-all duration-300">
      <RomanCard.Header className="bg-gradient-to-r from-rome-navy/20 via-rome-navy/10 to-transparent border-b border-rome-gold/30">
        <h3 className="font-cinzel text-lg text-rome-navy">Parti politique</h3>
      </RomanCard.Header>
      <RomanCard.Content>
        <div className="space-y-4">
          {/* Display active party */}
          <FamilyStatistic 
            icon={activeParty.icon}
            title={activeParty.name}
            description={activeParty.description}
            iconBgColor={activeParty.iconBgColor}
            iconColor={activeParty.iconColor}
          />
          
          {/* List other parties */}
          <div className="mt-4">
            <div className="text-sm text-muted-foreground mb-2">Autres affiliations politiques:</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {politicalParties.filter(party => !party.active).map((party, index) => (
                <button key={index} className="text-xs py-1 px-2 border border-rome-gold/20 rounded hover:bg-rome-gold/5 transition-all">
                  {party.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </RomanCard.Content>
    </RomanCard>
  );
};
