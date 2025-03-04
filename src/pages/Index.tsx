
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
  Shield
} from 'lucide-react';

// Données de démonstration
const mockAlliances = [
  { name: 'Gens Julia', type: 'politique' as const, status: 'actif' as const },
  { name: 'Gens Claudia', type: 'matrimoniale' as const, status: 'en négociation' as const },
  { name: 'Gens Flavia', type: 'politique' as const, status: 'rompu' as const },
];

const Index = () => {
  return (
    <Layout>
      <PageHeader 
        title="Gens Aurelia" 
        subtitle="Status: Patricien - Ancienneté: 293 AUC" 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatBox 
          label="Influence Sénatoriale" 
          value="72/100" 
          icon={<Award className="h-5 w-5" />}
          trend="up"
        />
        <StatBox 
          label="Richesse Apparente" 
          value="3,450,000 Sesterces" 
          icon={<Coins className="h-5 w-5" />}
          trend="neutral"
        />
        <StatBox 
          label="Réputation" 
          value="Respectée" 
          icon={<Flag className="h-5 w-5" />}
          trend="up"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <RomanCard title="Parti politique">
          <div className="flex items-start gap-4">
            <div className="bg-rome-navy/10 rounded-full p-3">
              <Landmark className="h-6 w-6 text-rome-navy" />
            </div>
            <div>
              <h4 className="font-cinzel text-lg font-semibold text-rome-navy">Optimates</h4>
              <p className="text-muted-foreground mb-2">Faction conservatrice du Sénat</p>
              <div className="text-sm">
                La Gens Aurelia est une famille traditionaliste et influente dans la faction des Optimates, 
                défendant les intérêts de l'aristocratie romaine et s'opposant aux réformes populaires.
              </div>
            </div>
          </div>
        </RomanCard>
        
        <RomanCard title="Magistrature actuelle">
          <div className="flex items-start gap-4">
            <div className="bg-rome-terracotta/10 rounded-full p-3">
              <Shield className="h-6 w-6 text-rome-terracotta" />
            </div>
            <div>
              <h4 className="font-cinzel text-lg font-semibold text-rome-terracotta">Préteur</h4>
              <p className="text-muted-foreground mb-2">Marcus Aurelius Cotta</p>
              <div className="text-sm">
                En tant que Préteur, Marcus Aurelius administre la justice civile à Rome et peut commander
                des légions en l'absence des consuls. Son mandat prend fin en Mars 652 AUC.
              </div>
            </div>
          </div>
        </RomanCard>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <RomanCard title="Alliances">
          <div className="divide-y divide-rome-gold/20">
            {mockAlliances.map((alliance, index) => (
              <AllianceItem 
                key={index}
                name={alliance.name}
                type={alliance.type}
                status={alliance.status}
              />
            ))}
          </div>
          <div className="mt-4 text-center">
            <button className="roman-btn-outline text-sm">Gérer les alliances</button>
          </div>
        </RomanCard>
      </div>
    </Layout>
  );
};

export default Index;
