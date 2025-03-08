
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { VestaleCandidate, characterToVestaleCandidate } from '@/types/vestale';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Fire, Star, Info, Heart, Book, Shield, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { characters } from '@/data/characters';
import { Character } from '@/types/character';

const Religion = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<ReligionMain />} />
        <Route path="/vestales" element={<VestalesPage />} />
        <Route path="/temples" element={<TemplesPage />} />
        <Route path="/ceremonies" element={<CeremoniesPage />} />
        <Route path="/augures" element={<AuguresPage />} />
        <Route path="*" element={<Navigate to="/religion" replace />} />
      </Routes>
    </Layout>
  );
};

const ReligionMain = () => {
  const youngFemales = characters
    .filter(character => character.gender === 'female' && character.age >= 6 && character.age <= 10)
    .map(character => characterToVestaleCandidate(character));
  
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Religion Romaine" 
        subtitle="Temples, rites et augures"
      />
      
      <Tabs defaultValue="vestales">
        <TabsList className="bg-white border border-rome-gold/30">
          <TabsTrigger value="vestales">Vestales</TabsTrigger>
          <TabsTrigger value="temples">Temples</TabsTrigger>
          <TabsTrigger value="ceremonies">Cérémonies</TabsTrigger>
          <TabsTrigger value="augures">Augures</TabsTrigger>
        </TabsList>
        
        <TabsContent value="vestales" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <RomanCard>
                <RomanCard.Header>
                  <h2 className="font-cinzel text-xl">Candidates Vestales</h2>
                </RomanCard.Header>
                <RomanCard.Content>
                  <p className="mb-6 text-muted-foreground">
                    Les jeunes filles de familles nobles peuvent devenir candidates au sacerdoce des Vestales, protectrices de la flamme sacrée de Rome.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {youngFemales.map(candidate => (
                      <VestaleCandidateCard key={candidate.id} candidate={candidate} />
                    ))}
                  </div>
                </RomanCard.Content>
              </RomanCard>
            </div>
            
            <div>
              <RomanCard>
                <RomanCard.Header>
                  <h2 className="font-cinzel text-lg flex items-center gap-2">
                    <Fire className="h-4 w-4 text-rome-gold" />
                    Le Collège des Vestales
                  </h2>
                </RomanCard.Header>
                <RomanCard.Content>
                  <p className="text-sm text-muted-foreground">
                    Rejoindre le Collège des Vestales est un grand honneur qui apporte prestige et influence à votre famille. Les Vestales sont sélectionnées entre 6 et 10 ans et servent pendant 30 ans.
                  </p>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Nombre de Vestales:</span>
                      <span>6 / 6</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Prochaine sélection:</span>
                      <span>Dans 2 ans</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Bonus de piété:</span>
                      <span className="text-rome-terracotta">+15%</span>
                    </div>
                  </div>
                </RomanCard.Content>
              </RomanCard>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="temples" className="mt-6">
          <TemplesContent />
        </TabsContent>
        
        <TabsContent value="ceremonies" className="mt-6">
          <CeremoniesContent />
        </TabsContent>
        
        <TabsContent value="augures" className="mt-6">
          <AuguresContent />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Pages pour chaque sous-section
const VestalesPage = () => <div>Page des Vestales</div>;
const TemplesPage = () => <div>Page des Temples</div>;
const CeremoniesPage = () => <div>Page des Cérémonies</div>;
const AuguresPage = () => <div>Page des Augures</div>;

// Contenu pour les onglets
const TemplesContent = () => {
  return (
    <RomanCard>
      <RomanCard.Header>
        <h2 className="font-cinzel text-xl">Temples de Rome</h2>
      </RomanCard.Header>
      <RomanCard.Content>
        <p>Contenu des temples en construction...</p>
      </RomanCard.Content>
    </RomanCard>
  );
};

const CeremoniesContent = () => {
  return (
    <RomanCard>
      <RomanCard.Header>
        <h2 className="font-cinzel text-xl">Cérémonies religieuses</h2>
      </RomanCard.Header>
      <RomanCard.Content>
        <p>Contenu des cérémonies en construction...</p>
      </RomanCard.Content>
    </RomanCard>
  );
};

const AuguresContent = () => {
  return (
    <RomanCard>
      <RomanCard.Header>
        <h2 className="font-cinzel text-xl">Collège des Augures</h2>
      </RomanCard.Header>
      <RomanCard.Content>
        <p>Contenu des augures en construction...</p>
      </RomanCard.Content>
    </RomanCard>
  );
};

// Composant pour la carte de candidate vestale 
const VestaleCandidateCard: React.FC<{ candidate: VestaleCandidate }> = ({ candidate }) => {
  const { firstName, lastName, stats, avatar } = candidate;
  
  return (
    <div className="border rounded-md p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        <Avatar className="h-10 w-10 border border-rome-gold/30">
          <AvatarImage src={avatar} alt={`${firstName} ${lastName}`} />
          <AvatarFallback>{firstName[0]}{lastName[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-cinzel font-medium">{firstName} {lastName}</h3>
          <p className="text-xs text-muted-foreground">Candidate Vestale</p>
        </div>
      </div>
      
      <div className="space-y-2 mb-3">
        <StatItem icon={<Fire className="h-3 w-3" />} name="Piété" value={stats.piety} />
        <StatItem icon={<Shield className="h-3 w-3" />} name="Discipline" value={stats.discipline} />
        <StatItem icon={<Book className="h-3 w-3" />} name="Intelligence" value={stats.intelligence} />
        <StatItem icon={<Heart className="h-3 w-3" />} name="Charisme" value={stats.charisma} />
      </div>
      
      <div className="flex justify-between items-center mt-4">
        <Button variant="outline" size="sm" className="text-xs">
          <Info className="h-3 w-3 mr-1" />
          Détails
        </Button>
        <Button size="sm" className="text-xs roman-btn">Proposer</Button>
      </div>
    </div>
  );
};

// Composant simple pour afficher une statistique
const StatItem: React.FC<{ icon: React.ReactNode; name: string; value: number }> = ({ 
  icon, name, value 
}) => {
  let color = "text-muted-foreground";
  if (value >= 80) color = "text-green-600";
  else if (value >= 60) color = "text-green-500";
  else if (value >= 40) color = "text-amber-500";
  else if (value < 30) color = "text-red-500";
  
  return (
    <div className="flex items-center justify-between text-xs">
      <div className="flex items-center gap-1">
        {icon}
        <span>{name}</span>
      </div>
      <span className={color}>{value}</span>
    </div>
  );
};

export default Religion;
