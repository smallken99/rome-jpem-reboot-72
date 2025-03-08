
import React from 'react';
import { SettingsForm } from './SettingsForm';

export const SettingsContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Paramètres du site</h2>
      </div>
      
      <SettingsForm />
    </div>
  );
};
