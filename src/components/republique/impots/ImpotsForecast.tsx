
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const ImpotsForecast: React.FC = () => {
  // Données prévisionnelles des impôts pour l'année
  const data = [
    { mois: 'Jan', tributum: 42000, portorium: 35000, scriptura: 18000, vicesima: 25000, soli: 40000 },
    { mois: 'Fév', tributum: 40000, portorium: 32000, scriptura: 16000, vicesima: 22000, soli: 38000 },
    { mois: 'Mar', tributum: 45000, portorium: 38000, scriptura: 20000, vicesima: 26000, soli: 42000 },
    { mois: 'Avr', tributum: 50000, portorium: 40000, scriptura: 22000, vicesima: 28000, soli: 45000 },
    { mois: 'Mai', tributum: 48000, portorium: 42000, scriptura: 25000, vicesima: 30000, soli: 50000 },
    { mois: 'Juin', tributum: 52000, portorium: 45000, scriptura: 24000, vicesima: 32000, soli: 48000 },
    { mois: 'Juil', tributum: 55000, portorium: 48000, scriptura: 26000, vicesima: 35000, soli: 52000 },
    { mois: 'Aoû', tributum: 58000, portorium: 50000, scriptura: 28000, vicesima: 38000, soli: 55000 },
    { mois: 'Sep', tributum: 60000, portorium: 52000, scriptura: 30000, vicesima: 40000, soli: 58000 },
    { mois: 'Oct', tributum: 62000, portorium: 55000, scriptura: 32000, vicesima: 42000, soli: 60000 },
    { mois: 'Nov', tributum: 65000, portorium: 58000, scriptura: 35000, vicesima: 45000, soli: 63000 },
    { mois: 'Déc', tributum: 70000, portorium: 62000, scriptura: 38000, vicesima: 48000, soli: 65000 },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Prévisions Annuelles</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Estimation des revenus fiscaux pour l'année en cours, basée sur les tendances et données historiques.
        </p>
      </div>
      
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
            <XAxis dataKey="mois" />
            <YAxis />
            <Tooltip formatter={(value) => `${value} As`} />
            <Legend />
            <Bar dataKey="tributum" name="Tributum" fill="#8884d8" />
            <Bar dataKey="portorium" name="Portorium" fill="#82ca9d" />
            <Bar dataKey="scriptura" name="Scriptura" fill="#ffc658" />
            <Bar dataKey="vicesima" name="Vicesima" fill="#ff8042" />
            <Bar dataKey="soli" name="Tributum Soli" fill="#8dd1e1" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-white p-4 rounded-md border border-rome-gold/30">
          <h4 className="font-cinzel text-base mb-2">Tendances Fiscales</h4>
          <p className="text-sm text-muted-foreground">
            Les revenus des impôts devraient augmenter de 8% cette année, principalement grâce aux nouvelles provinces annexées
            et à l'augmentation du commerce maritime.
          </p>
        </div>
        <div className="bg-white p-4 rounded-md border border-rome-gold/30">
          <h4 className="font-cinzel text-base mb-2">Recommandations</h4>
          <p className="text-sm text-muted-foreground">
            Une légère augmentation du portorium pourrait générer des revenus supplémentaires significatifs sans impacter
            négativement le commerce.
          </p>
        </div>
      </div>
    </div>
  );
};
