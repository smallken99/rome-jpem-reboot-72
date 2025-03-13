
import React, { useState } from 'react';
import { PreceptorCard } from './PreceptorCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserPlus, Users, Search } from 'lucide-react';
import { useEducation } from './context/EducationContext';
import { getEducationTypes } from './data';

interface EducationType {
  value: string;
  label: string;
}

export const PreceptorList: React.FC = () => {
  const { 
    preceptors, 
    hiredPreceptors, 
    loadPreceptorsByType, 
    hirePreceptor, 
    firePreceptor 
  } = useEducation();
  
  const [selectedType, setSelectedType] = useState<string>('all');
  const [showAvailable, setShowAvailable] = useState(true);
  
  const educationTypes: EducationType[] = getEducationTypes();
  
  // Filter preceptors based on selected type
  const filteredPreceptors = showAvailable 
    ? loadPreceptorsByType(selectedType)
    : hiredPreceptors.filter(p => selectedType === 'all' || p.specialty === selectedType);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-2">
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tous les types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              {educationTypes.map(type => (
                <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            className={showAvailable ? 'bg-blue-50 text-blue-800' : ''}
            onClick={() => setShowAvailable(true)}
          >
            <Search className="h-4 w-4 mr-2" />
            Disponibles
          </Button>
          
          <Button 
            variant="outline"
            className={!showAvailable ? 'bg-green-50 text-green-800' : ''}
            onClick={() => setShowAvailable(false)}
          >
            <Users className="h-4 w-4 mr-2" />
            Employés
          </Button>
        </div>
      </div>
      
      {filteredPreceptors.length === 0 ? (
        <div className="text-center p-8 border rounded-md">
          <p className="text-muted-foreground">
            {showAvailable 
              ? "Aucun précepteur disponible pour ce type d'éducation." 
              : "Vous n'avez pas encore embauché de précepteur de ce type."}
          </p>
          {!showAvailable && (
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => setShowAvailable(true)}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Rechercher des précepteurs
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPreceptors.map(preceptor => (
            <PreceptorCard
              key={preceptor.id}
              preceptor={preceptor}
              isHired={!showAvailable}
              onHire={() => hirePreceptor(preceptor.id)}
              onFire={() => firePreceptor(preceptor.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
