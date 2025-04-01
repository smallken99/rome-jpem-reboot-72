
/**
 * Classe d'émetteur d'événements typé
 */
export class EventEmitter<T = any> {
  private listeners: ((data: T) => void)[] = [];

  /**
   * S'abonner à l'émetteur d'événements
   * @param listener Fonction de rappel à exécuter lors de l'émission d'un événement
   * @returns Fonction pour se désabonner
   */
  subscribe(listener: (data: T) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  /**
   * Émettre un événement
   * @param data Données à transmettre aux abonnés
   */
  emit(data: T): void {
    this.listeners.forEach(listener => {
      try {
        listener(data);
      } catch (e) {
        console.error('Error in event listener:', e);
      }
    });
  }

  /**
   * Obtenir le nombre d'abonnés
   */
  get listenersCount(): number {
    return this.listeners.length;
  }

  /**
   * Supprimer tous les abonnés
   */
  clear(): void {
    this.listeners = [];
  }
}
