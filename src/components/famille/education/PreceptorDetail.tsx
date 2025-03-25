
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PreceptorActions } from './components/PreceptorActions';
import { useEconomy } from '@/hooks/useEconomy';
import { Preceptor } from '../types/preceptor';
import { usePreceptors } from '../hooks/usePreceptors';
import { ArrowLeft, UserCheck, UserX, BookOpen, BadgeCheck, CircleDollarSign, Bookmark, User, GraduationCap } from 'lucide-react';

interface PreceptorDetailProps {
  preceptor: Preceptor;
  onBack: () => void;
}

export const PreceptorDetail: React.FC<PreceptorDetailProps> = ({ preceptor, onBack }) => {
  const { canAfford, makePayment } = useEconomy();
  const { assignPreceptor, dismissPreceptor, isPreceptorAssigned } = usePreceptors();
  const [isAssigned, setIsAssigned] = useState(isPreceptorAssigned(preceptor.id));
  
  const handleAssign = (preceptorId: string) => {
    const success = assignPreceptor(preceptorId);
    if (success) {
      setIsAssigned(true);
    }
  };
  
  const handleDismiss = (preceptorId: string) => {
    const success = dismissPreceptor(preceptorId);
    if (success) {
      setIsAssigned(false);
    }
  };
  
  const handlePaySalary = (preceptorId: string) => {
    const success = makePayment(
      preceptor.salary,
      preceptor.name,
      "Éducation",
      `Paiement du salaire de ${preceptor.name}`
    );
    return success;
  };
  
  const calculateCompetence = (preceptor: Preceptor) => {
    // Moyenne des compétences du précepteur
    const skills = Object.values(preceptor.skills);
    const sum = skills.reduce((acc, val) => acc + val, 0);
    return Math.round(sum / skills.length);
  };
  
  const competence = calculateCompetence(preceptor);
  const canAssign = canAfford(preceptor.salary);
  
  return (
    <div className="space-y-6">
      <Button 
        variant="ghost" 
        className="mb-2" 
        onClick={onBack}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour à la liste
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{preceptor.name}</CardTitle>
                <Badge>{preceptor.speciality}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {preceptor.origin} • {preceptor.age} ans
              </p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 border rounded-md">
                  <GraduationCap className="h-5 w-5 mb-1 mx-auto text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Compétence</p>
                  <p className="font-medium mt-1">{competence}/10</p>
                </div>
                
                <div className="text-center p-3 border rounded-md">
                  <CircleDollarSign className="h-5 w-5 mb-1 mx-auto text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Salaire</p>
                  <p className="font-medium mt-1">{preceptor.salary.toLocaleString()} As/an</p>
                </div>
                
                <div className="text-center p-3 border rounded-md">
                  <User className="h-5 w-5 mb-1 mx-auto text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Statut</p>
                  <p className="font-medium mt-1">{isAssigned ? "Engagé" : "Disponible"}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <PreceptorActions
                  preceptorId={preceptor.id}
                  isAssigned={isAssigned}
                  onAssign={handleAssign}
                  onDismiss={handleDismiss}
                  onViewDetails={() => {}}
                  onPaySalary={handlePaySalary}
                  canAssign={canAssign}
                  canDismiss={isAssigned}
                  canPaySalary={isAssigned && canAfford(preceptor.salary)}
                />
              </div>
              
              <Separator className="my-4" />
              
              <div>
                <h3 className="font-medium mb-3">Biographie</h3>
                <p className="text-muted-foreground text-sm">{preceptor.biography}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Compétences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(preceptor.skills).map(([skill, value]) => (
                  <div key={skill} className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm">{skill}</span>
                      <span className="text-sm font-medium">{value}/10</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary"
                        style={{ width: `${value * 10}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Domaines d'expertise</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {preceptor.expertise.map(item => (
                  <Badge key={item} variant="secondary" className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3" />
                    <span>{item}</span>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Références</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {preceptor.references.map((reference, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <BadgeCheck className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <span className="text-sm">{reference}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
