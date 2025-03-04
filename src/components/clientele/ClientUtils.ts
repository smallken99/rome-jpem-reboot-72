
import { Client, ClientType } from './ClientCard';

// Génération des clients masculins uniquement
export const generateClients = (): Client[] => {
  const clientTypes: ClientType[] = ['artisan', 'politicien', 'religieux', 'proprietaire', 'pegre'];
  const loyaltyLevels = ['Très Haute', 'Haute', 'Moyenne', 'Basse', 'Très Basse'];
  const locations = ['Forum Romanum', 'Subura', 'Port d\'Ostie', 'Colline Palatine', 'Campanie', 'Via Appia', 'Marché de Trajan'];
  
  const subTypes = {
    artisan: ['Forgeron', 'Potier', 'Tisserand', 'Bijoutier', 'Boulanger', 'Tanneur', 'Sculpteur', 'Charpentier'],
    politicien: ['Sénateur', 'Tribun', 'Édile', 'Questeur', 'Censeur', 'Préteur', 'Magistrat'],
    religieux: ['Pontife', 'Augure', 'Flamine', 'Haruspice', 'Prêtre de Jupiter', 'Prêtre de Mars'],
    proprietaire: ['Propriétaire Terrien', 'Viticulteur', 'Oliviculteur', 'Éleveur', 'Armateur'],
    pegre: ['Usurier', 'Contrebandier', 'Gladiateur', 'Mercenaire', 'Espion', 'Receleur']
  };
  
  // Générer entre 12 et 18 clients aléatoirement
  const numClients = 12 + Math.floor(Math.random() * 7);
  const generatedClients: Client[] = [];
  
  for (let i = 0; i < numClients; i++) {
    const clientType = clientTypes[Math.floor(Math.random() * clientTypes.length)];
    const clientSubTypes = subTypes[clientType];
    const subType = clientSubTypes[Math.floor(Math.random() * clientSubTypes.length)];
    
    // Générer des influences variables selon le type
    let politicalInfluence = 1 + Math.floor(Math.random() * 5); // Base entre 1-5
    let popularInfluence = 1 + Math.floor(Math.random() * 5);  // Base entre 1-5
    let religiousInfluence = 1 + Math.floor(Math.random() * 5); // Base entre 1-5
    
    // Ajuster les influences selon le type de client
    switch (clientType) {
      case 'politicien':
        politicalInfluence += 3 + Math.floor(Math.random() * 3); // +3-5 pour atteindre potentiellement 10
        break;
      case 'religieux':
        religiousInfluence += 3 + Math.floor(Math.random() * 3);
        break;
      case 'artisan':
      case 'pegre':
        popularInfluence += 3 + Math.floor(Math.random() * 3);
        break;
      case 'proprietaire':
        // Équilibré ou aléatoirement élevé dans une influence
        const randomBoost = Math.floor(Math.random() * 3);
        if (randomBoost === 0) politicalInfluence += 3;
        else if (randomBoost === 1) popularInfluence += 3;
        else religiousInfluence += 3;
        break;
    }
    
    // S'assurer que les valeurs ne dépassent pas 10
    politicalInfluence = Math.min(politicalInfluence, 10);
    popularInfluence = Math.min(popularInfluence, 10);
    religiousInfluence = Math.min(religiousInfluence, 10);
    
    generatedClients.push({
      id: i + 1,
      name: generateRomanName(),
      type: clientType,
      subType: subType,
      location: locations[Math.floor(Math.random() * locations.length)],
      loyalty: loyaltyLevels[Math.floor(Math.random() * loyaltyLevels.length)],
      influences: {
        political: politicalInfluence,
        popular: popularInfluence,
        religious: religiousInfluence
      }
    });
  }
  
  return generatedClients;
};

// Génération d'un nom romain masculin uniquement
export const generateRomanName = (): string => {
  const praenomina = ['Marcus', 'Lucius', 'Gaius', 'Publius', 'Quintus', 'Titus', 'Servius', 'Gnaeus', 'Decimus', 'Aulus'];
  const nomina = ['Aurelius', 'Julius', 'Claudius', 'Flavius', 'Cornelius', 'Licinius', 'Valerius', 'Domitius', 'Aemilius', 'Pompeius'];
  const cognomina = ['Maximus', 'Felix', 'Severus', 'Rufus', 'Niger', 'Paulus', 'Crispus', 'Priscus', 'Cotta', 'Gallus'];
  
  const praenomen = praenomina[Math.floor(Math.random() * praenomina.length)];
  const nomen = nomina[Math.floor(Math.random() * nomina.length)];
  const cognomen = cognomina[Math.floor(Math.random() * cognomina.length)];
  
  return `${praenomen} ${nomen} ${cognomen}`;
};
