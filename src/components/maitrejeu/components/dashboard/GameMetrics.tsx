
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface MetricItem {
  name: string;
  value: string;
  description: string;
  status?: "default" | "destructive" | "outline" | "secondary" | "success";
}

interface GameMetricsProps {
  metrics: MetricItem[];
}

export const GameMetrics: React.FC<GameMetricsProps> = ({ metrics }) => {
  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <p className="text-sm font-medium text-muted-foreground">{metric.name}</p>
              <div className="flex items-center gap-2">
                <h3 className="text-3xl font-bold">{metric.value}</h3>
                {metric.status && (
                  <Badge variant={metric.status}>{metric.status === "destructive" ? "!" : "✓"}</Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{metric.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
