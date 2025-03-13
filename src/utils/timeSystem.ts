
export type Season = "Ver" | "Aestas" | "Autumnus" | "Hiems";
export type PlayerSeason = "SPRING" | "SUMMER" | "AUTUMN" | "WINTER";

// Mapping between Roman seasons and player seasons
export const seasonMapping: Record<Season, PlayerSeason> = {
  "Ver": "SPRING",
  "Aestas": "SUMMER",
  "Autumnus": "AUTUMN",
  "Hiems": "WINTER"
};

// Reverse mapping
export const reverseSeasonMapping: Record<PlayerSeason, Season> = {
  "SPRING": "Ver",
  "SUMMER": "Aestas",
  "AUTUMN": "Autumnus",
  "WINTER": "Hiems"
};

// Helper function to convert between season types
export const convertSeasonBetweenSystems = (
  season: Season | PlayerSeason | string, 
  targetSystem: 'player' | 'mj'
): Season | PlayerSeason => {
  if (targetSystem === 'player') {
    if (season === "Ver" || season === "Aestas" || season === "Autumnus" || season === "Hiems") {
      return seasonMapping[season as Season];
    }
    // If it's already a player season or an unrecognized value, return as is
    return season as PlayerSeason;
  } else {
    if (season === "SPRING" || season === "SUMMER" || season === "AUTUMN" || season === "WINTER") {
      return reverseSeasonMapping[season as PlayerSeason];
    }
    // If it's already an MJ season or an unrecognized value, return as is
    return season as Season;
  }
};

// Format a season to display name in French
export const formatSeasonDisplay = (season: Season | PlayerSeason | string): string => {
  // Convert to Season type first if needed
  const romanSeason = (season === "SPRING" || season === "SUMMER" || season === "AUTUMN" || season === "WINTER") 
    ? convertSeasonBetweenSystems(season as PlayerSeason, 'mj') 
    : season as Season;
    
  switch (romanSeason) {
    case "Ver": return "Printemps";
    case "Aestas": return "Été";
    case "Autumnus": return "Automne";
    case "Hiems": return "Hiver";
    default: return "Saison inconnue";
  }
};
