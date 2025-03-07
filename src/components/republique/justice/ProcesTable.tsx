
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Button } from '@/components/ui/button';
import { Gavel } from 'lucide-react';

interface ProcesTableProps {
  status: 'en-cours' | 'a-venir' | 'juge';
}

export const ProcesTable: React.FC<ProcesTableProps> = ({ status }) => {
  const getTitle = () => {
    switch (status) {
      case 'en-cours':
        return 'Procès en Cours';
      case 'a-venir':
        return 'Procès à Venir';
      case 'juge':
        return 'Jugements Récents';
      default:
        return 'Liste des Procès';
    }
  };

  const getDescription = () => {
    switch (status) {
      case 'en-cours':
        return 'Procès actuellement en cours devant les tribunaux romains.';
      case 'a-venir':
        return 'Procès programmés dans les prochains jours.';
      case 'juge':
        return 'Jugements rendus récemment par les préteurs et juges romains.';
      default:
        return 'Liste des procès.';
    }
  };

  // Données des procès (seraient normalement chargées depuis une API)
  const procesData = [
    { 
      id: 1,
      parties: "Marcus Tullius Cicero c. Gaius Verres", 
      nature: "Criminel", 
      chef: "Corruption et extorsion", 
      tribunal: "Quaestio de repetundis",
      preteur: "Manius Acilius Glabrio",
      date: "III Non. Quin.",
      statut: status === 'juge' ? "Coupable" : (status === 'en-cours' ? "En délibération" : "Programmé")
    },
    { 
      id: 2,
      parties: "Lucius Cornelius Balbus c. République", 
      nature: "Civil", 
      chef: "Droit de cité", 
      tribunal: "Tribunal du préteur urbain",
      preteur: "Marcus Aurelius Cotta",
      date: "Id. Quin.",
      statut: status === 'juge' ? "Droit accordé" : (status === 'en-cours' ? "Témoignages" : "Programmé")
    },
    { 
      id: 3,
      parties: "République c. Titus Annius Milo", 
      nature: "Criminel", 
      chef: "Meurtre de Publius Clodius", 
      tribunal: "Quaestio de vi",
      preteur: "Lucius Domitius Ahenobarbus",
      date: "VIII Kal. Sex.",
      statut: status === 'juge' ? "Coupable" : (status === 'en-cours' ? "Plaidoiries" : "Programmé")
    },
    { 
      id: 4,
      parties: "Publius Quinctius c. Sextus Naevius", 
      nature: "Civil", 
      chef: "Litige commercial", 
      tribunal: "Tribunal du préteur urbain",
      preteur: "Marcus Aurelius Cotta",
      date: "V Kal. Sex.",
      statut: status === 'juge' ? "Défendeur débouté" : (status === 'en-cours' ? "Témoignages" : "Programmé")
    },
    { 
      id: 5,
      parties: "Aulus Caecina c. Sextus Aebutius", 
      nature: "Civil", 
      chef: "Litige foncier", 
      tribunal: "Tribunal du préteur urbain",
      preteur: "Marcus Aurelius Cotta",
      date: "IV Id. Sex.",
      statut: status === 'juge' ? "Plaignant débouté" : (status === 'en-cours' ? "Audition" : "Programmé")
    },
  ];

  const getStatusBadge = (statut: string) => {
    if (status === 'juge') {
      if (statut.includes('Coupable')) {
        return <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-700">{statut}</span>;
      } else if (statut.includes('accordé') || statut.includes('favorable')) {
        return <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">{statut}</span>;
      } else {
        return <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">{statut}</span>;
      }
    } else {
      if (statut === 'En délibération') {
        return <span className="px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-700">{statut}</span>;
      } else if (statut === 'Programmé') {
        return <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">{statut}</span>;
      } else {
        return <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-700">{statut}</span>;
      }
    }
  };

  const getNatureBadge = (nature: string) => {
    switch (nature) {
      case 'Criminel':
        return <span className="px-2 py-1 rounded-full text-xs bg-rose-100 text-rose-700">Criminel</span>;
      case 'Civil':
        return <span className="px-2 py-1 rounded-full text-xs bg-indigo-100 text-indigo-700">Civil</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">{nature}</span>;
    }
  };

  return (
    <RomanCard>
      <RomanCard.Header>
        <h2 className="font-cinzel text-lg">{getTitle()}</h2>
      </RomanCard.Header>
      <RomanCard.Content>
        <p className="text-muted-foreground mb-6">
          {getDescription()}
        </p>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-rome-gold/10 text-left">
                <th className="p-4 font-cinzel font-semibold">Parties</th>
                <th className="p-4 font-cinzel font-semibold">Nature</th>
                <th className="p-4 font-cinzel font-semibold">Chef d'accusation</th>
                <th className="p-4 font-cinzel font-semibold">Tribunal</th>
                <th className="p-4 font-cinzel font-semibold">Préteur</th>
                <th className="p-4 font-cinzel font-semibold">Date</th>
                <th className="p-4 font-cinzel font-semibold">Statut</th>
                <th className="p-4 font-cinzel font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {procesData.map((proces, index) => (
                <tr 
                  key={proces.id} 
                  className={index % 2 === 0 ? 'bg-white' : 'bg-rome-marble/30'}
                >
                  <td className="p-4 font-cinzel">{proces.parties}</td>
                  <td className="p-4">{getNatureBadge(proces.nature)}</td>
                  <td className="p-4">{proces.chef}</td>
                  <td className="p-4 font-cinzel text-sm">{proces.tribunal}</td>
                  <td className="p-4">{proces.preteur}</td>
                  <td className="p-4 font-cinzel text-sm">{proces.date}</td>
                  <td className="p-4">{getStatusBadge(proces.statut)}</td>
                  <td className="p-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-xs font-medium flex items-center gap-1 roman-btn-outline"
                    >
                      <Gavel className="h-3 w-3" />
                      {status === 'juge' ? 'Voir jugement' : (status === 'en-cours' ? 'Présider' : 'Détails')}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </RomanCard.Content>
    </RomanCard>
  );
};
