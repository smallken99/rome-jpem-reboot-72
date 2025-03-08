
import React from 'react';
import { WebsiteVisitsCard } from './WebsiteVisitsCard';
import { ServerUsageCard } from './ServerUsageCard';

export const DashboardSection: React.FC = () => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <WebsiteVisitsCard />
      <ServerUsageCard />
    </div>
  );
};
