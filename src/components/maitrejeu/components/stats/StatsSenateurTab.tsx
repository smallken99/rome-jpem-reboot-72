import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMaitreJeu } from '../../context';
import { Progress } from "@/components/ui/progress"
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const StatsSenateurTab: React.FC = () => {
  const { senateurs } = useMaitreJeu();
  
  // Corriger les filtres pour utiliser statut et appartenance au lieu de tendance
  const patriciens = senateurs.filter(s => s.statut === "Patricien").length;
  const plébéiens = senateurs.filter(s => s.statut === "Plébéien").length;
  const joueursActifs = senateurs.filter(s => s.joueur).length;
  
  const optimates = senateurs.filter(s => s.appartenance === "Optimates").length;
  const populares = senateurs.filter(s => s.appartenance === "Populares").length;
  const modérés = senateurs.filter(s => s.appartenance === "Modéré").length;
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Origine Sociale</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Patriciens', value: patriciens, fill: '#1e3a8a' },
                      { name: 'Plébéiens', value: plébéiens, fill: '#7c3a31' },
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    <Cell key="cell-0" fill="#1e3a8a" />
                    <Cell key="cell-1" fill="#7c3a31" />
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value} sénateurs`, `${name}`]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sénateurs Actifs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Actifs', value: joueursActifs, fill: '#4ade80' },
                      { name: 'Inactifs', value: senateurs.length - joueursActifs, fill: '#fca5a5' },
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    <Cell key="cell-0" fill="#4ade80" />
                    <Cell key="cell-1" fill="#fca5a5" />
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value} sénateurs`, `${name}`]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Appartenance Politique</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Optimates', value: optimates, fill: '#3b82f6' },
                      { name: 'Populares', value: populares, fill: '#ef4444' },
                      { name: 'Modérés', value: modérés, fill: '#a3a3a3' },
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    <Cell key="cell-0" fill="#3b82f6" />
                    <Cell key="cell-1" fill="#ef4444" />
                    <Cell key="cell-2" fill="#a3a3a3" />
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value} sénateurs`, `${name}`]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Analyse des Tendances</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Équilibre des factions au Sénat:</p>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <h4 className="font-medium text-blue-600">Optimates</h4>
              <Progress value={optimates / senateurs.length * 100} className="h-2 bg-slate-200 mt-1" />
              <p className="text-sm mt-1">{Math.round(optimates / senateurs.length * 100)}% du Sénat</p>
            </div>
            <div>
              <h4 className="font-medium text-red-600">Populares</h4>
              <Progress value={populares / senateurs.length * 100} className="h-2 bg-slate-200 mt-1" />
              <p className="text-sm mt-1">{Math.round(populares / senateurs.length * 100)}% du Sénat</p>
            </div>
            <div>
              <h4 className="font-medium text-slate-600">Modérés</h4>
              <Progress value={modérés / senateurs.length * 100} className="h-2 bg-slate-200 mt-1" />
              <p className="text-sm mt-1">{Math.round(modérés / senateurs.length * 100)}% du Sénat</p>
            </div>
          </div>
          
          <p className="mb-2">Analyse générale:</p>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>La faction dominante est <span className="font-medium">{
              optimates > populares && optimates > modérés ? 'Optimates' : 
              populares > optimates && populares > modérés ? 'Populares' : 'Modérés'
            }</span></li>
            <li>Il y a {senateurs.filter(s => s.joueur && s.appartenance === "Optimates").length} joueurs Optimates et {
              senateurs.filter(s => s.joueur && s.appartenance === "Populares").length
            } joueurs Populares</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
