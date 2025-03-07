
import React, { useEffect } from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { PropertyManagement } from '@/components/proprietes/PropertyManagement';
import { ImpotsTab } from '@/components/economie/tabs/ImpotsTab';
import { RevenusTab } from '@/components/economie/tabs/RevenusTab';
import { DepensesTab } from '@/components/economie/tabs/DepensesTab';
import { ActionButton } from '@/components/ui-custom/ActionButton';
import { Building, Coins, Receipt, FileText, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const PatrimoineMain = () => {
  const handleCardClick = (section: string) => {
    toast.info(`Navigation vers la section ${section}`);
  };

  return (
    <Layout>
      <PageHeader 
        title="Patrimoine" 
        subtitle="Gérez vos propriétés et finances familiales" 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Link 
          to="/patrimoine/proprietes" 
          className="roman-card hover:bg-rome-gold/5 transition-colors p-6 flex flex-col items-center text-center"
          onClick={() => handleCardClick('Propriétés')}
        >
          <Building className="h-12 w-12 text-rome-terracotta mb-3" />
          <h3 className="font-cinzel text-lg mb-2">Propriétés</h3>
          <p className="text-sm text-muted-foreground">Gérez vos domaines urbains et ruraux</p>
        </Link>
        
        <Link 
          to="/patrimoine/revenus" 
          className="roman-card hover:bg-rome-gold/5 transition-colors p-6 flex flex-col items-center text-center"
          onClick={() => handleCardClick('Revenus')}
        >
          <Coins className="h-12 w-12 text-rome-terracotta mb-3" />
          <h3 className="font-cinzel text-lg mb-2">Revenus</h3>
          <p className="text-sm text-muted-foreground">Suivez l'ensemble des revenus de votre famille</p>
        </Link>
        
        <Link 
          to="/patrimoine/depenses" 
          className="roman-card hover:bg-rome-gold/5 transition-colors p-6 flex flex-col items-center text-center"
          onClick={() => handleCardClick('Dépenses')}
        >
          <Receipt className="h-12 w-12 text-rome-terracotta mb-3" />
          <h3 className="font-cinzel text-lg mb-2">Dépenses</h3>
          <p className="text-sm text-muted-foreground">Contrôlez les dépenses et optimisez votre budget</p>
        </Link>
        
        <Link 
          to="/patrimoine/impots" 
          className="roman-card hover:bg-rome-gold/5 transition-colors p-6 flex flex-col items-center text-center"
          onClick={() => handleCardClick('Impôts')}
        >
          <FileText className="h-12 w-12 text-rome-terracotta mb-3" />
          <h3 className="font-cinzel text-lg mb-2">Impôts</h3>
          <p className="text-sm text-muted-foreground">Gérez vos obligations fiscales envers la République</p>
        </Link>
      </div>
      
      <PropertyManagement />
    </Layout>
  );
};

// Factorisons les éléments communs des sous-pages
const PatrimoineSubPage = ({ 
  title,
  subtitle,
  children
}: { 
  title: string, 
  subtitle: string, 
  children: React.ReactNode 
}) => {
  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <PageHeader 
          title={title}
          subtitle={subtitle}
        />
        <ActionButton 
          label="Retour au patrimoine" 
          to="/patrimoine"
          variant="outline"
          icon={<ArrowLeft className="h-4 w-4" />}
        />
      </div>
      {children}
    </Layout>
  );
};

const Proprietes = () => {
  return (
    <PatrimoineSubPage
      title="Propriétés"
      subtitle="Gérez vos domaines urbains et ruraux"
    >
      <PropertyManagement />
    </PatrimoineSubPage>
  );
};

const Revenus = () => {
  return (
    <PatrimoineSubPage
      title="Revenus"
      subtitle="Suivez l'ensemble des revenus de votre famille"
    >
      <div className="roman-card">
        <RevenusTab />
      </div>
    </PatrimoineSubPage>
  );
};

const Depenses = () => {
  return (
    <PatrimoineSubPage
      title="Dépenses"
      subtitle="Contrôlez les dépenses et optimisez votre budget"
    >
      <div className="roman-card">
        <DepensesTab />
      </div>
    </PatrimoineSubPage>
  );
};

const Impots = () => {
  return (
    <PatrimoineSubPage
      title="Impôts"
      subtitle="Gérez vos obligations fiscales envers la République"
    >
      <div className="roman-card">
        <ImpotsTab />
      </div>
    </PatrimoineSubPage>
  );
};

const Patrimoine = () => {
  const location = useLocation();
  
  // Extraction du hash de l'URL pour la gestion des onglets
  useEffect(() => {
    if (location.hash) {
      const hash = location.hash.replace('#', '');
      // Sélectionne automatiquement l'onglet correspondant si on est sur la page propriétés
      if (location.pathname.includes('/proprietes')) {
        setTimeout(() => {
          const tabElement = document.querySelector(`[value="${hash}"]`) as HTMLElement;
          if (tabElement) tabElement.click();
        }, 100);
      }
    }
  }, [location]);

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
