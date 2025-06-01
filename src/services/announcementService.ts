import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  Firestore,
} from 'firebase/firestore';
import { Announcement } from '../types/announcement';

// Placeholder for Firebase configuration
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

// Initialize Firebase
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db: Firestore = getFirestore(app);
const ANNOUNCEMENTS_COLLECTION = 'announcements';

/**
 * Adds a new announcement to Firestore.
 * @param announcementData Data for the new announcement (without id).
 * @returns The ID of the newly created announcement.
 */
export const addAnnouncement = async (
  announcementData: Omit<Announcement, 'id'>
): Promise<string> => {
  try {
    const docRef = await addDoc(
      collection(db, ANNOUNCEMENTS_COLLECTION),
      announcementData
    );
    console.log('Announcement added with ID: ', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding announcement: ', error);
    throw new Error('Failed to add announcement');
  }
};

/**
 * Fetches all announcements from Firestore, ordered by date (newest first).
 * @returns A promise that resolves to an array of announcements.
 */
export const getAnnouncements = async (): Promise<Announcement[]> => {
  try {
    const q = query(
      collection(db, ANNOUNCEMENTS_COLLECTION),
      orderBy('date', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const announcements: Announcement[] = [];
    querySnapshot.forEach((doc) => {
      announcements.push({ id: doc.id, ...doc.data() } as Announcement);
    });
    console.log('Fetched announcements:', announcements);
    return announcements;
  } catch (error) {
    console.error('Error fetching announcements: ', error);
    throw new Error('Failed to fetch announcements');
  }
};

/**
 * Fetches a single announcement by its ID.
 * @param id The ID of the announcement to fetch.
 * @returns A promise that resolves to the announcement data or null if not found.
 */
export const getAnnouncementById = async (
  id: string
): Promise<Announcement | null> => {
  try {
    const docRef = doc(db, ANNOUNCEMENTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const announcement = { id: docSnap.id, ...docSnap.data() } as Announcement;
      console.log('Fetched announcement by ID:', announcement);
      return announcement;
    } else {
      console.log('No such announcement found with ID:', id);
      return null;
    }
  } catch (error) {
    console.error('Error fetching announcement by ID: ', error);
    throw new Error('Failed to fetch announcement by ID');
  }
};

/**
 * Updates an existing announcement.
 * @param id The ID of the announcement to update.
 * @param updatedData The partial data to update the announcement with.
 * @returns A promise that resolves when the update is complete.
 */
export const updateAnnouncement = async (
  id: string,
  updatedData: Partial<Announcement>
): Promise<void> => {
  try {
    const docRef = doc(db, ANNOUNCEMENTS_COLLECTION, id);
    await updateDoc(docRef, updatedData);
    console.log('Announcement updated successfully with ID:', id);
  } catch (error) {
    console.error('Error updating announcement: ', error);
    throw new Error('Failed to update announcement');
  }
};

/**
 * Deletes an announcement by its ID.
 * @param id The ID of the announcement to delete.
 * @returns A promise that resolves when the deletion is complete.
 */
export const deleteAnnouncement = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, ANNOUNCEMENTS_COLLECTION, id);
    await deleteDoc(docRef);
    console.log('Announcement deleted successfully with ID:', id);
  } catch (error) {
    console.error('Error deleting announcement: ', error);
    throw new Error('Failed to delete announcement');
  }
};
