
import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
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
}

const websiteData: Usage[] = [
  { name: "Jan", value: 4000, label: "Visites" },
  { name: "Fév", value: 3000, label: "Visites" },
  { name: "Mar", value: 2000, label: "Visites" },
  { name: "Avr", value: 2780, label: "Visites" },
  { name: "Mai", value: 1890, label: "Visites" },
  { name: "Juin", value: 2390, label: "Visites" },
  { name: "Jui", value: 3490, label: "Visites" },
  { name: "Aoû", value: 4000, label: "Visites" },
  { name: "Sep", value: 3000, label: "Visites" },
  { name: "Oct", value: 2000, label: "Visites" },
  { name: "Nov", value: 2780, label: "Visites" },
  { name: "Déc", value: 1000, label: "Visites" },
];

export const WebsiteVisitsCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Visites du site web</CardTitle>
        <CardDescription>Nombre de visites par mois</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart
            data={websiteData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
