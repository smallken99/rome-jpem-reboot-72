
import { BuildingDescription } from './types/buildingTypes';

export const availableBuildings: BuildingDescription[] = [
  // Propriétés urbaines
  {
    id: 'insula_1',
    name: "Insula du Forum",
    description: "Immeuble d'habitation urbain situé près du Forum, loué à plusieurs familles plébéiennes",
    type: 'urban',
    initialCost: 15000,
    maintenanceCost: 1200,
    slaves: {
      required: 2,
      optimal: 5
    },
    prestige: 1,
    income: 2000,
    advantages: [
      "Revenu locatif stable",
      "Proche du centre-ville",
      "Bonne visibilité sociale"
    ]
  },
  {
    id: 'domus_1',
    name: "Domus de l'Aventin",
    description: "Élégante maison patricienne dans le quartier de l'Aventin avec atrium et péristyle",
    type: 'urban',
    initialCost: 30000,
    maintenanceCost: 2500,
    slaves: {
      required: 5,
      optimal: 10
    },
    prestige: 5,
    income: 0,
    advantages: [
      "Quartier prestigieux",
      "Idéal pour recevoir des clients",
      "Augmente significativement votre statut social"
    ]
  },
  {
    id: 'tabernae_1',
    name: "Tabernae de la Via Sacra",
    description: "Ensemble de boutiques sur la Via Sacra, principales artères commerciales de Rome",
    type: 'urban',
    initialCost: 20000,
    maintenanceCost: 1800,
    slaves: {
      required: 3,
      optimal: 8
    },
    prestige: 2,
    income: 3500,
    advantages: [
      "Revenu commercial important",
      "Position stratégique",
      "Visibilité auprès des citoyens influents"
    ]
  },
  
  // Propriétés rurales
  {
    id: 'villa_rustica_1',
    name: "Villa Rustica de Campanie",
    description: "Domaine agricole productif dans la fertile région de Campanie",
    type: 'rural',
    initialCost: 25000,
    maintenanceCost: 3000,
    slaves: {
      required: 10,
      optimal: 25
    },
    prestige: 3,
    income: 4500,
    advantages: [
      "Production agricole diversifiée",
      "Autosuffisance alimentaire",
      "Revenus stables et saisonniers"
    ]
  },
  {
    id: 'vineyard_1',
    name: "Vignoble du Latium",
    description: "Vignoble réputé produisant un vin apprécié par l'aristocratie romaine",
    type: 'rural',
    initialCost: 18000,
    maintenanceCost: 2200,
    slaves: {
      required: 8,
      optimal: 20
    },
    prestige: 3,
    income: 3800,
    advantages: [
      "Production de vin de qualité",
      "Relations avec les élites consommatrices",
      "Possibilité d'extension"
    ]
  },
  {
    id: 'olive_grove_1',
    name: "Oliveraie d'Étrurie",
    description: "Plantation d'oliviers en Étrurie produisant une huile d'olive de qualité",
    type: 'rural',
    initialCost: 16000,
    maintenanceCost: 1800,
    slaves: {
      required: 6,
      optimal: 15
    },
    prestige: 2,
    income: 3000,
    advantages: [
      "Production d'huile d'olive",
      "Demande constante sur le marché",
      "Faibles fluctuations de prix"
    ]
  },
  
  // Propriétés religieuses
  {
    id: 'small_temple_1',
    name: "Petit Temple de Minerve",
    description: "Modeste temple dédié à Minerve, déesse de la sagesse et des artisans",
    type: 'religious',
    initialCost: 12000,
    maintenanceCost: 1000,
    slaves: {
      required: 2,
      optimal: 4
    },
    prestige: 6,
    income: 0,
    advantages: [
      "Faveur divine",
      "Influence religieuse locale",
      "Prestige auprès des collèges sacerdotaux"
    ]
  },
  {
    id: 'shrine_1',
    name: "Autel des Lares",
    description: "Autel dédié aux divinités protectrices du foyer et de la famille",
    type: 'religious',
    initialCost: 5000,
    maintenanceCost: 500,
    slaves: {
      required: 1,
      optimal: 2
    },
    prestige: 2,
    income: 0,
    advantages: [
      "Protection familiale",
      "Piété publique visible",
      "Entretien minimal"
    ]
  }
];
