
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronsRight, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

interface JsonViewProps {
  data: any;
  onClose?: () => void;
}

export const JsonView: React.FC<JsonViewProps> = ({ data, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [expandAll, setExpandAll] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    toast.success('Copié dans le presse-papier');
    
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Formater proprement le JSON avec indentation et coloration syntaxique
  const formatJson = (obj: any): JSX.Element => {
    return (
      <div className="json-formatter overflow-auto">
        <pre className="text-sm p-2">
          {renderJsonNode(obj, 0, expandAll)}
        </pre>
      </div>
    );
  };
  
  return (
    <div className="border rounded-md bg-muted/10">
      <div className="flex justify-between items-center p-2 border-b">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setExpandAll(!expandAll)}
          >
            <ChevronsRight className="h-4 w-4 mr-1" />
            {expandAll ? 'Réduire tout' : 'Développer tout'}
          </Button>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm"
          onClick={handleCopy}
          disabled={copied}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-1 text-green-500" />
              Copié
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-1" />
              Copier
            </>
          )}
        </Button>
      </div>
      
      <div className="p-2 max-h-[400px] overflow-auto">
        {formatJson(data)}
      </div>
    </div>
  );
};

// Rendu récursif des nœuds JSON avec coloration
function renderJsonNode(value: any, level: number, expanded: boolean): JSX.Element | string {
  if (value === null) {
    return <span className="text-red-500">null</span>;
  }

  if (typeof value === 'boolean') {
    return <span className="text-orange-500">{value ? 'true' : 'false'}</span>;
  }

  if (typeof value === 'number') {
    return <span className="text-blue-500">{value}</span>;
  }

  if (typeof value === 'string') {
    return <span className="text-green-500">"{value}"</span>;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return <span>[]</span>;
    }
    
    const indent = '  '.repeat(level);
    const childIndent = '  '.repeat(level + 1);
    
    return (
      <span>
        [<br />
        {value.map((item, index) => (
          <span key={index}>
            {childIndent}
            {renderJsonNode(item, level + 1, expanded)}
            {index < value.length - 1 ? ',' : ''}<br />
          </span>
        ))}
        {indent}]
      </span>
    );
  }

  if (typeof value === 'object') {
    const keys = Object.keys(value);
    
    if (keys.length === 0) {
      return <span>{'{}'}</span>;
    }
    
    const indent = '  '.repeat(level);
    const childIndent = '  '.repeat(level + 1);
    
    return (
      <span>
        {'{'}<br />
        {keys.map((key, index) => (
          <span key={key}>
            {childIndent}
            <span className="text-purple-500">"{key}"</span>: {renderJsonNode(value[key], level + 1, expanded)}
            {index < keys.length - 1 ? ',' : ''}<br />
          </span>
        ))}
        {indent}{'}'}
      </span>
    );
  }

  return String(value);
}
