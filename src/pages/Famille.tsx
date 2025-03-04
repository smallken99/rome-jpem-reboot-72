
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
import ChildEducationDetail from '@/components/famille/education/ChildEducationDetail';
import { AllianceManagement } from '@/components/famille/alliances/AllianceManagement';
import { PreceptorDetail } from '@/components/famille/education/PreceptorDetail';
import { InheritanceDetails } from '@/components/famille/inheritance/InheritanceDetails';
import { DowryManagement } from '@/components/famille/inheritance/DowryManagement';

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

const AllianceManagementPage = () => {
  return (
    <Layout>
      <PageHeader 
        title="Gestion d'Alliance Matrimoniale"
        subtitle="Négociez les termes et la dot pour une alliance bénéfique"
      />
      <div className="roman-card">
        <AllianceManagement />
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

const ChildEducationDetailPage = () => {
  return (
    <Layout>
      <PageHeader 
        title="Détail de l'Éducation"
        subtitle="Configurer l'éducation d'un enfant"
      />
      <div className="roman-card">
        <ChildEducationDetail />
      </div>
    </Layout>
  );
};

const PreceptorDetailPage = () => {
  return (
    <Layout>
      <PageHeader 
        title="Détail du Précepteur"
        subtitle="Informations et embauche d'un précepteur"
      />
      <div className="roman-card">
        <PreceptorDetail />
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

const InheritanceDetailsPage = () => {
  return (
    <Layout>
      <PageHeader 
        title="Détails du Testament"
        subtitle="Définir les termes du testament pour un héritier"
      />
      <div className="roman-card">
        <InheritanceDetails />
      </div>
    </Layout>
  );
};

const DowryManagementPage = () => {
  return (
    <Layout>
      <PageHeader 
        title="Gestion de la Dot"
        subtitle="Définir la dot pour un mariage avantageux"
      />
      <div className="roman-card">
        <DowryManagement />
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
      <Route path="/alliances/manage/:femaleId" element={<AllianceManagementPage />} />
      <Route path="/education" element={<EducationPage />} />
      <Route path="/education/child/:childId" element={<ChildEducationDetailPage />} />
      <Route path="/education/preceptors" element={<EducationPage />} />
      <Route path="/education/preceptors/:preceptorId" element={<PreceptorDetailPage />} />
      <Route path="/heritage" element={<Heritage />} />
      <Route path="/heritage/heir/:heirId" element={<InheritanceDetailsPage />} />
      <Route path="/heritage/dowry/:femaleId" element={<DowryManagementPage />} />
      <Route path="*" element={<Navigate to="/famille" replace />} />
    </Routes>
  );
};

export default Famille;
