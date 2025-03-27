
import React from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { useCharacters } from '../hooks/useCharacters';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ChildList } from './components/ChildList';
import { EducationIntro } from './components/EducationIntro';
import { EducationProvider } from './context/EducationContext';

export const FamilyEducation: React.FC = () => {
  const { localCharacters, updateCharacter } = useCharacters();
  const navigate = useNavigate();
  
  // Filtrer les personnages qui sont enfants (fils ou fille)
  const children = localCharacters.filter(c => 
    c.relation.includes('Fils') || 
    c.relation.includes('Fille')
  );
  
  const handleCharacterUpdate = (characterId: string, updates: Partial<Character>) => {
    updateCharacter(characterId, updates);
  };
  
  return (
    <Layout>
      <PageHeader 
        title="Éducation Familiale"
        subtitle="Formez la prochaine génération de votre famille"
      />
      
      <div className="mb-6">
        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={() => navigate('/famille')}>
            Retour au menu
          </Button>
        </div>
      </div>
      
      <EducationProvider 
        characters={localCharacters}
        onCharacterUpdate={handleCharacterUpdate}
      >
        <EducationIntro />
        
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Enfants à Éduquer</h2>
          {children.length > 0 ? (
            <ChildList children={children} />
          ) : (
            <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-600">
                Aucun enfant n'est actuellement disponible pour l'éducation.
              </p>
              <Button 
                variant="outline" 
                className="mt-4" 
                onClick={() => navigate('/famille/alliances')}
              >
                Établir une alliance matrimoniale
              </Button>
            </div>
          )}
        </div>
      </EducationProvider>
    </Layout>
  );
};
