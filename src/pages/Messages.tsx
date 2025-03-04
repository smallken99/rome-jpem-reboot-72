
import React from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { MessageList } from '@/components/messages/MessageList';
import { MessageCompose } from '@/components/messages/MessageCompose';
import { MessageView } from '@/components/messages/MessageView';

const Messages = () => {
  return (
    <Layout>
      <PageHeader 
        title="Messages" 
        subtitle="Gérez votre correspondance et vos communications" 
      />

      <Tabs defaultValue="inbox" className="mb-8">
        <TabsList className="border border-rome-gold/30 bg-rome-parchment">
          <TabsTrigger value="inbox" className="data-[state=active]:bg-white">Reçus</TabsTrigger>
          <TabsTrigger value="sent" className="data-[state=active]:bg-white">Envoyés</TabsTrigger>
          <TabsTrigger value="compose" className="data-[state=active]:bg-white">Composer</TabsTrigger>
        </TabsList>
        
        <TabsContent value="inbox" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <MessageList type="inbox" />
            </div>
            <div className="md:col-span-2">
              <MessageView />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="sent" className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <MessageList type="sent" />
            </div>
            <div className="md:col-span-2">
              <MessageView />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="compose" className="pt-4">
          <MessageCompose />
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Messages;
