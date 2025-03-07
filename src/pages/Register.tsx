
import React from 'react';
import RegisterHeader from '@/components/auth/RegisterHeader';
import RegisterForm from '@/components/auth/RegisterForm';
import RegisterFooter from '@/components/auth/RegisterFooter';

const Register = () => {
  return (
    <div className="min-h-screen bg-roman-pattern flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <RegisterHeader />
          
          <div className="bg-white/90 backdrop-blur-sm border border-rome-gold/30 rounded-lg p-8 shadow-lg">
            <RegisterForm />
            <RegisterFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
