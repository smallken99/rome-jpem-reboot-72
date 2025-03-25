import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Book, Award, Star, Info, UserCheck, User, Calendar, Coins, Clock, MapPin, FileText, PenTool, BarChart } from 'lucide-react';
import { Preceptor, Skill } from '../types/preceptor';
import { usePreceptors } from '../hooks/usePreceptors';
import { SkillCard } from './SkillCard';
import { formatCurrency } from '@/utils/formatters';

interface PreceptorDetailProps {
  preceptor: Preceptor;
  onBack: () => void;
}

export const PreceptorDetail: React.FC<PreceptorDetailProps> = ({ preceptor, onBack }) => {
  const { updatePreceptor, assignPreceptor } = usePreceptors();
  const [isAssigning, setIsAssigning] = useState(false);
  
  const calculateAverageSkill = (skills: Skill[]): number => {
    if (!skills || skills.length === 0) return 0;
    const sum = skills.reduce((acc, skill) => acc + skill.level, 0);
    return Number((sum / skills.length).toFixed(1));
  };
  
  const calculateRecommendedPrice = (preceptor: Preceptor): number => {
    const basePrice = 3000;
    const averageSkill = calculateAverageSkill(preceptor.skills);
    
    return Math.round(basePrice * (1 + preceptor.reputation * 0.1) * (1 + averageSkill * 0.05));
  };
  
  const isAvailable = !preceptor.assignedTo;
  const recommendedPrice = calculateRecommendedPrice(preceptor);
  const priceRatio = preceptor.cost / recommendedPrice;
  const priceQuality = 
    priceRatio <= 0.8 ? "Excellente affaire" :
    priceRatio <= 0.95 ? "Bon rapport qualité/prix" :
    priceRatio <= 1.05 ? "Prix équitable" :
    priceRatio <= 1.2 ? "Légèrement surévalué" :
    "Surévalué";
  
  const handleAssign = () => {
    assignPreceptor(preceptor.id, isAvailable ? "membre-1" : null);
  };
  
  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack} className="mb-2">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour à la liste
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{preceptor.name}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {preceptor.origin}
                    <span className="mx-2">•</span>
                    <Clock className="h-4 w-4 mr-1" />
                    {preceptor.age} ans
                  </CardDescription>
                </div>
                <Badge variant={isAvailable ? "success" : "secondary"}>
                  {isAvailable ? "Disponible" : "Engagé"}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="sm:w-1/2 flex items-center gap-2">
                  <Book className="h-5 w-5 text-primary" />
                  <div>
                    <div className="text-sm text-muted-foreground">Spécialisation</div>
                    <div className="font-medium">{preceptor.specialization}</div>
                  </div>
                </div>
                
                <div className="sm:w-1/2 flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-500" />
                  <div>
                    <div className="text-sm text-muted-foreground">Réputation</div>
                    <div className="flex items-center">
                      <span className="font-medium mr-2">{preceptor.reputation}/10</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < Math.round(preceptor.reputation / 2) ? 'text-amber-500 fill-amber-500' : 'text-muted-foreground'}`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-3 flex items-center">
                  <PenTool className="h-5 w-5 mr-2" />
                  Compétences
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {preceptor.skills.map((skill) => (
                    <SkillCard key={skill.name} skill={skill} />
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-3 flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Antécédents
                </h3>
                <p className="text-muted-foreground">
                  {preceptor.background}
                </p>
              </div>
              
              {preceptor.performance && (
                <>
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-3 flex items-center">
                      <BarChart className="h-5 w-5 mr-2" />
                      Performance
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Performance globale</span>
                        <span className="font-medium">{preceptor.performance}%</span>
                      </div>
                      <Progress value={preceptor.performance} className="h-2" />
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Coins className="h-5 w-5 mr-2 text-amber-500" />
                  <span>Coût</span>
                </div>
                <Badge variant="outline" className="font-medium">
                  {formatCurrency(preceptor.cost)}
                </Badge>
              </div>
              
              <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                <div className="flex items-center mb-1">
                  <Info className="h-4 w-4 mr-1" />
                  <span className="font-medium">Rapport qualité/prix</span>
                </div>
                <div>{priceQuality}</div>
                <div className="mt-1">Prix recommandé: {formatCurrency(recommendedPrice)}</div>
              </div>
              
              {preceptor.availableUntil && (
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>Disponible jusqu'au</span>
                  </div>
                  <span>
                    {new Date(preceptor.availableUntil).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              )}
              
              {preceptor.assignedTo && (
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <UserCheck className="h-5 w-5 mr-2" />
                    <span>Assigné à</span>
                  </div>
                  <Badge>
                    Marcus Junior
                  </Badge>
                </div>
              )}
              
              {preceptor.assignedDate && (
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>Date d'assignation</span>
                  </div>
                  <span>
                    {new Date(preceptor.assignedDate).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex-col space-y-2">
              <Button 
                className="w-full"
                onClick={handleAssign}
                variant={isAvailable ? "default" : "outline"}
              >
                {isAvailable ? (
                  <>
                    <User className="mr-2 h-4 w-4" />
                    Assigner
                  </>
                ) : (
                  <>
                    <User className="mr-2 h-4 w-4" />
                    Libérer
                  </>
                )}
              </Button>
              
              <Button variant="outline" className="w-full">
                <PenTool className="mr-2 h-4 w-4" />
                Évaluer
              </Button>
            </CardFooter>
          </Card>
          
          {preceptor.notes && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {preceptor.notes}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
