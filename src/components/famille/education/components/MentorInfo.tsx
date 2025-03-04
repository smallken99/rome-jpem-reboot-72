
import React from 'react';

interface MentorInfoProps {
  mentor: string | null;
  skills?: string[];
}

export const MentorInfo: React.FC<MentorInfoProps> = ({ mentor, skills = [] }) => {
  return (
    <div className="mt-2">
      <p className="text-xs text-muted-foreground">Précepteur:</p>
      <p className="text-sm font-medium">{mentor || 'Aucun'}</p>
      
      {skills.length > 0 && (
        <div className="mt-3">
          <p className="text-xs text-muted-foreground">Compétences acquises:</p>
          <ul className="ml-5 list-disc text-xs mt-1">
            {skills.map((skill, idx) => (
              <li key={idx}>{skill}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
