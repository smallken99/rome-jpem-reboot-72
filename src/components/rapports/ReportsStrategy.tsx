
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Button } from '@/components/ui/button';
import { ChevronRight, Flag, Shield, Scale, Landmark } from 'lucide-react';

export const ReportsStrategy: React.FC = () => {
  return (
    <div className="space-y-6">
      <RomanCard>
        <RomanCard.Header>
          <h3 className="font-cinzel text-lg text-rome-navy">Analyse SWOT</h3>
        </RomanCard.Header>
        <RomanCard.Content>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-green-200 bg-green-50 rounded-md p-4">
              <h4 className="font-cinzel font-medium text-green-800 mb-2">Forces</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">•</span>
                  <span>Solide réputation au Sénat</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">•</span>
                  <span>Diversification des sources de revenus</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">•</span>
                  <span>Éducation supérieure des héritiers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">•</span>
                  <span>Alliances stratégiques avec des familles influentes</span>
                </li>
              </ul>
            </div>
            
            <div className="border border-red-200 bg-red-50 rounded-md p-4">
              <h4 className="font-cinzel font-medium text-red-800 mb-2">Faiblesses</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Influence limitée sur l'armée</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Piété familiale perçue comme insuffisante</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Dépendance excessive aux revenus immobiliers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">•</span>
                  <span>Présence limitée dans les provinces orientales</span>
                </li>
              </ul>
            </div>
            
            <div className="border border-blue-200 bg-blue-50 rounded-md p-4">
              <h4 className="font-cinzel font-medium text-blue-800 mb-2">Opportunités</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>Expansion commerciale en Hispanie</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>Nomination potentielle à une magistrature importante</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>Alliance matrimoniale avec les Cornelii</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>Acquisition de terres agricoles en Campanie</span>
                </li>
              </ul>
            </div>
            
            <div className="border border-amber-200 bg-amber-50 rounded-md p-4">
              <h4 className="font-cinzel font-medium text-amber-800 mb-2">Menaces</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>Opposition croissante des Claudii</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>Instabilité politique potentielle</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>Mauvaises récoltes possibles sur les domaines agricoles</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>Scandales religieux affectant la réputation</span>
                </li>
              </ul>
            </div>
          </div>
        </RomanCard.Content>
      </RomanCard>
      
      <RomanCard>
        <RomanCard.Header>
          <h3 className="font-cinzel text-lg text-rome-navy">Options Stratégiques</h3>
        </RomanCard.Header>
        <RomanCard.Content>
          <div className="space-y-4">
            <div className="border border-rome-gold/30 rounded-md p-4 bg-white hover:border-rome-gold/60 transition-all">
              <div className="flex items-center gap-3">
                <div className="bg-rome-gold/10 p-2 rounded-full">
                  <Flag className="h-5 w-5 text-rome-navy" />
                </div>
                <div>
                  <h4 className="font-cinzel font-medium">Expansion Politique</h4>
                  <p className="text-sm text-muted-foreground">Concentrez vos efforts sur le Sénat et les magistratures</p>
                </div>
                <Button variant="outline" className="ml-auto text-xs roman-btn-outline">
                  Détails <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
              
              <div className="mt-3 text-sm">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Moyen terme</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full ml-2">Risque modéré</span>
                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full ml-2">Haute priorité</span>
              </div>
            </div>
            
            <div className="border border-rome-gold/30 rounded-md p-4 bg-white hover:border-rome-gold/60 transition-all">
              <div className="flex items-center gap-3">
                <div className="bg-rome-gold/10 p-2 rounded-full">
                  <Shield className="h-5 w-5 text-rome-navy" />
                </div>
                <div>
                  <h4 className="font-cinzel font-medium">Renforcement Militaire</h4>
                  <p className="text-sm text-muted-foreground">Développez votre influence auprès de l'armée</p>
                </div>
                <Button variant="outline" className="ml-auto text-xs roman-btn-outline">
                  Détails <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
              
              <div className="mt-3 text-sm">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Long terme</span>
                <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full ml-2">Risque élevé</span>
                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full ml-2">Priorité moyenne</span>
              </div>
            </div>
            
            <div className="border border-rome-gold/30 rounded-md p-4 bg-white hover:border-rome-gold/60 transition-all">
              <div className="flex items-center gap-3">
                <div className="bg-rome-gold/10 p-2 rounded-full">
                  <Scale className="h-5 w-5 text-rome-navy" />
                </div>
                <div>
                  <h4 className="font-cinzel font-medium">Diversification Économique</h4>
                  <p className="text-sm text-muted-foreground">Investissez dans le commerce maritime et de nouvelles terres</p>
                </div>
                <Button variant="outline" className="ml-auto text-xs roman-btn-outline">
                  Détails <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
              
              <div className="mt-3 text-sm">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Court terme</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full ml-2">Risque faible</span>
                <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full ml-2">Haute priorité</span>
              </div>
            </div>
            
            <div className="border border-rome-gold/30 rounded-md p-4 bg-white hover:border-rome-gold/60 transition-all">
              <div className="flex items-center gap-3">
                <div className="bg-rome-gold/10 p-2 rounded-full">
                  <Landmark className="h-5 w-5 text-rome-navy" />
                </div>
                <div>
                  <h4 className="font-cinzel font-medium">Alliances et Diplomatie</h4>
                  <p className="text-sm text-muted-foreground">Renforcez les relations avec d'autres familles puissantes</p>
                </div>
                <Button variant="outline" className="ml-auto text-xs roman-btn-outline">
                  Détails <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
              
              <div className="mt-3 text-sm">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Moyen terme</span>
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full ml-2">Risque modéré</span>
                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full ml-2">Priorité moyenne</span>
              </div>
            </div>
          </div>
        </RomanCard.Content>
      </RomanCard>
    </div>
  );
};
