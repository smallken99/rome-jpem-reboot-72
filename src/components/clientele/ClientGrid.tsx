
import React from 'react';
import { ClientCard, Client } from './ClientCard';

interface ClientGridProps {
  clients: Client[];
}

export const ClientGrid: React.FC<ClientGridProps> = ({ clients }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients.map(client => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
      
      {clients.length === 0 && (
        <div className="text-center py-10 bg-white/80 rounded-md border border-rome-gold/30">
          <p className="text-muted-foreground">Aucun client ne correspond à votre recherche.</p>
        </div>
      )}
    </>
  );
};
