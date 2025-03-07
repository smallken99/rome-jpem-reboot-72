
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Button } from '@/components/ui/button';

export const AttributionTerres: React.FC = () => {
  const attributionsData = [
    { 
      id: 1,
      beneficiaire: "Marcus Tullius Cicero", 
      statut: "Sénateur", 
      domaine: "Terres du Latium", 
      superficie: "500 jugera",
      dateAttribution: "Id. Jan.",
      duree: "10 ans",
      loyer: "5,000 As/an"
    },
    { 
      id: 2,
      beneficiaire: "Colonie de Capua", 
      statut: "Colonie romaine", 
      domaine: "Plaines de Campanie", 
      superficie: "2,000 jugera",
      dateAttribution: "III Kal. Mar.",
      duree: "Perpétuelle",
      loyer: "Exempté"
    },
    { 
      id: 3,
      beneficiaire: "Quintus Servilius Caepio", 
      statut: "Chevalier", 
      domaine: "Collines d'Étrurie", 
      superficie: "600 jugera",
      dateAttribution: "V Id. Apr.",
      duree: "15 ans",
      loyer: "6,500 As/an"
    },
    { 
      id: 4,
      beneficiaire: "Veterans de la IXe Légion", 
      statut: "Vétérans", 
      domaine: "Terres de Sicile", 
      superficie: "1,200 jugera",
      dateAttribution: "X Kal. Jun.",
      duree: "Perpétuelle",
      loyer: "Exempté"
    },
    { 
      id: 5,
      beneficiaire: "Lucius Calpurnius Piso", 
      statut: "Sénateur", 
      domaine: "Pâturages de Lucanie", 
      superficie: "800 jugera",
      dateAttribution: "XII Kal. Sep.",
      duree: "8 ans",
      loyer: "4,200 As/an"
    },
  ];

  const getStatutBadge = (statut: string) => {
    switch (statut) {
      case 'Sénateur':
        return <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-700">Sénateur</span>;
      case 'Chevalier':
        return <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">Chevalier</span>;
      case 'Colonie romaine':
        return <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">Colonie</span>;
      case 'Vétérans':
        return <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-700">Vétérans</span>;
      default:
        return <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">{statut}</span>;
    }
  };

  return (
    <RomanCard>
      <RomanCard.Header>
        <h2 className="font-cinzel text-lg">Attributions de Terres</h2>
      </RomanCard.Header>
      <RomanCard.Content>
        <p className="text-muted-foreground mb-6">
          Consultez les attributions de terres publiques aux citoyens, colonies et vétérans.
        </p>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-rome-gold/10 text-left">
                <th className="p-4 font-cinzel font-semibold">Bénéficiaire</th>
                <th className="p-4 font-cinzel font-semibold">Statut</th>
                <th className="p-4 font-cinzel font-semibold">Domaine</th>
                <th className="p-4 font-cinzel font-semibold">Superficie</th>
                <th className="p-4 font-cinzel font-semibold">Date d'attribution</th>
                <th className="p-4 font-cinzel font-semibold">Durée</th>
                <th className="p-4 font-cinzel font-semibold">Loyer annuel</th>
                <th className="p-4 font-cinzel font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {attributionsData.map((attribution, index) => (
                <tr 
                  key={attribution.id} 
                  className={index % 2 === 0 ? 'bg-white' : 'bg-rome-marble/30'}
                >
                  <td className="p-4 font-cinzel">{attribution.beneficiaire}</td>
                  <td className="p-4">{getStatutBadge(attribution.statut)}</td>
                  <td className="p-4">{attribution.domaine}</td>
                  <td className="p-4">{attribution.superficie}</td>
                  <td className="p-4 font-cinzel text-sm">{attribution.dateAttribution}</td>
                  <td className="p-4">{attribution.duree}</td>
                  <td className="p-4">{attribution.loyer}</td>
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
