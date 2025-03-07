
import React from 'react';
import { Tractor, TrendingUp, User } from 'lucide-react';

export const OptimizationRecommendations: React.FC = () => {
  return (
    <div className="border border-rome-gold/30 rounded-md p-4 bg-white">
      <h4 className="font-cinzel text-rome-navy mb-4">Recommandations d'Optimisation</h4>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="bg-green-50 p-2 rounded-full border border-green-200">
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <h5 className="font-medium">Augmenter les loyers des Insulae</h5>
            <p className="text-sm text-muted-foreground">
              Les bâtiments locatifs du Champ de Mars et de la Subure sont sous-évalués par rapport au marché actuel. 
              Une augmentation de 10% générerait 4,800 As supplémentaires par an.
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="bg-amber-50 p-2 rounded-full border border-amber-200">
            <User className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <h5 className="font-medium">Renégocier les contrats d'entretien</h5>
            <p className="text-sm text-muted-foreground">
              Les coûts d'entretien de vos domaines ruraux sont 15% au-dessus de la moyenne. 
              Une renégociation permettrait d'économiser jusqu'à 5,250 As annuellement.
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="bg-blue-50 p-2 rounded-full border border-blue-200">
            <Tractor className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h5 className="font-medium">Diversifier la production agricole</h5>
            <p className="text-sm text-muted-foreground">
              L'ajout de cultures secondaires sur vos domaines céréaliers pourrait augmenter la rentabilité 
              de 20% sans investissement significatif supplémentaire.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
