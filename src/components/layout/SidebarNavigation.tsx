
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
  User,
  Gavel,
  Shield
} from 'lucide-react';

interface SidebarNavigationProps {
  isExpanded: boolean;
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ isExpanded }) => {
  const location = useLocation();
  
  const mainNavItems = [
    { path: '/', label: 'Vue Générale', icon: <Home className="h-5 w-5" /> },
    { path: '/famille', label: 'Famille', icon: <Users className="h-5 w-5" /> },
    { path: '/patrimoine', label: 'Patrimoine', icon: <Building className="h-5 w-5" /> },
    { path: '/clientele', label: 'Clientèle', icon: <User className="h-5 w-5" /> },
    { path: '/republique', label: 'République', icon: <Gavel className="h-5 w-5" /> },
    { path: '/registre', label: 'Registre', icon: <ScrollText className="h-5 w-5" /> },
    { path: '/religion', label: 'Religion', icon: <Landmark className="h-5 w-5" /> },
    { path: '/messages', label: 'Messages', icon: <MessageSquare className="h-5 w-5" /> },
    { path: '/rapports', label: 'Rapports', icon: <BarChart className="h-5 w-5" /> },
    // Ajout du lien vers la page Maître du Jeu
    { path: '/maitre-jeu', label: 'Maître du Jeu', icon: <Shield className="h-5 w-5" /> },
  ];
  
  const subNavItems = {
    '/famille': [
      { path: '/famille/dashboard', label: 'Tableau de bord' },
      { path: '/famille/arbre-genealogique', label: 'Arbre Généalogique' },
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
    '/republique': [
      { path: '/republique/tresor', label: 'Trésor Public' },
      { path: '/republique/justice', label: 'Justice' },
      { path: '/republique/domaines', label: 'Terres Publiques' },
      { path: '/republique/batiments', label: 'Bâtiments Publics' },
      { path: '/republique/lois', label: 'Lois' },
      { path: '/republique/bureaux', label: 'Bureaux' }
    ],
    '/religion': [
      { path: '/religion/vestales', label: 'Vestales' },
      { path: '/religion/temples', label: 'Temples' },
      { path: '/religion/ceremonies', label: 'Cérémonies' },
      { path: '/religion/augures', label: 'Augures' },
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
    <div className="py-2 space-y-1">
      {mainNavItems.map((item) => {
        const isActive = isPathActive(item.path);
        const isGroup = isPathGroup(item.path);
        const hasChildren = subNavItems[item.path as keyof typeof subNavItems];
        
        return (
          <div key={item.path}>
            <Link
              to={item.path}
              className={`flex items-center gap-3 p-2 rounded-md transition-all duration-200 ${
                isActive || isGroup
                  ? 'bg-white/20 text-white' 
                  : 'hover:bg-white/10 text-white/70 hover:text-white'
              }`}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {isExpanded && (
                <>
                  <span className="font-cinzel tracking-wide truncate">{item.label}</span>
                  {hasChildren && (isActive || isGroup) && (
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  )}
                </>
              )}
            </Link>
            
            {hasChildren && isGroup && isExpanded && (
              <div className="ml-4 pl-4 border-l border-white/20 mt-1 space-y-1">
                {subNavItems[item.path as keyof typeof subNavItems].map((subItem) => (
                  <Link
                    key={subItem.path}
                    to={subItem.path}
                    className={`block p-1.5 text-sm transition-colors ${
                      isPathActive(subItem.path)
                        ? 'text-rome-terracotta font-medium' 
                        : 'text-white/70 hover:text-white'
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
