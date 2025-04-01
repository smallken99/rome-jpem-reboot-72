
import React from 'react';
import { useEquilibre } from '@/hooks/useEquilibre';
import { AlertTriangle, Shield, TrendingUp, Users, BookOpen } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

/**
 * Barre d'indicateurs d'équilibre à afficher dans le header ou la sidebar
 */
export const EquilibreBar: React.FC = () => {
  const { equilibre } = useEquilibre();
  
  if (!equilibre) return null;
  
  // Calculer la stabilité politique
  const politicalStability = Math.round(
    (equilibre.politique.moderates / 100) * 100
  );
  
  // Calculer la stabilité économique
  const economicStability = Math.round(
    ((equilibre.economie.stabilite + equilibre.economie.croissance) / 200) * 100
  );
  
  // Calculer la stabilité sociale
  const socialCohesion = equilibre.social.cohesion || 50;
  
  // Calculer la force militaire
  const militaryStrength = Math.round(
    ((equilibre.militaire.moral + equilibre.militaire.effectifs + 
      equilibre.militaire.equipement + equilibre.militaire.discipline) / 400) * 100
  );
  
  // Calculer la faveur divine
  const divineFavor = Math.round(
    ((equilibre.religion.piete + equilibre.religion.traditions) / 200) * 100
  );
  
  // Déterminer la couleur en fonction de la valeur
  const getColor = (value: number) => {
    if (value >= 75) return 'text-green-500';
    if (value >= 50) return 'text-blue-500';
    if (value >= 25) return 'text-amber-500';
    return 'text-red-500';
  };
  
  return (
    <div className="flex items-center space-x-4 bg-muted/50 p-2 rounded-md">
      <TooltipProvider>
        {/* Indicateur politique */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center">
              <Users className={`h-5 w-5 ${getColor(politicalStability)}`} />
              <span className={`ml-1 text-sm font-medium ${getColor(politicalStability)}`}>
                {politicalStability}%
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Stabilité politique: {politicalStability}%</p>
            <div className="text-xs text-muted-foreground mt-1">
              <p>Populares: {equilibre.politique.populaires}%</p>
              <p>Optimates: {equilibre.politique.optimates}%</p>
              <p>Modérés: {equilibre.politique.moderates}%</p>
            </div>
          </TooltipContent>
        </Tooltip>
        
        {/* Indicateur économique */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center">
              <TrendingUp className={`h-5 w-5 ${getColor(economicStability)}`} />
              <span className={`ml-1 text-sm font-medium ${getColor(economicStability)}`}>
                {economicStability}%
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Stabilité économique: {economicStability}%</p>
            <div className="text-xs text-muted-foreground mt-1">
              <p>Stabilité: {equilibre.economie.stabilite}%</p>
              <p>Croissance: {equilibre.economie.croissance}%</p>
              <p>Commerce: {equilibre.economie.commerce}%</p>
              <p>Agriculture: {equilibre.economie.agriculture}%</p>
            </div>
          </TooltipContent>
        </Tooltip>
        
        {/* Indicateur social */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center">
              <AlertTriangle className={`h-5 w-5 ${getColor(socialCohesion)}`} />
              <span className={`ml-1 text-sm font-medium ${getColor(socialCohesion)}`}>
                {socialCohesion}%
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Cohésion sociale: {socialCohesion}%</p>
            <div className="text-xs text-muted-foreground mt-1">
              <p>Patriciens: {equilibre.social.patriciens}%</p>
              <p>Plébéiens: {equilibre.social.plebeiens}%</p>
              <p>Esclaves: {equilibre.social.esclaves || 0}%</p>
            </div>
          </TooltipContent>
        </Tooltip>
        
        {/* Indicateur militaire */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center">
              <Shield className={`h-5 w-5 ${getColor(militaryStrength)}`} />
              <span className={`ml-1 text-sm font-medium ${getColor(militaryStrength)}`}>
                {militaryStrength}%
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Force militaire: {militaryStrength}%</p>
            <div className="text-xs text-muted-foreground mt-1">
              <p>Moral: {equilibre.militaire.moral}%</p>
              <p>Effectifs: {equilibre.militaire.effectifs}%</p>
              <p>Équipement: {equilibre.militaire.equipement}%</p>
              <p>Discipline: {equilibre.militaire.discipline}%</p>
            </div>
          </TooltipContent>
        </Tooltip>
        
        {/* Indicateur religieux */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center">
              <BookOpen className={`h-5 w-5 ${getColor(divineFavor)}`} />
              <span className={`ml-1 text-sm font-medium ${getColor(divineFavor)}`}>
                {divineFavor}%
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Faveur divine: {divineFavor}%</p>
            <div className="text-xs text-muted-foreground mt-1">
              <p>Piété: {equilibre.religion.piete}%</p>
              <p>Traditions: {equilibre.religion.traditions}%</p>
              <p>Superstition: {equilibre.religion.superstition}%</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
