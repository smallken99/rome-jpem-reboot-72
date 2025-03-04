
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, GraduationCap, Scroll, User, CalendarDays, Award, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { StatBox } from '@/components/ui-custom/StatBox';
import { children, educationPaths, specialties } from './EducationData';
import { Child, EducationPath } from './types/educationTypes';
import { MentorInfo } from './components/MentorInfo';
import { AnnualProgress } from './components/AnnualProgress';
import { ChildHeader } from './components/ChildHeader';
import { PietyBonus } from './components/PietyBonus';
import { EducationWarning } from './components/EducationWarning';
import { getEducationTypeIcon, getRelatedStatName } from './utils/educationUtils';

export const ChildEducationDetail = () => {
  const { childId } = useParams<{ childId: string }>();
  const navigate = useNavigate();
  
  // État local pour stocker les données de l'enfant
  const [child, setChild] = useState<Child | null>(null);
  const [availablePaths, setAvailablePaths] = useState<EducationPath[]>([]);
  const [selectedEducationType, setSelectedEducationType] = useState<string>('');
  
  // Chercher les données de l'enfant
  useEffect(() => {
    if (childId) {
      const foundChild = children.find(c => c.id === childId);
      if (foundChild) {
        setChild(foundChild);
        setSelectedEducationType(foundChild.currentEducation.type);
        
        // Filtrer les parcours éducatifs disponibles en fonction du genre et de l'âge
        const filteredPaths = educationPaths.filter(path => {
          const genderMatch = path.suitableFor === 'both' || 
                             (path.suitableFor === 'male' && foundChild.gender === 'male') ||
                             (path.suitableFor === 'female' && foundChild.gender === 'female');
          const ageMatch = foundChild.age >= path.minAge;
          return genderMatch && ageMatch;
        });
        
        setAvailablePaths(filteredPaths);
      }
    }
  }, [childId]);
  
  // Gestionnaire pour le changement du type d'éducation
  const handleEducationTypeChange = (type: string) => {
    setSelectedEducationType(type);
  };
  
  // Gestionnaire pour la soumission du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, nous simulons la mise à jour des données de l'enfant
    // Dans une application réelle, vous feriez un appel à l'API
    
    // Rediriger vers la page d'éducation principale
    navigate('/famille/education');
  };
  
  // Si l'enfant n'est pas trouvé, afficher un message
  if (!child) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-medium mb-4">Enfant non trouvé</h2>
        <ActionButton 
          label="Retour à l'éducation" 
          to="/famille/education"
          icon={<ArrowLeft className="h-4 w-4" />}
        />
      </div>
    );
  }
  
  // Vérifier si le type d'éducation sélectionné est valide pour cet enfant
  const isInvalidEducation = child.gender === 'female' && selectedEducationType === 'military';
  
  return (
    <div className="p-6 space-y-6">
      {/* En-tête avec bouton de retour */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-cinzel font-medium">Éducation de {child.name}</h2>
        <ActionButton 
          label="Retour à l'éducation" 
          to="/famille/education"
          variant="outline"
          icon={<ArrowLeft className="h-4 w-4" />}
        />
      </div>
      
      {/* Carte d'information sur l'enfant */}
      <Card>
        <ChildHeader 
          child={child} 
          hasInvalidEducation={isInvalidEducation}
        />
        
        <CardContent className="p-4">
          {/* Informations actuelles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <StatBox 
              title="Âge"
              value={`${child.age} ans`}
              description="Âge actuel de l'enfant"
              icon={<CalendarDays className="h-5 w-5" />}
            />
            <StatBox 
              title="Genre"
              value={child.gender === 'male' ? 'Garçon' : 'Fille'}
              description="Genre de l'enfant"
              icon={<User className="h-5 w-5" />}
            />
          </div>
          
          {/* Formulaire de modification de l'éducation */}
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Sélection du type d'éducation */}
              <div>
                <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-rome-navy" />
                  <span>Parcours éducatif</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {availablePaths.map((path) => (
                    <div 
                      key={path.type}
                      className={`border rounded-md p-3 cursor-pointer transition-all ${
                        selectedEducationType === path.type 
                          ? 'border-rome-gold bg-rome-parchment' 
                          : 'border-muted hover:border-rome-gold/50'
                      }`}
                      onClick={() => handleEducationTypeChange(path.type)}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {path.icon}
                        <h4 className="font-medium">{path.title}</h4>
                      </div>
                      <p className="text-xs text-muted-foreground">{path.description}</p>
                      <p className="text-xs mt-2">
                        <span className="font-medium">Durée:</span> {path.duration} années
                      </p>
                      
                      {isInvalidEducation && path.type === 'military' && (
                        <EducationWarning 
                          text="Formation non recommandée pour une fille romaine" 
                        />
                      )}
                    </div>
                  ))}
                  
                  <div 
                    className={`border rounded-md p-3 cursor-pointer transition-all ${
                      selectedEducationType === 'none' 
                        ? 'border-rome-gold bg-rome-parchment' 
                        : 'border-muted hover:border-rome-gold/50'
                    }`}
                    onClick={() => handleEducationTypeChange('none')}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <BookOpen className="h-5 w-5 text-muted-foreground" />
                      <h4 className="font-medium">Aucune éducation</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Ne pas assigner d'éducation formelle à cet enfant
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Options spécifiques au type d'éducation sélectionné */}
              {selectedEducationType !== 'none' && (
                <>
                  {/* Affichage des spécialités disponibles */}
                  <div>
                    <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                      <Scroll className="h-5 w-5 text-rome-navy" />
                      <span>Spécialité</span>
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {specialties[selectedEducationType as keyof typeof specialties]?.map((specialty, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Checkbox id={`specialty-${index}`} />
                          <Label htmlFor={`specialty-${index}`} className="cursor-pointer">
                            {specialty}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Notes et objectifs d'éducation */}
                  <div>
                    <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                      <Award className="h-5 w-5 text-rome-navy" />
                      <span>Objectifs éducatifs</span>
                    </h3>
                    
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="education-notes">Notes sur l'éducation</Label>
                        <Textarea 
                          id="education-notes" 
                          placeholder="Ajoutez des notes sur les objectifs éducatifs de cet enfant..."
                          className="min-h-32"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
              
              {/* Affichage des données actuelles si l'enfant a déjà une éducation */}
              {child.currentEducation.type !== 'none' && (
                <div className="border-t border-muted pt-4 mt-6">
                  <h3 className="text-lg font-medium mb-3">Éducation actuelle</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      {child.currentEducation.yearsCompleted !== undefined && 
                       child.currentEducation.totalYears !== undefined && (
                        <AnnualProgress 
                          yearsCompleted={child.currentEducation.yearsCompleted} 
                          totalYears={child.currentEducation.totalYears} 
                        />
                      )}
                      
                      <MentorInfo 
                        mentor={child.currentEducation.mentor} 
                        speciality={child.currentEducation.speciality}
                      />
                    </div>
                    
                    <div>
                      {child.currentEducation.pityBonus !== undefined && 
                       child.currentEducation.pityBonus > 0 && 
                       child.gender === 'female' && (
                        <PietyBonus 
                          bonus={child.currentEducation.pityBonus}
                          gender={child.gender}
                        />
                      )}
                      
                      {child.currentEducation.statBonus !== undefined && 
                       child.currentEducation.statBonus > 0 && (
                        <div className="mt-2 flex items-center gap-1 text-xs bg-green-50 p-2 rounded text-green-700">
                          <Award className="h-3 w-3" />
                          <span>
                            À la validation: +{child.currentEducation.statBonus} en {
                              getRelatedStatName(child.currentEducation.type)
                            }
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Boutons d'action */}
              <div className="flex justify-end gap-2 pt-4">
                <ActionButton 
                  variant="outline"
                  label="Annuler"
                  to="/famille/education"
                />
                <ActionButton 
                  type="submit"
                  label="Enregistrer les modifications"
                  variant="default"
                />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChildEducationDetail;
