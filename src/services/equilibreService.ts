
import { v4 as uuidv4 } from 'uuid';
import { Equilibre } from '@/components/maitrejeu/types/equilibre';
import { EventEmitter } from '@/utils/eventEmitter';

/**
 * Service centralisé pour la gestion de l'équilibre de la République
 */
export class EquilibreService {
  private equilibre: Equilibre = {
    politique: {
      populaires: 33,
      optimates: 33,
      moderates: 34
    },
    social: {
      patriciens: 20,
      plebeiens: 80,
      esclaves: 50,
      cohesion: 70
    },
    economie: {
      stabilite: 60,
      croissance: 50,
      commerce: 70,
      agriculture: 65
    },
    militaire: {
      moral: 75,
      effectifs: 80,
      equipement: 65,
      discipline: 80
    },
    religion: {
      piete: 70,
      traditions: 85,
      superstition: 60
    }
  };

  private subscribers: Array<(equilibre: Equilibre) => void> = [];
  private changeEvents = new EventEmitter<{ type: string; changes: Partial<Equilibre>; impact: Record<string, number> }>();

  /**
   * Obtenir l'état actuel de l'équilibre
   */
  getEquilibre(): Equilibre {
    return { ...this.equilibre };
  }

  /**
   * Mettre à jour l'équilibre
   */
  updateEquilibre(updates: Partial<Equilibre>, source?: string): Equilibre {
    // Fusionner les mises à jour avec l'état actuel
    this.equilibre = this.mergeEquilibre(this.equilibre, updates);
    
    // Notifier les abonnés
    this.notifySubscribers();
    
    // Émettre un événement de changement
    this.changeEvents.emit({
      type: source || 'manual_update',
      changes: updates,
      impact: this.calculateImpact(updates)
    });
    
    return { ...this.equilibre };
  }

  /**
   * Mettre à jour l'équilibre politique
   */
  updatePoliticalBalance(populaires: number, optimates: number, moderates: number): Equilibre {
    // S'assurer que les valeurs sont entre 0 et 100
    populaires = Math.max(0, Math.min(100, populaires));
    optimates = Math.max(0, Math.min(100, optimates));
    moderates = Math.max(0, Math.min(100, moderates));
    
    // Mettre à jour l'équilibre
    return this.updateEquilibre({
      politique: {
        populaires,
        optimates,
        moderates
      }
    }, 'political_adjustment');
  }

  /**
   * Mettre à jour l'équilibre social
   */
  updateSocialBalance(patriciens: number, plebeiens: number, esclaves?: number, cohesion?: number): Equilibre {
    return this.updateEquilibre({
      social: {
        patriciens,
        plebeiens,
        esclaves: esclaves !== undefined ? esclaves : this.equilibre.social.esclaves,
        cohesion: cohesion !== undefined ? cohesion : this.equilibre.social.cohesion
      }
    }, 'social_adjustment');
  }

  /**
   * Mettre à jour l'équilibre économique
   */
  updateEconomicBalance(stabilite: number, croissance: number, commerce: number, agriculture: number): Equilibre {
    return this.updateEquilibre({
      economie: {
        stabilite,
        croissance,
        commerce,
        agriculture
      }
    }, 'economic_adjustment');
  }

  /**
   * Mettre à jour l'équilibre militaire
   */
  updateMilitaryBalance(moral: number, effectifs: number, equipement: number, discipline: number): Equilibre {
    return this.updateEquilibre({
      militaire: {
        moral,
        effectifs,
        equipement,
        discipline
      }
    }, 'military_adjustment');
  }

  /**
   * Mettre à jour l'équilibre religieux
   */
  updateReligiousBalance(piete: number, traditions: number, superstition: number): Equilibre {
    return this.updateEquilibre({
      religion: {
        piete,
        traditions,
        superstition
      }
    }, 'religious_adjustment');
  }

  /**
   * Calculer l'impact d'un changement
   */
  calculateImpact(changes: Partial<Equilibre>): Record<string, number> {
    const impact: Record<string, number> = {};
    
    // Calculer l'impact politique
    if (changes.politique) {
      impact.stabilite = this.calculatePoliticalStability(changes.politique);
      impact.unrest = this.calculatePoliticalUnrest(changes.politique);
    }
    
    // Calculer l'impact économique
    if (changes.economie) {
      impact.prosperity = this.calculateEconomicProsperity(changes.economie);
      impact.income = this.calculateEconomicGrowth(changes.economie);
    }
    
    // Calculer l'impact militaire
    if (changes.militaire) {
      impact.securityLevel = this.calculateMilitaryStrength(changes.militaire);
      impact.defensePower = this.calculateDefensePower(changes.militaire);
    }
    
    // Calculer l'impact social
    if (changes.social) {
      impact.socialCohesion = this.calculateSocialCohesion(changes.social);
      impact.rebellionRisk = this.calculateRebellionRisk(changes.social);
    }
    
    // Calculer l'impact religieux
    if (changes.religion) {
      impact.divineSupport = this.calculateDivineSupport(changes.religion);
      impact.religiousUnrest = this.calculateReligiousUnrest(changes.religion);
    }
    
    return impact;
  }

  /**
   * S'abonner aux changements d'équilibre
   */
  subscribe(callback: (equilibre: Equilibre) => void): () => void {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(sub => sub !== callback);
    };
  }

  /**
   * S'abonner aux événements de changement
   */
  subscribeToChangeEvents(callback: (event: { type: string; changes: Partial<Equilibre>; impact: Record<string, number> }) => void): () => void {
    return this.changeEvents.subscribe(callback);
  }

  /**
   * Notifier tous les abonnés
   */
  private notifySubscribers(): void {
    const equilibreCopy = { ...this.equilibre };
    this.subscribers.forEach(callback => callback(equilibreCopy));
  }

  /**
   * Fusionner les mises à jour avec l'état actuel
   */
  private mergeEquilibre(current: Equilibre, updates: Partial<Equilibre>): Equilibre {
    const result = { ...current };
    
    if (updates.politique) {
      result.politique = {
        ...result.politique,
        ...updates.politique
      };
      // Normaliser pour s'assurer que la somme est de 100%
      const sum = result.politique.populaires + result.politique.optimates + result.politique.moderates;
      if (sum !== 100 && sum > 0) {
        const factor = 100 / sum;
        result.politique.populaires = Math.round(result.politique.populaires * factor);
        result.politique.optimates = Math.round(result.politique.optimates * factor);
        result.politique.moderates = 100 - result.politique.populaires - result.politique.optimates;
      }
    }
    
    if (updates.social) {
      result.social = {
        ...result.social,
        ...updates.social
      };
      // Normaliser pour s'assurer que patriciens + plebeiens = 100%
      const sum = result.social.patriciens + result.social.plebeiens;
      if (sum !== 100 && sum > 0) {
        const factor = 100 / sum;
        result.social.patriciens = Math.round(result.social.patriciens * factor);
        result.social.plebeiens = 100 - result.social.patriciens;
      }
    }
    
    if (updates.economie) {
      result.economie = {
        ...result.economie,
        ...updates.economie
      };
    }
    
    if (updates.militaire) {
      result.militaire = {
        ...result.militaire,
        ...updates.militaire
      };
    }
    
    if (updates.religion) {
      result.religion = {
        ...result.religion,
        ...updates.religion
      };
    }
    
    return result;
  }

  // Fonctions de calcul

  private calculatePoliticalStability(politique: Partial<{ populaires: number; optimates: number; moderates: number }>): number {
    const populaires = politique.populaires || this.equilibre.politique.populaires;
    const optimates = politique.optimates || this.equilibre.politique.optimates;
    const moderates = politique.moderates || this.equilibre.politique.moderates;
    
    // Plus les modérés sont nombreux, plus la stabilité est grande
    const moderatesFactor = moderates / 100;
    
    // L'écart entre populaires et optimates réduit la stabilité
    const polarizationFactor = 1 - Math.abs(populaires - optimates) / 100;
    
    return Math.round((moderatesFactor * 0.6 + polarizationFactor * 0.4) * 100);
  }

  private calculatePoliticalUnrest(politique: Partial<{ populaires: number; optimates: number; moderates: number }>): number {
    const populaires = politique.populaires || this.equilibre.politique.populaires;
    const optimates = politique.optimates || this.equilibre.politique.optimates;
    
    // Plus les extrêmes sont puissants, plus l'agitation est grande
    const extremesPower = (populaires + optimates) / 200;
    
    // L'écart entre populaires et optimates augmente l'agitation
    const polarizationFactor = Math.abs(populaires - optimates) / 100;
    
    return Math.round((extremesPower * 0.7 + polarizationFactor * 0.3) * 100);
  }

  private calculateEconomicProsperity(economie: Partial<{ stabilite: number; croissance: number; commerce: number; agriculture: number }>): number {
    const stabilite = economie.stabilite || this.equilibre.economie.stabilite;
    const croissance = economie.croissance || this.equilibre.economie.croissance;
    const commerce = economie.commerce || this.equilibre.economie.commerce;
    const agriculture = economie.agriculture || this.equilibre.economie.agriculture;
    
    return Math.round((stabilite * 0.3 + croissance * 0.3 + commerce * 0.2 + agriculture * 0.2) / 100 * 100);
  }

  private calculateEconomicGrowth(economie: Partial<{ stabilite: number; croissance: number; commerce: number; agriculture: number }>): number {
    const stabilite = economie.stabilite || this.equilibre.economie.stabilite;
    const croissance = economie.croissance || this.equilibre.economie.croissance;
    const commerce = economie.commerce || this.equilibre.economie.commerce;
    
    return Math.round((stabilite * 0.2 + croissance * 0.5 + commerce * 0.3) / 100 * 100);
  }

  private calculateMilitaryStrength(militaire: Partial<{ moral: number; effectifs: number; equipement: number; discipline: number }>): number {
    const moral = militaire.moral || this.equilibre.militaire.moral;
    const effectifs = militaire.effectifs || this.equilibre.militaire.effectifs;
    const equipement = militaire.equipement || this.equilibre.militaire.equipement;
    const discipline = militaire.discipline || this.equilibre.militaire.discipline;
    
    return Math.round((moral * 0.25 + effectifs * 0.25 + equipement * 0.25 + discipline * 0.25) / 100 * 100);
  }

  private calculateDefensePower(militaire: Partial<{ moral: number; effectifs: number; equipement: number; discipline: number }>): number {
    const moral = militaire.moral || this.equilibre.militaire.moral;
    const effectifs = militaire.effectifs || this.equilibre.militaire.effectifs;
    const equipement = militaire.equipement || this.equilibre.militaire.equipement;
    const discipline = militaire.discipline || this.equilibre.militaire.discipline;
    
    return Math.round((effectifs * 0.4 + equipement * 0.3 + discipline * 0.3) / 100 * 100);
  }

  private calculateSocialCohesion(social: Partial<{ patriciens: number; plebeiens: number; esclaves?: number; cohesion?: number }>): number {
    const cohesion = social.cohesion || this.equilibre.social.cohesion || 50;
    const plebeiens = social.plebeiens || this.equilibre.social.plebeiens;
    const patriciens = social.patriciens || this.equilibre.social.patriciens;
    
    // L'écart entre patriciens et plébéiens réduit la cohésion
    const polarizationFactor = 1 - Math.abs(patriciens - plebeiens) / 100;
    
    return Math.round((cohesion * 0.7 + polarizationFactor * 0.3));
  }

  private calculateRebellionRisk(social: Partial<{ patriciens: number; plebeiens: number; esclaves?: number; cohesion?: number }>): number {
    const cohesion = social.cohesion || this.equilibre.social.cohesion || 50;
    const esclaves = social.esclaves || this.equilibre.social.esclaves || 0;
    const plebeiens = social.plebeiens || this.equilibre.social.plebeiens;
    const patriciens = social.patriciens || this.equilibre.social.patriciens;
    
    // Plus l'écart entre patriciens et plébéiens est grand, plus le risque est grand
    const inequalityFactor = Math.abs(patriciens - plebeiens) / 100;
    
    // Plus la cohésion est faible, plus le risque est grand
    const cohesionFactor = 1 - cohesion / 100;
    
    // Plus il y a d'esclaves, plus le risque est grand
    const slavesFactor = esclaves / 100;
    
    return Math.round((inequalityFactor * 0.4 + cohesionFactor * 0.4 + slavesFactor * 0.2) * 100);
  }

  private calculateDivineSupport(religion: Partial<{ piete: number; traditions: number; superstition: number }>): number {
    const piete = religion.piete || this.equilibre.religion.piete;
    const traditions = religion.traditions || this.equilibre.religion.traditions;
    
    return Math.round((piete * 0.5 + traditions * 0.5) / 100 * 100);
  }

  private calculateReligiousUnrest(religion: Partial<{ piete: number; traditions: number; superstition: number }>): number {
    const piete = religion.piete || this.equilibre.religion.piete;
    const traditions = religion.traditions || this.equilibre.religion.traditions;
    const superstition = religion.superstition || this.equilibre.religion.superstition;
    
    // Plus la piété et les traditions sont faibles, plus l'agitation est grande
    const devotionFactor = 1 - (piete + traditions) / 200;
    
    // Plus la superstition est élevée, plus l'agitation est grande
    const superstitionFactor = superstition / 100;
    
    return Math.round((devotionFactor * 0.6 + superstitionFactor * 0.4) * 100);
  }
}

// Exporter une instance unique du service
export const equilibreService = new EquilibreService();
