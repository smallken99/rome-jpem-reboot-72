
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { PreceptorCard } from '../PreceptorCard';
import { useEducation } from '../context/EducationContext';
import { UsersIcon, Search, Plus } from 'lucide-react';
import { Preceptor } from '../types/educationTypes';
import { useNavigate } from 'react-router-dom';

export const PreceptorsTab: React.FC = () => {
  const { preceptors, hirePreceptor, firePreceptor } = useEducation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('');
  const navigate = useNavigate();
  
  // Filtrer les précepteurs
  const filteredPreceptors = preceptors.filter(preceptor => {
    // Filtrer par terme de recherche
    if (searchTerm && !preceptor.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Filtrer par type
    if (filterType && !preceptor.specialties.includes(filterType)) {
      return false;
    }
    
    return true;
  });
  
  // Précepteurs engagés
  const hiredPreceptors = filteredPreceptors.filter(p => !p.available);
  
  // Précepteurs disponibles
  const availablePreceptors = filteredPreceptors.filter(p => p.available);
  
  // Gérer le recrutement
  const handleHire = (preceptorId: string) => {
    hirePreceptor(preceptorId, "");
  };
  
  // Gérer le licenciement
  const handleFire = (preceptorId: string) => {
    firePreceptor(preceptorId);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Précepteurs</h2>
        <Button 
          variant="outline" 
          className="gap-2"
          onClick={() => navigate('/famille/education/hire-preceptor')}
        >
          <Plus className="h-4 w-4" />
          Rechercher des précepteurs
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Label>Rechercher par nom</Label>
          <div className="relative">
            <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Nom du précepteur..." 
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="w-full md:w-1/3">
          <Label>Filtrer par spécialité</Label>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger>
              <SelectValue placeholder="Toutes les spécialités" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Toutes</SelectItem>
              <SelectItem value="militaire">Militaire</SelectItem>
              <SelectItem value="politique">Politique</SelectItem>
              <SelectItem value="rhétorique">Rhétorique</SelectItem>
              <SelectItem value="arts">Arts</SelectItem>
              <SelectItem value="philosophie">Philosophie</SelectItem>
              <SelectItem value="religieuse">Religieuse</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Précepteurs engagés */}
      {hiredPreceptors.length > 0 && (
        <div className="space-y-4">
          <div className="flex gap-2 items-center">
            <UsersIcon className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-medium">Précepteurs engagés ({hiredPreceptors.length})</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hiredPreceptors.map(preceptor => (
              <PreceptorCard 
                key={preceptor.id}
                preceptor={preceptor}
                isHired={true}
                onFire={handleFire}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Précepteurs disponibles */}
      {availablePreceptors.length > 0 && (
        <div className="space-y-4">
          <div className="flex gap-2 items-center">
            <UsersIcon className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-medium">Précepteurs disponibles ({availablePreceptors.length})</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availablePreceptors.map(preceptor => (
              <PreceptorCard 
                key={preceptor.id}
                preceptor={preceptor}
                onHire={handleHire}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Aucun précepteur trouvé */}
      {filteredPreceptors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            Aucun précepteur trouvé avec ces critères.
          </p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              setSearchTerm('');
              setFilterType('');
            }}
          >
            Réinitialiser les filtres
          </Button>
        </div>
      )}
    </div>
  );
};
