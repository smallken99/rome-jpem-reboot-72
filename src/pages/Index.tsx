
import React from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { StatBox } from '@/components/ui-custom/StatBox';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { AllianceItem } from '@/components/features/AllianceItem';
import { useTimeStore } from '@/utils/timeSystem';
import { familyAlliances } from '@/data/alliances';
import { currentMagistracy } from '@/data/magistracies';
import { 
  Coins, 
  Award, 
  Landmark, 
  Users,
  Flag,
  Shield,
} from 'lucide-react';

// Obtenir seulement les alliances matrimoniales comme dans la page Famille
const marriageAlliances = familyAlliances.filter(alliance => alliance.type === 'matrimoniale');

interface FamilyStatisticProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconBgColor: string;
  iconColor: string;
}

const FamilyStatistic: React.FC<FamilyStatisticProps> = ({ 
  icon, 
  title, 
  description, 
  iconBgColor, 
  iconColor 
}) => {
  return (
    <div className="flex items-start gap-4 p-4 transition-all duration-300 hover:bg-rome-gold/5 rounded-md">
      <div className={`${iconBgColor} rounded-full p-3`}>
        <div className={`${iconColor}`}>{icon}</div>
      </div>
      <div>
        <h4 className="font-cinzel text-lg font-semibold">{title}</h4>
        <p className="text-muted-foreground text-sm mt-1">{description}</p>
      </div>
    </div>
  );
};

// Définition des partis politiques
const politicalParties = [
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

const Index = () => {
  // Get current year from the time system
  const { year } = useTimeStore();
  
  // Trouver le parti politique actif
  const activeParty = politicalParties.find(party => party.active) || politicalParties[0];
  
  // Create icon element from the currentMagistracy.icon component
  const MagistrateIcon = currentMagistracy.icon;
  const magistrateIconElement = <MagistrateIcon className="h-6 w-6" />;
  
  return (
    <Layout>
      <div className="space-y-8 max-w-5xl mx-auto">
        <div className="bg-gradient-to-r from-rome-navy/10 to-transparent p-6 rounded-lg border border-rome-gold/20">
          <PageHeader 
            title="Gens Aurelia" 
            subtitle={`Status: Patricien - Ancienneté: 293 AUC (depuis ${year-293} AUC)`} 
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatBox 
            title="Influence Sénatoriale" 
            value="72/100" 
            description="Progression mensuelle stable"
            icon={<Award className="h-5 w-5" />}
            trend="up"
            trendValue="+3"
            className="bg-white/90 backdrop-blur-sm border border-rome-gold/30 hover:border-rome-gold/50 transition-all duration-300"
          />
          <StatBox 
            title="Richesse Apparente" 
            value="3,450,000 Sesterces" 
            description="Aucun changement significatif"
            icon={<Coins className="h-5 w-5" />}
            trend="neutral"
            trendValue="0"
            className="bg-white/90 backdrop-blur-sm border border-rome-gold/30 hover:border-rome-gold/50 transition-all duration-300"
          />
          <StatBox 
            title="Réputation" 
            value="Respectée" 
            description="En hausse dans l'opinion publique"
            icon={<Flag className="h-5 w-5" />}
            trend="up"
            trendValue="+5%"
            className="bg-white/90 backdrop-blur-sm border border-rome-gold/30 hover:border-rome-gold/50 transition-all duration-300"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RomanCard className="bg-white/90 backdrop-blur-sm border border-rome-gold/30 hover:border-rome-gold/50 transition-all duration-300">
            <RomanCard.Header className="bg-gradient-to-r from-rome-navy/20 via-rome-navy/10 to-transparent border-b border-rome-gold/30">
              <h3 className="font-cinzel text-lg text-rome-navy">Parti politique</h3>
            </RomanCard.Header>
            <RomanCard.Content>
              <div className="space-y-4">
                {/* Affichage du parti actif */}
                <FamilyStatistic 
                  icon={activeParty.icon}
                  title={activeParty.name}
                  description={activeParty.description}
                  iconBgColor={activeParty.iconBgColor}
                  iconColor={activeParty.iconColor}
                />
                
                {/* Liste des autres partis */}
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
          
          <RomanCard className="bg-white/90 backdrop-blur-sm border border-rome-gold/30 hover:border-rome-gold/50 transition-all duration-300">
            <RomanCard.Header className="bg-gradient-to-r from-rome-terracotta/20 via-rome-terracotta/10 to-transparent border-b border-rome-gold/30">
              <h3 className="font-cinzel text-lg text-rome-navy">Magistrature actuelle</h3>
            </RomanCard.Header>
            <RomanCard.Content>
              <FamilyStatistic 
                icon={magistrateIconElement}
                title={`Marcus Aurelius Cotta - ${currentMagistracy.name}`}
                description={`${currentMagistracy.description} Son mandat prend fin en Mars ${year + 1} AUC.`}
                iconBgColor={currentMagistracy.iconBgColor}
                iconColor={currentMagistracy.iconColor}
              />
            </RomanCard.Content>
          </RomanCard>
        </div>
        
        <RomanCard className="bg-white/90 backdrop-blur-sm border border-rome-gold/30 hover:border-rome-gold/50 transition-all duration-300">
          <RomanCard.Header className="bg-gradient-to-r from-rome-gold/20 via-rome-gold/10 to-transparent border-b border-rome-gold/30">
            <h3 className="font-cinzel text-lg text-rome-navy">Alliances matrimoniales de la Gens</h3>
          </RomanCard.Header>
          <RomanCard.Content>
            <div className="space-y-2">
              {marriageAlliances.map((alliance, index) => (
                <AllianceItem 
                  key={alliance.id || index}
                  name={alliance.name}
                  type={alliance.type}
                  status={alliance.status}
                  benefits={alliance.benefits}
                />
              ))}
            </div>
            <div className="mt-6 text-center">
              <button className="roman-btn-outline text-sm hover:bg-rome-terracotta/10 transition-colors">Gérer les alliances</button>
            </div>
          </RomanCard.Content>
        </RomanCard>
      </div>
    </Layout>
  );
};

export default Index;
