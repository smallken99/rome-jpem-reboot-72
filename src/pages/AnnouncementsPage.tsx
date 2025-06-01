import React, { useEffect, useState } from 'react';
import { Announcement } from '../types/announcement';
import { getAnnouncements } from '../services/announcementService';
import AnnouncementList from '../components/announcements/AnnouncementList';
import PageHeader from '../components/ui-custom/PageHeader'; // Assuming this path is correct

const AnnouncementsPage: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAnnouncements();
        setAnnouncements(data);
      } catch (err) {
        console.error('Failed to fetch announcements:', err);
        if (err instanceof Error) {
          setError(`Failed to load announcements: ${err.message}`);
        } else {
          setError('An unknown error occurred while fetching announcements.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader title="Public Announcements" />

      {loading && (
        <div className="text-center py-10">
          <p>Loading announcements...</p>
          {/* Optionally, add a spinner or skeleton component here */}
        </div>
      )}

      {error && (
        <div className="text-center py-10 text-red-600">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <AnnouncementList announcements={announcements} />
      )}
    </div>
  );
};

export default AnnouncementsPage;
