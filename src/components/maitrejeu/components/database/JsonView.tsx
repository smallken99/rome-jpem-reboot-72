
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Copy, Check, Download, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface JsonViewProps {
  data: any;
  onClose: () => void;
}

export const JsonView: React.FC<JsonViewProps> = ({ data, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  
  const jsonString = JSON.stringify(data, null, 2);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    toast.success('Copié dans le presse-papiers');
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `record-${data.id || 'export'}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Fichier JSON téléchargé');
  };
  
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
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
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
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
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Télécharger
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Retour
                </Button>
              </motion.div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleExpanded}
              className="text-xs"
            >
              {expanded ? (
                <>
                  <EyeOff className="h-3 w-3 mr-1" />
                  Réduire
                </>
              ) : (
                <>
                  <Eye className="h-3 w-3 mr-1" />
                  Tout afficher
                </>
              )}
            </Button>
          </div>
          <motion.pre 
            className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md overflow-auto text-sm"
            style={{ maxHeight: expanded ? 'none' : '60vh' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <code>{jsonString}</code>
          </motion.pre>
        </CardContent>
      </Card>
    </motion.div>
  );
};
