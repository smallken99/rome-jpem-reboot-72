
// Liste des spécialités pour chaque type d'éducation
export const educationSpecialties: Record<string, string[]> = {
  political: ['Procédures sénatoriales', 'Droit romain', 'Éloquence civique', 'Histoire politique'],
  rhetoric: ['Rhétorique grecque', 'Débat public', 'Composition littéraire', 'Art de la mémoire'],
  military: ['Tactique légionnaire', 'Équitation militaire', 'Fortifications', 'Navigation militaire'],
  religious: ['Divination', 'Rituels sacrificiels', 'Cultes familiaux', 'Mystères étrusques'],
  philosophical: ['Stoïcisme', 'Épicurisme', 'Académie platonicienne', 'Scepticisme'],
  diplomatic: ['Protocole diplomatique', 'Langues étrangères', 'Géographie politique', 'Histoire des relations étrangères'],
  administrative: ['Comptabilité publique', 'Réglementation commerciale', 'Administration provinciale', 'Gestion des travaux publics'],
  leadership: ['Commandement civil', 'Autorité et charisme', 'Résolution de conflits', 'Planification stratégique']
};

// Export a flat list of all specialties for use in other components
export const specialties = Object.values(educationSpecialties).flat();
