
import React from 'react';
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Usage {
  name: string;
  value: number;
  label: string;
  className?: string;
}

const serverData: Usage[] = [
  {
    name: "Utilisation CPU",
    value: 68,
    label: "Utilisation CPU",
    className: "bg-orange-500"
  },
  {
    name: "Utilisation Mémoire",
    value: 82,
    label: "Utilisation Mémoire",
    className: "bg-blue-500"
  },
  {
    name: "Utilisation Disque",
    value: 34,
    label: "Utilisation Disque",
    className: "bg-purple-500"
  },
];

export const ServerUsageCard: React.FC = () => {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Utilisation du serveur</CardTitle>
        <CardDescription>Utilisation des ressources du serveur</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {serverData.map((usage) => (
          <div key={usage.name} className="flex items-center justify-between">
            <span>{usage.name}</span>
            <div className="flex-1 ml-4">
              <Progress 
                value={usage.value}
                className={usage.className}
              />
            </div>
            <span className="ml-2">{usage.value}%</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
