
import React, { useState } from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface AnnouncementFormProps {
  onAddAnnouncement: (announcement: { title: string; content: string }) => void;
  onFinished?: () => void;
}

const AnnouncementForm: React.FC<AnnouncementFormProps> = ({ onAddAnnouncement, onFinished }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && content) {
      onAddAnnouncement({ title, content });
      setTitle('');
      setContent('');
      if (onFinished) {
        onFinished();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="announcement-title" className="block text-sm font-medium text-gray-700">
          標題
        </label>
        <Input
          id="announcement-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="輸入公告標題"
        />
      </div>
      <div>
        <label htmlFor="announcement-content" className="block text-sm font-medium text-gray-700">
          內容
        </label>
        <Textarea
          id="announcement-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="輸入公告內容"
        />
      </div>
      <Button type="submit">
        發布公告
      </Button>
    </form>
  );
};

export default AnnouncementForm;
