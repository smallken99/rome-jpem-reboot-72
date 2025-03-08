
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { VestaleCandidate, characterToVestaleCandidate } from '@/types/vestale';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Flame, Star, Info, Heart, Book, Shield, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { characters } from '@/data/characters';
import { Character } from '@/types/character';
import { ActionButton } from '@/components/ui-custom/ActionButton';

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
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Religion Romaine" 
        subtitle="Temples, rites et augures"
      />
      
      <Tabs defaultValue="vestales" className="space-y-4">
        <TabsList className="bg-white border border-rome-gold/30 rounded-md shadow-sm w-full sm:w-auto flex overflow-x-auto">
          <TabsTrigger value="vestales" className="data-[state=active]:bg-rome-gold/10 data-[state=active]:text-rome-terracotta font-cinzel">
            <Flame className="h-4 w-4 mr-2" />
            Vestales
          </TabsTrigger>
          <TabsTrigger value="temples" className="data-[state=active]:bg-rome-gold/10 data-[state=active]:text-rome-terracotta font-cinzel">
            <Shield className="h-4 w-4 mr-2" />
            Temples
          </TabsTrigger>
          <TabsTrigger value="ceremonies" className="data-[state=active]:bg-rome-gold/10 data-[state=active]:text-rome-terracotta font-cinzel">
            <Star className="h-4 w-4 mr-2" />
            Cérémonies
          </TabsTrigger>
          <TabsTrigger value="augures" className="data-[state=active]:bg-rome-gold/10 data-[state=active]:text-rome-terracotta font-cinzel">
            <AlertCircle className="h-4 w-4 mr-2" />
            Augures
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="vestales" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <RomanCard className="h-full">
                <RomanCard.Header>
                  <h2 className="font-cinzel text-xl flex items-center gap-2">
                    <Star className="h-4 w-4 text-rome-gold" />
                    Candidates Vestales
                  </h2>
                </RomanCard.Header>
                <RomanCard.Content>
                  <p className="mb-6 text-muted-foreground">
                    Les jeunes filles de familles nobles peuvent devenir candidates au sacerdoce des Vestales, protectrices de la flamme sacrée de Rome.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {youngFemales.length > 0 ? (
                      youngFemales.map(candidate => (
                        <VestaleCandidateCard key={candidate.id} candidate={candidate} />
                      ))
                    ) : (
                      <div className="col-span-full p-6 text-center text-muted-foreground">
                        <AlertCircle className="h-10 w-10 mx-auto mb-2 text-rome-terracotta/60" />
                        <p>Aucune candidate disponible actuellement.</p>
                      </div>
                    )}
                  </div>
                </RomanCard.Content>
              </RomanCard>
            </div>
            
            <div>
              <RomanCard className="h-full">
                <RomanCard.Header>
                  <h2 className="font-cinzel text-lg flex items-center gap-2">
                    <Flame className="h-4 w-4 text-rome-gold" />
                    Le Collège des Vestales
                  </h2>
                </RomanCard.Header>
                <RomanCard.Content>
                  <p className="text-sm text-muted-foreground">
                    Rejoindre le Collège des Vestales est un grand honneur qui apporte prestige et influence à votre famille. Les Vestales sont sélectionnées entre 6 et 10 ans et servent pendant 30 ans.
                  </p>
                  
                  <Separator className="my-4 border-rome-gold/30" />
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Nombre de Vestales:</span>
                      <Badge variant="outline" className="bg-rome-gold/10 text-rome-navy border-rome-gold/30">6 / 6</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Prochaine sélection:</span>
                      <span className="text-rome-navy">Dans 2 ans</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Bonus de piété:</span>
                      <span className="text-rome-terracotta font-bold">+15%</span>
                    </div>
                  </div>
                  
                  <Separator className="my-4 border-rome-gold/30" />
                  
                  <ActionButton 
                    label="Histoire des Vestales" 
                    variant="outline"
                    icon={<Book className="h-4 w-4" />}
                    className="w-full mt-2"
                  />
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
const VestalesPage = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Les Vestales" subtitle="Gardiennes de la flamme sacrée" />
      <RomanCard>
        <RomanCard.Content>
          <div className="space-y-4">
            <p>
              Les Vestales sont des prêtresses consacrées à Vesta, déesse du foyer et du feu sacré. Elles sont choisies parmi les jeunes filles des meilleures familles patriciennes de Rome.
            </p>
            <p>
              Leur principal devoir est d'entretenir le feu sacré dans le temple de Vesta, qui ne doit jamais s'éteindre. Elles préparent également la mola salsa, farine sacrée utilisée lors des sacrifices, et gardent des objets sacrés comme le Palladium.
            </p>
          </div>
        </RomanCard.Content>
      </RomanCard>
    </div>
  );
};

const TemplesPage = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Temples de Rome" subtitle="Édifices sacrés de la République" />
      <RomanCard>
        <RomanCard.Content>
          <p>Contenu des temples en construction...</p>
        </RomanCard.Content>
      </RomanCard>
    </div>
  );
};

const CeremoniesPage = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Cérémonies religieuses" subtitle="Rites et célébrations de Rome" />
      <RomanCard>
        <RomanCard.Content>
          <p>Contenu des cérémonies en construction...</p>
        </RomanCard.Content>
      </RomanCard>
    </div>
  );
};

const AuguresPage = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Collège des Augures" subtitle="Interprètes des signes divins" />
      <RomanCard>
        <RomanCard.Content>
          <p>Contenu des augures en construction...</p>
        </RomanCard.Content>
      </RomanCard>
    </div>
  );
};

// Contenu pour les onglets
const TemplesContent = () => {
  return (
    <RomanCard>
      <RomanCard.Header>
        <h2 className="font-cinzel text-xl flex items-center gap-2">
          <Shield className="h-4 w-4 text-rome-gold" />
          Temples de Rome
        </h2>
      </RomanCard.Header>
      <RomanCard.Content>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <TempleCard 
            name="Temple de Jupiter Capitolin" 
            deity="Jupiter" 
            location="Colline du Capitole"
            image="/images/temple-jupiter.jpg"
          />
          <TempleCard 
            name="Temple de Vesta" 
            deity="Vesta" 
            location="Forum Romain"
            image="/images/temple-vesta.jpg"
          />
          <TempleCard 
            name="Temple de Mars" 
            deity="Mars" 
            location="Champ de Mars"
            image="/images/temple-mars.jpg"
          />
        </div>
      </RomanCard.Content>
    </RomanCard>
  );
};

const TempleCard = ({ name, deity, location, image }: { name: string, deity: string, location: string, image?: string }) => {
  return (
    <div className="border border-rome-gold/30 rounded-md overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300">
      <div className="aspect-video bg-rome-gold/10 flex items-center justify-center">
        {image ? (
          <img src={image} alt={name} className="object-cover w-full h-full" />
        ) : (
          <Shield className="h-12 w-12 text-rome-gold/50" />
        )}
      </div>
      <div className="p-4">
        <h3 className="font-cinzel text-lg text-rome-navy">{name}</h3>
        <div className="text-sm text-muted-foreground mt-1 space-y-1">
          <p><span className="font-medium">Divinité:</span> {deity}</p>
          <p><span className="font-medium">Emplacement:</span> {location}</p>
        </div>
        <Button variant="outline" size="sm" className="mt-3 w-full text-xs roman-btn-outline">
          <Info className="h-3 w-3 mr-1" />
          Détails
        </Button>
      </div>
    </div>
  );
};

const CeremoniesContent = () => {
  return (
    <RomanCard>
      <RomanCard.Header>
        <h2 className="font-cinzel text-xl flex items-center gap-2">
          <Star className="h-4 w-4 text-rome-gold" />
          Cérémonies religieuses
        </h2>
      </RomanCard.Header>
      <RomanCard.Content>
        <div className="space-y-4">
          <CeremonyItem 
            name="Lupercales" 
            date="15 février" 
            description="Fête de la fertilité et de la purification, où des jeunes hommes courent à moitié nus autour du Palatin."
          />
          <CeremonyItem 
            name="Saturnales" 
            date="17-23 décembre" 
            description="Célébration en l'honneur de Saturne, avec des festins, l'échange de cadeaux et l'inversion temporaire des rôles sociaux."
          />
          <CeremonyItem 
            name="Vestalia" 
            date="7-15 juin" 
            description="Fête en l'honneur de Vesta, où le temple est ouvert aux femmes romaines qui y apportent des offrandes."
          />
        </div>
      </RomanCard.Content>
    </RomanCard>
  );
};

const CeremonyItem = ({ name, date, description }: { name: string, date: string, description: string }) => {
  return (
    <div className="border border-rome-gold/30 rounded-md p-4 bg-white hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-start">
        <h3 className="font-cinzel text-lg text-rome-navy">{name}</h3>
        <Badge variant="outline" className="bg-rome-gold/10 border-rome-gold/30">{date}</Badge>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <Button variant="outline" size="sm" className="mt-3 text-xs roman-btn-outline">
        <Info className="h-3 w-3 mr-1" />
        En savoir plus
      </Button>
    </div>
  );
};

const AuguresContent = () => {
  return (
    <RomanCard>
      <RomanCard.Header>
        <h2 className="font-cinzel text-xl flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-rome-gold" />
          Collège des Augures
        </h2>
      </RomanCard.Header>
      <RomanCard.Content>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Les augures sont des prêtres spécialisés dans l'interprétation des signes divins pour déterminer si les dieux favorisent ou non une action. Leur avis est requis avant toute décision politique ou militaire importante.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="border border-rome-gold/30 rounded-md p-4 bg-white">
              <h3 className="font-cinzel text-lg text-rome-navy">Types d'augures</h3>
              <ul className="mt-2 space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-rome-gold font-bold mt-0.5">•</span>
                  <span><strong>Vol des oiseaux</strong> - Direction, hauteur et cris des oiseaux</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rome-gold font-bold mt-0.5">•</span>
                  <span><strong>Foudre et tonnerre</strong> - Position et direction des éclairs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rome-gold font-bold mt-0.5">•</span>
                  <span><strong>Tripudia</strong> - Appétit des poulets sacrés</span>
                </li>
              </ul>
            </div>
            
            <div className="border border-rome-gold/30 rounded-md p-4 bg-white">
              <h3 className="font-cinzel text-lg text-rome-navy">Importance politique</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                L'avis des augures peut retarder ou annuler des assemblées, des élections et des décisions militaires. Maîtriser l'art augural confère un pouvoir politique considérable.
              </p>
              <Button variant="outline" size="sm" className="mt-3 text-xs roman-btn-outline">
                <Info className="h-3 w-3 mr-1" />
                Influence politique
              </Button>
            </div>
          </div>
        </div>
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
        <StatItem icon={<Flame className="h-3 w-3" />} name="Piété" value={stats.piety} />
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
