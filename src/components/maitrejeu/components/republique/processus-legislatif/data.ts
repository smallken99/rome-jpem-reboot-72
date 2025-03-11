
import { ProjetLoi, VoteLoi, HistoriqueLoi } from './types';

export const projetsData: ProjetLoi[] = [
  { id: '1', titre: 'Lex Agraria', auteur: 'Gaius Gracchus', date: '05/06/230 av. J.-C.', statut: 'En rédaction' },
  { id: '2', titre: 'Lex de Maiestate', auteur: 'Julius Caesar', date: '12/08/230 av. J.-C.', statut: 'En examen' },
  { id: '3', titre: 'Lex Frumentaria', auteur: 'Marcus Aurelius', date: '23/09/230 av. J.-C.', statut: 'Prêt pour vote' }
];

export const votesData: VoteLoi[] = [
  { 
    id: '1', 
    titre: 'Lex Militaris', 
    auteur: 'Lucius Quinctius Cincinnatus', 
    dateDebut: '01/10/230 av. J.-C.', 
    dateFin: '08/10/230 av. J.-C.',
    pour: 65,
    contre: 35,
    abstention: 10
  },
  { 
    id: '2', 
    titre: 'Lex Justitiae', 
    auteur: 'Cicero', 
    dateDebut: '03/10/230 av. J.-C.', 
    dateFin: '10/10/230 av. J.-C.',
    pour: 45,
    contre: 55,
    abstention: 5
  }
];

export const historiqueData: HistoriqueLoi[] = [
  { id: '1', titre: 'Lex Porcia', auteur: "Cato l'Ancien", date: '12/03/230 av. J.-C.', resultat: 'Adoptée', votes: '95/15/5' },
  { id: '2', titre: 'Lex Publilia', auteur: 'Publilius Philo', date: '05/04/230 av. J.-C.', resultat: 'Rejetée', votes: '35/75/5' },
  { id: '3', titre: 'Lex Hortensia', auteur: 'Quintus Hortensius', date: '27/06/230 av. J.-C.', resultat: 'Adoptée', votes: '85/25/5' }
];
