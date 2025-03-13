
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface EducationWarningProps {
  text: string;
}

export const EducationWarning: React.FC<EducationWarningProps> = ({ text }) => {
  return (
    <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>
        {text}
      </AlertDescription>
    </Alert>
  );
};
