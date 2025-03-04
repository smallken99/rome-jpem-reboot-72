
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Building, 
  Coins, 
  MessageSquare,
  ScrollText, 
  BarChart,
  ChevronRight,
  Landmark,
  User
} from 'lucide-react';

export const SidebarNavigation: React.FC = () => {
  const location = useLocation();
  
  const mainNavItems = [
    { path: '/', label: 'Vue Générale', icon: <Home className="h-5 w-5" /> },
    { path: '/famille', label: 'Famille', icon: <Users className="h-5 w-5" /> },
    { path: '/patrimoine', label: 'Patrimoine', icon: <Building className="h-5 w-5" /> },
    { path: '/clientele', label: 'Clientèle', icon: <User className="h-5 w-5" /> },
    { path: '/registre', label: 'Registre', icon: <ScrollText className="h-5 w-5" /> },
    { path: '/religion', label: 'Religion', icon: <Landmark className="h-5 w-5" /> },
    { path: '/messages', label: 'Messages', icon: <MessageSquare className="h-5 w-5" /> },
    { path: '/rapports', label: 'Rapports', icon: <BarChart className="h-5 w-5" /> },
  ];
  
  const subNavItems = {
    '/famille': [
      { path: '/famille/arbre', label: 'Arbre Généalogique' },
      { path: '/famille/alliances', label: 'Alliances' },
      { path: '/famille/education', label: 'Éducation' },
      { path: '/famille/heritage', label: 'Héritage' },
    ],
    '/patrimoine': [
      { path: '/patrimoine/proprietes', label: 'Propriétés' },
      { path: '/patrimoine/revenus', label: 'Revenus' },
      { path: '/patrimoine/depenses', label: 'Dépenses' },
      { path: '/patrimoine/impots', label: 'Impôts' },
    ],
    '/clientele': [
      { path: '/clientele/liste', label: 'Liste' },
      { path: '/clientele/nouveau', label: 'Ajouter un client' },
      { path: '/clientele/statistiques', label: 'Statistiques' },
    ],
    '/rapports': [
      { path: '/rapports/influence', label: 'Influence' },
      { path: '/rapports/finances', label: 'Finances' },
      { path: '/rapports/famille', label: 'Famille' },
      { path: '/rapports/strategie', label: 'Stratégie' },
    ],
  };
  
  const isPathActive = (path: string) => location.pathname === path;
  const isPathGroup = (path: string) => location.pathname.startsWith(path) && path !== '/';
  
  return (
    <div className="py-2">
      {mainNavItems.map((item) => {
        const isActive = isPathActive(item.path);
        const isGroup = isPathGroup(item.path);
        const hasChildren = subNavItems[item.path as keyof typeof subNavItems];
        
        return (
          <div key={item.path} className="mb-1">
            <Link
              to={item.path}
              className={`flex items-center gap-2 p-2 rounded-md transition-all duration-200 ${
                isActive || isGroup
                  ? 'bg-gradient-to-r from-rome-terracotta/20 via-rome-terracotta/10 to-transparent text-rome-terracotta' 
                  : 'hover:bg-rome-gold/10 text-rome-navy hover:text-rome-terracotta'
              }`}
            >
              {item.icon}
              <span className="font-cinzel tracking-wide">{item.label}</span>
              {(isActive || isGroup) && <ChevronRight className="h-4 w-4 ml-auto" />}
            </Link>
            
            {hasChildren && isGroup && (
              <div className="ml-4 pl-4 border-l border-rome-gold/20 mt-1 space-y-1">
                {subNavItems[item.path as keyof typeof subNavItems].map((subItem) => (
                  <Link
                    key={subItem.path}
                    to={subItem.path}
                    className={`block p-1.5 text-sm transition-colors ${
                      isPathActive(subItem.path)
                        ? 'text-rome-terracotta font-medium' 
                        : 'text-rome-navy hover:text-rome-terracotta'
                    }`}
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
