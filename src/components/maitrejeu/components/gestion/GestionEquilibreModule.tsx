
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { useMaitreJeu } from '../../context';
import { EquilibreActions } from '../../equilibre/EquilibreActions';
import { SocialTensions } from '../equilibre/SocialTensions';
import { PoliticalStability } from '../equilibre/PoliticalStability';
import { ReligiousClimate } from '../equilibre/ReligiousClimate';
import { EconomicConditions } from '../equilibre/EconomicConditions';
import { EquilibreOverview } from '../equilibre/EquilibreOverview';
import { useToast } from '@/components/ui/use-toast';

export const GestionEquilibreModule = () => {
  const { equilibre, updateEquilibre, setEquilibre } = useMaitreJeu();
  const [activeTab, setActiveTab] = useState('apercu');
  const { toast } = useToast();
  
  const [socialValues, setSocialValues] = useState({
    patricians: equilibre?.social?.patriciens || 50,
    plebeians: equilibre?.social?.plebeiens || 50,
    slaves: equilibre?.social?.esclaves || 30,
    cohesion: equilibre?.social?.cohesion || 45
  });
  
  const [politicalValues, setPoliticalValues] = useState({
    popularesInfluence: equilibre?.politique?.populaires || 33,
    optimatesInfluence: equilibre?.politique?.optimates || 33,
    moderatesInfluence: equilibre?.politique?.moderates || 34,
    senateAuthority: equilibre?.stabilite?.senat || 50,
    plebeianTribunes: equilibre?.stabilite?.tribuns || 50,
    lawsRespect: equilibre?.stabilite?.lois || 50
  });
  
  const [religiousValues, setReligiousValues] = useState({
    piety: equilibre?.religion?.piete || 50,
    traditions: equilibre?.religion?.traditions || 60,
    superstition: equilibre?.religion?.superstition || 40
  });
  
  const [economicValues, setEconomicValues] = useState({
    stability: equilibre?.economie?.stabilite || 50,
    growth: equilibre?.economie?.croissance || 50,
    commerce: equilibre?.economie?.commerce || 50,
    agriculture: equilibre?.economie?.agriculture || 50
  });
  
  // Mettre à jour l'état local lorsque l'équilibre global change
  useEffect(() => {
    if (equilibre) {
      setSocialValues({
        patricians: equilibre.social?.patriciens || 50,
        plebeians: equilibre.social?.plebeiens || 50,
        slaves: equilibre.social?.esclaves || 30,
        cohesion: equilibre.social?.cohesion || 45
      });
      
      setPoliticalValues({
        popularesInfluence: equilibre.politique?.populaires || 33,
        optimatesInfluence: equilibre.politique?.optimates || 33,
        moderatesInfluence: equilibre.politique?.moderates || 34,
        senateAuthority: equilibre.stabilite?.senat || 50,
        plebeianTribunes: equilibre.stabilite?.tribuns || 50,
        lawsRespect: equilibre.stabilite?.lois || 50
      });
      
      setReligiousValues({
        piety: equilibre.religion?.piete || 50,
        traditions: equilibre.religion?.traditions || 60,
        superstition: equilibre.religion?.superstition || 40
      });
      
      setEconomicValues({
        stability: equilibre.economie?.stabilite || 50,
        growth: equilibre.economie?.croissance || 50,
        commerce: equilibre.economie?.commerce || 50,
        agriculture: equilibre.economie?.agriculture || 50
      });
    }
  }, [equilibre]);
  
  // Gérer les changements dans les tensions sociales
  const handleSocialChange = (key: string, value: number) => {
    setSocialValues(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  // Gérer les changements dans la stabilité politique
  const handlePoliticalChange = (key: string, value: number) => {
    setPoliticalValues(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  // Gérer les changements dans le climat religieux
  const handleReligiousChange = (key: string, value: number) => {
    setReligiousValues(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  // Gérer les changements dans les conditions économiques
  const handleEconomicChange = (key: string, value: number) => {
    setEconomicValues(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  // Appliquer les changements aux équilibres
  const applyChanges = () => {
    if (!equilibre) return;
    
    const updatedEquilibre = {
      ...equilibre,
      social: {
        patriciens: socialValues.patricians,
        plebeiens: socialValues.plebeians,
        esclaves: socialValues.slaves,
        cohesion: socialValues.cohesion
      },
      politique: {
        populaires: politicalValues.popularesInfluence,
        optimates: politicalValues.optimatesInfluence,
        moderates: politicalValues.moderatesInfluence
      },
      stabilite: {
        senat: politicalValues.senateAuthority,
        tribuns: politicalValues.plebeianTribunes,
        lois: politicalValues.lawsRespect
      },
      religion: {
        piete: religiousValues.piety,
        traditions: religiousValues.traditions,
        superstition: religiousValues.superstition
      },
      economie: {
        stabilite: economicValues.stability,
        croissance: economicValues.growth,
        commerce: economicValues.commerce,
        agriculture: economicValues.agriculture
      }
    };
    
    setEquilibre(updatedEquilibre);
    toast({
      title: "Équilibres mis à jour",
      description: "Les nouveaux équilibres ont été appliqués et auront des effets sur la République."
    });
  };
  
  // Gérer les actions d'équilibrage
  const handleEquilibreAction = (actionType: string, intensity: number) => {
    if (!equilibre) return;
    
    const randomFactor = 0.7 + Math.random() * 0.6; // 0.7 to 1.3
    const calculatedIntensity = intensity * randomFactor;
    
    let updatedEquilibre = { ...equilibre };
    
    switch (actionType) {
      case 'boost_economy':
        updatedEquilibre = {
          ...updatedEquilibre,
          economie: {
            ...updatedEquilibre.economie,
            croissance: Math.min(100, (updatedEquilibre.economie?.croissance || 50) + calculatedIntensity * 1.5),
            commerce: Math.min(100, (updatedEquilibre.economie?.commerce || 50) + calculatedIntensity)
          },
          risques: [
            ...(updatedEquilibre.risques || []),
            {
              id: Date.now().toString(),
              type: 'ECONOMIC',
              name: 'Inflation',
              probability: calculatedIntensity / 2,
              severity: calculatedIntensity / 3,
              description: "L'augmentation des dépenses pourrait provoquer de l'inflation"
            }
          ]
        };
        break;
        
      case 'economic_austerity':
        updatedEquilibre = {
          ...updatedEquilibre,
          economie: {
            ...updatedEquilibre.economie,
            stabilite: Math.min(100, (updatedEquilibre.economie?.stabilite || 50) + calculatedIntensity),
            croissance: Math.max(0, (updatedEquilibre.economie?.croissance || 50) - calculatedIntensity)
          },
          social: {
            ...updatedEquilibre.social,
            cohesion: Math.max(0, (updatedEquilibre.social?.cohesion || 50) - calculatedIntensity / 2),
            plebeiens: Math.max(0, (updatedEquilibre.social?.plebeiens || 50) - calculatedIntensity / 1.5)
          },
          risques: [
            ...(updatedEquilibre.risques || []),
            {
              id: Date.now().toString(),
              type: 'SOCIAL',
              name: 'Mécontentement populaire',
              probability: calculatedIntensity * 0.7,
              severity: calculatedIntensity / 2,
              description: "Les mesures d'austérité provoquent un mécontentement chez les plébéiens"
            }
          ]
        };
        break;
        
      case 'emergency_measures':
        updatedEquilibre = {
          ...updatedEquilibre,
          stabilite: {
            ...updatedEquilibre.stabilite,
            senat: Math.min(100, (updatedEquilibre.stabilite?.senat || 50) + calculatedIntensity * 2),
            lois: Math.min(100, (updatedEquilibre.stabilite?.lois || 50) + calculatedIntensity)
          },
          social: {
            ...updatedEquilibre.social,
            cohesion: Math.min(100, (updatedEquilibre.social?.cohesion || 50) + calculatedIntensity / 2)
          },
          risques: [
            ...(updatedEquilibre.risques || []),
            {
              id: Date.now().toString(),
              type: 'POLITICAL',
              name: 'Abus de pouvoir',
              probability: calculatedIntensity * 0.8,
              severity: calculatedIntensity,
              description: "L'utilisation de pouvoirs d'urgence pourrait créer un précédent dangereux"
            }
          ]
        };
        break;
        
      case 'social_reforms':
        updatedEquilibre = {
          ...updatedEquilibre,
          social: {
            ...updatedEquilibre.social,
            plebeiens: Math.min(100, (updatedEquilibre.social?.plebeiens || 50) + calculatedIntensity),
            cohesion: Math.min(100, (updatedEquilibre.social?.cohesion || 50) + calculatedIntensity / 2)
          },
          politique: {
            ...updatedEquilibre.politique,
            populaires: Math.min(100, (updatedEquilibre.politique?.populaires || 33) + calculatedIntensity / 2),
            optimates: Math.max(0, (updatedEquilibre.politique?.optimates || 33) - calculatedIntensity / 3)
          },
          risques: [
            ...(updatedEquilibre.risques || []),
            {
              id: Date.now().toString(),
              type: 'POLITICAL',
              name: 'Opposition aristocratique',
              probability: calculatedIntensity * 0.6,
              severity: calculatedIntensity / 2,
              description: "Les réformes sociales mécontentent l'aristocratie conservatrice"
            }
          ]
        };
        break;
        
      case 'conservative_laws':
        updatedEquilibre = {
          ...updatedEquilibre,
          social: {
            ...updatedEquilibre.social,
            patriciens: Math.min(100, (updatedEquilibre.social?.patriciens || 50) + calculatedIntensity),
            plebeiens: Math.max(0, (updatedEquilibre.social?.plebeiens || 50) - calculatedIntensity / 2)
          },
          politique: {
            ...updatedEquilibre.politique,
            optimates: Math.min(100, (updatedEquilibre.politique?.optimates || 33) + calculatedIntensity / 2),
            populaires: Math.max(0, (updatedEquilibre.politique?.populaires || 33) - calculatedIntensity / 3)
          },
          religion: {
            ...updatedEquilibre.religion,
            traditions: Math.min(100, (updatedEquilibre.religion?.traditions || 50) + calculatedIntensity / 2)
          },
          risques: [
            ...(updatedEquilibre.risques || []),
            {
              id: Date.now().toString(),
              type: 'SOCIAL',
              name: 'Agitation plébéienne',
              probability: calculatedIntensity * 0.6,
              severity: calculatedIntensity / 2,
              description: "Les lois conservatrices mécontentent les couches populaires"
            }
          ]
        };
        break;
        
      case 'political_concessions':
        updatedEquilibre = {
          ...updatedEquilibre,
          politique: {
            ...updatedEquilibre.politique,
            moderates: Math.min(100, (updatedEquilibre.politique?.moderates || 34) + calculatedIntensity / 2)
          },
          stabilite: {
            ...updatedEquilibre.stabilite,
            senat: Math.min(100, (updatedEquilibre.stabilite?.senat || 50) + calculatedIntensity / 3),
            lois: Math.min(100, (updatedEquilibre.stabilite?.lois || 50) + calculatedIntensity / 4)
          },
          risques: [
            ...(updatedEquilibre.risques || []),
            {
              id: Date.now().toString(),
              type: 'POLITICAL',
              name: 'Compromis politique',
              probability: calculatedIntensity * 0.5,
              severity: calculatedIntensity / 4,
              description: "Les concessions politiques peuvent affaiblir votre position personnelle"
            }
          ]
        };
        break;
        
      case 'neutral_balance':
        // Ajuster légèrement tous les équilibres vers le centre (50)
        const adjustTowardsMiddle = (value: number | undefined) => {
          if (!value && value !== 0) return 50;
          return value > 50 ? Math.max(50, value - calculatedIntensity / 3) : Math.min(50, value + calculatedIntensity / 3);
        };
        
        updatedEquilibre = {
          ...updatedEquilibre,
          economie: {
            stabilite: adjustTowardsMiddle(updatedEquilibre.economie?.stabilite || 50),
            croissance: adjustTowardsMiddle(updatedEquilibre.economie?.croissance || 50),
            commerce: adjustTowardsMiddle(updatedEquilibre.economie?.commerce || 50),
            agriculture: adjustTowardsMiddle(updatedEquilibre.economie?.agriculture || 50)
          },
          social: {
            patriciens: adjustTowardsMiddle(updatedEquilibre.social?.patriciens || 50),
            plebeiens: adjustTowardsMiddle(updatedEquilibre.social?.plebeiens || 50),
            esclaves: adjustTowardsMiddle(updatedEquilibre.social?.esclaves || 30),
            cohesion: adjustTowardsMiddle(updatedEquilibre.social?.cohesion || 50)
          },
          politique: {
            populaires: 33 + (calculatedIntensity / 10),
            optimates: 33 + (calculatedIntensity / 10),
            moderates: 34 - (calculatedIntensity / 5)
          }
        };
        break;
        
      default:
        break;
    }
    
    setEquilibre(updatedEquilibre);
    toast({
      title: "Action d'équilibrage appliquée",
      description: `L'action "${actionType}" a été appliquée avec une intensité de ${Math.round(calculatedIntensity)}%.`
    });
  };
  
  // Si pas d'équilibre disponible, afficher un message de chargement
  if (!equilibre) {
    return <div>Chargement des équilibres...</div>;
  }
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <EquilibreOverview equilibre={equilibre} />
        
        <Card>
          <CardHeader>
            <CardTitle>Actions disponibles</CardTitle>
          </CardHeader>
          <CardContent>
            <EquilibreActions onApplyAction={handleEquilibreAction} />
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Gestion des Équilibres</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="social">Social</TabsTrigger>
              <TabsTrigger value="politique">Politique</TabsTrigger>
              <TabsTrigger value="religieux">Religieux</TabsTrigger>
              <TabsTrigger value="economique">Économique</TabsTrigger>
            </TabsList>
            
            <TabsContent value="social">
              <SocialTensions 
                values={socialValues}
                onChange={handleSocialChange}
              />
            </TabsContent>
            
            <TabsContent value="politique">
              <PoliticalStability 
                values={politicalValues}
                onChange={handlePoliticalChange}
              />
            </TabsContent>
            
            <TabsContent value="religieux">
              <ReligiousClimate 
                values={religiousValues}
                onChange={handleReligiousChange}
              />
            </TabsContent>
            
            <TabsContent value="economique">
              <EconomicConditions 
                values={economicValues}
                onChange={handleEconomicChange}
              />
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 flex justify-end">
            <Button onClick={applyChanges}>
              Appliquer les changements
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
