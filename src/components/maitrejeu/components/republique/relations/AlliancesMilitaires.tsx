
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Swords } from 'lucide-react';
import { alliancesMock, AllianceMilitaire } from './data';

interface AlliancesMilitairesProps {
  searchTerm: string;
}

export const AlliancesMilitaires: React.FC<AlliancesMilitairesProps> = ({ searchTerm }) => {
  // Filtrer les alliances selon le terme de recherche
  const filteredAlliances = alliancesMock.filter(alliance => 
    alliance.nom.toLowerCase().includes(searchTerm.toLowerCase()) || 
    alliance.membres.some(m => m.toLowerCase().includes(searchTerm.toLowerCase())) ||
    alliance.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {filteredAlliances.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          Aucune alliance militaire ne correspond à vos critères
        </div>
      ) : (
        filteredAlliances.map(alliance => (
          <AllianceItem key={alliance.id} alliance={alliance} />
        ))
      )}
    </div>
  );
};

interface AllianceItemProps {
  alliance: AllianceMilitaire;
}

const AllianceItem: React.FC<AllianceItemProps> = ({ alliance }) => {
  return (
    <div className="flex flex-col p-4 border rounded-lg hover:bg-muted/20">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-full bg-red-100">
            <Swords className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h3 className="font-medium">{alliance.nom}</h3>
            <p className="text-sm text-muted-foreground">
              Membres: {alliance.membres.join(', ')} • Créée le {alliance.dateCreation}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="bg-red-100 text-red-800">
                {alliance.type}
              </Badge>
              <Badge variant="outline" className="bg-blue-100 text-blue-800">
                Commandement: {alliance.commandement}
              </Badge>
              <Badge variant="outline" className="bg-green-100 text-green-800">
                {alliance.statut}
              </Badge>
            </div>
          </div>
        </div>
        <div>
          <Button variant="outline" size="sm">Détails</Button>
        </div>
      </div>
      
      <div className="mt-4 pl-12">
        <h4 className="text-sm font-medium mb-2">Forces militaires:</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-2 bg-red-50 rounded-md">
            <div className="text-lg font-bold text-red-600">{alliance.forces.legions}</div>
            <div className="text-xs text-muted-foreground">Légions</div>
          </div>
          <div className="text-center p-2 bg-amber-50 rounded-md">
            <div className="text-lg font-bold text-amber-600">{alliance.forces.auxiliaires}</div>
            <div className="text-xs text-muted-foreground">Auxiliaires</div>
          </div>
          <div className="text-center p-2 bg-blue-50 rounded-md">
            <div className="text-lg font-bold text-blue-600">{alliance.forces.navires}</div>
            <div className="text-xs text-muted-foreground">Navires</div>
          </div>
        </div>
      </div>
    </div>
  );
};
