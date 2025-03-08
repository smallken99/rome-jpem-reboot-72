
import React from 'react';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { AdminTabs } from '@/components/admin/AdminTabs';

const Admin = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Administration" 
        subtitle="Panneau d'administration du site web" 
      />
      
      <AdminTabs />
    </div>
  );
};

export default Admin;
