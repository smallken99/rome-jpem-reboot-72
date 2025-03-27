
import React from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { EducationSpecialtySelectorProps } from '../types/educationTypes';

export const EducationSpecialtySelector: React.FC<EducationSpecialtySelectorProps> = ({
  selectedSpecialties,
  availableSpecialties,
  onChange
}) => {
  const handleSpecialtyChange = (specialty: string, checked: boolean) => {
    if (checked) {
      // Ajouter la spécialité (max 2)
      if (selectedSpecialties.length < 2) {
        onChange([...selectedSpecialties, specialty]);
      }
    } else {
      // Retirer la spécialité
      onChange(selectedSpecialties.filter(s => s !== specialty));
    }
  };
  
  return (
    <div className="space-y-4">
      <div>
        <Label className="text-base font-medium">Spécialités</Label>
        <p className="text-sm text-muted-foreground mt-1">
          Choisissez jusqu'à deux spécialités dans lesquelles votre enfant se concentrera.
        </p>
      </div>
      
      {availableSpecialties.length === 0 ? (
        <Alert>
          <AlertDescription>
            Choisissez d'abord un type d'éducation pour voir les spécialités disponibles.
          </AlertDescription>
        </Alert>
      ) : (
        <ScrollArea className="h-72 rounded-md border p-4">
          <div className="space-y-4">
            {availableSpecialties.map(specialty => (
              <Card key={specialty} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id={`specialty-${specialty}`} 
                      checked={selectedSpecialties.includes(specialty)}
                      onCheckedChange={(checked) => handleSpecialtyChange(specialty, Boolean(checked))}
                      disabled={selectedSpecialties.length >= 2 && !selectedSpecialties.includes(specialty)}
                    />
                    <div className="grid gap-1.5">
                      <Label 
                        htmlFor={`specialty-${specialty}`} 
                        className="font-medium"
                      >
                        {specialty}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {getSpecialtyDescription(specialty)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}
      
      {selectedSpecialties.length > 0 && (
        <div className="mt-4">
          <h4 className="font-medium mb-2">Spécialités sélectionnées ({selectedSpecialties.length}/2):</h4>
          <div className="flex flex-wrap gap-2">
            {selectedSpecialties.map(specialty => (
              <div 
                key={specialty}
                className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
              >
                {specialty}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Descriptions des spécialités
function getSpecialtyDescription(specialty: string): string {
  const descriptions: Record<string, string> = {
    // Militaire
    'Tactique': 'Maîtrise des manœuvres militaires et du positionnement des troupes.',
    'Combat rapproché': 'Formation au combat avec le glaive et aux techniques de corps à corps.',
    'Leadership militaire': 'Art de commander les légions et de maintenir la discipline.',
    'Stratégie': 'Planification à long terme des campagnes militaires et opérations.',
    
    // Rhétorique
    'Éloquence': 'Art de s\'exprimer avec clarté et force de conviction.',
    'Débat politique': 'Techniques pour dominer les échanges au Sénat et dans les assemblées.',
    'Droit romain': 'Connaissance approfondie des lois et procédures judiciaires.',
    'Négociation': 'Art de parvenir à des accords favorables dans les discussions.',
    
    // Politique
    'Administration': 'Gestion efficace des ressources et du personnel public.',
    'Diplomatie': 'Art des relations internationales et des négociations avec d\'autres peuples.',
    'Droit public': 'Maîtrise des lois concernant l\'État et ses institutions.',
    'Gouvernance': 'Principes fondamentaux de direction d\'une province ou de la République.',
    
    // Académique
    'Littérature': 'Étude des grands textes latins et grecs et de leur composition.',
    'Philosophie': 'Exploration des principes éthiques, logiques et métaphysiques.',
    'Histoire': 'Connaissance du passé de Rome et des civilisations voisines.',
    'Mathématiques': 'Étude des nombres, des formes et des modèles logiques.',
    
    // Religieux
    'Rituel': 'Exécution précise des cérémonies religieuses romaines.',
    'Augure': 'Interprétation des signes divins et des présages.',
    'Théologie': 'Compréhension approfondie des mythes et des dieux romains.',
    'Divination': 'Art de prédire l\'avenir par diverses méthodes sacrées.',
  };
  
  return descriptions[specialty] || 
    'Une spécialisation importante dans ce domaine d\'étude.';
}
