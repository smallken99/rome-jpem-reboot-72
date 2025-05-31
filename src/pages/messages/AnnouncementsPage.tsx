import React from 'react';
// import Layout from '@/components/layout/Layout'; // Remove Layout import
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { RomanCard } from '@/components/ui-custom/RomanCard';

const AnnouncementsPage: React.FC = () => {
  return (
    // Remove Layout component
    <>
      <PageHeader 
        title="公告" 
        subtitle="最新消息與重要通知" 
      />
      <RomanCard>
        <RomanCard.Title>示範公告</RomanCard.Title>
        <RomanCard.Content>
          <p>這是一則示範公告的內容。</p>
          <p>您可以在此處發布重要的消息和更新。</p>
        </RomanCard.Content>
      </RomanCard>
    </>
  );
};

export default AnnouncementsPage; 