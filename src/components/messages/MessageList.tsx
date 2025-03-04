
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Check, Mail, Star, Flag } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  sender: string;
  recipient: string;
  subject: string;
  content: string;
  date: string;
  read: boolean;
  important: boolean;
  flagged?: boolean;
}

interface MessageListProps {
  type: 'inbox' | 'sent';
}

export const MessageList: React.FC<MessageListProps> = ({ type }) => {
  const messages: Message[] = [
    {
      id: "msg1",
      sender: "Marcus Tullius Cicero",
      recipient: "Caius Julius Caesar",
      subject: "Concernant la situation politique",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      date: "Id. Apr.",
      read: true,
      important: true
    },
    {
      id: "msg2",
      sender: "Lucius Cornelius Sulla",
      recipient: "Caius Julius Caesar",
      subject: "Invitation à un banquet",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      date: "X Kal. Mai.",
      read: false,
      important: false
    },
    {
      id: "msg3",
      sender: "Gnaeus Pompeius Magnus",
      recipient: "Caius Julius Caesar",
      subject: "Alliances militaires",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      date: "III Non. Mai.",
      read: false,
      important: true,
      flagged: true
    },
    {
      id: "msg4",
      sender: "Marcus Licinius Crassus",
      recipient: "Caius Julius Caesar",
      subject: "Opportunités d'investissement",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      date: "V Id. Mai.",
      read: true,
      important: false
    },
    {
      id: "msg5",
      sender: "Servius Sulpicius Rufus",
      recipient: "Caius Julius Caesar",
      subject: "Conseil juridique",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      date: "VII Kal. Jun.",
      read: true,
      important: false
    }
  ];

  const displayMessages = type === 'inbox' 
    ? messages.filter(m => m.recipient === "Caius Julius Caesar")
    : messages.filter(m => m.sender === "Caius Julius Caesar");

  return (
    <RomanCard className="h-[70vh]">
      <RomanCard.Header>
        <h3 className="font-cinzel text-lg text-rome-navy">
          {type === 'inbox' ? 'Messages Reçus' : 'Messages Envoyés'}
        </h3>
      </RomanCard.Header>
      <ScrollArea className="h-[calc(70vh-4rem)]">
        <RomanCard.Content>
          <div className="space-y-1">
            {displayMessages.map((message) => (
              <React.Fragment key={message.id}>
                <div className={`p-3 rounded-md cursor-pointer hover:bg-rome-gold/5 transition-all ${!message.read && 'bg-rome-parchment'}`}>
                  <div className="flex items-start gap-2">
                    <div className="pt-1">
                      {!message.read ? (
                        <div className="w-2 h-2 rounded-full bg-rome-terracotta"></div>
                      ) : (
                        <Check className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">
                        {type === 'inbox' ? message.sender : message.recipient}
                      </h4>
                      <p className="text-sm font-medium truncate">{message.subject}</p>
                      <p className="text-xs text-muted-foreground truncate">{message.content.substring(0, 60)}...</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs text-muted-foreground">{message.date}</span>
                      <div className="flex gap-1">
                        {message.important && <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />}
                        {message.flagged && <Flag className="h-3 w-3 fill-red-500 text-red-500" />}
                      </div>
                    </div>
                  </div>
                </div>
                <Separator />
              </React.Fragment>
            ))}
          </div>
        </RomanCard.Content>
      </ScrollArea>
    </RomanCard>
  );
};
