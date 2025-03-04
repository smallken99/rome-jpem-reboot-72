
import React from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { FamilyTree } from '@/components/famille/FamilyTree';
import { MarriageAlliances } from '@/components/famille/MarriageAlliances';
import { Inheritance } from '@/components/famille/Inheritance';
import { Education } from '@/components/famille/Education';
import { StatBox } from '@/components/ui-custom/StatBox';
import { Separator } from '@/components/ui/separator';
import { Users, Heart, ScrollText, GraduationCap } from 'lucide-react';

const Famille = () => {
  return (
    <Layout>
      <PageHeader
        title="Famille"
        subtitle="Gérez votre dynastie et assurez l'avenir de votre Gens"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatBox 
          title="Membres de la famille" 
          value="12" 
          description="Membres directs et affiliés"
          icon={<Users className="h-6 w-6" />} 
        />
        <StatBox 
          title="Alliances matrimoniales" 
          value="4" 
          description="En augmentation ce semestre"
          icon={<Heart className="h-6 w-6" />} 
          trend="up"
          trendValue="+1"
        />
        <StatBox 
          title="Héritiers" 
          value="3" 
          description="Lignée directe masculine"
          icon={<ScrollText className="h-6 w-6" />} 
        />
      </div>

      <div className="mb-8">
        <RomanCard className="mb-8">
          <RomanCard.Header>
            <h3 className="font-cinzel text-lg text-rome-navy">Arbre Généalogique</h3>
          </RomanCard.Header>
          <RomanCard.Content>
            <FamilyTree />
          </RomanCard.Content>
        </RomanCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <RomanCard className="h-full">
          <RomanCard.Header>
            <h3 className="font-cinzel text-lg text-rome-navy">Mariages et Alliances</h3>
          </RomanCard.Header>
          <RomanCard.Content>
            <MarriageAlliances />
          </RomanCard.Content>
        </RomanCard>
        
        <RomanCard className="h-full">
          <RomanCard.Header>
            <h3 className="font-cinzel text-lg text-rome-navy">Héritage et Testaments</h3>
          </RomanCard.Header>
          <RomanCard.Content>
            <Inheritance />
          </RomanCard.Content>
        </RomanCard>
      </div>

      <RomanCard>
        <RomanCard.Header>
          <h3 className="font-cinzel text-lg text-rome-navy">Éducation des Enfants</h3>
        </RomanCard.Header>
        <RomanCard.Content>
          <Education />
        </RomanCard.Content>
      </RomanCard>
    </Layout>
  );
};

export default Famille;
