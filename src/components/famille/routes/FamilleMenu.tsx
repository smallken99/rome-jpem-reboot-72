
import React from 'react';
import Layout from '@/components/layout/Layout';
import { PageHeader } from '@/components/ui-custom/PageHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { TreePine, GraduationCap, HeartHandshake, Scroll } from 'lucide-react';

export const FamilleMenu: React.FC = () => {
  const navigate = useNavigate();
  
  const menuItems = [
    {
      title: "Arbre généalogique",
      description: "Visualisez les membres de votre famille et leurs relations",
      icon: <TreePine className="h-6 w-6" />,
      path: "/famille/tree",
      color: "bg-blue-100 text-blue-700"
    },
    {
      title: "Éducation",
      description: "Gérez l'éducation des jeunes membres de votre famille",
      icon: <GraduationCap className="h-6 w-6" />,
      path: "/famille/education",
      color: "bg-amber-100 text-amber-700"
    },
    {
      title: "Alliances matrimoniales",
      description: "Établissez des alliances stratégiques via des mariages",
      icon: <HeartHandshake className="h-6 w-6" />,
      path: "/famille/alliances",
      color: "bg-pink-100 text-pink-700"
    },
    {
      title: "Héritage",
      description: "Planifiez la succession et la transmission de votre patrimoine",
      icon: <Scroll className="h-6 w-6" />,
      path: "/famille/inheritance",
      color: "bg-emerald-100 text-emerald-700"
    }
  ];
  
  return (
    <Layout>
      <PageHeader 
        title="Gestion de la Famille"
        subtitle="Gérez votre lignée et votre héritage"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {menuItems.map((item, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-full ${item.color}`}>
                  {item.icon}
                </div>
                <CardTitle>{item.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                {item.description}
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => navigate(item.path)}>
                Accéder
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </Layout>
  );
};
