
import React from 'react';
import { Link } from 'react-router-dom';
import { Laurels } from '@/components/ui-custom/Laurels';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-rome-parchment">
      <div className="max-w-md w-full text-center roman-card p-8">
        <h1 className="text-5xl font-cinzel font-bold text-rome-terracotta mb-4">CDIV</h1>
        <Laurels>
          <h2 className="text-2xl font-cinzel text-rome-navy">Page Non Trouvée</h2>
        </Laurels>
        
        <p className="my-6 text-muted-foreground">
          Le Sénat romain n'a pas connaissance de cette adresse. Veuillez retourner sur la Via Appia.
        </p>
        
        <Link to="/" className="roman-btn inline-block">
          Retourner au Forum
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
