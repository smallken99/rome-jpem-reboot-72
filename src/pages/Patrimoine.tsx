
import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { PropertyManagement } from '@/components/proprietes/PropertyManagement';
import { ImpotsTab } from '@/components/economie/tabs/ImpotsTab';
import { RevenusTab } from '@/components/economie/tabs/RevenusTab';
import { DepensesTab } from '@/components/economie/tabs/DepensesTab';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { Building, Coins, Receipt, FileText } from 'lucide-react';

const PatrimoineMain = () => {
  return (
    <Layout>
      <PageHeader 
        title="Patrimoine" 
        subtitle="Gérez vos propriétés et finances familiales" 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Link to="/patrimoine/proprietes" className="roman-card hover:bg-rome-gold/5 transition-colors p-6 flex flex-col items-center text-center">
          <Building className="h-12 w-12 text-rome-terracotta mb-3" />
          <h3 className="font-cinzel text-lg mb-2">Propriétés</h3>
          <p className="text-sm text-muted-foreground">Gérez vos domaines urbains et ruraux</p>
        </Link>
        
        <Link to="/patrimoine/revenus" className="roman-card hover:bg-rome-gold/5 transition-colors p-6 flex flex-col items-center text-center">
          <Coins className="h-12 w-12 text-rome-terracotta mb-3" />
          <h3 className="font-cinzel text-lg mb-2">Revenus</h3>
          <p className="text-sm text-muted-foreground">Suivez l'ensemble des revenus de votre famille</p>
        </Link>
        
        <Link to="/patrimoine/depenses" className="roman-card hover:bg-rome-gold/5 transition-colors p-6 flex flex-col items-center text-center">
          <Receipt className="h-12 w-12 text-rome-terracotta mb-3" />
          <h3 className="font-cinzel text-lg mb-2">Dépenses</h3>
          <p className="text-sm text-muted-foreground">Contrôlez les dépenses et optimisez votre budget</p>
        </Link>
        
        <Link to="/patrimoine/impots" className="roman-card hover:bg-rome-gold/5 transition-colors p-6 flex flex-col items-center text-center">
          <FileText className="h-12 w-12 text-rome-terracotta mb-3" />
          <h3 className="font-cinzel text-lg mb-2">Impôts</h3>
          <p className="text-sm text-muted-foreground">Gérez vos obligations fiscales envers la République</p>
        </Link>
      </div>
      
      <PropertyManagement />
    </Layout>
  );
};

const Proprietes = () => {
  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <PageHeader 
          title="Propriétés"
          subtitle="Gérez vos domaines urbains et ruraux"
        />
        <ActionButton 
          label="Retour au patrimoine" 
          to="/patrimoine"
          variant="outline"
          icon={<ArrowLeft className="h-4 w-4" />}
        />
      </div>
      <PropertyManagement />
    </Layout>
  );
};

// Import nécessaire pour l'icône ArrowLeft
import { ArrowLeft } from 'lucide-react';

const Revenus = () => {
  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <PageHeader 
          title="Revenus"
          subtitle="Suivez l'ensemble des revenus de votre famille"
        />
        <ActionButton 
          label="Retour au patrimoine" 
          to="/patrimoine"
          variant="outline"
          icon={<ArrowLeft className="h-4 w-4" />}
        />
      </div>
      <div className="roman-card">
        <RevenusTab />
      </div>
    </Layout>
  );
};

const Depenses = () => {
  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <PageHeader 
          title="Dépenses"
          subtitle="Contrôlez les dépenses et optimisez votre budget"
        />
        <ActionButton 
          label="Retour au patrimoine" 
          to="/patrimoine"
          variant="outline"
          icon={<ArrowLeft className="h-4 w-4" />}
        />
      </div>
      <div className="roman-card">
        <DepensesTab />
      </div>
    </Layout>
  );
};

const Impots = () => {
  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <PageHeader 
          title="Impôts"
          subtitle="Gérez vos obligations fiscales envers la République"
        />
        <ActionButton 
          label="Retour au patrimoine" 
          to="/patrimoine"
          variant="outline"
          icon={<ArrowLeft className="h-4 w-4" />}
        />
      </div>
      <div className="roman-card">
        <ImpotsTab />
      </div>
    </Layout>
  );
};

const Patrimoine = () => {
  return (
    <Routes>
      <Route path="/" element={<PatrimoineMain />} />
      <Route path="/proprietes" element={<Proprietes />} />
      <Route path="/revenus" element={<Revenus />} />
      <Route path="/depenses" element={<Depenses />} />
      <Route path="/impots" element={<Impots />} />
      <Route path="*" element={<Navigate to="/patrimoine" replace />} />
    </Routes>
  );
};

export default Patrimoine;
