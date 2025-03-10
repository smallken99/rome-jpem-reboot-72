
import React from 'react';
import { GestionSenateurs } from '../GestionSenateurs';
import { GestionProvinces } from '../GestionProvinces';
import { GestionPolitique } from '../GestionPolitique';
import { GestionEquilibre } from '../GestionEquilibre';
import { GestionHistoire } from '../GestionHistoire';
import { GestionClients } from '../GestionClients';
import { GestionEconomie } from '../GestionEconomie';
import { GestionFamilles } from '../GestionFamilles';

interface MaitreJeuContentProps {
  activeTab: string;
}

export const MaitreJeuContent: React.FC<MaitreJeuContentProps> = ({ activeTab }) => {
  // Rendu conditionnel en fonction de l'onglet actif
  return (
    <div className="bg-background border rounded-lg shadow">
      {activeTab === 'senateurs' && <GestionSenateurs />}
      {activeTab === 'provinces' && <GestionProvinces />}
      {activeTab === 'politique' && <GestionPolitique />}
      {activeTab === 'equilibre' && <GestionEquilibre />}
      {activeTab === 'histoire' && <GestionHistoire />}
      {activeTab === 'clients' && <GestionClients />}
      {activeTab === 'economie' && <GestionEconomie />}
      {activeTab === 'familles' && <GestionFamilles />}
    </div>
  );
};
