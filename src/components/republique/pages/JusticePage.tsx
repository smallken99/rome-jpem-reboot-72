
import React from 'react';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { JudiciaryStats } from '@/components/republique/justice/JudiciaryStats';
import { ProcesTable } from '@/components/republique/justice/ProcesTable';

// Interface pour les données de procès
interface ProcesData {
  id: string;
  titre: string;
  demandeur: string;
  accusé: string;
  type: string;
  statut: string;
  date: string;
}

export const JusticePage: React.FC = () => {
  // Mockup de données pour les procès
  const procesCourants: ProcesData[] = [
    {
      id: "1",
      titre: "Dispute territoriale",
      demandeur: "Marcus Livius",
      accusé: "Gaius Marius",
      type: "Civil",
      statut: "En cours",
      date: "15 Mai 45 av. J.-C."
    },
    {
      id: "2",
      titre: "Accusation de corruption",
      demandeur: "Senat Romain",
      accusé: "Lucius Cornelius",
      type: "Criminel",
      statut: "En attente",
      date: "3 Juin 45 av. J.-C."
    },
    {
      id: "3",
      titre: "Vol de bétail",
      demandeur: "Publius Scribonius",
      accusé: "Quintus Fabius",
      type: "Civil",
      statut: "Jugement rendu",
      date: "27 Avril 45 av. J.-C."
    }
  ];

  const procesPassés: ProcesData[] = [
    {
      id: "4",
      titre: "Diffamation publique",
      demandeur: "Gnaeus Pompeius",
      accusé: "Marcus Crassus",
      type: "Civil",
      statut: "Condamnation",
      date: "10 Mars 45 av. J.-C."
    },
    {
      id: "5",
      titre: "Trahison envers Rome",
      demandeur: "Consul Cicero",
      accusé: "Lucius Catilina",
      type: "Criminel",
      statut: "Exil",
      date: "5 Février 45 av. J.-C."
    }
  ];

  return (
    <div>
      <PageHeader 
        title="Justice" 
        subtitle="Administration des lois et des tribunaux de Rome" 
      />
      
      <div className="mb-6">
        <JudiciaryStats />
      </div>
      
      <div className="space-y-6">
        <RomanCard>
          <RomanCard.Header>
            <h2 className="font-cinzel text-lg">Procès en Cours</h2>
          </RomanCard.Header>
          <RomanCard.Content>
            <ProcesTable proces={procesCourants} status="en-cours" />
          </RomanCard.Content>
        </RomanCard>
        
        <RomanCard>
          <RomanCard.Header>
            <h2 className="font-cinzel text-lg">Procès Passés</h2>
          </RomanCard.Header>
          <RomanCard.Content>
            <ProcesTable proces={procesPassés} status="juge" />
          </RomanCard.Content>
        </RomanCard>
      </div>
    </div>
  );
};
