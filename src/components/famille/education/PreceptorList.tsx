
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Preceptor } from './types/educationTypes';
import { useEducation } from './context/EducationContext';
import { PreceptorCard } from './components/PreceptorCard';
import { toast } from 'sonner';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

interface PreceptorListProps {
  type?: string;
}

export const PreceptorList: React.FC<PreceptorListProps> = ({ type = 'all' }) => {
  const { preceptors, hiredPreceptors, loadPreceptorsByType, hirePreceptor, isLoading } = useEducation();
  const [searchParams] = useSearchParams();
  const childId = searchParams.get('childId');
  const navigate = useNavigate();
  
  const [filteredPreceptors, setFilteredPreceptors] = useState<Preceptor[]>([]);
  const [selectedEducationType, setSelectedEducationType] = useState(type !== 'all' ? type : '');
  
  useEffect(() => {
    if (type !== 'all' && type) {
      setSelectedEducationType(type);
      setFilteredPreceptors(loadPreceptorsByType(type));
    } else {
      setFilteredPreceptors(preceptors.filter(p => p.available));
    }
  }, [type, preceptors, loadPreceptorsByType]);
  
  // Handle filter change
  const handleFilterChange = (newType: string) => {
    setSelectedEducationType(newType);
    if (newType === '') {
      setFilteredPreceptors(preceptors.filter(p => p.available));
    } else {
      setFilteredPreceptors(loadPreceptorsByType(newType).filter(p => p.available));
    }
  };
  
  // Handle hiring a preceptor
  const handleHirePreceptor = (preceptorId: string) => {
    if (childId) {
      hirePreceptor(preceptorId, childId);
      
      // Redirect back to child detail if applicable
      toast.success("Précepteur embauché avec succès!");
      navigate(`/famille/education/child/${childId}`);
    } else {
      hirePreceptor(preceptorId);
      toast.success("Précepteur embauché avec succès!");
    }
  };
  
  // Calculate cost based on quality
  const getHireCost = (preceptor: Preceptor) => {
    const baseCost = preceptor.cost || preceptor.price || 1000;
    const quality = preceptor.quality || 3;
    
    return baseCost * (quality / 3);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant={selectedEducationType === '' ? 'default' : 'outline'}
          onClick={() => handleFilterChange('')}
          className="text-sm"
        >
          Tous
        </Button>
        <Button 
          variant={selectedEducationType === 'military' ? 'default' : 'outline'}
          onClick={() => handleFilterChange('military')}
          className="text-sm"
        >
          Militaire
        </Button>
        <Button 
          variant={selectedEducationType === 'rhetoric' ? 'default' : 'outline'}
          onClick={() => handleFilterChange('rhetoric')}
          className="text-sm"
        >
          Rhétorique
        </Button>
        <Button 
          variant={selectedEducationType === 'religious' ? 'default' : 'outline'}
          onClick={() => handleFilterChange('religious')}
          className="text-sm"
        >
          Religieuse
        </Button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : filteredPreceptors.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">
              Aucun précepteur disponible pour cette spécialité.
            </p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => handleFilterChange('')}
            >
              Voir tous les précepteurs
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPreceptors.map(preceptor => (
            <PreceptorCard
              key={preceptor.id}
              preceptor={preceptor}
              onHire={() => handleHirePreceptor(preceptor.id)}
              hireCost={getHireCost(preceptor)}
            />
          ))}
        </div>
      )}
      
      {hiredPreceptors && hiredPreceptors.length > 0 && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Précepteurs déjà embauchés</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {hiredPreceptors.map(preceptor => (
                <PreceptorCard
                  key={preceptor.id}
                  preceptor={preceptor}
                  hired={true}
                  onView={() => navigate(`/famille/education/preceptor/${preceptor.id}`)}
                  hireCost={0}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
