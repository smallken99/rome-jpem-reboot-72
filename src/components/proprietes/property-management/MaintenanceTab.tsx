
import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

export const MaintenanceTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="font-cinzel text-base text-rome-navy">Maintenance des propriétés</h4>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="roman-btn-outline flex items-center gap-1">
            <Filter className="h-4 w-4" />
            Filtrer
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-rome-gold/10 text-left">
              <th className="p-3 font-cinzel">Propriété</th>
              <th className="p-3 font-cinzel">Type</th>
              <th className="p-3 font-cinzel">Emplacement</th>
              <th className="p-3 font-cinzel">État</th>
              <th className="p-3 font-cinzel">Coût d'entretien</th>
              <th className="p-3 font-cinzel">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-rome-gold/10">
              <td className="p-3 font-semibold">Domus du Palatin</td>
              <td className="p-3">Domus (Grand)</td>
              <td className="p-3">Rome, Palatin</td>
              <td className="p-3"><span className="text-green-600 font-medium">Excellent</span></td>
              <td className="p-3">2,500 As/an</td>
              <td className="p-3">
                <Button variant="outline" size="sm" className="roman-btn-outline text-xs">Réparer</Button>
              </td>
            </tr>
            <tr className="border-b border-rome-gold/10 bg-rome-marble/20">
              <td className="p-3 font-semibold">Insula de Subure</td>
              <td className="p-3">Insula (Moyen)</td>
              <td className="p-3">Rome, Subure</td>
              <td className="p-3"><span className="text-yellow-600 font-medium">Moyen</span></td>
              <td className="p-3">1,200 As/an</td>
              <td className="p-3">
                <Button size="sm" className="roman-btn text-xs">Réparer</Button>
              </td>
            </tr>
            <tr className="border-b border-rome-gold/10">
              <td className="p-3 font-semibold">Domaine de Campanie</td>
              <td className="p-3">Culture céréalière (Grand)</td>
              <td className="p-3">Campanie</td>
              <td className="p-3"><span className="text-green-500 font-medium">Bon</span></td>
              <td className="p-3">4,000 As/an</td>
              <td className="p-3">
                <Button variant="outline" size="sm" className="roman-btn-outline text-xs">Réparer</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
