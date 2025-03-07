
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Laurels } from '@/components/ui-custom/Laurels';

const RegisterHeader = () => {
  return (
    <>
      <div className="mb-6">
        <Link to="/welcome" className="inline-flex items-center text-rome-navy hover:text-rome-terracotta transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à l'accueil
        </Link>
      </div>
      
      <div className="text-center mb-6">
        <Laurels className="text-rome-navy mb-4">ROME JPEM</Laurels>
        <h1 className="text-2xl font-cinzel text-rome-navy">Créer un Compte</h1>
      </div>
    </>
  );
};

export default RegisterHeader;
