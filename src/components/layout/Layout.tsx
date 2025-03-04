
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Laurels } from '../ui-custom/Laurels';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Toaster } from "@/components/ui/sonner";
import { TimePanel } from '@/components/time/TimePanel';
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
  X,
  ChevronRight
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
      <div className="md:hidden flex items-center justify-between p-4 bg-gradient-to-b from-rome-parchment to-white/90 backdrop-blur-sm border-b border-rome-gold/30 sticky top-0 z-30">
        <Link to="/" className="font-cinzel text-xl text-rome-navy flex items-center gap-2">
          <span className="text-rome-terracotta">ROME</span> JPEM
        </Link>
        <button onClick={toggleMenu} className="p-2 text-rome-navy hover:text-rome-terracotta transition-colors">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      <nav className={`fixed md:sticky top-0 left-0 h-screen md:h-auto md:w-full bg-gradient-to-b from-rome-parchment to-white/80 backdrop-blur-sm border-r md:border-r-0 border-b border-rome-gold/30 z-40 md:z-20 transition-all duration-300 ${isMenuOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full md:translate-x-0 md:w-full'} overflow-hidden`}>
        <div className="hidden md:flex items-center justify-between p-4 border-b border-rome-gold/20">
          <Link to="/" className="font-cinzel text-xl flex items-center gap-2">
            <span className="text-rome-terracotta">ROME</span> 
            <span className="text-rome-navy">JPEM</span>
          </Link>
          <div className="flex items-center gap-4">
            <button className="roman-btn-outline text-sm py-1 hover:bg-rome-terracotta/10 transition-colors">Fin de Tour</button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rome-terracotta to-rome-terracotta/70 flex items-center justify-center text-white font-cinzel">
              JA
            </div>
          </div>
        </div>
        
        <ScrollArea className="h-[calc(100vh-4rem)] md:h-auto">
          <div className="md:flex md:justify-center md:space-x-1 p-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 p-2 my-1 md:my-0 rounded-md transition-all duration-200 ${
                  isActive(item.path) 
                    ? 'bg-gradient-to-r from-rome-terracotta/20 via-rome-terracotta/10 to-transparent text-rome-terracotta' 
                    : 'hover:bg-rome-gold/10 text-rome-navy hover:text-rome-terracotta'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon}
                <span className="font-cinzel tracking-wide">{item.label}</span>
                {isActive(item.path) && <ChevronRight className="h-4 w-4 ml-auto" />}
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
    <div className="min-h-screen flex flex-col bg-roman-pattern">
      <Navigation />
      
      <main className="flex-1 p-4 md:p-6 pt-24 md:pt-8 max-w-7xl mx-auto w-full">
        <div className="mb-6">
          <TimePanel />
        </div>
        
        <div className="animate-fade-up">
          {children}
        </div>
      </main>
      
      <footer className="bg-gradient-to-t from-rome-gold/10 via-rome-gold/5 to-transparent py-6 text-center text-sm text-muted-foreground mt-8">
        <Laurels className="font-cinzel text-rome-navy">ROME JPEM Reboot</Laurels>
        <p className="mt-2">© {new Date().getFullYear()} - République Romaine</p>
      </footer>
      
      <Toaster />
    </div>
  );
};

export default Layout;
