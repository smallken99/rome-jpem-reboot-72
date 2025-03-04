
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { FamilyTree } from '@/components/famille/FamilyTree';
import { MarriageAlliances } from '@/components/famille/MarriageAlliances';
import { Inheritance } from '@/components/famille/Inheritance';
import { Education } from '@/components/famille/Education';
import { CharacterSheet } from '@/components/famille/CharacterSheet';
import { StatBox } from '@/components/ui-custom/StatBox';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Heart, ScrollText, User } from 'lucide-react';
import { characters } from '@/data/characters';
import { useToast } from '@/components/ui/use-toast';

const Famille = () => {
  const [localCharacters, setLocalCharacters] = useState(characters);
  const [activeCharacter, setActiveCharacter] = useState(characters[0]);
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);
  const [portraitUrl, setPortraitUrl] = useState("");
  const { toast } = useToast();

  // Handler to update character portrait
  const handlePortraitChange = (characterId: string, newPortraitUrl: string) => {
    if (!newPortraitUrl.trim()) {
      toast({
        title: "URL invalide",
        description: "Veuillez saisir une URL d'image valide.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    // Update the local characters state
    const updatedCharacters = localCharacters.map(char => {
      if (char.id === characterId) {
        return {
          ...char,
          portrait: newPortraitUrl
        };
      }
      return char;
    });
    
    setLocalCharacters(updatedCharacters);
    
    // Show success toast
    toast({
      title: "Portrait mis à jour",
      description: "Le portrait du personnage a été changé avec succès.",
      duration: 3000,
    });
  };

  // Handler to open portrait edit dialog
  const handleEditPortrait = (characterId: string) => {
    setSelectedCharacterId(characterId);
    setPortraitUrl("");
  };

  return (
    <Layout>
      <PageHeader
        title="Famille"
        subtitle="Gérez votre dynastie et assurez l'avenir de votre Gens"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatBox 
          title="Membres de la famille" 
          value="12" 
          description="Membres directs et affiliés"
          icon={<Users className="h-6 w-6" />} 
        />
        <StatBox 
          title="Alliances matrimoniales" 
          value="4" 
          description="En augmentation ce semestre"
          icon={<Heart className="h-6 w-6" />} 
          trend="up"
          trendValue="+1"
        />
        <StatBox 
          title="Héritiers" 
          value="3" 
          description="Lignée directe masculine"
          icon={<ScrollText className="h-6 w-6" />} 
        />
      </div>

      <div className="mb-8">
        <Tabs defaultValue="characters" className="w-full">
          <TabsList className="mb-4 bg-white border border-rome-gold/30">
            <TabsTrigger value="characters" className="data-[state=active]:bg-rome-gold/10">
              <User className="h-4 w-4 mr-2" /> Personnages
            </TabsTrigger>
            <TabsTrigger value="family-tree" className="data-[state=active]:bg-rome-gold/10">
              <Users className="h-4 w-4 mr-2" /> Arbre Généalogique
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="characters" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {localCharacters.map((character) => (
                <CharacterSheet 
                  key={character.id}
                  character={character} 
                  className={activeCharacter.id === character.id ? 'border-rome-gold' : ''}
                  onEditPortrait={handleEditPortrait}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="family-tree">
            <RomanCard className="mb-8">
              <RomanCard.Header>
                <h3 className="font-cinzel text-lg text-rome-navy">Arbre Généalogique</h3>
              </RomanCard.Header>
              <RomanCard.Content>
                <FamilyTree />
              </RomanCard.Content>
            </RomanCard>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog 
        open={!!selectedCharacterId} 
        onOpenChange={(open) => {
          if (!open) setSelectedCharacterId(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Changer le portrait</DialogTitle>
            <DialogDescription>
              Entrez l'URL d'une image pour modifier le portrait du personnage.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="portrait-url" className="text-sm">URL de l'image</label>
              <Input 
                id="portrait-url" 
                placeholder="https://exemple.com/image.jpg" 
                value={portraitUrl}
                onChange={(e) => setPortraitUrl(e.target.value)}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => setSelectedCharacterId(null)}
              >
                Annuler
              </Button>
              <Button 
                onClick={() => {
                  if (selectedCharacterId) {
                    handlePortraitChange(selectedCharacterId, portraitUrl);
                    setSelectedCharacterId(null);
                  }
                }}
              >
                Enregistrer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <RomanCard className="h-full">
          <RomanCard.Header>
            <h3 className="font-cinzel text-lg text-rome-navy">Mariages et Alliances</h3>
          </RomanCard.Header>
          <RomanCard.Content>
            <MarriageAlliances />
          </RomanCard.Content>
        </RomanCard>
        
        <RomanCard className="h-full">
          <RomanCard.Header>
            <h3 className="font-cinzel text-lg text-rome-navy">Héritage et Testaments</h3>
          </RomanCard.Header>
          <RomanCard.Content>
            <Inheritance />
          </RomanCard.Content>
        </RomanCard>
      </div>

      <RomanCard className="mb-6">
        <RomanCard.Header>
          <h3 className="font-cinzel text-lg text-rome-navy">Éducation des Enfants</h3>
        </RomanCard.Header>
        <RomanCard.Content>
          <Education />
        </RomanCard.Content>
      </RomanCard>
    </Layout>
  );
};

export default Famille;
