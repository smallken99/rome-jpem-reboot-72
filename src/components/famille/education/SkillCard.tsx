
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skill } from '../types/preceptor';

interface SkillCardProps {
  skill: Skill;
}

export const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-medium text-sm">{skill.name}</h4>
          <span className="text-sm font-medium">{skill.level}/10</span>
        </div>
        <Progress value={skill.level * 10} className="h-1.5 mb-2" />
        {skill.description && (
          <p className="text-xs text-muted-foreground">{skill.description}</p>
        )}
      </CardContent>
    </Card>
  );
};
