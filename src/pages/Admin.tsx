import React from 'react';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { RomanCard } from '@/components/ui-custom/RomanCard';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Usage {
  name: string
  value: number
  label: string
  className?: string
}

const websiteData: Usage[] = [
  {
    name: "Jan",
    value: 4000,
    label: "Visites"
  },
  {
    name: "Fév",
    value: 3000,
    label: "Visites"
  },
  {
    name: "Mar",
    value: 2000,
    label: "Visites"
  },
  {
    name: "Avr",
    value: 2780,
    label: "Visites"
  },
  {
    name: "Mai",
    value: 1890,
    label: "Visites"
  },
  {
    name: "Juin",
    value: 2390,
    label: "Visites"
  },
  {
    name: "Jui",
    value: 3490,
    label: "Visites"
  },
  {
    name: "Aoû",
    value: 4000,
    label: "Visites"
  },
  {
    name: "Sep",
    value: 3000,
    label: "Visites"
  },
  {
    name: "Oct",
    value: 2000,
    label: "Visites"
  },
  {
    name: "Nov",
    value: 2780,
    label: "Visites"
  },
  {
    name: "Déc",
    value: 1000,
    label: "Visites"
  },
];

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

const Admin = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Administration" 
        subtitle="Panneau d'administration du site web" 
      />
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
      </div>
      
      <RomanCard>
        <RomanCard.Header>
          <h2 className="font-cinzel text-lg">Administration des utilisateurs</h2>
        </RomanCard.Header>
        <RomanCard.Content>
          <p className="text-muted-foreground mb-4">
            Ici, vous pouvez gérer les utilisateurs du site web.
          </p>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Jean Dupont</TableCell>
                <TableCell>jean.dupont@example.com</TableCell>
                <TableCell>
                  <Badge variant="secondary">Administrateur</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <button className="px-4 py-2 bg-red-500 text-white rounded">Supprimer</button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Jeanne Martin</TableCell>
                <TableCell>jeanne.martin@example.com</TableCell>
                <TableCell>
                  <Badge variant="secondary">Modérateur</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <button className="px-4 py-2 bg-red-500 text-white rounded">Supprimer</button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </RomanCard.Content>
      </RomanCard>
    </div>
  );
};

export default Admin;
