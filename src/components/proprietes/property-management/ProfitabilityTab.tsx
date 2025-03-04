
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';

export const ProfitabilityTab: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-rome-gold/10 text-left">
                <th className="p-3 font-cinzel">Propriété</th>
                <th className="p-3 font-cinzel">Type</th>
                <th className="p-3 font-cinzel">Revenus</th>
                <th className="p-3 font-cinzel">Dépenses</th>
                <th className="p-3 font-cinzel">Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-rome-gold/10">
                <td className="p-3 font-semibold">Domus du Palatin</td>
                <td className="p-3">Habitation</td>
                <td className="p-3 text-green-600">0 As/an</td>
                <td className="p-3 text-red-600">2,500 As/an</td>
                <td className="p-3 text-red-600">-2,500 As/an</td>
              </tr>
              <tr className="border-b border-rome-gold/10 bg-rome-marble/20">
                <td className="p-3 font-semibold">Insula de Subure</td>
                <td className="p-3">Habitation</td>
                <td className="p-3 text-green-600">4,800 As/an</td>
                <td className="p-3 text-red-600">1,200 As/an</td>
                <td className="p-3 text-green-600">+3,600 As/an</td>
              </tr>
              <tr className="border-b border-rome-gold/10">
                <td className="p-3 font-semibold">Domaine de Campanie</td>
                <td className="p-3">Agricole</td>
                <td className="p-3 text-green-600">12,000 As/an</td>
                <td className="p-3 text-red-600">4,000 As/an</td>
                <td className="p-3 text-green-600">+8,000 As/an</td>
              </tr>
              <tr className="border-b border-rome-gold/10 bg-rome-marble/20">
                <td className="p-3 font-semibold">Vignobles du Latium</td>
                <td className="p-3">Agricole</td>
                <td className="p-3 text-green-600">16,000 As/an</td>
                <td className="p-3 text-red-600">3,500 As/an</td>
                <td className="p-3 text-green-600">+12,500 As/an</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="bg-rome-gold/20 font-bold">
                <td colSpan={2} className="p-3">Total</td>
                <td className="p-3 text-green-600">32,800 As/an</td>
                <td className="p-3 text-red-600">11,200 As/an</td>
                <td className="p-3 text-green-600">+21,600 As/an</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      
      <div className="lg:col-span-1">
        <RomanCard>
          <RomanCard.Header>
            <h3 className="font-cinzel text-base text-rome-navy">Rentabilité</h3>
          </RomanCard.Header>
          <RomanCard.Content>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Propriétés les plus rentables</p>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Vignobles du Latium (+12,500 As/an)</li>
                  <li>Domaine de Campanie (+8,000 As/an)</li>
                  <li>Insula de Subure (+3,600 As/an)</li>
                </ol>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-1">Propriétés déficitaires</p>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Domus du Palatin (-2,500 As/an)</li>
                </ol>
              </div>
              
              <div className="pt-4 border-t border-rome-gold/20">
                <p className="text-sm text-muted-foreground mb-2">Recommandations</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-rome-gold mr-2">•</span>
                    Investir dans plus de propriétés locatives comme des insulae pour augmenter les revenus
                  </li>
                  <li className="flex items-start">
                    <span className="text-rome-gold mr-2">•</span>
                    Envisager d'agrandir les vignobles pour maximiser les profits
                  </li>
                </ul>
              </div>
            </div>
          </RomanCard.Content>
        </RomanCard>
      </div>
    </div>
  );
};
