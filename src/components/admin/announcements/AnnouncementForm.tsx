import React, { useState, FormEvent } from 'react';
import { Input } from '../../../ui/input'; // Assuming path
import { Textarea } from '../../../ui/textarea'; // Assuming path
import { Button } from '../../../ui/button'; // Assuming path
import { Label } from '../../../ui/label'; // Assuming path
import { addAnnouncement } from '../../../../services/announcementService';
import { Announcement } from '../../../../types/announcement';

const AnnouncementForm: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!title.trim() || !content.trim() || !author.trim()) {
      setError('All fields are required.');
      return;
    }

    const announcementData: Omit<Announcement, 'id'> = {
      title,
      content,
      author,
      date: new Date().toISOString(),
    };

    try {
      const newAnnouncementId = await addAnnouncement(announcementData);
      setSuccessMessage(`Announcement added successfully with ID: ${newAnnouncementId}`);
      // Clear form fields
      setTitle('');
      setContent('');
      setAuthor('');
    } catch (err) {
      console.error('Failed to add announcement:', err);
      setError('Failed to add announcement. Please try again.');
      if (err instanceof Error) {
          setError(`Failed to add announcement: ${err.message}`);
      } else {
          setError('An unknown error occurred while adding the announcement.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4 border rounded-md shadow-sm">
      <div>
        <Label htmlFor="announcement-title" className="block text-sm font-medium text-gray-700">
          Title
        </Label>
        <Input
          id="announcement-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter announcement title"
          required
          className="mt-1 block w-full"
        />
      </div>

      <div>
        <Label htmlFor="announcement-content" className="block text-sm font-medium text-gray-700">
          Content
        </Label>
        <Textarea
          id="announcement-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter announcement content"
          required
          rows={5}
          className="mt-1 block w-full"
        />
      </div>

      <div>
        <Label htmlFor="announcement-author" className="block text-sm font-medium text-gray-700">
          Author
        </Label>
        <Input
          id="announcement-author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Enter author's name"
          required
          className="mt-1 block w-full"
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

      <Button type="submit" className="w-full sm:w-auto">
        Add Announcement
      </Button>
    </form>
  );
};

export default AnnouncementForm;
