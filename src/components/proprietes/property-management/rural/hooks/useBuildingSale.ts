
type SaleBuildingFunction = (buildingId: number) => boolean;
type EstimateBuildingValueFunction = (buildingId: number) => number;
type SellBuildingFunction = (buildingId: number, value: number) => boolean;

export const useBuildingSale = () => {
  const estimateBuildingValue: EstimateBuildingValueFunction = (buildingId) => {
    // Estimation de la valeur du bâtiment basée sur son ID
    // Logique simplifiée pour l'exemple
    return buildingId * 1000 + Math.floor(Math.random() * 500);
  };

  const sellBuilding: SellBuildingFunction = (buildingId, value) => {
    // Vente du bâtiment
    console.log(`Vente du bâtiment ${buildingId} pour ${value} deniers`);
    // La vente est toujours réussie pour cet exemple
    return true;
  };

  const saleBuilding: SaleBuildingFunction = (buildingId) => {
    const value = estimateBuildingValue(buildingId);
    const result = sellBuilding(buildingId, value);
    return result;
  };

  return {
    saleBuilding,
    estimateBuildingValue,
    sellBuilding
  };
};
