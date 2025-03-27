
import React from 'react';
import { Character } from '@/types/character';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { getFamilyMembers, findHeir, getFamilyLineage } from './familyHelpers';

interface FamilyInfoSidebarProps {
  characters: Character[];
}

export const FamilyInfoSidebar: React.FC<FamilyInfoSidebarProps> = ({ characters }) => {
  const { paterFamilias } = getFamilyMembers(characters);
  const heir = findHeir(characters);
  const familyLineage = getFamilyLineage(characters);
  
  const livingMembers = characters.filter(c => c.status === 'alive').length;
  const maleMembers = characters.filter(c => c.gender === 'male' && c.status === 'alive').length;
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Informations Familiales</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-2">
            <div>
              <dt className="text-sm text-gray-500">Lignée</dt>
              <dd className="font-medium">{familyLineage}</dd>
            </div>
            
            <div>
              <dt className="text-sm text-gray-500">Pater Familias</dt>
              <dd className="font-medium">{paterFamilias?.name || 'Non défini'}</dd>
            </div>
            
            <div>
              <dt className="text-sm text-gray-500">Héritier présomptif</dt>
              <dd className="font-medium">{heir?.name || 'Aucun héritier désigné'}</dd>
            </div>
            
            <Separator className="my-3" />
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <dt className="text-sm text-gray-500">Membres vivants</dt>
                <dd className="font-medium">{livingMembers}</dd>
              </div>
              <div>
                <dt className="text-sm text-gray-500">Membres masculins</dt>
                <dd className="font-medium">{maleMembers}</dd>
              </div>
            </div>
          </dl>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Statut Successoral</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <StatusBadge 
              status={heir ? 'secure' : 'atrisk'}
              label={heir ? 'Succession assurée' : 'Lignée en danger'}
            />
            
            <p className="text-sm text-gray-600">
              {heir ? (
                `Votre succession est actuellement assurée par ${heir.name}, qui est prêt à reprendre les affaires familiales.`
              ) : (
                `Votre famille n'a pas d'héritier mâle désigné. Vous devriez envisager de prendre des mesures pour assurer la continuation de votre lignée.`
              )}
            </p>
            
            {!heir && (
              <div className="bg-amber-50 border border-amber-200 rounded p-3 text-xs text-amber-800">
                <strong className="font-semibold">Recommandation:</strong> Envisagez un mariage pour produire un héritier, ou adoptez un jeune homme prometteur d'une autre famille.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface StatusBadgeProps {
  status: 'secure' | 'atrisk' | 'endangered';
  label: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label }) => {
  const getColors = () => {
    switch (status) {
      case 'secure':
        return 'bg-green-100 text-green-800 hover:bg-green-100 border-green-300';
      case 'atrisk':
        return 'bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-300';
      case 'endangered':
        return 'bg-red-100 text-red-800 hover:bg-red-100 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-300';
    }
  };
  
  return (
    <Badge variant="outline" className={`${getColors()} text-xs px-3 py-1`}>
      {label}
    </Badge>
  );
};
