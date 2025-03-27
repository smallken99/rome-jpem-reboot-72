
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCharacters } from '../hooks/useCharacters';
import { EducationProvider } from './context/EducationContext';

export const ChildEducationDetail: React.FC = () => {
  const { childId } = useParams<{ childId: string }>();
  const navigate = useNavigate();
  const { localCharacters, updateCharacter } = useCharacters();
  const [child, setChild] = useState<any>(null);
  
  useEffect(() => {
    if (childId) {
      const foundChild = localCharacters.find(c => c.id === childId);
      if (foundChild) {
        setChild(foundChild);
      } else {
        navigate('/famille/education');
      }
    }
  }, [childId, localCharacters, navigate]);
  
  if (!child) {
    return <p>Chargement...</p>;
  }
  
  const handleStartEducation = (type: string) => {
    updateCharacter(child.id, {
      education: {
        type,
        specialties: [],
        mentor: null
      }
    });
    navigate('/famille/education');
  };
  
  return (
    <Layout>
      <PageHeader 
        title={`Éducation de ${child.name}`}
        subtitle={`Plan d'éducation personnalisé pour un enfant de ${child.age} ans`}
      />
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Options d'Éducation</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Sélectionnez un type d'éducation pour {child.name}</p>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Button onClick={() => handleStartEducation('military')} disabled={child.gender === 'female'}>
              Éducation Militaire
            </Button>
            <Button onClick={() => handleStartEducation('rhetoric')}>
              Rhétorique
            </Button>
            <Button onClick={() => handleStartEducation('religious')}>
              Formation Religieuse
            </Button>
            <Button onClick={() => handleStartEducation('academic')}>
              Études Académiques
            </Button>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};
