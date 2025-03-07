
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Wheat, Coins } from 'lucide-react';

export const DomainesPublics: React.FC = () => {
  const domainesData = [
    { 
      id: 1,
      nom: "Plaines de Campanie", 
      localisation: "Campania", 
      superficie: "5,000 jugera", 
      type: "Terres arables",
      statut: "Disponible",
      revenuAnnuel: "120,000 As"
    },
    { 
      id: 2,
      nom: "Collines d'Étrurie", 
      localisation: "Etruria", 
      superficie: "3,200 jugera", 
      type: "Vignobles et oliviers",
      statut: "Attribué",
      revenuAnnuel: "95,000 As"
    },
    { 
      id: 3,
      nom: "Terres du Latium", 
      localisation: "Latium", 
      superficie: "2,800 jugera", 
      type: "Terres arables",
      statut: "Partiellement attribué",
      revenuAnnuel: "85,000 As"
    },
    { 
      id: 4,
      nom: "Pâturages de Lucanie", 
      localisation: "Lucania", 
      superficie: "4,500 jugera", 
      type: "Pâturages",
      statut: "Disponible",
      revenuAnnuel: "70,000 As"
    },
    { 
      id: 5,
      nom: "Terres de la Sicile occidentale", 
      localisation: "Sicilia", 
      superficie: "6,200 jugera", 
      type: "Terres arables et vergers",
      statut: "Attribué",
      revenuAnnuel: "150,000 As"
    },
  ];

  const getStatutBadge = (statut: string) => {
    switch (statut) {
      case 'Disponible':
        return <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">Disponible</span>;
      case 'Attribué':
        return <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">Attribué</span>;
      case 'Partiellement attribué':
        return <span className="px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-700">Partiellement attribué</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">{statut}</span>;
    }
  };

  return (
    <RomanCard>
      <RomanCard.Header>
        <h2 className="font-cinzel text-lg">Terres Publiques (Ager Publicus)</h2>
      </RomanCard.Header>
      <RomanCard.Content>
        <p className="text-muted-foreground mb-6">
          Consultez la liste des terres publiques appartenant à la République romaine et disponibles pour attribution.
        </p>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-rome-gold/10 text-left">
                <th className="p-4 font-cinzel font-semibold">Nom</th>
                <th className="p-4 font-cinzel font-semibold">Localisation</th>
                <th className="p-4 font-cinzel font-semibold">Superficie</th>
                <th className="p-4 font-cinzel font-semibold">Type</th>
                <th className="p-4 font-cinzel font-semibold">Statut</th>
                <th className="p-4 font-cinzel font-semibold">Revenu annuel</th>
                <th className="p-4 font-cinzel font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {domainesData.map((domaine, index) => (
                <tr 
                  key={domaine.id} 
                  className={index % 2 === 0 ? 'bg-white' : 'bg-rome-marble/30'}
                >
                  <td className="p-4 font-cinzel">{domaine.nom}</td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-rome-terracotta" />
                      {domaine.localisation}
                    </div>
                  </td>
                  <td className="p-4">{domaine.superficie}</td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <Wheat className="h-4 w-4 mr-2 text-amber-600" />
                      {domaine.type}
                    </div>
                  </td>
                  <td className="p-4">{getStatutBadge(domaine.statut)}</td>
                  <td className="p-4 font-semibold">
                    <div className="flex items-center">
                      <Coins className="h-4 w-4 mr-2 text-rome-gold" />
                      {domaine.revenuAnnuel}
                    </div>
                  </td>
                  <td className="p-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-xs font-medium roman-btn-outline"
                    >
                      Détails
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
