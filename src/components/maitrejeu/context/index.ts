
// Réexportation du contexte MaitreJeu
import MaitreJeuContext, { MaitreJeuProvider, useMaitreJeu } from './MaitreJeuContext';
// Fix: Use `export type` for type re-exports
export type { MaitreJeuContextType } from './MaitreJeuContext';
export { MaitreJeuContext, MaitreJeuProvider, useMaitreJeu };
