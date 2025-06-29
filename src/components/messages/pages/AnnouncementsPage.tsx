import React, { useState } from 'react';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import AnnouncementForm from '../AnnouncementForm';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from 'lucide-react';

interface Announcement {
  id: string;
  title: string;
  content: string;
}

const AnnouncementsPage: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: '1',
      title: '示範公告',
      content: '這是一則示範公告的內容.\n您可以在此處發布重要的消息和更新。',
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addAnnouncement = (announcement: Omit<Announcement, 'id'>) => {
    const newAnnouncement = { ...announcement, id: crypto.randomUUID() };
    setAnnouncements([newAnnouncement, ...announcements]);
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(announcements.filter(ann => ann.id !== id));
  };

  return (
    <>
      <PageHeader 
        title="公告" 
        subtitle="最新消息與重要通知"
        actions={
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button>新增公告</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>發布新公告</DialogTitle>
              </DialogHeader>
              <AnnouncementForm 
                onAddAnnouncement={addAnnouncement}
                onFinished={() => setIsModalOpen(false)}
              />
            </DialogContent>
          </Dialog>
        }
      />
      <div className="space-y-4">
        {announcements.map((ann) => (
          <RomanCard key={ann.id}>
            <RomanCard.Header actions={
              <Button variant="ghost" size="icon" onClick={() => deleteAnnouncement(ann.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            }>
              <RomanCard.Title>{ann.title}</RomanCard.Title>
            </RomanCard.Header>
            <RomanCard.Content>
              {ann.content.split('\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </RomanCard.Content>
          </RomanCard>
        ))}
      </div>
    </>
  );
};

export default AnnouncementsPage;