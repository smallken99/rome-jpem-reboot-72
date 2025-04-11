
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useCharacters } from './hooks/useCharacters';
import { findHeir } from './tree/familyHelpers';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Character } from '@/types/character';
import { toast } from 'sonner';
import { InheritanceDistribution } from './inheritance/InheritanceDistribution';
import { SuccessionRules } from './inheritance/SuccessionRules';

export const Inheritance: React.FC = () => {
  const navigate = useNavigate();
  const { localCharacters, updateCharacter } = useCharacters();
  
  // Trouver le chef de famille
  const paterFamilias = localCharacters.find(c => c.isHeadOfFamily);
  // Trouver l'héritier présomptif
  const heir = findHeir(localCharacters);
  
  const [selectedHeirId, setSelectedHeirId] = useState<string | undefined>(heir?.id);
  const [testamentaryWishes, setTestamentaryWishes] = useState<string>(
    paterFamilias?.testamentaryWishes || ''
  );
  
  // Filtrer les membres adultes qui peuvent être héritiers
  const potentialHeirs = localCharacters.filter(
    c => c.gender === 'male' && c.age >= 16 && c.id !== paterFamilias?.id
  );
  
  const handleSaveTestament = () => {
    if (!paterFamilias) return;
    
    // Mettre à jour les souhaits testamentaires
    const updatedPaterFamilias = {
      ...paterFamilias,
      testamentaryWishes
    };
    updateCharacter(updatedPaterFamilias);
    
    // Si un héritier est sélectionné, le désigner
    if (selectedHeirId) {
      const previousHeir = localCharacters.find(c => c.id === heir?.id);
      
      // Retirer le statut d'héritier au précédent
      if (previousHeir && previousHeir.id !== selectedHeirId) {
        const updatedPreviousHeir = {
          ...previousHeir,
          role: previousHeir.role?.replace('héritier', '').trim() || 'Fils'
        };
        updateCharacter(updatedPreviousHeir);
      }
      
      // Désigner le nouvel héritier
      const newHeir = localCharacters.find(c => c.id === selectedHeirId);
      if (newHeir) {
        const updatedNewHeir = {
          ...newHeir,
          role: newHeir.role?.includes('héritier') 
            ? newHeir.role 
            : `${newHeir.role || 'Fils'} (héritier)`
        };
        updateCharacter(updatedNewHeir);
      }
    }
    
    toast.success("Testament et succession mis à jour");
  };
  
  // Données fictives pour la répartition des biens
  const estateDistribution = [
    { name: 'Terres', value: 60 },
    { name: 'Propriétés', value: 20 },
    { name: 'Or et bijoux', value: 15 },
    { name: 'Mobilier', value: 5 }
  ];
  
  return (
    <Layout>
      <PageHeader 
        title="Héritage et Succession" 
        subtitle="Planifiez la transmission de votre patrimoine et assurez l'avenir de votre famille"
      />
      
      <div className="mb-6">
        <Button variant="outline" onClick={() => navigate('/famille')}>
          Retour au menu
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Testament</CardTitle>
              <CardDescription>
                Exprimez vos dernières volontés et désignez vos héritiers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {paterFamilias ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="heir">Désignation de l'héritier principal</Label>
                    <Select 
                      value={selectedHeirId} 
                      onValueChange={setSelectedHeirId}
                    >
                      <SelectTrigger id="heir">
                        <SelectValue placeholder="Sélectionner un héritier" />
                      </SelectTrigger>
                      <SelectContent>
                        {potentialHeirs.map(heir => (
                          <SelectItem key={heir.id} value={heir.id}>
                            {heir.name} ({heir.age} ans)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {potentialHeirs.length === 0 && (
                      <p className="text-sm text-muted-foreground">
                        Aucun héritier potentiel disponible. Vous devez avoir au moins un fils adulte.
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="wishes">Dernières volontés</Label>
                    <Textarea
                      id="wishes"
                      placeholder="Rédigez vos dernières volontés et la répartition de vos biens..."
                      value={testamentaryWishes}
                      onChange={e => setTestamentaryWishes(e.target.value)}
                      rows={5}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={handleSaveTestament}>
                      Enregistrer le testament
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Vous devez être le chef de famille pour rédiger un testament.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div>
          <SuccessionRules />
        </div>
      </div>
      
      <InheritanceDistribution distribution={estateDistribution} />
    </Layout>
  );
};
