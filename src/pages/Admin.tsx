
import React from 'react';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { AdminTabs } from '@/components/admin/AdminTabs';
import Layout from '@/components/layout/Layout';

const Admin = () => {
  return (
    <Layout>
      <PageHeader 
        title="Administration" 
        subtitle="Panneau d'administration du site de Rome JPem" 
      />
      
      <div className="roman-card">
        <AdminTabs />
      </div>
    </Layout>
  );
};

export default Admin;
