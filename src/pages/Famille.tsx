
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { FamilySections } from '@/components/famille/sections/FamilySections';
import { CharacterSelection } from '@/components/famille/character/CharacterSelection';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { FamilyTree } from '@/components/famille/FamilyTree';
import { MarriageAlliances } from '@/components/famille/MarriageAlliances';
import { Education } from '@/components/famille/Education';
import { Inheritance } from '@/components/famille/Inheritance';
import { characters } from '@/data/characters';

const FamilleMain = () => {
  const [localCharacters, setLocalCharacters] = React.useState(characters);

  const handleChildBirth = (child: any) => {
    setLocalCharacters(prev => [...prev, child]);
  };

  const handleNameChange = (characterId: string, newName: string) => {
    setLocalCharacters(prev => 
      prev.map(char => 
        char.id === characterId ? { ...char, name: newName } : char
      )
    );
  };

  return (
    <Layout>
      <PageHeader 
        title="Famille"
        subtitle="Gérez les membres de votre famille, les alliances et l'héritage"
      />
      
      <CharacterSelection 
        localCharacters={localCharacters}
        onNameChange={handleNameChange}
      />
      
      <FamilySections 
        characters={localCharacters}
        onChildBirth={handleChildBirth}
        onNameChange={handleNameChange}
      />
    </Layout>
  );
};

const ArbreGenealogique = () => {
  return (
    <Layout>
      <PageHeader 
        title="Arbre Généalogique"
        subtitle="Visualisez les liens familiaux et l'histoire de votre lignée"
      />
      <div className="roman-card">
        <FamilyTree characters={characters} />
      </div>
    </Layout>
  );
};

const Alliances = () => {
  return (
    <Layout>
      <PageHeader 
        title="Alliances Matrimoniales"
        subtitle="Gérez les alliances avec d'autres familles"
      />
      <div className="roman-card">
        <MarriageAlliances characters={characters} />
      </div>
    </Layout>
  );
};

const EducationPage = () => {
  return (
    <Layout>
      <PageHeader 
        title="Éducation des Enfants"
        subtitle="Dirigez l'éducation de la prochaine génération"
      />
      <div className="roman-card">
        <Education characters={characters} />
      </div>
    </Layout>
  );
};

const Heritage = () => {
  return (
    <Layout>
      <PageHeader 
        title="Héritage et Testaments"
        subtitle="Gérez la succession et la transmission du patrimoine"
      />
      <div className="roman-card">
        <Inheritance />
      </div>
    </Layout>
  );
};

const Famille = () => {
  return (
    <Routes>
      <Route path="/" element={<FamilleMain />} />
      <Route path="/arbre" element={<ArbreGenealogique />} />
      <Route path="/alliances" element={<Alliances />} />
      <Route path="/education" element={<EducationPage />} />
      <Route path="/heritage" element={<Heritage />} />
      <Route path="*" element={<Navigate to="/famille" replace />} />
    </Routes>
  );
};

export default Famille;
