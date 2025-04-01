
import { useState, useEffect } from 'react';
import { useMaitreJeu } from '@/components/maitrejeu/context';
import { toast } from 'sonner';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { getPopulationData, getTreasuryData, getBuildingsData } from '@/data/db/republic';
import { getRepublicData } from '@/data/republic/republicData';

export interface DatabaseStats {
  totalTables: number;
  totalRecords: number;
  lastUpdated: string;
  databaseSize: string;
  backups: DatabaseBackup[];
  syncStatus: 'synced' | 'pending' | 'error';
}

export interface DatabaseBackup {
  id: string;
  date: string;
  size: string;
  tables: string[];
  description: string;
}

export interface DbTable {
  name: string;
  recordCount: number;
  lastModified: string;
  size: string;
  description: string;
}

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

  const republicData = getRepublicData();
  const populationData = getPopulationData();
  const treasuryData = getTreasuryData();
  const buildingsData = getBuildingsData();

  // Stocker les sauvegardes dans le localStorage
  const [backups, setBackups] = useLocalStorage<DatabaseBackup[]>('romejpem-db-backups', []);
  
  // État pour les statistiques de la DB
  const [stats, setStats] = useState<DatabaseStats>({
    totalTables: 0,
    totalRecords: 0,
    lastUpdated: new Date().toISOString(),
    databaseSize: '0 KB',
    backups: backups,
    syncStatus: 'synced'
  });

  // Définir toutes les tables de la base de données
  const tables: Record<string, any[]> = {
    senateurs,
    familles,
    membres,
    alliances,
    provinces,
    lois,
    evenements,
    histoire: histoireEntries,
    clients,
    economie: economieRecords,
    population: [populationData],
    tresor: [treasuryData],
    batiments: buildingsData,
    republique: [republicData]
  };

  // Détails des tables pour l'affichage
  const tableDetails: Record<string, DbTable> = {
    senateurs: {
      name: 'Sénateurs',
      recordCount: senateurs.length,
      lastModified: new Date().toISOString(),
      size: calculateSize(senateurs),
      description: 'Données sur les sénateurs actuels'
    },
    familles: {
      name: 'Familles',
      recordCount: familles.length,
      lastModified: new Date().toISOString(),
      size: calculateSize(familles),
      description: 'Informations sur les familles romaines'
    },
    membres: {
      name: 'Membres de familles',
      recordCount: membres.length,
      lastModified: new Date().toISOString(),
      size: calculateSize(membres),
      description: 'Membres des familles romaines'
    },
    alliances: {
      name: 'Alliances',
      recordCount: alliances.length,
      lastModified: new Date().toISOString(),
      size: calculateSize(alliances),
      description: 'Alliances entre familles'
    },
    provinces: {
      name: 'Provinces',
      recordCount: provinces.length,
      lastModified: new Date().toISOString(),
      size: calculateSize(provinces),
      description: 'Provinces de la République'
    },
    lois: {
      name: 'Lois',
      recordCount: lois.length,
      lastModified: new Date().toISOString(),
      size: calculateSize(lois),
      description: 'Lois de la République'
    },
    evenements: {
      name: 'Événements',
      recordCount: evenements.length,
      lastModified: new Date().toISOString(),
      size: calculateSize(evenements),
      description: 'Événements historiques'
    },
    histoire: {
      name: 'Histoire',
      recordCount: histoireEntries.length,
      lastModified: new Date().toISOString(),
      size: calculateSize(histoireEntries),
      description: 'Entrées historiques'
    },
    clients: {
      name: 'Clients',
      recordCount: clients.length,
      lastModified: new Date().toISOString(),
      size: calculateSize(clients),
      description: 'Clients des sénateurs'
    },
    economie: {
      name: 'Économie',
      recordCount: economieRecords.length,
      lastModified: new Date().toISOString(),
      size: calculateSize(economieRecords),
      description: 'Registres économiques'
    },
    population: {
      name: 'Population',
      recordCount: 1,
      lastModified: new Date().toISOString(),
      size: calculateSize([populationData]),
      description: 'Données démographiques'
    },
    tresor: {
      name: 'Trésor',
      recordCount: 1,
      lastModified: new Date().toISOString(),
      size: calculateSize([treasuryData]),
      description: 'État du trésor public'
    },
    batiments: {
      name: 'Bâtiments',
      recordCount: buildingsData.length,
      lastModified: new Date().toISOString(),
      size: calculateSize(buildingsData),
      description: 'Bâtiments publics'
    },
    republique: {
      name: 'République',
      recordCount: 1,
      lastModified: new Date().toISOString(),
      size: calculateSize([republicData]),
      description: 'État général de la République'
    }
  };

  // Fonction utilitaire pour calculer la taille approximative des données
  function calculateSize(data: any[]): string {
    const jsonSize = JSON.stringify(data).length;
    if (jsonSize < 1024) {
      return `${jsonSize} B`;
    } else if (jsonSize < 1024 * 1024) {
      return `${(jsonSize / 1024).toFixed(2)} KB`;
    } else {
      return `${(jsonSize / (1024 * 1024)).toFixed(2)} MB`;
    }
  }

  // Récupérer les données d'une table spécifique
  const getTableData = (tableName: string) => {
    return tables[tableName as keyof typeof tables] || [];
  };

  // Récupérer les détails d'une table
  const getTableDetails = (tableName: string): DbTable => {
    return tableDetails[tableName] || {
      name: tableName,
      recordCount: 0,
      lastModified: new Date().toISOString(),
      size: '0 KB',
      description: 'Table inconnue'
    };
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

  // Exporter toute la base de données
  const exportAllTables = () => {
    try {
      const allData = { ...tables };
      const jsonString = JSON.stringify(allData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `romejpem_database_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      toast.success(`Base de données exportée avec succès`);
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'export complet:', error);
      toast.error(`Erreur lors de l'export: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
      return false;
    }
  };

  // Créer une sauvegarde
  const createBackup = (description: string = '') => {
    try {
      const allData = { ...tables };
      const jsonString = JSON.stringify(allData);
      const tableNames = Object.keys(tables);
      const totalSize = jsonString.length;
      
      const sizeString = totalSize < 1024 * 1024 
        ? `${(totalSize / 1024).toFixed(2)} KB` 
        : `${(totalSize / (1024 * 1024)).toFixed(2)} MB`;
      
      const backup: DatabaseBackup = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        size: sizeString,
        tables: tableNames,
        description: description || `Sauvegarde du ${new Date().toLocaleDateString()}`
      };
      
      const newBackups = [...backups, backup];
      setBackups(newBackups);
      setStats({...stats, backups: newBackups});
      
      // Stocker les données dans le localStorage (avec limite de taille)
      try {
        localStorage.setItem(`romejpem-backup-${backup.id}`, jsonString);
        toast.success(`Sauvegarde créée avec succès (${sizeString})`);
      } catch (storageError) {
        toast.error(`La sauvegarde est trop volumineuse pour le stockage local. Exportez-la à la place.`);
        exportAllTables();
      }
      
      return backup.id;
    } catch (error) {
      console.error('Erreur lors de la création de la sauvegarde:', error);
      toast.error(`Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
      return null;
    }
  };

  // Restaurer une sauvegarde
  const restoreBackup = (backupId: string) => {
    try {
      const backupData = localStorage.getItem(`romejpem-backup-${backupId}`);
      if (!backupData) {
        toast.error("Sauvegarde introuvable");
        return false;
      }
      
      toast.info("Fonctionnalité de restauration pas encore implémentée");
      // Ici, on pourrait appeler des fonctions du contexte pour restaurer les données
      // Par exemple: updateSenateurs(parsedData.senateurs)
      
      return true;
    } catch (error) {
      console.error('Erreur lors de la restauration:', error);
      toast.error(`Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
      return false;
    }
  };

  // Supprimer une sauvegarde
  const deleteBackup = (backupId: string) => {
    try {
      const newBackups = backups.filter(backup => backup.id !== backupId);
      setBackups(newBackups);
      setStats({...stats, backups: newBackups});
      
      localStorage.removeItem(`romejpem-backup-${backupId}`);
      toast.success("Sauvegarde supprimée");
      return true;
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast.error(`Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
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
      const sizeFormatted = jsonSize > 1024 * 1024 
        ? `${(jsonSize / (1024 * 1024)).toFixed(2)} MB` 
        : `${sizeInKB} KB`;

      setStats({
        totalTables,
        totalRecords,
        lastUpdated: new Date().toISOString(),
        databaseSize: sizeFormatted,
        backups,
        syncStatus: 'synced'
      });
    };

    calculateStats();
  }, [senateurs, familles, provinces, lois, evenements, histoireEntries, clients, economieRecords, backups]);

  return {
    tables,
    tableDetails,
    stats,
    getTableData,
    getTableDetails,
    exportTable,
    exportAllTables,
    importData,
    createBackup,
    restoreBackup,
    deleteBackup,
    backups
  };
};
