import React from 'react';
import { Announcement } from '../../types/announcement';
import AnnouncementCard from './AnnouncementCard';

interface AnnouncementListProps {
  announcements: Announcement[];
}

const AnnouncementList: React.FC<AnnouncementListProps> = ({ announcements }) => {
  if (!announcements || announcements.length === 0) {
    return (
      <div className="text-center py-8">
        <p>No announcements at this time.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {announcements.map((announcement) => (
        <AnnouncementCard key={announcement.id} announcement={announcement} />
      ))}
    </div>
  );
};

export default AnnouncementList;
