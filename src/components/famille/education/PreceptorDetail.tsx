
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  BookOpen, 
  Calendar, 
  GraduationCap, 
  History, 
  Users
} from 'lucide-react';
import { formatMoney } from '@/utils/formatUtils';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

// Sample data for preceptors
const preceptorsData = {
  "preceptor1": {
    id: "preceptor1",
    name: "Marcus Livius",
    speciality: "rhetoric",
    specialityName: "Rhétorique",
    experience: 12,
    rating: 4,
    salary: 2000,
    available: true,
    background: "Ancien orateur du forum, a enseigné à de nombreux jeunes patriciens",
    skills: ["Éloquence", "Philosophie", "Grec ancien", "Poésie"],
    students: ["Julia Tullia", "Lucius Cornelius"]
  },
  "preceptor2": {
    id: "preceptor2",
    name: "Titus Flavius",
    speciality: "military",
    specialityName: "Art Militaire",
    experience: 8,
    rating: 5,
    salary: 2500,
    available: false,
    background: "Ancien centurion des légions de César, vétéran de la guerre des Gaules",
    skills: ["Tactique militaire", "Équitation", "Combat au glaive", "Histoire militaire"],
    students: ["Marcus Antonius"]
  },
  "preceptor3": {
    id: "preceptor3",
    name: "Publius Septimius",
    speciality: "religious",
    specialityName: "Piété et Rituels",
    experience: 15,
    rating: 3,
    salary: 1800,
    available: true,
    background: "Ancien aide d'un pontife, a servi dans plusieurs temples de Rome",
    skills: ["Rituels sacrés", "Divination", "Lecture des auspices", "Traditions religieuses"],
    students: []
  }
};

interface PreceptorDetailProps {
  preceptorId: string;
}

export const PreceptorDetail: React.FC<PreceptorDetailProps> = ({ preceptorId }) => {
  const navigate = useNavigate();
  const [preceptor, setPreceptor] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('profile');
  
  // Load preceptor data
  useEffect(() => {
    const foundPreceptor = preceptorsData[preceptorId as keyof typeof preceptorsData];
    if (foundPreceptor) {
      setPreceptor(foundPreceptor);
    } else {
      toast.error("Précepteur non trouvé");
      navigate('/famille/education');
    }
  }, [preceptorId, navigate]);
  
  const handleHire = () => {
    if (!preceptor.available) {
      toast.error("Ce précepteur n'est pas disponible actuellement");
      return;
    }
    
    toast.success(`${preceptor.name} a été engagé comme précepteur`);
    navigate('/famille/education', { state: { tab: 'preceptors' } });
  };
  
  const handleDismiss = () => {
    toast.success(`${preceptor.name} a été remercié de ses services`);
    navigate('/famille/education', { state: { tab: 'preceptors' } });
  };
  
  if (!preceptor) {
    return (
      <div className="p-4 text-center">
        <p>Chargement des informations...</p>
      </div>
    );
  }
  
  const getSpecialityColor = (speciality: string) => {
    switch (speciality) {
      case 'rhetoric': return 'bg-blue-100 text-blue-800';
      case 'military': return 'bg-red-100 text-red-800';
      case 'religious': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="space-y-6">
      <Button 
        variant="outline" 
        className="flex items-center gap-2" 
        onClick={() => navigate('/famille/education', { state: { tab: 'preceptors' } })}
      >
        <ArrowLeft className="h-4 w-4" />
        Retour à la liste des précepteurs
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-blue-500" />
                    {preceptor.name}
                  </CardTitle>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <Badge className={getSpecialityColor(preceptor.speciality)}>
                      {preceptor.specialityName}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {preceptor.experience} ans d'expérience
                    </span>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg 
                          key={i}
                          className={`h-4 w-4 ${i < preceptor.rating ? 'text-amber-500' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  {preceptor.available ? (
                    <Button onClick={handleHire}>Engager ({formatMoney(preceptor.salary)}/an)</Button>
                  ) : (
                    <Button variant="secondary" onClick={handleDismiss}>Remercier</Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="profile" className="flex-1">
                    <Users className="h-4 w-4 mr-2" />
                    Profil
                  </TabsTrigger>
                  <TabsTrigger value="skills" className="flex-1">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Compétences
                  </TabsTrigger>
                  <TabsTrigger value="history" className="flex-1">
                    <History className="h-4 w-4 mr-2" />
                    Historique
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium">Biographie</h3>
                      <p className="mt-1 text-sm">{preceptor.background}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium">Spécialité</h3>
                        <p className="mt-1 text-sm">{preceptor.specialityName}</p>
                      </div>
                      <div>
                        <h3 className="font-medium">Salaire annuel</h3>
                        <p className="mt-1 text-sm">{formatMoney(preceptor.salary)}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium">Élèves actuels</h3>
                      {preceptor.students.length > 0 ? (
                        <ul className="mt-1 space-y-1">
                          {preceptor.students.map((student: string) => (
                            <li key={student} className="text-sm flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                              {student}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-1 text-sm text-muted-foreground">
                          Aucun élève actuellement
                        </p>
                      )}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="skills">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium">Compétences principales</h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {preceptor.skills.map((skill: string) => (
                          <Badge key={skill} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h3 className="font-medium">Efficacité d'enseignement</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                        <div className="p-3 border rounded-md">
                          <div className="text-sm text-muted-foreground">Notions de base</div>
                          <div className="mt-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500" style={{ width: '90%' }}></div>
                          </div>
                        </div>
                        <div className="p-3 border rounded-md">
                          <div className="text-sm text-muted-foreground">Connaissances avancées</div>
                          <div className="mt-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500" style={{ width: '75%' }}></div>
                          </div>
                        </div>
                        <div className="p-3 border rounded-md">
                          <div className="text-sm text-muted-foreground">Expertise</div>
                          <div className="mt-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500" style={{ width: '60%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="history">
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Historique des enseignements et réalisations du précepteur.
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="font-medium">Formation de Quintus Fabius</div>
                          <div className="text-sm text-muted-foreground">
                            A formé le jeune patricien qui est devenu un orateur renommé du Sénat
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">708-710 AUC</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="font-medium">Service auprès de la famille Cornelii</div>
                          <div className="text-sm text-muted-foreground">
                            A enseigné à trois générations de la prestigieuse famille Cornelii
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">698-705 AUC</div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                          <div className="font-medium">Publication d'un traité</div>
                          <div className="text-sm text-muted-foreground">
                            Auteur d'un traité sur l'éducation des jeunes nobles romains
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">697 AUC</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Disponibilité</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge 
                variant={preceptor.available ? "success" : "destructive"}
                className="mt-1"
              >
                {preceptor.available ? "Disponible" : "Non disponible"}
              </Badge>
              
              <div className="mt-4 text-sm">
                {preceptor.available ? (
                  <p>Ce précepteur est actuellement disponible pour enseigner à vos enfants.</p>
                ) : (
                  <p>Ce précepteur est déjà engagé et ne peut pas accepter de nouveaux élèves pour le moment.</p>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Coût</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{formatMoney(preceptor.salary)}</div>
              <div className="text-sm text-muted-foreground">par an</div>
              
              <div className="mt-4 text-sm">
                <p>Ce montant couvre:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Les leçons quotidiennes</li>
                  <li>Le matériel d'apprentissage</li>
                  <li>L'accompagnement aux événements éducatifs</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Évaluations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg 
                      key={i}
                      className={`h-5 w-5 ${i < preceptor.rating ? 'text-amber-500' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-sm text-muted-foreground">
                  D'après 7 familles
                </span>
              </div>
              
              <div className="space-y-3 mt-4">
                <div>
                  <div className="text-sm font-medium">Famille Cornelia</div>
                  <div className="flex mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg 
                        key={i}
                        className={`h-4 w-4 ${i < 5 ? 'text-amber-500' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="text-sm mt-1">
                    "Un précepteur exceptionnel, mon fils a fait d'immenses progrès."
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium">Famille Tullia</div>
                  <div className="flex mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg 
                        key={i}
                        className={`h-4 w-4 ${i < 4 ? 'text-amber-500' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <div className="text-sm mt-1">
                    "Très compétent, bien que parfois un peu strict."
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
