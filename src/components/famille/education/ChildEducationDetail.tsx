
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  BookOpen, 
  GraduationCap, 
  Clock,
  Heart,
  Sword,
  Users
} from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

// Sample data for children
const childrenData = {
  "child1": {
    id: "child1",
    name: "Julia Tullia",
    age: 10,
    gender: "female",
    currentEducation: {
      type: "rhetoric",
      typeName: "Rhétorique",
      level: 2,
      startYear: 710,
      mentorId: "preceptor1",
      mentorName: "Marcus Livius",
      progress: 65
    },
    stats: {
      intelligence: 60,
      charisma: 70,
      martial: 30,
      piety: 55
    }
  },
  "child2": {
    id: "child2",
    name: "Marcus Tullius",
    age: 12,
    gender: "male",
    currentEducation: {
      type: "military",
      typeName: "Art Militaire",
      level: 3,
      startYear: 708,
      mentorId: "preceptor2",
      mentorName: "Titus Flavius",
      progress: 80
    },
    stats: {
      intelligence: 55,
      charisma: 60,
      martial: 75,
      piety: 40
    }
  },
  "child3": {
    id: "child3",
    name: "Lucius Tullius",
    age: 8,
    gender: "male",
    currentEducation: null,
    stats: {
      intelligence: 50,
      charisma: 45,
      martial: 60,
      piety: 50
    }
  }
};

// Sample data for education paths
const educationPaths = [
  {
    id: "rhetoric",
    name: "Rhétorique",
    description: "Formation à l'art oratoire et aux débats philosophiques",
    primaryStat: "intelligence",
    secondaryStat: "charisma"
  },
  {
    id: "military",
    name: "Art Militaire",
    description: "Formation aux tactiques militaires et à l'art de la guerre",
    primaryStat: "martial",
    secondaryStat: "intelligence"
  },
  {
    id: "religious",
    name: "Piété et Rituels",
    description: "Étude des rites religieux et des traditions romaines",
    primaryStat: "piety",
    secondaryStat: "charisma"
  }
];

const ChildEducationDetail: React.FC = () => {
  const { childId } = useParams<{ childId: string }>();
  const navigate = useNavigate();
  const [child, setChild] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('current');
  const [selectedEducationPath, setSelectedEducationPath] = useState<string | null>(null);
  
  // Load child data
  useEffect(() => {
    const foundChild = childrenData[childId as keyof typeof childrenData];
    if (foundChild) {
      setChild(foundChild);
      if (foundChild.currentEducation) {
        setSelectedEducationPath(foundChild.currentEducation.type);
      }
    } else {
      toast.error("Enfant non trouvé");
      navigate('/famille/education');
    }
  }, [childId, navigate]);
  
  const handleStartEducation = () => {
    if (!selectedEducationPath) {
      toast.error("Veuillez sélectionner une voie d'éducation");
      return;
    }
    
    const path = educationPaths.find(p => p.id === selectedEducationPath);
    toast.success(`${child.name} a commencé son éducation en ${path?.name}`);
    navigate('/famille/education');
  };
  
  const handleChangeEducation = () => {
    if (!selectedEducationPath) {
      toast.error("Veuillez sélectionner une nouvelle voie d'éducation");
      return;
    }
    
    const path = educationPaths.find(p => p.id === selectedEducationPath);
    toast.success(`L'éducation de ${child.name} a été changée pour ${path?.name}`);
    navigate('/famille/education');
  };
  
  if (!child) {
    return (
      <div className="p-4 text-center">
        <p>Chargement des informations...</p>
      </div>
    );
  }
  
  const getStatIcon = (stat: string) => {
    switch (stat) {
      case 'intelligence': return <BookOpen className="h-4 w-4 text-blue-500" />;
      case 'charisma': return <Users className="h-4 w-4 text-green-500" />;
      case 'martial': return <Sword className="h-4 w-4 text-red-500" />;
      case 'piety': return <Heart className="h-4 w-4 text-amber-500" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };
  
  const getStatName = (stat: string) => {
    switch (stat) {
      case 'intelligence': return 'Intelligence';
      case 'charisma': return 'Charisme';
      case 'martial': return 'Art Martial';
      case 'piety': return 'Piété';
      default: return stat;
    }
  };
  
  const getEducationPathColor = (pathId: string) => {
    switch (pathId) {
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
        onClick={() => navigate('/famille/education')}
      >
        <ArrowLeft className="h-4 w-4" />
        Retour à la liste des enfants
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-blue-500" />
                    Éducation de {child.name}
                  </CardTitle>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <Badge>
                      {child.age} ans
                    </Badge>
                    <Badge variant="outline">
                      {child.gender === 'male' ? 'Garçon' : 'Fille'}
                    </Badge>
                    {child.currentEducation && (
                      <Badge className={getEducationPathColor(child.currentEducation.type)}>
                        {child.currentEducation.typeName}
                      </Badge>
                    )}
                  </div>
                </div>
                <div>
                  {child.currentEducation ? (
                    <Button variant="outline" onClick={handleChangeEducation}>
                      Changer d'éducation
                    </Button>
                  ) : (
                    <Button onClick={handleStartEducation}>
                      Commencer l'éducation
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="current" className="flex-1">
                    <Clock className="h-4 w-4 mr-2" />
                    Éducation actuelle
                  </TabsTrigger>
                  <TabsTrigger value="paths" className="flex-1">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Voies d'éducation
                  </TabsTrigger>
                  <TabsTrigger value="stats" className="flex-1">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Caractéristiques
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="current">
                  {child.currentEducation ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Type d'éducation</div>
                          <div className="font-medium">{child.currentEducation.typeName}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Niveau</div>
                          <div className="font-medium">{child.currentEducation.level}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Année de début</div>
                          <div className="font-medium">{child.currentEducation.startYear} AUC</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Précepteur</div>
                          <div className="font-medium">{child.currentEducation.mentorName}</div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-1">
                          <div className="text-sm font-medium">Progression</div>
                          <div className="text-sm">{child.currentEducation.progress}%</div>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500" 
                            style={{ width: `${child.currentEducation.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="font-medium mb-2">Actions disponibles</h3>
                        <div className="grid grid-cols-2 gap-2">
                          <Button variant="outline" size="sm">
                            Intensifier l'éducation
                          </Button>
                          <Button variant="outline" size="sm">
                            Changer de précepteur
                          </Button>
                          <Button variant="outline" size="sm">
                            Ajouter un tuteur
                          </Button>
                          <Button variant="outline" size="sm">
                            Rapport détaillé
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-6 text-center bg-muted rounded-md">
                        <GraduationCap className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                        <h3 className="text-lg font-medium">Aucune éducation en cours</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {child.name} n'a pas encore commencé son éducation formelle.
                        </p>
                        <Button className="mt-4" onClick={() => setActiveTab('paths')}>
                          Choisir une voie d'éducation
                        </Button>
                      </div>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="paths">
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Choisissez une voie d'éducation adaptée aux talents et au futur rôle de {child.name}.
                    </p>
                    
                    <div className="grid grid-cols-1 gap-3">
                      {educationPaths.map(path => (
                        <button
                          key={path.id}
                          className={`p-3 border rounded-md text-left transition-all ${
                            selectedEducationPath === path.id 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedEducationPath(path.id)}
                          disabled={child.gender === 'female' && path.id === 'military'}
                        >
                          <div className="flex items-center justify-between">
                            <div className="font-medium">{path.name}</div>
                            <Badge className={getEducationPathColor(path.id)}>
                              {path.id === 'rhetoric' ? 'Civile' : 
                               path.id === 'military' ? 'Militaire' : 'Religieuse'}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">{path.description}</div>
                          <div className="flex items-center mt-2 gap-4">
                            <div className="flex items-center gap-1">
                              <div className="text-xs text-muted-foreground">Principal:</div>
                              <div className="flex items-center gap-1">
                                {getStatIcon(path.primaryStat)}
                                <span className="text-xs">{getStatName(path.primaryStat)}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="text-xs text-muted-foreground">Secondaire:</div>
                              <div className="flex items-center gap-1">
                                {getStatIcon(path.secondaryStat)}
                                <span className="text-xs">{getStatName(path.secondaryStat)}</span>
                              </div>
                            </div>
                          </div>
                          
                          {child.gender === 'female' && path.id === 'military' && (
                            <div className="mt-2 text-xs text-red-500">
                              Cette voie n'est pas disponible pour les filles dans la société romaine
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                    
                    <div className="flex justify-end mt-4">
                      {child.currentEducation ? (
                        <Button onClick={handleChangeEducation} disabled={!selectedEducationPath}>
                          Changer pour cette éducation
                        </Button>
                      ) : (
                        <Button onClick={handleStartEducation} disabled={!selectedEducationPath}>
                          Commencer cette éducation
                        </Button>
                      )}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="stats">
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Les caractéristiques actuelles de {child.name}. L'éducation permettra de les développer.
                    </p>
                    
                    <div className="grid grid-cols-1 gap-4">
                      {Object.entries(child.stats).map(([stat, value]) => (
                        <div key={stat} className="p-3 border rounded-md">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              {getStatIcon(stat)}
                              <span className="font-medium">{getStatName(stat)}</span>
                            </div>
                            <span className="font-medium">{value}</span>
                          </div>
                          <div className="mt-2 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${
                                stat === 'intelligence' ? 'bg-blue-500' :
                                stat === 'charisma' ? 'bg-green-500' :
                                stat === 'martial' ? 'bg-red-500' : 'bg-amber-500'
                              }`} 
                              style={{ width: `${Number(value)}%` }}
                            ></div>
                          </div>
                          <div className="mt-2 text-xs text-muted-foreground">
                            {Number(value) < 30 && 'Faible. Nécessite une attention particulière.'}
                            {Number(value) >= 30 && Number(value) < 60 && 'Moyen. Peut être amélioré avec une bonne éducation.'}
                            {Number(value) >= 60 && 'Fort. Un talent naturel à développer.'}
                          </div>
                        </div>
                      ))}
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
              <CardTitle className="text-base">Profil</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-muted-foreground">Nom</div>
                  <div className="font-medium">{child.name}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Âge</div>
                  <div className="font-medium">{child.age} ans</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Genre</div>
                  <div className="font-medium">{child.gender === 'male' ? 'Masculin' : 'Féminin'}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Éducation</div>
                  <div className="font-medium">
                    {child.currentEducation ? child.currentEducation.typeName : 'Aucune'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Avenir potentiel</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {child.gender === 'male' ? (
                  <>
                    <div className="text-sm font-medium">Carrières possibles:</div>
                    <div className="flex flex-col gap-2">
                      <Badge className="w-fit bg-blue-100 text-blue-800 hover:bg-blue-100">
                        Sénateur
                      </Badge>
                      <Badge className="w-fit bg-red-100 text-red-800 hover:bg-red-100">
                        Officier militaire
                      </Badge>
                      <Badge className="w-fit bg-amber-100 text-amber-800 hover:bg-amber-100">
                        Prêtre
                      </Badge>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-sm font-medium">Rôles possibles:</div>
                    <div className="flex flex-col gap-2">
                      <Badge className="w-fit bg-purple-100 text-purple-800 hover:bg-purple-100">
                        Alliance matrimoniale
                      </Badge>
                      <Badge className="w-fit bg-amber-100 text-amber-800 hover:bg-amber-100">
                        Vestale
                      </Badge>
                      <Badge className="w-fit bg-green-100 text-green-800 hover:bg-green-100">
                        Matrone
                      </Badge>
                    </div>
                  </>
                )}
                
                <div className="mt-4 text-xs text-muted-foreground">
                  <p>L'éducation choisie influencera grandement les opportunités futures.</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Notes personnelles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-3 bg-muted rounded-md text-sm italic">
                {child.gender === 'male' ? (
                  <p>Montre un intérêt particulier pour l'histoire et les récits des grands généraux. A une bonne mémoire et s'exprime avec aisance pour son âge.</p>
                ) : (
                  <p>Fait preuve d'une grande curiosité intellectuelle et d'un talent pour la musique. Apprend vite et s'intéresse aux rites religieux.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChildEducationDetail;
