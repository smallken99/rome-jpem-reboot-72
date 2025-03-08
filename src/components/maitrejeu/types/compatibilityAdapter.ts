
import { Season as TimeSystemSeason } from '@/utils/timeSystem';
import { Province } from './provinces';
import { SenateurJouable } from './senateurs';
import { Loi } from './lois';
import { Season, GameDate, ImportanceType, GamePhase, PhaseType } from './common';

// Re-export de types avec export type
export type { Season, GameDate, ImportanceType, GamePhase, PhaseType };
export type { Province } from './provinces';
export type { SenateurJouable } from './senateurs';
export type { Evenement, EvenementAction, EvenementType } from './evenements';
export type { Loi } from './lois';

// Fonction de conversion entre les types de saisons
export const convertTimeSeasonToMaitreJeuSeason = (season: TimeSystemSeason): Season => {
  const seasonMap: Record<TimeSystemSeason, Season> = {
    'Ver': 'SPRING',
    'Aestas': 'SUMMER',
    'Autumnus': 'AUTUMN',
    'Hiems': 'WINTER'
  };
  return seasonMap[season];
};

export const convertMaitreJeuSeasonToTimeSeason = (season: Season): TimeSystemSeason => {
  const seasonMap: Record<Season, TimeSystemSeason> = {
    'SPRING': 'Ver',
    'SUMMER': 'Aestas',
    'AUTUMN': 'Autumnus',
    'WINTER': 'Hiems'
  };
  return seasonMap[season];
};

// Adaptations pour la Province
export const adaptProvince = {
  convertVariationLoyaute: (province: Province) => {
    if ('loyautéVariation' in province && !('variationLoyauté' in province)) {
      return { ...province, variationLoyauté: province.loyautéVariation };
    }
    return province;
  },
  
  convertDernierEvenement: (province: Province) => {
    if ('dernierEvenement' in province && !('dernierEvénement' in province)) {
      return { ...province, dernierEvénement: province.dernierEvenement };
    }
    return province;
  },
  
  convertCoordonnees: (province: Province) => {
    if ('position' in province && !('coordonnées' in province)) {
      return { ...province, coordonnées: province.position };
    }
    return province;
  }
};

// Adaptations pour le Senateur
export const adaptSenateur = {
  convertAge: (senateur: SenateurJouable) => {
    if ('age' in senateur && !('âge' in senateur)) {
      return { ...senateur, âge: senateur.age };
    }
    return senateur;
  },
  
  convertPopularite: (senateur: SenateurJouable) => {
    if ('popularite' in senateur && !('popularité' in senateur)) {
      return { ...senateur, popularité: senateur.popularite };
    }
    return senateur;
  },
  
  convertFonction: (senateur: SenateurJouable) => {
    if ('fonction' in senateur && !('fonctionActuelle' in senateur)) {
      return { ...senateur, fonctionActuelle: senateur.fonction };
    }
    return senateur;
  },
  
  convertStatut: (senateur: SenateurJouable) => {
    if ('status' in senateur && !('statut' in senateur)) {
      return { ...senateur, statut: senateur.status };
    }
    return senateur;
  }
};

// Adaptations pour les Lois
export const adaptLoi = {
  normaliseCategorieType: (loi: Loi) => {
    // Normaliser les types de catégorie
    const categorieMap: Record<string, string> = {
      'économique': 'ECONOMIQUE',
      'economique': 'ECONOMIQUE',
      'politique': 'POLITIQUE',
      'sociale': 'SOCIALE',
      'social': 'SOCIALE',
      'religieuse': 'RELIGIEUSE',
      'religieux': 'RELIGIEUSE',
      'militaire': 'MILITAIRE'
    };
    
    if ('catégorie' in loi) {
      const normalizedCategorie = categorieMap[loi.catégorie.toLowerCase()] || loi.catégorie.toUpperCase();
      return { ...loi, catégorie: normalizedCategorie };
    }
    
    return loi;
  }
};

// Adaptateur principal
export const adaptData = {
  convertSenateurFields: (senateur: SenateurJouable): SenateurJouable => {
    return adaptSenateur.convertStatut(
      adaptSenateur.convertFonction(
        adaptSenateur.convertPopularite(
          adaptSenateur.convertAge(senateur)
        )
      )
    );
  },
  
  convertProvinceFields: (province: Province): Province => {
    return adaptProvince.convertCoordonnees(
      adaptProvince.convertDernierEvenement(
        adaptProvince.convertVariationLoyaute(province)
      )
    );
  },
  
  convertLoiFields: (loi: Loi): Loi => {
    return adaptLoi.normaliseCategorieType(loi);
  },
  
  createGameDate: (year: number, season: Season): GameDate => {
    return { year, season };
  }
};

// Pour générer des identifiants uniques
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};
