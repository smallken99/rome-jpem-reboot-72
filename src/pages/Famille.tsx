
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { FamilyTree } from '@/components/famille/FamilyTree';
import { MarriageAlliances } from '@/components/famille/MarriageAlliances';
import { Inheritance } from '@/components/famille/Inheritance';
import { Education } from '@/components/famille/Education';
import { CharacterSheet } from '@/components/famille/CharacterSheet';
import { StatBox } from '@/components/ui-custom/StatBox';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Heart, ScrollText, GraduationCap, User } from 'lucide-react';
import { characters } from '@/data/characters';

const Famille = () => {
  const [activeCharacter, setActiveCharacter] = useState(characters[0]);

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
        <Tabs defaultValue="characters" className="w-full">
          <TabsList className="mb-4 bg-white border border-rome-gold/30">
            <TabsTrigger value="characters" className="data-[state=active]:bg-rome-gold/10">
              <User className="h-4 w-4 mr-2" /> Personnages
            </TabsTrigger>
            <TabsTrigger value="family-tree" className="data-[state=active]:bg-rome-gold/10">
              <Users className="h-4 w-4 mr-2" /> Arbre Généalogique
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="characters" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {characters.map((character) => (
                <CharacterSheet 
                  key={character.id} 
                  character={character} 
                  className={activeCharacter.id === character.id ? 'border-rome-gold' : ''}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="family-tree">
            <RomanCard className="mb-8">
              <RomanCard.Header>
                <h3 className="font-cinzel text-lg text-rome-navy">Arbre Généalogique</h3>
              </RomanCard.Header>
              <RomanCard.Content>
                <FamilyTree />
              </RomanCard.Content>
            </RomanCard>
          </TabsContent>
        </Tabs>
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
