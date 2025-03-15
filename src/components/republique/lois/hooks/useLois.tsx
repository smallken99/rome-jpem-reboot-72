import { useState, useEffect } from 'react';

export interface Loi {
  id: string;
  titre: string;
  description: string;
  auteur: string;
  dateProposition: string;
  dateVote?: string;
  statut: 'proposée' | 'en_débat' | 'votée' | 'rejetée' | 'promulguée';
  votes?: {
    pour: number;
    contre: number;
    abstention: number;
  };
  categorieId: string;
  tags: string[];
  type?: string;
  importance?: string;
  clauses?: string[];
  commentaires?: string[];
}

export interface CategorieLoi {
  id: string;
  nom: string;
  description: string;
  couleur: string;
  icone: string;
}

export const useLois = () => {
  const [lois, setLois] = useState<Loi[]>([]);
  const [categories, setCategories] = useState<CategorieLoi[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simuler un chargement depuis une API
    const loadData = async () => {
      try {
        setIsLoading(true);
        
        // Données simulées pour les catégories
        const simulatedCategories: CategorieLoi[] = [
          {
            id: 'civil',
            nom: 'Droit Civil',
            description: 'Lois concernant les relations entre citoyens',
            couleur: 'bg-blue-500',
            icone: 'Users'
          },
          {
            id: 'commerce',
            nom: 'Commerce',
            description: 'Lois régulant les activités commerciales',
            couleur: 'bg-amber-500',
            icone: 'Coins'
          },
          {
            id: 'justice',
            nom: 'Justice',
            description: 'Lois concernant l\'application de la justice',
            couleur: 'bg-red-500',
            icone: 'Scale'
          },
          {
            id: 'militaire',
            nom: 'Affaires Militaires',
            description: 'Lois concernant l\'armée et la défense',
            couleur: 'bg-green-500',
            icone: 'Shield'
          },
          {
            id: 'religieux',
            nom: 'Religieux',
            description: 'Lois concernant les pratiques religieuses',
            couleur: 'bg-purple-500',
            icone: 'Church'
          }
        ];
        
        // Données simulées pour les lois
        const simulatedLois: Loi[] = [
          {
            id: '1',
            titre: 'Lex Publilia de sponsu',
            description: 'Loi définissant les responsabilités des garants dans les contrats',
            auteur: 'Publilius Philo',
            dateProposition: '15 Mars 45 av. J.-C.',
            dateVote: '21 Mai 45 av. J.-C.',
            statut: 'promulguée',
            votes: {
              pour: 156,
              contre: 23,
              abstention: 12
            },
            categorieId: 'civil',
            tags: ['contrats', 'garants', 'responsabilité']
          },
          {
            id: '2',
            titre: 'Lex Manlia de vicesima',
            description: 'Taxe de 5% sur les affranchissements d\'esclaves',
            auteur: 'Manlius Capitolinus',
            dateProposition: '10 Avril 45 av. J.-C.',
            statut: 'en_débat',
            categorieId: 'commerce',
            tags: ['taxation', 'esclaves', 'affranchissement']
          },
          {
            id: '3',
            titre: 'Lex Canuleia de conubio',
            description: 'Autorisation des mariages entre patriciens et plébéiens',
            auteur: 'Gaius Canuleius',
            dateProposition: '1 Février 45 av. J.-C.',
            dateVote: '3 Mars 45 av. J.-C.',
            statut: 'rejetée',
            votes: {
              pour: 45,
              contre: 142,
              abstention: 4
            },
            categorieId: 'civil',
            tags: ['mariage', 'classes sociales']
          },
          {
            id: '4',
            titre: 'Lex Militaris de stipendio',
            description: 'Augmentation de la solde des légionnaires',
            auteur: 'Marcus Furius Camillus',
            dateProposition: '20 Mai 45 av. J.-C.',
            statut: 'proposée',
            categorieId: 'militaire',
            tags: ['armée', 'solde', 'légions']
          },
          {
            id: '5',
            titre: 'Lex Poetelia de ambitu',
            description: 'Loi contre la corruption électorale',
            auteur: 'Poetilius Libo',
            dateProposition: '5 Janvier 45 av. J.-C.',
            dateVote: '12 Février 45 av. J.-C.',
            statut: 'votée',
            votes: {
              pour: 178,
              contre: 12,
              abstention: 1
            },
            categorieId: 'justice',
            tags: ['élections', 'corruption', 'magistrats']
          }
        ];
        
        setCategories(simulatedCategories);
        setLois(simulatedLois);
      } catch (err) {
        setError('Erreur lors du chargement des données');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  const proposerLoi = (nouvelleLoi: Omit<Loi, 'id' | 'dateProposition' | 'statut'>) => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('fr-FR', options).replace(/ ([0-9]{4})$/, ' $1 av. J.-C.');
    
    const newLoi: Loi = {
      id: (lois.length + 1).toString(),
      dateProposition: formattedDate,
      statut: 'proposée',
      ...nouvelleLoi
    };
    
    setLois([...lois, newLoi]);
    return newLoi;
  };
  
  const voterLoi = (id: string, vote: { pour: number; contre: number; abstention: number }) => {
    setLois(lois.map(loi => {
      if (loi.id === id) {
        const date = new Date();
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('fr-FR', options).replace(/ ([0-9]{4})$/, ' $1 av. J.-C.');
        
        const isApproved = vote.pour > vote.contre;
        
        return {
          ...loi,
          statut: isApproved ? 'votée' : 'rejetée',
          dateVote: formattedDate,
          votes: vote
        };
      }
      return loi;
    }));
  };
  
  const promulguerLoi = (id: string) => {
    setLois(lois.map(loi => {
      if (loi.id === id && loi.statut === 'votée') {
        return {
          ...loi,
          statut: 'promulguée'
        };
      }
      return loi;
    }));
  };
  
  const getLoi = (id: string) => {
    return lois.find(loi => loi.id === id);
  };
  
  const getLoisByCategorie = (categorieId: string) => {
    return lois.filter(loi => loi.categorieId === categorieId);
  };
  
  const getLoisByStatut = (statut: Loi['statut']) => {
    return lois.filter(loi => loi.statut === statut);
  };
  
  const getCategorie = (id: string) => {
    return categories.find(cat => cat.id === id);
  };

  return {
    lois,
    categories,
    isLoading,
    error,
    proposerLoi,
    voterLoi,
    promulguerLoi,
    getLoi,
    getLoisByCategorie,
    getLoisByStatut,
    getCategorie
  };
};
