
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Laurels } from '../ui-custom/Laurels';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "@/components/ui/sonner";
import { 
  Home, 
  Users, 
  Building, 
  Coins, 
  MessageSquare,
  CalendarDays, 
  ScrollText,
  BarChart,
  Menu,
  X
} from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
  const navItems = [
    { path: '/', label: 'Vue Générale', icon: <Home className="h-5 w-5" /> },
    { path: '/famille', label: 'Famille', icon: <Users className="h-5 w-5" /> },
    { path: '/proprietes', label: 'Propriétés', icon: <Building className="h-5 w-5" /> },
    { path: '/economie', label: 'Économie', icon: <Coins className="h-5 w-5" /> },
    { path: '/clientele', label: 'Clientèle', icon: <Users className="h-5 w-5" /> },
    { path: '/evenements', label: 'Événements', icon: <CalendarDays className="h-5 w-5" /> },
    { path: '/messages', label: 'Messages', icon: <MessageSquare className="h-5 w-5" /> },
    { path: '/rapports', label: 'Rapports', icon: <BarChart className="h-5 w-5" /> },
  ];
  
  const isActive = (path: string) => location.pathname === path;
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  return (
    <>
      <div className="md:hidden flex items-center justify-between p-4 bg-white/90 backdrop-blur-sm border-b border-rome-gold/30 sticky top-0 z-30">
        <Link to="/" className="font-cinzel text-xl text-rome-navy flex items-center gap-2">
          ROME <span className="text-rome-terracotta">JPEM</span>
        </Link>
        <button onClick={toggleMenu} className="p-2">
          {isMenuOpen ? <X className="h-6 w-6 text-rome-navy" /> : <Menu className="h-6 w-6 text-rome-navy" />}
        </button>
      </div>
      
      <nav className={`fixed md:relative top-0 left-0 h-screen md:h-auto w-64 md:w-full bg-white/95 backdrop-blur-sm border-r md:border-r-0 border-b border-rome-gold/30 z-40 md:z-20 transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="hidden md:flex items-center justify-between p-4">
          <Link to="/" className="font-cinzel text-xl text-rome-navy flex items-center gap-2">
            ROME <span className="text-rome-terracotta">JPEM</span>
          </Link>
          <div className="flex items-center gap-4">
            <button className="roman-btn-outline text-sm py-1">Fin de Tour</button>
            <div className="w-10 h-10 rounded-full bg-rome-terracotta/20 flex items-center justify-center text-rome-terracotta font-cinzel">
              JA
            </div>
          </div>
        </div>
        
        <ScrollArea className="h-[calc(100vh-4rem)] md:h-auto">
          <div className="md:flex md:justify-center md:space-x-2 p-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 p-2 my-1 md:my-0 rounded-md transition-colors ${
                  isActive(item.path) 
                    ? 'bg-rome-terracotta/10 text-rome-terracotta' 
                    : 'hover:bg-rome-gold/10 text-rome-navy hover:text-rome-terracotta'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon}
                <span className="font-cinzel tracking-wide">{item.label}</span>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </nav>
    </>
  );
};

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-rome-parchment">
      <Navigation />
      
      <main className="flex-1 p-4 md:p-6 pt-24 md:pt-8 max-w-7xl mx-auto w-full">
        <div className="page-transition">
          {children}
        </div>
      </main>
      
      <footer className="border-t border-rome-gold/30 py-4 text-center text-sm text-muted-foreground">
        <Laurels>ROME JPEM Reboot</Laurels>
        <p className="mt-2">© {new Date().getFullYear()} - République Romaine</p>
      </footer>
      
      <Toaster />
    </div>
  );
};

export default Layout;
