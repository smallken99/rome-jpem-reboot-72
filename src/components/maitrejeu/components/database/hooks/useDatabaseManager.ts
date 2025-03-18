
import { useState, useEffect } from 'react';
import { useMaitreJeu } from '@/components/maitrejeu/context';
import { toast } from 'sonner';

export const useDatabaseManager = () => {
  const { 
    senateurs, 
    familles, 
    membres,
    alliances,
    provinces, 
    lois, 
    equilibre,
    evenements,
    histoireEntries,
    clients,
    economieRecords
  } = useMaitreJeu();

  const [stats, setStats] = useState({
    totalTables: 0,
    totalRecords: 0,
    lastUpdated: new Date().toISOString(),
    databaseSize: '0 KB',
    backups: []
  });

  // Regrouper les données par tables
  const tables = {
    senateurs,
    familles,
    membres,
    alliances,
    provinces,
    lois,
    evenements,
    histoire: histoireEntries,
    clients,
    economie: economieRecords
  };

  // Récupérer les données d'une table spécifique
  const getTableData = (tableName: string) => {
    return tables[tableName as keyof typeof tables] || [];
  };

  // Exporter une table au format JSON
  const exportTable = (tableName: string) => {
    try {
      const data = tables[tableName as keyof typeof tables];
      if (!data) throw new Error(`Table ${tableName} non trouvée`);
      
      const jsonString = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `${tableName}_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      toast.success(`Table ${tableName} exportée avec succès`);
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'export:', error);
      toast.error(`Erreur lors de l'export: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
      return false;
    }
  };

  // Importer des données
  const importData = (importedData: any, tableName?: string) => {
    try {
      // Vérification basique du format des données
      if (!importedData || typeof importedData !== 'object') {
        throw new Error('Format de données invalide');
      }

      // Si une table spécifique est fournie, importer uniquement dans cette table
      if (tableName) {
        // Ici, on pourrait appeler des fonctions du contexte pour mettre à jour une table spécifique
        // Par exemple: updateSenateurs(importedData) si c'était disponible
        toast.info(`Fonction d'import pour ${tableName} pas encore implémentée`);
        return false;
      } else {
        // Import de toutes les données (à implémenter)
        toast.info("Fonction d'import global pas encore implémentée");
        return false;
      }
    } catch (error) {
      console.error('Erreur lors de l\'import:', error);
      toast.error(`Erreur lors de l'import: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
      return false;
    }
  };

  // Mettre à jour les statistiques
  useEffect(() => {
    const calculateStats = () => {
      const tableEntries = Object.entries(tables);
      const totalTables = tableEntries.length;
      let totalRecords = 0;

      tableEntries.forEach(([_, data]) => {
        if (Array.isArray(data)) {
          totalRecords += data.length;
        } else if (data && typeof data === 'object') {
          totalRecords += 1; // Pour les objets uniques comme equilibre
        }
      });

      // Estimation approximative de la taille des données
      const jsonSize = JSON.stringify(tables).length;
      const sizeInKB = (jsonSize / 1024).toFixed(2);

      setStats({
        totalTables,
        totalRecords,
        lastUpdated: new Date().toISOString(),
        databaseSize: `${sizeInKB} KB`,
        backups: []
      });
    };

    calculateStats();
  }, [senateurs, familles, provinces, lois, evenements, histoireEntries, clients, economieRecords]);

  return {
    tables,
    stats,
    getTableData,
    exportTable,
    importData
  };
};
