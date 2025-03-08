import React, { useState, useEffect } from 'react';
import { useEducation } from './context/EducationContext';
import { specialties } from './data';
import { Preceptor } from './types/educationTypes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PreceptorQualityStars } from './components/PreceptorQualityStars';

export const PreceptorList: React.FC = () => {
  const { 
    loadPreceptorsByType, 
    hiredPreceptors 
  } = useEducation();
  const navigate = useNavigate();
  
  const [activeSpecialty, setActiveSpecialty] = useState(specialties[0]);
  const [preceptors, setPreceptors] = useState<Preceptor[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterQuality, setFilterQuality] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadPreceptors = async () => {
      setIsLoading(true);
      const loadedPreceptors = await loadPreceptorsByType(activeSpecialty);
      setPreceptors(loadedPreceptors);
      setIsLoading(false);
    };
    
    loadPreceptors();
  }, [activeSpecialty, loadPreceptorsByType]);
  
  // Filtrer les précepteurs
  const filteredPreceptors = preceptors.filter(preceptor => {
    const searchMatch = preceptor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const qualityMatch = filterQuality ? String(preceptor.quality) === filterQuality : true;
    
    return searchMatch && qualityMatch;
  });
  
  const handlePreceptorClick = (preceptor: Preceptor) => {
    navigate(`/famille/education/preceptor/${preceptor.id}/${activeSpecialty}`);
  };
  
  return (
    <div className="space-y-6">
      {/* En-tête et filtres */}
      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <h2 className="text-2xl font-bold">Précepteurs disponibles</h2>
        
        <div className="flex items-center space-x-4">
          <Input
            type="text"
            placeholder="Rechercher un précepteur..."
            className="max-w-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <Select value={filterQuality} onValueChange={setFilterQuality}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrer par qualité" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Toutes les qualités</SelectItem>
              <SelectItem value="1">Qualité 1</SelectItem>
              <SelectItem value="2">Qualité 2</SelectItem>
              <SelectItem value="3">Qualité 3</SelectItem>
              <SelectItem value="4">Qualité 4</SelectItem>
              <SelectItem value="5">Qualité 5</SelectItem>
              <SelectItem value="6">Qualité 6</SelectItem>
              <SelectItem value="7">Qualité 7</SelectItem>
              <SelectItem value="8">Qualité 8</SelectItem>
              <SelectItem value="9">Qualité 9</SelectItem>
              <SelectItem value="10">Qualité 10</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Separator />
      
      {/* Tabs de spécialités */}
      <Tabs defaultValue={activeSpecialty} className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-6">
          {specialties.map(specialty => (
            <TabsTrigger 
              key={specialty} 
              value={specialty}
              onClick={() => setActiveSpecialty(specialty)}
            >
              {specialty}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {specialties.map(specialty => (
          <TabsContent key={specialty} value={specialty}>
            {isLoading ? (
              <div className="text-center py-12 text-muted-foreground italic">
                Chargement des précepteurs...
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPreceptors.length > 0 ? (
                  filteredPreceptors.map(preceptor => (
                    <Card 
                      key={preceptor.id}
                      className="cursor-pointer hover:shadow-md transition-shadow duration-200"
                      onClick={() => handlePreceptorClick(preceptor)}
                    >
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold">{preceptor.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <PreceptorQualityStars quality={preceptor.quality} />
                        </div>
                        <p className="text-sm text-muted-foreground">{preceptor.speciality}</p>
                        <Badge variant="secondary">{preceptor.reputation}</Badge>
                      </CardContent>
                      <CardFooter className="text-sm text-muted-foreground">
                        Coût: {preceptor.cost} As
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12 text-muted-foreground italic">
                    Aucun précepteur trouvé avec ces critères.
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
