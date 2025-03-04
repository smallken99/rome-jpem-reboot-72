
import React from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { StatBox } from '@/components/ui-custom/StatBox';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { AllianceItem } from '@/components/features/AllianceItem';
import { 
  Coins, 
  Award, 
  Landmark, 
  Users,
  Flag,
  Shield,
  LucideIcon
} from 'lucide-react';

// Données de démonstration
const mockAlliances = [
  { name: 'Gens Julia', type: 'politique' as const, status: 'actif' as const },
  { name: 'Gens Claudia', type: 'matrimoniale' as const, status: 'en négociation' as const },
  { name: 'Gens Flavia', type: 'politique' as const, status: 'rompu' as const },
];

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

const Index = () => {
  return (
    <Layout>
      <div className="space-y-8 max-w-5xl mx-auto">
        <div className="bg-gradient-to-r from-rome-navy/10 to-transparent p-6 rounded-lg border border-rome-gold/20">
          <PageHeader 
            title="Gens Aurelia" 
            subtitle="Status: Patricien - Ancienneté: 293 AUC" 
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatBox 
            label="Influence Sénatoriale" 
            value="72/100" 
            icon={<Award className="h-5 w-5" />}
            trend="up"
            className="bg-white/90 backdrop-blur-sm border border-rome-gold/30 hover:border-rome-gold/50 transition-all duration-300"
          />
          <StatBox 
            label="Richesse Apparente" 
            value="3,450,000 Sesterces" 
            icon={<Coins className="h-5 w-5" />}
            trend="neutral"
            className="bg-white/90 backdrop-blur-sm border border-rome-gold/30 hover:border-rome-gold/50 transition-all duration-300"
          />
          <StatBox 
            label="Réputation" 
            value="Respectée" 
            icon={<Flag className="h-5 w-5" />}
            trend="up"
            className="bg-white/90 backdrop-blur-sm border border-rome-gold/30 hover:border-rome-gold/50 transition-all duration-300"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RomanCard 
            title="Parti politique" 
            className="bg-white/90 backdrop-blur-sm border border-rome-gold/30 hover:border-rome-gold/50 transition-all duration-300"
            headerClassName="bg-gradient-to-r from-rome-navy/20 via-rome-navy/10 to-transparent border-b border-rome-gold/30"
          >
            <FamilyStatistic 
              icon={<Landmark className="h-6 w-6" />}
              title="Optimates"
              description="La Gens Aurelia est une famille traditionaliste et influente dans la faction des Optimates, défendant les intérêts de l'aristocratie romaine et s'opposant aux réformes populaires."
              iconBgColor="bg-rome-navy/10"
              iconColor="text-rome-navy"
            />
          </RomanCard>
          
          <RomanCard 
            title="Magistrature actuelle"
            className="bg-white/90 backdrop-blur-sm border border-rome-gold/30 hover:border-rome-gold/50 transition-all duration-300"
            headerClassName="bg-gradient-to-r from-rome-terracotta/20 via-rome-terracotta/10 to-transparent border-b border-rome-gold/30"
          >
            <FamilyStatistic 
              icon={<Shield className="h-6 w-6" />}
              title="Marcus Aurelius Cotta - Préteur"
              description="En tant que Préteur, Marcus Aurelius administre la justice civile à Rome et peut commander des légions en l'absence des consuls. Son mandat prend fin en Mars 652 AUC."
              iconBgColor="bg-rome-terracotta/10"
              iconColor="text-rome-terracotta"
            />
          </RomanCard>
        </div>
        
        <RomanCard 
          title="Alliances de la Gens" 
          className="bg-white/90 backdrop-blur-sm border border-rome-gold/30 hover:border-rome-gold/50 transition-all duration-300"
          headerClassName="bg-gradient-to-r from-rome-gold/20 via-rome-gold/10 to-transparent border-b border-rome-gold/30"
        >
          <div className="space-y-2 p-2">
            {mockAlliances.map((alliance, index) => (
              <AllianceItem 
                key={index}
                name={alliance.name}
                type={alliance.type}
                status={alliance.status}
              />
            ))}
          </div>
          <div className="mt-6 text-center">
            <button className="roman-btn-outline text-sm hover:bg-rome-terracotta/10 transition-colors">Gérer les alliances</button>
          </div>
        </RomanCard>
      </div>
    </Layout>
  );
};

export default Index;
