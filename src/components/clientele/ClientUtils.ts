
import { Client, ClientType } from './ClientCard';

// Génération des clients masculins plébéiens exclusivement
export const generateClients = (): Client[] => {
  const clientTypes: ClientType[] = ['artisan_commercant', 'politicien', 'religieux', 'proprietaire', 'pegre'];
  const loyaltyLevels = ['Très Haute', 'Haute', 'Moyenne', 'Basse', 'Très Basse'];
  
  // Quartiers et collines de la Rome républicaine
  const locations = [
    'Aventin', 'Palatin', 'Capitole', 'Quirinal', 'Viminal', 
    'Esquilin', 'Caelius', 'Subura', 'Forum Boarium', 'Forum Romanum', 
    'Champ de Mars', 'Trastevere', 'Emporium', 'Via Sacra', 'Via Lata',
    'Regio Transtiberim', 'Velabrum'
  ];
  
  // Métiers plus diversifiés pour chaque type de client
  const subTypes = {
    artisan_commercant: [
      'Forgeron', 'Potier', 'Tisserand', 'Bijoutier', 'Boulanger', 'Tanneur', 
      'Sculpteur', 'Charpentier', 'Marchand d\'huile', 'Marchand de vin', 
      'Marchand d\'épices', 'Marchand de tissus', 'Cordonnier', 'Verrier', 
      'Libraire', 'Tonnelier', 'Marchand de céréales', 'Tavernier',
      'Parfumeur', 'Marchand d\'armes', 'Fabricant de lampes', 'Teinturier',
      'Meunier', 'Fabricant de mosaïques'
    ],
    politicien: [
      'Tribun de la plèbe', 'Édile', 'Questeur', 'Censeur', 'Préteur', 
      'Magistrat municipal', 'Scribe public', 'Orateur du Forum', 
      'Trésorier', 'Collecteur d\'impôts', 'Inspecteur des aqueducs',
      'Commissaire aux grains', 'Commissaire des marchés', 'Agent électoral',
      'Assesseur juridique'
    ],
    religieux: [
      'Augure plébéien', 'Haruspice', 'Prêtre de Cérès', 'Prêtre de Bacchus', 
      'Sacrificateur', 'Gardien de temple', 'Interprète de présages',
      'Prêtre de Vulcain', 'Prêtre de Mercure', 'Assistant des Vestales',
      'Gardien des reliques', 'Musicien de culte', 'Vendeur d\'amulettes',
      'Devin', 'Astrologue', 'Fabricant d\'ex-voto'
    ],
    proprietaire: [
      'Petit propriétaire terrien', 'Viticulteur', 'Oliviculteur', 'Éleveur d\'ovins', 
      'Éleveur de bovins', 'Exploitant de verger', 'Apiculteur', 'Pisciculteur',
      'Propriétaire de carrière', 'Loueur d\'entrepôts', 'Propriétaire d\'insulae',
      'Exploitant de bois', 'Propriétaire de vignobles', 'Propriétaire de pressoir',
      'Exploitant agricole', 'Producteur de garum'
    ],
    pegre: [
      'Usurier', 'Contrebandier', 'Gladiateur retraité', 'Mercenaire', 'Espion', 
      'Receleur', 'Chef de gang', 'Faussaire', 'Parieur professionnel',
      'Proxénète', 'Maître-chanteur', 'Trafiquant d\'esclaves', 'Voleur de tombes',
      'Pickpocket', 'Faux témoin', 'Saboteur', 'Agent provocateur'
    ]
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
      case 'artisan_commercant':
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
      name: generateRomanPlebName(),
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

// Génération d'un nom romain plébéien masculin
export const generateRomanPlebName = (): string => {
  // Prénoms plébéiens romains
  const praenomina = [
    'Marcus', 'Lucius', 'Gaius', 'Quintus', 'Titus', 'Publius', 'Gnaeus', 
    'Aulus', 'Sextus', 'Numerius', 'Spurius', 'Servius', 'Manius'
  ];
  
  // Noms de famille plébéiens
  const nomina = [
    'Flavius', 'Caecilius', 'Sempronius', 'Plautius', 'Marius', 'Aelius', 
    'Tullius', 'Fulvius', 'Livius', 'Marcius', 'Octavius', 'Horatius', 
    'Valerius', 'Hostilius', 'Lucretius', 'Cassius', 'Publilius', 'Menenius',
    'Aemilius', 'Icilius', 'Verginius', 'Nautius', 'Sicinius', 'Canuleius'
  ];
  
  // Surnoms plébéiens
  const cognomina = [
    'Felix', 'Rufus', 'Niger', 'Fuscus', 'Bassus', 'Priscus', 
    'Longus', 'Cotta', 'Gallus', 'Flaccus', 'Capito', 'Macro', 
    'Cicero', 'Varro', 'Crispus', 'Balbus', 'Laenas', 'Celsus',
    'Lentulus', 'Bibulus', 'Piso', 'Scaeva', 'Vetus', 'Calvus'
  ];
  
  const praenomen = praenomina[Math.floor(Math.random() * praenomina.length)];
  const nomen = nomina[Math.floor(Math.random() * nomina.length)];
  
  // 75% de chance d'avoir un cognomen
  if (Math.random() < 0.75) {
    const cognomen = cognomina[Math.floor(Math.random() * cognomina.length)];
    return `${praenomen} ${nomen} ${cognomen}`;
  }
  
  return `${praenomen} ${nomen}`;
};
