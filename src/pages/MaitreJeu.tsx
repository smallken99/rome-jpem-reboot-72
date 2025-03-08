
import React, { useState } from 'react';
import { MaitreJeuProvider } from '@/components/maitrejeu/context/MaitreJeuContext';
import { MaitreJeuLayout } from '@/components/maitrejeu/layout/MaitreJeuLayout';

const MaitreJeu = () => {
  const [activeTab, setActiveTab] = useState('senateurs');

  return (
    <MaitreJeuProvider>
      <MaitreJeuLayout 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </MaitreJeuProvider>
  );
};

export default MaitreJeu;
