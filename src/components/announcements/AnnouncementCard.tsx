import React from 'react';
import { Announcement } from '../../types/announcement';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../ui/card'; // Assuming this path is correct

interface AnnouncementCardProps {
  announcement: Announcement;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ announcement }) => {
  // Format date for better readability (optional)
  const formattedDate = new Date(announcement.date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{announcement.title}</CardTitle>
        <CardDescription>
          Posted on {formattedDate} by {announcement.author}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* If content can be HTML, use dangerouslySetInnerHTML or a sanitizer */}
        <p>{announcement.content}</p>
      </CardContent>
      <CardFooter>
        {/* Can add actions here later, e.g., Edit/Delete buttons */}
        <small>ID: {announcement.id}</small>
      </CardFooter>
    </Card>
  );
};

export default AnnouncementCard;
