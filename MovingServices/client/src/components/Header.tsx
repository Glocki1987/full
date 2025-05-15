import { useState, useEffect, useCallback } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import { Menu, Truck, Globe } from "lucide-react";

const Header = () => {
  const { language, setLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleLanguageChange = useCallback((lang: string) => {
    if (language === lang) return; // Не делаем ничего, если язык уже выбран
    
    console.log(`Changing language from ${language} to ${lang}`);
    
    // Теперь всю логику обработки изменения языка мы доверяем LanguageContext
    setLanguage(lang);
    
  }, [setLanguage, language]);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const closeMenu = () => {
    setMobileMenuOpen(false);
  };

  const getMenuText = (key: string) => {
    const menuTexts: Record<string, Record<string, string>> = {
      services: {
        pl: 'Usługi',
        en: 'Services',
        ru: 'Услуги'
      },
      area: {
        pl: 'Obszar działania',
        en: 'Service Area',
        ru: 'География обслуживания'
      },
      gallery: {
        pl: 'Galeria',
        en: 'Gallery',
        ru: 'Галерея'
      },
      pricing: {
        pl: 'Cennik',
        en: 'Pricing',
        ru: 'Цены'
      },
      contact: {
        pl: 'Kontakt',
        en: 'Contact',
        ru: 'Контакт'
      }
    };
    
    return menuTexts[key][language as keyof (typeof menuTexts)[typeof key]] || menuTexts[key]['pl'];
  };
  
  return (
    <header className={`bg-background/95 backdrop-blur-sm sticky top-0 z-50 transition-all duration-300 border-b ${scrolled ? 'shadow-lg border-primary/20' : 'shadow-none border-transparent'}`}>
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center group">
          <div className="bg-gradient-to-br from-primary/20 to-blue-500/20 p-3 rounded-full mr-3 shadow-inner shadow-primary/20 transition-all duration-500 group-hover:shadow-primary/40 border border-primary/10">
            <Truck className="h-7 w-7 text-primary transition-all duration-500 group-hover:text-blue-400" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-400 to-primary bg-size-200 font-heading animate-gradient">
              TransExpress
            </span>
            <span className="text-xs text-muted-foreground tracking-widest uppercase">
              Warszawa & Katowice
            </span>
          </div>
        </div>
        
        <div className="hidden md:flex space-x-8 ml-auto mr-6">
          {['services', 'area', 'gallery', 'pricing'].map((item, index) => (
            <a 
              key={item}
              href={`#${item === 'services' ? 'uslugi' : item === 'area' ? 'obszar' : item === 'gallery' ? 'galeria' : 'cennik'}`} 
              className="font-medium text-foreground hover:text-primary transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:bg-primary after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:duration-300"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {getMenuText(item)}
            </a>
          ))}
        </div>
        
        <div className="flex items-center">
          <button 
            className="md:hidden bg-primary/20 p-2 rounded-full text-primary transition-all duration-300 hover:bg-primary/30" 
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>
      
      {/* Мобильное меню с анимацией */}
      <div 
        className={`md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
      >
        <div 
          className={`absolute right-0 top-0 bottom-0 w-64 bg-card border-l border-border p-5 transition-all duration-500 transform ${
            mobileMenuOpen ? 'translate-x-0 shadow-xl' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
            <div className="flex items-center">
              <Truck className="h-5 w-5 text-primary mr-2" />
              <span className="font-bold">TransExpress</span>
            </div>
            <button 
              onClick={closeMenu}
              className="p-2 rounded-full hover:bg-primary/10 text-muted-foreground hover:text-foreground transition-colors"
            >
              ✕
            </button>
          </div>
          
          <div className="flex flex-col space-y-1">
            {['services', 'area', 'gallery', 'pricing'].map((item, index) => (
              <a 
                key={item}
                href={`#${item === 'services' ? 'uslugi' : item === 'area' ? 'obszar' : item === 'gallery' ? 'galeria' : 'cennik'}`}
                className="font-medium p-3 hover:bg-primary/10 rounded-lg transition-all duration-300 flex items-center group"
                onClick={closeMenu}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="bg-primary/20 p-2 rounded-full mr-3 group-hover:bg-primary/30 transition-colors">
                  <Globe className="h-4 w-4 text-primary" />
                </div>
                <span className="relative overflow-hidden">
                  {getMenuText(item)}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                </span>
              </a>
            ))}
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-border">
            <p className="text-center text-xs text-muted-foreground">
              © 2025 TransExpress
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
