
import React from 'react';
import { LucideProps, Shield, Award, BookOpen, Landmark, Skull, FileText, User, Info } from 'lucide-react';

export const LawIcon: React.FC<LucideProps> = (props) => {
  return <Landmark {...props} />;
};

export const MilitaryIcon: React.FC<LucideProps> = (props) => {
  return <Shield {...props} />;
};

export const DiplomaticIcon: React.FC<LucideProps> = (props) => {
  return <Award {...props} />;
};

export const DisasterIcon: React.FC<LucideProps> = (props) => {
  return <Skull {...props} />;
};

export const DocumentIcon: React.FC<LucideProps> = (props) => {
  return <FileText {...props} />;
};

export const PersonIcon: React.FC<LucideProps> = (props) => {
  return <User {...props} />;
};

export const InfoIcon: React.FC<LucideProps> = (props) => {
  return <Info {...props} />;
};

export const HistoryIcon: React.FC<LucideProps> = (props) => {
  return <BookOpen {...props} />;
};
