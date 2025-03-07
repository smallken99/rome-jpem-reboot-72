
import React from 'react';
import { Shield } from 'lucide-react';

const RegisterFooter = () => {
  return (
    <div className="pt-4 mt-4 border-t border-border">
      <div className="text-xs text-center text-muted-foreground flex items-center justify-center">
        <Shield className="h-3 w-3 mr-1" />
        Inscription sécurisée
      </div>
    </div>
  );
};

export default RegisterFooter;
