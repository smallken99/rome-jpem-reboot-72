
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { EducationObjectivesProps } from '../types/educationTypes';

export const EducationObjectives: React.FC<EducationObjectivesProps> = ({
  educationType
}) => {
  const objectives = getEducationObjectives(educationType);
  
  if (!objectives) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          Sélectionnez un type d'éducation pour voir les objectifs d'apprentissage
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Objectifs d'Apprentissage</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-sm">Bénéfices principaux</h4>
            <ul className="mt-2 space-y-1">
              {objectives.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-sm">Carrières possibles</h4>
            <ul className="mt-2 space-y-1">
              {objectives.careers.map((career, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{career}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-sm">Durée typique</h4>
            <p className="mt-1">{objectives.duration}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface EducationObjective {
  benefits: string[];
  careers: string[];
  duration: string;
}

function getEducationObjectives(type: string): EducationObjective | null {
  switch(type) {
    case 'military':
      return {
        benefits: [
          'Augmente les capacités martiales',
          'Améliore le prestige auprès des légionnaires',
          'Facilite l\'accès aux postes militaires',
          'Développe la discipline et l\'endurance'
        ],
        careers: [
          'Tribun militaire',
          'Légat de légion',
          'Commandant de cohorte',
          'Général'
        ],
        duration: '5 à 8 ans selon la spécialisation'
      };
    case 'rhetoric':
      return {
        benefits: [
          'Améliore l\'éloquence politique',
          'Renforce la capacité à convaincre les autres',
          'Facilite les victoires dans les procès judiciaires',
          'Augmente la popularité auprès du peuple'
        ],
        careers: [
          'Avocat',
          'Sénateur',
          'Questeur',
          'Consul'
        ],
        duration: '3 à 6 ans d\'études intensives'
      };
    case 'religious':
      return {
        benefits: [
          'Renforce la piété familiale',
          'Développe la connexion aux dieux',
          'Permet d\'interpréter les présages',
          'Augmente la faveur des prêtres'
        ],
        careers: [
          'Augure',
          'Flamine',
          'Pontife',
          'Grand Pontife',
          'Vestale (pour les filles)'
        ],
        duration: '4 à 10 ans selon la position visée'
      };
    case 'academic':
      return {
        benefits: [
          'Développe la pensée critique',
          'Améliore la compréhension du monde',
          'Renforce les capacités de raisonnement',
          'Facilite l\'administration'
        ],
        careers: [
          'Scribe',
          'Tuteur',
          'Administrateur',
          'Philosophe'
        ],
        duration: '5 à 8 ans d\'études complètes'
      };
    case 'political':
      return {
        benefits: [
          'Maîtrise des rouages politiques de Rome',
          'Connaissance des procédures du Sénat',
          'Compréhension des factions politiques',
          'Développement des réseaux d\'influence'
        ],
        careers: [
          'Édile',
          'Questeur',
          'Préteur',
          'Consul',
          'Gouverneur de province'
        ],
        duration: '4 à 7 ans de formation et d\'apprentissage'
      };
    default:
      return null;
  }
}
