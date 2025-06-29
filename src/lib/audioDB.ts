import { openDB, DBSchema } from 'idb';

const DB_NAME = 'audio-cache-db';
const STORE_NAME = 'audio-store';
const DB_VERSION = 1;

interface AudioDB extends DBSchema {
  [STORE_NAME]: {
    key: string;
    value: Blob;
  };
}

const dbPromise = openDB<AudioDB>(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME);
    }
  },
});

export const audioDB = {
  async get(key: string): Promise<Blob | undefined> {
    return (await dbPromise).get(STORE_NAME, key);
  },
  async set(key: string, value: Blob): Promise<IDBValidKey> {
    return (await dbPromise).put(STORE_NAME, value, key);
  },
  async delete(key: string): Promise<void> {
    return (await dbPromise).delete(STORE_NAME, key);
  },
  async clear(): Promise<void> {
    return (await dbPromise).clear(STORE_NAME);
  },
};
