
import React from 'react';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import Layout from '@/components/layout/Layout';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { PropertyRoutes } from '@/components/proprietes/routes/PropertyRoutes';
import { EconomieTabs } from '@/components/economie/EconomieTabs';
import { PropertyMap } from '@/components/proprietes/PropertyMap';
import { StorageManagement } from '@/components/proprietes/StorageManagement';
import { TaxationManagement } from '@/components/proprietes/taxation/TaxationManagement';
import { LoansManagement } from '@/components/proprietes/finances/LoansManagement';
import { PatrimoineOverview } from '@/components/proprietes/overview/PatrimoineOverview';
import { SectionNavigation, NavigationItem } from '@/components/ui-custom/SectionNavigation';
import { Building, MapPin, Wallet, Archive, Calculator, Coins, BarChart } from 'lucide-react';

const PatrimoineNavigation: React.FC = () => {
  const navigationItems: NavigationItem[] = [
    { label: "Vue d'ensemble", path: "/patrimoine/apercu", icon: <BarChart className="h-4 w-4" /> },
    { label: "Propriétés", path: "/patrimoine/proprietes", icon: <Building className="h-4 w-4" /> },
    { label: "Carte", path: "/patrimoine/carte", icon: <MapPin className="h-4 w-4" /> },
    { label: "Économie", path: "/patrimoine/economie", icon: <Wallet className="h-4 w-4" /> },
    { label: "Stockage", path: "/patrimoine/stockage", icon: <Archive className="h-4 w-4" /> },
    { label: "Impôts", path: "/patrimoine/impots", icon: <Calculator className="h-4 w-4" /> },
    { label: "Prêts", path: "/patrimoine/prets", icon: <Coins className="h-4 w-4" /> },
  ];
  
  return <SectionNavigation items={navigationItems} />;
};

const Patrimoine: React.FC = () => {
  const location = useLocation();
  
  // Déterminer le titre et sous-titre en fonction de la route active
  const getHeaderContent = () => {
    if (location.pathname.includes('/apercu')) {
      return {
        title: "Vue d'ensemble du patrimoine",
        subtitle: "Aperçu global de vos possessions et finances"
      };
    } else if (location.pathname.includes('/proprietes')) {
      // Si c'est un détail de propriété (contient un ID après /proprietes/)
      if (location.pathname.match(/\/proprietes\/\d+/)) {
        return {
          title: "Détail de la propriété",
          subtitle: "Informations et gestion d'une propriété spécifique"
        };
      }
      return {
        title: "Propriétés",
        subtitle: "Gestion détaillée des propriétés"
      };
    } else if (location.pathname.includes('/carte')) {
      return {
        title: "Carte des propriétés",
        subtitle: "Visualisation géographique de vos propriétés"
      };
    } else if (location.pathname.includes('/economie')) {
      return {
        title: "Économie",
        subtitle: "Gestion financière et économique"
      };
    } else if (location.pathname.includes('/stockage')) {
      return {
        title: "Stockage",
        subtitle: "Gestion des stocks et des ressources"
      };
    } else if (location.pathname.includes('/impots')) {
      return {
        title: "Impôts et Taxes",
        subtitle: "Gestion des taxes dues à la République"
      };
    } else if (location.pathname.includes('/prets')) {
      return {
        title: "Prêts et Dettes",
        subtitle: "Gestion des prêts accordés et des dettes contractées"
      };
    } else {
      return {
        title: "Patrimoine",
        subtitle: "Gestion des propriétés et des ressources"
      };
    }
  };
  
  const headerContent = getHeaderContent();
  
  return (
    <Layout>
      <PageHeader 
        title={headerContent.title} 
        subtitle={headerContent.subtitle} 
      />
      
      <PatrimoineNavigation />
      
      <Routes>
        <Route path="/" element={<Navigate to="/patrimoine/apercu" replace />} />
        
        <Route path="/apercu" element={
          <div className="roman-card">
            <PatrimoineOverview />
          </div>
        } />
        
        <Route path="/proprietes/*" element={
          <div className="roman-card">
            <PropertyRoutes />
          </div>
        } />
        
        <Route path="/carte" element={
          <div className="roman-card">
            <PropertyMap />
          </div>
        } />
        
        <Route path="/economie" element={
          <div className="roman-card">
            <EconomieTabs />
          </div>
        } />
        
        <Route path="/stockage" element={
          <div className="roman-card">
            <StorageManagement />
          </div>
        } />
        
        <Route path="/impots" element={
          <div className="roman-card">
            <TaxationManagement />
          </div>
        } />
        
        <Route path="/prets" element={
          <div className="roman-card">
            <LoansManagement />
          </div>
        } />
        
        <Route path="*" element={<Navigate to="/patrimoine" replace />} />
      </Routes>
    </Layout>
  );
};

export default Patrimoine;
