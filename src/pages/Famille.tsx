
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
          label="Membres de la famille" 
          value="12" 
          icon={<Users className="h-6 w-6" />} 
        />
        <StatBox 
          label="Alliances matrimoniales" 
          value="4" 
          icon={<Heart className="h-6 w-6" />} 
          trend="up"
        />
        <StatBox 
          label="Héritiers" 
          value="3" 
          icon={<ScrollText className="h-6 w-6" />} 
        />
      </div>

      <div className="mb-8">
        <RomanCard title="Arbre Généalogique" className="mb-8">
          <FamilyTree />
        </RomanCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <RomanCard title="Mariages et Alliances" className="h-full">
          <MarriageAlliances />
        </RomanCard>
        
        <RomanCard title="Héritage et Testaments" className="h-full">
          <Inheritance />
        </RomanCard>
      </div>

      <RomanCard title="Éducation des Enfants">
        <Education />
      </RomanCard>
    </Layout>
  );
};

export default Famille;
