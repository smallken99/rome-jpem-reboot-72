
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Character } from '@/types/character';
import { Preceptor } from '../types/educationTypes';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { usePreceptorManagement } from '../hooks/usePreceptorManagement';
import { toast } from 'sonner';

interface EducationPreceptorProps {
  child: Character;
  preceptors: Preceptor[];
  onAssignPreceptor: (preceptorId: string) => void;
}

export const EducationPreceptor: React.FC<EducationPreceptorProps> = ({
  child,
  preceptors,
  onAssignPreceptor
}) => {
  const [selectedPreceptorId, setSelectedPreceptorId] = React.useState<string>('');
  const { hirePreceptor } = usePreceptorManagement();
  
  // Déterminer le précepteur actuel
  const currentPreceptorId = child.currentEducation?.mentorId;
  const currentPreceptor = currentPreceptorId 
    ? preceptors.find(p => p.id === currentPreceptorId) 
    : null;
  
  // Filtrer les précepteurs disponibles pour le type d'éducation
  const availablePreceptors = preceptors.filter(p => 
    p.specialization === child.currentEducation?.type && 
    !p.childId
  );
  
  const handleAssignPreceptor = () => {
    if (!selectedPreceptorId) {
      toast.error("Veuillez sélectionner un précepteur");
      return;
    }
    
    onAssignPreceptor(selectedPreceptorId);
    
    // Simuler la mise à jour
    toast.success("Précepteur assigné avec succès");
  };
  
  const handleHirePreceptor = () => {
    if (!child.currentEducation?.type) {
      toast.error("L'enfant n'a pas d'éducation en cours");
      return;
    }
    
    // Redirection vers écran d'embauche (simulation)
    toast.info("Redirection vers l'écran d'embauche de précepteurs...");
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Précepteur</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {currentPreceptor ? (
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-20 w-20 mb-4">
              <AvatarImage src={currentPreceptor.portrait} />
              <AvatarFallback>
                {currentPreceptor.name
                  .split(' ')
                  .map(n => n[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <h3 className="font-medium text-lg">{currentPreceptor.name}</h3>
            <p className="text-sm text-muted-foreground">{currentPreceptor.specialty}</p>
            
            <div className="flex flex-wrap justify-center gap-2 mt-3">
              <Badge variant="outline">Compétence: {currentPreceptor.expertise || currentPreceptor.skill}/100</Badge>
              <Badge variant="outline">Expérience: {currentPreceptor.experience} ans</Badge>
            </div>
            
            <p className="mt-4 text-sm">{currentPreceptor.description}</p>
            
            <div className="mt-6">
              <Button variant="outline" size="sm" onClick={() => toast.info("Gestion du précepteur...")}>
                Gérer le précepteur
              </Button>
            </div>
          </div>
        ) : child.currentEducation ? (
          <div className="space-y-4">
            <p className="text-center text-muted-foreground mb-4">
              Aucun précepteur n'est assigné à cet enfant.
            </p>
            
            {availablePreceptors.length > 0 ? (
              <>
                <div className="space-y-2">
                  <Select
                    value={selectedPreceptorId}
                    onValueChange={setSelectedPreceptorId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un précepteur" />
                    </SelectTrigger>
                    <SelectContent>
                      {availablePreceptors.map(preceptor => (
                        <SelectItem key={preceptor.id} value={preceptor.id}>
                          {preceptor.name} - {preceptor.specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex justify-center">
                  <Button onClick={handleAssignPreceptor} disabled={!selectedPreceptorId}>
                    Assigner ce précepteur
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex justify-center">
                <Button onClick={handleHirePreceptor}>
                  Embaucher un précepteur
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            <p>Démarrez une éducation pour assigner un précepteur</p>
          </div>
        )}
        
        {availablePreceptors.length > 0 && (
          <div className="mt-4 text-sm text-muted-foreground">
            <p>Un bon précepteur peut accélérer considérablement l'apprentissage et débloquer des compétences spéciales.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
