
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { FunctionCard } from '@/components/republique/ui/FunctionCard';
import { ConsulBureau } from '../bureaux/consul/ConsulBureau';
import { PreteurBureau } from '../bureaux/preteur/PreteurBureau';
import { EdileBureau } from '../bureaux/edile/EdileBureau';
import { QuesteurBureau } from '../bureaux/questeur/QuesteurBureau';
import { CenseurBureau } from '../bureaux/censeur/CenseurBureau';
import { SectionNavigation, NavigationItem } from '@/components/ui-custom/SectionNavigation';
import { Landmark, Gavel, Building, Coins, Shield } from 'lucide-react';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { RepubliqueFunctions } from '../RepubliqueFunctions';

const RepubliqueMain: React.FC = () => {
  const navigationItems: NavigationItem[] = [
    {
      label: "Consul",
      path: "/republique/bureaux/consul",
      icon: <Landmark className="h-4 w-4" />
    },
    {
      label: "Préteur",
      path: "/republique/bureaux/preteur",
      icon: <Gavel className="h-4 w-4" />
    },
    {
      label: "Édile",
      path: "/republique/bureaux/edile",
      icon: <Shield className="h-4 w-4" />
    },
    {
      label: "Questeur",
      path: "/republique/bureaux/questeur",
      icon: <Coins className="h-4 w-4" />
    },
    {
      label: "Censeur",
      path: "/republique/bureaux/censeur",
      icon: <Building className="h-4 w-4" />
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Bureaux des Magistrats" 
        subtitle="Administration de la République romaine" 
      />

      <SectionNavigation items={navigationItems} />

      <Routes>
        <Route index element={<RepubliqueFunctions />} />
        <Route path="consul" element={<ConsulBureau />} />
        <Route path="preteur" element={<PreteurBureau />} />
        <Route path="edile" element={<EdileBureau />} />
        <Route path="questeur" element={<QuesteurBureau />} />
        <Route path="censeur" element={<CenseurBureau />} />
      </Routes>
    </div>
  );
};

export { RepubliqueMain };
