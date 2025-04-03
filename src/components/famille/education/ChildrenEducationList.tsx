
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Child, Preceptor } from './types/educationTypes';
import { StartEducationDialog } from './StartEducationDialog';
import { GraduationCap, ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ChildrenEducationListProps {
  children: Child[];
  preceptors: Preceptor[];
  onStartEducation: (childId: string, educationType: string, mentorId: string | null) => void;
  onAdvanceYear: (childId: string) => void;
  onCompleteEducation: (childId: string) => void;
}

export const ChildrenEducationList: React.FC<ChildrenEducationListProps> = ({
  children,
  preceptors,
  onStartEducation,
  onAdvanceYear,
  onCompleteEducation
}) => {
  const [selectedChildId, setSelectedChildId] = React.useState<string | null>(null);
  
  const handleStartEducation = (childId: string) => {
    setSelectedChildId(childId);
  };
  
  const handleCloseDialog = () => {
    setSelectedChildId(null);
  };
  
  if (!children.length) {
    return (
      <div className="text-center p-6 text-muted-foreground">
        <p>Aucun enfant trouvé dans votre famille</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {children.map(child => (
        <Card key={child.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="p-4 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
              <div className="col-span-2">
                <h3 className="font-semibold text-base">{child.name}</h3>
                <div className="flex gap-2 items-center text-sm text-muted-foreground">
                  <span>{child.age} ans</span>
                  <span>•</span>
                  <span>{child.gender === 'male' ? 'Garçon' : 'Fille'}</span>
                </div>
              </div>
              
              {child.currentEducation ? (
                <div className="col-span-3 md:col-span-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">
                      {child.currentEducation.type} {child.currentEducation.mentor && `(${child.currentEducation.mentor})`}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {child.currentEducation.yearsCompleted}/{child.currentEducation.totalYears} ans
                    </span>
                  </div>
                  <Progress value={child.currentEducation.progress} className="h-2" />
                  
                  <div className="mt-2 flex gap-1 flex-wrap">
                    {child.currentEducation.skills.map((skill, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="col-span-3 md:col-span-2 flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Pas encore en formation</span>
                </div>
              )}
              
              <div className="md:text-right">
                {!child.currentEducation ? (
                  <Button
                    size="sm"
                    onClick={() => handleStartEducation(child.id)}
                    className="flex items-center gap-1"
                  >
                    <GraduationCap className="h-4 w-4" />
                    <span>Éduquer</span>
                  </Button>
                ) : child.currentEducation.progress < 100 ? (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onAdvanceYear(child.id)}
                    className="flex items-center gap-1"
                  >
                    <ArrowRight className="h-4 w-4" />
                    <span>Avancer</span>
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="default"
                    onClick={() => onCompleteEducation(child.id)}
                    className="flex items-center gap-1"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Terminer</span>
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {selectedChildId && (
        <StartEducationDialog
          isOpen={!!selectedChildId}
          onClose={handleCloseDialog}
          childId={selectedChildId}
          preceptors={preceptors}
          onStartEducation={onStartEducation}
        />
      )}
    </div>
  );
};
