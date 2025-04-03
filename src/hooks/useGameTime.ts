
import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

interface GameTime {
  year: number;
  season: string;
  advanceTime: (seasons?: number) => void;
  formatDate: () => string;
}

export const useGameTime = (): GameTime => {
  const [gameTime, setGameTime] = useLocalStorage('game-time', {
    year: 753, // Ab urbe condita - à partir de la fondation de Rome
    season: 'Ver', // Printemps (Ver, Aestas, Autumnus, Hiems)
    turn: 1
  });
  
  const seasons = ['Ver', 'Aestas', 'Autumnus', 'Hiems'];
  
  const advanceTime = (seasonsToAdvance: number = 1) => {
    setGameTime(prev => {
      let newSeason = seasons.indexOf(prev.season);
      let newYear = prev.year;
      let newTurn = prev.turn + seasonsToAdvance;
      
      // Calculer le nombre total de saisons avancées
      newSeason += seasonsToAdvance;
      
      // Ajuster l'année si nécessaire
      newYear += Math.floor(newSeason / seasons.length);
      
      // Normaliser l'index de saison
      newSeason = newSeason % seasons.length;
      
      return {
        year: newYear,
        season: seasons[newSeason],
        turn: newTurn
      };
    });
  };
  
  const formatDate = () => {
    const ab = gameTime.year > 0 ? 'AUC' : 'BC';
    return `An ${Math.abs(gameTime.year)} ${ab}, ${gameTime.season}`;
  };
  
  return {
    year: gameTime.year,
    season: gameTime.season,
    advanceTime,
    formatDate
  };
};
