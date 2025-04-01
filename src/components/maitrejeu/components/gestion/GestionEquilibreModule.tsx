
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie, Cell } from 'recharts';
import { useEquilibre } from '@/hooks/useEquilibre';
import { EquilibreActions } from '@/components/maitrejeu/equilibre/EquilibreActions';
import { EquilibreEffects } from '@/components/maitrejeu/equilibre/EquilibreEffects';
import { useEconomy } from '@/hooks/useEconomy';
import { toast } from 'sonner';
import { 
  Landmark, 
  LineChart, 
  Shield, 
  TrendingUp, 
  Users,
  BookOpen,
  BadgePercent
} from 'lucide-react';

export const GestionEquilibreModule: React.FC = () => {
  const { 
    equilibre, 
    impactLog,
    updatePoliticalBalance, 
    updateSocialBalance, 
    updateEconomicBalance, 
    updateMilitaryBalance, 
    updateReligiousBalance,
    updateEquilibre 
  } = useEquilibre();
  const { makePayment } = useEconomy();
  const [activeTab, setActiveTab] = useState('politique');

  // Fonction pour gérer les actions d'équilibre qui coûtent de l'argent
  const handleEquilibreAction = (actionType: string, cost: number) => {
    // Effectuer le paiement
    const paymentSuccess = makePayment(cost, "Trésor public", "Actions politiques", `Action d'équilibre: ${actionType}`);
    
    if (!paymentSuccess) {
      toast.error("Fonds insuffisants pour cette action");
      return;
    }
    
    // Appliquer les effets de l'action sur l'équilibre
    switch (actionType) {
      case 'subsidize_plebs':
        updateEquilibre({
          social: {
            ...equilibre.social,
            cohesion: Math.min(100, (equilibre.social.cohesion || 50) + 10)
          },
          politique: {
            ...equilibre.politique,
            populaires: Math.min(100, equilibre.politique.populaires + 5),
            optimates: Math.max(0, equilibre.politique.optimates - 2),
            moderates: equilibre.politique.moderates - 3
          }
        }, 'plebs_subsidy');
        toast.success("Subventions distribuées à la plèbe");
        break;
        
      case 'military_parade':
        updateEquilibre({
          militaire: {
            ...equilibre.militaire,
            moral: Math.min(100, equilibre.militaire.moral + 8),
            discipline: Math.min(100, equilibre.militaire.discipline + 5)
          },
          politique: {
            ...equilibre.politique,
            optimates: Math.min(100, equilibre.politique.optimates + 3),
            populaires: Math.max(0, equilibre.politique.populaires - 1),
            moderates: equilibre.politique.moderates - 2
          }
        }, 'military_parade');
        toast.success("Parade militaire organisée avec succès");
        break;
        
      case 'temple_donation':
        updateEquilibre({
          religion: {
            ...equilibre.religion,
            piete: Math.min(100, equilibre.religion.piete + 15),
            superstition: Math.max(0, equilibre.religion.superstition - 5)
          }
        }, 'temple_donation');
        toast.success("Donation aux temples effectuée");
        break;
        
      case 'trade_incentives':
        updateEquilibre({
          economie: {
            ...equilibre.economie,
            commerce: Math.min(100, equilibre.economie.commerce + 12),
            croissance: Math.min(100, equilibre.economie.croissance + 5),
            stabilite: Math.min(100, equilibre.economie.stabilite + 3)
          }
        }, 'trade_incentives');
        toast.success("Incitations commerciales mises en place");
        break;
        
      case 'reconciliation_meeting':
        updateEquilibre({
          politique: {
            ...equilibre.politique,
            moderates: Math.min(100, equilibre.politique.moderates + 7),
            populaires: Math.max(0, equilibre.politique.populaires - 3),
            optimates: Math.max(0, equilibre.politique.optimates - 4)
          },
          social: {
            ...equilibre.social,
            cohesion: Math.min(100, (equilibre.social.cohesion || 50) + 5)
          }
        }, 'reconciliation_meeting');
        toast.success("Réunion de réconciliation organisée");
        break;
        
      default:
        toast.error("Action non reconnue");
    }
  };

  // Préparation des données pour les graphiques
  const politiqueData = [
    { name: 'Populares', value: equilibre.politique.populaires, color: '#ef4444' },
    { name: 'Optimates', value: equilibre.politique.optimates, color: '#3b82f6' },
    { name: 'Modérés', value: equilibre.politique.moderates, color: '#84cc16' }
  ];
  
  const economieData = [
    { name: 'Stabilité', value: equilibre.economie.stabilite, color: '#0ea5e9' },
    { name: 'Croissance', value: equilibre.economie.croissance, color: '#84cc16' },
    { name: 'Commerce', value: equilibre.economie.commerce, color: '#f59e0b' },
    { name: 'Agriculture', value: equilibre.economie.agriculture, color: '#22c55e' }
  ];
  
  const militaireData = [
    { name: 'Moral', value: equilibre.militaire.moral, color: '#8b5cf6' },
    { name: 'Effectifs', value: equilibre.militaire.effectifs, color: '#ef4444' },
    { name: 'Équipement', value: equilibre.militaire.equipement, color: '#f59e0b' },
    { name: 'Discipline', value: equilibre.militaire.discipline, color: '#0ea5e9' }
  ];
  
  const socialData = [
    { name: 'Patriciens', value: equilibre.social.patriciens, fill: '#8b5cf6' },
    { name: 'Plébéiens', value: equilibre.social.plebeiens, fill: '#f59e0b' }
  ];
  
  const religionData = [
    { name: 'Piété', value: equilibre.religion.piete, color: '#ec4899' },
    { name: 'Traditions', value: equilibre.religion.traditions, color: '#8b5cf6' },
    { name: 'Superstition', value: equilibre.religion.superstition, color: '#f59e0b' }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Équilibre de la République</CardTitle>
          <CardDescription>
            Gérez les différentes forces qui façonnent Rome
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-5">
              <TabsTrigger value="politique">
                <Users className="h-4 w-4 mr-2" />
                Politique
              </TabsTrigger>
              <TabsTrigger value="economie">
                <TrendingUp className="h-4 w-4 mr-2" />
                Économie
              </TabsTrigger>
              <TabsTrigger value="social">
                <Landmark className="h-4 w-4 mr-2" />
                Social
              </TabsTrigger>
              <TabsTrigger value="militaire">
                <Shield className="h-4 w-4 mr-2" />
                Militaire
              </TabsTrigger>
              <TabsTrigger value="religion">
                <BookOpen className="h-4 w-4 mr-2" />
                Religion
              </TabsTrigger>
            </TabsList>
            
            {/* Politique Tab */}
            <TabsContent value="politique">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4">Équilibre des factions politiques</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={politiqueData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {politiqueData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, '']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-4">Ajuster l'équilibre politique</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-1">
                        <label>Populares</label>
                        <span>{equilibre.politique.populaires}%</span>
                      </div>
                      <Slider 
                        defaultValue={[equilibre.politique.populaires]} 
                        max={100} 
                        step={1}
                        onValueChange={([value]) => {
                          const diff = value - equilibre.politique.populaires;
                          const optimatesChange = Math.round(diff * 0.6);
                          const moderatesChange = diff - optimatesChange;
                          
                          updatePoliticalBalance(
                            value,
                            Math.max(0, Math.min(100, equilibre.politique.optimates - optimatesChange)),
                            Math.max(0, Math.min(100, equilibre.politique.moderates - moderatesChange))
                          );
                        }}
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <label>Optimates</label>
                        <span>{equilibre.politique.optimates}%</span>
                      </div>
                      <Slider 
                        defaultValue={[equilibre.politique.optimates]} 
                        max={100} 
                        step={1}
                        onValueChange={([value]) => {
                          const diff = value - equilibre.politique.optimates;
                          const populairesChange = Math.round(diff * 0.6);
                          const moderatesChange = diff - populairesChange;
                          
                          updatePoliticalBalance(
                            Math.max(0, Math.min(100, equilibre.politique.populaires - populairesChange)),
                            value,
                            Math.max(0, Math.min(100, equilibre.politique.moderates - moderatesChange))
                          );
                        }}
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <label>Modérés</label>
                        <span>{equilibre.politique.moderates}%</span>
                      </div>
                      <Slider 
                        defaultValue={[equilibre.politique.moderates]} 
                        max={100} 
                        step={1}
                        onValueChange={([value]) => {
                          const diff = value - equilibre.politique.moderates;
                          const populairesChange = Math.round(diff * 0.5);
                          const optimatesChange = diff - populairesChange;
                          
                          updatePoliticalBalance(
                            Math.max(0, Math.min(100, equilibre.politique.populaires - populairesChange)),
                            Math.max(0, Math.min(100, equilibre.politique.optimates - optimatesChange)),
                            value
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Économie Tab */}
            <TabsContent value="economie">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4">Indices économiques</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={economieData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value}%`, '']} />
                        <Bar dataKey="value" fill="#8884d8">
                          {economieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-4">Ajuster les facteurs économiques</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <label>Stabilité économique</label>
                        <span>{equilibre.economie.stabilite}%</span>
                      </div>
                      <Slider 
                        defaultValue={[equilibre.economie.stabilite]} 
                        max={100} 
                        step={1}
                        onValueChange={([value]) => {
                          updateEconomicBalance(
                            value,
                            equilibre.economie.croissance,
                            equilibre.economie.commerce,
                            equilibre.economie.agriculture
                          );
                        }}
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <label>Croissance</label>
                        <span>{equilibre.economie.croissance}%</span>
                      </div>
                      <Slider 
                        defaultValue={[equilibre.economie.croissance]} 
                        max={100} 
                        step={1}
                        onValueChange={([value]) => {
                          updateEconomicBalance(
                            equilibre.economie.stabilite,
                            value,
                            equilibre.economie.commerce,
                            equilibre.economie.agriculture
                          );
                        }}
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <label>Commerce</label>
                        <span>{equilibre.economie.commerce}%</span>
                      </div>
                      <Slider 
                        defaultValue={[equilibre.economie.commerce]} 
                        max={100} 
                        step={1}
                        onValueChange={([value]) => {
                          updateEconomicBalance(
                            equilibre.economie.stabilite,
                            equilibre.economie.croissance,
                            value,
                            equilibre.economie.agriculture
                          );
                        }}
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <label>Agriculture</label>
                        <span>{equilibre.economie.agriculture}%</span>
                      </div>
                      <Slider 
                        defaultValue={[equilibre.economie.agriculture]} 
                        max={100} 
                        step={1}
                        onValueChange={([value]) => {
                          updateEconomicBalance(
                            equilibre.economie.stabilite,
                            equilibre.economie.croissance,
                            equilibre.economie.commerce,
                            value
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Social Tab */}
            <TabsContent value="social">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4">Structure Sociale</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={socialData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {socialData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, '']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between mb-1">
                      <label>Cohésion sociale</label>
                      <span>{equilibre.social.cohesion || 50}%</span>
                    </div>
                    <Slider 
                      defaultValue={[equilibre.social.cohesion || 50]} 
                      max={100} 
                      step={1}
                      onValueChange={([value]) => {
                        updateSocialBalance(
                          equilibre.social.patriciens,
                          equilibre.social.plebeiens,
                          equilibre.social.esclaves,
                          value
                        );
                      }}
                    />
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-4">Ajuster l'équilibre social</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-1">
                        <label>Patriciens</label>
                        <span>{equilibre.social.patriciens}%</span>
                      </div>
                      <Slider 
                        defaultValue={[equilibre.social.patriciens]} 
                        max={100} 
                        step={1}
                        onValueChange={([value]) => {
                          updateSocialBalance(
                            value,
                            100 - value,
                            equilibre.social.esclaves,
                            equilibre.social.cohesion
                          );
                        }}
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <label>Plébéiens</label>
                        <span>{equilibre.social.plebeiens}%</span>
                      </div>
                      <Slider 
                        defaultValue={[equilibre.social.plebeiens]} 
                        max={100} 
                        step={1}
                        onValueChange={([value]) => {
                          updateSocialBalance(
                            100 - value,
                            value,
                            equilibre.social.esclaves,
                            equilibre.social.cohesion
                          );
                        }}
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <label>Esclaves (proportion de la population)</label>
                        <span>{equilibre.social.esclaves || 0}%</span>
                      </div>
                      <Slider 
                        defaultValue={[equilibre.social.esclaves || 0]} 
                        max={100} 
                        step={1}
                        onValueChange={([value]) => {
                          updateSocialBalance(
                            equilibre.social.patriciens,
                            equilibre.social.plebeiens,
                            value,
                            equilibre.social.cohesion
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Militaire Tab */}
            <TabsContent value="militaire">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4">Forces militaires</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={militaireData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value}%`, '']} />
                        <Bar dataKey="value" fill="#8884d8">
                          {militaireData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-4">Ajuster les forces militaires</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <label>Moral des troupes</label>
                        <span>{equilibre.militaire.moral}%</span>
                      </div>
                      <Slider 
                        defaultValue={[equilibre.militaire.moral]} 
                        max={100} 
                        step={1}
                        onValueChange={([value]) => {
                          updateMilitaryBalance(
                            value,
                            equilibre.militaire.effectifs,
                            equilibre.militaire.equipement,
                            equilibre.militaire.discipline
                          );
                        }}
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <label>Effectifs</label>
                        <span>{equilibre.militaire.effectifs}%</span>
                      </div>
                      <Slider 
                        defaultValue={[equilibre.militaire.effectifs]} 
                        max={100} 
                        step={1}
                        onValueChange={([value]) => {
                          updateMilitaryBalance(
                            equilibre.militaire.moral,
                            value,
                            equilibre.militaire.equipement,
                            equilibre.militaire.discipline
                          );
                        }}
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <label>Équipement</label>
                        <span>{equilibre.militaire.equipement}%</span>
                      </div>
                      <Slider 
                        defaultValue={[equilibre.militaire.equipement]} 
                        max={100} 
                        step={1}
                        onValueChange={([value]) => {
                          updateMilitaryBalance(
                            equilibre.militaire.moral,
                            equilibre.militaire.effectifs,
                            value,
                            equilibre.militaire.discipline
                          );
                        }}
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <label>Discipline</label>
                        <span>{equilibre.militaire.discipline}%</span>
                      </div>
                      <Slider 
                        defaultValue={[equilibre.militaire.discipline]} 
                        max={100} 
                        step={1}
                        onValueChange={([value]) => {
                          updateMilitaryBalance(
                            equilibre.militaire.moral,
                            equilibre.militaire.effectifs,
                            equilibre.militaire.equipement,
                            value
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Religion Tab */}
            <TabsContent value="religion">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4">Facteurs religieux</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={religionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value}%`, '']} />
                        <Bar dataKey="value" fill="#8884d8">
                          {religionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-4">Ajuster les facteurs religieux</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <label>Piété</label>
                        <span>{equilibre.religion.piete}%</span>
                      </div>
                      <Slider 
                        defaultValue={[equilibre.religion.piete]} 
                        max={100} 
                        step={1}
                        onValueChange={([value]) => {
                          updateReligiousBalance(
                            value,
                            equilibre.religion.traditions,
                            equilibre.religion.superstition
                          );
                        }}
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <label>Traditions</label>
                        <span>{equilibre.religion.traditions}%</span>
                      </div>
                      <Slider 
                        defaultValue={[equilibre.religion.traditions]} 
                        max={100} 
                        step={1}
                        onValueChange={([value]) => {
                          updateReligiousBalance(
                            equilibre.religion.piete,
                            value,
                            equilibre.religion.superstition
                          );
                        }}
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <label>Superstition</label>
                        <span>{equilibre.religion.superstition}%</span>
                      </div>
                      <Slider 
                        defaultValue={[equilibre.religion.superstition]} 
                        max={100} 
                        step={1}
                        onValueChange={([value]) => {
                          updateReligiousBalance(
                            equilibre.religion.piete,
                            equilibre.religion.traditions,
                            value
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Actions d'équilibre</CardTitle>
            <CardDescription>
              Influencez l'équilibre de la République par des actions concrètes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EquilibreActions 
              equilibre={equilibre} 
              onAction={handleEquilibreAction} 
            />
          </CardContent>
        </Card>
        
        <EquilibreEffects 
          equilibre={equilibre} 
          impactLog={impactLog} 
        />
      </div>
    </div>
  );
};
