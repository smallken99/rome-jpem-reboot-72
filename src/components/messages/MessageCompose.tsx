
import React from 'react';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Button } from '@/components/ui/button';
import { Send, Paperclip, X, Save } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export const MessageCompose: React.FC = () => {
  return (
    <RomanCard>
      <RomanCard.Header>
        <h3 className="font-cinzel text-lg text-rome-navy">Composer un Message</h3>
      </RomanCard.Header>
      <RomanCard.Content>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recipient">Destinataire</Label>
            <Input 
              id="recipient" 
              placeholder="Nom du destinataire" 
              className="border-rome-gold/30 focus:border-rome-gold"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subject">Sujet</Label>
            <Input 
              id="subject" 
              placeholder="Sujet du message" 
              className="border-rome-gold/30 focus:border-rome-gold"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea 
              id="message" 
              placeholder="Écrivez votre message ici..." 
              className="min-h-[200px] border-rome-gold/30 focus:border-rome-gold"
            />
          </div>
          
          <div className="flex justify-between pt-2">
            <div className="flex gap-2">
              <Button variant="outline" className="flex items-center gap-1 roman-btn-outline">
                <Paperclip className="h-4 w-4" />
                <span>Joindre</span>
              </Button>
              <Button variant="outline" className="flex items-center gap-1 roman-btn-outline">
                <Save className="h-4 w-4" />
                <span>Brouillon</span>
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" className="roman-btn-outline">
                <X className="h-4 w-4 mr-1" />
                <span>Annuler</span>
              </Button>
              <Button className="bg-rome-navy hover:bg-rome-navy/90">
                <Send className="h-4 w-4 mr-1" />
                <span>Envoyer</span>
              </Button>
            </div>
          </div>
        </form>
      </RomanCard.Content>
    </RomanCard>
  );
};
