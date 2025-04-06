
import React from 'react';
import { Child } from './types/educationTypes';
import { Card, CardContent } from '@/components/ui/card';
import { Preceptor } from './types/educationTypes';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { GraduationCap, Clock, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ChildrenEducationListProps {
  children: Child[];
  onStartEducation: (childId: string, educationType: string, mentorId?: string | null) => void;
  onAdvanceYear: (childId: string) => void;
  onCompleteEducation: (childId: string) => void;
  preceptors: Preceptor[];
}

export const ChildrenEducationList: React.FC<ChildrenEducationListProps> = ({
  children,
  onStartEducation,
  onAdvanceYear,
  onCompleteEducation,
  preceptors
}) => {
  const navigate = useNavigate();
  
  // Filtrer pour ne montrer que les enfants (moins de 18 ans)
  const educationChildren = children.filter(child => child.age < 18);
  
  // Fonction pour récupérer les initiales
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };
  
  // Fonction pour afficher le type d'éducation en français
  const formatEducationType = (type: string) => {
    const types: Record<string, string> = {
      'military': 'Militaire',
      'rhetoric': 'Rhétorique',
      'political': 'Politique',
      'religious': 'Religieuse',
      'philosophical': 'Philosophique',
      'administrative': 'Administrative',
      'none': 'Aucune'
    };
    
    return types[type] || type;
  };
  
  // Récupérer le nom du précepteur
  const getPreceptorName = (childId: string) => {
    // Trouver le précepteur qui est assigné à cet enfant
    const preceptor = preceptors.find(p => p.childId === childId);
    return preceptor ? preceptor.name : 'Aucun';
  };
  
  if (educationChildren.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-muted-foreground">
          <p>Aucun enfant trouvé pour l'éducation.</p>
          <p className="mt-2">Ajoutez des enfants à votre famille pour commencer leur éducation.</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-4">
      {educationChildren.map(child => (
        <Card key={child.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row">
              <div className="bg-primary/10 p-4 sm:w-1/4 flex flex-col items-center justify-center">
                <Avatar className="h-16 w-16 mb-2">
                  <AvatarImage alt={child.name} />
                  <AvatarFallback>{getInitials(child.name)}</AvatarFallback>
                </Avatar>
                <h3 className="font-medium text-center">{child.name}</h3>
                <div className="flex items-center mt-1">
                  <Badge variant="outline">
                    {child.age} ans
                  </Badge>
                  <Badge variant="outline" className="ml-1">
                    {child.gender === 'male' ? 'Garçon' : 'Fille'}
                  </Badge>
                </div>
              </div>
              
              <div className="p-4 sm:w-3/4">
                <div className="flex flex-col sm:flex-row justify-between mb-4">
                  <div>
                    <p className="font-medium">Éducation: {formatEducationType(child.educationType)}</p>
                    <p className="text-sm text-muted-foreground">Précepteur: {getPreceptorName(child.id)}</p>
                  </div>
                  
                  <div className="mt-2 sm:mt-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="mr-2"
                      onClick={() => navigate(`/famille/education/${child.id}`)}
                    >
                      <BookOpen className="h-4 w-4 mr-1" />
                      Détails
                    </Button>
                    {child.educationType !== 'none' && (
                      <Button
                        size="sm"
                        onClick={() => onAdvanceYear(child.id)}
                      >
                        <Clock className="h-4 w-4 mr-1" />
                        Avancer d'un an
                      </Button>
                    )}
                  </div>
                </div>
                
                {child.educationType !== 'none' ? (
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Progression</span>
                        <span className="text-sm font-medium">{child.progress}%</span>
                      </div>
                      <Progress value={child.progress} className="h-2" />
                    </div>
                    
                    {child.progress >= 100 && (
                      <div className="flex justify-end">
                        <Button
                          variant="default"
                          onClick={() => onCompleteEducation(child.id)}
                        >
                          <GraduationCap className="h-4 w-4 mr-1" />
                          Compléter l'éducation
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onStartEducation(child.id, 'military')}
                    >
                      Militaire
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onStartEducation(child.id, 'rhetoric')}
                    >
                      Rhétorique
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onStartEducation(child.id, 'political')}
                    >
                      Politique
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onStartEducation(child.id, 'religious')}
                    >
                      Religieuse
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onStartEducation(child.id, 'philosophical')}
                    >
                      Philosophique
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
