
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

interface JsonViewProps {
  data: any;
  onClose: () => void;
}

export const JsonView: React.FC<JsonViewProps> = ({ data, onClose }) => {
  const [copied, setCopied] = React.useState(false);
  
  const jsonString = JSON.stringify(data, null, 2);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    toast.success('Copié dans le presse-papiers');
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Détails de l'enregistrement</CardTitle>
            <CardDescription>
              ID: {data.id || 'Non disponible'}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
            >
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Copié
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copier JSON
                </>
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md overflow-auto max-h-[60vh] text-sm">
          <code>{jsonString}</code>
        </pre>
      </CardContent>
    </Card>
  );
};
