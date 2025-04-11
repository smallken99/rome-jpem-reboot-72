
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { FamilyTreeNode } from './tree/FamilyTreeNode';
import { FamilyControls } from './tree/FamilyControls';
import { useCharacters } from './hooks/useCharacters';
import { getFamilyMembers } from './tree/familyHelpers';
import { AddFamilyMemberDialog } from './tree/AddFamilyMemberDialog';
import { Character } from '@/types/character';

export const FamilyTree: React.FC = () => {
  const navigate = useNavigate();
  const { localCharacters, addCharacter } = useCharacters();
  const [showAddMemberDialog, setShowAddMemberDialog] = useState(false);
  
  const { paterFamilias, materFamilias, children } = getFamilyMembers(localCharacters);
  
  const handleAddMember = () => {
    setShowAddMemberDialog(true);
  };
  
  const onAddFamilyMember = (newMember: Partial<Character>) => {
    // Ensure the new member has the required stats structure
    const memberWithStats = {
      ...newMember,
      name: newMember.name || '',
      stats: {
        popularity: newMember.stats?.popularity || 0,
        oratory: newMember.stats?.oratory || 0,
        piety: newMember.stats?.piety || 0,
        martialEducation: newMember.stats?.martialEducation || 0
      }
    };
    
    addCharacter(memberWithStats as any);
    setShowAddMemberDialog(false);
  };
  
  return (
    <Layout>
      <PageHeader 
        title="Arbre Généalogique" 
        subtitle="Visualisez les liens entre les membres de votre famille"
      />
      
      <div className="mb-6">
        <Button variant="outline" onClick={() => navigate('/famille')}>
          Retour au menu
        </Button>
      </div>
      
      <FamilyControls onAddMember={handleAddMember} />
      
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center">
            <div className="mb-12 flex justify-center gap-24">
              {paterFamilias && (
                <FamilyTreeNode 
                  character={paterFamilias} 
                  relationLabel="Pater Familias"
                />
              )}
              
              {materFamilias && (
                <FamilyTreeNode 
                  character={materFamilias} 
                  relationLabel="Mater Familias"
                />
              )}
            </div>
            
            {children.length > 0 && (
              <div className="relative">
                <div className="absolute top-0 left-1/2 w-0.5 h-8 bg-gray-300 -translate-x-1/2"></div>
                <div className="pt-8 flex flex-wrap justify-center gap-8">
                  {children.map(child => (
                    <FamilyTreeNode 
                      key={child.id} 
                      character={child} 
                      relationLabel={child.gender === 'male' ? 'Fils' : 'Fille'}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {localCharacters.length === 0 && (
              <div className="py-12 text-center text-muted-foreground">
                <p>Aucun membre familial trouvé.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={handleAddMember}
                >
                  Ajouter un membre
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <AddFamilyMemberDialog
        isOpen={showAddMemberDialog}
        onClose={() => setShowAddMemberDialog(false)}
        onAdd={onAddFamilyMember}
        existingMembers={localCharacters}
      />
    </Layout>
  );
};
